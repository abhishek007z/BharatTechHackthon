import React from "react";
import { Sparkles } from "lucide-react";

const Banner = () => {
  return (
    <div className="relative w-full py-4 font-medium text-sm text-center overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 animate-gradient-x"></div>
      
      {/* Animated dots overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-white rounded-full animate-ping"></div>
        <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-white rounded-full animate-bounce"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center gap-3">
        <div className="flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
          <Sparkles className="size-4 text-yellow-300 animate-pulse" />
          <span className="text-white font-semibold">New</span>
        </div>
        
        <p className="text-white font-medium">
          <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent font-semibold">
            AI-Powered Resume Analysis
          </span>{" "}
          feature just launched! Try it now →
        </p>
      </div>

      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default Banner;