import React from "react";
import Title from "./Title";
import { BookUserIcon, Star, Quote } from "lucide-react";

const Testimonial = () => {
    const cardsData = [
        {
            image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200',
            name: 'Briar Martin',
            handle: '@neilstellar',
            role: 'Software Engineer @ Google',
            content: 'ResumeCraft completely transformed my job search. The AI suggestions helped me land interviews at top tech companies within weeks!',
            rating: 5
        },
        {
            image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200',
            name: 'Avery Johnson',
            handle: '@averywrites',
            role: 'Marketing Director @ Microsoft',
            content: 'The professional templates and real-time optimization made creating my resume effortless. Highly recommended for professionals!',
            rating: 5
        },
        {
            image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60',
            name: 'Jordan Lee',
            handle: '@jordantalks',
            role: 'Product Manager @ Amazon',
            content: 'Finally a resume builder that understands what recruiters want. The ATS optimization feature is a game-changer!',
            rating: 5
        },
        {
            image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60',
            name: 'Samantha Cruz',
            handle: '@samdesigns',
            role: 'UX Designer @ Apple',
            content: 'Beautiful templates that actually work. My resume went from getting no responses to multiple interview calls!',
            rating: 5
        },
    ];

    const CreateCard = ({ card }) => (
        <div className="group relative p-6 rounded-3xl bg-gradient-to-br from-white to-slate-50 border-2 border-slate-200 hover:border-blue-300 hover:shadow-2xl transition-all duration-300 w-80 shrink-0 mx-4">
            {/* Quote Icon */}
            <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="size-16 text-blue-500" />
            </div>
            
            {/* User Info */}
            <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-0 group-hover:opacity-30 transition-opacity"></div>
                    <img className="relative size-14 rounded-full border-2 border-white shadow-sm" src={card.image} alt="User" />
                </div>
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <h3 className="font-bold text-slate-900">{card.name}</h3>
                        <svg className="mt-0.5 fill-blue-600" width="16" height="16" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M4.555.72a4 4 0 0 1-.297.24c-.179.12-.38.202-.59.244a4 4 0 0 1-.38.041c-.48.039-.721.058-.922.129a1.63 1.63 0 0 0-.992.992c-.071.2-.09.441-.129.922a4 4 0 0 1-.041.38 1.6 1.6 0 0 1-.245.59 3 3 0 0 1-.239.297c-.313.368-.47.551-.56.743-.213.444-.213.96 0 1.404.09.192.247.375.56.743.125.146.187.219.24.297.12.179.202.38.244.59.018.093.026.189.041.38.039.48.058.721.129.922.163.464.528.829.992.992.2.071.441.09.922.129.191.015.287.023.38.041.21.042.411.125.59.245.078.052.151.114.297.239.368.313.551.47.743.56.444.213.96.213 1.404 0 .192-.09.375-.247.743-.56.146-.125.219-.187.297-.24.179-.12.38-.202.59-.244a4 4 0 0 1 .38-.041c.48-.039.721-.058.922-.129.464-.163.829-.528.992-.992.071-.2.09-.441.129-.922a4 4 0 0 1 .041-.38c.042-.21.125-.411.245-.59.052-.078.114-.151.239-.297.313-.368.47-.551.56-.743.213-.444.213-.96 0-1.404-.09-.192-.247-.375-.56-.743a4 4 0 0 1-.24-.297 1.6 1.6 0 0 1-.244-.59 3 3 0 0 1-.041-.38c-.039-.48-.058-.721-.129-.922a1.63 1.63 0 0 0-.992-.992c-.2-.071-.441-.09-.922-.129a4 4 0 0 1-.38-.041 1.6 1.6 0 0 1-.59-.245A3 3 0 0 1 7.445.72C7.077.407 6.894.25 6.702.16a1.63 1.63 0 0 0-1.404 0c-.192.09-.375.247-.743.56m4.07 3.998a.488.488 0 0 0-.691-.69l-2.91 2.91-.958-.957a.488.488 0 0 0-.69.69l1.302 1.302c.19.191.5.191.69 0z" />
                        </svg>
                    </div>
                    <p className="text-sm text-slate-600">{card.role}</p>
                    <div className="flex items-center gap-1 mt-2">
                        {[...Array(card.rating)].map((_, i) => (
                            <Star key={i} className="size-3 fill-yellow-400 text-yellow-400" />
                        ))}
                    </div>
                </div>
            </div>
            
            {/* Content */}
            <p className="text-slate-700 leading-relaxed mb-4">
                "{card.content}"
            </p>
            
            {/* Verified Badge */}
            <div className="flex items-center gap-2 text-sm text-emerald-600">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="font-medium">Verified Success Story</span>
            </div>
        </div>
    );

    return (
        <>
            <div id="testimonials" className="flex flex-col items-center my-20 scroll-mt-12 relative">
                {/* Background Elements */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 rounded-full blur-3xl"></div>
                </div>

                <div className="relative z-10 text-center">
                    {/* Header Badge */}
                    <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-emerald-50 to-cyan-50 border border-emerald-200 rounded-full mb-4">
                        <BookUserIcon className="size-4 text-emerald-600" />
                        <span className="text-sm font-medium bg-gradient-to-r from-emerald-700 to-cyan-700 bg-clip-text text-transparent">
                            Success Stories
                        </span>
                    </div>
                    
                    {/* Title */}
                    <Title
                        title="Trusted by Professionals Worldwide"
                        description="Join thousands of successful professionals who landed their dream jobs with our AI-powered resume builder."
                    />
                </div>
            </div>

            {/* Marquee Section */}
            <div className="relative py-10 overflow-hidden">
                {/* Gradient Overlays */}
                <div className="absolute left-0 top-0 h-full w-32 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>
                <div className="absolute right-0 top-0 h-full w-32 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
                
                {/* First Marquee */}
                <div className="marquee-row mb-8">
                    <div className="marquee-inner flex transform-gpu min-w-[200%]">
                        {[...cardsData, ...cardsData].map((card, index) => (
                            <CreateCard key={index} card={card} />
                        ))}
                    </div>
                </div>

                {/* Second Marquee (Reverse) */}
                <div className="marquee-row">
                    <div className="marquee-inner marquee-reverse flex transform-gpu min-w-[200%]">
                        {[...cardsData.reverse(), ...cardsData.reverse()].map((card, index) => (
                            <CreateCard key={index} card={card} />
                        ))}
                    </div>
                </div>

                {/* Stats Bar */}
                <div className="mt-16 flex justify-center">
                    <div className="inline-flex items-center gap-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200">
                        <div className="text-center">
                            <div className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">10,000+</div>
                            <div className="text-sm text-slate-600 mt-1">Happy Users</div>
                        </div>
                        <div className="h-12 w-px bg-gradient-to-b from-transparent via-blue-300 to-transparent"></div>
                        <div className="text-center">
                            <div className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">95%</div>
                            <div className="text-sm text-slate-600 mt-1">Interview Rate</div>
                        </div>
                        <div className="h-12 w-px bg-gradient-to-b from-transparent via-blue-300 to-transparent"></div>
                        <div className="text-center">
                            <div className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">4.9</div>
                            <div className="text-sm text-slate-600 mt-1">Average Rating</div>
                        </div>
                    </div>
                </div>

                <style jsx>{`
                    @keyframes marqueeScroll {
                        0% { transform: translateX(0%); }
                        100% { transform: translateX(-50%); }
                    }

                    .marquee-inner {
                        animation: marqueeScroll 40s linear infinite;
                    }

                    .marquee-reverse {
                        animation-direction: reverse;
                    }
                    
                    .marquee-inner:hover {
                        animation-play-state: paused;
                    }
                `}</style>
            </div>
        </>
    );
};

export default Testimonial;