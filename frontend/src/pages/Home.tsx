import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronRight, Terminal, Code2, Cpu } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Link } from 'react-router-dom'
import profile1Img from '../assets/profile1.jpeg'

export default function Home() {
  const [settings] = useState<Record<string, string>>({});
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring' as const, stiffness: 60, damping: 15 } }
  }

  const displayPhoto = settings.profile_photo_url || profile1Img;

  return (
    <div className="w-full bg-background overflow-hidden relative">

      {/* Hero Background & Blobs */}
      <div className="absolute inset-0 h-[120vh] bg-[#0f0f1a] -z-20 pointer-events-none" />
      <div className="absolute top-0 right-[-10%] w-[800px] h-[800px] bg-[#7f5af0]/15 rounded-full blur-[120px] mix-blend-screen pointer-events-none animate-blob" />
      <div className="absolute bottom-[-20%] left-[-20%] w-[600px] h-[600px] bg-[#3b82f6]/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none animate-blob animation-delay-2000" />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 z-10 w-full">
        <div className="container mx-auto px-4 lg:px-8 flex flex-col items-center">
          
          {/* Content Wrapper (No background card, sitting directly on dark bg) */}
          <motion.div 
            className="w-full max-w-5xl pt-10 pb-8 flex flex-col items-center text-center relative z-20"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Clean Circular Profile Image */}
            <motion.div 
               variants={itemVariants} 
               className="relative mb-8 lg:mb-12 flex justify-center w-full"
            >
              {/* Smooth floating/bounce animation wrapping the circular image */}
              <motion.div 
                 animate={{ y: [0, -12, 0] }} 
                 transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                 className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.5)] group hover:scale-[1.05] transition-all duration-300"
              >
                  <img 
                     src={displayPhoto} 
                     alt={settings.name || 'Nidhi Singh'} 
                     className="w-full h-full object-cover object-center"
                     onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1549692520-acc6669e2f0c?q=80&w=2574&auto=format&fit=crop'; }}
                  />
              </motion.div>
            </motion.div>

            {/* Text Content */}
            <motion.div variants={itemVariants} className="flex flex-col items-center z-10 w-full max-w-3xl mt-4">
              <h2 className="text-lg md:text-xl font-medium tracking-wide text-gray-300 mb-4 font-['Inter',sans-serif]">
                 Hello, I'm <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7f5af0] to-[#3b82f6] capitalize">{settings.name || 'Nidhi Singh'}</span>
              </h2>
              
              <h1 className="text-4xl sm:text-6xl lg:text-[5rem] leading-[1.1] font-black tracking-tight mb-6 text-white font-['Poppins',sans-serif]">
                Full Stack <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7f5af0] via-[#9474f6] to-[#3b82f6]">Developer</span>
              </h1>

              <p className="text-base sm:text-lg text-gray-400 max-w-2xl mb-10 leading-relaxed font-['Inter',sans-serif]">
                {settings.tagline || '2nd Year Computer Science & Engineering Student | Aspiring to build scalable, striking digital experiences.'}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto">
                <Link to="/projects" className="w-full sm:w-auto">
                  <Button className="w-full h-14 px-8 text-base bg-gradient-to-r from-[#7f5af0] to-[#6038f0] hover:from-[#6038f0] hover:to-[#5028e0] text-white font-semibold transition-all hover:scale-105 active:scale-95 duration-300 rounded-full border border-white/10 shadow-[0_0_20px_rgba(127,90,240,0.3)] hover:shadow-[0_0_30px_rgba(127,90,240,0.5)]">
                    View Projects <ArrowRight className="w-5 h-5 ml-2 inline" />
                  </Button>
                </Link>
                <div className="flex gap-4 w-full sm:w-auto">
                  <a href="https://github.com/nidhi14a-svg" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                    <Button variant="outline" className="w-full h-14 px-8 text-base border-white/10 text-gray-300 hover:text-white hover:border-[#7f5af0] bg-white/5 hover:bg-white/10 transition-all duration-300 rounded-full font-medium backdrop-blur-sm">
                      GitHub
                    </Button>
                  </a>
                  <a href="https://www.linkedin.com/in/nidhi-singh-807587386?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                    <Button variant="outline" className="w-full h-14 px-8 text-base border-white/10 text-gray-300 hover:text-white hover:border-[#3b82f6] bg-white/5 hover:bg-white/10 transition-all duration-300 rounded-full font-medium backdrop-blur-sm">
                      LinkedIn
                    </Button>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Floating Stats Bar - Adjusted for Glass Theme */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-4xl mt-12 relative z-30"
          >
            <div className="rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row flex-wrap sm:flex-nowrap justify-around gap-8 relative overflow-hidden"
                 style={{
                   background: 'rgba(255, 255, 255, 0.02)',
                   backdropFilter: 'blur(12px)',
                   WebkitBackdropFilter: 'blur(12px)',
                   border: '1px solid rgba(255, 255, 255, 0.05)',
                 }}>
               <div className="flex flex-col items-center justify-center space-y-2 w-full sm:w-auto">
                 <span className="text-4xl lg:text-5xl font-black text-white">3+</span>
                 <span className="text-xs md:text-sm font-semibold tracking-[0.2em] text-[#7f5af0] uppercase">Projects Done</span>
               </div>
               <div className="hidden sm:block w-px bg-white/10 my-2" />
               <div className="flex flex-col items-center justify-center space-y-2 w-full sm:w-auto">
                 <span className="text-4xl lg:text-5xl font-black text-white">5+</span>
                 <span className="text-xs md:text-sm font-semibold tracking-[0.2em] text-[#3b82f6] uppercase">Tech Skills</span>
               </div>
               <div className="hidden sm:block w-px bg-white/10 my-2" />
               <div className="flex flex-col items-center justify-center space-y-2 w-full sm:w-auto">
                 <span className="text-4xl lg:text-5xl font-black text-white">4th</span>
                 <span className="text-xs md:text-sm font-semibold tracking-[0.2em] text-[#7f5af0] uppercase">Semester</span>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 md:py-32 relative z-10 w-full border-t border-border/50 bg-card/30">
        <div className="container mx-auto px-6 lg:px-12">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             
             {/* Left: Text & Bio */}
             <motion.div 
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 0.7 }}
               className="space-y-8"
             >
                <div className="flex items-center gap-3">
                   <div className="h-[2px] w-12 bg-primary" />
                   <h2 className="text-primary font-bold tracking-widest text-sm uppercase">About Me</h2>
                </div>
                
                <h3 className="text-4xl md:text-5xl font-black tracking-tight text-foreground leading-tight">
                  ENGINEERING <br/> DIGITAL <span className="text-primary">SOLUTIONS</span>
                </h3>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  {settings.bio || 'I am a second-year Computer Science and Engineering student with a GPA of 9.22, passionate about exploring new technologies and building impactful solutions. I am currently focused on web development, continuously improving my skills by working on real-world projects and learning modern tools. I believe in consistent growth, curiosity, and hard work, and I am always eager to take on challenges that push me to become a better developer.'}
                </p>

                <ul className="space-y-4 pt-4">
                  <li className="flex items-center gap-4 text-foreground/90 font-medium">
                    <span className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary"><Terminal className="w-5 h-5"/></span>
                    Full Stack Development & API Architecture
                  </li>
                  <li className="flex items-center gap-4 text-foreground/90 font-medium">
                    <span className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary"><Code2 className="w-5 h-5"/></span>
                    Interactive UI/UX with React & Motion
                  </li>
                  <li className="flex items-center gap-4 text-foreground/90 font-medium">
                    <span className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary"><Cpu className="w-5 h-5"/></span>
                    Scalable Database Systems (PostgreSQL)
                  </li>
                </ul>

                <div className="pt-6">
                   <Link to="/about">
                      <Button variant="outline" className="h-12 border-primary text-primary hover:bg-primary hover:text-primary-foreground group transition-all duration-300">
                         More About Me <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                   </Link>
                </div>
             </motion.div>

             {/* Right: Abstract Image Shape */}
             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.7 }}
               className="relative lg:ml-auto w-full max-w-md mx-auto lg:max-w-none"
             >
               {/* Green Base Shape */}
               <div className="absolute top-8 -right-8 w-full h-full bg-primary rounded-2xl transform rotate-3 opacity-20" />
               <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-primary/30 rounded-full blur-3xl" />
               
               <div className="relative rounded-[12px] overflow-hidden shadow-2xl z-10 aspect-[4/5] md:aspect-square">
                  <img src={displayPhoto} alt="About Me" className="w-full h-full object-cover" />
               </div>
             </motion.div>

           </div>
        </div>
      </section>
    </div>
  )
}
