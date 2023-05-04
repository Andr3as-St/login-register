import express from "express";
const router = express.Router();

import { register, login, updateUSer } from "../controllers/authController.js";
import authenticateUser from "../middleware/auth.js";

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/updateUser").patch(authenticateUser, updateUSer);

export default router;
