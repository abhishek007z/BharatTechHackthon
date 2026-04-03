import {
  FilePenLineIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadCloudIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import pdfToText from "react-pdftotext";
import { LoaderCircleIcon } from "lucide-react";

import api from "../configs/api";

const Dashboard = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const colors = [
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  ];

  const [allResumes, setAllResumes] = useState([]);
  const [title, setTitle] = useState("");
  const [resumeFile, setResumeFile] = useState(null);

  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editResumeId, setEditResumeId] = useState("");

  // CREATE RESUME
  const createResume = async (e) => {
    e.preventDefault();

    try {
      const resumeData = {
        title,
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

      const formData = new FormData();
      formData.append("resumeData", JSON.stringify(resumeData));

      const { data } = await api.post("/api/resumes/create", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Resume created");
      navigate(`/app/builder/${data.resume._id}`);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to create resume");
    }
  };

  // UPLOAD RESUME
  const uploadResume = async (e) => {
    e.preventDefault();

    if (!resumeFile) {
      toast.error("Please select a PDF file");
      return;
    }

    setIsLoading(true);

    try {
      const resumeText = await pdfToText(resumeFile);

      if (!resumeText || resumeText.trim().length < 50) {
        toast.error("PDF text could not be read. Please upload a text-based PDF.");
        setIsLoading(false);
        return;
      }

      const { data } = await api.post(
        "/api/ai/upload-resume",
        { title, resumeText },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setShowUploadResume(false);
      navigate(`/app/builder/${data.resume._id}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const loadAllResumes = async () => {
    try {
      const { data } = await api.get("/api/users/resumes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllResumes(data.resumes);
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    loadAllResumes();
  }, []);

  // DELETE RESUME
  const deleteResume = async (resumeId) => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this resume?"
      );

      if (confirm) {
        const { data } = await api.delete(`/api/resumes/delete/${resumeId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAllResumes(allResumes.filter((resume) => resume._id !== resumeId));

        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  // EDIT RESUME TITLE
  const editTitle = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("resumeId", editResumeId);
      formData.append("resumeData", JSON.stringify({ title }));

      const { data } = await api.put("/api/resumes/update", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAllResumes(
        allResumes.map((resume) =>
          resume._id === editResumeId ? { ...resume, title } : resume
        )
      );

      setTitle("");
      setEditResumeId("");
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            My Resumes
          </h1>
          <p className="text-gray-600">
            Create, upload, and manage your professional resumes
          </p>
        </div>

        {/* Action Buttons with SVGs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Create Resume Card */}
          <div className="group relative bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex flex-col lg:flex-row">
              {/* Left side - Content */}
              <div className="p-6 lg:p-8 flex-1 flex flex-col justify-center">
                <button
                  onClick={() => setShowCreateResume(true)}
                  className="text-left"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mb-4">
                    <PlusIcon className="size-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Create Resume
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Start from scratch with our professional templates. Perfect for creating a brand new resume.
                  </p>
                  <span className="text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                    Start Creating →
                  </span>
                </button>
              </div>
              
              {/* Right side - SVG Illustration */}
              <div className="hidden lg:flex flex-1 items-center justify-center p-6 bg-gradient-to-br from-blue-50 to-purple-50">
                <svg 
                  width="100%" 
                  height="100%" 
                  viewBox="0 0 300 200" 
                  className="max-w-[280px] max-h-[200px]"
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="40" y="30" width="200" height="140" rx="12" fill="white" stroke="#3B82F6" strokeWidth="2"/>
                  <rect x="60" y="50" width="160" height="15" rx="7.5" fill="#DBEAFE"/>
                  <rect x="60" y="75" width="120" height="10" rx="5" fill="#E5E7EB"/>
                  <rect x="60" y="95" width="140" height="8" rx="4" fill="#E5E7EB"/>
                  <rect x="60" y="110" width="100" height="8" rx="4" fill="#E5E7EB"/>
                  <rect x="60" y="125" width="160" height="8" rx="4" fill="#E5E7EB"/>
                  <rect x="60" y="140" width="140" height="8" rx="4" fill="#E5E7EB"/>
                  <rect x="60" y="155" width="120" height="8" rx="4" fill="#E5E7EB"/>
                  <path d="M220 60L240 80L260 60" stroke="#8B5CF6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="250" cy="50" r="8" fill="#10B981"/>
                  <circle cx="230" cy="150" r="8" fill="#F59E0B"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Upload Resume Card */}
          <div className="group relative bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex flex-col lg:flex-row">
              {/* Left side - Content */}
              <div className="p-6 lg:p-8 flex-1 flex flex-col justify-center">
                <button
                  onClick={() => setShowUploadResume(true)}
                  className="text-left"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mb-4">
                    <UploadCloudIcon className="size-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Upload Existing
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Upload your existing PDF resume and we'll extract the content automatically. Perfect for updating old resumes.
                  </p>
                  <span className="text-green-600 font-medium group-hover:text-green-700 transition-colors">
                    Upload PDF →
                  </span>
                </button>
              </div>
              
              {/* Right side - SVG Illustration */}
              <div className="hidden lg:flex flex-1 items-center justify-center p-6 bg-gradient-to-br from-green-50 to-emerald-50">
                <svg 
                  width="100%" 
                  height="100%" 
                  viewBox="0 0 300 200" 
                  className="max-w-[280px] max-h-[200px]"
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="60" y="50" width="180" height="140" rx="8" fill="white" stroke="#10B981" strokeWidth="2"/>
                  <path d="M70 80L160 80L170 100L230 100" stroke="#059669" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M70 120L130 120L140 140L210 140" stroke="#059669" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M70 160L110 160L120 180L190 180" stroke="#059669" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="250" cy="60" r="20" fill="#34D399"/>
                  <path d="M250 50V70M240 60H260" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                  <path d="M240 110H270" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round"/>
                  <path d="M240 130H260" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round"/>
                  <path d="M240 150H250" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round"/>
                  <rect x="80" y="30" width="140" height="20" rx="10" fill="#D1FAE5"/>
                  <text x="150" y="44" textAnchor="middle" fill="#059669" fontSize="12" fontWeight="600">resume.pdf</text>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Resume Cards Section */}
        {allResumes.length > 0 ? (
          <>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Your Resumes ({allResumes.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {allResumes.map((resume, index) => {
                const gradientColor = colors[index % colors.length];

                return (
                  <div
                    key={resume._id}
                    className="group relative bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <button
                      onClick={() => navigate(`/app/builder/${resume._id}`)}
                      className="w-full h-full p-6 flex flex-col items-center justify-center gap-4"
                    >
                      {/* Gradient Header */}
                      <div
                        className="w-full h-32 rounded-xl mb-4 flex items-center justify-center"
                        style={{ background: gradientColor }}
                      >
                        <FilePenLineIcon className="size-12 text-white/90" />
                      </div>

                      {/* Resume Title */}
                      <h3 className="text-lg font-semibold text-gray-900 text-center line-clamp-2">
                        {resume.title || "Untitled Resume"}
                      </h3>

                      {/* Date Info */}
                      <p className="text-sm text-gray-500">
                        Updated{" "}
                        {new Date(resume.updatedAt).toLocaleDateString()}
                      </p>
                    </button>

                    {/* Action Buttons */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteResume(resume._id);
                        }}
                        className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-red-50 hover:text-red-600 transition-colors"
                        title="Delete Resume"
                      >
                        <TrashIcon className="size-4" />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditResumeId(resume._id);
                          setTitle(resume.title);
                          setShowCreateResume(true);
                        }}
                        className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        title="Edit Title"
                      >
                        <PencilIcon className="size-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
              <FilePenLineIcon className="size-12 text-gray-500" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              No resumes yet
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Get started by creating a new resume or uploading an existing one
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setShowCreateResume(true)}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-xl hover:shadow-lg transition-all hover:scale-105"
              >
                Create Your First Resume
              </button>
              <button
                onClick={() => setShowUploadResume(true)}
                className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-800 font-medium rounded-xl hover:border-blue-500 hover:shadow-lg transition-all"
              >
                Upload PDF
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {showCreateResume && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
              <h2 className="text-2xl font-bold text-white">
                {editResumeId ? "Edit Resume Title" : "Create New Resume"}
              </h2>
              <p className="text-blue-100 mt-1">
                {editResumeId
                  ? "Update your resume title"
                  : "Give your resume a descriptive title"}
              </p>
            </div>

            {/* Modal Body */}
            <form onSubmit={editResumeId ? editTitle : createResume} className="p-6">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resume Title
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="e.g. Senior Frontend Developer Resume"
                  required
                  autoFocus
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateResume(false);
                    setEditResumeId("");
                    setTitle("");
                  }}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-xl hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all"
                >
                  {editResumeId ? "Update Title" : "Create Resume"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadResume && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6">
              <h2 className="text-2xl font-bold text-white">
                Upload Your Resume
              </h2>
              <p className="text-emerald-100 mt-1">
                Upload and parse your existing PDF resume
              </p>
            </div>

            {/* Modal Body */}
            <form onSubmit={uploadResume} className="p-6">
              {/* Title Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resume Title
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Frontend Developer Resume"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>

              {/* File Upload */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resume PDF File
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-green-500 transition-colors">
                  <UploadCloudIcon className="size-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 mb-2">
                    Drop your PDF here or click to browse
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    Supports only text-based PDF files
                  </p>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setResumeFile(e.target.files[0])}
                    className="w-full text-sm"
                    required
                  />
                  {resumeFile && (
                    <p className="mt-4 text-green-600 font-medium">
                      ✓ Selected: {resumeFile.name}
                    </p>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <button
                disabled={isLoading}
                className={`w-full py-3.5 rounded-xl font-medium text-lg transition-all ${
                  isLoading
                    ? "bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-600 to-emerald-700 hover:shadow-lg hover:from-green-700 hover:to-emerald-800"
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <LoaderCircleIcon className="size-5 animate-spin" />
                    Processing PDF...
                  </span>
                ) : (
                  "Upload & Process Resume"
                )}
              </button>

              {/* Cancel Button */}
              <button
                type="button"
                onClick={() => setShowUploadResume(false)}
                className="w-full mt-3 px-4 py-2.5 border-2 border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;