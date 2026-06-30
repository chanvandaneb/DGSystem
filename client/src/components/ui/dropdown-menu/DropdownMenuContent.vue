<script setup lang="ts">
import { DropdownMenuPortal, DropdownMenuContent } from 'reka-ui'
import { cn } from '@/lib/utils'

withDefaults(defineProps<{ class?: string; align?: 'start' | 'center' | 'end' }>(), {
  align: 'end',
})
</script>

<template>
  <DropdownMenuPortal>
    <DropdownMenuContent
      :align="align"
      :side-offset="4"
      :class="cn(
        'z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md',
        $props.class,
      )"
    >
      <slot />
    </DropdownMenuContent>
  </DropdownMenuPortal>
</template>
