"use client"

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import AboutUsSection from "@/components/Home/ABoutUs";
import UrbanDataDashboard from "@/components/Home/Analytics";
import Footer from "@/components/Home/Footer";
import { NavigationMenuDemo } from "@/components/Home/Navbar";

import { Libertinus_Sans, Lobster } from "next/font/google";

const LibertinusSerif = Libertinus_Sans({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: 'swap',
});

const lobster = Lobster({
  weight: "400",
  subsets: ["latin"],
  display: 'swap',
});

// Dynamically import components that cause hydration issues
const TypingAnimation = dynamic(
  () => import("@/components/magicui/typing-animation").then(mod => ({ default: mod.TypingAnimation })),
  { 
    ssr: false,
    loading: () => (
      <span className="text-blue-400 text-4xl sm:text-5xl md:text-6xl lg:text-8xl block">
        GeoAI:
      </span>
    )
  }
);

const MarqueeDemoVertical = dynamic(
  () => import("@/components/Home/Carousel").then(mod => ({ default: mod.MarqueeDemoVertical })),
  { 
    ssr: false,
    loading: () => <div className="animate-pulse bg-white/10 h-full w-full rounded" />
  }
);

// Fallback components for static content
const StaticHeading = () => (
  <h1 className="text-white font-bold leading-[1.2]">
    <span className={`${lobster.className} text-blue-400 text-4xl sm:text-5xl md:text-6xl lg:text-8xl block`}>
      GeoAI:
    </span>
    <span className={`${LibertinusSerif.className} font-[700] text-3xl sm:text-4xl md:text-5xl lg:text-7xl block mt-2`}>
      Smart CA Automaton with GEE and GIS for Kolkata
    </span>
  </h1>
);

export default function Home() {
  return (
    <div className="flex flex-col">
      
      
      {/* Hero Section with Video Background */}
      <section className="relative w-full h-screen overflow-hidden -mt-16 lg:-mt-20">
        <video
          src="/kolkata.mp4"
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/kolkata-poster.jpg"
        />
        
        {/* Video Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30 z-10" />
        
        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-start justify-center z-20 px-6 lg:px-12 max-w-[90%] lg:max-w-[60%] pt-16 lg:pt-20">
          <div className="space-y-6">
            {/* Main Heading with Typing Animation */}
            <Suspense fallback={<StaticHeading />}>
              <h1 className="text-white font-bold leading-[1.2]">
                <TypingAnimation
                  className={`${lobster.className} text-blue-400 text-4xl sm:text-5xl md:text-6xl lg:text-8xl block`}
                 
                  duration={50}
                >GeoAi:</TypingAnimation>
                <TypingAnimation
                  className={`${LibertinusSerif.className} font-[700] text-3xl sm:text-4xl md:text-5xl lg:text-7xl block mt-2`}
                >
                  Smart CA Automaton with GEE and GIS for Kolkata
                </TypingAnimation>
              </h1>
            </Suspense>
            
            {/* Subtitle */}
            <p className="text-white/90 text-lg sm:text-xl lg:text-2xl max-w-2xl leading-relaxed">
              Revolutionizing urban planning with advanced geospatial intelligence and AI-driven insights
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-full font-semibold cursor-pointer shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-lg">
                Explore Platform
              </button>
              <button className="border-2 border-white/50 text-white px-8 py-4 rounded-full font-semibold cursor-pointer hover:bg-white/10 transition-all duration-300 text-lg backdrop-blur-sm">
                Our Objectives
              </button>
            </div>
          </div>
        </div>
        
        {/* Right Side Panel */}
        <div className="absolute right-0 top-0 h-full w-80 lg:w-96 bg-black/20 backdrop-blur-sm border-l border-white/20 z-15 hidden md:block pt-16 lg:pt-20">
          <Suspense fallback={<div className="animate-pulse bg-white/10 h-full w-full rounded" />}>
            <MarqueeDemoVertical />
          </Suspense>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>
      
      {/* About Us Section */}
      <section id="about" className="min-h-screen">
        <AboutUsSection />
      </section>
      
      {/* Analytics Dashboard */}
      <section id="analytics" className="min-h-screen">
        <UrbanDataDashboard />
      </section>
      
      {/* Footer */}
     
    </div>
  );
}