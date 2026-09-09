import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";

const sanitizeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  location: user.location,
  isAdmin: user.isAdmin,
});

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError("Please provide name, email and password");
  }

  const normalizedEmail = email.trim().toLowerCase();
  const existingUser = await User.findOne({ email: normalizedEmail });

  if (existingUser) {
    throw new BadRequestError("Email already in use");
  }

  const user = await User.create({
    name: name.trim(),
    email: normalizedEmail,
    password,
  });

  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({
    user: sanitizeUser(user),
    token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const normalizedEmail = email.trim().toLowerCase();
  const user = await User.findOne({ email: normalizedEmail }).select("+password");

  if (!user) {
    throw new UnAuthenticatedError("Invalid credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("Invalid credentials");
  }

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({
    user: sanitizeUser(user),
    token,
  });
};

const getCurrentUser = async (req, res) => {
  const user = await User.findById(req.user.userId);

  if (!user) {
    throw new UnAuthenticatedError("User no longer exists");
  }

  res.status(StatusCodes.OK).json({ user: sanitizeUser(user) });
};

const updateUser = async (req, res) => {
  const { email, name, location } = req.body;

  if (!email || !name || !location) {
    throw new BadRequestError("Please provide name, email and location");
  }

  const normalizedEmail = email.trim().toLowerCase();
  const emailOwner = await User.findOne({
    email: normalizedEmail,
    _id: { $ne: req.user.userId },
  });

  if (emailOwner) {
    throw new BadRequestError("Email already in use");
  }

  const user = await User.findById(req.user.userId);

  if (!user) {
    throw new UnAuthenticatedError("User no longer exists");
  }

  user.email = normalizedEmail;
  user.name = name.trim();
  user.location = location.trim();
  await user.save();

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({
    user: sanitizeUser(user),
    token,
  });
};

export { register, login, getCurrentUser, updateUser };
