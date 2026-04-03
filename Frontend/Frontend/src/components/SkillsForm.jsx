import React, { useMemo, useState } from "react";
import { PlusCircle, Sparkles, X, Zap, Search, TrendingUp } from "lucide-react";

const suggestedSkills = [
  "React", "TypeScript", "Tailwind CSS", "Node.js", "Figma",
  "Python", "SQL", "Docker", "AWS", "Problem Solving",
  "Next.js", "GraphQL", "MongoDB", "Git", "CI/CD",
  "Agile", "Scrum", "Leadership", "Communication", "Team Management"
];

const SkillsForm = ({ skills = [], onChange, onPaste }) => {
  const [input, setInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const normalizedSkills = useMemo(
    () => skills.map((skill) => skill.trim()).filter(Boolean),
    [skills]
  );

  const filteredSkills = useMemo(() => {
    return suggestedSkills.filter(skill =>
      skill.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !normalizedSkills.includes(skill)
    );
  }, [searchTerm, normalizedSkills]);

  const addSkill = (value) => {
    const cleaned = value.trim();
    if (!cleaned) return;
    if (normalizedSkills.includes(cleaned)) {
      setInput("");
      return;
    }
    onChange([...(normalizedSkills || []), cleaned]);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addSkill(input);
    }
    if (e.key === "Backspace" && !input && normalizedSkills.length) {
      onChange(normalizedSkills.slice(0, -1));
    }
  };

  const removeSkill = (skill) => {
    onChange(normalizedSkills.filter((item) => item !== skill));
  };

  const handleDragStart = (e, skill) => {
    e.dataTransfer.setData("text/plain", skill);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const skill = e.dataTransfer.getData("text/plain");
    addSkill(skill);
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-white rounded-2xl border border-purple-200">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
            <Zap className="size-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">Skills & Expertise</h3>
            <p className="text-xs text-slate-600">Add keywords recruiters search for</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onPaste?.(normalizedSkills.join(", "))}
          className="px-4 py-2.5 bg-gradient-to-r from-purple-100 to-white border border-purple-300 text-purple-700 rounded-xl hover:border-purple-500 hover:shadow-sm transition-all flex items-center gap-2"
        >
          <PlusCircle className="size-4" />
          <span className="font-medium">Paste List</span>
        </button>
      </div>

      {/* Skills Input Area */}
      <div
        className={`relative p-5 bg-gradient-to-br from-white to-slate-50 rounded-2xl border-2 transition-all duration-300 ${
          isDragging
            ? "border-purple-500 bg-purple-50/50"
            : "border-slate-200 hover:border-purple-300"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >

        {/* Current Skills */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-slate-700">
              Your Skills ({normalizedSkills.length})
            </label>
            {normalizedSkills.length > 0 && (
              <button
                type="button"
                onClick={() => onChange([])}
                className="text-xs text-red-600 hover:text-red-800 font-medium"
              >
                Clear All
              </button>
            )}
          </div>

          {normalizedSkills.length === 0 ? (
            <div className="p-6 border-2 border-dashed border-slate-300 rounded-xl text-center">
              <Sparkles className="size-8 text-slate-400 mx-auto mb-3" />
              <p className="text-slate-600">No skills added yet</p>
              <p className="text-sm text-slate-500 mt-1">Add your first skill below</p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {normalizedSkills.map((skill) => (
                <div
                  key={skill}
                  draggable
                  onDragStart={(e) => handleDragStart(e, skill)}
                  className="group relative flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-50 to-white border border-purple-300 hover:border-purple-500 hover:shadow-md transition-all cursor-move max-w-full"
                >
                  <span
                    title={skill}
                    className="font-medium text-purple-700 break-words max-w-[140px] leading-tight"
                  >
                    {skill}
                  </span>

                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="text-purple-600 hover:text-purple-800 transition-colors"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add Skill Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Add New Skill</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a skill and press Enter or comma"
              className="flex-1 px-4 py-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
            <button
              type="button"
              onClick={() => addSkill(input)}
              className="px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-xl hover:from-purple-700 hover:to-pink-700 hover:shadow-lg transition-all"
            >
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Suggested Skills */}
      <div className="p-5 bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
              <TrendingUp className="size-4 text-white" />
            </div>
            <div>
              <h4 className="font-medium text-slate-900">Suggested Skills</h4>
              <p className="text-xs text-slate-600">Popular skills in demand</p>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search skills..."
              className="pl-10 pr-4 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {filteredSkills.map((skill) => (
            <button
              key={skill}
              type="button"
              title={skill}
              onClick={() => addSkill(skill)}
              className="group p-3 bg-white border border-slate-300 rounded-xl hover:border-blue-500 hover:shadow-md transition-all text-left overflow-hidden h-[78px] flex flex-col justify-between"
            >
              <span className="text-sm font-medium text-slate-700 group-hover:text-blue-700 truncate">
                {skill}
              </span>
              <div className="text-xs text-slate-500 flex justify-between items-center">
                Click to add
                <PlusCircle className="size-4" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsForm;
