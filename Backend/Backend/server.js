import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import userRouter from "./routes/UserRoutes.js";
import resumeRouter from "./routes/ResumeRoutes.js";
import aiRouters from "./routes/aiRoutes.js";
import mockInterviewRoutes from "./routes/mockInterviewRoutes.js";
// Database Connection
await connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Increase body size limit to handle large screenshot uploads (base64 images)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

app.get('/' ,(req , res) => res.send("Server is live..."))


app.use('/api/users' , userRouter)
app.use('/api/resumes' , resumeRouter)
app.use('/api/ai' , aiRouters)
app.use("/api/mock-interview", mockInterviewRoutes);


app.listen(PORT , () =>{
    console.log(`Server is running on port ${PORT}`);
})