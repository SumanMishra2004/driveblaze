"use client";

import React, { useState } from "react";
import Image from "next/image";
import  toast from 'react-hot-toast';
// The main App component
export default function App() {
  const [year, setYear] = useState("2026");
  type Predictions = {
    population: number;
    urban_density_persons_hectare: number;
    urban_extent_hectares: number;
    built_up_area_density_persons_hectare: number;
    population_growth_rate_percent: number;
  };

  const [predictions, setPredictions] = useState<Predictions | null>(null);
  const [graphs, setGraphs] = useState({ population: "", density: "" });
  const [sustainabilityMeasure, setSustainabilityMeasure] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to fetch data from the FastAPI backend
  const fetchData = async () => {
    setLoading(true);
    setError("");
    setPredictions(null);
    setGraphs({ population: "", density: "" });
    setSustainabilityMeasure("");

    try {
      // NOTE: Ensure your Docker container is running and accessible.
      // The URL below assumes the container is mapped to port 8000 on localhost.
      const response = await fetch(
        `http://localhost:8000/predict?year=${year}`
      );

      if (!response.ok) {
        throw new Error(
          "Failed to fetch data from the API. Check if the backend is running."
        );
      }

      const data = await response.json();
      console.log(data);

      setPredictions(data.predictions);
      setSustainabilityMeasure(data.sustainability_measure);
      setGraphs({
        population: `data:image/png;base64,${data.graphs.population_plot_base64}`,
        density: `data:image/png;base64,${data.graphs.urban_density_plot_base64}`,
      });
    } catch (err: any) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Kolkata Urban Development Predictions
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Enter a year to see predictions and related graphs.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 mb-8">
          <input
            type="number"
            id="yearInput"
            value={year}
          onChange={(e) => {
            if (Number(e.target.value) < 2035) {
              setYear(e.target.value);
            } else {
              setYear("2035");
              toast.error("Year cannot be greater than 2035");
            }
          }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
            placeholder="Enter a year (e.g., 2040)"
          />
          <button
            onClick={fetchData}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 w-full md:w-auto"
            disabled={loading}
          >
            {loading ? "Loading..." : "Get Predictions"}
          </button>
        </div>

        {error && (
          <div className="text-center text-red-500 text-lg mb-4">{error}</div>
        )}

        {predictions && (
          <div className="animate-fadeIn">
            <div className="bg-gray-100 p-6 rounded-lg mb-8 shadow-inner">
              <h2 className="text-xl font-bold mb-2 text-gray-800">
                Predictions for <span className="text-blue-600">{year}</span>
              </h2>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>
                  <strong>Population:</strong> {predictions.population}
                </li>
                <li>
                  <strong>Urban Density:</strong>{" "}
                  {predictions.urban_density_persons_hectare} persons/hectare
                </li>
                <li>
                  <strong>Urban Extent:</strong>{" "}
                  {predictions.urban_extent_hectares} hectares
                </li>
                <li>
                  <strong>Built-up Area Density:</strong>{" "}
                  {predictions.built_up_area_density_persons_hectare}{" "}
                  persons/hectare
                </li>
                <li>
                  <strong>Population Growth Rate:</strong>{" "}
                  {predictions.population_growth_rate_percent}%
                </li>
              </ul>
              <p className="mt-4 text-gray-800">
                <strong className="text-blue-600">
                  Sustainability Measure:
                </strong>{" "}
                {sustainabilityMeasure}
              </p>
            </div>

            <div id="graphs" className="space-y-8">
              <div>
                <h2 className="text-xl font-bold mb-4 text-center text-gray-800">
                  Population Prediction
                </h2>
                {graphs.population && (
                  <img
                    src={graphs.population}
                    alt="Population Prediction Graph"
                    className="rounded-lg shadow-md w-full border border-gray-200"
                  />
                )}
              </div>
              <div>
                <h2 className="text-xl font-bold mb-4 text-center text-gray-800">
                  Urban Density Growth
                </h2>
                {graphs.density && (
                  <img
                    src={graphs.density}
                    alt="Urban Density Growth Graph"
                    className="rounded-lg shadow-md w-full border border-gray-200"
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
