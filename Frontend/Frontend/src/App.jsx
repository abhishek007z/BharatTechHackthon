import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";
import ResumeBuilderPhase2 from "./pages/ResumeBuilderPhase2";
import ResumeBuilderPhase3 from "./pages/ResumeBuilderPhase3";

import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ResumeBuilder from "./pages/ResumeBuilder";
import Preview from "./pages/Preview";
import Login from "./pages/Login";

import api from "./configs/api";
import { login, setLoading } from "./app/features/authSlice";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [loading, setAppLoading] = useState(true);
  const [previousPath, setPreviousPath] = useState("");

  const getUserData = async () => {
    const token = localStorage.getItem("token");

    // 🔥 IMPORTANT: token nahi hai to API call mat karo
    if (!token) {
      dispatch(setLoading(false));
      setAppLoading(false);
      return;
    }

    try {
      const { data } = await api.get("/api/users/data", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data?.user) {
        dispatch(login({ token, user: data.user }));
      }
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    } finally {
      dispatch(setLoading(false));
      setAppLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  // Track previous path for animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setPreviousPath(location.pathname);
    }, 300);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Determine animation direction
  const getAnimationDirection = () => {
    if (!previousPath) return "";
    
    const routes = ["/", "/login", "/app", "/app/builder", "/view"];
    const currentIndex = routes.findIndex(route => location.pathname.startsWith(route));
    const prevIndex = routes.findIndex(route => previousPath.startsWith(route));
    
    if (currentIndex > prevIndex) return "slide-left";
    if (currentIndex < prevIndex) return "slide-right";
    return "";
  };

  const animationClass = getAnimationDirection();

  // Loading screen
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="relative">
          {/* Animated Logo */}
          <div className="relative mb-8">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl"></div>
            <img src="/logo.svg" alt="ResumeCraft AI" className="relative h-16 w-auto" />
          </div>
          
          {/* Animated Spinner */}
          <div className="relative">
            <div className="w-20 h-20 border-4 border-blue-500/20 rounded-full"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-blue-500 border-r-purple-500 rounded-full animate-spin"></div>
            <div className="absolute inset-4 w-12 h-12 border-4 border-transparent border-b-emerald-500 border-l-cyan-500 rounded-full animate-spin-reverse"></div>
            <div className="absolute inset-6 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
          </div>
          
          {/* Loading Text */}
          <div className="mt-8 text-center">
            <h3 className="text-xl font-semibold text-white mb-2">Loading ResumeCraft</h3>
            <p className="text-blue-200">Preparing your workspace...</p>
            
            {/* Progress Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i}
                  className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.2}s` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Custom Toaster Styling */}
      <Toaster 
        position="top-right" 
        toastOptions={{
          className: '!bg-gradient-to-r !from-white !to-slate-50 !border !border-slate-200 !shadow-xl !rounded-xl',
          duration: 3000,
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: '#FFFFFF',
            },
            style: {
              borderLeft: '4px solid #10B981',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#FFFFFF',
            },
            style: {
              borderLeft: '4px solid #EF4444',
            },
          },
          loading: {
            style: {
              borderLeft: '4px solid #3B82F6',
            },
          },
        }}
      />

      {/* Background Gradient Elements */}
      <div className="fixed inset-0 z-[-2] overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Animated Route Container */}
      <div className={`transition-all duration-300 ${animationClass}`}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route path="/app" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="builder/:resumeId" element={<ResumeBuilder />} />
            
  {/* Resume Builder Phases */}
  <Route
    path="builder/phase-1/:resumeId"
    element={<ResumeBuilder />}
  />
  <Route
    path="builder/phase-2/:resumeId"
    element={<ResumeBuilderPhase2 />}
  />
  <Route
    path="builder/phase-3/:resumeId"
    element={<ResumeBuilderPhase3 />}
  />
          </Route>

          <Route path="view/:resumeId" element={<Preview />} />
        </Routes>
      </div>

      {/* Custom CSS Animations */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes spin-reverse {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-spin {
          animation: spin 1.5s linear infinite;
        }
        
        .animate-spin-reverse {
          animation: spin-reverse 2s linear infinite;
        }
        
        .slide-left {
          animation: slideInLeft 0.3s ease-out;
        }
        
        .slide-right {
          animation: slideInRight 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default App;