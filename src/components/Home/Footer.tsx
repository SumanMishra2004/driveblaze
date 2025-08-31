import React from 'react';
import { 
  Home, 
  BarChart3, 
  MapPin, 
  Activity, 
  Users, 
  Star, 
  BookOpen, 
  Bot,
  Mail,
  Phone,

  Github,
  Twitter,
  Linkedin,
  ChevronRight
} from 'lucide-react';

const Footer: React.FC = () => {
  const navigationLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
    { name: "Map View", href: "/map-visualization", icon: MapPin },
    { name: "Predictions", href: "/prediction", icon: Activity },
  ];

  const platformLinks = [
    { name: "Team", href: "/team", icon: Users },
    { name: "Objective", href: "/objective", icon: BookOpen },
    { name: "AI Assistant", href: "/GenAi", icon: Bot },
    { name: "Future Scope", href: "/future-scope", icon: Star },
  ];

  const supportLinks = [
    { name: "Documentation", href: "/docs" },
    { name: "API Reference", href: "/api" },
    { name: "Help Center", href: "/help" },
    { name: "Community", href: "/community" },
  ];

  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">D</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  DataViz Pro
                </h3>
                <p className="text-slate-400 text-sm">Advanced Analytics Platform</p>
              </div>
            </div>
            <p className="text-slate-400 mb-6 leading-relaxed max-w-md">
              Empowering data-driven decisions through cutting-edge visualization, predictive analytics, and AI-powered insights. Transform your data into actionable intelligence.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300 group">
                <Github className="w-5 h-5 text-slate-400 group-hover:text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300 group">
                <Twitter className="w-5 h-5 text-slate-400 group-hover:text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300 group">
                <Linkedin className="w-5 h-5 text-slate-400 group-hover:text-white" />
              </a>
            </div>

            {/* Newsletter Signup */}
            <div className="mt-8">
              <h5 className="text-sm font-semibold mb-3 text-slate-200">Stay Updated</h5>
              <div className="flex max-w-sm">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-slate-800 text-white rounded-l-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-slate-400"
                />
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-r-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Core Features */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-slate-200">Core Features</h4>
            <ul className="space-y-3">
              {navigationLinks.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href} 
                    className="flex items-center text-slate-400 hover:text-blue-400 transition-colors duration-300 group"
                  >
                    <item.icon className="w-4 h-4 mr-2 group-hover:text-blue-400" />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-slate-200">Platform</h4>
            <ul className="space-y-3">
              {platformLinks.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href} 
                    className="flex items-center text-slate-400 hover:text-blue-400 transition-colors duration-300 group"
                  >
                    <item.icon className="w-4 h-4 mr-2 group-hover:text-blue-400" />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-slate-200">Support</h4>
           

            {/* Contact Info */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span className="text-slate-400 text-sm">support@geoai.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span className="text-slate-400 text-sm">+1 (555) GEO-AI</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span className="text-slate-400 text-sm">Kolkata,india</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="md:flex md:items-center md:justify-between">
            <div className="text-center md:text-left">
              <p className="text-slate-400 text-sm">
                © 2025 GeoAi. All rights reserved. | Built with Next.js & Tailwind CSS
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="flex justify-center md:justify-end space-x-6">
                <a href="#" className="text-slate-400 hover:text-blue-400 text-sm transition-colors duration-300">
                  Privacy Policy
                </a>
                <a href="#" className="text-slate-400 hover:text-blue-400 text-sm transition-colors duration-300">
                  Terms of Service
                </a>
                <a href="#" className="text-slate-400 hover:text-blue-400 text-sm transition-colors duration-300">
                  Data Policy
                </a>
                <a href="#" className="text-slate-400 hover:text-blue-400 text-sm transition-colors duration-300">
                  Accessibility
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;