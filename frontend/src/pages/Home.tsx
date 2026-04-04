import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronRight, Terminal, Code2, Cpu } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Link } from 'react-router-dom'
import { ApiServices } from '../api/api'
import nidhiPhoto from '../assets/profile1.jpeg'

export default function Home() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ApiServices.getPortfolioData();
        setSettings(res.data.settings || {});
      } catch (e) {
        console.error("Failed to load portfolio data", e);
      }
    };
    fetchData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring' as const, stiffness: 60, damping: 15 } }
  }

  const displayPhoto = settings.profile_photo_url || nidhiPhoto;

  return (
    <div className="w-full bg-background overflow-hidden relative">
      {/* Background Animated Blobs */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none animate-blob" />
      <div className="absolute bottom-0 left-[-20%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] mix-blend-screen pointer-events-none animate-blob animation-delay-2000" />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-24 pb-16 z-10 w-full">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div 
            className="grid grid-cols-1 xl:grid-cols-2 gap-12 xl:gap-20 items-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Left Content (Text) */}
            <div className="flex flex-col items-start z-20 pt-10 xl:pt-0">
              <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
                 <div className="h-[2px] w-12 bg-primary" />
                 <span className="text-primary font-bold tracking-widest text-sm uppercase">I Create Web Applications</span>
              </motion.div>
              
              <motion.h1 
                variants={itemVariants}
                className="text-5xl sm:text-7xl lg:text-[5.5rem] leading-[1.1] font-black tracking-tighter mb-4 text-foreground uppercase"
              >
                Full Stack <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Developer</span>
              </motion.h1>
              
              <motion.h2 variants={itemVariants} className="text-xl md:text-3xl font-bold tracking-tight mb-6 text-foreground/80 lowercase">
                 im <span className="text-foreground capitalize">{settings.name || 'Nidhi Singh'}</span>
              </motion.h2>

              <motion.p 
                variants={itemVariants}
                className="text-lg text-muted-foreground text-opacity-80 max-w-lg mb-10 leading-relaxed"
              >
                {settings.tagline || '2nd Year computer science and Engineering Student & Aspiring Full Stack Developer'}
              </motion.p>
              
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <Link to="/projects" className="w-full sm:w-auto">
                  <Button className="w-full h-14 px-8 text-base bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-neon transition-all hover:scale-105 active:scale-95 duration-300">
                    View Projects <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <div className="flex gap-4 w-full sm:w-auto">
                  <a href="https://github.com/nidhi14a-svg" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                    <Button variant="outline" className="w-full h-14 px-6 text-base border-border hover:border-primary hover:text-primary bg-background/50 hover:bg-primary/10 transition-all duration-300">
                      GitHub
                    </Button>
                  </a>
                  <a href="https://www.linkedin.com/in/nidhi-singh-807587386?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                    <Button variant="outline" className="w-full h-14 px-6 text-base border-border hover:border-primary hover:text-primary bg-background/50 hover:bg-primary/10 transition-all duration-300">
                      LinkedIn
                    </Button>
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Right Image Split Overlay (Circular) */}
            <motion.div variants={itemVariants} className="relative w-full flex justify-center xl:justify-end mt-12 xl:mt-0">
               <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] rounded-full overflow-hidden group shadow-2xl border-4 border-primary/20">
                 {/* Image */}
                 <img 
                    src={displayPhoto} 
                    alt={settings.name || 'Nidhi Singh'} 
                    className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                    onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1549692520-acc6669e2f0c?q=80&w=2574&auto=format&fit=crop'; }}
                 />
                 <div className="absolute inset-0 bg-primary/10 mix-blend-overlay group-hover:bg-primary/0 transition-all duration-700 pointer-events-none" />
               </div>
            </motion.div>
          </motion.div>

          {/* Floating Stats Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
            className="w-full mt-24 relative z-30"
          >
            <div className="glass rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row flex-wrap xl:flex-nowrap justify-around gap-8 shadow-2xl border-primary/20 bg-background/80 backdrop-blur-2xl">
               <div className="flex flex-col items-center justify-center space-y-2">
                 <span className="text-4xl lg:text-5xl font-black text-primary">3+</span>
                 <span className="text-sm font-medium tracking-widest text-muted-foreground uppercase">Projects Done</span>
               </div>
               <div className="hidden md:block w-px bg-border my-2" />
               <div className="flex flex-col items-center justify-center space-y-2">
                 <span className="text-4xl lg:text-5xl font-black text-primary">5+</span>
                 <span className="text-sm font-medium tracking-widest text-muted-foreground uppercase">Tech Skills</span>
               </div>
               <div className="hidden md:block w-px bg-border my-2" />
               <div className="flex flex-col items-center justify-center space-y-2">
                 <span className="text-4xl lg:text-5xl font-black text-primary">4th</span>
                 <span className="text-sm font-medium tracking-widest text-muted-foreground uppercase">semester.</span>
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
               
               <div className="relative rounded-2xl overflow-hidden border border-border/50 bg-background shadow-2xl z-10 aspect-[4/5] md:aspect-square">
                  <img src={displayPhoto} alt="About Me" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 scale-105 hover:scale-100" />
               </div>
             </motion.div>

           </div>
        </div>
      </section>
    </div>
  )
}
