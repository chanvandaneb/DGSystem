<script setup lang="ts">
import { CheckCircle2, XCircle, Info, X } from 'lucide-vue-next'
import { toasts, useToast } from '@/composables/useToast'
import { cn } from '@/lib/utils'

const toast = useToast()

const icon = { success: CheckCircle2, error: XCircle, info: Info } as const
const tone = {
  success: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
  error: 'border-destructive/30 bg-destructive/10 text-destructive',
  info: 'border-border bg-popover text-popover-foreground',
} as const
</script>

<template>
  <div class="pointer-events-none fixed bottom-4 right-4 z-[100] flex w-80 flex-col gap-2">
    <TransitionGroup name="toast">
      <div
        v-for="t in toasts"
        :key="t.id"
        :class="cn('pointer-events-auto flex items-start gap-2 rounded-lg border px-3 py-2.5 text-sm shadow-lg', tone[t.variant])"
      >
        <component :is="icon[t.variant]" class="mt-0.5 h-4 w-4 shrink-0" />
        <p class="flex-1">{{ t.message }}</p>
        <button type="button" class="text-current/60 hover:text-current" @click="toast.dismiss(t.id)">
          <X class="h-3.5 w-3.5" />
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.2s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(8px);
}
</style>
