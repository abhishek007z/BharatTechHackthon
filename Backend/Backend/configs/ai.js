import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";

const OLLAMA_URL = process.env.OLLAMA_URL || "http://localhost:11434/api/generate";
const USE_OLLAMA = process.env.USE_OLLAMA === "true";


let googleModel = null;
if (!USE_OLLAMA) {
  if (!process.env.OPENAI_API_KEY || !process.env.OPENAI_MODEL) {
    console.warn("[AI Config] OPENAI_API_KEY or OPENAI_MODEL is missing, switching to OLLAMA mode.");
  } else {
    const genAI = new GoogleGenerativeAI(process.env.OPENAI_API_KEY);
    googleModel = genAI.getGenerativeModel({ model: process.env.OPENAI_MODEL });
  }
}

export const geminiModel = {
  generateContent: async (prompt) => {
    if (!prompt || typeof prompt !== "string") {
      throw new Error("Invalid prompt");
    }

    if (USE_OLLAMA || !googleModel) {
      // Use local OLLAMA server
      try {
        const response = await axios.post(OLLAMA_URL, {
          model: process.env.OLLAMA_MODEL || "qwen2.5:7b",
          prompt: prompt,
          stream: false,
        });

        if (!response?.data?.response) {
          throw new Error("OLLAMA response missing 'response' field.");
        }

        return {
          response: {
            text: () => response.data.response,
          },
        };
      } catch (error) {
        console.error("OLLAMA Error:", error?.response?.data || error.message || error);
        throw new Error("AI generation failed via OLLAMA");
      }
    }

    
    // Google Gemini (fallback when USE_OLLAMA not true)
    try {
      const result = await googleModel.generateContent(prompt);
      return result;
    } catch (error) {
      console.error("Google Gemini Error:", error?.response?.data || error.message || error);
      throw new Error("AI generation failed via Google Gemini");
    }
  },
};














// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(process.env.OPENAI_API_KEY);

// export const geminiModel = genAI.getGenerativeModel({
//   model: process.env.OPENAI_MODEL,
// });
