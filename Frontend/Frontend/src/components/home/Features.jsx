import { Zap, Sparkles, Shield, TrendingUp, FileCheck } from 'lucide-react';
import React, { useState } from 'react'
import Title from './Title';

const Features = () => {
    const [activeFeature, setActiveFeature] = useState(0);

    const features = [
        {
            icon: FileCheck,
            title: "Smart AI Analysis",
            description: "Get instant insights into your resume with AI-powered analysis and suggestions.",
            color: "from-blue-500 to-cyan-500",
            bgColor: "bg-blue-50",
            borderColor: "border-blue-200"
        },
        {
            icon: Shield,
            title: "Professional Templates",
            description: "Choose from 50+ ATS-friendly templates designed by HR professionals.",
            color: "from-emerald-500 to-green-500",
            bgColor: "bg-emerald-50",
            borderColor: "border-emerald-200"
        },
        {
            icon: TrendingUp,
            title: "Real-time Optimization",
            description: "Live feedback and optimization suggestions as you build your resume.",
            color: "from-purple-500 to-pink-500",
            bgColor: "bg-purple-50",
            borderColor: "border-purple-200"
        },
        {
            icon: Sparkles,
            title: "One-Click Export",
            description: "Export to PDF, Word, or share directly with recruiters in one click.",
            color: "from-orange-500 to-amber-500",
            bgColor: "bg-orange-50",
            borderColor: "border-orange-200"
        }
    ];

    return (
        <div id='features' className='flex flex-col items-center my-20 scroll-mt-12 relative'>
            {/* Background Elements */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10">
                {/* Header */}
                <div className="flex flex-col items-center">
                    <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-full mb-4">
                        <Zap className="size-4 text-blue-600 animate-pulse" />
                        <span className="text-sm font-medium bg-gradient-to-r from-blue-700 to-cyan-700 bg-clip-text text-transparent">
                            Simple & Powerful
                        </span>
                    </div>
                    
                    <Title 
                        title='Build Your Perfect Resume' 
                        description='Our intelligent platform combines AI-powered tools with professional templates to create resumes that get results.'
                    />
                </div>

                {/* Feature Showcase */}
                <div className="mt-16 grid md:grid-cols-2 gap-8 max-w-6xl">
                    {/* Left Column - Feature Cards */}
                    <div className="space-y-6">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div 
                                    key={index}
                                    onClick={() => setActiveFeature(index)}
                                    className={`group cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 ${feature.bgColor} ${feature.borderColor} hover:shadow-xl hover:scale-[1.02] ${activeFeature === index ? 'shadow-lg scale-[1.02]' : ''}`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.color} group-hover:scale-110 transition-transform`}>
                                            <Icon className="size-6 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-semibold text-slate-900 mb-2">{feature.title}</h3>
                                            <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Right Column - Feature Image/Preview */}
                    <div className="relative">
                        <div className="sticky top-24">
                            <div className="relative p-8 bg-gradient-to-br from-white to-slate-50 rounded-3xl border-2 border-slate-200 shadow-2xl overflow-hidden">
                                {/* Floating Elements */}
                                <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-2xl"></div>
                                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-full blur-2xl"></div>
                                
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-12 h-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                                        <span className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
                                            Live Preview
                                        </span>
                                    </div>
                                    
                                    <div className="space-y-6">
                                        <div className="p-4 bg-gradient-to-r from-blue-50 to-white rounded-xl border border-blue-200">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm font-medium text-blue-700">AI Analysis Score</span>
                                                <span className="px-2 py-1 bg-gradient-to-r from-emerald-100 to-emerald-50 text-emerald-700 text-xs font-bold rounded-full">92%</span>
                                            </div>
                                            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                                                <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full" style={{ width: '92%' }}></div>
                                            </div>
                                        </div>
                                        
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="p-4 bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-200">
                                                <div className="text-2xl font-bold text-slate-900">50+</div>
                                                <div className="text-sm text-slate-600 mt-1">Templates</div>
                                            </div>
                                            <div className="p-4 bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-200">
                                                <div className="text-2xl font-bold text-slate-900">∞</div>
                                                <div className="text-sm text-slate-600 mt-1">Customizations</div>
                                            </div>
                                        </div>
                                        
                                        <div className="p-4 bg-gradient-to-br from-purple-50 to-white rounded-xl border border-purple-200">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                                                    <Sparkles className="size-4 text-white" />
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-slate-900">Smart Suggestions</div>
                                                    <div className="text-sm text-slate-600">AI-powered improvements</div>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2 text-sm">
                                                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"></div>
                                                    <span className="text-slate-700">Optimize keywords</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-400"></div>
                                                    <span className="text-slate-700">Format improvements</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-purple-400"></div>
                                                    <span className="text-slate-700">Content suggestions</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Stats Bar */}
                            <div className="mt-8 flex flex-wrap justify-center gap-6">
                                <div className="text-center">
                                    <div className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">10K+</div>
                                    <div className="text-sm text-slate-600">Users Trust Us</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">95%</div>
                                    <div className="text-sm text-slate-600">Success Rate</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">4.9★</div>
                                    <div className="text-sm text-slate-600">Avg Rating</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Features;