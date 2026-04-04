import { create } from 'zustand'

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const getToken = () => typeof window !== 'undefined' ? localStorage.getItem('token') : null;

export const useAuthStore = create<AuthState>((set) => ({
  token: getToken(),
  isAuthenticated: !!getToken(),
  login: (token: string) => {
    if (typeof window !== 'undefined') localStorage.setItem('token', token)
    set({ token, isAuthenticated: true })
  },
  logout: () => {
    if (typeof window !== 'undefined') localStorage.removeItem('token')
    set({ token: null, isAuthenticated: false })
  }
}))
