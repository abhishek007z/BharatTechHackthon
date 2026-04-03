import Resume from "../models/Resume.js";
import { geminiModel } from "../configs/ai.js";

export const generateSkillQuestions = async (req, res) => {
  try {
    const { resumeId } = req.body;

    if (!resumeId) {
      return res.status(400).json({ message: "resumeId is required" });
    }

    const resume = await Resume.findById(resumeId);

    if (!resume || !Array.isArray(resume.skills) || resume.skills.length === 0) {
      return res.status(400).json({ message: "No skills found in resume" });
    }

const prompt = `
You are an interview question generator.

Skills:
${resume.skills.join(", ")}

Generate 5 questions per level.

STRICT RULES:
- Return ONLY valid JSON
- No explanation
- No markdown
- No backticks
- No extra text

Return exactly this JSON format:

{
  "easy": [{"question":"", "answer":""}],
  "medium": [{"question":"", "answer":""}],
  "hard": [{"question":"", "answer":""}]
}
`;


    const result = await geminiModel.generateContent(prompt);

    let rawText = result.response.text().trim();

    // 🧹 Remove markdown if Gemini adds it
    rawText = rawText.replace(/```json|```/g, "").trim();

    let questions;

    try {
      // ✅ Best case: valid JSON
      questions = JSON.parse(rawText);
      if (!questions.easy || !questions.medium || !questions.hard) {
  throw new Error("Invalid AI response format");
}
    } catch (err) {
      // 🔥 Fallback: convert text → structured JSON
      const lines = rawText
        .split("\n")
        .map(line => line.trim())
        .filter(Boolean);

      questions = { easy: [], medium: [], hard: [] };
      let current = "easy";



      for (const line of lines) {
        const lower = line.toLowerCase();
        if (lower === "easy" || lower === "medium" || lower === "hard") {
          current = lower;
        } else {
          questions[current].push(line);
        }
      }
    }

    return res.status(200).json({ questions });

  } catch (error) {
    console.error("Skill Question Error:", error);
    return res.status(500).json({
      message: "Failed to generate skill questions",
    });
  }
};
