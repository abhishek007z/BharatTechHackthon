import React from 'react'
import Banner from '../components/home/Banner'
import Hero from '../components/home/Hero'
import Features from '../components/home/Features'
import Testimonial from '../components/home/Testimonial'
import CallToAction from '../components/home/CallToAction'
import Footer from '../components/home/Footer'

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10">
          <Banner />
          <Hero />
          <Features />
          <Testimonial />
          <CallToAction />
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default Home