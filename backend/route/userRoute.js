import express from "express";

const userRouter = express.Router();
import isAuth from "../middleware/isAuth.js";
import { getCurrentUser } from "../controller/userController.js";

userRouter.get("/getcurrentuser", isAuth, getCurrentUser);

export default userRouter;
