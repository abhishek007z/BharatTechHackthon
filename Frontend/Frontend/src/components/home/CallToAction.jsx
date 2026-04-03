import React from 'react'
import { ArrowRight, Sparkles, CheckCircle } from 'lucide-react'

const CallToAction = () => {
  return (
    <div id='cta' className='relative py-24 overflow-hidden'>
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main CTA Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="relative p-10 md:p-16 rounded-3xl border-2 border-white/50 bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-xl shadow-2xl overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-full blur-2xl"></div>
          
          <div className="relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-8">
              <Sparkles className="size-4 text-blue-600 animate-pulse" />
              <span className="text-sm font-medium bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
                Limited Time Offer
              </span>
            </div>
            
            {/* Content */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
                  Start Building Your <span className="relative inline-block">
                    <span className="relative z-10 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent">
                      Dream Career
                    </span>
                    <div className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur"></div>
                  </span> Today
                </h2>
                
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  Join thousands of professionals who transformed their careers with our AI-powered resume builder. 
                  No credit card required to start.
                </p>
                
                {/* Features List */}
                <div className="space-y-3 mb-10">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="size-5 text-emerald-500" />
                    <span className="text-slate-700">AI-Powered Resume Analysis</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="size-5 text-emerald-500" />
                    <span className="text-slate-700">50+ Professional Templates</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="size-5 text-emerald-500" />
                    <span className="text-slate-700">Real-time Optimization</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="size-5 text-emerald-500" />
                    <span className="text-slate-700">ATS Friendly Formats</span>
                  </div>
                </div>
              </div>
              
              {/* CTA Card */}
              <div className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border-2 border-white shadow-xl">
                <div className="text-center mb-8">
                  <div className="text-5xl font-bold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent mb-2">FREE</div>
                  <div className="text-slate-600">Start building today</div>
                </div>
                
                <div className="space-y-4">
                  <a 
                    href="/login?state=register" 
                    className="group block w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-center"
                  >
                    <div className="flex items-center justify-center gap-3">
                      <span>Start Building Free</span>
                      <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </a>
                  
                  <button className="group w-full py-4 px-6 bg-gradient-to-r from-white to-slate-50 border-2 border-slate-300 text-slate-800 font-semibold rounded-xl hover:border-blue-500 hover:shadow-lg transition-all">
                    <div className="flex items-center justify-center gap-3">
                      <span>Schedule Demo</span>
                    </div>
                  </button>
                </div>
                
                {/* Trust Indicators */}
                <div className="mt-8 pt-8 border-t border-slate-200">
                  <div className="flex items-center justify-center gap-6">
                    <div className="text-center">
                      <div className="text-xl font-bold text-slate-900">10K+</div>
                      <div className="text-xs text-slate-600">Users</div>
                    </div>
                    <div className="h-8 w-px bg-gradient-to-b from-transparent via-slate-300 to-transparent"></div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-slate-900">4.9★</div>
                      <div className="text-xs text-slate-600">Rating</div>
                    </div>
                    <div className="h-8 w-px bg-gradient-to-b from-transparent via-slate-300 to-transparent"></div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-slate-900">24/7</div>
                      <div className="text-xs text-slate-600">Support</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute -bottom-20 left-10 w-40 h-40 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -top-20 right-10 w-40 h-40 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  )
}

export default CallToAction;