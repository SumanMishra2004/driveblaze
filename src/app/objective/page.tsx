"use client";

import React from "react";
import { 
  Globe, Activity, Ruler, Zap, Workflow, Satellite, BarChart, Trophy 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {Fade} from "react-awesome-reveal";
// Map of icon names to Lucide components
const icons: Record<string, React.ElementType> = {
  Globe,
  Activity,
  Ruler,
  Zap,
  Workflow,
  Satellite,
  BarChart,
  Trophy,
};

const App = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-16 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Main Title Section */}
        <header className="text-center space-y-4">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 dark:text-gray-50 tracking-tight leading-tight">
            Project Objectives
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
            A Google Earth Engine and Machine Learning Approach for Urban Sprawl Analysis and Prediction in the Kolkata Metropolitan Area (2013-2035).
          </p>
        </header>

        {/* Vertical Section: Introduction & Core Objectives */}
        <section className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <ObjectiveCard
            title="Introduction & Background"
            iconName="Globe"
            color="bg-purple-100 text-purple-600 border-purple-300"
          >
            <Fade direction="left" duration={500} triggerOnce className="text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>

              Urban sprawl, the uncontrolled expansion of cities into surrounding rural areas, presents a significant challenge to sustainable development in rapidly urbanizing regions like the <strong>Kolkata Metropolitan Area (KMA)</strong>. The traditional, manual methods for tracking this expansion are often expensive and inefficient. This project leverages the power of cloud-based geospatial platforms like <strong>Google Earth Engine (GEE)</strong> and machine learning to create a robust, automated workflow that bypasses these limitations, providing a repeatable and scalable model for urban planners and researchers.
                </p>
            </Fade>
            <Fade direction="right" duration={500} triggerOnce> 

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              In addition to mapping urban growth, this project aims to create <strong>social awareness</strong> among the residents of KMA. By visualizing the city’s expansion, <strong>heat zones</strong>, and areas with rising <strong>CO2 emissions</strong>, people can better understand the environmental challenges associated with rapid urbanization. Highlighting these critical issues helps communities take proactive measures to reduce their carbon footprint and supports a collective effort to maintain <strong>livable urban environments</strong>. This data-driven awareness empowers citizens to advocate for sustainable urban policies before city limits and environmental stressors reach critical levels that compromise human health and quality of life.
            </p>
            </Fade>
            <Fade direction="left" duration={500} triggerOnce>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Moreover, this project provides vital insights for policymakers and government agencies to make <strong>evidence-based decisions</strong>. By predicting <strong>emissions hotspots</strong> and areas prone to <strong>urban heat island effects</strong>, authorities can plan interventions such as green spaces, improved public transport, and stricter zoning regulations to mitigate adverse impacts. The predictive modeling approach ensures that the government can act <strong>proactively</strong>, rather than reactively, safeguarding both environmental sustainability and the welfare of Kolkata’s residents. This foresight allows for more effective allocation of resources, better urban planning, and a roadmap for a <strong>resilient and sustainable metropolitan future</strong>.
            </p>
            </Fade>
          </ObjectiveCard>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">Core Objectives</h2>
            <ObjectiveListItem
              text="<strong>Automated Historical Analysis:</strong> To utilize the Google Earth Engine platform to automatically extract and quantify the built-up area within the Kolkata Metropolitan Area for each year from 2013 to 2024. This will be accomplished using a thresholding-based approach on the <strong>Normalized Difference Built-up Index (NDBI)</strong>, eliminating the need for manual data collection."
              iconName="Activity"
              color="bg-emerald-100 text-emerald-600"
            />
            <ObjectiveListItem
              text="<strong>Built-up Area Quantification:</strong> To calculate the total built-up area in square kilometers for each historical year, creating a precise time-series dataset that documents the rate and scale of urban expansion. This provides a quantifiable foundation for all subsequent analysis."
              iconName="Ruler"
              color="bg-cyan-100 text-cyan-600"
            />
            <ObjectiveListItem
              text="<strong>Predictive Modeling:</strong> To employ a powerful machine learning model, specifically the <strong>Random Forest Regressor</strong>, to analyze the historical built-up area data and predict future urban growth. This will provide a quantifiable projection of the urban footprint of the KMA up to the year 2035, serving as a critical tool for future planning."
              iconName="Zap"
              color="bg-yellow-100 text-yellow-600"
            />
            <ObjectiveListItem
              text="<strong>Workflow Automation:</strong> To establish an end-to-end, seamless workflow that begins with satellite imagery processing on GEE and concludes with the generation of predictive visualizations in a Google Colab environment. This ensures the entire process is repeatable and can be easily applied to other metropolitan regions globally."
              iconName="Workflow"
              color="bg-pink-100 text-pink-600"
            />
          </div>
        </section>

        {/* Horizontal Section: Methodology */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">Methodology</h2>
          <div className="flex flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0 overflow-x-auto pb-4">
            <MethodologyCard
              title="Phase 1: Geospatial Processing (GEE)"
              steps={[
                "Acquired and pre-processed multi-mission satellite imagery from Landsat 7 and Sentinel-2 to ensure consistent data availability and quality.",
                "Applied robust cloud masking functions and generated yearly median composites to create a single, representative image for each year.",
                "Calculated the Normalized Difference Built-up Index (NDBI) and used a fixed threshold to create binary built-up masks.",
                "Exported the final, clipped, binary built-up masks as GeoTIFF files to a dedicated Google Drive folder for further analysis."
              ]}
              iconName="Satellite"
              color="bg-blue-100 text-blue-600"
            />
            <MethodologyCard
              title="Phase 2: ML Prediction (Colab)"
              steps={[
                "Integrated the Google Colab environment with Google Drive to access the GeoTIFF files exported from GEE.",
                "Processed the raster data to calculate the total built-up area in square kilometers for each historical year.",
                "Trained a Random Forest Regressor model on the historical time-series data to capture the underlying trend of urban expansion.",
                "Utilized the trained model to predict the built-up area for future years up to 2035 and visualized the results using a plot that contrasts historical and predicted growth."
              ]}
              iconName="BarChart"
              color="bg-orange-100 text-orange-600"
            />
          </div>
        </section>

        {/* Significance Section */}
        <section>
          <ObjectiveCard
            title="Significance"
            iconName="Trophy"
            color="bg-gray-100 text-gray-600 border-gray-300"
          >
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The significance of this work lies in its contribution to sustainable urban planning. By providing a clear and reliable projection of urban growth, this project can assist policymakers, urban planners, and environmental researchers in making informed decisions about land use, infrastructure development, and environmental conservation in the face of rapid urbanization. It serves as a powerful demonstration of how remote sensing and machine learning can be integrated to address complex environmental and social challenges.
            </p>
          </ObjectiveCard>
        </section>
      </div>
    </div>
  );
};

