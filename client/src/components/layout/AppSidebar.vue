<script setup lang="ts">
import { reactive } from 'vue'
import { useRoute } from 'vue-router'
import { ChevronDown } from 'lucide-vue-next'
import { navGroups, type NavItem } from './nav-items'
import { cn } from '@/lib/utils'
import { useThemeStore } from '@/stores/theme'
import { useSidebarStore } from '@/stores/sidebar'

const route = useRoute()
const theme = useThemeStore()
const sidebar = useSidebarStore()

const open = reactive<Record<string, boolean>>(
  Object.fromEntries(
    navGroups
      .flatMap((g) => g.items)
      .filter((item) => item.children)
      .map((item) => [item.label, item.children!.some((c) => c.to === route.path)]),
  ),
)

function isGroupActive(item: NavItem) {
  return item.children?.some((c) => c.to === route.path) ?? false
}

function onGroupClick(item: NavItem) {
  if (sidebar.collapsed) {
    sidebar.toggle()
    open[item.label] = true
    return
  }
  open[item.label] = !open[item.label]
}
</script>

<template>
  <aside
    :class="cn(
      'hidden md:flex shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-all duration-200',
      sidebar.collapsed ? 'w-16' : 'w-64',
    )"
  >
    <div :class="cn('flex h-14 items-center border-b border-sidebar-border', sidebar.collapsed ? 'justify-center px-2' : 'px-5')">
      <img
        v-if="!sidebar.collapsed"
        :src="theme.dark ? '/logo-light.png' : '/logo-dark.png'"
        alt="DGSystem"
        class="h-7 w-auto"
      />
      <div v-else class="flex h-7 w-7 items-center justify-center rounded-md bg-[#2563EB] text-xs font-bold text-white">D</div>
    </div>
    <nav class="flex-1 space-y-5 overflow-y-auto overflow-x-hidden p-3">
      <div v-for="group in navGroups" :key="group.label">
        <p v-if="!sidebar.collapsed" class="px-3 pb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground/70">
          {{ group.label }}
        </p>
        <div class="space-y-0.5">
          <template v-for="item in group.items" :key="item.label">
            <RouterLink
              v-if="item.to && !item.children"
              :to="item.to"
              custom
              v-slot="{ href, navigate, isActive }"
            >
              <a
                :href="href"
                :title="sidebar.collapsed ? item.label : undefined"
                @click="navigate"
                :class="cn(
                  'flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors',
                  sidebar.collapsed && 'justify-center px-0',
                  isActive
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                )"
              >
                <component :is="item.icon" class="h-4 w-4 shrink-0" />
                <span v-if="!sidebar.collapsed">{{ item.label }}</span>
              </a>
            </RouterLink>

            <div v-else>
              <button
                type="button"
                :title="sidebar.collapsed ? item.label : undefined"
                class="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors"
                :class="[
                  sidebar.collapsed && 'justify-center px-0',
                  isGroupActive(item)
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                ]"
                @click="onGroupClick(item)"
              >
                <component :is="item.icon" class="h-4 w-4 shrink-0" />
                <template v-if="!sidebar.collapsed">
                  <span class="flex-1 text-left">{{ item.label }}</span>
                  <ChevronDown :class="cn('h-3.5 w-3.5 transition-transform', open[item.label] && 'rotate-180')" />
                </template>
              </button>
              <div v-show="open[item.label] && !sidebar.collapsed" class="mt-0.5 space-y-0.5 pl-9">
                <RouterLink
                  v-for="child in item.children"
                  :key="child.to"
                  :to="child.to"
                  custom
                  v-slot="{ href, navigate, isActive }"
                >
                  <a
                    :href="href"
                    @click="navigate"
                    :class="cn(
                      'block rounded-lg px-3 py-1.5 text-sm transition-colors',
                      isActive
                        ? 'bg-sidebar-accent font-medium text-sidebar-accent-foreground'
                        : 'text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                    )"
                  >
                    {{ child.label }}
                  </a>
                </RouterLink>
              </div>
            </div>
          </template>
        </div>
      </div>
    </nav>
    <div v-if="!sidebar.collapsed" class="p-3 border-t border-sidebar-border text-xs text-muted-foreground">
      DGSystem &copy; {{ new Date().getFullYear() }}
    </div>
  </aside>
</template>
