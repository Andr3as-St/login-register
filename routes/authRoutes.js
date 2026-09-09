import express from "express";
import {
  register,
  login,
  getCurrentUser,
  updateUser,
} from "../controllers/authController.js";
import authenticateUser from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authenticateUser, getCurrentUser);
router.patch("/me", authenticateUser, updateUser);

export default router;
