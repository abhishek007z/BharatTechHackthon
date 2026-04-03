import React, { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { dummyResumeData } from "../assets/assets";
import {
  ArrowLeftIcon,
  Briefcase,
  ChevronRight,
  FileText,
  FolderIcon,
  GraduationCap,
  Palette,
  RefreshCw,
  Sparkles,
  User,
  Wand2,
  Save,
  CheckCircle,
} from "lucide-react";
import PhaseHeader from "../components/PhaseHeader";
import { useNavigate } from "react-router-dom";

import PersonalInfoForm from "../components/PersonalInfoForm";
import ProfessionalSummary from "../components/ProfessionalSummary";
import ExperienceForm from "../components/ExperienceForm";
import EducationForm from "../components/EducationForm";
import ProjectForm from "../components/ProjectForm";
import AchievementsForm from "../components/AchievementsForm";
import SkillsForm from "../components/SkillsForm";
import TemplateSelector from "../components/TemplateSelector";
import ColorPicker from "../components/ColorPicker";
import ResumePreview from "../components/ResumePreview";
import { Download, Eye, EyeOff, Share2 } from "lucide-react";
import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ResumeBuilder = () => {
  const { resumeId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const previewRef = useRef(null);
  const autoSaveTimer = useRef(null);
  const navigate = useNavigate();


  const baseResumeState = {
    _id: "",
    title: "",
    professional_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    skills: [],
    project: [],
    achievements: [],
    template: "classic",
    accent_color: "#3B82F6",
    public: false,
  };

  const [resumeData, setResumeData] = useState(baseResumeState);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  const previewUrl = `${window.location.origin}/view/${resumeData._id || resumeId || "new"}`;

  const loadExistingResume = async () => {
    if (!resumeId) return;
    try {
      const { data } = await api.get("/api/resumes/get/" + resumeId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResumeData(data.resume);
      document.title = data.resume.title || "Resume Builder";
    } catch (error) {
      console.error("Failed to load resume data", error);
    }
  };

  const templates = [
    {
      id: "classic",
      label: "Classic",
      description: "Structured two-column layout with bold headings.",
    },
    {
      id: "minimal",
      label: "Minimal",
      description: "Clean typography with generous white space.",
    },
    {
      id: "minimal-image",
      label: "Minimal + Photo",
      description: "Adds a crisp avatar slot for a personal touch.",
    },
    {
      id: "modern",
      label: "Modern",
      description: "Contemporary layout with stronger accent usage.",
    },
  ];

  const accentPalette = [
    "#2563EB",
    "#7C3AED",
    "#DC2626",
    "#059669",
    "#EA580C",
    "#9333EA",
  ];

  const completionScore = (() => {
    const essentials = ["full_name", "email", "profession"];
    const filled = essentials.filter(
      (field) => resumeData.professional_info?.[field],
    );
    return Math.min(100, Math.round((filled.length / essentials.length) * 100));
  })();

  const handleSkillsChange = (value) => {
    const skillsArray = value
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);
    setResumeData((prev) => ({ ...prev, skills: skillsArray }));
  };

  const handleListChange = (sectionId, index, field, value) => {
    setResumeData((prev) => {
      const list = [...(prev[sectionId] || [])];
      list[index] = { ...(list[index] || {}), [field]: value };
      return { ...prev, [sectionId]: list };
    });
  };

  const addListItem = (sectionId, template) => {
    setResumeData((prev) => ({
      ...prev,
      [sectionId]: [...(prev[sectionId] || []), template],
    }));
  };

  const removeListItem = (sectionId, index) => {
    setResumeData((prev) => ({
      ...prev,
      [sectionId]: (prev[sectionId] || []).filter((_, i) => i !== index),
    }));
  };
  const loadSample = () => {
    if (!dummyResumeData || dummyResumeData.length === 0) {
      toast.error("No sample data available");
      return;
    }

    const randomIndex = Math.floor(Math.random() * dummyResumeData.length);
    const sampleData = dummyResumeData[randomIndex];

    setResumeData({
      ...baseResumeState,
      ...sampleData,
      _id: resumeData._id,
      professional_info: {
        ...baseResumeState.professional_info,
        ...sampleData.professional_info,
      },
    });

    setActiveSectionIndex(0);
    setRemoveBackground(false);

    toast.success("Sample data loaded successfully");
  };

  const resetForm = () => {
    const confirmReset = window.confirm(
      "Are you sure you want to reset all fields? This action cannot be undone.",
    );

    if (confirmReset) {
      setResumeData({
        ...baseResumeState,
        _id: resumeData._id,
        template: resumeData.template,
        accent_color: resumeData.accent_color,
      });
      setActiveSectionIndex(0);
      setRemoveBackground(false);
      setLastSaved(null);

      toast.success("Form reset successfully");
    }
  };

  const togglePublic = async () => {
    try {
      const formData = new FormData();
      formData.append("resumeId", resumeData._id);
      formData.append(
        "resumeData",
        JSON.stringify({ public: !resumeData.public }),
      );

      const { data } = await api.put("/api/resumes/update", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setResumeData(data.resume);
      toast.success(
        `Resume is now ${data.resume.public ? "Public" : "Private"}`,
      );
    } catch (error) {
      toast.error("Failed to update visibility");
    }
  };

  const shareResume = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: resumeData.title || "My Resume",
          url: previewUrl,
        });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(previewUrl);
        toast.success("Preview link copied to clipboard");
      } else {
        window.prompt("Copy this link", previewUrl);
      }
    } catch (error) {
      console.error("Share failed", error);
    }
  };

  // FIXED: Download as single page PDF
  const downloadResume = async () => {
    try {
      toast.loading("Preparing PDF...", { id: "pdf-download" });

      // Get the resume preview element
      const resumeElement = document.getElementById("resume-content");
      if (!resumeElement) {
        toast.error("Resume content not found", { id: "pdf-download" });
        return;
      }

      // Hide unnecessary elements for PDF
      const originalStyles = {
        overflow: resumeElement.style.overflow,
        boxShadow: resumeElement.style.boxShadow,
        borderRadius: resumeElement.style.borderRadius,
        border: resumeElement.style.border,
        margin: resumeElement.style.margin,
        padding: resumeElement.style.padding,
      };

      // Optimize styling for PDF
      resumeElement.style.overflow = "visible";
      resumeElement.style.boxShadow = "none";
      resumeElement.style.borderRadius = "0";
      resumeElement.style.border = "none";
      resumeElement.style.margin = "0";
      resumeElement.style.padding = "0";

      // Create PDF
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      });

      // Configure PDF settings
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const margin = 10;
      const contentWidth = pdfWidth - margin * 2;

      // Get the resume content
      const canvas = await html2canvas(resumeElement, {
        scale: 2, // Higher quality
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
        onclone: (clonedDoc) => {
          // Optimize cloned element for printing
          const clonedElement = clonedDoc.getElementById("resume-content");
          if (clonedElement) {
            clonedElement.style.fontSize = "10pt";
            clonedElement.style.lineHeight = "1.2";

            // Reduce spacing for PDF
            const allElements = clonedElement.querySelectorAll("*");
            allElements.forEach((el) => {
              el.style.marginTop = "2px";
              el.style.marginBottom = "2px";
              el.style.paddingTop = "1px";
              el.style.paddingBottom = "1px";
            });
          }
        },
      });

      const imgData = canvas.toDataURL("image/png");
      const imgWidth = pdfWidth - margin * 2;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Check if content fits on one page
      if (imgHeight > pdfHeight - margin * 2) {
        // Scale down to fit on one page
        const scaleFactor = (pdfHeight - margin * 2) / imgHeight;
        const scaledWidth = imgWidth * scaleFactor * 0.95;
        const scaledHeight = imgHeight * scaleFactor * 0.95;

        pdf.addImage(imgData, "PNG", margin, margin, scaledWidth, scaledHeight);
      } else {
        pdf.addImage(imgData, "PNG", margin, margin, imgWidth, imgHeight);
      }

      // Restore original styles
      Object.assign(resumeElement.style, originalStyles);

      // Save PDF
      const fileName = `${resumeData.title || "Resume"}_${new Date().toISOString().split("T")[0]}.pdf`;
      pdf.save(fileName);

      toast.success("PDF downloaded successfully!", { id: "pdf-download" });
    } catch (error) {
      console.error("PDF Generation Error:", error);
      toast.error("Failed to generate PDF", { id: "pdf-download" });

      // Fallback to simple print method
      fallbackDownload();
    }
  };

  // Fallback download method
  const fallbackDownload = () => {
    try {
      const resumeNode = document.getElementById("resume-content");
      if (!resumeNode) return;

      const printWindow = window.open("", "_blank");
      if (!printWindow) {
        toast.error("Please allow popups to download");
        return;
      }

      // Create optimized HTML for printing
const optimizedHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>${resumeData.title || "Resume"}</title>

<style>
@page {
  size: A4;
  margin: 14mm;
}

body {
  font-family: "Segoe UI", Arial, sans-serif;
  font-size: 10.5pt;
  line-height: 1.35;
  color: #000;
  margin: 0;
  padding: 0;
}

/* FULL RESET (no card, no border, no bg) */
* {
  box-sizing: border-box;
  max-width: 100%;
}

/* ================= HEADER ================= */

.resume-header {
  text-align: center;
  margin-bottom: 14px;
}

.resume-name {
  font-size: 22pt;
  font-weight: 700;
  margin: 0 0 6px 0;
}

/* ICON ROW PERFECT FIX */
.contact-row {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 18px;
}

.contact-item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 10pt;
  white-space: nowrap;
}

.contact-item .icon {
  width: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  line-height: 1;
  mergin-top: -2px;
  
}

/* ================= TEXT ================= */

h2 {
  font-size: 13pt;
  margin: 14px 0 6px 0;
  text-transform: uppercase;
  font-weight: 700;
}

h3 {
  font-size: 11pt;
  margin: 6px 0 2px 0;
  font-weight: 600;
}

p {
  margin: 2px 0;
}

ul {
  margin: 4px 0 6px 16px;
  padding: 0;
}

li {
  margin: 2px 0;
}

@media print {
  body {
    zoom: 0.97;
  }
}
</style>
</head>

<body>

<div class="resume-header">
  <h1 class="resume-name">
    ${resumeData.professional_info?.full_name || "YOUR NAME"}
  </h1>

  <div class="contact-row">
    <div class="contact-item">
      <span class="icon">✉</span>
      <span>${resumeData.professional_info?.email || ""}</span>
    </div>

    <div class="contact-item">
      <span class="icon">☎</span>
      <span>${resumeData.professional_info?.phone || ""}</span>
    </div>

    <div class="contact-item">
      <span class="icon">📍</span>
      <span>${resumeData.professional_info?.location || ""}</span>
    </div>

    <div class="contact-item">
      <span class="icon">in</span>
      <span>${resumeData.professional_info?.linkedin || ""}</span>
    </div>
  </div>
</div>

${resumeNode.innerHTML}

<script>
window.onload = function () {
  window.print();
  setTimeout(() => window.close(), 800);
};
</script>

</body>
</html>
`;



      printWindow.document.write(optimizedHTML);
      printWindow.document.close();
    } catch (error) {
      console.error("Fallback download failed:", error);
      toast.error("Download failed. Please try again.");
    }
  };

  const sections = [
    { id: "professional_info", name: "Personal Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "project", name: "Projects", icon: FolderIcon },
    { id: "achievements", name: "Achievements", icon: Sparkles },
    { id: "skills", name: "Skills", icon: Sparkles },
  ];

  const currentSection = sections[activeSectionIndex];

 const saveResume = async (moveNext = false) => {
  if (isSaving) return;
  setIsSaving(true);

  try {
    const updatedResumeData = {
      ...resumeData,
      professional_info: { ...resumeData.professional_info },
    };

    // image handling
    if (
      updatedResumeData.professional_info.image &&
      typeof updatedResumeData.professional_info.image !== "string"
    ) {
      delete updatedResumeData.professional_info.image;
    }

    const formData = new FormData();
    formData.append("resumeData", JSON.stringify(updatedResumeData));

    if (resumeData._id) {
      formData.append("resumeId", resumeData._id);
    } else if (resumeId) {
      formData.append("resumeId", resumeId);
    }

    removeBackground && formData.append("removeBackground", "yes");

    if (typeof resumeData.professional_info.image === "object") {
      formData.append("image", resumeData.professional_info.image);
    }

    const response = resumeData._id
      ? await api.put("/api/resumes/update", formData, {
          headers: { Authorization: `Bearer ${token}` },
        })
      : await api.post("/api/resumes/create", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });

    const freshResume = response.data.resume;

    // cache break for image
    if (freshResume.professional_info?.image) {
      freshResume.professional_info.image += "?t=" + Date.now();
    }

    setResumeData({ ...freshResume });
    setLastSaved(new Date());

    // ✅ sirf MANUAL save pe next / message
if (moveNext && currentSection.id === "skills") {
  toast.success("Phase 1 completed 🎉");
  navigate(`/app/builder/phase-2/${freshResume._id}`);
  return;
}

    return true;
  } catch (error) {
    console.error("SAVE ERROR:", error.response?.data || error);
    toast.error(error?.response?.data?.message || "Save failed");
    return false;
  } finally {
    setIsSaving(false);
  }
};


  useEffect(() => {
    loadExistingResume();
  }, [resumeId]);


  useEffect(() => {
    if (!resumeData._id && !resumeId) return;

    if (autoSaveTimer.current) {
      clearTimeout(autoSaveTimer.current);
    }

    autoSaveTimer.current = setTimeout(() => {
      saveResume(false);
    }, 10000); // 2 seconds after last change

    return () => clearTimeout(autoSaveTimer.current);
  }, [resumeData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
           <div className="grid grid-cols-3 items-center">

      {/* LEFT */}
      <div className="flex items-center">
        <Link
          to={"/app"}
          className="group inline-flex items-center gap-2 px-3 py-1.5 text-slate-600 hover:text-blue-700 transition-colors"
        >
          <ArrowLeftIcon className="size-4" />
          <span className="text-sm font-medium">Dashboard</span>
        </Link>
      </div>

      {/* CENTER — PHASE HEADER (FIXED) */}
      <div className="flex justify-center">
        <PhaseHeader />
      </div>

      {/* RIGHT */}
      <div className="flex justify-end">
        {lastSaved && (
          <div className="hidden md:flex items-center gap-2 px-2 py-1 bg-emerald-50 border border-emerald-200 rounded-lg">
            <CheckCircle className="size-3 text-emerald-600" />
            <span className="text-xs text-emerald-700">
              Saved{" "}
              {new Date(lastSaved).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        )}
      </div>
        </div>
      </div>
      </div>


      <div className="max-w-7xl mx-auto px-4 pt-1">
        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs font-medium text-slate-700">
                    Section {activeSectionIndex + 1} of {sections.length}
                  </div>
                  <div className="flex items-center gap-2">
                    {completionScore === 100 ? (
                      <div className="flex items-center gap-1 px-2 py-0.5 bg-emerald-100 border border-emerald-200 rounded-full">
                        <CheckCircle className="size-3 text-emerald-600" />
                        <span className="text-xs font-medium text-emerald-700">
                          Complete
                        </span>
                      </div>
                    ) : (
                      <div className="text-xs font-medium text-blue-600">
                        {completionScore}% Complete
                      </div>
                    )}
                  </div>
                </div>

                <div className="relative h-1.5 bg-slate-200 rounded-full overflow-hidden mb-1">
                  <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-300"
                    style={{
                      width: `${(activeSectionIndex * 100) / (sections.length - 1)}%`,
                    }}
                  ></div>
                </div>

                <div className="flex justify-between mt-3">
                  {sections.map((section, idx) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSectionIndex(idx)}
                      className={`flex flex-col items-center gap-1.5 transition-all ${idx <= activeSectionIndex ? "opacity-100" : "opacity-40 hover:opacity-70"}`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${idx === activeSectionIndex ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white scale-110" : idx < activeSectionIndex ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-400"}`}
                      >
                        <section.icon className="size-3" />
                      </div>
                      <span
                        className={`text-xs font-medium ${idx === activeSectionIndex ? "text-blue-700" : "text-slate-500"}`}
                      >
                        {section.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4 p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="text-center">
                  <h3 className="font-semibold text-slate-900 text-sm">
                    {currentSection.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Fill in the details below
                  </p>
                </div>
              </div>

              <div className="mb-4 p-3 bg-gradient-to-r from-slate-50 to-white rounded-lg border border-slate-200">
                <div className="flex items-center gap-3 mb-3">
                  <Palette className="size-4 text-blue-600" />
                  <h4 className="font-medium text-slate-900 text-sm">
                    Design Settings
                  </h4>
                </div>

                <div className="space-y-3">
                  <ColorPicker
                    value={resumeData.accent_color}
                    palette={accentPalette}
                    onChange={(color) =>
                      setResumeData((prev) => ({
                        ...prev,
                        accent_color: color,
                      }))
                    }
                  />

                  <TemplateSelector
                    templates={templates}
                    selected={resumeData.template}
                    onSelect={(templateId) =>
                      setResumeData((prev) => ({
                        ...prev,
                        template: templateId,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="flex gap-2 mb-4">
                <button
                  onClick={loadSample}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-gradient-to-r from-purple-50 to-white border border-purple-200 text-purple-700 rounded-lg hover:border-purple-300 hover:shadow-sm transition-all text-sm"
                >
                  <Wand2 className="size-3.5" />
                  <span className="font-medium">Sample</span>
                </button>
                <button
                  onClick={resetForm}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-gradient-to-r from-slate-50 to-white border border-slate-300 text-slate-700 rounded-lg hover:border-slate-400 hover:shadow-sm transition-all text-sm"
                >
                  <RefreshCw className="size-3.5" />
                  <span className="font-medium">Reset</span>
                </button>
              </div>

              <div className="space-y-4 mb-4">
                {currentSection.id === "professional_info" && (
                  <PersonalInfoForm
                    data={resumeData.professional_info}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        professional_info: data,
                      }))
                    }
                    removeBackground={removeBackground}
                    setRemoveBackground={setRemoveBackground}
                  />
                )}

                {currentSection.id === "summary" && (
                  <ProfessionalSummary
                    value={resumeData.professional_summary}
                    onChange={(value) =>
                      setResumeData((prev) => ({
                        ...prev,
                        professional_summary: value,
                      }))
                    }
                  />
                )}

                {currentSection.id === "experience" && (
                  <ExperienceForm
                    items={resumeData.experience}
                    onAdd={() =>
                      addListItem("experience", {
                        company: "",
                        position: "",
                        start_date: "",
                        end_date: "",
                        description: "",
                        is_current: false,
                      })
                    }
                    onChange={(index, field, value) =>
                      handleListChange("experience", index, field, value)
                    }
                    onRemove={(index) => removeListItem("experience", index)}
                  />
                )}

                {currentSection.id === "education" && (
                  <EducationForm
                    items={resumeData.education}
                    onAdd={() =>
                      addListItem("education", {
                        institution: "",
                        degree: "",
                        field: "",
                        graduation_date: "",
                        gpa: "",
                      })
                    }
                    onChange={(index, field, value) =>
                      handleListChange("education", index, field, value)
                    }
                    onRemove={(index) => removeListItem("education", index)}
                  />
                )}

                {currentSection.id === "project" && (
                  <ProjectForm
                    items={resumeData.project}
                    onAdd={() =>
                      addListItem("project", {
                        name: "",
                        type: "",
                        description: "",
                      })
                    }
                    onChange={(index, field, value) =>
                      handleListChange("project", index, field, value)
                    }
                    onRemove={(index) => removeListItem("project", index)}
                  />
                )}

                {currentSection.id === "achievements" && (
                  <AchievementsForm
                    items={resumeData.achievements}
                    onAdd={() =>
                      addListItem("achievements", {
                        title: "",
                        organization: "",
                        date: "",
                        description: "",
                      })
                    }
                    onChange={(index, field, value) =>
                      handleListChange("achievements", index, field, value)
                    }
                    onRemove={(index) => removeListItem("achievements", index)}
                  />
                )}

                {currentSection.id === "skills" && (
                  <SkillsForm
                    skills={resumeData.skills}
                    onChange={(value) =>
                      setResumeData((prev) => ({ ...prev, skills: value }))
                    }
                    onPaste={(value) => handleSkillsChange(value)}
                  />
                )}
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() =>
                   toast.promise(
  saveResume(true),
  {
    loading: 'Saving...',
    success: 'ResumeSaved!',
    error: 'Save failed',
  }
)

                  }
                  disabled={isSaving}
                  className="flex-1 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 text-sm"
                >
                  <Save className="size-4" />
                  <span>Save Resume</span>
                </button>

                <button
                  onClick={() => {
                    if (activeSectionIndex < sections.length - 1) {
                      setActiveSectionIndex((prev) => prev + 1);
                    }
                  }}
                  disabled={activeSectionIndex === sections.length - 1}
                  className="px-3 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-medium rounded-lg hover:from-emerald-700 hover:to-emerald-600 hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 text-sm"
                >
                  <span>Next</span>
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="sticky top-20">
              <div className="flex items-center justify-between mb-3 p-3 bg-white rounded-lg shadow-sm border border-slate-200">
                <div className="flex items-center gap-2">
                  <div
                    className={`px-2 py-1 rounded-full text-xs ${resumeData.public ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-700"}`}
                  >
                    {resumeData.public ? "Public" : "Private"}
                  </div>

                  {resumeData.title && (
                    <div className="hidden md:block px-2 py-1 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded text-xs">
                      <p className="font-medium text-blue-800">
                        {resumeData.title}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={shareResume}
                    className="p-2 bg-white border border-slate-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all"
                    title="Share"
                  >
                    <Share2 className="size-4 text-slate-600" />
                  </button>

                  <button
                    onClick={togglePublic}
                    className={`p-2 rounded-lg border transition-all ${
                      resumeData.public
                        ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                        : "bg-slate-50 border-slate-300 text-slate-700"
                    }`}
                    title={resumeData.public ? "Make Private" : "Make Public"}
                  >
                    {resumeData.public ? (
                      <Eye className="size-4" />
                    ) : (
                      <EyeOff className="size-4" />
                    )}
                  </button>

                  <button
                    onClick={downloadResume}
                    className="p-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 hover:shadow-md transition-all flex items-center gap-1.5"
                    title="Download as PDF"
                  >
                    <Download className="size-4" />
                    <span className="text-xs font-medium">PDF</span>
                  </button>
                </div>
              </div>

              {/* Main Resume Content with ID for PDF generation */}
              <div id="resume-content" ref={previewRef}>
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                  <ResumePreview
                    data={resumeData}
                    removeBackground={removeBackground}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
