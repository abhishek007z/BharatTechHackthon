import express from "express";
import protect from "../middlewares/authMiddleware.js";
import {
  createReasume,
  deleteReasume,
  getPublicResumeById,
  getResumeById,
  updateResume
} from "../controllers/ResumeController.js";
import {generateSkillQuestions} from "../controllers/skillQuestion.controller.js"
import upload from "../configs/multer.js";

const resumeRouter = express.Router();

resumeRouter.post(
  "/create",
  protect,
  upload.none(),     
  createReasume
);

resumeRouter.put("/update", upload.single("image"), protect, updateResume);
resumeRouter.delete("/delete/:resumeId", protect, deleteReasume);
resumeRouter.get("/get/:resumeId", protect, getResumeById);
resumeRouter.get("/public/:resumeId",  getPublicResumeById);
resumeRouter.post(
  "/skills/questions",
  protect,
  generateSkillQuestions
);

export default resumeRouter;
