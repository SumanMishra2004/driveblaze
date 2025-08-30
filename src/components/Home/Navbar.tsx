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
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { Button } from "@/components/ui/button"

import {
  Home,
  BarChart3,
  MapPin,
  Activity,
  Users,
  Star,
  Menu,
  X,
  BookAlert,
  Superscript
} from "lucide-react"

export function NavigationMenuDemo() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [activeItem, setActiveItem] = React.useState("Home")

  const menuItems = [
    { name: "Home", href: "/", icon: <Home className="w-5 h-5 mr-3 stroke-current" /> },
    { name: "Analytics", href: "/analytics", icon: <BarChart3 className="w-5 h-5 mr-3 stroke-current" /> },
    { name: "Map Visualization", href: "/map-visualization", icon: <MapPin className="w-5 h-5 mr-3 stroke-current" /> },
    { name: "Prediction", href: "/prediction", icon: <Activity className="w-5 h-5 mr-3 stroke-current" /> },
    { name: "Team Details", href: "/team", icon: <Users className="w-5 h-5 mr-3 stroke-current" /> },
    { name: "Future Scope", href: "/future-scope", icon: <Star className="w-5 h-5 mr-3 stroke-current" /> },
    { name: "Objective", href: "/objective", icon: <BookAlert className="w-5 h-5 mr-3 stroke-current" /> },
    { name: "Ai support", href: "/GenAi", icon: <Superscript className="w-5 h-5 mr-3 stroke-current" /> },

  ]

  const handleItemClick = (itemName: string) => {
    setActiveItem(itemName)
    setIsMobileMenuOpen(false)
  }

  return (
    <header className=" top-0 z-50 w-full bg-white/90 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo Section */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">D</span>
            </div>
            <div className="hidden sm:block h-full w-10 bg-red-400">
             
            </div>
          </div>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="flex items-center space-x-2">
              {menuItems.map((item) => (
                <NavigationMenuItem key={item.name}>
                  <NavigationMenuLink 
                    asChild 
                    className={`${navigationMenuTriggerStyle()} relative px-4 py-2 rounded-lg transition-all duration-300 hover:bg-blue-50 hover:text-blue-600 ${
                      activeItem === item.name 
                        ? 'bg-blue-100 text-blue-600 shadow-sm' 
                        : 'text-gray-700'
                    }`}
                  >
                    <Link 
                      href={item.href} 
                      className="flex items-center font-medium flex-row"
                      onClick={() => handleItemClick(item.name)}
                    >
                      <span className="mr-2 inline">{item.icon}</span>
                      {item.name}
                      {activeItem === item.name && (
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
                      )}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          
          {/* Mobile Menu Button */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="sm" className="p-2">
                <Menu className="w-6 h-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 p-0">
              <SheetHeader className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-lg">D</span>
                    </div>
                    <div>
                      <SheetTitle className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        DataViz Pro
                      </SheetTitle>
                      <SheetDescription className="text-sm text-gray-500">
                        Advanced Analytics Platform
                      </SheetDescription>
                    </div>
                  </div>
                </div>
              </SheetHeader>
              
              {/* Mobile Navigation Links */}
              <div className="py-6">
                <nav className="space-y-2 px-6">
                  {menuItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                        activeItem === item.name
                          ? 'bg-blue-100 text-blue-600 shadow-sm'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                      }`}
                      onClick={() => handleItemClick(item.name)}
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  ))}
                </nav>
                
                {/* Mobile Action Buttons */}
                <div className="mt-8 px-6 space-y-3">
                  <Button variant="outline" className="w-full border-gray-300 hover:border-blue-500 hover:text-blue-600">
                    Sign In
                  </Button>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg">
                    Get Started
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>

        </div>
      </div>
    </header>
  )
}