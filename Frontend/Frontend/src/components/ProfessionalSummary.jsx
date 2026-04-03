import React, { useMemo, useState } from "react";
import { Sparkles, Wand2 } from "lucide-react";
import api from "../configs/api";
import toast from "react-hot-toast";

const SAMPLES = [
  "Results-driven professional combining strategic thinking with hands-on execution to deliver measurable business impact.",
  "Creative technologist skilled in translating complex requirements into elegant, human-centered solutions.",
  "Collaborative leader who thrives in fast-paced environments and loves mentoring teams toward excellence.",
];

const ProfessionalSummary = ({ value, onChange }) => {
  const [loading, setLoading] = useState(false);
  const wordCount = useMemo(
    () => (value ? value.trim().split(/\s+/).length : 0),
    [value]
  );

  const applySample = () => {
    const pick = SAMPLES[Math.floor(Math.random() * SAMPLES.length)];
    onChange(pick);
  };

  // 🔥 BACKEND AI CALL
const generateAIResponse = async () => {
  // 🔴 1. Empty check
  if (!value || value.trim().length < 10) {
    alert("Please write something first (at least 10 characters)");
    return;
  }

  setLoading(true);
  try {
    const res = await api.post("/api/ai/enhance-pro-sum", {
      userContent: value,
    });

    onChange(res.data.enhancedContent);
  } catch (error) {
    console.error("AI error:", error);
    alert(error?.response?.data?.message || "AI generation failed");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <Sparkles className="size-4 text-amber-500" />
          Professional Summary
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={applySample}
            className="inline-flex items-center gap-1 text-xs px-3 py-1.5 border rounded-full hover:bg-amber-50 text-amber-700 border-amber-200 transition"
          >
            <Wand2 className="size-3.5" />
            Quick fill
          </button>

          <button
            type="button"
            onClick={generateAIResponse}
            disabled={loading}
            className="inline-flex items-center gap-1 text-xs px-3 py-1.5 border rounded-full hover:bg-blue-50 text-blue-700 border-blue-200 transition disabled:opacity-60"
          >
            {loading ? "Generating..." : "Enhance with AI"}
          </button>
        </div>
      </div>

      <textarea
        rows={5}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Tell recruiters about your strengths, impact, and what you want next."
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
      />

      <div className="flex justify-between text-xs text-slate-500">
        <span>Use action words + metrics to highlight impact.</span>
        <span>{wordCount} words</span>
      </div>
    </div>
  );
};

export default ProfessionalSummary;
