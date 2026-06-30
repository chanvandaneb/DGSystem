<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Pin } from 'lucide-vue-next'
import { api } from '@/lib/api'
import PageHeader from '@/components/layout/PageHeader.vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { announcementTypeMeta, relativeTime, type AnnouncementType } from '@/lib/announcements'

interface Announcement {
  id: string
  title: string
  body: string
  author: string
  date: string
  type: AnnouncementType
  pinned?: boolean
}

const announcements = ref<Announcement[]>([])

onMounted(async () => {
  announcements.value = await api.get<Announcement[]>('/announcements')
})
</script>

<template>
  <PageHeader title="Announcements" description="Everything the team needs to know, in one place." />

  <div class="space-y-4">
    <Card v-for="a in announcements" :key="a.id">
      <CardHeader class="flex-row items-start justify-between space-y-0 pb-2">
        <div class="flex items-start gap-3">
          <div :class="['flex h-10 w-10 shrink-0 items-center justify-center rounded-full', announcementTypeMeta[a.type].iconWrapClass]">
            <component :is="announcementTypeMeta[a.type].icon" class="h-5 w-5" />
          </div>
          <div>
            <div class="flex items-center gap-1.5">
              <CardTitle class="text-base text-foreground">{{ a.title }}</CardTitle>
              <Pin v-if="a.pinned" class="h-3.5 w-3.5 text-muted-foreground" />
            </div>
            <p class="mt-0.5 text-xs text-muted-foreground">{{ a.author }} &middot; {{ relativeTime(a.date) }} &middot; {{ a.date }}</p>
          </div>
        </div>
        <Badge :class="announcementTypeMeta[a.type].badgeClass" class="shrink-0 border-transparent">
          {{ announcementTypeMeta[a.type].label }}
        </Badge>
      </CardHeader>
      <CardContent>
        <p class="text-sm text-muted-foreground">{{ a.body }}</p>
      </CardContent>
    </Card>
    <p v-if="!announcements.length" class="text-sm text-muted-foreground">No announcements</p>
  </div>
</template>
