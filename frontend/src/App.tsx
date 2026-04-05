import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useThemeStore } from './store/themeStore'

import { Navbar } from './components/layout/Navbar'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'

function App() {
  const { theme } = useThemeStore()

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
  }, [theme])

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col items-stretch selection:bg-primary/30">
        <Navbar />
        <main className="flex-grow flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        
        {/* Footer */}
        <footer className="w-full py-8 border-t border-border mt-auto bg-background/50">
          <div className="container mx-auto px-6 text-center text-muted-foreground text-sm flex flex-col md:flex-row justify-between items-center gap-4">
            <p>© {new Date().getFullYear()} Developer Portfolio. All rights reserved.</p>
            <p>Designed with ❤️ using React & Tailwind</p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App
