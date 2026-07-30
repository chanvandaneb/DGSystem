<script setup lang="ts">
import { h, ref, computed, onMounted } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { useRouter } from 'vue-router'
import { Check, X, Trophy, TrendingUp, Award } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import { useToast } from '@/composables/useToast'
import { api } from '@/lib/api'
import PageHeader from '@/components/layout/PageHeader.vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select'
import DataTable from '@/components/data-table/DataTable.vue'

const router = useRouter()
const auth = useAuthStore()

interface KpiEntry {
  id: string
  date: string
  reporter: string
  reporterPoint: number
  reportee: string
  reporteePoint: number
  title: string
  status: 'Pending' | 'Approved' | 'Rejected'
}

const entries = ref<KpiEntry[]>([])
const month = ref('')
const userFilter = ref('')

const users = computed(() => Array.from(new Set(entries.value.flatMap((e) => [e.reporter, e.reportee]))))

const filtered = computed(() =>
  entries.value.filter((e) => {
    if (month.value && !e.date.startsWith(month.value)) return false
    if (userFilter.value && userFilter.value !== 'all' && e.reporter !== userFilter.value && e.reportee !== userFilter.value) return false
    return true
  }),
)

function clearFilters() {
  month.value = ''
  userFilter.value = ''
}

const statusVariant: Record<KpiEntry['status'], 'warning' | 'success' | 'destructive'> = {
  Pending: 'warning',
  Approved: 'success',
  Rejected: 'destructive',
}

const toast = useToast()

async function setStatus(entry: KpiEntry, status: 'Approved' | 'Rejected') {
  try {
    const updated = await api.put<KpiEntry>(`/kpi/${entry.id}/status`, { status })
    entries.value = entries.value.map((e) => (e.id === updated.id ? updated : e))
    toast.success(`"${updated.title}" ${status.toLowerCase()}`)
  } catch (e) {
    toast.error(e instanceof Error ? e.message : 'Failed to update status')
  }
}

const columns: ColumnDef<KpiEntry, any>[] = [
  { accessorKey: 'date', header: 'Date' },
  { accessorKey: 'reporter', header: 'Reporter' },
  { accessorKey: 'reporterPoint', header: 'Reporter point' },
  { accessorKey: 'reportee', header: 'Reportee' },
  { accessorKey: 'reporteePoint', header: 'Reportee point' },
  { accessorKey: 'title', header: 'Title', cell: ({ row }) => h('span', { class: 'font-medium' }, row.original.title) },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => h(Badge, { variant: statusVariant[row.original.status as KpiEntry['status']] }, () => row.original.status),
  },
  ...(useAuthStore().isAdmin
    ? [
        {
          id: 'actions',
          header: 'Review',
          cell: ({ row }: { row: { original: KpiEntry } }) =>
            row.original.status === 'Pending'
              ? h('div', { class: 'flex items-center gap-1' }, [
                  h(
                    Button,
                    {
                      variant: 'outline',
                      size: 'icon',
                      class: 'h-7 w-7 text-emerald-500 hover:text-emerald-600',
                      title: 'Approve',
                      onClick: () => setStatus(row.original, 'Approved'),
                    },
                    () => h(Check, { class: 'h-4 w-4' }),
                  ),
                  h(
                    Button,
                    {
                      variant: 'outline',
                      size: 'icon',
                      class: 'h-7 w-7 text-destructive hover:text-destructive',
                      title: 'Reject',
                      onClick: () => setStatus(row.original, 'Rejected'),
                    },
                    () => h(X, { class: 'h-4 w-4' }),
                  ),
                ])
              : null,
        } as ColumnDef<KpiEntry, any>,
      ]
    : []),
]

interface LeaderEntry { name: string; points: number; approved: number; total: number }

