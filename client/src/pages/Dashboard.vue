<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowRight, Pin } from 'lucide-vue-next'
import { api } from '@/lib/api'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import PageHeader from '@/components/layout/PageHeader.vue'
import { announcementTypeMeta, relativeTime, type AnnouncementType } from '@/lib/announcements'

interface KpiCard {
  label: string
  value: string
  accent: 'blue' | 'orange' | 'green'
  sub: string
  delta: string
}

interface EmployeeStatus {
  id: string
  name: string
  status: 'Online' | 'Idle' | 'Offline'
  lastSeen: string
}

interface AttendanceBreak {
  id: string
  date: string
  name: string
  breakIn: string
  breakOut: string
  type: string
}

interface Announcement {
  id: string
  title: string
  author: string
  date: string
  type: AnnouncementType
  pinned?: boolean
}

interface RecentEarning {
  date: string
  salesCount: number
  earnings: number
  delta: number
}

interface Summary {
  kpis: KpiCard[]
  userStatuses: EmployeeStatus[]
  recentBreaks: AttendanceBreak[]
  recentAnnouncements: Announcement[]
  recentEarnings: RecentEarning[]
}

const router = useRouter()
const summary = ref<Summary | null>(null)
const error = ref('')

const accentBg: Record<KpiCard['accent'], string> = {
  blue: 'bg-[#2563EB]',
  orange: 'bg-gradient-to-br from-orange-500 to-red-500',
  green: 'bg-gradient-to-br from-emerald-500 to-teal-600',
}

const statusColor: Record<EmployeeStatus['status'], string> = {
  Online: 'text-emerald-500',
  Idle: 'text-amber-500',
  Offline: 'text-muted-foreground',
}

onMounted(async () => {
  try {
    summary.value = await api.get<Summary>('/dashboard/summary')
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load dashboard'
  }
})
</script>

<template>
  <PageHeader title="Dashboard" description="Overview of your system" />

  <p v-if="error" class="text-sm text-destructive">{{ error }}</p>

  <div v-if="summary" class="grid gap-4 md:grid-cols-3">
    <Card
      v-for="(kpi, i) in summary.kpis"
      :key="i"
      :class="`border-0 text-white ${accentBg[kpi.accent]}`"
    >
      <CardHeader class="pb-1">
        <CardTitle class="text-xs uppercase tracking-wider text-white/80">{{ kpi.label }}</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="flex items-end justify-between">
          <p class="text-2xl font-bold">{{ kpi.value }}</p>
          <span class="text-sm font-medium text-white/90">{{ kpi.delta }}</span>
        </div>
        <p class="mt-1 text-xs text-white/70">{{ kpi.sub }}</p>
      </CardContent>
    </Card>
  </div>

  <div v-if="summary" class="grid gap-4 lg:grid-cols-2 mt-6">
    <Card>
      <CardHeader>
        <CardTitle class="text-base text-foreground">User status</CardTitle>
        <p class="text-xs text-muted-foreground">The employee's status will be displayed here in real-time.</p>
      </CardHeader>
      <CardContent class="max-h-80 space-y-3 overflow-y-auto">
        <div v-for="u in summary.userStatuses" :key="u.id" class="flex items-center justify-between border-b border-border pb-2 last:border-0">
          <div>
            <p class="text-sm font-semibold">{{ u.name }}</p>
            <p :class="['text-xs font-medium', statusColor[u.status]]">{{ u.status }}</p>
          </div>
          <Badge variant="secondary" class="font-mono text-[11px]">{{ u.lastSeen }}</Badge>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle class="text-base text-foreground">Recent Breaks</CardTitle>
        <p class="text-xs text-muted-foreground">The employee's recent breaks will be displayed here.</p>
      </CardHeader>
      <CardContent class="space-y-3">
        <div v-for="b in summary.recentBreaks" :key="b.id" class="flex items-center justify-between border-b border-border pb-2 last:border-0">
          <div>
            <p class="text-sm font-medium">{{ b.name }}</p>
            <p class="text-xs text-muted-foreground">{{ b.date }} &middot; {{ b.breakIn }} - {{ b.breakOut }}</p>
          </div>
          <Badge variant="outline" class="capitalize">{{ b.type }}</Badge>
        </div>
        <p v-if="!summary.recentBreaks.length" class="text-sm text-muted-foreground">No recent breaks</p>
      </CardContent>
    </Card>
  </div>

  <Card v-if="summary" class="mt-6">
    <CardHeader class="flex-row items-center justify-between space-y-0">
      <div>
        <CardTitle class="text-base text-foreground">Announcements</CardTitle>
        <p class="mt-1 text-xs text-muted-foreground">All important information will be announced here.</p>
      </div>
      <button
        type="button"
        class="flex items-center gap-1 text-xs font-medium text-[#2563EB] transition-colors hover:text-[#1D4ED8]"
        @click="router.push('/announcements')"
      >
        View all
        <ArrowRight class="h-3.5 w-3.5" />
      </button>
    </CardHeader>
    <CardContent class="space-y-3">
      <div
        v-for="a in summary.recentAnnouncements"
        :key="a.id"
        class="flex gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-accent/50"
      >
        <div :class="['flex h-9 w-9 shrink-0 items-center justify-center rounded-full', announcementTypeMeta[a.type].iconWrapClass]">
          <component :is="announcementTypeMeta[a.type].icon" class="h-4.5 w-4.5" />
        </div>
        <div class="min-w-0 flex-1">
          <div class="flex items-center gap-1.5">
            <p class="truncate font-medium">{{ a.title }}</p>
            <Pin v-if="a.pinned" class="h-3 w-3 shrink-0 text-muted-foreground" />
          </div>
          <p class="text-xs text-muted-foreground">{{ a.author }} &middot; {{ relativeTime(a.date) }}</p>
        </div>
        <Badge :class="announcementTypeMeta[a.type].badgeClass" class="h-fit shrink-0 border-transparent">
          {{ announcementTypeMeta[a.type].label }}
        </Badge>
      </div>
      <p v-if="!summary.recentAnnouncements.length" class="text-sm text-muted-foreground">No announcements</p>
    </CardContent>
  </Card>

  <Card v-if="summary" class="mt-6">
    <CardHeader>
      <CardTitle class="text-base text-foreground">Your Most Recent Earnings</CardTitle>
      <p class="text-xs text-muted-foreground">This is your most recent earnings for today's date.</p>
    </CardHeader>
    <CardContent class="p-0">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-border text-left text-muted-foreground">
            <th class="px-6 py-2 font-medium">Date</th>
            <th class="px-6 py-2 font-medium">Sales Count</th>
            <th class="px-6 py-2 font-medium">Earnings</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="e in summary.recentEarnings" :key="e.date" class="border-b border-border last:border-0">
            <td class="px-6 py-2.5">{{ e.date }}</td>
            <td class="px-6 py-2.5">{{ e.salesCount }}</td>
            <td class="px-6 py-2.5">
              ${{ e.earnings.toFixed(2) }}
              <span :class="e.delta >= 0 ? 'text-emerald-500' : 'text-red-500'" class="ml-2 text-xs font-medium">
                {{ e.delta >= 0 ? '+' : '' }}${{ e.delta.toFixed(2) }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </CardContent>
  </Card>
</template>
