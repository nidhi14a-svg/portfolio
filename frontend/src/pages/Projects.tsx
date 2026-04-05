import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, FolderGit2 } from "lucide-react";
import { Button } from '../components/ui/Button'
import todoImg from "../assets/todo.jpeg";
import weatherImg from "../assets/weather.jpeg";
import clockImg from "../assets/clock.jpeg";
import schImg from "../assets/sch.jpeg";
interface Project {
  id: number
  title: string
  description: string
  tech_stack: string | string[]
  image_url: string
  github_url: string
  live_url: string
}

export default function Projects() {
  const [projects] = useState<Project[]>([
    {
      
      id: 1,
      title: "scholar_connect",
      description: "Scholar Connect is a collaborative web application built to bridge the gap between students and academic opportunities. It allows users to connect, share knowledge, explore scholarships/internships, and engage in a community-driven learning environment.",
      tech_stack: ["HTML", "CSS", "JavaScript"],
      image_url: schImg,
      github_url: "https://github.com/nidhi14a-svg/scholar_connect",
      live_url: "https://scholar-connect-six.vercel.app/"
    },
    {

      id: 2,
      title: "To-Do List Application",
      description: "Created a simple and interactive to-do list web app that allows users to add, delete, and manage daily tasks efficiently. This project focuses on DOM manipulation, event handling, and basic data persistence concepts, helping improve productivity through a clean and intuitive interface.",
      tech_stack: ["HTML", "CSS", "JavaScript"],
      image_url: todoImg,
      github_url: "https://github.com/nidhi14a-svg/todo",
      live_url: "https://todo-red-ten-28.vercel.app"
    },
    {
      id: 3,
      title: "Weather Website",
      description: "Developed a dynamic weather web application that fetches real-time weather data using a public API. The application allows users to search for any location and displays key details such as temperature, humidity, and weather conditions. This project helped me understand API integration, asynchronous JavaScript, and handling real-time data in a user-friendly interface.",
      tech_stack: ["HTML", "CSS", "JavaScript", "API Integration"],
      image_url: weatherImg,
      github_url: "https://github.com/nidhi14a-svg/weather_app",
      live_url: "https://weather-app-omega-one-24.vercel.app"
    },
    {
      id: 4,
      title: "Real-Time Clock",
      description: "Built a real-time digital clock using JavaScript that continuously updates to display the current system time.",
      tech_stack: ["HTML", "CSS", "JavaScript"],
      image_url: clockImg,
      github_url: "https://github.com/nidhi14a-svg/clock",
      live_url: "https://clock-orcin-one.vercel.app"
    }
  ])
  // Projects initialized with user data
  
  return (
    <div className="pt-32 pb-24 min-h-screen container mx-auto px-6 lg:px-12 bg-background">
      <div className="mb-20 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
        <div>
          <div className="flex items-center gap-3 mb-6">
             <div className="h-[2px] w-12 bg-primary" />
             <span className="text-primary font-bold tracking-widest text-sm uppercase">My Work</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter uppercase">Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-foreground to-primary">Projects</span></h1>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            I specialize in engineering full-stack ecosystems. Here are some of the web applications I have built recently.
          </p>
        </div>
      </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => {
            const techStack = Array.isArray(project.tech_stack) 
              ? project.tech_stack 
              : (typeof project.tech_stack === 'string' ? project.tech_stack.split(',') : [])

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                className="group rounded-2xl border flex border-border/50 bg-card overflow-hidden hover:shadow-neon hover:border-primary/50 transition-all duration-500 relative flex-col hover:-translate-y-2"
              >
                {/* Image Container */}
                <div className="aspect-[16/10] w-full bg-muted border-b border-border/50 flex items-center justify-center overflow-hidden relative">
                   {project.image_url ? (
                     <img src={project.image_url} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100" />
                   ) : (
                     <FolderGit2 className="w-16 h-16 text-primary/30 group-hover:text-primary transition-colors duration-500" />
                   )}
                   {/* Gradient Overlay */}
                   <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-300" />
                </div>

                {/* Content Container */}
                <div className="p-8 flex flex-col flex-grow z-10 relative bg-card">
                  <h3 className="text-2xl font-black mb-3 group-hover:text-primary transition-colors tracking-tight uppercase">{project.title}</h3>
                  <p className="text-muted-foreground/80 text-base mb-6 line-clamp-3 leading-relaxed flex-grow">
                    {project.description}
                  </p>

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                    {techStack.map(tech => (
                      <span key={tech} className="px-3 py-1 text-[11px] font-bold tracking-widest uppercase bg-primary/10 text-primary border border-primary/20 rounded-md shadow-sm">
                        {tech.trim()}
                      </span>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                    {project.live_url && (
                      <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="flex-1">
                        <Button className="w-full text-foreground hover:bg-primary hover:text-primary-foreground font-bold shadow-sm transition-all duration-300">
                          Live Demo <ExternalLink className="w-4 h-4 ml-2" />
                        </Button>
                      </a>
                    )}
{project.github_url && (
  <a
    href={project.github_url}
    target="_blank"
    rel="noopener noreferrer"
    className="flex-1"
  >
    <Button
      variant="outline"
      className="w-full border-border hover:border-primary"
    >
      View Code
    </Button>
  </a>
)}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
    </div>
  )
}
