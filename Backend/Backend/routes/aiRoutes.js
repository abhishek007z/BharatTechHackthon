import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { enhanceJobDescription, enhanceProfessionalSummary , uploadResume} from "../controllers/aiController.js";



const aiRouters = express.Router();

aiRouters.post('/enhance-pro-sum', protect , enhanceProfessionalSummary);
aiRouters.post('/enhance-job-desc', protect , enhanceJobDescription);
aiRouters.post('/upload-resume', protect , uploadResume);

export default aiRouters;