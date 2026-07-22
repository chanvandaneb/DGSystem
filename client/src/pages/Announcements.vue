<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Pin, PinOff, Plus, Trash2 } from 'lucide-vue-next'
import { VisuallyHidden, DialogTitle } from 'reka-ui'
import { api } from '@/lib/api'
import { useAuthStore } from '@/stores/auth'
import { useToast } from '@/composables/useToast'
import PageHeader from '@/components/layout/PageHeader.vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent } from '@/components/ui/dialog'
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

const auth = useAuthStore()
const toast = useToast()
const announcements = ref<Announcement[]>([])

const createOpen = ref(false)
const saving = ref(false)
const form = ref({ title: '', body: '', type: 'general' as AnnouncementType, pinned: false })

const typeOptions = Object.entries(announcementTypeMeta) as [AnnouncementType, (typeof announcementTypeMeta)[AnnouncementType]][]

async function load() {
  announcements.value = await api.get<Announcement[]>('/announcements')
}

function openCreate() {
  form.value = { title: '', body: '', type: 'general', pinned: false }
  createOpen.value = true
}

async function submitCreate() {
  if (!form.value.title.trim()) {
    toast.error('Title is required')
    return
  }
  saving.value = true
  try {
    await api.post('/announcements', form.value)
    createOpen.value = false
    toast.success('Announcement published')
    await load()
  } catch (e) {
    toast.error(e instanceof Error ? e.message : 'Failed to publish')
  } finally {
    saving.value = false
  }
}

async function togglePin(a: Announcement) {
  try {
    await api.put(`/announcements/${a.id}/pin`, { pinned: !a.pinned })
    await load()
  } catch (e) {
    toast.error(e instanceof Error ? e.message : 'Failed to update pin')
  }
}

async function remove(a: Announcement) {
  if (!confirm(`Delete announcement "${a.title}"?`)) return
  try {
    await api.delete(`/announcements/${a.id}`)
    toast.success('Announcement deleted')
    await load()
  } catch (e) {
    toast.error(e instanceof Error ? e.message : 'Failed to delete')
  }
}

onMounted(load)
</script>

<template>
  <div class="flex items-start justify-between">
    <PageHeader title="Announcements" description="Everything the team needs to know, in one place." />
    <Button v-if="auth.isAdmin" @click="openCreate">
      <Plus class="h-4 w-4" />
      New announcement
    </Button>
  </div>

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
        <div class="flex shrink-0 items-center gap-1">
          <Badge :class="announcementTypeMeta[a.type].badgeClass" class="border-transparent">
            {{ announcementTypeMeta[a.type].label }}
          </Badge>
          <template v-if="auth.isAdmin">
            <Button variant="outline" size="icon" class="h-7 w-7" :title="a.pinned ? 'Unpin' : 'Pin'" @click="togglePin(a)">
              <PinOff v-if="a.pinned" class="h-3.5 w-3.5" />
              <Pin v-else class="h-3.5 w-3.5" />
            </Button>
            <Button variant="outline" size="icon" class="h-7 w-7 text-destructive hover:text-destructive hover:border-destructive" title="Delete" @click="remove(a)">
              <Trash2 class="h-3.5 w-3.5" />
            </Button>
          </template>
        </div>
      </CardHeader>
      <CardContent>
        <p class="text-sm text-muted-foreground">{{ a.body }}</p>
      </CardContent>
    </Card>
    <p v-if="!announcements.length" class="text-sm text-muted-foreground">No announcements</p>
  </div>

  <Dialog v-model:open="createOpen">
    <DialogContent class="max-w-md p-6">
      <VisuallyHidden as-child>
        <DialogTitle>New announcement</DialogTitle>
      </VisuallyHidden>
      <h2 class="text-base font-semibold text-foreground">New announcement</h2>
      <p class="mt-1 text-xs text-muted-foreground">Publish an update for the whole team.</p>

      <div class="mt-4 space-y-3">
        <div>
          <label class="text-xs text-muted-foreground">Title</label>
          <Input v-model="form.title" class="mt-1" placeholder="What's happening?" />
        </div>
        <div>
          <label class="text-xs text-muted-foreground">Details</label>
          <textarea
            v-model="form.body"
            rows="3"
            class="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Add more context..."
          />
        </div>
        <div>
          <label class="text-xs text-muted-foreground">Type</label>
          <div class="mt-1 grid grid-cols-4 gap-2">
            <button
              v-for="[value, meta] in typeOptions"
              :key="value"
              type="button"
              :class="[
                'flex flex-col items-center gap-1.5 rounded-lg border p-2.5 text-xs font-medium transition-colors',
                form.type === value ? 'border-primary bg-accent text-foreground' : 'border-border bg-muted text-muted-foreground hover:border-primary/50',
              ]"
              @click="form.type = value"
            >
              <component :is="meta.icon" class="h-4 w-4" />
              {{ meta.label }}
            </button>
          </div>
        </div>
        <label class="flex cursor-pointer items-center gap-2 text-sm">
          <input v-model="form.pinned" type="checkbox" class="h-4 w-4 rounded border-border" />
          Pin to top
        </label>
      </div>

      <div class="mt-5 flex justify-end gap-2">
        <Button variant="outline" @click="createOpen = false">Cancel</Button>
        <Button :disabled="saving" @click="submitCreate">{{ saving ? 'Publishing...' : 'Publish' }}</Button>
      </div>
    </DialogContent>
  </Dialog>
</template>
