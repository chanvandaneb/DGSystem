<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowRight, Pin, ClipboardList, Timer, DollarSign } from 'lucide-vue-next'
import { api } from '@/lib/api'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAuthStore } from '@/stores/auth'
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

interface TrendPoint {
  date: string
  hours: number
  late: boolean
}

interface Presence {
  online: number
  idle: number
  offline: number
}

interface Summary {
  kpis: KpiCard[]
  attendanceTrend: TrendPoint[]
  presence: Presence
  userStatuses: EmployeeStatus[]
  recentBreaks: AttendanceBreak[]
  recentAnnouncements: Announcement[]
  recentEarnings: RecentEarning[]
}

const router = useRouter()
const auth = useAuthStore()
const summary = ref<Summary | null>(null)
const error = ref('')

const accentBg: Record<KpiCard['accent'], string> = {
  blue: 'bg-[#2563EB]',
  orange: 'bg-gradient-to-br from-orange-500 to-red-500',
  green: 'bg-gradient-to-br from-emerald-500 to-teal-600',
}

const kpiIcons = [ClipboardList, Timer, DollarSign]

const statusColor: Record<EmployeeStatus['status'], string> = {
  Online: 'text-emerald-500',
  Idle: 'text-amber-500',
  Offline: 'text-muted-foreground',
}

const greeting = computed(() => {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
})

const today = new Date().toLocaleDateString('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

const maxTrendHours = computed(() =>
  Math.max(10, ...(summary.value?.attendanceTrend.map((t) => t.hours) ?? [])),
)

const presenceTotal = computed(() => {
  const p = summary.value?.presence
  return p ? p.online + p.idle + p.offline : 0
})

const donutSegments = computed(() => {
  const p = summary.value?.presence
  if (!p || !presenceTotal.value) return []
  const parts = [
    { key: 'Online', value: p.online, color: '#10b981' },
    { key: 'Idle', value: p.idle, color: '#f59e0b' },
    { key: 'Offline', value: p.offline, color: '#71717a' },
  ].filter((s) => s.value > 0)
  const circumference = 2 * Math.PI * 40
  let offset = 0
  return parts.map((s) => {
    const length = (s.value / presenceTotal.value) * circumference
    const segment = { ...s, dasharray: `${length} ${circumference - length}`, dashoffset: -offset }
    offset += length
    return segment
  })
})

function trendLabel(date: string) {
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
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
  <div class="mb-6 flex flex-wrap items-end justify-between gap-4">
    <div>
      <h1 class="text-2xl font-semibold tracking-tight">{{ greeting }}, {{ auth.user?.name ?? 'there' }} 👋</h1>
      <p class="mt-1 text-sm text-muted-foreground">{{ today }} · Here's what's happening today.</p>
    </div>
  </div>

  <p v-if="error" class="text-sm text-destructive">{{ error }}</p>

  <div v-if="summary" class="grid gap-4 md:grid-cols-3">
    <Card
      v-for="(kpi, i) in summary.kpis"
      :key="i"
      :class="`border-0 text-white ${accentBg[kpi.accent]}`"
    >
      <CardHeader class="flex-row items-center justify-between space-y-0 pb-1">
        <CardTitle class="text-xs uppercase tracking-wider text-white/80">{{ kpi.label }}</CardTitle>
        <component :is="kpiIcons[i]" class="h-4 w-4 text-white/70" />
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

  <div v-if="summary" class="mt-6 grid gap-4 lg:grid-cols-3">
    <Card class="lg:col-span-2">
      <CardHeader>
        <CardTitle class="text-base text-foreground">Working hours trend</CardTitle>
        <p class="text-xs text-muted-foreground">Hours worked per day over the last records. Red bars are late check-ins.</p>
      </CardHeader>
      <CardContent>
        <div class="flex h-48 items-end gap-3">
          <div
            v-for="t in summary.attendanceTrend"
            :key="t.date"
            class="group flex flex-1 flex-col items-center gap-1.5"
          >
            <span class="text-xs font-medium tabular-nums text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
              {{ t.hours.toFixed(1) }}h
            </span>
            <div
              class="w-full max-w-10 rounded-t-md transition-colors"
              :class="t.late ? 'bg-red-500/80 group-hover:bg-red-500' : 'bg-[#2563EB]/80 group-hover:bg-[#2563EB]'"
              :style="{ height: `${Math.max(4, (t.hours / maxTrendHours) * 150)}px` }"
            />
            <span class="text-[11px] text-muted-foreground">{{ trendLabel(t.date) }}</span>
          </div>
        </div>
        <div class="mt-4 flex gap-4 border-t border-border pt-3 text-xs text-muted-foreground">
          <span class="flex items-center gap-1.5"><span class="h-2.5 w-2.5 rounded-sm bg-[#2563EB]" /> On time</span>
          <span class="flex items-center gap-1.5"><span class="h-2.5 w-2.5 rounded-sm bg-red-500" /> Late check-in</span>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle class="text-base text-foreground">Team presence</CardTitle>
        <p class="text-xs text-muted-foreground">Current status across the team.</p>
      </CardHeader>
      <CardContent class="flex flex-col items-center">
        <div class="relative h-36 w-36">
          <svg viewBox="0 0 100 100" class="h-full w-full -rotate-90">
            <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--muted))" stroke-width="12" />
            <circle
              v-for="s in donutSegments"
              :key="s.key"
              cx="50" cy="50" r="40" fill="none"
              :stroke="s.color"
              stroke-width="12"
              :stroke-dasharray="s.dasharray"
              :stroke-dashoffset="s.dashoffset"
            />
          </svg>
          <div class="absolute inset-0 flex flex-col items-center justify-center">
            <p class="text-2xl font-bold">{{ presenceTotal }}</p>
            <p class="text-[11px] text-muted-foreground">members</p>
          </div>
        </div>
        <div class="mt-4 w-full space-y-2 text-sm">
          <div class="flex items-center justify-between">
            <span class="flex items-center gap-2"><span class="h-2.5 w-2.5 rounded-full bg-emerald-500" /> Online</span>
            <span class="font-medium tabular-nums">{{ summary.presence.online }}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="flex items-center gap-2"><span class="h-2.5 w-2.5 rounded-full bg-amber-500" /> Idle</span>
            <span class="font-medium tabular-nums">{{ summary.presence.idle }}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="flex items-center gap-2"><span class="h-2.5 w-2.5 rounded-full bg-zinc-500" /> Offline</span>
            <span class="font-medium tabular-nums">{{ summary.presence.offline }}</span>
          </div>
        </div>
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
          <div class="flex items-center gap-3">
            <div class="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-semibold">
              {{ u.name.slice(0, 2) }}
            </div>
            <div>
              <p class="text-sm font-semibold">{{ u.name }}</p>
              <p :class="['text-xs font-medium', statusColor[u.status]]">{{ u.status }}</p>
            </div>
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
