import React, { useEffect, useState , useCallback  } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";
import { 
  ChevronDown, 
  ChevronUp, 
  Target, 
  Star, 
  Clock, 
  Zap, 
  CheckCircle, 
  Sparkles, 
  BookOpen,
  TrendingUp,
  Award,
  Lightbulb,
  Brain,
  Users,
  Briefcase,
  Code,
  BarChart,
  MessageSquare,
  HelpCircle
} from "lucide-react";

import PhaseHeader from "../components/PhaseHeader";

const ResumeBuilderPhase2 = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const [resumeData, setResumeData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [questions, setQuestions] = useState(null);
  const [loadingQ, setLoadingQ] = useState(false);
  const [expandedLevels, setExpandedLevels] = useState({
    easy: true,
    medium: true,
    hard: true
  });

  // Mock question generator for demonstration
const generateAndSetQuestions = useCallback(async () => {
  if (!resumeId) return toast.error("Invalid resume ID");

  setLoadingQ(true);

  try {
    const res = await api.post(
      "/api/resumes/skills/questions",
      { resumeId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setQuestions(res.data.questions);

    const total =
      (res.data.questions.easy?.length || 0) +
      (res.data.questions.medium?.length || 0) +
      (res.data.questions.hard?.length || 0);

    toast.success(`AI generated ${total} questions`);
  } catch {
    toast.error("Failed to generate questions");
  } finally {
    setLoadingQ(false);
  }
}, [resumeId, token]);



  // ✅ LOAD RESUME
 useEffect(() => {
  api
    .get(`/api/resumes/get/${resumeId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      setResumeData(res.data.resume);

      if (res.data.resume?.skills?.length > 0) {
        generateAndSetQuestions();
      }
    })
    .catch(() => toast.error("Failed to load resume"));
}, [resumeId, token, generateAndSetQuestions]);


  // ✅ FETCH QUESTIONS FROM SKILLS
  const fetchQuestions = async () => {
    if (!resumeId) {
      toast.error("Invalid resume ID");
      return;
    }

    if (!resumeData?.skills?.length) {
      toast.error("Please add skills to your resume first");
      return;
    }

  generateAndSetQuestions();

  };

  // ✅ SAVE & NEXT
  const saveAndNext = async () => {
    setSaving(true);
    try {
      await api.put(
        "/api/resumes/update",
        {
          resumeId,
          resumeData: JSON.stringify({ ...resumeData, phase: 3 }),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Phase 2 completed 🎯");
      navigate(`/app/builder/phase-3/${resumeId}`);
    } catch (error) {
      toast.error(`Save failed: ${error.message || "Server error"}`);
    } finally {
      setSaving(false);
    }
  };

  const toggleLevel = (level) => {
    setExpandedLevels(prev => ({
      ...prev,
      [level]: !prev[level]
    }));
  };

  const getDifficultyIcon = (level) => {
    switch(level) {
      case 'easy': return <Clock className="w-5 h-5" />;
      case 'medium': return <Target className="w-5 h-5" />;
      case 'hard': return <Award className="w-5 h-5" />;
      default: return <HelpCircle className="w-5 h-5" />;
    }
  };

  if (!resumeData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading resume data...</p>
        </div>
      </div>
    );
  }

  const totalQuestions = questions ? 
    (questions.easy?.length || 0) + (questions.medium?.length || 0) + (questions.hard?.length || 0) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* 🔒 FIXED HEADER */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-lg border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="grid grid-cols-3 items-center">
            <div />
            <div className="flex justify-center">
              <PhaseHeader />
            </div>
            <div />
          </div>
        </div>
      </div>

      {/* MAIN CONTENT - FULL WIDTH */}
      <div className="max-w-7xl mx-auto p-6">
        {/* TOP STATS CARD */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white mb-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">Skill Assessment & Interview Preparation</h1>
              <p className="text-blue-100">
                Practice with {totalQuestions}+ personalized questions based on your {resumeData?.skills?.length} skills
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold">{totalQuestions}</div>
                <div className="text-sm text-blue-200">Total Questions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{resumeData?.skills?.length || 0}</div>
                <div className="text-sm text-blue-200">Skills Covered</div>
              </div>
              <button
                onClick={fetchQuestions}
                disabled={loadingQ}
                className="px-5 py-2.5 bg-white text-blue-700 rounded-xl hover:bg-blue-50 transition-all flex items-center gap-2 font-semibold"
              >
                {loadingQ ? (
                  <>
                    <div className="w-4 h-4 border-2 border-blue-700 border-t-transparent rounded-full animate-spin"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    Regenerate Questions
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* SKILLS DISPLAY */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Briefcase className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-bold text-slate-800">Your Skills</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {resumeData?.skills?.map((skill, index) => (
              <div key={index} className="group relative">
                <div className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl flex items-center gap-2 hover:border-blue-300 hover:shadow-md transition-all">
                  {skill.includes("JavaScript") || skill.includes("React") || skill.includes("Node") ? (
                    <Code className="w-4 h-4 text-blue-500" />
                  ) : skill.includes("Communication") || skill.includes("Leadership") ? (
                    <Users className="w-4 h-4 text-green-500" />
                  ) : skill.includes("Analytics") || skill.includes("Data") ? (
                    <BarChart className="w-4 h-4 text-purple-500" />
                  ) : (
                    <Star className="w-4 h-4 text-amber-500" />
                  )}
                  <span className="font-medium text-slate-700">{skill}</span>
                  <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full ml-2">
                    {skill.length > 15 ? "Advanced" : "Core"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* QUESTIONS CONTAINER - FULL WIDTH */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-blue-600" />
                Interview Questions
              </h2>
              <p className="text-slate-600 mt-1">Questions generated based on your skills and experience level</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={saveAndNext}
                disabled={saving}
                className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-xl hover:from-emerald-700 hover:to-green-700 transition-all flex items-center gap-2"
              >
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Save & Continue to Phase 3
                  </>
                )}
              </button>
            </div>
          </div>

          {/* LOADING STATE */}
          {loadingQ && (
            <div className="text-center py-12">
              <div className="inline-flex flex-col items-center gap-4">
                <div className="w-16 h-16 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
                <div>
                  <p className="text-lg font-medium text-slate-700">Generating comprehensive question bank...</p>
                  <p className="text-sm text-slate-500 mt-1">Analyzing {resumeData?.skills?.length} skills to create 50+ questions</p>
                </div>
              </div>
            </div>
          )}

          {/* QUESTIONS GRID - 3 COLUMNS */}
          {questions && !loadingQ && (
            <div className="space-y-8">
              <div className="grid grid-cols-3 gap-6">
                {["easy", "medium", "hard"].map((level) => (
                  <div key={level} className="border border-slate-200 rounded-xl overflow-hidden">
                    {/* LEVEL HEADER */}
                    <div 
                      className={`p-5 cursor-pointer transition-all ${
                        level === "easy" ? "bg-gradient-to-b from-green-50 to-emerald-50" :
                        level === "medium" ? "bg-gradient-to-b from-yellow-50 to-amber-50" :
                        "bg-gradient-to-b from-red-50 to-rose-50"
                      } border-b border-slate-200`}
                      onClick={() => toggleLevel(level)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            level === "easy" ? "bg-green-100 text-green-700" :
                            level === "medium" ? "bg-yellow-100 text-yellow-700" :
                            "bg-red-100 text-red-700"
                          }`}>
                            {getDifficultyIcon(level)}
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-800 text-lg capitalize">
                              {level} Level
                            </h3>
                            <p className="text-slate-600 text-sm">
                              {questions[level]?.length || 0} Questions
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            level === "easy"
                              ? "bg-green-100 text-green-700"
                              : level === "medium"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}>
                            {level.toUpperCase()}
                          </span>
                          {expandedLevels[level] ? (
                            <ChevronUp className="w-5 h-5 text-slate-500" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-slate-500" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* QUESTIONS LIST - SCROLLABLE */}
                    {expandedLevels[level] && (
                      <div className="h-[600px] overflow-y-auto">
                        <div className="divide-y divide-slate-100">
                          {questions[level]?.map((item, index) => (
                            <div key={index} className="p-4 hover:bg-slate-50 transition-colors">
                              <div className="flex gap-3">
                                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-semibold">
                                  {index + 1}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-start justify-between mb-2">
                                    <h4 className="font-medium text-slate-800 pr-4">
                                      {item.question}
                                    </h4>
                                    <div className="flex gap-1">
                                      {index % 3 === 0 && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">Behavioral</span>}
                                      {index % 3 === 1 && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">Technical</span>}
                                      {index % 3 === 2 && <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">Scenario</span>}
                                    </div>
                                  </div>
                                  <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                                    <div className="flex items-center gap-2 mb-2">
                                      <Lightbulb className="w-4 h-4 text-amber-500" />
                                      <span className="text-sm font-medium text-slate-700">Suggested Answer</span>
                                    </div>
                                    <p className="text-slate-700 text-sm leading-relaxed">
                                      {item.answer}
                                    </p>
                                    <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-200">
                                      <span className="text-xs text-slate-500 flex items-center gap-1">
                                        <Brain className="w-3 h-3" />
                                        Estimated prep time: {level === 'easy' ? '2-3 min' : level === 'medium' ? '5-7 min' : '10-15 min'}
                                      </span>
                                      <span className="text-xs text-slate-500 flex items-center gap-1">
                                        <TrendingUp className="w-3 h-3" />
                                        Common in: {level === 'easy' ? 'Screening' : level === 'medium' ? 'Technical' : 'Final'}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* ADDITIONAL TIPS SECTION */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="w-6 h-6 text-blue-600" />
                  <h3 className="text-lg font-bold text-slate-800">Interview Preparation Tips</h3>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-slate-700">Practice Daily</span>
                    </div>
                    <p className="text-sm text-slate-600">Spend 30 minutes daily practicing different question types</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-slate-700">Use STAR Method</span>
                    </div>
                    <p className="text-sm text-slate-600">Structure answers with Situation, Task, Action, Result format</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-purple-600" />
                      <span className="font-medium text-slate-700">Mock Interviews</span>
                    </div>
                    <p className="text-sm text-slate-600">Practice with peers or record yourself for feedback</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* NO QUESTIONS STATE */}
          {!loadingQ && !questions && (
            <div className="text-center py-16 border-2 border-dashed border-slate-300 rounded-xl">
              <div className="max-w-md mx-auto">
                <Brain className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-700 mb-3">Ready to Generate Questions</h3>
                <p className="text-slate-600 mb-6">
                  Click the "Generate Questions" button above to create a comprehensive question bank based on your {resumeData?.skills?.length} skills.
                  You'll get 50+ questions across all difficulty levels.
                </p>
                <button
                  onClick={fetchQuestions}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center gap-2 mx-auto"
                >
                  <Zap className="w-5 h-5" />
                  Generate 50+ Questions Now
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilderPhase2;
