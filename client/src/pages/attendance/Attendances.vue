<script setup lang="ts">
import { h, ref, computed, onMounted } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { Download, Clock, UserCheck, AlertTriangle, Timer, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { api } from '@/lib/api'
import { downloadCsv } from '@/lib/csv'
import PageHeader from '@/components/layout/PageHeader.vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select'
import DataTable from '@/components/data-table/DataTable.vue'

interface AttendanceRecord {
  id: string
  department: string
  eid: string
  name: string
  date: string
  checkIn: string
  checkOut: string | null
  breaks: number
  workingDuration: string
  breakDuration: string
  workingHours: string
}

// Shift is considered to start at 08:00; check-ins after this are late.
const SHIFT_START_MINUTES = 8 * 60

const records = ref<AttendanceRecord[]>([])
const dateFrom = ref('')
const dateTo = ref('')
const statusFilter = ref('all')

function checkInMinutes(checkIn: string): number | null {
  const match = checkIn.match(/(\d{1,2}):(\d{2}):(\d{2})/)
  if (!match) return null
  const [, h, m] = match
  return Number(h) * 60 + Number(m)
}

function isLate(r: AttendanceRecord): boolean {
  const minutes = checkInMinutes(r.checkIn)
  return minutes !== null && minutes > SHIFT_START_MINUTES
}

function recordStatus(r: AttendanceRecord): 'Late' | 'Complete' | 'In progress' {
  if (!r.checkOut) return 'In progress'
  if (isLate(r)) return 'Late'
  return 'Complete'
}

const statusVariant: Record<ReturnType<typeof recordStatus>, 'success' | 'warning' | 'destructive'> = {
  Complete: 'success',
  'In progress': 'warning',
  Late: 'destructive',
}

const filtered = computed(() =>
  records.value.filter((r) => {
    if (dateFrom.value && r.date < dateFrom.value) return false
    if (dateTo.value && r.date > dateTo.value) return false
    if (statusFilter.value !== 'all' && recordStatus(r) !== statusFilter.value) return false
    return true
  }),
)

const latestDate = computed(() => records.value.reduce((max, r) => (r.date > max ? r.date : max), ''))
const latestRecords = computed(() => records.value.filter((r) => r.date === latestDate.value))

function parseDuration(s: string): number {
  const match = s.match(/(-?\d+) hr (-?\d+) min (-?\d+) sec/)
  if (!match) return 0
  const [, h, m, sec] = match
  return Number(h) * 3600 + Number(m) * 60 + Number(sec)
}

const summary = computed(() => {
  const total = records.value.length
  const present = latestRecords.value.length
  const late = latestRecords.value.filter(isLate).length
  const totalWorkSec = records.value.reduce((sum, r) => sum + parseDuration(r.workingHours), 0)
  const avgHours = total ? totalWorkSec / total / 3600 : 0
  return { present, late, avgHours }
})

function clearFilters() {
  dateFrom.value = ''
  dateTo.value = ''
  statusFilter.value = 'all'
}

function exportCsv() {
  downloadCsv('attendances.csv', filtered.value)
}

const columns: ColumnDef<AttendanceRecord, any>[] = [
  { accessorKey: 'department', header: 'Department' },
  { accessorKey: 'eid', header: 'EID' },
  { accessorKey: 'name', header: 'Name', cell: ({ row }) => h('span', { class: 'font-medium' }, row.original.name) },
  { accessorKey: 'date', header: 'Date' },
  {
    accessorKey: 'checkIn',
    header: 'Check in',
    cell: ({ row }) =>
      h('span', { class: 'flex items-center gap-2' }, [
        row.original.checkIn,
        isLate(row.original) ? h(Badge, { variant: 'destructive', class: 'text-[10px]' }, () => 'Late') : null,
      ]),
  },
  { accessorKey: 'checkOut', header: 'Check out', cell: ({ row }) => row.original.checkOut ?? '-' },
  { accessorKey: 'breaks', header: 'Breaks' },
  { accessorKey: 'workingDuration', header: 'Working duration' },
  { accessorKey: 'breakDuration', header: 'Break duration' },
  { accessorKey: 'workingHours', header: 'Working hours' },
  {
    id: 'status',
    header: 'Status',
    cell: ({ row }) => h(Badge, { variant: statusVariant[recordStatus(row.original)] }, () => recordStatus(row.original)),
  },
]

// ── Calendar heatmap ──────────────────────────────────────────────────
const calendarMonth = ref(new Date().toISOString().slice(0, 7))

function calendarLabel(ym: string) {
  const [y, m] = ym.split('-')
  return new Date(Number(y), Number(m) - 1, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}
function prevMonth() {
  const d = new Date(calendarMonth.value + '-01')
  d.setMonth(d.getMonth() - 1)
  calendarMonth.value = d.toISOString().slice(0, 7)
}
function nextMonth() {
  const d = new Date(calendarMonth.value + '-01')
  d.setMonth(d.getMonth() + 1)
  calendarMonth.value = d.toISOString().slice(0, 7)
}

const calendarDays = computed(() => {
  const [y, m] = calendarMonth.value.split('-').map(Number)
  const firstDay = new Date(y, m - 1, 1).getDay()
  const daysInMonth = new Date(y, m, 0).getDate()
  const byDate: Record<string, AttendanceRecord> = {}
  for (const r of records.value) {
    if (r.date.startsWith(calendarMonth.value)) byDate[r.date] = r
  }
  const cells: { date: string; day: number; record: AttendanceRecord | null; isToday: boolean }[] = []
  const todayStr = new Date().toISOString().slice(0, 10)
  for (let i = 0; i < firstDay; i++) cells.push({ date: '', day: 0, record: null, isToday: false })
  for (let d = 1; d <= daysInMonth; d++) {
    const date = `${calendarMonth.value}-${String(d).padStart(2, '0')}`
    cells.push({ date, day: d, record: byDate[date] ?? null, isToday: date === todayStr })
  }
  return cells
})

function cellClass(cell: { date: string; day: number; record: AttendanceRecord | null; isToday: boolean }) {
  if (!cell.day) return 'invisible'
  const r = cell.record
  if (!r) return cell.isToday ? 'border-2 border-[#2563EB]' : 'bg-muted/30 text-muted-foreground'
  if (!r.checkOut) return 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'
  if (isLate(r)) return 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'
  return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
}

onMounted(async () => {
  records.value = await api.get<AttendanceRecord[]>('/attendance')
})
</script>

<template>
  <div class="flex items-start justify-between">
    <PageHeader title="Attendances" description="Smart attendance management" />
    <Button @click="exportCsv">
      <Download class="h-4 w-4" />
      Export
    </Button>
  </div>

  <div class="grid gap-4 sm:grid-cols-3">
    <Card class="border-0 bg-[#2563EB] text-white">
      <CardHeader class="pb-1">
        <CardTitle class="flex items-center gap-2 text-xs uppercase tracking-wider text-white/80">
          <UserCheck class="h-3.5 w-3.5" />
          Present (latest day)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p class="text-2xl font-bold">{{ summary.present }}</p>
        <p class="mt-1 text-xs text-white/70">{{ latestDate || '-' }}</p>
      </CardContent>
    </Card>
    <Card class="border-0 bg-gradient-to-br from-orange-500 to-red-500 text-white">
      <CardHeader class="pb-1">
        <CardTitle class="flex items-center gap-2 text-xs uppercase tracking-wider text-white/80">
          <AlertTriangle class="h-3.5 w-3.5" />
          Late (latest day)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p class="text-2xl font-bold">{{ summary.late }}</p>
        <p class="mt-1 text-xs text-white/70">After 08:00 check-in</p>
      </CardContent>
    </Card>
    <Card class="border-0 bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
      <CardHeader class="pb-1">
        <CardTitle class="flex items-center gap-2 text-xs uppercase tracking-wider text-white/80">
          <Timer class="h-3.5 w-3.5" />
          Avg working hours
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p class="text-2xl font-bold">{{ summary.avgHours.toFixed(1) }}h</p>
        <p class="mt-1 text-xs text-white/70">Across all records</p>
      </CardContent>
    </Card>
  </div>

  <!-- Monthly Calendar Heatmap -->
  <Card class="mt-6 shadow-sm">
    <CardHeader class="flex-row items-center justify-between space-y-0 pb-3">
      <CardTitle class="text-base text-foreground flex items-center gap-2">
        <Clock class="h-4 w-4 text-[#2563EB]" />
        Attendance Calendar
      </CardTitle>
      <div class="flex items-center gap-2">
        <button type="button" class="rounded-md p-1 hover:bg-accent transition-colors" @click="prevMonth">
          <ChevronLeft class="h-4 w-4 text-muted-foreground" />
        </button>
        <span class="text-sm font-medium text-foreground min-w-[130px] text-center">{{ calendarLabel(calendarMonth) }}</span>
        <button type="button" class="rounded-md p-1 hover:bg-accent transition-colors" @click="nextMonth">
          <ChevronRight class="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
    </CardHeader>
    <CardContent>
      <div class="grid grid-cols-7 gap-1.5 mb-2">
        <div v-for="d in ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']" :key="d"
          class="text-center text-[11px] font-medium text-muted-foreground py-1">{{ d }}</div>
      </div>
      <div class="grid grid-cols-7 gap-1.5">
        <div
          v-for="(cell, i) in calendarDays"
          :key="i"
          :class="['flex h-10 w-full items-center justify-center rounded-lg text-xs font-medium transition-all', cellClass(cell)]"
          :title="cell.record ? `${cell.date}: ${cell.record.checkIn} – ${cell.record.checkOut ?? 'ongoing'}` : cell.date"
        >
          {{ cell.day || '' }}
        </div>
      </div>
      <div class="mt-3 flex items-center gap-4 text-[11px] text-muted-foreground">
        <span class="flex items-center gap-1.5"><span class="h-3 w-3 rounded bg-emerald-100 dark:bg-emerald-900/40" /> On time</span>
        <span class="flex items-center gap-1.5"><span class="h-3 w-3 rounded bg-red-100 dark:bg-red-900/40" /> Late</span>
        <span class="flex items-center gap-1.5"><span class="h-3 w-3 rounded bg-amber-100 dark:bg-amber-900/40" /> In progress</span>
        <span class="flex items-center gap-1.5"><span class="h-3 w-3 rounded bg-muted/30" /> No record</span>
      </div>
    </CardContent>
  </Card>

  <Card class="mt-6">
    <CardHeader>
      <CardTitle class="flex items-center gap-2 text-base text-foreground">
        <Clock class="h-4 w-4 text-muted-foreground" />
        Records
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div class="mb-4 flex flex-wrap items-center gap-3">
        <Input v-model="dateFrom" type="date" placeholder="From date" class="max-w-[160px]" />
        <Input v-model="dateTo" type="date" placeholder="To date" class="max-w-[160px]" />
        <Select v-model="statusFilter">
          <SelectTrigger class="w-40" placeholder="Status" />
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="Complete">Complete</SelectItem>
            <SelectItem value="In progress">In progress</SelectItem>
            <SelectItem value="Late">Late</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" @click="clearFilters">Clear</Button>
      </div>

      <DataTable :columns="columns" :data="filtered" search-placeholder="Search records..." />
    </CardContent>
  </Card>
</template>
