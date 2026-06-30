import { defineStore } from 'pinia'

export const useSidebarStore = defineStore('sidebar', {
  state: () => ({
    collapsed: localStorage.getItem('dg-sidebar-collapsed') === 'true',
  }),
  actions: {
    toggle() {
      this.collapsed = !this.collapsed
      localStorage.setItem('dg-sidebar-collapsed', String(this.collapsed))
    },
  },
})