// --- Helper Components ---

const ObjectiveCard = ({ title, iconName, color, children }: { title: string; iconName: string; color: string; children: React.ReactNode }) => {
  const Icon = icons[iconName];
  return (
    <Card className={`p-8 rounded-2xl shadow-xl border ${color} transition-transform transform hover:scale-[1.01]`}>
      <Fade direction="down" triggerOnce className="flex items-center space-x-4 flex-row">
        <Icon className={`rounded-full p-2 ${color}`} size={40} />
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">{title}</h2>
      </Fade>
      {children}
    </Card>
  );
};

const ObjectiveListItem = ({ text, iconName, color }: { text: string; iconName: string; color: string }) => {
  const Icon = icons[iconName];
  return (
    <Fade triggerOnce direction="left" duration={700} className="flex items-start space-x-4 p-4 rounded-xl bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 transition-transform transform hover:scale-[1.01]">
      <Icon className={`flex-shrink-0 mt-1 rounded-full p-1 ${color}`} size={24} />
      <span className="text-gray-700 dark:text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: text }} />
    </Fade>
  );
};

const MethodologyCard = ({ title, steps, iconName, color }: { title: string; steps: string[]; iconName: string; color: string }) => {
  const Icon = icons[iconName];
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700 min-w-[280px] md:min-w-fit flex-1 transition-transform transform hover:scale-[1.01]">
      <div className={`flex items-center space-x-4 mb-4 ${color}`}>
        <Icon className={`rounded-full p-2 ${color}`} size={32} />
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">{title}</h3>
      </div>
      <ul className="list-disc list-inside space-y-3 text-gray-700 dark:text-gray-300">
        {steps.map((step, index) => (
          <li key={index} className="leading-relaxed">{step}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
