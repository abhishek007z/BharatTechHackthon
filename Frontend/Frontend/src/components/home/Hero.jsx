import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Menu, X, ArrowRight, Sparkles, Star } from "lucide-react";

const Hero = () => {
  const { user } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);

  const logos = [
    "https://saasly.prebuiltui.com/assets/companies-logo/instagram.svg",
    "https://saasly.prebuiltui.com/assets/companies-logo/framer.svg",
    "https://saasly.prebuiltui.com/assets/companies-logo/microsoft.svg",
    "https://saasly.prebuiltui.com/assets/companies-logo/huawei.svg",
    "https://saasly.prebuiltui.com/assets/companies-logo/walmart.svg",
  ];

  return (
    <div className="min-h-screen pb-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Navbar */}
      <nav className="relative z-20 flex items-center justify-between px-6 md:px-12 lg:px-24 xl:px-32 py-6">
        <Link to="/" className="group">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <img src="/logo.svg" alt="ResumeCraft AI" className="relative h-12 w-auto" />
            </div>
           
          </div>
        </Link>

        <div className="hidden md:flex gap-8 text-slate-800">
          <a href="#features" className="relative group hover:text-blue-700 transition-colors">
            <span className="font-medium">Features</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="#testimonials" className="relative group hover:text-blue-700 transition-colors">
            <span className="font-medium">Testimonials</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="#contact" className="relative group hover:text-blue-700 transition-colors">
            <span className="font-medium">Contact</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
          </a>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {!user && (
            <>
              <Link
                to="/login?state=login"
                className="px-6 py-2.5 border-2 border-slate-300 text-slate-700 font-medium rounded-xl hover:border-blue-500 hover:text-blue-700 hover:shadow-md transition-all"
              >
                Sign In
              </Link>
              <Link
                to="/login?state=register"
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all flex items-center gap-2"
              >
                <Sparkles className="size-4" />
                Get Started
              </Link>
            </>
          )}

          {user && (
            <Link
              to="/app"
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all flex items-center gap-2"
            >
              <span className="font-medium">Dashboard</span>
              <ArrowRight className="size-4" />
            </Link>
          )}
        </div>

        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden p-2 rounded-lg bg-gradient-to-r from-slate-100 to-white border border-slate-300 hover:border-blue-500 transition-all"
        >
          <Menu className="size-6 text-slate-700" />
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center gap-8 text-white">
          <div className="absolute top-6 right-6">
            <button
              onClick={() => setMenuOpen(false)}
              className="p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
            >
              <X className="size-6" />
            </button>
          </div>
          
          <div className="flex flex-col gap-8 text-center">
            <a onClick={() => setMenuOpen(false)} href="#features" className="text-2xl font-medium hover:text-blue-300 transition-colors">Features</a>
            <a onClick={() => setMenuOpen(false)} href="#testimonials" className="text-2xl font-medium hover:text-blue-300 transition-colors">Testimonials</a>
            <a onClick={() => setMenuOpen(false)} href="#contact" className="text-2xl font-medium hover:text-blue-300 transition-colors">Contact</a>
            
            <div className="pt-8 border-t border-white/20 flex flex-col gap-4">
              <Link
                onClick={() => setMenuOpen(false)}
                to="/login?state=login"
                className="px-8 py-3 border-2 border-white/30 text-white font-medium rounded-xl hover:bg-white/10 transition-all"
              >
                Sign In
              </Link>
              <Link
                onClick={() => setMenuOpen(false)}
                to="/login?state=register"
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center text-center px-6 md:px-12 lg:px-24 xl:px-32 mt-16 md:mt-24">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-full mb-6">
          <Star className="size-4 text-blue-600" />
          <span className="text-sm font-medium bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
            Trusted by 10,000+ professionals
          </span>
        </div>

        {/* Main Heading */}
        <div className="relative mb-6">
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
          <h1 className="relative text-4xl md:text-6xl lg:text-7xl font-bold max-w-6xl leading-tight">
            Land Your{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent">
                Dream Job
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur"></div>
            </span>{" "}
            with AI-Powered Resumes
          </h1>
        </div>

        {/* Subtitle */}
        <p className="mt-6 max-w-2xl text-lg md:text-xl text-slate-600 leading-relaxed">
          Create, optimize, and customize professional resumes with intelligent AI assistance. 
          Get hired faster with resumes that stand out.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link
            to={user ? "/app" : "/login?state=register"}
            className="group px-8 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3"
          >
            <span>Start Building Free</span>
            <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
          </Link>

         
        </div>

        {/* Trusted By Section */}
        {/* <div className="mt-20">
          <p className="text-sm font-medium text-slate-500 mb-6 tracking-wider">
            TRUSTED BY LEADING COMPANIES WORLDWIDE
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {logos.map((logo, i) => (
              <div key={i} className="relative group">
                <div className="absolute -ins-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <img 
                  src={logo} 
                  alt="brand" 
                  className="relative h-8 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" 
                />
              </div>
            ))}
          </div>
        </div> */}

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl">
          <div className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-200 text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">95%</div>
            <p className="text-sm text-slate-600 mt-2">Interview Call Rate</p>
          </div>
          <div className="p-6 bg-gradient-to-br from-purple-50 to-white rounded-2xl border border-purple-200 text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">10K+</div>
            <p className="text-sm text-slate-600 mt-2">Successful Resumes</p>
          </div>
          <div className="p-6 bg-gradient-to-br from-emerald-50 to-white rounded-2xl border border-emerald-200 text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">4.9★</div>
            <p className="text-sm text-slate-600 mt-2">User Rating</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;