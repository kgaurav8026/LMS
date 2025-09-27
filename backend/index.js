import express from "express";
import dotenv from "dotenv";
import ConnectDB from "./config/ConnectDB.js";
import cookieParser from "cookie-parser";
import authRouter from "./route/authRoute.js";
import cors from "cors";
import userRouter from "./route/userRoute.js";
dotenv.config();

const port = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  ConnectDB();
});
