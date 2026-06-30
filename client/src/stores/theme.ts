import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    dark: localStorage.getItem('dg-theme') !== 'light',
  }),
  actions: {
    apply() {
      document.documentElement.classList.toggle('dark', this.dark)
      localStorage.setItem('dg-theme', this.dark ? 'dark' : 'light')
    },
    toggle() {
      this.dark = !this.dark
      this.apply()
    },
    init() {
      this.apply()
    },
  },
})
