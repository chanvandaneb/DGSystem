<script setup lang="ts">
import { h, ref, onMounted } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { Trash2, Pencil } from 'lucide-vue-next'
import { api } from '@/lib/api'
import { useToast } from '@/composables/useToast'
import { useAuthStore } from '@/stores/auth'
import PageHeader from '@/components/layout/PageHeader.vue'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import DataTable from '@/components/data-table/DataTable.vue'
import AddKpiRuleDialog from '@/components/kpi/AddKpiRuleDialog.vue'

const auth = useAuthStore()

interface KpiRule {
  id: string
  name: string
  category: string
  points: number
  description: string
}

const toast = useToast()
const rules = ref<KpiRule[]>([])
const addOpen = ref(false)
const editing = ref<KpiRule | null>(null)

function openCreate() {
  editing.value = null
  addOpen.value = true
}

function openEdit(rule: KpiRule) {
  editing.value = rule
  addOpen.value = true
}

async function createRule(input: Omit<KpiRule, 'id'>) {
  try {
    const created = await api.post<KpiRule>('/kpi/rules', input)
    rules.value = [created, ...rules.value]
    toast.success(`Rule "${created.name}" created`)
  } catch (e) {
    toast.error(e instanceof Error ? e.message : 'Failed to create rule')
  }
}

async function updateRule(id: string, input: Omit<KpiRule, 'id'>) {
  try {
    const updated = await api.put<KpiRule>(`/kpi/rules/${id}`, input)
    rules.value = rules.value.map((r) => (r.id === id ? updated : r))
    toast.success('Rule updated')
  } catch (e) {
    toast.error(e instanceof Error ? e.message : 'Failed to update rule')
  }
}

async function deleteRule(rule: KpiRule) {
  if (!confirm(`Delete rule "${rule.name}"?`)) return
  try {
    await api.delete(`/kpi/rules/${rule.id}`)
    rules.value = rules.value.filter((r) => r.id !== rule.id)
    toast.success('Rule deleted')
  } catch (e) {
    toast.error(e instanceof Error ? e.message : 'Failed to delete rule')
  }
}

const columns: ColumnDef<KpiRule, any>[] = [
  { accessorKey: 'name', header: 'Rule', cell: ({ row }) => h('span', { class: 'font-medium' }, row.original.name) },
  { accessorKey: 'category', header: 'Category', cell: ({ row }) => h(Badge, { variant: 'secondary' }, () => row.original.category) },
  { accessorKey: 'points', header: 'Points' },
  { accessorKey: 'description', header: 'Description' },
  ...(auth.isAdmin
    ? [
        {
          id: 'actions',
          header: '',
          cell: ({ row }: { row: { original: KpiRule } }) =>
            h('div', { class: 'flex items-center gap-1' }, [
              h(Button, { variant: 'ghost', size: 'icon', class: 'h-7 w-7', onClick: () => openEdit(row.original) }, () => h(Pencil, { class: 'h-3.5 w-3.5' })),
              h(Button, { variant: 'ghost', size: 'icon', class: 'h-7 w-7 text-destructive hover:text-destructive', onClick: () => deleteRule(row.original) }, () => h(Trash2, { class: 'h-3.5 w-3.5' })),
            ]),
        },
      ]
    : []),
]

onMounted(async () => {
  rules.value = await api.get<KpiRule[]>('/kpi/rules')
})
</script>

<template>
  <div class="flex items-start justify-between">
    <PageHeader title="KPI Rules" description="List of all kpi rules" />
    <Button v-if="auth.isAdmin" @click="openCreate">Add rule</Button>
  </div>

  <Card>
    <CardContent class="pt-6">
      <DataTable :columns="columns" :data="rules" search-placeholder="Search rules..." />
    </CardContent>
  </Card>

  <AddKpiRuleDialog v-model:open="addOpen" :rule="editing" @create="createRule" @update="updateRule" />
</template>
