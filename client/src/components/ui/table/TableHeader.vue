<script setup lang="ts">
import { cn } from '@/lib/utils'
defineProps<{ class?: string }>()
</script>

<template>
  <thead :class="cn('[&_tr]:border-b border-border', $props.class)">
    <slot />
  </thead>
</template>
