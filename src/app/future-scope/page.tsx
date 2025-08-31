"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { 
 TrendingUp, Building2,
  Brain, Zap, Target, Globe, BarChart3, LineChart as LineChartIcon,
 CheckCircle, Clock, Sparkles, Rocket,Award, Cpu,
  PieChart, Activity, Layers, Map, Calendar, ArrowRight, Satellite,
  Shield, Leaf, Car, Home, Factory, Waves, Sun, Cloud, TreePine,
  Network, Bot, Lightbulb, Cog, Monitor, Smartphone, Wifi,
  Database
} from 'lucide-react';


const UrbanPredictionPlatform = () => {
  
  const [futureScopeView, setFutureScopeView] = useState('roadmap');


  // Future scope features roadmap
  const futureFeatures = {
    'phase1': {
      title: "Phase 1: Enhanced ML Models",
      icon: Brain,
      color: "from-blue-500 to-cyan-500",
      features: [
        { name: "Deep Neural Networks", description: "LSTM & GRU for time series prediction", impact: "95%+ accuracy", status: "planning" },
        { name: "Random Forest Ensemble", description: "Multiple decision trees for robust predictions", impact: "Handles non-linear patterns", status: "planning" },
        { name: "XGBoost Integration", description: "Gradient boosting for complex feature interactions", impact: "Industry-standard performance", status: "development" },
        { name: "AutoML Pipeline", description: "Automated model selection and hyperparameter tuning", impact: "Zero-config deployment", status: "research" }
      ]
    },
    'phase2': {
      title: "Phase 2: Multi-City Intelligence",
      icon: Globe,
      color: "from-green-500 to-emerald-500",
      features: [
        { name: "Global City Database", description: "500+ cities worldwide with standardized metrics", impact: "Cross-city comparisons", status: "expansion" },
        { name: "Climate Integration", description: "Weather patterns, sea-level rise, temperature trends", impact: "Climate-aware planning", status: "development" },
        { name: "Economic Indicators", description: "GDP, employment, housing costs integration", impact: "Holistic urban analysis", status: "planning" },
        { name: "Real-time Data Feeds", description: "Live satellite imagery, IoT sensors, social media", impact: "Dynamic predictions", status: "research" }
      ]
    },
    'phase3': {
      title: "Phase 3: Smart City Solutions",
      icon: Rocket,
      color: "from-purple-500 to-pink-500",
      features: [
        { name: "Traffic Flow Optimization", description: "AI-powered traffic light management", impact: "30% congestion reduction", status: "pilot" },
        { name: "Energy Grid Prediction", description: "Smart grid load forecasting", impact: "20% energy savings", status: "development" },
        { name: "Disaster Preparedness", description: "Flood, earthquake, pandemic response planning", impact: "Lives saved", status: "planning" },
        { name: "Carbon Footprint Tracking", description: "Real-time emissions monitoring and prediction", impact: "Net-zero goals", status: "research" }
      ]
    },
    'phase4': {
      title: "Phase 4: Digital Twin Platform",
      icon: Monitor,
      color: "from-orange-500 to-red-500",
      features: [
        { name: "3D City Simulation", description: "Interactive digital twin of entire cities", impact: "Virtual testing", status: "prototype" },
        { name: "Policy Impact Simulator", description: "Test policies before implementation", impact: "Risk-free planning", status: "development" },
        { name: "IoT Integration", description: "Immersive urban IoT experience", impact: "Stakeholder engagement", status: "research" }
      ]
    }
  };

  // Potential applications showcase
  const applications = [
    { 
      title: "Government Planning", 
      icon: Building2, 
      description: "Urban planners can predict infrastructure needs 10-20 years ahead",
      benefits: ["Budget optimization", "Resource allocation", "Policy impact analysis"],
      market: "$50B+ global market",
      color: "from-blue-600 to-blue-800"
    },
    { 
      title: "Real Estate Intelligence", 
      icon: Home, 
      description: "Property developers predict optimal locations and timing",
      benefits: ["Investment ROI optimization", "Market timing", "Location scoring"],
      market: "$200B+ real estate market",
      color: "from-green-600 to-green-800"
    },
    { 
      title: "Infrastructure Companies", 
      icon: Factory, 
      description: "Utilities predict demand for water, electricity, telecom",
      benefits: ["Capacity planning", "Grid optimization", "Service expansion"],
      market: "$100B+ infrastructure market",
      color: "from-purple-600 to-purple-800"
    },
    { 
      title: "Climate Resilience", 
      icon: Leaf, 
      description: "Environmental agencies plan for climate change adaptation",
      benefits: ["Disaster preparedness", "Green infrastructure", "Sustainability metrics"],
      market: "$500B+ climate market",
      color: "from-emerald-600 to-emerald-800"
    },
    { 
      title: "Transportation Planning", 
      icon: Car, 
      description: "Transit authorities optimize routes and capacity",
      benefits: ["Traffic reduction", "Public transport optimization", "Smart mobility"],
      market: "$300B+ transport market",
      color: "from-orange-600 to-orange-800"
    },
    { 
      title: "Smart City Platforms", 
      icon: Cpu, 
      description: "City governments integrate all urban systems",
      benefits: ["Holistic city management", "Citizen services", "Operational efficiency"],
      market: "$1T+ smart city market",
      color: "from-indigo-600 to-indigo-800"
    }
  ];

  // Technology stack for future development
  const techStack = {
    'ai_ml': {
      title: "AI/ML Stack",
      icon: Brain,
      technologies: [
        "TensorFlow / PyTorch for deep learning",
        "Scikit-learn for classical ML",
        "Apache Spark for big data processing",
        "MLflow for model management",
        "Kubeflow for ML pipelines",
        "NVIDIA RAPIDS for GPU acceleration"
      ],
      color: "from-cyan-500 to-blue-600"
    },
    'data_platform': {
      title: "Data Platform",
      icon: Database,
      technologies: [
        "Apache Kafka for real-time streaming",
        "Apache Airflow for data orchestration",
        "ClickHouse for time-series analytics",
        "Redis for caching and sessions",
        "PostgreSQL with PostGIS for geospatial",
        "MinIO for object storage"
      ],
      color: "from-green-500 to-teal-600"
    },
    'cloud_infra': {
      title: "Cloud Infrastructure",
      icon: Cloud,
      technologies: [
        "Kubernetes for container orchestration",
        "Terraform for infrastructure as code",
        "AWS/GCP/Azure for cloud services",
        "Docker for containerization",
        "Istio for service mesh",
        "Prometheus & Grafana for monitoring"
      ],
      color: "from-purple-500 to-indigo-600"
    },
    'frontend': {
      title: "Frontend Platform",
      icon: Monitor,
      technologies: [
        "Next.js 14 with React 18",
        "TypeScript for type safety",
        "Tailwind CSS for styling",
        "Three.js for 3D visualizations",
        "D3.js for advanced charts",
        "WebGL for GPU-accelerated graphics"
      ],
      color: "from-orange-500 to-red-600"
    }
  };

  
 

  type FeatureType = {
    name: string;
    description: string;
    impact: string;
    status: string;
  };

  const FeatureCard = ({
    feature,
    phase,
    index,
  }: {
    feature: FeatureType;
    phase: keyof typeof futureFeatures;
    index: number;
  }) => {
    const Icon = futureFeatures[phase].icon;
    const gradientClass = futureFeatures[phase].color;
    
    return (
      <div 
        className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${gradientClass} p-6 text-white transform transition-all duration-500 hover:scale-105 hover:shadow-2xl group cursor-pointer`}
        style={{ animationDelay: `${index * 0.2}s` }}
      >
        <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-8 -translate-y-8 opacity-10">
          <Icon size={128} />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Icon size={24} className="animate-pulse" />
            <h3 className="font-bold text-lg">{feature.name}</h3>
          </div>
          
          <p className="text-sm opacity-90 mb-3">{feature.description}</p>
          
          <div className="flex items-center justify-between">
            <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
              {feature.impact}
            </span>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
              feature.status === 'development' ? 'bg-yellow-400 text-yellow-900' :
              feature.status === 'planning' ? 'bg-blue-400 text-blue-900' :
              feature.status === 'research' ? 'bg-purple-400 text-purple-900' :
              'bg-green-400 text-green-900'
            }`}>
              {feature.status.toUpperCase()}
            </span>
          </div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    );
  };

  type ApplicationType = {
    title: string;
    icon: React.ElementType;
    description: string;
    benefits: string[];
    market: string;
    color: string;
  };

  const ApplicationCard = ({
    app,
    index,
  }: {
    app: ApplicationType;
    index: number;
  }) => {
    const Icon = app.icon;
    
    return (
      <div 
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${app.color} p-8 text-white transform transition-all duration-700 hover:scale-105 hover:shadow-2xl group`}
        style={{ animationDelay: `${index * 0.3}s` }}
      >
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full animate-ping opacity-75" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            
            <div>
              <h3 className="font-bold text-xl">{app.title}</h3>
              <p className="text-lg font-semibold opacity-90">{app.market}</p>
            </div>
          </div>
          
          <p className="text-sm opacity-90 mb-6 leading-relaxed">{app.description}</p>
          
          <div className="space-y-2">
            <h4 className="font-semibold">Key Benefits:</h4>
            {app.benefits.map((benefit, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <CheckCircle size={16} className="text-green-300" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  type TechStackType = {
    title: string;
    icon: React.ComponentType<{ size?: number }>;
    technologies: string[];
    color: string;
  };

  const TechStackCard = ({
    stack,
    stackKey,
  }: {
    stack: TechStackType;
    stackKey: string;
  }) => {
    const Icon = stack.icon;
    
    return (
      <div className={`rounded-xl bg-gradient-to-br ${stack.color} p-6 text-white transform transition-all duration-500 hover:scale-105 hover:shadow-xl`}>
        <div className="flex items-center gap-3 mb-4">
          <Icon size={24} />
          <h3 className="font-bold text-lg">{stack.title}</h3>
        </div>
        
        <div className="space-y-2">
          {stack.technologies.map((tech, index) => (
            <div key={index} className="flex items-center gap-2 text-sm opacity-90">
              <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: `${index * 0.2}s` }} />
              <span>{tech}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
      {/* Header with animated background */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-pulse" />
        <div className="relative z-10 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 animate-pulse">
                Urban Intelligence Platform
              </h1>
              <p className="text-xl text-gray-300 mb-6">
                🚀 Future of AI-Powered Urban Development Prediction
              </p>
              
              <div className="flex justify-center gap-4 mb-8">
                {['roadmap', 'applications', 'technology'].map((view) => (
                  <Button
                    key={view}
                    onClick={() => setFutureScopeView(view)}
                    variant={futureScopeView === view ? 'default' : 'outline'}
                    className={`capitalize transition-all duration-300 ${
                      futureScopeView === view 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105' 
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {view}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        
        {/* Future Roadmap */}
        {futureScopeView === 'roadmap' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                🗺️ Development Roadmap
              </h2>
              <p className="text-gray-300">Transforming urban planning with cutting-edge technology</p>
            </div>
            
            {Object.entries(futureFeatures).map(([phaseKey, phase], phaseIndex) => {
              const typedPhaseKey = phaseKey as 'phase1' | 'phase2' | 'phase3' | 'phase4';
              return (
                <Card key={phaseKey} className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-white">
                      <phase.icon size={28} className="animate-spin" style={{ animationDuration: '3s' }} />
                      {phase.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {phase.features.map((feature, index) => (
                        <FeatureCard key={index} feature={feature} phase={typedPhaseKey} index={index} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Market Applications */}
        {futureScopeView === 'applications' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                💼 Market Applications
              </h2>
              <p className="text-gray-300">Multi-trillion dollar market opportunities</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {applications.map((app, index) => (
                <ApplicationCard key={index} app={app} index={index} />
              ))}
            </div>
            
            <Card className="bg-gradient-to-br from-yellow-900/50 to-orange-900/50 border-yellow-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-yellow-400">
                  <Award size={28} />
                  Total Market Potential
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-6xl font-bold text-yellow-400 mb-4 animate-pulse">
                    $2.15T+
                  </div>
                  <p className="text-gray-300 text-lg">
                    Combined addressable market across all sectors by 2030
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Technology Stack */}
        {futureScopeView === 'technology' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                ⚙️ Technology Architecture
              </h2>
              <p className="text-gray-300">Enterprise-grade technology stack for scalable urban intelligence</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(techStack).map(([key, stack]) => (
                <TechStackCard key={key} stack={stack} stackKey={key} />
              ))}
            </div>
            
       
          </div>
        )}

      
      </div>

      {/* Future Vision Section */}
      <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 p-12 mt-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              🌟 Project Future Scope & Vision
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Advanced Analytics */}
            <Card className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border-blue-400/30 transform hover:scale-105 transition-all duration-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-cyan-400">
                  <BarChart3 size={28} className="animate-bounce" />
                  Advanced Analytics
                </CardTitle>
              </CardHeader>
              <CardContent className="text-white space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle size={16} className="text-green-400" />
                  Multi-variable time series forecasting
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle size={16} className="text-green-400" />
                  Deep learning with LSTM/GRU networks
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle size={16} className="text-green-400" />
                  Ensemble methods (Random Forest + XGBoost)
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock size={16} className="text-yellow-400" />
                  Real-time model retraining
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock size={16} className="text-yellow-400" />
                  Anomaly detection algorithms
                </div>
              </CardContent>
            </Card>

            {/* Data Integration */}
            <Card className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 border-green-400/30 transform hover:scale-105 transition-all duration-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-green-400">
                  <Database size={28} className="animate-pulse" />
                  Data Integration
                </CardTitle>
              </CardHeader>
              <CardContent className="text-white space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle size={16} className="text-green-400" />
                  Satellite imagery analysis (Google Earth Engine)
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle size={16} className="text-green-400" />
                  Government census data APIs
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle size={16} className="text-green-400" />
                  Economic indicators (World Bank API)
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock size={16} className="text-yellow-400" />
                  IoT sensor networks integration
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock size={16} className="text-yellow-400" />
                  Social media sentiment analysis
                </div>
              </CardContent>
            </Card>

            {/* Smart City Features */}
            <Card className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-purple-400/30 transform hover:scale-105 transition-all duration-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-purple-400">
                  <Cpu size={28} className="animate-spin" style={{ animationDuration: '3s' }} />
                  Smart City AI
                </CardTitle>
              </CardHeader>
              <CardContent className="text-white space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle size={16} className="text-green-400" />
                  Traffic optimization algorithms
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle size={16} className="text-green-400" />
                  Energy consumption prediction
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock size={16} className="text-yellow-400" />
                  Waste management optimization
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock size={16} className="text-yellow-400" />
                  Emergency response planning
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Sparkles size={16} className="text-blue-400" />
                  Digital twin city modeling
                </div>
              </CardContent>
            </Card>

            {/* Climate Intelligence */}
            <Card className="bg-gradient-to-br from-orange-600/20 to-red-600/20 border-orange-400/30 transform hover:scale-105 transition-all duration-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-orange-400">
                  <Sun size={28} className="animate-bounce" />
                  Climate Intelligence
                </CardTitle>
              </CardHeader>
              <CardContent className="text-white space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle size={16} className="text-green-400" />
                  Sea level rise impact modeling
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle size={16} className="text-green-400" />
                  Extreme weather prediction
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock size={16} className="text-yellow-400" />
                  Carbon emission forecasting
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock size={16} className="text-yellow-400" />
                  Green infrastructure planning
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Sparkles size={16} className="text-blue-400" />
                  Renewable energy optimization
                </div>
              </CardContent>
            </Card>

            {/* Economic Modeling */}
            <Card className="bg-gradient-to-br from-yellow-600/20 to-amber-600/20 border-yellow-400/30 transform hover:scale-105 transition-all duration-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-yellow-400">
                  <TrendingUp size={28} className="animate-pulse" />
                  Economic Modeling
                </CardTitle>
              </CardHeader>
              <CardContent className="text-white space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle size={16} className="text-green-400" />
                  Real estate price forecasting
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle size={16} className="text-green-400" />
                  Employment trend analysis
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock size={16} className="text-yellow-400" />
                  Investment opportunity scoring
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock size={16} className="text-yellow-400" />
                  GDP impact calculations
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Sparkles size={16} className="text-blue-400" />
                  Economic inequality metrics
                </div>
              </CardContent>
            </Card>

            {/* Global Expansion */}
            <Card className="bg-gradient-to-br from-indigo-600/20 to-blue-600/20 border-indigo-400/30 transform hover:scale-105 transition-all duration-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-indigo-400">
                  <Globe size={28} className="animate-spin" style={{ animationDuration: '4s' }} />
                  Global Expansion
                </CardTitle>
              </CardHeader>
              <CardContent className="text-white space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle size={16} className="text-green-400" />
                  Multi-language support (50+ languages)
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle size={16} className="text-green-400" />
                  Cultural adaptation algorithms
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock size={16} className="text-yellow-400" />
                  Cross-border migration modeling
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock size={16} className="text-yellow-400" />
                  International standards compliance
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Sparkles size={16} className="text-blue-400" />
                  Blockchain for data integrity
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Future Technologies Showcase */}
          <Card className="mt-12 bg-gradient-to-br from-slate-800/50 to-gray-900/50 border-slate-600/30">
            <CardHeader>
              <CardTitle className="text-center text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                🚀 Next-Generation Technologies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Quantum Computing */}
                <div className="text-center p-6 bg-gradient-to-br from-violet-500/20 to-purple-600/20 rounded-xl border border-violet-400/30">
                  <Zap size={48} className="mx-auto mb-4 text-violet-400 animate-pulse" />
                  <h3 className="font-bold text-lg text-violet-400 mb-2">Quantum ML</h3>
                  <p className="text-xs text-gray-300">Quantum algorithms for complex urban optimization problems</p>
                  <div className="mt-3 text-violet-400 font-bold">2027+</div>
                </div>

                {/* Edge Computing */}
                <div className="text-center p-6 bg-gradient-to-br from-emerald-500/20 to-green-600/20 rounded-xl border border-emerald-400/30">
                  <Wifi size={48} className="mx-auto mb-4 text-emerald-400 animate-bounce" />
                  <h3 className="font-bold text-lg text-emerald-400 mb-2">Edge AI</h3>
                  <p className="text-xs text-gray-300">Real-time processing at IoT devices and smart sensors</p>
                  <div className="mt-3 text-emerald-400 font-bold">2026+</div>
                </div>

                {/* Blockchain */}
                <div className="text-center p-6 bg-gradient-to-br from-amber-500/20 to-orange-600/20 rounded-xl border border-amber-400/30">
                  <Shield size={48} className="mx-auto mb-4 text-amber-400 animate-pulse" />
                  <h3 className="font-bold text-lg text-amber-400 mb-2">Blockchain</h3>
                  <p className="text-xs text-gray-300">Decentralized data verification and smart contracts</p>
                  <div className="mt-3 text-amber-400 font-bold">2026+</div>
                </div>

                {/* Digital Twins */}
                <div className="text-center p-6 bg-gradient-to-br from-pink-500/20 to-rose-600/20 rounded-xl border border-pink-400/30">
                  <Monitor size={48} className="mx-auto mb-4 text-pink-400 animate-bounce" />
                  <h3 className="font-bold text-lg text-pink-400 mb-2">Digital Twins</h3>
                  <p className="text-xs text-gray-300">Virtual city replicas for policy simulation</p>
                  <div className="mt-3 text-pink-400 font-bold">2025+</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Implementation Roadmap */}
          <Card className="mt-8 bg-gradient-to-br from-gray-800/50 to-slate-900/50 border-gray-600/30">
            <CardHeader>
              <CardTitle className="text-center text-2xl font-bold text-white flex items-center justify-center gap-3">
                <Calendar className="animate-pulse" />
                Implementation Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                
                {/* 2025 Milestones */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-20 text-center">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full font-bold text-sm">
                      2025
                    </div>
                  </div>
                  <div className="flex-1 bg-green-500/10 p-4 rounded-lg border border-green-500/30">
                    <h4 className="font-bold text-green-400 mb-2">Foundation & Core Features</h4>
                    <div className="text-sm text-gray-300 space-y-1">
                      <div>✅ Advanced logistic regression with 95%+ accuracy</div>
                      <div>✅ Multi-city dataset integration</div>
                      <div>✅ Real-time dashboard with beautiful UI</div>
                      <div>✅ CSV upload and data preprocessing</div>
                    </div>
                  </div>
                </div>

                {/* 2026 Milestones */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-20 text-center">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1 rounded-full font-bold text-sm">
                      2026
                    </div>
                  </div>
                  <div className="flex-1 bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
                    <h4 className="font-bold text-blue-400 mb-2">AI Enhancement & Automation</h4>
                    <div className="text-sm text-gray-300 space-y-1">
                      <div>🔄 Neural networks (LSTM/Transformer models)</div>
                      <div>🔄 AutoML for automatic model optimization</div>
                      <div>🔄 API endpoints for third-party integration</div>
                      <div>🔄 Mobile app for field data collection</div>
                    </div>
                  </div>
                </div>

                {/* 2027 Milestones */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-20 text-center">
                    <div className="bg-gradient-to-r from-purple-500 to-violet-500 text-white px-3 py-1 rounded-full font-bold text-sm">
                      2027
                    </div>
                  </div>
                  <div className="flex-1 bg-purple-500/10 p-4 rounded-lg border border-purple-500/30">
                    <h4 className="font-bold text-purple-400 mb-2">Enterprise & Scale</h4>
                    <div className="text-sm text-gray-300 space-y-1">
                      <div>⏳ Multi-tenant SaaS platform</div>
                      <div>⏳ White-label solutions for governments</div>
                      <div>⏳ Marketplace for urban planning models</div>
                      <div>⏳ Integration with GIS platforms (ArcGIS, QGIS)</div>
                    </div>
                  </div>
                </div>

                {/* 2028+ Future */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-20 text-center">
                    <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-3 py-1 rounded-full font-bold text-sm">
                      2028+
                    </div>
                  </div>
                  <div className="flex-1 bg-pink-500/10 p-4 rounded-lg border border-pink-500/30">
                    <h4 className="font-bold text-pink-400 mb-2">Revolutionary Features</h4>
                    <div className="text-sm text-gray-300 space-y-1">
                      <div>🌟 Quantum computing for complex simulations</div>
                      <div>🌟 AR/VR city planning interfaces</div>
                      <div>🌟 AI-powered policy recommendation engine</div>
                      <div>🌟 Global urban intelligence network</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Business Model & Monetization */}
          <Card className="mt-8 bg-gradient-to-br from-emerald-800/50 to-teal-900/50 border-emerald-600/30">
            <CardHeader>
              <CardTitle className="text-center text-2xl font-bold text-emerald-400 flex items-center justify-center gap-3">
                <Award className="animate-pulse" />
                Business Model & Revenue Streams
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                <div className="bg-gradient-to-br from-blue-600/30 to-indigo-700/30 p-6 rounded-xl border border-blue-400/30">
                  <h4 className="font-bold text-blue-400 mb-3 flex items-center gap-2">
                    <Building2 size={20} />
                    Government SaaS
                  </h4>
                  <div className="text-sm text-gray-300 space-y-2">
                    <div>📊 $50K-500K per city annually</div>
                    <div>🎯 Target: 1000+ cities by 2030</div>
                    <div>💰 Projected revenue: $100M+</div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-600/30 to-emerald-700/30 p-6 rounded-xl border border-green-400/30">
                  <h4 className="font-bold text-green-400 mb-3 flex items-center gap-2">
                    <Home size={20} />
                    Enterprise Licenses
                  </h4>
                  <div className="text-sm text-gray-300 space-y-2">
                    <div>📊 $100K-2M per enterprise</div>
                    <div>🎯 Real estate, consulting, utilities</div>
                    <div>💰 Projected revenue: $500M+</div>
                  </div>
                </div>

              
              </div>
            </CardContent>
          </Card>
                    {/* Demo & Predictions Section */}
       
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-slate-900 to-indigo-900 text-gray-400 mt-12 p-8 text-center space-y-2">
        <p>© {new Date().getFullYear()} Urban Intelligence Platform. All rights reserved.</p>
        <p>Developed with ❤️ using React, Tailwind CSS, and Recharts</p>
      </footer>
    </div>
  );
};

export default UrbanPredictionPlatform;
