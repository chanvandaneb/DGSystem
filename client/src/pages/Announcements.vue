<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { api } from '@/lib/api'
import PageHeader from '@/components/layout/PageHeader.vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

interface Announcement {
  id: string
  title: string
  body: string
  author: string
  date: string
}

const announcements = ref<Announcement[]>([])

onMounted(async () => {
  announcements.value = await api.get<Announcement[]>('/announcements')
})
</script>

<template>
  <PageHeader title="Announcements" />

  <div class="space-y-4">
    <Card v-for="a in announcements" :key="a.id">
      <CardHeader class="pb-2">
        <CardTitle class="text-base text-foreground">{{ a.title }}</CardTitle>
      </CardHeader>
      <CardContent>
        <p class="text-sm text-muted-foreground">{{ a.body }}</p>
        <p class="text-xs text-muted-foreground mt-2">{{ a.author }} &middot; {{ a.date }}</p>
      </CardContent>
    </Card>
    <p v-if="!announcements.length" class="text-sm text-muted-foreground">No announcements</p>
  </div>
</template>
