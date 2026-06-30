import { defineStore } from 'pinia'

export interface AuthUser {
  id: string
  username: string
  name: string
  role: 'admin' | 'employee'
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('dg-auth-token') as string | null,
    user: JSON.parse(localStorage.getItem('dg-auth-user') ?? 'null') as AuthUser | null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.user?.role === 'admin',
  },
  actions: {
    setSession(token: string, user: AuthUser) {
      this.token = token
      this.user = user
      localStorage.setItem('dg-auth-token', token)
      localStorage.setItem('dg-auth-user', JSON.stringify(user))
    },
    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('dg-auth-token')
      localStorage.removeItem('dg-auth-user')
    },
  },
})
