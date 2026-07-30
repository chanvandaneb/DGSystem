<script setup lang="ts">
import { h, ref, computed, onMounted } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { api } from '@/lib/api'
import PageHeader from '@/components/layout/PageHeader.vue'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import DataTable from '@/components/data-table/DataTable.vue'

interface AttendanceBreak {
  id: string
  date: string
  department: string
  eid: string
  name: string
  checkIn: string
  breakIn: string
  breakOut: string
  checkOut: string | null
  durationBreak: string
  type: 'toilet' | 'mealbreak'
  reason: string
  notes: string
}

const breaks = ref<AttendanceBreak[]>([])
const employeeFilter = ref('')
const dateFrom = ref('')
const dateTo = ref('')

const filtered = computed(() =>
  breaks.value.filter((b) => {
    if (employeeFilter.value && !b.name.toLowerCase().includes(employeeFilter.value.toLowerCase())) return false
    if (dateFrom.value && b.date < dateFrom.value) return false
    if (dateTo.value && b.date > dateTo.value) return false
    return true
  }),
)

function clearFilters() {
  employeeFilter.value = ''
  dateFrom.value = ''
  dateTo.value = ''
}

const columns: ColumnDef<AttendanceBreak, any>[] = [
  { accessorKey: 'date', header: 'Date' },
  { accessorKey: 'department', header: 'Department' },
  { accessorKey: 'eid', header: 'Employee ID' },
  { accessorKey: 'name', header: 'Employee name', cell: ({ row }) => h('span', { class: 'font-medium' }, row.original.name) },
  { accessorKey: 'checkIn', header: 'Check in' },
  { accessorKey: 'breakIn', header: 'Break in' },
  { accessorKey: 'breakOut', header: 'Break out' },
  { accessorKey: 'durationBreak', header: 'Duration Break' },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => h(Badge, { variant: row.original.type === 'mealbreak' ? 'secondary' : 'outline' }, () => row.original.type),
  },
  { accessorKey: 'reason', header: 'Reason', cell: ({ row }) => row.original.reason || '-' },
  { accessorKey: 'notes', header: 'Notes', cell: ({ row }) => row.original.notes || '-' },
]

onMounted(async () => {
  breaks.value = await api.get<AttendanceBreak[]>('/attendance/breaks')
})
</script>

<template>
  <PageHeader title="Attendance Breaks" description="Schedule and manage employee breaks efficiently" />

  <Card>
    <CardContent class="px-5 pt-5 pb-5">
      <div class="mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Input v-model="dateFrom" type="date" />
        <Input v-model="dateTo" type="date" />
        <Input v-model="employeeFilter" placeholder="Employee name" />
        <Button variant="outline" @click="clearFilters">Clear</Button>
      </div>

      <DataTable :columns="columns" :data="filtered" search-placeholder="Search breaks..." />
    </CardContent>
  </Card>
</template>
