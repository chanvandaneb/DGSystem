<script setup lang="ts">
import { Sun, Moon } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { useThemeStore } from '@/stores/theme'

const theme = useThemeStore()
</script>

<template>
  <Button variant="ghost" size="icon" @click="theme.toggle()">
    <Sun v-if="theme.dark" class="h-4 w-4" />
    <Moon v-else class="h-4 w-4" />
  </Button>
</template>
