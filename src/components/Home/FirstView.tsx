import React, { Suspense } from 'react';
import { ChevronDown, Play, MapPin, Activity, BarChart3 } from 'lucide-react';
import { Libertinus_Sans, Lobster } from 'next/font/google';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Marquee } from '../magicui/marquee';

// Typing Animation Component
interface TypingAnimationProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
}

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
const TypingAnimation = ({ children, className, duration = 50 }: TypingAnimationProps) => {
  const [displayedText, setDisplayedText] = React.useState('');
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const text = typeof children === 'string' ? children : '';

  React.useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, duration);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, duration]);

  return <span className={cn(className, lobster.className)}>{displayedText}</span>;
};

// Static heading fallback
const StaticHeading = () => (
  <h1 className="text-white leading-[1.1] mb-8">
    <span className="text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-6xl sm:text-7xl md:text-8xl lg:text-9xl block font-black tracking-tight mb-4">
      GeoAi
    </span>
    <span className="font-light text-xl sm:text-2xl md:text-3xl lg:text-4xl block text-white/90 tracking-wide leading-relaxed">
      Smart CA Automaton with GEE and GIS for Kolkata
    </span>
  </h1>
);

// Horizontal Marquee Component

const images = [
  "/images/a1.jpg",
  "/images/a2.jpg",
  "/images/a3.jpg",
  "/images/a4.jpg",
  "/images/a5.jpg",
  "/images/a6.jpg",
  "/images/a1.jpg",
  "/images/a2.jpg",
  "/images/a3.jpg",
  "/images/a4.jpg",
  "/images/a5.jpg",
  "/images/a6.jpg",
  "/images/a1.jpg",
  "/images/a2.jpg",
  "/images/a3.jpg",
  "/images/a4.jpg",
  "/images/a5.jpg",
  "/images/a6.jpg",
  "/images/a1.jpg",
  "/images/a2.jpg",
  "/images/a3.jpg",
  "/images/a4.jpg",
  "/images/a5.jpg",
  "/images/a6.jpg",
  "/images/a1.jpg",
  "/images/a2.jpg",
  "/images/a3.jpg",
  "/images/a4.jpg",
  "/images/a5.jpg",
  "/images/a6.jpg",
];

function HorizontalMarquee() {
  return (
    <div className="relative w-full overflow-hidden">
      <Marquee pauseOnHover className="[--duration:50s]">
        {images.map((img, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-80 h-56 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 mr-6"
          >
            <img
              src={img}
              alt={`Kolkata view ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </Marquee>

      {/* Left & Right Gradient Overlays */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  );
}


const HeroSection = () => {
  return (
    <>
    

      {/* Full Screen Hero Section */}
      <section className="relative w-full h-screen overflow-hidden -mt-16 lg:-mt-20">
        {/* Background Video */}
        <video
          src="/kolkata.mp4"
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/kolkata-poster.jpg"
        />

        {/* Black to Transparent Gradient Overlay (Bottom to Top) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />

        {/* Hero Content */}
        <div className="relative z-20 h-full flex flex-col justify-center px-6 lg:px-12 mx-auto">
          <div className="w-full">
            {/* Main Heading with Typing Animation */}
            <Suspense fallback={<StaticHeading />}>
              <h1 className="text-white leading-[1.1] mb-8">
                <TypingAnimation
                  className="text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-6xl sm:text-7xl md:text-8xl lg:text-9xl block font-black tracking-tight mb-4"
                  duration={80}
                >
                  GeoAi
                </TypingAnimation>
                <TypingAnimation
                  className="font-light text-xl sm:text-2xl md:text-3xl lg:text-4xl block text-white/90 tracking-wide leading-relaxed"
                  duration={40}
                >
                  Smart CA Automaton with GEE and GIS for Kolkata
                </TypingAnimation>
              </h1>
            </Suspense>

            {/* Subtitle */}
            <p className="text-white/90 text-lg sm:text-xl lg:text-2xl max-w-3xl leading-relaxed mb-8 font-medium">
              Revolutionizing urban planning with advanced geospatial intelligence and AI-driven insights for sustainable city development
            </p>

            {/* Feature Highlights */}
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <BarChart3 className="w-5 h-5 text-blue-400 mr-2" />
                <span className="text-white text-sm font-medium">Real-time Analytics</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <MapPin className="w-5 h-5 text-emerald-400 mr-2" />
                <span className="text-white text-sm font-medium">GIS Integration</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <Activity className="w-5 h-5 text-purple-400 mr-2" />
                <span className="text-white text-sm font-medium">AI Predictions</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
                <Link href={"/analytics"}>
              <button className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-lg flex items-center justify-center">
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                Explore Platform
              </button>
                </Link>
                <Link href={"/objective"}>
              <button className="border-2 border-white/50 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white/10 transition-all duration-300 text-lg backdrop-blur-sm hover:border-white/70">
                View Objectives
              </button>
                </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
          </div>
          <ChevronDown className="w-6 h-6 text-white/70 mx-auto mt-2" />
        </div>
      </section>

      {/* Horizontal Marquee Section */}
      <section className="relative py-16 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Kolkata Through Our Lens
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Explore the dynamic cityscape of Kolkata through our comprehensive geospatial analysis and urban intelligence platform
            </p>
          </div>

          {/* Horizontal Marquee */}
          <div className="relative">
            {/* Gradient Overlays for smooth edges */}
            <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />
            
            <HorizontalMarquee />
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;