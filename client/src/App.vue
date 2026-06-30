<script setup lang="ts">
import { onMounted } from 'vue'
import { useThemeStore } from '@/stores/theme'
import Toaster from '@/components/layout/Toaster.vue'

const theme = useThemeStore()
onMounted(() => theme.init())
</script>

<template>
  <RouterView />
  <Toaster />
</template>
