<script setup lang="ts">
import { h, ref, computed, onMounted } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { useRouter } from 'vue-router'
import { api } from '@/lib/api'
import PageHeader from '@/components/layout/PageHeader.vue'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select'
import DataTable from '@/components/data-table/DataTable.vue'

const router = useRouter()

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
]

onMounted(async () => {
  entries.value = await api.get<KpiEntry[]>('/kpi')
})
</script>

<template>
  <div class="flex items-start justify-between">
    <PageHeader title="KPI" description="List of all kpi" />
    <Button @click="router.push('/kpi/rule')">Add rule</Button>
  </div>

  <Card>
    <CardContent class="pt-6">
      <div class="mb-4 flex flex-wrap items-center gap-3">
        <Input v-model="month" type="month" class="max-w-[160px]" />
        <Select v-model="userFilter">
          <SelectTrigger class="w-44" placeholder="User" />
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem v-for="u in users" :key="u" :value="u">{{ u }}</SelectItem>
          </SelectContent>
        </Select>
        <Button>Search</Button>
        <Button variant="outline" @click="clearFilters">Clear</Button>
      </div>

      <DataTable :columns="columns" :data="filtered" search-placeholder="Search kpi..." />
    </CardContent>
  </Card>
</template>
