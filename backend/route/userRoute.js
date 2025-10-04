import express from "express";
import upload from "../middleware/multer.js";
const userRouter = express.Router();
import isAuth from "../middleware/isAuth.js";
import {
  getCurrentUser,
  updateUserProfile,
} from "../controller/userController.js";

userRouter.get("/getcurrentuser", isAuth, getCurrentUser);
userRouter.post(
  "/updateuserprofile",
  isAuth,
  upload.single("photoUrl"),
  updateUserProfile
);

export default userRouter;
