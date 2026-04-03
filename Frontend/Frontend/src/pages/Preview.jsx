import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeftIcon, Share2, Eye, Download } from "lucide-react";
import ResumePreview from "../components/ResumePreview";
import api from "../configs/api";
import toast from "react-hot-toast";

const Preview = () => {
  const { resumeId } = useParams();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPublicResume = async () => {
      try {
        const { data } = await api.get("/api/resumes/public/" + resumeId);
        setResume(data.resume);
      } catch (err) {
        setError("This resume is private or does not exist");
      } finally {
        setLoading(false);
      }
    };

    fetchPublicResume();
  }, [resumeId]);

  const handleDownload = () => {
    const resumeNode = document.getElementById("resume-preview");
    if (!resumeNode) return;

    const printWindow = window.open("", "_blank", "width=900,height=1200");
    if (!printWindow) return;

    printWindow.document.write("<html><head><title>Resume</title>");
    document.querySelectorAll('link[rel="stylesheet"], style').forEach((el) => {
      printWindow.document.write(el.outerHTML);
    });
    printWindow.document.write("</head><body>");
    printWindow.document.write(resumeNode.innerHTML);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.focus();

    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 400);
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: resume?.title || "My Resume",
          text: "Check out my resume",
          url: window.location.href,
        });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard");
      }
    } catch (error) {
      console.error("Share failed:", error);
    }
  };

  // 🔄 Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading resume...
      </div>
    );
  }

  // ❌ Private or not found
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-xl font-semibold text-red-600">{error}</p>
        <Link
          to="/"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Go Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="group inline-flex gap-3 items-center px-4 py-2.5 bg-white border border-slate-300 rounded-xl hover:border-blue-500 hover:shadow-md transition-all"
            >
              <ArrowLeftIcon className="size-4 text-slate-500 group-hover:text-blue-600" />
              <span className="text-slate-700 group-hover:text-blue-800 font-medium">
                Back
              </span>
            </Link>

            <div className="flex items-center gap-4">
              <div className="hidden md:block px-4 py-2 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg">
                <p className="text-sm text-slate-700">
                  Viewing:{" "}
                  <span className="font-semibold text-blue-800">
                    {resume?.title || "Untitled resume"}
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-300 rounded-xl hover:border-purple-500 hover:bg-purple-50 hover:shadow-md transition-all"
                >
                  <Share2 className="size-4 text-slate-500" />
                  <span className="text-slate-700 font-medium">Share</span>
                </button>

                <button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 hover:shadow-lg transition-all"
                >
                  <Download className="size-4" />
                  <span className="font-medium">Download</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8 p-6 bg-gradient-to-r from-slate-50 to-white rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <Eye className="size-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-slate-800">
              Public Resume Preview
            </h2>
          </div>
          <p className="text-slate-600">
            This resume is publicly accessible using this link.
          </p>
        </div>

        <div
          id="resume-preview"
          className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
        >
          <ResumePreview data={resume} removeBackground={false} />
        </div>
      </div>
    </div>
  );
};

export default Preview;
