"use client";

import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, ImageIcon, Download, ZoomIn, ZoomOut, RotateCw } from 'lucide-react'

export default function YearImageTabs() {
  // Generate years from 1975 to 2025 in 5-year intervals
  const years = Array.from({ length: 11 }, (_, i) => 1975 + i * 5)
  
  const [selectedYear, setSelectedYear] = useState<number>(1975)
  const [imageData, setImageData] = useState<string>("/map/built_1975.png")
  const [zoomLevel, setZoomLevel] = useState<number>(275)
  const [rotation, setRotation] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  // Function to fetch image from public folder
  const fetchImage = async (year: number) => {
    setLoading(true)
    setError(false)
    
    // Update state to show the new image path
    setImageData("/map/built_" + year + ".png")
    
    // Simulate loading time
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }

  // Handle tab change
  const handleTabChange = (year: string) => {
    const yearNum = parseInt(year)
    setSelectedYear(yearNum)
    setZoomLevel(275)
    setRotation(0)
    
    // Fetch image for the selected year
    fetchImage(yearNum)
  }

  // Image control functions
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 25, 300))
  }

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 25, 50))
  }

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360)
  }

  const handleDownload = async (year: number) => {
    if (imageData) {
      try {
        const response = await fetch(imageData)
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `map/built_${year}.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
      } catch (error) {
        console.error('Download failed:', error)
      }
    }
  }

  // Reset image controls
  const resetImageControls = () => {
    setZoomLevel(100)
    setRotation(0)
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6 mt-16">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
          <Calendar className="w-8 h-8 text-blue-600" />
          Historical Image Timeline
        </h1>
        <p className="text-gray-600">Browse images across different years (1975-2025)</p>
      </div>

      <Tabs value={selectedYear.toString()} onValueChange={handleTabChange} className="w-full">
        {/* Scrollable Tabs List */}
        <div className="relative">
          <TabsList className="grid grid-cols-11 w-full h-auto p-1 bg-gray-100 rounded-lg overflow-x-auto">
            {years.map(year => (
              <TabsTrigger 
                key={year} 
                value={year.toString()}
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm px-4 py-2 text-sm font-medium whitespace-nowrap min-w-[80px]"
              >
                {year}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* Tab Content */}
        {years.map(year => (
          <TabsContent key={year} value={year.toString()} className="mt-6">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle className="flex items-center gap-2">
                      <ImageIcon className="w-5 h-5 text-blue-600" />
                      Year {year}
                    </CardTitle>
                    <CardDescription>
                      Historical built-up area data for {year}
                    </CardDescription>
                  </div>
                  <Badge variant={!loading && !error ? "default" : error ? "destructive" : "secondary"}>
                    {loading ? "Loading..." : error ? "Error" : "Loaded"}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Image Controls */}
                {!loading && !error && (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" onClick={handleZoomOut}>
                        <ZoomOut className="w-4 h-4" />
                      </Button>
                      <span className="text-sm font-medium min-w-[60px] text-center">
                        {zoomLevel}%
                      </span>
                      <Button size="sm" variant="outline" onClick={handleZoomIn}>
                        <ZoomIn className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={handleRotate}>
                        <RotateCw className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" onClick={resetImageControls}>
                        Reset
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDownload(year)}>
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                )}

                {/* Image Display Area */}
                <div className="min-h-[400px] bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden relative">
                  {loading && (
                    <div className="text-center space-y-2">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                      <p className="text-gray-600">Loading image for {year}...</p>
                    </div>
                  )}

                  {error && (
                    <div className="text-center space-y-3 max-w-md">
                      <div className="text-gray-400">
                        <ImageIcon className="w-16 h-16 mx-auto mb-2" />
                      </div>
                      <div className="space-y-2">
                        <p className="text-gray-600 font-medium">Image not found for {year}</p>
                        <p className="text-sm text-gray-500">
                          Expected path: /GHSL_BuiltUp/built_{year}.tif
                        </p>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => fetchImage(year)}
                          className="mt-2"
                        >
                          Try Again
                        </Button>
                      </div>
                    </div>
                  )}

                  {!loading && !error && imageData && (
                    <div className="w-full h-full flex items-center justify-center p-4">
                      <img 
                        src={imageData} 
                        alt={`Built-up area data for year ${year}`}
                        className="max-w-full max-h-full object-contain shadow-lg rounded transition-all duration-300"
                        style={{ 
                          transform: `scale(${zoomLevel / 100}) rotate(${rotation}deg)`,
                          transformOrigin: 'center center'
                        }}
                        onError={() => {
                          setError(true)
                          setLoading(false)
                        }}
                        onLoad={() => {
                          setError(false)
                          setLoading(false)
                        }}
                      />
                    </div>
                  )}

                  {!loading && !error && !imageData && (
                    <div className="text-center space-y-3">
                      <div className="text-gray-400">
                        <ImageIcon className="w-16 h-16 mx-auto mb-2" />
                      </div>
                      <div className="space-y-2">
                        <p className="text-gray-600 font-medium">Click to load image for {year}</p>
                        <Button 
                          onClick={() => fetchImage(year)}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <ImageIcon className="w-4 h-4 mr-2" />
                          Load Image
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Image Information */}
                {!loading && !error && imageData && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-3 bg-blue-50 rounded">
                      <div className="text-sm text-blue-700 font-medium">Year</div>
                      <div className="text-lg font-semibold text-blue-900">{year}</div>
                    </div>
                    <div className="p-3 bg-green-50 rounded">
                      <div className="text-sm text-green-700 font-medium">Status</div>
                      <div className="text-lg font-semibold text-green-900">Loaded</div>
                    </div>
                    <div className="p-3 bg-purple-50 rounded">
                      <div className="text-sm text-purple-700 font-medium">Source</div>
                      <div className="text-sm font-mono text-purple-900 truncate">
                        {imageData}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

    </div>
  )
}