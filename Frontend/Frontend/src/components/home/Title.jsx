import React from 'react'

const Title = ({ title, description }) => {
  return (
    <div className="text-center mt-6 relative">
      {/* Background Element */}
      <div className="absolute -top-4 -left-4 -right-4 -bottom-4 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-3xl blur-3xl"></div>
      
      <div className="relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
          <span className="relative inline-block">
            {title}
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-full"></div>
          </span>
        </h2>
        
        <p className="max-w-2xl mx-auto text-lg text-slate-600 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

export default Title;