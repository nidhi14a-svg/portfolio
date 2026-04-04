import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Mail, MapPin, Link as LinkIcon, Share2, Send } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { ApiServices } from '../api/api'
import emailjs from '@emailjs/browser'

interface ContactFormInputs {
  name: string
  email: string
  message: string
}

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [settings, setSettings] = useState<Record<string, string>>({})
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormInputs>()

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await ApiServices.getPortfolioData()
        setSettings(res.data.settings || {})
      } catch (e) { console.error(e) }
    }
    fetchSettings()
  }, [])

  const onSubmit = async (data: ContactFormInputs) => {
    setStatus('loading')
    try {
      // Send email directly using EmailJS
      await emailjs.send(
        // 1. Paste your Service ID here (Starts with 'service_')
        'YOUR_SERVICE_ID',      
        
        // 2. Paste your Template ID here (Starts with 'template_')
        'YOUR_TEMPLATE_ID',     
        
        {
          user_name: data.name,
          user_email: data.email,
          message: data.message,
        },
        
        // 3. Paste your Public Key here (Found in EmailJS Account Settings)
        'YOUR_PUBLIC_KEY'       
      )
      
      setStatus('success')
      reset()
    } catch (err) {
      console.error("Failed to send message:", err)
      setStatus('error')
    }
  }

  return (
    <div className="pt-32 pb-24 min-h-screen container mx-auto px-6 lg:px-12">
      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Let's Connect</h1>
        <p className="text-muted-foreground text-lg max-w-xl text-balance">
          {settings.contact_message || "I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!"}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="space-y-8 mb-12">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-4 rounded-lg text-primary shrink-0">
                 <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Email</h3>
                <p className="text-muted-foreground">{settings.contact_email || 'nidhi14a@gmail.com'}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-4 rounded-lg text-primary shrink-0">
                 <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Phone</h3>
                <p className="text-muted-foreground">{settings.contact_phone || '9431681109'}</p>
              </div>
            </div>
          </div>

          <div>
             <h3 className="text-xl font-bold mb-6">Socials</h3>
             <div className="flex gap-4">
                  <a href={settings.social_github || 'https://github.com/nidhi14a-svg'} target="_blank" rel="noopener noreferrer" className="p-3 bg-muted hover:bg-primary/20 hover:text-primary transition-colors rounded-full border border-border" title="GitHub">
                    <LinkIcon className="w-5 h-5" />
                  </a>
                  <a href={settings.social_linkedin || 'https://www.linkedin.com/in/nidhi-singh-807587386?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'} target="_blank" rel="noopener noreferrer" className="p-3 bg-muted hover:bg-primary/20 hover:text-primary transition-colors rounded-full border border-border" title="LinkedIn">
                    <Share2 className="w-5 h-5" />
                  </a>
             </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-card p-8 rounded-2xl border border-border/60 shadow-lg"
        >
          {status === 'success' ? (
             <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6">
                   <Send className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Message sent successfully ✅</h3>
                <p className="text-muted-foreground mb-8">Thank you for reaching out. I will get back to you shortly.</p>
                <Button onClick={() => setStatus('idle')} variant="outline">
                   Send Another Message
                </Button>
             </div>
          ) : (
             <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                 <label htmlFor="name" className="block text-sm font-medium mb-2 text-foreground">Name</label>
                 <input 
                   {...register('name', { required: 'Name is required' })}
                   className={`w-full bg-background border ${errors.name ? 'border-red-500' : 'border-border'} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all`}
                   placeholder="John Doe"
                 />
                 {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>
              
              <div>
                 <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground">Email</label>
                 <input 
                   type="email"
                   {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
                   className={`w-full bg-background border ${errors.email ? 'border-red-500' : 'border-border'} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all`}
                   placeholder="john@example.com"
                 />
                 {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>

              <div>
                 <label htmlFor="message" className="block text-sm font-medium mb-2 text-foreground">Message</label>
                 <textarea 
                   {...register('message', { required: 'Message is required' })}
                   className={`w-full bg-background border ${errors.message ? 'border-red-500' : 'border-border'} rounded-lg px-4 py-3 min-h-[150px] resize-y focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all`}
                   placeholder="I'd love to talk about..."
                 />
                 {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
              </div>

              {status === 'error' && (
                 <p className="text-red-500 text-sm text-center">Failed to send message. Please try again later.</p>
              )}

              <Button type="submit" className="w-full gap-2 py-6 text-lg" disabled={status === 'loading'}>
                {status === 'loading' ? (
                  <span className="animate-spin border-t-2 border-b-2 border-primary-foreground rounded-full w-5 h-5 inline-block"></span>
                ) : (
                  <>Send Message <Send className="w-5 h-5" /></>
                )}
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  )
}
