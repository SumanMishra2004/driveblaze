import React from 'react';
import { Globe } from './Globe';
import { GlobeDemo } from './HomeGlobe';

const AboutUsSection: React.FC = () => {
  return (
    <div className=" h-full w-full bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 p-4 lg:p-8 flex items-center">
      <div className=" mx-auto w-full">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row min-h-[70vh]">
            {/* Content Section - 55% */}
            <div className="flex-[0_0_100%] lg:flex-[0_0_55%] p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
              <div className="space-y-6">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
                  About <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600">Us</span>
                </h1>
                
                <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded"></div>
                
                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl">
                  We are passionate innovators dedicated to creating exceptional digital experiences that transform businesses and inspire communities.
                </p>
                
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl">
                  Our team combines creativity with cutting-edge technology to deliver solutions that not only meet today&apos;s needs but anticipate tomorrow&apos;s challenges. Every project is an opportunity to push boundaries and exceed expectations.
                </p>
                
                <div className="flex flex-wrap gap-4 pt-4">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full font-medium cursor-pointer shadow-lg hover:shadow-xl  hover:scale-105 transition-transform">
                    Learn More
                  </div>
                  <div className="border-2 border-green-500 text-green-600 px-6 py-3 rounded-full font-medium cursor-pointer hover:bg-green-50  hover:scale-105 transition-transform">
                    Contact Us
                  </div>
                </div>
              </div>
            </div>

            {/* Globe Section - 45% */}
            <GlobeDemo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsSection;