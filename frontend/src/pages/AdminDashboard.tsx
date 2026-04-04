import { useState, useEffect } from 'react'
import { Plus, Trash2, Settings, MessageSquare, Briefcase, FileImage, UserCog } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { ApiServices } from '../api/api'
import { useAuthStore } from '../store/authStore'

export default function AdminDashboard() {
  const { logout } = useAuthStore()
  const [activeTab, setActiveTab] = useState<'projects' | 'skills' | 'messages' | 'media' | 'settings'>('projects')
  
  // Data States
  const [projects, setProjects] = useState<any[]>([])
  const [skills, setSkills] = useState<any[]>([])
  const [messages, setMessages] = useState<any[]>([])
  const [media, setMedia] = useState<any[]>([])
  const [settingsData, setSettingsData] = useState<any>({ name: '', bio: '', tagline: '' })

  // Form States
  const [newProject, setNewProject] = useState({ title: '', description: '', tech_stack: '', image_url: '', github_url: '', live_url: '', is_featured: false })
  const [newSkill, setNewSkill] = useState({ name: '', category: 'Frontend', proficiency: 50, icon_url: '' })
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [uploadType, setUploadType] = useState('gallery')
  const [uploadAlt, setUploadAlt] = useState('')

  const fetchData = async () => {
    try {
      const [projRes, skillRes, msgRes, medRes, portRes] = await Promise.all([
        ApiServices.getProjects(),
        ApiServices.getSkills(),
        ApiServices.getMessages(),
        ApiServices.getGallery(),
        ApiServices.getPortfolioData()
      ])
      setProjects(projRes.data)
      setSkills(skillRes.data)
      setMessages(msgRes.data)
      setMedia(medRes.data)
      setSettingsData(portRes.data.settings || { name: '', bio: '', tagline: '' })
    } catch (err) {
      console.error("Failed to fetch admin data", err)
    }
  }

  // Load Initial Data
  useEffect(() => {
    fetchData()
  }, [])

  // --- PROJECT CRUD ---
  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await ApiServices.addProject(newProject)
      fetchData()
      setNewProject({ title: '', description: '', tech_stack: '', image_url: '', github_url: '', live_url: '', is_featured: false })
    } catch { alert('Failed to add project') }
  }

  const handleDeleteProject = async (id: number) => {
    if(!confirm("Delete this project?")) return
    try {
      await ApiServices.deleteProject(id)
      fetchData()
    } catch { alert("Failed to delete") }
  }

  // --- SKILL CRUD ---
  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await ApiServices.addSkill(newSkill)
      fetchData()
      setNewSkill({ name: '', category: 'Frontend', proficiency: 50, icon_url: '' })
    } catch { alert('Failed to add skill') }
  }

  const handleDeleteSkill = async (id: number) => {
    if(!confirm("Delete this skill?")) return
    try {
      await ApiServices.deleteSkill(id)
      fetchData()
    } catch { alert("Failed to delete") }
  }

  // --- MEDIA / FILE UPLOAD CRUD ---
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if(!uploadFile) return
    const formData = new FormData()
    formData.append('file', uploadFile)
    formData.append('type', uploadType)
    formData.append('alt_text', uploadAlt)
    
    try {
      await ApiServices.uploadMedia(formData)
      fetchData()
      setUploadFile(null)
      setUploadAlt('')
      alert('File uploaded successfully!')
    } catch { alert('Failed to upload file') }
  }

  const handleDeleteMedia = async (id: number) => {
    if(!confirm("Delete this file?")) return
    try {
      await ApiServices.deleteMedia(id)
      fetchData()
    } catch { alert("Failed to delete media") }
  }

  // --- SETTINGS CRUD ---
  const handleUpdateSettings = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await ApiServices.updateSettings(settingsData)
      alert("Settings updated!")
    } catch { alert("Failed to update settings") }
  }

  // --- MESSAGES CRUD ---
  const handleDeleteMessage = async (id: number) => {
    if(!confirm("Delete this message?")) return
    try {
      await ApiServices.deleteMessage(id)
      fetchData()
    } catch { alert("Failed to delete message") }
  }

  return (
    <div className="pt-32 pb-24 min-h-screen container mx-auto px-6 max-w-7xl">
      <div className="flex items-center justify-between mb-12 border-b border-border pb-6">
        <h1 className="text-3xl font-bold tracking-tight">CMS Dashboard</h1>
        <Button variant="outline" onClick={logout}>Logout Admin</Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Nav */}
        <div className="w-full lg:w-64 space-y-2 shrink-0">
          <button onClick={() => setActiveTab('projects')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'projects' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}>
            <Briefcase className="w-5 h-5" /> Projects
          </button>
          <button onClick={() => setActiveTab('skills')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'skills' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}>
            <UserCog className="w-5 h-5" /> Skills
          </button>
          <button onClick={() => setActiveTab('media')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'media' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}>
            <FileImage className="w-5 h-5" /> Media & Files
          </button>
          <button onClick={() => setActiveTab('messages')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'messages' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}>
            <MessageSquare className="w-5 h-5" /> Messages
          </button>
          <button onClick={() => setActiveTab('settings')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'settings' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}>
            <Settings className="w-5 h-5" /> Global Settings
          </button>
        </div>

        {/* Dynamic Content Panels */}
        <div className="flex-1 bg-card border border-border rounded-xl p-6 lg:p-8 min-h-[600px] shadow-sm">
          
          {/* --- PROJECTS --- */}
          {activeTab === 'projects' && (
            <div>
               <h2 className="text-2xl font-bold mb-6">Manage Projects</h2>
               <form onSubmit={handleAddProject} className="bg-muted/30 p-6 rounded-lg border border-border mb-8 space-y-4">
                  <h3 className="text-xl font-bold border-b border-border pb-2 mb-4">Add New Project</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder="Title" required value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} className="bg-background border border-border rounded-md px-3 py-2" />
                    <input type="text" placeholder="Tech Stack (CSV)" value={newProject.tech_stack} onChange={e => setNewProject({...newProject, tech_stack: e.target.value})} className="bg-background border border-border rounded-md px-3 py-2" />
                    <input type="text" placeholder="Image URL / Path" value={newProject.image_url} onChange={e => setNewProject({...newProject, image_url: e.target.value})} className="bg-background border border-border rounded-md px-3 py-2" />
                    <input type="text" placeholder="GitHub URL" value={newProject.github_url} onChange={e => setNewProject({...newProject, github_url: e.target.value})} className="bg-background border border-border rounded-md px-3 py-2" />
                    <input type="text" placeholder="Live Demo URL" value={newProject.live_url} onChange={e => setNewProject({...newProject, live_url: e.target.value})} className="bg-background border border-border rounded-md px-3 py-2 md:col-span-2" />
                  </div>
                  <textarea placeholder="Description" required value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} className="bg-background border border-border rounded-md px-3 py-2 w-full min-h-[80px]" />
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="featured" checked={newProject.is_featured} onChange={e => setNewProject({...newProject, is_featured: e.target.checked})} />
                    <label htmlFor="featured">Feature on Home Page</label>
                  </div>
                  <Button type="submit" className="mt-2"><Plus className="w-4 h-4 mr-2" /> Save Project</Button>
               </form>
               <div className="space-y-3">
                  {projects.map(p => (
                    <div key={p.id} className="flex justify-between p-4 bg-background border border-border rounded-lg items-center group">
                      <div>
                        <p className="font-bold flex items-center gap-2">{p.title} {p.is_featured && <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full uppercase">Featured</span>}</p>
                        <p className="text-sm text-muted-foreground truncate max-w-md">{p.description}</p>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteProject(p.id)} className="text-red-500 hover:bg-red-500/10"><Trash2 className="w-5 h-5"/></Button>
                    </div>
                  ))}
               </div>
            </div>
          )}

          {/* --- SKILLS --- */}
          {activeTab === 'skills' && (
            <div>
               <h2 className="text-2xl font-bold mb-6">Manage Skills</h2>
               <form onSubmit={handleAddSkill} className="bg-muted/30 p-6 rounded-lg border border-border mb-8 space-y-4">
                  <h3 className="text-xl font-bold border-b border-border pb-2 mb-4">Add New Skill</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <input type="text" placeholder="Skill Name (e.g., React)" required value={newSkill.name} onChange={e => setNewSkill({...newSkill, name: e.target.value})} className="bg-background border border-border rounded-md px-3 py-2 w-full" />
                    <select value={newSkill.category} onChange={e => setNewSkill({...newSkill, category: e.target.value})} className="bg-background border border-border rounded-md px-3 py-2 w-full">
                       <option>Frontend</option>
                       <option>Backend</option>
                       <option>Tools</option>
                       <option>Other</option>
                    </select>
                    <div className="flex items-center gap-3">
                       <label className="text-sm text-muted-foreground whitespace-nowrap">Proficiency ({newSkill.proficiency}%)</label>
                       <input type="range" min="1" max="100" value={newSkill.proficiency} onChange={e => setNewSkill({...newSkill, proficiency: parseInt(e.target.value)})} className="w-full accent-primary" />
                    </div>
                  </div>
                  <Button type="submit"><Plus className="w-4 h-4 mr-2" /> Add Skill</Button>
               </form>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {skills.map(s => (
                    <div key={s.id} className="flex justify-between p-4 bg-background border border-border rounded-lg items-center">
                      <div>
                        <p className="font-bold">{s.name}</p>
                        <p className="text-xs text-muted-foreground">{s.category} • {s.proficiency}%</p>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteSkill(s.id)} className="text-red-500 hover:bg-red-500/10"><Trash2 className="w-4 h-4"/></Button>
                    </div>
                  ))}
               </div>
            </div>
          )}

          {/* --- MEDIA --- */}
          {activeTab === 'media' && (
            <div>
               <h2 className="text-2xl font-bold mb-6">Media Library & Files</h2>
               <form onSubmit={handleUpload} className="bg-muted/30 p-6 rounded-lg border border-border mb-8 space-y-4">
                  <h3 className="text-xl font-bold border-b border-border pb-2 mb-4">Upload File</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="file" required onChange={e => setUploadFile(e.target.files?.[0] || null)} className="bg-background border border-border rounded-md px-3 py-2 w-full text-sm file:mr-4 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-primary/20 file:text-primary" />
                    <select value={uploadType} onChange={e => setUploadType(e.target.value)} className="bg-background border border-border rounded-md px-3 py-2 w-full">
                       <option value="gallery">Gallery Image</option>
                       <option value="resume">Resume / CV</option>
                    </select>
                    <input type="text" placeholder="Alt Text (optional)" value={uploadAlt} onChange={e => setUploadAlt(e.target.value)} className="bg-background border border-border rounded-md px-3 py-2 w-full md:col-span-2" />
                  </div>
                  <Button type="submit">Upload <FileImage className="w-4 h-4 ml-2" /></Button>
               </form>
               <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {media.map(m => (
                    <div key={m.id} className="relative rounded-lg overflow-hidden border border-border group bg-background aspect-square flex flex-col items-center justify-center">
                      {m.type === 'resume' ? (
                         <div className="p-4 flex flex-col items-center text-center">
                           <FileImage className="w-12 h-12 text-blue-500 mb-2" />
                           <span className="text-xs font-mono break-all">{m.url.split('/').pop()}</span>
                         </div>
                      ) : (
                         <img src={m.url} alt={m.alt_text} className="w-full h-full object-cover" />
                      )}
                      
                      <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                         <Button variant="outline" size="icon" onClick={() => handleDeleteMedia(m.id)} className="text-red-500 border-red-500/50 hover:bg-red-500/20">
                           <Trash2 className="w-5 h-5"/>
                         </Button>
                      </div>
                      <span className="absolute bottom-2 left-2 text-[10px] bg-black/60 text-white px-2 py-1 rounded-md">{m.type}</span>
                    </div>
                  ))}
               </div>
            </div>
          )}

          {/* --- MESSAGES --- */}
          {activeTab === 'messages' && (
            <div>
               <h2 className="text-2xl font-bold mb-6">Contact Submissions</h2>
               {messages.length === 0 ? <p className="text-muted-foreground p-8 text-center border border-dashed rounded-lg">Inbox is empty.</p> : (
                 <div className="space-y-4">
                   {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                   {messages.map((m: any) => (
                     <div key={m.id} className="p-6 bg-background border border-border rounded-lg relative group">
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteMessage(m.id)} className="absolute top-4 right-4 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        <div className="flex flex-col mb-4">
                          <p className="font-bold text-lg">{m.name}</p>
                          <a href={`mailto:${m.email}`} className="text-sm text-primary hover:underline">{m.email}</a>
                          <span className="text-xs text-muted-foreground mt-1">{new Date(m.created_at).toLocaleString()}</span>
                        </div>
                        <div className="p-4 bg-muted/40 rounded-md text-sm whitespace-pre-wrap border border-border/50">
                           {m.message}
                        </div>
                     </div>
                   ))}
                 </div>
               )}
            </div>
          )}

          {/* --- SETTINGS --- */}
          {activeTab === 'settings' && (
            <div>
               <h2 className="text-2xl font-bold mb-6">Global Portfolio Settings</h2>
               <form onSubmit={handleUpdateSettings} className="bg-background p-6 rounded-lg border border-border max-w-2xl space-y-6">
                 <div>
                   <label className="block text-sm font-medium mb-2 text-foreground">Your Full Name</label>
                   <input type="text" value={settingsData.name || ''} onChange={e => setSettingsData({...settingsData, name: e.target.value})} className="w-full bg-muted/30 border border-border rounded-md px-4 py-3" placeholder="John Doe" />
                 </div>
                 <div>
                   <label className="block text-sm font-medium mb-2 text-foreground">Profile Photo URL</label>
                   <input type="text" value={settingsData.profile_photo_url || ''} onChange={e => setSettingsData({...settingsData, profile_photo_url: e.target.value})} className="w-full bg-muted/30 border border-border rounded-md px-4 py-3" placeholder="https://example.com/me.jpg or /api/public/uploads/profile.jpg" />
                 </div>
                 <div>
                   <label className="block text-sm font-medium mb-2 text-foreground">Tagline</label>
                   <input type="text" value={settingsData.tagline || ''} onChange={e => setSettingsData({...settingsData, tagline: e.target.value})} className="w-full bg-muted/30 border border-border rounded-md px-4 py-3" placeholder="Full Stack Developer" />
                 </div>
                 <div>
                   <label className="block text-sm font-medium mb-2 text-foreground">Bio (Used in Home Page)</label>
                   <textarea value={settingsData.bio || ''} onChange={e => setSettingsData({...settingsData, bio: e.target.value})} className="w-full bg-muted/30 border border-border rounded-md px-4 py-3 min-h-[150px]" placeholder="I am an experienced developer..." />
                 </div>

                 <h3 className="text-xl font-bold mt-8 mb-4 border-b border-border pb-2">Contact Info & Socials</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div>
                     <label className="block text-sm font-medium mb-2 text-foreground">Public Reply Email</label>
                     <input type="email" value={settingsData.contact_email || ''} onChange={e => setSettingsData({...settingsData, contact_email: e.target.value})} className="w-full bg-muted/30 border border-border rounded-md px-4 py-3" placeholder="hello@example.com" />
                   </div>
                   <div>
                     <label className="block text-sm font-medium mb-2 text-foreground">Location</label>
                     <input type="text" value={settingsData.contact_location || ''} onChange={e => setSettingsData({...settingsData, contact_location: e.target.value})} className="w-full bg-muted/30 border border-border rounded-md px-4 py-3" placeholder="San Francisco, CA" />
                   </div>
                   <div>
                     <label className="block text-sm font-medium mb-2 text-foreground">GitHub URL</label>
                     <input type="text" value={settingsData.social_github || ''} onChange={e => setSettingsData({...settingsData, social_github: e.target.value})} className="w-full bg-muted/30 border border-border rounded-md px-4 py-3" placeholder="https://github.com/..." />
                   </div>
                   <div>
                     <label className="block text-sm font-medium mb-2 text-foreground">LinkedIn URL</label>
                     <input type="text" value={settingsData.social_linkedin || ''} onChange={e => setSettingsData({...settingsData, social_linkedin: e.target.value})} className="w-full bg-muted/30 border border-border rounded-md px-4 py-3" placeholder="https://linkedin.com/in/..." />
                   </div>
                   <div>
                     <label className="block text-sm font-medium mb-2 text-foreground">Twitter / X URL</label>
                     <input type="text" value={settingsData.social_twitter || ''} onChange={e => setSettingsData({...settingsData, social_twitter: e.target.value})} className="w-full bg-muted/30 border border-border rounded-md px-4 py-3" placeholder="https://twitter.com/..." />
                   </div>
                 </div>
                 
                 <Button type="submit" className="w-full sm:w-auto h-12 px-8 mt-6">Save Settings</Button>
               </form>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
