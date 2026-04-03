import Resume from "../models/Resume.js";
import { geminiModel } from "../configs/ai.js";
import SecurityCapture from "../models/SecurityCapture.js"; // You'll need to create this model


// CAPTURE SCREENSHOT (NEW)
// ==================
// ==================
// CAPTURE SCREENSHOT (NEW)
// ==================
export const captureScreenshot = async (req, res) => {
  try {
    const { resumeId, screenshot, timestamp, sessionId } = req.body;

    console.log("Received screenshot capture request:", { 
      resumeId: resumeId ? 'present' : 'missing',
      screenshot: screenshot ? `present (${screenshot.length} chars)` : 'missing',
      timestamp: timestamp || 'not provided',
      sessionId: sessionId || 'not provided'
    });

    if (!resumeId) {
      console.error("Missing resumeId in request");
      return res.status(400).json({ message: "Missing resumeId" });
    }

    if (!screenshot) {
      console.error("Missing screenshot in request");
      return res.status(400).json({ message: "Missing screenshot data" });
    }

    // Store screenshot in database
    const securityCapture = new SecurityCapture({
      resumeId,
      sessionId: sessionId || resumeId,
      screenshot: screenshot,
      timestamp: timestamp || new Date().toISOString(),
      userId: req.user?._id || null
    });

    const saved = await securityCapture.save();
    console.log("Screenshot saved successfully:", saved._id);

    // Optional: Keep only last 50 screenshots per session
    try {
      const count = await SecurityCapture.countDocuments({ sessionId: sessionId || resumeId });
      if (count > 50) {
        const toDelete = count - 50;
        const result = await SecurityCapture.deleteMany({
          sessionId: sessionId || resumeId
        }).limit(toDelete);
        console.log(`Deleted ${result.deletedCount} old screenshots to maintain limit of 50`);
      }
    } catch (cleanupErr) {
      console.warn("Cleanup failed (non-critical):", cleanupErr.message);
    }

    res.status(201).json({ 
      message: "Screenshot captured successfully",
      captureId: saved._id 
    });

  } catch (error) {
    console.error("Screenshot capture error:", error.message);
    console.error("Full error:", error);
    res.status(500).json({ 
      message: "Failed to capture screenshot",
      error: error.message 
    });
  }
};



// ==================
// GENERATE QUESTION
// ==================
export const generateInterviewQuestion = async (req, res) => {
  try {
    const { resumeId } = req.body;

    const resume = await Resume.findById(resumeId);

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    const prompt = `
You are an HR interviewer.

Candidate skills:
${resume.skills?.join(", ")}

Generate ONE interview question.

Return ONLY JSON:

{
  "question": "string",
  "type": "technical or behavioral",
  "expected_duration": 60
}
`;

    const result = await geminiModel.generateContent(prompt);
    let text = result.response.text().replace(/```json|```/g, "").trim();

    const question = JSON.parse(text);

    res.json({ question });

  } catch (error) {
    console.error("Question error:", error);
    res.status(500).json({ message: "Failed to generate question" });
  }
};


// ==================
// EVALUATE ANSWER
// ==================
export const evaluateAnswer = async (req, res) => {
  try {
    const { question, answer, questionType } = req.body;

    if (!question || !answer) {
      return res.status(400).json({ message: "Missing data" });
    }

    const prompt = `
You are a senior HR interviewer.

Evaluate candidate answer.

QUESTION:
${question}

ANSWER:
${answer}

Evaluate based on:

- confidence level
- grammar quality
- communication clarity
- technical accuracy
- structure
- professionalism

Return ONLY valid JSON:

{
  "score": 0-10,
  "confidence_level": "Low/Medium/High",
  "grammar_mistakes": ["mistake1"],
  "strengths": ["point1"],
  "weaknesses": ["point1"],
  "improvements": ["how to improve"],
  "hr_feedback": "overall HR opinion"
}
`;

    const result = await geminiModel.generateContent(prompt);
    let text = result.response.text().replace(/```json|```/g, "").trim();

    const evaluation = JSON.parse(text);

    res.json({ evaluation });

  } catch (error) {
    console.error("Evaluation error:", error);
    res.status(500).json({ message: "Evaluation failed" });
  }
};




// ==================
// GET SESSION SCREENSHOTS (NEW - Optional)
// ==================
export const getSessionScreenshots = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { limit = 20, page = 1 } = req.query;

    const screenshots = await SecurityCapture.find({ sessionId })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .select('-screenshot'); // Exclude actual image data for list view

    const total = await SecurityCapture.countDocuments({ sessionId });

    res.json({
      screenshots,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      }
    });

  } catch (error) {
    console.error("Get screenshots error:", error);
    res.status(500).json({ message: "Failed to retrieve screenshots" });
  }
};


// ==================
// DELETE SESSION SCREENSHOTS (NEW - Optional, for cleanup)
// ==================
export const deleteSessionScreenshots = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const result = await SecurityCapture.deleteMany({ sessionId });

    res.json({ 
      message: `Deleted ${result.deletedCount} screenshots for session ${sessionId}` 
    });

  } catch (error) {
    console.error("Delete screenshots error:", error);
    res.status(500).json({ message: "Failed to delete screenshots" });
  }
};