import express from "express";
import {
  signUp,
  login,
  logout,
  sendOtp,
  verifyOtp,
  resetPassword,
} from "../controller/authController.js";

const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/login", login);
authRouter.get("/logout", logout);
authRouter.post("/send-otp", sendOtp);
authRouter.post("/verify-otp", verifyOtp);
authRouter.post("/reset-password", resetPassword);

export default authRouter;
