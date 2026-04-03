import React, { useState } from "react";
import { Medal, PlusCircle, Trash2, Award, Star, Zap, Sparkles } from "lucide-react";
import toast from "react-hot-toast";
import api from "../configs/api.js"; // 🔥 path check kar lena

const AchievementsForm = ({ items = [], onAdd, onChange, onRemove }) => {
  const [loading, setLoading] = useState(false);

  // ✅ AI generator (NOW CORRECT PLACE)
  const generateAIResponse = async (index) => {
    const item = items[index];

    if (!item.title && !item.organization && !item.date) {
      toast.error("Please fill at least title or organization first");
      return;
    }

    setLoading(true);
    try {
      const prompt = `
Achievement Title: ${item.title || ""}
Organization: ${item.organization || ""}
Date: ${item.date || ""}

Generate a professional achievement description. Make it concise, impactful, ATS-friendly and highlight skills or measurable impact.
      `;

      const res = await api.post("/api/ai/enhance-job-desc", {
        userContent: prompt,
      });

      onChange(index, "description", res.data.enhancedContent);
      toast.success("AI description generated");
    } catch (error) {
      console.error("AI error:", error);
      toast.error(error?.response?.data?.message || "AI generation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-white rounded-2xl border border-blue-200">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg">
            <Award className="size-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">Achievements & Certifications</h3>
            <p className="text-xs text-slate-600">Showcase awards and recognitions</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-medium rounded-xl"
        >
          <PlusCircle className="size-4" /> Add Achievement
        </button>
      </div>

      {items.map((item, index) => (
        <div key={index} className="p-5 bg-white rounded-2xl border space-y-4">

          <input
            value={item.title || ""}
            onChange={(e) => onChange(index, "title", e.target.value)}
            placeholder="Achievement title"
            className="w-full px-3 py-2 border rounded-lg"
          />

          <textarea
            rows={3}
            value={item.description || ""}
            onChange={(e) => onChange(index, "description", e.target.value)}
            placeholder="Achievement description"
            className="w-full px-3 py-2 border rounded-lg"
          />

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => generateAIResponse(index)}
              disabled={loading}
              className="inline-flex items-center gap-1 text-xs px-3 py-1.5 border rounded-full hover:bg-blue-50 text-blue-700 border-blue-200"
            >
              <Sparkles className="size-3.5" />
              {loading ? "Generating..." : "Generate AI Description"}
            </button>

            <button
              type="button"
              onClick={() => onRemove(index)}
              className="text-red-500 text-xs"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AchievementsForm;
