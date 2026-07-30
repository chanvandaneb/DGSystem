<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowRight, Pin, ClipboardList, Timer, Plus, CheckCircle2, Clock, Zap, TrendingUp, Users, Activity, Trophy } from 'lucide-vue-next'
import { api } from '@/lib/api'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/stores/auth'
import { announcementTypeMeta, relativeTime, type AnnouncementType } from '@/lib/announcements'

interface KpiCard {
  label: string
  value: string
  accent: 'blue' | 'orange' | 'green'
  sub: string
  delta: string
  sparkline: number[]
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

interface ActivityItem {
  id: string
  type: 'task' | 'kpi' | 'announcement'
  title: string
  meta: string
  date: string
  badge: string
  badgeColor: string
}

interface LeaderboardEntry {
  name: string
  approved: number
  total: number
  points: number
}

interface TaskBreakdown {
  todo: number
  doing: number
  done: number
  total: number
}

interface Summary {
  kpis: KpiCard[]
  taskBreakdown: TaskBreakdown
  attendanceTrend: TrendPoint[]
  presence: Presence
  userStatuses: EmployeeStatus[]
  recentBreaks: AttendanceBreak[]
  recentAnnouncements: Announcement[]
  recentActivity: ActivityItem[]
  leaderboard: LeaderboardEntry[]
}

const router = useRouter()
const auth = useAuthStore()
const summary = ref<Summary | null>(null)
const error = ref('')
const now = ref(new Date())
let clockTimer: ReturnType<typeof setInterval>

const kpiIcons = [ClipboardList, Timer]
const accentBg: Record<KpiCard['accent'], string> = {
  blue: 'bg-gradient-to-br from-[#2563EB] to-[#4F46E5]',
  orange: 'bg-gradient-to-br from-orange-500 to-red-500',
  green: 'bg-gradient-to-br from-emerald-500 to-teal-600',
}

const statusColor: Record<EmployeeStatus['status'], string> = {
  Online: 'text-emerald-500',
  Idle: 'text-amber-500',
  Offline: 'text-muted-foreground',
}
const statusDot: Record<EmployeeStatus['status'], string> = {
  Online: 'bg-emerald-500',
  Idle: 'bg-amber-400',
  Offline: 'bg-zinc-400',
}

const greeting = computed(() => {
  const h = now.value.getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
})

const clockTime = computed(() =>
  now.value.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
)

const today = computed(() =>
  now.value.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
)

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

const taskRingOffset = computed(() => {
  const b = summary.value?.taskBreakdown
  if (!b || !b.total) return 251
  const pct = b.done / b.total
  return 251 - pct * 251
})

const maxLeaderPoints = computed(() =>
  Math.max(1, ...(summary.value?.leaderboard.map((l) => l.points) ?? [])),
)

function trendLabel(date: string) {
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function activityIcon(type: ActivityItem['type']) {
  if (type === 'task') return CheckCircle2
  if (type === 'kpi') return TrendingUp
  return Zap
}

function activityColor(type: ActivityItem['type']) {
  if (type === 'task') return 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400'
  if (type === 'kpi') return 'bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400'
  return 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400'
}

function badgeVariant(color: string): 'success' | 'warning' | 'destructive' | 'secondary' {
  if (color === 'green') return 'success'
  if (color === 'yellow') return 'warning'
  if (color === 'red') return 'destructive'
  return 'secondary'
}

function sparkPath(values: number[]): string {
  if (!values.length) return ''
  const max = Math.max(...values, 1)
  const w = 80
  const h = 28
  const pts = values.map((v, i) => {
    const x = (i / Math.max(values.length - 1, 1)) * w
    const y = h - (v / max) * h
    return `${x},${y}`
  })
  return `M${pts.join('L')}`
}

onMounted(async () => {
  clockTimer = setInterval(() => { now.value = new Date() }, 1000)
  try {
    summary.value = await api.get<Summary>('/dashboard/summary')
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load dashboard'
  }
})

onUnmounted(() => clearInterval(clockTimer))
</script>

<template>
  <!-- Greeting header -->
  <div class="mb-6 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <h1 class="text-2xl font-bold text-foreground">{{ greeting }}, {{ auth.user?.name?.split(' ')[0] }} 👋</h1>
      <p class="mt-0.5 text-sm text-muted-foreground">{{ today }}</p>
    </div>
    <div class="flex items-center gap-2">
      <div class="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 shadow-sm">
        <Clock class="h-4 w-4 text-[#2563EB]" />
        <span class="font-mono text-sm font-semibold tabular-nums text-foreground">{{ clockTime }}</span>
      </div>
      <Button size="sm" @click="router.push('/clock')">
        <Timer class="h-3.5 w-3.5" />
        Check In
      </Button>
      <Button size="sm" variant="outline" @click="router.push('/tasks')">
        <Plus class="h-3.5 w-3.5" />
        Add Task
      </Button>
    </div>
  </div>

  <p v-if="error" class="mb-4 text-sm text-destructive">{{ error }}</p>

  <!-- KPI Cards with sparklines -->
  <div v-if="summary" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <Card
      v-for="(kpi, i) in summary.kpis"
      :key="i"
      :class="`border-0 text-white shadow-lg ${accentBg[kpi.accent]}`"
    >
      <CardContent class="pt-5 pb-4">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-xs uppercase tracking-wider text-white/70">{{ kpi.label }}</p>
            <p class="mt-1 text-3xl font-bold">{{ kpi.value }}</p>
            <p class="mt-0.5 text-xs text-white/70">{{ kpi.sub }}</p>
          </div>
          <component :is="kpiIcons[i]" class="h-5 w-5 text-white/50" />
        </div>
        <div class="mt-3 flex items-end justify-between">
          <svg width="80" height="28" class="overflow-visible opacity-70">
            <path :d="sparkPath(kpi.sparkline)" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span class="text-xs font-semibold text-white/90 bg-white/20 rounded-full px-2 py-0.5">{{ kpi.delta }}</span>
        </div>
      </CardContent>
    </Card>

    <!-- Task Completion Ring -->
    <Card v-if="summary.taskBreakdown" class="shadow-sm">
      <CardContent class="flex items-center gap-5 pt-5 pb-4">
        <div class="relative h-20 w-20 shrink-0">
          <svg viewBox="0 0 100 100" class="h-full w-full -rotate-90">
            <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--muted))" stroke-width="14" />
            <circle
              cx="50" cy="50" r="40" fill="none"
              stroke="#2563EB" stroke-width="14"
              stroke-linecap="round"
              :stroke-dasharray="251"
              :stroke-dashoffset="taskRingOffset"
              class="transition-all duration-700"
            />
          </svg>
          <div class="absolute inset-0 flex flex-col items-center justify-center">
            <p class="text-sm font-bold text-foreground">
              {{ summary.taskBreakdown.total ? Math.round((summary.taskBreakdown.done / summary.taskBreakdown.total) * 100) : 0 }}%
            </p>
          </div>
        </div>
        <div class="flex-1">
          <p class="text-xs uppercase tracking-wider text-muted-foreground">Task Completion</p>
          <div class="mt-2 space-y-1.5 text-sm">
            <div class="flex justify-between"><span class="text-muted-foreground">Todo</span><span class="font-semibold">{{ summary.taskBreakdown.todo }}</span></div>
            <div class="flex justify-between"><span class="text-muted-foreground">Doing</span><span class="font-semibold text-blue-500">{{ summary.taskBreakdown.doing }}</span></div>
            <div class="flex justify-between"><span class="text-muted-foreground">Done</span><span class="font-semibold text-emerald-500">{{ summary.taskBreakdown.done }}</span></div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>

  <!-- Charts row -->
  <div v-if="summary" class="mt-4 grid gap-4 lg:grid-cols-3">
    <!-- Working hours trend -->
    <Card class="lg:col-span-2 shadow-sm">
      <CardHeader class="pb-2">
        <CardTitle class="text-base text-foreground flex items-center gap-2">
          <Activity class="h-4 w-4 text-[#2563EB]" />
          Working Hours Trend
        </CardTitle>
        <p class="text-xs text-muted-foreground">Hours worked per day. Red bars = late check-in.</p>
      </CardHeader>
      <CardContent>
        <div class="flex h-44 items-end gap-2">
          <div
            v-for="t in summary.attendanceTrend"
            :key="t.date"
            class="group flex flex-1 flex-col items-center gap-1"
          >
            <span class="text-xs font-medium tabular-nums text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
              {{ t.hours.toFixed(1) }}h
            </span>
            <div
              class="w-full max-w-10 rounded-t-md transition-all duration-200 group-hover:opacity-90"
              :class="t.late ? 'bg-red-400 group-hover:bg-red-500' : 'bg-[#2563EB]/70 group-hover:bg-[#2563EB]'"
              :style="{ height: `${Math.max(4, (t.hours / maxTrendHours) * 140)}px` }"
            />
            <span class="text-[10px] text-muted-foreground">{{ trendLabel(t.date) }}</span>
          </div>
        </div>
        <div class="mt-3 flex gap-4 border-t border-border pt-3 text-xs text-muted-foreground">
          <span class="flex items-center gap-1.5"><span class="h-2.5 w-2.5 rounded-sm bg-[#2563EB]" /> On time</span>
          <span class="flex items-center gap-1.5"><span class="h-2.5 w-2.5 rounded-sm bg-red-400" /> Late check-in</span>
        </div>
      </CardContent>
    </Card>

    <!-- Team Presence donut -->
    <Card class="shadow-sm">
      <CardHeader class="pb-2">
        <CardTitle class="text-base text-foreground flex items-center gap-2">
          <Users class="h-4 w-4 text-[#2563EB]" />
          Team Presence
        </CardTitle>
        <p class="text-xs text-muted-foreground">Current status across the team.</p>
      </CardHeader>
      <CardContent class="flex flex-col items-center">
        <div class="relative h-32 w-32">
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
        <div class="mt-3 w-full space-y-2 text-sm">
          <div v-for="[key, count, color] in [['Online', summary.presence.online, 'bg-emerald-500'], ['Idle', summary.presence.idle, 'bg-amber-400'], ['Offline', summary.presence.offline, 'bg-zinc-400']] as [string, number, string][]" :key="key"
            class="flex items-center justify-between">
            <span class="flex items-center gap-2">
              <span :class="['h-2 w-2 rounded-full', color]" />
              {{ key }}
            </span>
            <span class="font-medium tabular-nums">{{ count }}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>

  <!-- Bottom row: Activity + Leaderboard + User Status -->
  <div v-if="summary" class="mt-4 grid gap-4 lg:grid-cols-3">
    <!-- Recent Activity Feed -->
    <Card class="shadow-sm">
      <CardHeader class="pb-2">
        <CardTitle class="text-base text-foreground flex items-center gap-2">
          <Activity class="h-4 w-4 text-[#2563EB]" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent class="max-h-80 space-y-2 overflow-y-auto pr-1">
        <div
          v-for="item in summary.recentActivity"
          :key="item.id"
          class="flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-accent/50"
        >
          <div :class="['flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs', activityColor(item.type)]">
            <component :is="activityIcon(item.type)" class="h-3.5 w-3.5" />
          </div>
          <div class="min-w-0 flex-1">
            <p class="truncate text-xs font-medium text-foreground">{{ item.title }}</p>
            <p class="text-[11px] text-muted-foreground">{{ item.meta }}</p>
          </div>
          <Badge :variant="badgeVariant(item.badgeColor)" class="shrink-0 text-[10px] px-1.5 py-0">{{ item.badge }}</Badge>
        </div>
      </CardContent>
    </Card>

    <!-- KPI Leaderboard -->
    <Card class="shadow-sm">
      <CardHeader class="pb-2">
        <CardTitle class="text-base text-foreground flex items-center gap-2">
          <Trophy class="h-4 w-4 text-amber-500" />
          KPI Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent class="space-y-3">
        <div
          v-for="(entry, i) in summary.leaderboard"
          :key="entry.name"
          class="space-y-1"
        >
          <div class="flex items-center justify-between text-sm">
            <div class="flex items-center gap-2">
              <span :class="['flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold',
                i === 0 ? 'bg-amber-100 text-amber-600' : i === 1 ? 'bg-zinc-100 text-zinc-600' : i === 2 ? 'bg-orange-100 text-orange-600' : 'bg-muted text-muted-foreground']">
                {{ i + 1 }}
              </span>
              <span class="font-medium text-foreground truncate max-w-[90px]">{{ entry.name }}</span>
            </div>
            <span class="font-bold text-[#2563EB] tabular-nums">{{ entry.points }} pts</span>
          </div>
          <div class="h-1.5 w-full rounded-full bg-muted overflow-hidden">
            <div
              class="h-full rounded-full bg-gradient-to-r from-[#2563EB] to-[#4F46E5] transition-all duration-700"
              :style="{ width: `${(entry.points / maxLeaderPoints) * 100}%` }"
            />
          </div>
        </div>
        <p v-if="!summary.leaderboard.length" class="text-xs text-muted-foreground">No KPI data yet</p>
      </CardContent>
    </Card>

    <!-- User Status -->
    <Card class="shadow-sm">
      <CardHeader class="pb-2">
        <CardTitle class="text-base text-foreground flex items-center gap-2">
          <Users class="h-4 w-4 text-[#2563EB]" />
          User Status
        </CardTitle>
        <p class="text-xs text-muted-foreground">Real-time employee status.</p>
      </CardHeader>
      <CardContent class="max-h-72 space-y-2 overflow-y-auto">
        <div v-for="u in summary.userStatuses" :key="u.id" class="flex items-center justify-between rounded-lg p-2 hover:bg-accent/50 transition-colors">
          <div class="flex items-center gap-2.5">
            <div class="relative">
              <div class="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#2563EB]/20 to-[#4F46E5]/20 text-xs font-bold text-[#2563EB]">
                {{ u.name.slice(0, 2).toUpperCase() }}
              </div>
              <span :class="['absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-background', statusDot[u.status]]" />
            </div>
            <div>
              <p class="text-xs font-semibold text-foreground">{{ u.name }}</p>
              <p :class="['text-[11px] font-medium', statusColor[u.status]]">{{ u.status }}</p>
            </div>
          </div>
          <span class="font-mono text-[10px] text-muted-foreground">{{ u.lastSeen }}</span>
        </div>
      </CardContent>
    </Card>
  </div>

  <!-- Announcements -->
  <Card v-if="summary" class="mt-4 shadow-sm">
    <CardHeader class="flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle class="text-base text-foreground flex items-center gap-2">
        <Zap class="h-4 w-4 text-amber-500" />
        Announcements
      </CardTitle>
      <button
        type="button"
        class="flex items-center gap-1 text-xs font-medium text-[#2563EB] transition-colors hover:text-[#1D4ED8]"
        @click="router.push('/announcements')"
      >
        View all <ArrowRight class="h-3.5 w-3.5" />
      </button>
    </CardHeader>
    <CardContent class="grid gap-3 sm:grid-cols-2">
      <div
        v-for="a in summary.recentAnnouncements"
        :key="a.id"
        class="flex gap-3 rounded-xl border border-border p-3 transition-colors hover:bg-accent/50 cursor-pointer"
        @click="router.push('/announcements')"
      >
        <div :class="['flex h-9 w-9 shrink-0 items-center justify-center rounded-full', announcementTypeMeta[a.type].iconWrapClass]">
          <component :is="announcementTypeMeta[a.type].icon" class="h-4 w-4" />
        </div>
        <div class="min-w-0 flex-1">
          <div class="flex items-center gap-1">
            <p class="truncate text-sm font-medium text-foreground">{{ a.title }}</p>
            <Pin v-if="a.pinned" class="h-3 w-3 shrink-0 text-muted-foreground" />
          </div>
          <p class="text-xs text-muted-foreground">{{ a.author }} · {{ relativeTime(a.date) }}</p>
        </div>
        <Badge :class="announcementTypeMeta[a.type].badgeClass" class="h-fit shrink-0 border-transparent text-[10px]">
          {{ announcementTypeMeta[a.type].label }}
        </Badge>
      </div>
      <p v-if="!summary.recentAnnouncements.length" class="text-sm text-muted-foreground col-span-2">No announcements</p>
    </CardContent>
  </Card>
</template>
