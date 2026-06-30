<script setup lang="ts">
import { h, ref, onMounted } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { api } from '@/lib/api'
import PageHeader from '@/components/layout/PageHeader.vue'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import DataTable from '@/components/data-table/DataTable.vue'

interface KpiScore {
  id: string
  reporter: string
  reportee: string
  totalReporterPts: number
  totalReporteePts: number
  avgScore: number
}

const scores = ref<KpiScore[]>([])

const columns: ColumnDef<KpiScore, any>[] = [
  { accessorKey: 'reporter', header: 'Reporter' },
  { accessorKey: 'reportee', header: 'Reportee', cell: ({ row }) => h('span', { class: 'font-medium' }, row.original.reportee) },
  { accessorKey: 'totalReporterPts', header: 'Reporter Pts' },
  { accessorKey: 'totalReporteePts', header: 'Reportee Pts' },
  {
    accessorKey: 'avgScore',
    header: 'Avg Score',
    cell: ({ row }) => h(Badge, {}, () => row.original.avgScore),
  },
]

onMounted(async () => {
  scores.value = await api.get<KpiScore[]>('/kpi/scores')
})
</script>

<template>
  <PageHeader title="KPI Report" description="Performance summary by reportee" />

  <Card>
    <CardContent class="pt-6">
      <DataTable :columns="columns" :data="scores" search-placeholder="Search report..." />
    </CardContent>
  </Card>
</template>
