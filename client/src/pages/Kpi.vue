<script setup lang="ts">
import { h, ref, computed, onMounted } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { useRouter } from 'vue-router'
import { Check, X } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import { useToast } from '@/composables/useToast'
import { api } from '@/lib/api'
import PageHeader from '@/components/layout/PageHeader.vue'
import { Card, CardContent } from '@/components/ui/card'
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

onMounted(async () => {
  entries.value = await api.get<KpiEntry[]>('/kpi')
})
</script>

<template>
  <div class="flex items-start justify-between">
    <PageHeader title="KPI" :description="auth.isAdmin ? 'List of all kpi' : 'Your kpi entries'" />
    <Button v-if="auth.isAdmin" @click="router.push('/kpi/rule')">Add rule</Button>
  </div>

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
