<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Search, Timer, PanelLeft, ChevronRight } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { useSidebarStore } from '@/stores/sidebar'
import ThemeToggle from './ThemeToggle.vue'
import NotificationsMenu from './NotificationsMenu.vue'
import LanguageMenu from './LanguageMenu.vue'
import ProfileMenu from './ProfileMenu.vue'
import CommandPalette from './CommandPalette.vue'

const router = useRouter()
const route = useRoute()
const sidebar = useSidebarStore()

const breadcrumbs = computed(() => {
  const parts = route.path.split('/').filter(Boolean)
  if (!parts.length) return [{ label: 'Dashboard', path: '/' }]
  const crumbs = [{ label: 'Home', path: '/' }]
  let current = ''
  for (const part of parts) {
    current += `/${part}`
    const label = part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' ')
    crumbs.push({ label, path: current })
  }
  return crumbs
})
const paletteOpen = ref(false)

function onKeydown(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    paletteOpen.value = !paletteOpen.value
  }
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <header class="flex h-14 items-center gap-3 border-b border-border bg-white shadow-sm dark:bg-card px-4">
    <Button variant="ghost" size="icon" title="Toggle sidebar" @click="sidebar.toggle()">
      <PanelLeft class="h-4 w-4" />
    </Button>

    <!-- Breadcrumb -->
    <nav class="hidden items-center gap-1 text-sm md:flex">
      <template v-for="(crumb, i) in breadcrumbs" :key="crumb.path">
        <ChevronRight v-if="i > 0" class="h-3.5 w-3.5 text-muted-foreground/50" />
        <button
          type="button"
          :class="['transition-colors', i === breadcrumbs.length - 1 ? 'font-semibold text-foreground' : 'text-muted-foreground hover:text-foreground']"
          @click="router.push(crumb.path)"
        >
          {{ crumb.label }}
        </button>
      </template>
    </nav>

    <button
      type="button"
      class="flex w-full max-w-sm items-center gap-2 rounded-full border border-input bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent"
      @click="paletteOpen = true"
    >
      <Search class="h-4 w-4" />
      <span class="flex-1 text-left">Type to search...</span>
      <kbd class="pointer-events-none hidden select-none items-center gap-1 rounded border border-border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground sm:flex">
        &#8984;K
      </kbd>
    </button>

    <div class="flex flex-1 items-center justify-end gap-0.5">
      <Button variant="ghost" size="icon" title="Tracking" @click="router.push('/clock')">
        <Timer class="h-4 w-4" />
      </Button>
      <NotificationsMenu />
      <ThemeToggle />
      <LanguageMenu />
      <div class="mx-1 h-6 w-px bg-border" />
      <ProfileMenu />
    </div>

    <CommandPalette v-model:open="paletteOpen" />
  </header>
</template>
