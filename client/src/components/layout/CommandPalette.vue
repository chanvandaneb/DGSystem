<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { VisuallyHidden, DialogTitle } from 'reka-ui'
import {
  Search,
  LayoutDashboard,
  Clock,
  Target,
  ListChecks,
  Users,
  BookOpen,
  Bookmark,
  UserCircle,
  Timer,
} from 'lucide-vue-next'
import { Dialog, DialogContent } from '@/components/ui/dialog'

const open = defineModel<boolean>('open', { default: false })
const router = useRouter()
const query = ref('')
const inputRef = ref<HTMLInputElement | null>(null)

interface Suggestion {
  label: string
  group: string
  to: string
  icon: typeof LayoutDashboard
}

const suggestions: Suggestion[] = [
  { label: 'Dashboard', group: 'Overview', to: '/', icon: LayoutDashboard },
  { label: 'Attendances', group: 'Workforce', to: '/attendance', icon: Clock },
  { label: 'KPI', group: 'Workforce', to: '/kpi', icon: Target },
  { label: 'Tasks', group: 'Workforce', to: '/tasks', icon: ListChecks },
  { label: 'Accounts', group: 'Workforce', to: '/accounts', icon: Users },
  { label: 'Knowledge', group: 'Resources', to: '/knowledge', icon: BookOpen },
  { label: 'Bookmarks', group: 'Resources', to: '/bookmarks', icon: Bookmark },
  { label: 'Attendance System', group: 'Tools', to: '/clock', icon: Timer },
  { label: 'Profile', group: 'Account', to: '/profile', icon: UserCircle },
]

const filtered = computed(() => {
  if (!query.value.trim()) return suggestions
  const q = query.value.toLowerCase()
  return suggestions.filter((s) => s.label.toLowerCase().includes(q) || s.group.toLowerCase().includes(q))
})

function select(s: Suggestion) {
  router.push(s.to)
  open.value = false
}

watch(open, (isOpen) => {
  if (isOpen) {
    query.value = ''
    nextTick(() => inputRef.value?.focus())
  }
})
</script>

<template>
  <Dialog v-model:open="open">
    <DialogContent class="overflow-hidden p-0">
      <VisuallyHidden as-child>
        <DialogTitle>Search</DialogTitle>
      </VisuallyHidden>
      <div class="flex items-center gap-2 border-b border-border px-4 py-3">
        <Search class="h-4 w-4 text-muted-foreground" />
        <input
          ref="inputRef"
          v-model="query"
          type="text"
          placeholder="Type a command or search..."
          class="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>
      <div class="max-h-80 overflow-y-auto p-2">
        <p class="px-2 pb-1 pt-1 text-xs font-medium text-muted-foreground">Suggestions</p>
        <button
          v-for="s in filtered"
          :key="s.to"
          type="button"
          class="flex w-full items-center gap-3 rounded-md px-2 py-2 text-left text-sm transition-colors hover:bg-accent"
          @click="select(s)"
        >
          <component :is="s.icon" class="h-4 w-4 text-muted-foreground" />
          {{ s.label }}
        </button>
        <p v-if="!filtered.length" class="px-2 py-6 text-center text-sm text-muted-foreground">No results found</p>
      </div>
    </DialogContent>
  </Dialog>
</template>
