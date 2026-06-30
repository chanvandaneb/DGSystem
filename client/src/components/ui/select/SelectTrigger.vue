<script setup lang="ts">
import { SelectTrigger, SelectIcon, SelectValue } from 'reka-ui'
import { ChevronDown } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

defineProps<{ class?: string; placeholder?: string }>()
</script>

<template>
  <SelectTrigger
    :class="cn(
      'flex h-8 items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring',
      $props.class,
    )"
  >
    <SelectValue :placeholder="placeholder" />
    <SelectIcon>
      <ChevronDown class="h-4 w-4 opacity-50" />
    </SelectIcon>
  </SelectTrigger>
</template>
