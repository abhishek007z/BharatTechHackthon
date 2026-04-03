// Update your ResumePreview component with these optimizations
import React from "react";
import ClassicTemplate from "./templates/ClassicTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import MinimalImageTemplate from "./templates/MinimalImageTemplate";
import ModernTemplate from "./templates/ModernTemplate";

const ResumePreview = ({ data }) => {
  if (!data) return null;

  const accentColor = data.accent_color || "#2563EB";
  const template = data.template || "classic";

  // ✅ Compact data structure for PDF
  const cleanedData = {
    ...data,
    professional_info: {
      ...data.professional_info,
      image: data.professional_info?.image || "",
    },
    // Limit arrays for single page
    experience: data.experience?.slice(0, 3) || [],
    education: data.education?.slice(0, 2) || [],
    project: data.project?.slice(0, 2) || [],
    achievements: data.achievements?.slice(0, 3) || [],
    skills: data.skills?.slice(0, 10) || [],
  };

  const renderTemplate = () => {
    switch (template) {
      case "minimal":
        return <MinimalTemplate data={cleanedData} accentColor={accentColor} />;

      case "minimal-image":
        return (
          <MinimalImageTemplate
            data={cleanedData}
            accentColor={accentColor}
          />
        );

      case "modern":
        return <ModernTemplate data={cleanedData} accentColor={accentColor} />;

      case "classic":
      default:
        return <ClassicTemplate data={cleanedData} accentColor={accentColor} />;
    }
  };

  return (
    <div className="bg-white">
      {renderTemplate()}
    </div>
  );
};

export default ResumePreview;