import {  MarqueeDemoVertical } from "@/components/Home/Carousel";
import { NavigationMenuDemo } from "@/components/Home/Navbar";
import { TypingAnimation } from "@/components/magicui/typing-animation";

import { Libertinus_Sans, Lobster } from "next/font/google";

const Libertinus_Serif = Libertinus_Sans({
  weight: ["400", "700"],
  subsets: ["latin"],
});


const lobster = Lobster({
  weight: "400",
  subsets: ["latin"],
});
export default function Home() {
  return (

<div className="flex flex-col">


<div className="max-w-full max-h-screen overflow-hidden">
      {/* Video Section */}
      <div className="flex-1 w-full overflow-hidden relative">
        <video
          src={"/kolkata.mp4"}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />


        {/* Centered Text */}
        <div className="absolute inset-0 flex items-center justify-start z-20 max-w-[60%] flex-wrap">
          <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-bold text-left px-4 leading-[1.2]">
           <TypingAnimation className={`${lobster.className} lg:text-8xl text-blue-400 inline`}>
            GeoAI:
           </TypingAnimation> <TypingAnimation className={`${Libertinus_Serif.className} font-[700] inline`}>Smart CA Automaton with GEE and GIS for Kolkata</TypingAnimation>
          </h1>
         
        </div>
         <div className="bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 h-full w-[22rem] absolute right-0 top-0 border-l-2 border-black">
          <MarqueeDemoVertical/>
         </div>
         
      </div>
     
          </div>
          <div className="h-screen w-full bg-green-300">a</div>
          </div>
  );
}
