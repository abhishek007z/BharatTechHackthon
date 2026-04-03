import React from "react";
import { Linkedin, Twitter, Youtube, Instagram, ArrowRight, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-300">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute -inset-2  "></div>
                <img src="/logo.svg" alt="ResumeCraft AI" className="relative h-12 w-auto" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
             
              </span>
            </div>
            
            <p className="text-slate-400 leading-relaxed max-w-md">
              Empowering professionals worldwide with AI-powered resume building tools. 
              Create resumes that get noticed and land your dream job.
            </p>
            
            {/* Newsletter */}
            <div className="space-y-4">
              <h4 className="font-semibold text-white">Stay Updated</h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-500"
                />
                <button className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2">
                  <ArrowRight className="size-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Product</h4>
            <ul className="space-y-4">
              {['Features', 'Templates', 'Pricing', 'AI Tools', 'Support'].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-slate-400 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center gap-2 group"
                  >
                    <ArrowRight className="size-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Resources</h4>
            <ul className="space-y-4">
              {['Blog', 'Guides', 'Career Tips', 'Community', 'API Docs'].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-slate-400 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center gap-2 group"
                  >
                    <ArrowRight className="size-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </a>
                </li>
              ))}
              <li>
                <a 
                  href="#" 
                  className="text-slate-400 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center gap-2 group"
                >
                  <ArrowRight className="size-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Careers
                  <span className="text-xs text-white bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-md ml-2 px-2 py-1">
                    We're hiring!
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="size-5 text-blue-400 mt-1" />
                <div>
                  <div className="text-sm text-slate-400">Email</div>
                  <div className="text-white">support@resumecraft.com</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="size-5 text-blue-400 mt-1" />
                <div>
                  <div className="text-sm text-slate-400">Phone</div>
                  <div className="text-white">+1 (555) 123-4567</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="size-5 text-blue-400 mt-1" />
                <div>
                  <div className="text-sm text-slate-400">Location</div>
                  <div className="text-white">San Francisco, CA</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700/50 my-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="text-slate-400">
              © {currentYear} ResumeCraft AI. All rights reserved.
            </p>
            <div className="flex gap-6 mt-3 text-sm text-slate-500">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a 
              href="#" 
              className="p-2.5 bg-slate-800/50 hover:bg-blue-600/20 border border-slate-700 hover:border-blue-500 rounded-lg group transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="size-5 text-slate-400 group-hover:text-white" />
            </a>
            <a 
              href="#" 
              className="p-2.5 bg-slate-800/50 hover:bg-sky-600/20 border border-slate-700 hover:border-sky-500 rounded-lg group transition-all"
              aria-label="Twitter"
            >
              <Twitter className="size-5 text-slate-400 group-hover:text-white" />
            </a>
            <a 
              href="#" 
              className="p-2.5 bg-slate-800/50 hover:bg-pink-600/20 border border-slate-700 hover:border-pink-500 rounded-lg group transition-all"
              aria-label="Instagram"
            >
              <Instagram className="size-5 text-slate-400 group-hover:text-white" />
            </a>
            <a 
              href="#" 
              className="p-2.5 bg-slate-800/50 hover:bg-red-600/20 border border-slate-700 hover:border-red-500 rounded-lg group transition-all"
              aria-label="YouTube"
            >
              <Youtube className="size-5 text-slate-400 group-hover:text-white" />
            </a>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap justify-center gap-6 mt-12">
          <div className="px-4 py-2 bg-gradient-to-r from-blue-900/30 to-blue-800/20 border border-blue-700/30 rounded-lg text-sm">
            🔒 GDPR Compliant
          </div>
          <div className="px-4 py-2 bg-gradient-to-r from-emerald-900/30 to-emerald-800/20 border border-emerald-700/30 rounded-lg text-sm">
            ⭐ 4.9/5 Rating
          </div>
          <div className="px-4 py-2 bg-gradient-to-r from-purple-900/30 to-purple-800/20 border border-purple-700/30 rounded-lg text-sm">
            🚀 99.9% Uptime
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;