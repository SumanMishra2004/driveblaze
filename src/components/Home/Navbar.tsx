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
  HomeIcon, 
  BarChartIcon, 
  MapPinIcon, 
  ActivityIcon, 
  UsersIcon, 
  StarIcon 
} from "lucide-react"

export function NavigationMenuDemo() {
  const menuItems = [
    { name: "Home", href: "/", icon: <HomeIcon className="w-5 h-5 mr-2 stroke-current text-black inline" /> },
    { name: "Analytics", href: "/analytics", icon: <BarChartIcon className="w-5 h-5 mr-2 stroke-current text-black" /> },
    { name: "Map Visualization", href: "/map-visualization", icon: <MapPinIcon className="w-5 h-5 mr-2 stroke-current text-black" /> },
    { name: "Prediction", href: "/prediction", icon: <ActivityIcon className="w-5 h-5 mr-2 stroke-current text-black" /> },
    { name: "Team Details", href: "/team-details", icon: <UsersIcon className="w-5 h-5 mr-2 stroke-current text-black" /> },
    { name: "Future Scope", href: "/future-scope", icon: <StarIcon className="w-5 h-5 mr-2 stroke-current text-black" /> },
  ]

  return (
    <NavigationMenu viewport={false} className="w-full px-3">
      <NavigationMenuList className="w-screen px-3  flex items-center justify-between">
        {menuItems.map((item) => (
          <NavigationMenuItem key={item.name}>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()} >
              <Link href={item.href} className="flex items-center text-black hover:text-blue-600 flex-row">
                {item.icon}
                {item.name}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
