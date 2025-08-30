'use client'

import React, { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, ScatterChart, Scatter, PieChart, Pie, Cell } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Upload, TrendingUp, BarChart3, PieChart as PieChartIcon, ScatterChartIcon } from 'lucide-react'
import Papa from 'papaparse'

interface UrbanData {
  Year: number
  Population: number
  Urban_Extent_hectares: number
  Urban_Density_persons_hectare: number
  Built_up_Area_Density_persons_hectare: number
  Population_Growth_Rate_percent: number
  Urban_Extent_Growth_Rate_percent: number
  Added_Built_up_Area_Composition_Infill_Extension_Inclusion: string
}

interface ParsedData extends UrbanData {
  id: string
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658']

export default function UrbanDataDashboard() {
  const [data, setData] = useState<ParsedData[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedMetric, setSelectedMetric] = useState<string>('Population')

  // Load CSV from public folder
  const loadPublicCSV = async (filename: string) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`/${filename}`)
      if (!response.ok) throw new Error('Failed to fetch CSV file')
      
      const csvText = await response.text()
      parseCSV(csvText)
    } catch (err) {
      setError('Failed to load CSV file from public folder')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const parseCSV = (csvText: string) => {
    Papa.parse(csvText, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      delimitersToGuess: [',', '\t', '|', ';'],
      complete: (results) => {
        if (results.errors.length > 0) {
          setError('Error parsing CSV: ' + results.errors[0].message)
          return
        }
        parseCSVData(results.data)
      },
      error: (error:any) => {
        setError('Error parsing CSV: ' + error.message)
      }
    })
  }

  const parseCSVData = (rawData: any[]) => {
    try {
      const processedData: ParsedData[] = rawData
        .filter(row => row && typeof row === 'object')
        .map((row, index) => {
          // Clean headers by trimming whitespace
          const cleanedRow: any = {}
          Object.keys(row).forEach(key => {
            const cleanKey = key.trim()
            cleanedRow[cleanKey] = row[key]
          })

          return {
            id: `row-${index}`,
            Year: Number(cleanedRow.Year) || 0,
            Population: Number(cleanedRow.Population) || 0,
            Urban_Extent_hectares: Number(cleanedRow.Urban_Extent_hectares) || 0,
            Urban_Density_persons_hectare: Number(cleanedRow.Urban_Density_persons_hectare) || 0,
            Built_up_Area_Density_persons_hectare: Number(cleanedRow.Built_up_Area_Density_persons_hectare) || 0,
            Population_Growth_Rate_percent: Number(cleanedRow.Population_Growth_Rate_percent) || 0,
            Urban_Extent_Growth_Rate_percent: Number(cleanedRow.Urban_Extent_Growth_Rate_percent) || 0,
            Added_Built_up_Area_Composition_Infill_Extension_Inclusion: String(cleanedRow.Added_Built_up_Area_Composition_Infill_Extension_Inclusion || '')
          }
        })
        .filter(row => row.Year > 0) // Filter out invalid years

      setData(processedData)
      if (processedData.length === 0) {
        setError('No valid data found in CSV')
      }
    } catch (err) {
      setError('Error processing data: ' + (err as Error).message)
    }
  }

  // Calculate statistics
  const getStats = () => {
    if (data.length === 0) return null

    const latestYear = Math.max(...data.map(d => d.Year))
    const earliestYear = Math.min(...data.map(d => d.Year))
    const latestData = data.find(d => d.Year === latestYear)
    const totalPopulationGrowth = latestData ? 
      ((latestData.Population - data.find(d => d.Year === earliestYear)?.Population!) / data.find(d => d.Year === earliestYear)?.Population! * 100) : 0

    return {
      totalYears: latestYear - earliestYear + 1,
      latestPopulation: latestData?.Population.toLocaleString(),
      avgGrowthRate: (data.reduce((sum, d) => sum + d.Population_Growth_Rate_percent, 0) / data.length).toFixed(2),
      totalPopulationGrowth: totalPopulationGrowth.toFixed(2),
      latestUrbanDensity: latestData?.Urban_Density_persons_hectare.toFixed(2)
    }
  }

  const stats = getStats()

  // Growth rates analysis
  const getGrowthRateComparison = () => {
    return data.map(d => ({
      Year: d.Year,
      'Population Growth': d.Population_Growth_Rate_percent,
      'Urban Extent Growth': d.Urban_Extent_Growth_Rate_percent
    }))
  }

  // Density analysis
  const getDensityData = () => {
    return data.map(d => ({
      Year: d.Year,
      'Urban Density': d.Urban_Density_persons_hectare,
      'Built-up Area Density': d.Built_up_Area_Density_persons_hectare
    }))
  }

  // Built-up area composition analysis
  const getCompositionData = () => {
    const compositions = data.reduce((acc, d) => {
      const comp = d.Added_Built_up_Area_Composition_Infill_Extension_Inclusion
      if (comp && comp !== '') {
        acc[comp] = (acc[comp] || 0) + 1
      }
      return acc
    }, {} as Record<string, number>)

    return Object.entries(compositions).map(([name, value]) => ({
      name,
      value
    }))
  }

  // Population vs Urban Extent scatter
  const getScatterData = () => {
    return data.map(d => ({
      x: d.Urban_Extent_hectares,
      y: d.Population,
      year: d.Year
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 dark mt-16">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Urban Data Analysis Dashboard</h1>
          <p className="text-gray-600">Comprehensive analysis of urban growth patterns and demographics</p>
        </div>

        {/* File Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Data Source
            </CardTitle>
            <CardDescription>
            Load from public folder with urban development data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4 items-center">
            
              <Button 
                onClick={() => loadPublicCSV('kolkata_1990_2050.csv')} 
                variant="outline"
              >
                Load from Public Folder
              </Button>
            </div>
            
            {loading && (
              <Alert>
                <AlertDescription>Loading and processing data...</AlertDescription>
              </Alert>
            )}

        {/* Advanced Analytics Section */}
        {data.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Advanced Analytics</CardTitle>
              <CardDescription>Key insights and trends from your urban development data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Key Insights */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Population Trend</h4>
                  <p className="text-sm text-blue-700">
                    {data.length > 1 && data[data.length - 1].Population > data[0].Population 
                      ? `Population increased by ${((data[data.length - 1].Population - data[0].Population) / data[0].Population * 100).toFixed(1)}% over the period`
                      : 'Population remained relatively stable'
                    }
                  </p>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Urban Expansion</h4>
                  <p className="text-sm text-green-700">
                    {data.length > 1 && data[data.length - 1].Urban_Extent_hectares > data[0].Urban_Extent_hectares
                      ? `Urban area expanded by ${((data[data.length - 1].Urban_Extent_hectares - data[0].Urban_Extent_hectares) / data[0].Urban_Extent_hectares * 100).toFixed(1)}%`
                      : 'Urban extent remained stable'
                    }
                  </p>
                </div>
                
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">Density Changes</h4>
                  <p className="text-sm text-purple-700">
                    {data.length > 1 
                      ? `Average urban density: ${(data.reduce((sum, d) => sum + d.Urban_Density_persons_hectare, 0) / data.length).toFixed(1)} persons/hectare`
                      : 'Insufficient data for density analysis'
                    }
                  </p>
                </div>
              </div>

              {/* Yearly Performance Table */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold">Year-over-Year Performance</h4>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300 text-sm">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-2">Year</th>
                        <th className="border border-gray-300 p-2">Population Change</th>
                        <th className="border border-gray-300 p-2">Urban Area Change</th>
                        <th className="border border-gray-300 p-2">Density Trend</th>
                        <th className="border border-gray-300 p-2">Growth Efficiency</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.slice(-5).map((row, index) => {
                        const prevRow = index > 0 ? data[data.indexOf(row) - 1] : null
                        const popChange = prevRow ? ((row.Population - prevRow.Population) / prevRow.Population * 100) : 0
                        const areaChange = prevRow ? ((row.Urban_Extent_hectares - prevRow.Urban_Extent_hectares) / prevRow.Urban_Extent_hectares * 100) : 0
                        const densityChange = prevRow ? row.Urban_Density_persons_hectare - prevRow.Urban_Density_persons_hectare : 0
                        const efficiency = areaChange !== 0 ? popChange / areaChange : 0

                        return (
                          <tr key={row.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="border border-gray-300 p-2 font-medium">{row.Year}</td>
                            <td className="border border-gray-300 p-2">
                              <span className={popChange > 0 ? 'text-green-600' : popChange < 0 ? 'text-red-600' : 'text-gray-600'}>
                                {prevRow ? `${popChange > 0 ? '+' : ''}${popChange.toFixed(2)}%` : 'N/A'}
                              </span>
                            </td>
                            <td className="border border-gray-300 p-2">
                              <span className={areaChange > 0 ? 'text-blue-600' : areaChange < 0 ? 'text-red-600' : 'text-gray-600'}>
                                {prevRow ? `${areaChange > 0 ? '+' : ''}${areaChange.toFixed(2)}%` : 'N/A'}
                              </span>
                            </td>
                            <td className="border border-gray-300 p-2">
                              <span className={densityChange > 0 ? 'text-green-600' : densityChange < 0 ? 'text-red-600' : 'text-gray-600'}>
                                {prevRow ? `${densityChange > 0 ? '+' : ''}${densityChange.toFixed(2)}` : 'N/A'}
                              </span>
                            </td>
                            <td className="border border-gray-300 p-2">
                              <span className={efficiency > 1 ? 'text-green-600' : efficiency < 1 && efficiency > 0 ? 'text-orange-600' : 'text-gray-600'}>
                                {prevRow && areaChange !== 0 ? efficiency.toFixed(2) : 'N/A'}
                              </span>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-gray-500">
                  Growth Efficiency = Population Growth Rate / Urban Area Growth Rate. Higher values indicate more efficient land use.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Interactive Metric Selector */}
        {data.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Custom Metric Analysis</CardTitle>
              <CardDescription>Select any metric to view its trend over time</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder="Select a metric to analyze" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Population">Population</SelectItem>
                  <SelectItem value="Urban_Extent_hectares">Urban Extent (hectares)</SelectItem>
                  <SelectItem value="Urban_Density_persons_hectare">Urban Density</SelectItem>
                  <SelectItem value="Built_up_Area_Density_persons_hectare">Built-up Area Density</SelectItem>
                  <SelectItem value="Population_Growth_Rate_percent">Population Growth Rate (%)</SelectItem>
                  <SelectItem value="Urban_Extent_Growth_Rate_percent">Urban Extent Growth Rate (%)</SelectItem>
                </SelectContent>
              </Select>

              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="Year" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: number) => [
                      selectedMetric.includes('percent') ? `${value.toFixed(2)}%` : 
                      selectedMetric === 'Population' ? value.toLocaleString() : 
                      value.toFixed(2),
                      selectedMetric.replace(/_/g, ' ').replace(/percent/g, '%')
                    ]} 
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey={selectedMetric} 
                    stroke="#8884d8" 
                    strokeWidth={3}
                    dot={{ fill: '#8884d8', strokeWidth: 2, r: 5 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>

              {/* Metric Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                <div className="p-3 bg-gray-50 rounded">
                  <div className="text-sm text-gray-600">Minimum</div>
                  <div className="text-lg font-semibold text-black">
                    {Math.min(...data.map(d => d[selectedMetric as keyof UrbanData] as number)).toLocaleString()}
                  </div>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <div className="text-sm text-gray-600">Maximum</div>
                  <div className="text-lg font-semibold text-black">
                    {Math.max(...data.map(d => d[selectedMetric as keyof UrbanData] as number)).toLocaleString()}
                  </div>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <div className="text-sm text-gray-600">Average</div>
                  <div className="text-lg font-semibold text-black" >
                    {(data.reduce((sum, d) => sum + (d[selectedMetric as keyof UrbanData] as number), 0) / data.length).toFixed(2)}
                  </div>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <div className="text-sm text-gray-600 ">Latest Value</div>
                  <div className="text-lg font-semibold text-black">
                    {data.length > 0 ? (data[data.length - 1][selectedMetric as keyof UrbanData] as number).toLocaleString() : 'N/A'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Instructions */}
        {data.length === 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>How to use this urban data analysis dashboard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Expected CSV Format:</h4>
                <p className="text-sm text-gray-600">
                  Your CSV should contain the following columns:
                </p>
                <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                  <li>Year</li>
                  <li>Population</li>
                  <li>Urban_Extent_hectares</li>
                  <li>Urban_Density_persons_hectare</li>
                  <li>Built_up_Area_Density_persons_hectare</li>
                  <li>Population_Growth_Rate_percent</li>
                  <li>Urban_Extent_Growth_Rate_percent</li>
                  <li>Added_Built_up_Area_Composition_Infill_Extension_Inclusion</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold">Usage Options:</h4>
                <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                  <li>Upload a CSV file using the file input above</li>
                  <li>Place your CSV file in the Next.js public folder and click &quot;Load from Public Folder&quot;</li>
                  <li>The dashboard will automatically parse and visualize your data</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">Features:</h4>
                <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                  <li>Interactive charts showing population and urban growth trends</li>
                  <li>Growth rate comparisons and correlations</li>
                  <li>Density analysis over time</li>
                  <li>Built-up area composition breakdown</li>
                  <li>Custom metric selection and analysis</li>
                  <li>Statistical summaries and year-over-year performance</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )}
        
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {data.length > 0 && (
              <Alert>
                <AlertDescription>
                  Successfully loaded {data.length} records spanning {stats?.totalYears} years
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Statistics Overview */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-blue-600">{stats.totalYears}</div>
                <p className="text-sm text-gray-600">Years of Data</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-green-600">{stats.latestPopulation}</div>
                <p className="text-sm text-gray-600">Latest Population</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-purple-600">{stats.avgGrowthRate}%</div>
                <p className="text-sm text-gray-600">Avg Growth Rate</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-orange-600">{stats.totalPopulationGrowth}%</div>
                <p className="text-sm text-gray-600">Total Growth</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-red-600">{stats.latestUrbanDensity}</div>
                <p className="text-sm text-gray-600">Urban Density</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Main Charts */}
        {data.length > 0 && (
          <Tabs defaultValue="trends" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="trends" className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Trends
              </TabsTrigger>
              <TabsTrigger value="growth" className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Growth Rates
              </TabsTrigger>
              <TabsTrigger value="density" className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Density
              </TabsTrigger>
              <TabsTrigger value="composition" className="flex items-center gap-2">
                <PieChartIcon className="w-4 h-4" />
                Composition
              </TabsTrigger>
              <TabsTrigger value="correlation" className="flex items-center gap-2">
                <ScatterChartIcon className="w-4 h-4" />
                Correlation
              </TabsTrigger>
            </TabsList>

            {/* Population and Urban Trends */}
            <TabsContent value="trends" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Population Trend Over Time</CardTitle>
                    <CardDescription>Historical population growth</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="Year" />
                        <YAxis />
                        <Tooltip formatter={(value: number) => [value.toLocaleString(), 'Population']} />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="Population" 
                          stroke="#8884d8" 
                          strokeWidth={3}
                          dot={{ fill: '#8884d8', strokeWidth: 2, r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Urban Extent Growth</CardTitle>
                    <CardDescription>Urban area expansion in hectares</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="Year" />
                        <YAxis />
                        <Tooltip formatter={(value: number) => [value.toLocaleString(), 'Hectares']} />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="Urban_Extent_hectares" 
                          stroke="#82ca9d" 
                          strokeWidth={3}
                          dot={{ fill: '#82ca9d', strokeWidth: 2, r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Growth Rates Comparison */}
            <TabsContent value="growth" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Growth Rates Comparison</CardTitle>
                  <CardDescription>Population vs Urban Extent growth rates by year</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={getGrowthRateComparison()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="Year" />
                      <YAxis label={{ value: 'Growth Rate (%)', angle: -90, position: 'insideLeft' }} />
                      <Tooltip formatter={(value: number) => [`${value.toFixed(2)}%`, '']} />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="Population Growth" 
                        stroke="#ff7300" 
                        strokeWidth={3}
                        dot={{ fill: '#ff7300', strokeWidth: 2, r: 4 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="Urban Extent Growth" 
                        stroke="#387908" 
                        strokeWidth={3}
                        dot={{ fill: '#387908', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Annual Growth Rates</CardTitle>
                  <CardDescription>Year-over-year growth comparison</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={getGrowthRateComparison()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="Year" />
                      <YAxis />
                      <Tooltip formatter={(value: number) => [`${value.toFixed(2)}%`, '']} />
                      <Legend />
                      <Bar dataKey="Population Growth" fill="#8884d8" />
                      <Bar dataKey="Urban Extent Growth" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Density Analysis */}
            <TabsContent value="density" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Urban Density Evolution</CardTitle>
                  <CardDescription>Urban and built-up area density comparison</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={getDensityData()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="Year" />
                      <YAxis label={{ value: 'Persons per Hectare', angle: -90, position: 'insideLeft' }} />
                      <Tooltip formatter={(value: number) => [value.toFixed(2), 'persons/hectare']} />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="Urban Density" 
                        stroke="#8884d8" 
                        strokeWidth={3}
                        dot={{ fill: '#8884d8', strokeWidth: 2, r: 4 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="Built-up Area Density" 
                        stroke="#ff7300" 
                        strokeWidth={3}
                        dot={{ fill: '#ff7300', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Urban Density by Year</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="Year" />
                        <YAxis />
                        <Tooltip formatter={(value: number) => [value.toFixed(2), 'persons/hectare']} />
                        <Bar dataKey="Urban_Density_persons_hectare" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Built-up Area Density</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="Year" />
                        <YAxis />
                        <Tooltip formatter={(value: number) => [value.toFixed(2), 'persons/hectare']} />
                        <Bar dataKey="Built_up_Area_Density_persons_hectare" fill="#ff7300" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Composition Analysis */}
            <TabsContent value="composition" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Built-up Area Composition</CardTitle>
                    <CardDescription>Distribution of infill, extension, and inclusion</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={getCompositionData()}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {getCompositionData().map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Composition by Year</CardTitle>
                    <CardDescription>How composition changes over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={data.slice(-10)}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="Year" />
                        <YAxis />
                        <Tooltip />
                        <Bar 
                          dataKey="Added_Built_up_Area_Composition_Infill_Extension_Inclusion" 
                          fill="#8884d8"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Correlation Analysis */}
            <TabsContent value="correlation" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Population vs Urban Extent</CardTitle>
                  <CardDescription>Correlation between population and urban area size</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <ScatterChart data={getScatterData()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        type="number" 
                        dataKey="x" 
                        name="Urban Extent" 
                        unit=" ha"
                        label={{ value: 'Urban Extent (hectares)', position: 'insideBottom', offset: -10 }}
                      />
                      <YAxis 
                        type="number" 
                        dataKey="y" 
                        name="Population"
                        label={{ value: 'Population', angle: -90, position: 'insideLeft' }}
                      />
                      <Tooltip 
                        cursor={{ strokeDasharray: '3 3' }}
                        formatter={(value: number, name: string) => [
                          name === 'y' ? value.toLocaleString() : value.toFixed(0),
                          name === 'y' ? 'Population' : 'Urban Extent (ha)'
                        ]}
                        labelFormatter={(value: any) => `Year: ${data.find(d => d.Urban_Extent_hectares === value)?.Year || 'N/A'}`}
                      />
                      <Scatter dataKey="y" fill="#8884d8" />
                    </ScatterChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Growth Rate Correlation</CardTitle>
                    <CardDescription>Population vs Urban Extent growth rates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <ScatterChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          type="number" 
                          dataKey="Population_Growth_Rate_percent" 
                          name="Pop Growth"
                          unit="%"
                        />
                        <YAxis 
                          type="number" 
                          dataKey="Urban_Extent_Growth_Rate_percent" 
                          name="Urban Growth"
                          unit="%"
                        />
                        <Tooltip 
                          formatter={(value: number) => [`${value.toFixed(2)}%`, '']}
                        />
                        <Scatter dataKey="Urban_Extent_Growth_Rate_percent" fill="#82ca9d" />
                      </ScatterChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Density Comparison</CardTitle>
                    <CardDescription>Urban vs Built-up area density</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <ScatterChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          type="number" 
                          dataKey="Urban_Density_persons_hectare" 
                          name="Urban Density"
                        />
                        <YAxis 
                          type="number" 
                          dataKey="Built_up_Area_Density_persons_hectare" 
                          name="Built-up Density"
                        />
                        <Tooltip 
                          formatter={(value: number) => [value.toFixed(2), 'persons/hectare']}
                        />
                        <Scatter dataKey="Built_up_Area_Density_persons_hectare" fill="#ff7300" />
                      </ScatterChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        )}

        {/* Data Table */}
        {data.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Raw Data Preview</CardTitle>
              <CardDescription>First 10 rows of your urban development data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto text-black">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-2 text-left">Year</th>
                      <th className="border border-gray-300 p-2 text-left">Population</th>
                      <th className="border border-gray-300 p-2 text-left">Urban Extent (ha)</th>
                      <th className="border border-gray-300 p-2 text-left">Urban Density</th>
                      <th className="border border-gray-300 p-2 text-left">Built-up Density</th>
                      <th className="border border-gray-300 p-2 text-left">Pop Growth %</th>
                      <th className="border border-gray-300 p-2 text-left">Urban Growth %</th>
                      <th className="border border-gray-300 p-2 text-left">Composition</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.slice(0, 10).map((row, index) => (
                      <tr key={row.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="border border-gray-300 p-2">{row.Year}</td>
                        <td className="border border-gray-300 p-2">{row.Population.toLocaleString()}</td>
                        <td className="border border-gray-300 p-2">{row.Urban_Extent_hectares.toLocaleString()}</td>
                        <td className="border border-gray-300 p-2">{row.Urban_Density_persons_hectare.toFixed(2)}</td>
                        <td className="border border-gray-300 p-2">{row.Built_up_Area_Density_persons_hectare.toFixed(2)}</td>
                        <td className="border border-gray-300 p-2">{row.Population_Growth_Rate_percent.toFixed(2)}%</td>
                        <td className="border border-gray-300 p-2">{row.Urban_Extent_Growth_Rate_percent.toFixed(2)}%</td>
                        <td className="border border-gray-300 p-2 text-sm">{row.Added_Built_up_Area_Composition_Infill_Extension_Inclusion}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {data.length > 10 && (
                <p className="text-sm text-gray-600 mt-2">
                  Showing 10 of {data.length} total records
                </p>
              )}
            </CardContent>
          </Card>
        )}
        </div>
        </div>)}