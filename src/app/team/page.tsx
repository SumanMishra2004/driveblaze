"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Github, Linkedin, Twitter, Mail } from 'lucide-react'

const teamMembers = [
  {
    id: 1,
    name:"Suman Mishra",
    role: "Full-stack developer",
    image: "/me.jpeg",
    skills: ["Next", "TypeScript", "Machine Learning", "Leadership"]
  },
  {
    id: 2,
    name: "Divyanshi Srivastava",
    role: "Data Analyst",
    image: "/map/divu.jpg",
    skills: ["Python", "QGis", "GEE"]
  },
  {
    id: 3,
    name: "Tuheena Bose",
    role: "ML developer",
    image: "/map/tuhe.jpg",
    skills: ["Python", "QGIS", "Machine Learning"]
    
  }
]

const AnimatedTeamPage: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-slate-100 to-blue-200 py-12 px-4 flex flex-col min-h-screen">
      <div className="w-full lg:px-10 px-3 flex flex-col">
        {/* Page Title */}
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-blue-700 to-purple-800 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Meet Our Team
        </motion.h1>

        {/* Team Cards */}
        <div className="flex flex-wrap justify-center gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)"
              }}
              className="
                w-full 
                sm:w-[48%] 
                lg:w-[30%] 
                rounded-xl 
                overflow-hidden 
                shadow-md 
                transition-transform 
                duration-300 
                flex flex-col
              "
            >
              <Card className="border-none bg-white/80 backdrop-blur-sm flex flex-col h-full">
                {/* Image */}
                <div className="aspect-square w-[80%] mx-auto overflow-hidden rounded-t-xl flex-shrink-0">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>

                {/* Card Content */}
                <CardContent className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <CardTitle className="text-xl font-bold text-gray-900 mb-1">
                      {member.name}
                    </CardTitle>
                    <p className="text-sm text-blue-600 font-semibold mb-3">{member.role}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {member.skills.map(skill => (
                        <Badge key={skill} className="bg-blue-100 text-blue-800 border-none">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Social Buttons */}
                  <div className="flex space-x-2 mt-4">
                    <Button variant="ghost" size="icon" className="text-gray-600 hover:bg-gray-100">
                      <Github className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-blue-600 hover:bg-blue-50">
                      <Linkedin className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-sky-500 hover:bg-sky-50">
                      <Twitter className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-50">
                      <Mail className="w-5 h-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AnimatedTeamPage
