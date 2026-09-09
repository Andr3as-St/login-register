import jwt from "jsonwebtoken";
import { UnAuthenticatedError } from "../errors/index.js";

const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnAuthenticatedError("Authentication invalid");
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    throw new UnAuthenticatedError("Authentication invalid");
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    throw new UnAuthenticatedError("Authentication invalid");
  }
};

export default authenticateUser;
