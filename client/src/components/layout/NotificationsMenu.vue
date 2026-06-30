<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Bell, CheckCheck } from 'lucide-vue-next'
import { api } from '@/lib/api'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'

interface Notification {
  id: string
  title: string
  body: string
  time: string
  read: boolean
}

const notifications = ref<Notification[]>([])
const unreadCount = computed(() => notifications.value.filter((n) => !n.read).length)

async function markAllRead() {
  notifications.value = notifications.value.map((n) => ({ ...n, read: true }))
  await api.post('/notifications/mark-all-read')
}

async function toggleRead(n: Notification) {
  const next = !n.read
  notifications.value = notifications.value.map((x) => (x.id === n.id ? { ...x, read: next } : x))
  await api.put(`/notifications/${n.id}/read`, { read: next })
}

onMounted(async () => {
  notifications.value = await api.get<Notification[]>('/notifications')
})
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <Button variant="ghost" size="icon" class="relative">
        <Bell class="h-4 w-4" />
        <span
          v-if="unreadCount"
          class="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white"
        >
          {{ unreadCount }}
        </span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-80 p-0">
      <div class="flex items-center justify-between px-3 py-2.5">
        <DropdownMenuLabel class="p-0">Notifications</DropdownMenuLabel>
        <button type="button" class="flex items-center gap-1 text-xs text-[#2563EB] hover:underline" @click="markAllRead">
          <CheckCheck class="h-3.5 w-3.5" />
          Mark all read
        </button>
      </div>
      <DropdownMenuSeparator class="my-0" />
      <div class="max-h-80 overflow-y-auto p-1">
        <button
          v-for="n in notifications"
          :key="n.id"
          type="button"
          class="flex w-full items-start gap-2 rounded-sm px-2 py-2 text-left text-sm hover:bg-accent"
          :class="!n.read && 'bg-accent/40'"
          :title="n.read ? 'Mark as unread' : 'Mark as read'"
          @click="toggleRead(n)"
        >
          <span :class="['mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full', n.read ? 'bg-transparent' : 'bg-[#2563EB]']" />
          <div class="min-w-0">
            <p class="truncate font-medium">{{ n.title }}</p>
            <p class="truncate text-xs text-muted-foreground">{{ n.body }}</p>
            <p class="text-[11px] text-muted-foreground">{{ n.time }}</p>
          </div>
        </button>
        <p v-if="!notifications.length" class="px-2 py-6 text-center text-sm text-muted-foreground">No notifications</p>
      </div>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
