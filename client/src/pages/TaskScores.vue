<script setup lang="ts">
import { h, ref, computed, onMounted } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { api } from '@/lib/api'
import PageHeader from '@/components/layout/PageHeader.vue'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select'
import DataTable from '@/components/data-table/DataTable.vue'

interface TaskScore {
  id: string
  taskId: string
  subject: string
  assignee: string
  category: string
  month: string
  authorScore: number | null
  leaderScore: number | null
  average: number | null
}

const scores = ref<TaskScore[]>([])
const employeeFilter = ref('')

const assignees = computed(() => Array.from(new Set(scores.value.map((s) => s.assignee).filter(Boolean))))

const filtered = computed(() =>
  scores.value.filter((s) => !employeeFilter.value || employeeFilter.value === 'all' || s.assignee === employeeFilter.value),
)

function clearFilters() {
  employeeFilter.value = ''
}

const columns: ColumnDef<TaskScore, any>[] = [
  { accessorKey: 'taskId', header: 'ID' },
  { accessorKey: 'subject', header: 'Subject', cell: ({ row }) => h('span', { class: 'font-medium' }, row.original.subject) },
  { accessorKey: 'assignee', header: 'Assignee', cell: ({ row }) => row.original.assignee || '-' },
  { accessorKey: 'category', header: 'Category' },
  { accessorKey: 'month', header: 'Month' },
  { accessorKey: 'authorScore', header: 'Author Score', cell: ({ row }) => row.original.authorScore ?? '-' },
  { accessorKey: 'leaderScore', header: 'Leader Score', cell: ({ row }) => row.original.leaderScore ?? '-' },
  {
    accessorKey: 'average',
    header: 'Average',
    cell: ({ row }) =>
      h('span', { class: 'inline-flex h-5 w-5 items-center justify-center rounded-full border border-border text-[10px]' }, row.original.average ?? ''),
  },
]

onMounted(async () => {
  scores.value = await api.get<TaskScore[]>('/tasks/scores')
})
</script>

<template>
  <PageHeader title="Tasks" description="List of all tasks" />

  <Card>
    <CardContent class="pt-6">
      <div class="mb-4 flex items-center justify-end gap-3">
        <Select v-model="employeeFilter">
          <SelectTrigger class="w-48" placeholder="Employee" />
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem v-for="a in assignees" :key="a" :value="a">{{ a }}</SelectItem>
          </SelectContent>
        </Select>
        <Button>Search</Button>
        <Button variant="outline" @click="clearFilters">Clear</Button>
      </div>

      <DataTable :columns="columns" :data="filtered" search-placeholder="Search scores..." />
    </CardContent>
  </Card>
</template>
