<script setup lang="ts">
import { cn } from '@/lib/utils'
defineProps<{ class?: string }>()
</script>

<template>
  <span :class="cn('relative flex h-9 w-9 shrink-0 overflow-hidden rounded-full bg-muted items-center justify-center text-xs font-medium', $props.class)">
    <slot />
  </span>
</template>
