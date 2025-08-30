import React from 'react';

const AboutUsSection: React.FC = () => {
  return (
    <div className="h-full w-full bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 p-4 lg:p-8 flex items-center">
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

            {/* Green Square Section - 40% */}
            <div className="flex-[0_0_100%] lg:flex-[0_0_40%] bg-gradient-to-br from-green-500 to-emerald-600 relative overflow-hidden flex items-center justify-center min-h-[50vh] lg:min-h-full">
              {/* Background Elements */}
              <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full backdrop-blur-sm"></div>
              <div className="absolute top-32 right-16 w-16 h-16 bg-white/10 rounded-full backdrop-blur-sm"></div>
              <div className="absolute bottom-20 left-16 w-12 h-12 bg-white/10 rounded-full backdrop-blur-sm"></div>

              {/* Central Content */}
              <div className="text-center z-10">
                <div className="w-32 h-32 bg-white/20 rounded-3xl backdrop-blur-sm mx-auto mb-6 flex items-center justify-center hover:scale-110 hover:rotate-6 transition-all duration-300">
                  <svg
                    className="w-16 h-16 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  Innovation
                </h3>
                
                <p className="text-white/90 text-lg max-w-xs mx-auto px-4">
                  Driving progress through creative solutions
                </p>
              </div>

              {/* Static Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsSection;