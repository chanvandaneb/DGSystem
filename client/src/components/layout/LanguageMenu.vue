<script setup lang="ts">
import { ref } from 'vue'
import { Languages, Check } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'

const languages = [
  { code: 'en', label: 'English' },
  { code: 'km', label: 'Khmer' },
  { code: 'vi', label: 'Vietnamese' },
]

const current = ref('en')
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <Button variant="ghost" size="icon">
        <Languages class="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-40">
      <DropdownMenuItem v-for="lang in languages" :key="lang.code" @click="current = lang.code">
        <Check :class="['h-3.5 w-3.5', current !== lang.code && 'opacity-0']" />
        {{ lang.label }}
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
