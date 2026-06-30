import { reactive } from 'vue'

export interface Toast {
  id: number
  message: string
  variant: 'success' | 'error' | 'info'
}

let nextId = 1
export const toasts = reactive<Toast[]>([])

function push(message: string, variant: Toast['variant']) {
  const id = nextId++
  toasts.push({ id, message, variant })
  setTimeout(() => {
    const i = toasts.findIndex((t) => t.id === id)
    if (i !== -1) toasts.splice(i, 1)
  }, 4000)
}

export function useToast() {
  return {
    success: (message: string) => push(message, 'success'),
    error: (message: string) => push(message, 'error'),
    info: (message: string) => push(message, 'info'),
    dismiss: (id: number) => {
      const i = toasts.findIndex((t) => t.id === id)
      if (i !== -1) toasts.splice(i, 1)
    },
  }
}
