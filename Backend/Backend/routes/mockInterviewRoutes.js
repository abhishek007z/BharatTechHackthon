import express from "express";
import protect from "../middlewares/authMiddleware.js";
import {
  generateInterviewQuestion,
  evaluateAnswer,captureScreenshot,           // New 
  getSessionScreenshots,       // New import
  deleteSessionScreenshots 
} from "../controllers/mockInterview.controller.js";

const router = express.Router();

router.post("/question", protect, generateInterviewQuestion);
router.post("/evaluate", protect, evaluateAnswer);



router.post("/security/capture", protect, captureScreenshot);
router.get("/security/screenshots/:sessionId", protect, getSessionScreenshots);
router.delete("/security/screenshots/:sessionId", protect, deleteSessionScreenshots);

export default router;