const leaderboard = computed<LeaderEntry[]>(() => {
  const map: Record<string, LeaderEntry> = {}
  for (const e of entries.value) {
    if (!map[e.reportee]) map[e.reportee] = { name: e.reportee, points: 0, approved: 0, total: 0 }
    map[e.reportee].total++
    if (e.status === 'Approved') { map[e.reportee].approved++; map[e.reportee].points += e.reporteePoint }
  }
  return Object.values(map).sort((a, b) => b.points - a.points)
})

const maxPoints = computed(() => Math.max(1, ...leaderboard.value.map(l => l.points)))

const medalClass = (i: number) =>
  i === 0 ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40' :
  i === 1 ? 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800' :
  i === 2 ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/40' : 'bg-muted text-muted-foreground'

onMounted(async () => {
  entries.value = await api.get<KpiEntry[]>('/kpi')
})
</script>

<template>
  <div class="flex items-start justify-between">
    <PageHeader title="KPI" :description="auth.isAdmin ? 'List of all kpi' : 'Your kpi entries'" />
    <Button v-if="auth.isAdmin" @click="router.push('/kpi/rule')">Add rule</Button>
  </div>

  <!-- Leaderboard -->
  <div v-if="leaderboard.length" class="grid gap-4 sm:grid-cols-3 mb-2">
    <Card v-for="(entry, i) in leaderboard.slice(0, 3)" :key="entry.name"
      :class="['shadow-sm border', i === 0 ? 'border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/20' : '']">
      <CardContent class="pt-4 pb-4">
        <div class="flex items-center gap-3">
          <div :class="['flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold', medalClass(i)]">
            {{ i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉' }}
          </div>
          <div class="min-w-0 flex-1">
            <p class="font-semibold text-foreground truncate">{{ entry.name }}</p>
            <p class="text-xs text-muted-foreground">{{ entry.approved }}/{{ entry.total }} approved</p>
          </div>
          <div class="text-right">
            <p class="text-lg font-bold text-[#2563EB]">{{ entry.points }}</p>
            <p class="text-[10px] text-muted-foreground">pts</p>
          </div>
        </div>
        <div class="mt-3 h-1.5 w-full rounded-full bg-muted overflow-hidden">
          <div class="h-full rounded-full bg-gradient-to-r from-[#2563EB] to-[#4F46E5] transition-all duration-700"
            :style="{ width: `${(entry.points / maxPoints) * 100}%` }" />
        </div>
      </CardContent>
    </Card>
  </div>

  <Card v-if="leaderboard.length > 3" class="mb-4 shadow-sm">
    <CardHeader class="pb-2">
      <CardTitle class="text-base flex items-center gap-2">
        <Trophy class="h-4 w-4 text-amber-500" /> Full Leaderboard
      </CardTitle>
    </CardHeader>
    <CardContent class="space-y-2">
      <div v-for="(entry, i) in leaderboard" :key="entry.name" class="flex items-center gap-3">
        <span :class="['flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold', medalClass(i)]">{{ i + 1 }}</span>
        <span class="flex-1 text-sm font-medium truncate">{{ entry.name }}</span>
        <div class="flex-1 h-2 rounded-full bg-muted overflow-hidden">
          <div class="h-full rounded-full bg-[#2563EB]/70" :style="{ width: `${(entry.points / maxPoints) * 100}%` }" />
        </div>
        <span class="text-sm font-bold text-[#2563EB] w-16 text-right tabular-nums">{{ entry.points }} pts</span>
      </div>
    </CardContent>
  </Card>

  <Card>
    <CardContent class="pt-6">
      <div class="mb-4 flex flex-wrap items-center gap-3">
        <Input v-model="month" type="month" class="max-w-[160px]" />
        <Select v-if="auth.isAdmin" v-model="userFilter">
          <SelectTrigger class="w-44" placeholder="User" />
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem v-for="u in users" :key="u" :value="u">{{ u }}</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" @click="clearFilters">Clear</Button>
      </div>

      <DataTable :columns="columns" :data="filtered" search-placeholder="Search kpi..." />
    </CardContent>
  </Card>
</template>
