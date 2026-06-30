<script setup lang="ts">
import { DialogPortal, DialogOverlay, DialogContent } from 'reka-ui'
import { cn } from '@/lib/utils'

defineProps<{ class?: string }>()
</script>

<template>
  <DialogPortal>
    <DialogOverlay class="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
    <DialogContent
      :class="cn(
        'fixed left-1/2 top-24 z-50 w-full max-w-lg -translate-x-1/2 rounded-xl border border-border bg-popover text-popover-foreground shadow-2xl focus:outline-none',
        $props.class,
      )"
    >
      <slot />
    </DialogContent>
  </DialogPortal>
</template>
