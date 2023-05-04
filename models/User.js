import mongoose, { Schema } from "mongoose";
import joi from "types-joi";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, "Please provide email"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email",
    },
    unique: true,
  },

  name: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 8,
    select: false,
    validate: {
      validator: function (value) {
        const regex =
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
        return regex.test(value);
      },
      message:
        "Password must be at least 8 characters and must include uppercase and lowercase letters, numbers, and special characters",
    },
  },
  isAdmin: {
    type: Boolean,
    default: false,
    required: true,
  },
  location: {
    type: String,
    trim: true,
    maxlength: 20,
    default: "Patra",
  },
});

UserSchema.pre("save", async function () {
  // console.log(this.modifiedPaths())
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

export default mongoose.model("Users", UserSchema);

