<script setup lang="ts">
import { h, ref, onMounted } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { Download } from 'lucide-vue-next'
import { api } from '@/lib/api'
import { downloadCsv } from '@/lib/csv'
import PageHeader from '@/components/layout/PageHeader.vue'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import DataTable from '@/components/data-table/DataTable.vue'

interface ReportRow {
  department: string
  eid: string
  name: string
  breakCount: number
  totalHours: string
  totalBreaks: string
  totalWorks: string
}

const report = ref<ReportRow[]>([])
const month = ref('')
const employeeFilter = ref('')

const columns: ColumnDef<ReportRow, any>[] = [
  { accessorKey: 'department', header: 'Department' },
  { accessorKey: 'eid', header: 'Employee ID' },
  { accessorKey: 'name', header: 'Name', cell: ({ row }) => h('span', { class: 'font-medium' }, row.original.name) },
  { accessorKey: 'breakCount', header: 'No. of breaks' },
  { accessorKey: 'totalHours', header: 'Total Hours' },
  { accessorKey: 'totalBreaks', header: 'Total Breaks' },
  { accessorKey: 'totalWorks', header: 'Total Works' },
]

function clearFilters() {
  month.value = ''
  employeeFilter.value = ''
}

function exportCsv() {
  downloadCsv('attendance-report.csv', report.value)
}

onMounted(async () => {
  report.value = await api.get<ReportRow[]>('/attendance/report')
})
</script>

<template>
  <div class="flex items-start justify-between">
    <PageHeader title="Attendance Reports" description="View and analyze employee attendance records" />
    <Button @click="exportCsv">
      <Download class="h-4 w-4" />
      Export
    </Button>
  </div>

  <Card>
    <CardContent class="px-5 pt-5 pb-5">
      <div class="mb-4 flex flex-wrap gap-3">
        <Input v-model="month" type="month" class="max-w-[180px]" />
        <Input v-model="employeeFilter" placeholder="Employee name" class="max-w-xs" />
        <Button variant="outline" @click="clearFilters">Clear</Button>
      </div>

      <DataTable :columns="columns" :data="report" search-placeholder="Search report..." />
    </CardContent>
  </Card>
</template>
