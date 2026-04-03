import express from "express";
import {
  getUserByID,
  getUserResumes,
  loginUser,
  registerUser,
} from "../controllers/UserController.js";
import protect from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/data", protect, getUserByID);
userRouter.get("/resumes", protect, getUserResumes);


export default userRouter;
