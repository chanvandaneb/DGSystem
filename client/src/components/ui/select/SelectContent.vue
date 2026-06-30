<script setup lang="ts">
import { SelectPortal, SelectContent, SelectViewport } from 'reka-ui'
import { cn } from '@/lib/utils'

defineProps<{ class?: string }>()
</script>

<template>
  <SelectPortal>
    <SelectContent
      :class="cn(
        'relative z-50 min-w-[6rem] overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-md',
        $props.class,
      )"
      position="popper"
      :side-offset="4"
    >
      <SelectViewport class="p-1">
        <slot />
      </SelectViewport>
    </SelectContent>
  </SelectPortal>
</template>
