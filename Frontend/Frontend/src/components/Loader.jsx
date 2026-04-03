import React from 'react';

const Loader = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
    <div className="relative">
      {/* Outer Ring */}
      <div className="w-24 h-24 border-4 border-blue-500/20 rounded-full"></div>
      
      {/* Spinning Ring */}
      <div className="absolute inset-0 w-24 h-24 border-4 border-transparent border-t-blue-500 border-r-purple-500 rounded-full animate-spin"></div>
      
      {/* Inner Ring */}
      <div className="absolute inset-4 w-16 h-16 border-4 border-transparent border-b-emerald-500 border-l-cyan-500 rounded-full animate-spin-reverse"></div>
      
      {/* Center Dot */}
      <div className="absolute inset-8 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
    </div>
    
    <div className="mt-8 text-center">
      <h3 className="text-xl font-semibold text-white mb-2">Building Your Resume</h3>
      <p className="text-blue-200">Please wait while we prepare everything...</p>
      
      {/* Progress Dots */}
      <div className="flex justify-center gap-2 mt-6">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>

    <style jsx>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      @keyframes spin-reverse {
        0% { transform: rotate(360deg); }
        100% { transform: rotate(0deg); }
      }
      
      .animate-spin {
        animation: spin 1.5s linear infinite;
      }
      
      .animate-spin-reverse {
        animation: spin-reverse 2s linear infinite;
      }
    `}</style>
  </div>
);

export default Loader;