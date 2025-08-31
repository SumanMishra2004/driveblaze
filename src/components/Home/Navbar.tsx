"use client"
import * as React from "react"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import {
  Home,
  BarChart3,
  MapPin,
  Activity,
  Users,
  Star,
  Menu,
  BookOpen,
  Bot,
  ChevronRight
} from "lucide-react"

export function NavigationMenuDemo() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [activeItem, setActiveItem] = React.useState("Home")

  const menuItems = [
    { name: "Home", href: "/", icon: Home, description: "Dashboard overview" },
    { name: "Analytics", href: "/analytics", icon: BarChart3, description: "Data insights" },
    { name: "Map View", href: "/map-visualization", icon: MapPin, description: "Geographic data" },
    { name: "Predictions", href: "/prediction", icon: Activity, description: "ML forecasting" },
    { name: "Team", href: "/team", icon: Users, description: "Team information" },
    { name: "Objective", href: "/objective", icon: BookOpen, description: "Project goals" },
    { name: "AI Assistant", href: "/GenAi", icon: Bot, description: "AI-powered help", badge: "New" },
    { name: "Future Scope", href: "/future-scope", icon: Star, description: "Roadmap" },
  ]

  const handleItemClick = (itemName: string) => {
    setActiveItem(itemName)
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-slate-200/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <span className="text-white font-bold text-lg">D</span>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Dcoder
              </h1>
              <p className="text-xs text-slate-500 -mt-1">Analytics Platform</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="flex items-center space-x-1">
              {menuItems.map((item) => (
                <NavigationMenuItem key={item.name}>
                  <NavigationMenuLink asChild>
                    <Link 
                      href={item.href}
                      className={`group inline-flex h-10 w-max items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-slate-100 hover:text-slate-900 focus:bg-slate-100 focus:text-slate-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 relative ${
                        activeItem === item.name 
                          ? 'bg-slate-100 text-slate-900' 
                          : 'text-slate-600'
                      }`}
                      onClick={() => handleItemClick(item.name)}
                    >
                      <item.icon className="w-4 h-4 mr-2" />
                      <span>{item.name}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-2 text-xs bg-blue-100 text-blue-700 hover:bg-blue-200">
                          {item.badge}
                        </Badge>
                      )}
                      {activeItem === item.name && (
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
                      )}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Call to Action - Desktop */}
          <Link href={"/prediction"} className="hidden lg:flex items-center space-x-3">
            <Button 
              variant="default" 
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Get Started
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200"
              >
                <Menu className="w-5 h-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 p-0 bg-white">
              {/* Mobile Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-100">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">D</span>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                      Dcoder
                    </h2>
                    <p className="text-xs text-slate-500">Analytics Platform</p>
                  </div>
                </div>
              </div>
              
              {/* Mobile Navigation Links */}
              <div className="py-6">
                <nav className="space-y-1 px-6">
                  {menuItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`group flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        activeItem === item.name
                          ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-100'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                      onClick={() => handleItemClick(item.name)}
                    >
                      <div className="flex items-center">
                        <item.icon className="w-5 h-5 mr-3" />
                        <div>
                          <div className="flex items-center">
                            {item.name}
                            {item.badge && (
                              <Badge variant="secondary" className="ml-2 text-xs bg-blue-100 text-blue-700">
                                {item.badge}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">{item.description}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 opacity-40 group-hover:opacity-70 transition-opacity duration-200" />
                    </Link>
                  ))}
                </nav>
                
                {/* Mobile Call to Action */}
                <Link href={"/prediction"} className="mt-8 px-6">
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Get Started
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}