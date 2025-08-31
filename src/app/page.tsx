"use client"


import AboutUsSection from "@/components/Home/ABoutUs";
import UrbanDataDashboard from "@/components/Home/Analytics";

import HeroSection from '@/components/Home/FirstView';


export default function Home() {
  return (
    <div className="flex flex-col">
      
      
      {/* Hero Section with Video Background */}
      <section id="firstView" className="min-h-screen">
        <HeroSection />
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