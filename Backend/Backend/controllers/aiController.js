import Resume from "../models/Resume.js";
import { geminiModel } from "../configs/ai.js";

/* =========================================================
   ENHANCE PROFESSIONAL SUMMARY
   POST : /api/ai/enhance-pro-sum
========================================================= */

export const enhanceProfessionalSummary = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = `
You are an expert resume writer.

Enhance the following professional summary into 1–2 strong ATS-friendly sentences.
Highlight skills, experience, and career objective.
Return ONLY text.

Summary:
${userContent}
`;

    const result = await geminiModel.generateContent(prompt);
    const enhancedContent = result.response.text();

    res.status(200).json({ enhancedContent });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================================================
   ENHANCE JOB DESCRIPTION
   POST : /api/ai/enhance-job-desc
========================================================= */

export const enhanceJobDescription = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = `
You are an expert resume writer.

Enhance the following job description into 1–2 ATS-friendly sentences.
Use action verbs and quantifiable achievements.
Return ONLY text.

Job Description:
${userContent}
`;

    const result = await geminiModel.generateContent(prompt);
    const enhancedContent = result.response.text();

    res.status(200).json({ enhancedContent });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================================================
   UPLOAD & PARSE RESUME
   POST : /api/ai/upload-resume
========================================================= */

export const uploadResume = async (req, res) => {
  try {
    const { resumeText, title } = req.body;
    const userId = req.userId;

    if (!resumeText || resumeText.trim().length < 50) {
      return res.status(400).json({
        message: "Resume text could not be extracted from PDF",
      });
    }

    const prompt = `
You are an AI resume parser.

Extract structured data from the resume text below.
Return ONLY valid JSON in this format:

{
  "professional_summary": "",
  "skills": [],
  "professional_info": {
    "image": "",
    "full_name": "",
    "profession": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "website": ""
  },
  "experience": [
    {
      "company": "",
      "position": "",
      "start_date": "",
      "end_date": "",
      "description": "",
      "is_current": false
    }
  ],
  "project": [
    {
      "name": "",
      "type": "",
      "description": ""
    }
  ],
  "education": [
    {
      "institution": "",
      "degree": "",
      "field": "",
      "graduation_date": "",
      "gpa": ""
    }
  ]
}

Resume Text:
${resumeText}
`;

    const result = await geminiModel.generateContent(prompt);
    const rawText = result.response.text();

    let parsedData;
    try {
      parsedData = JSON.parse(rawText);
    } catch (err) {
      return res.status(400).json({
        message: "AI response could not be parsed",
      });
    }

    const newResume = await Resume.create({
      userId,
      title: title || "Untitled Resume",
      ...parsedData,
    });

    res.status(201).json({ resume: newResume });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
