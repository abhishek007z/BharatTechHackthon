import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.OPENAI_API_KEY);

export const geminiModel = genAI.getGenerativeModel({
  model: process.env.OPENAI_MODEL,
});
