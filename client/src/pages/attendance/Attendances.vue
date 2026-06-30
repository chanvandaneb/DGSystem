<script setup lang="ts">
import { h, ref, computed, onMounted } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { Download } from 'lucide-vue-next'
import { api } from '@/lib/api'
import { downloadCsv } from '@/lib/csv'
import PageHeader from '@/components/layout/PageHeader.vue'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
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

const records = ref<AttendanceRecord[]>([])
const employeeFilter = ref('')
const dateFrom = ref('')
const dateTo = ref('')

const filtered = computed(() =>
  records.value.filter((r) => {
    if (employeeFilter.value && !r.name.toLowerCase().includes(employeeFilter.value.toLowerCase())) return false
    if (dateFrom.value && r.date < dateFrom.value) return false
    if (dateTo.value && r.date > dateTo.value) return false
    return true
  }),
)

function clearFilters() {
  employeeFilter.value = ''
  dateFrom.value = ''
  dateTo.value = ''
}

function exportCsv() {
  downloadCsv('attendances.csv', filtered.value)
}

const columns: ColumnDef<AttendanceRecord, any>[] = [
  { accessorKey: 'department', header: 'Department' },
  { accessorKey: 'eid', header: 'EID' },
  { accessorKey: 'name', header: 'Name', cell: ({ row }) => h('span', { class: 'font-medium' }, row.original.name) },
  { accessorKey: 'date', header: 'Date' },
  { accessorKey: 'checkIn', header: 'Check in' },
  { accessorKey: 'checkOut', header: 'Check out', cell: ({ row }) => row.original.checkOut ?? '-' },
  { accessorKey: 'breaks', header: 'Breaks' },
  { accessorKey: 'workingDuration', header: 'Working duration' },
  { accessorKey: 'breakDuration', header: 'Break duration' },
  { accessorKey: 'workingHours', header: 'Working hours' },
  {
    id: 'status',
    header: 'Status',
    cell: ({ row }) =>
      h(Badge, { variant: row.original.checkOut ? 'success' : 'warning' }, () => (row.original.checkOut ? 'Complete' : 'In progress')),
  },
]

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

  <Card>
    <CardContent class="pt-6">
      <div class="mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Input v-model="dateFrom" type="date" placeholder="From date" />
        <Input v-model="dateTo" type="date" placeholder="To date" />
        <Input v-model="employeeFilter" placeholder="Employee name" />
        <Button variant="outline" @click="clearFilters">Clear</Button>
      </div>

      <DataTable :columns="columns" :data="filtered" search-placeholder="Search records..." />
    </CardContent>
  </Card>
</template>
