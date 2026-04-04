import axios from 'axios'

// Determine API base URL dynamically or use environment variable
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const api = axios.create({
  baseURL: API_BASE_URL,
})

// Add a request interceptor to attach JWT token to admin requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token && config.url?.startsWith('/admin')) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export const ApiServices = {
  // Public
  getPortfolioData: () => api.get('/public/portfolio'),
  getProjects: () => api.get('/public/projects'),
  getProject: (id: number) => api.get(`/public/projects/${id}`),
  getGallery: () => api.get('/public/gallery'),
  getSkills: () => api.get('/public/skills'),
  submitContact: (data: {name: string, email: string, message: string}) => api.post('/public/contact', data),
  
  // Auth
  login: (data: any) => api.post('/auth/login', data),
  // Admin
  addProject: (data: any) => api.post('/admin/projects', data),
  updateProject: (id: number, data: any) => api.put(`/admin/projects/${id}`, data),
  deleteProject: (id: number) => api.delete(`/admin/projects/${id}`),
  addSkill: (data: any) => api.post('/admin/skills', data),
  deleteSkill: (id: number) => api.delete(`/admin/skills/${id}`),
  updateSettings: (data: any) => api.put('/admin/settings', data),
  getMessages: () => api.get('/admin/messages'),
  deleteMessage: (id: number) => api.delete(`/admin/messages/${id}`),
  uploadMedia: (formData: FormData) => api.post('/admin/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  deleteMedia: (id: number) => api.delete(`/admin/media/${id}`),
}
