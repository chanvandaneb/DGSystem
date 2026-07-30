<script setup lang="ts">
import { h, ref, computed, onMounted } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { Circle, Trash2, Pencil, ClipboardList, CheckCircle2, Loader, AlertCircle } from 'lucide-vue-next'
import { api } from '@/lib/api'
import { useToast } from '@/composables/useToast'
import PageHeader from '@/components/layout/PageHeader.vue'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import DataTable from '@/components/data-table/DataTable.vue'
import AddTaskDialog from '@/components/tasks/AddTaskDialog.vue'
import TaskKanban from '@/components/tasks/TaskKanban.vue'

type TaskPriority = 'Low' | 'Medium' | 'High' | 'Urgent'
type TaskProgress = 'Todo' | 'Doing' | 'Done'

interface Task {
  id: string
  subject: string
  priority: TaskPriority
  category: string
  progress: TaskProgress
  start: string
  end: string
  viewable: string
  author: string
  assignee: string
}

function dueDaysLeft(end: string): number | null {
  if (!end) return null
  const diff = new Date(end).getTime() - Date.now()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

function dueBadge(end: string, progress: string): { label: string; variant: 'destructive' | 'warning' | 'success' | 'secondary' } | null {
  if (progress === 'Done') return null
  const days = dueDaysLeft(end)
  if (days === null) return null
  if (days < 0) return { label: `${Math.abs(days)}d overdue`, variant: 'destructive' }
  if (days === 0) return { label: 'Due today', variant: 'warning' }
  if (days <= 3) return { label: `${days}d left`, variant: 'warning' }
  return { label: `${days}d left`, variant: 'secondary' }
}

const toast = useToast()
const tasks = ref<Task[]>([])
const search = ref('')
const addOpen = ref(false)
const editing = ref<Task | null>(null)
const activeTab = ref<'table' | 'kanban' | 'gantt' | 'calendar'>('table')
const priorityFilter = ref<Set<TaskPriority>>(new Set())
const progressFilter = ref<Set<TaskProgress>>(new Set())
const selectedIds = ref<string[]>([])
const bulkDeleting = ref(false)

const priorities: { label: TaskPriority; color: string }[] = [
  { label: 'Low', color: 'text-emerald-500' },
  { label: 'Medium', color: 'text-blue-500' },
  { label: 'High', color: 'text-amber-500' },
  { label: 'Urgent', color: 'text-red-500' },
]

const progresses: { label: TaskProgress; color: string }[] = [
  { label: 'Todo', color: 'text-red-500' },
  { label: 'Doing', color: 'text-blue-500' },
  { label: 'Done', color: 'text-emerald-500' },
]

const priorityVariant: Record<TaskPriority, 'secondary' | 'warning' | 'destructive'> = {
  Low: 'secondary',
  Medium: 'secondary',
  High: 'warning',
  Urgent: 'destructive',
}

const progressVariant: Record<TaskProgress, 'destructive' | 'warning' | 'success'> = {
  Todo: 'destructive',
  Doing: 'warning',
  Done: 'success',
}

function toggle(set: Set<string>, value: string) {
  if (set.has(value)) set.delete(value)
  else set.add(value)
}

const filtered = computed(() =>
  tasks.value.filter((t) => {
    if (search.value && !t.subject.toLowerCase().includes(search.value.toLowerCase())) return false
    if (priorityFilter.value.size && !priorityFilter.value.has(t.priority)) return false
    if (progressFilter.value.size && !progressFilter.value.has(t.progress)) return false
    return true
  }),
)

function clearFilters() {
  search.value = ''
  priorityFilter.value = new Set()
  progressFilter.value = new Set()
}

function openCreate() {
  editing.value = null
  addOpen.value = true
}

function openEdit(task: Task) {
  editing.value = task
  addOpen.value = true
}

async function createTask(input: Omit<Task, 'id' | 'viewable'>) {
  try {
    const created = await api.post<Task>('/tasks', { ...input, viewable: 'TEAM: DES' })
    tasks.value = [created, ...tasks.value]
    toast.success(`Task "${created.subject}" created`)
  } catch (e) {
    toast.error(e instanceof Error ? e.message : 'Failed to create task')
  }
}

async function updateTask(id: string, input: Omit<Task, 'id' | 'viewable'>) {
  try {
    const updated = await api.put<Task>(`/tasks/${id}`, input)
    tasks.value = tasks.value.map((t) => (t.id === id ? updated : t))
    toast.success('Task updated')
  } catch (e) {
    toast.error(e instanceof Error ? e.message : 'Failed to update task')
  }
}

async function moveTask(id: string, progress: TaskProgress) {
  const existing = tasks.value.find((t) => t.id === id)
  if (!existing || existing.progress === progress) return
  try {
    const updated = await api.put<Task>(`/tasks/${id}`, { progress })
    tasks.value = tasks.value.map((t) => (t.id === id ? updated : t))
    toast.success(`Moved "${updated.subject}" to ${progress}`)
  } catch (e) {
    toast.error(e instanceof Error ? e.message : 'Failed to move task')
  }
}

async function deleteTask(task: Task) {
  if (!confirm(`Delete task "${task.subject}"?`)) return
  try {
    await api.delete(`/tasks/${task.id}`)
    tasks.value = tasks.value.filter((t) => t.id !== task.id)
    toast.success('Task deleted')
  } catch (e) {
    toast.error(e instanceof Error ? e.message : 'Failed to delete task')
  }
}

async function bulkDelete() {
  if (!selectedIds.value.length) return
  if (!confirm(`Delete ${selectedIds.value.length} selected task(s)?`)) return
  bulkDeleting.value = true
  try {
    await api.post('/tasks/bulk-delete', { ids: selectedIds.value })
    tasks.value = tasks.value.filter((t) => !selectedIds.value.includes(t.id))
    toast.success(`${selectedIds.value.length} task(s) deleted`)
    selectedIds.value = []
  } catch (e) {
    toast.error(e instanceof Error ? e.message : 'Bulk delete failed')
  } finally {
    bulkDeleting.value = false
  }
}

const columns: ColumnDef<Task, any>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'subject', header: 'Subject', cell: ({ row }) => h('span', { class: 'font-medium' }, row.original.subject) },
  {
    accessorKey: 'priority',
    header: 'Priority',
    cell: ({ row }) => h(Badge, { variant: priorityVariant[row.original.priority as TaskPriority] }, () => row.original.priority),
  },
  { accessorKey: 'category', header: 'Category' },
  {
    accessorKey: 'progress',
    header: 'Progress',
    cell: ({ row }) => h(Badge, { variant: progressVariant[row.original.progress as TaskProgress] }, () => row.original.progress),
  },
  { accessorKey: 'start', header: 'Start' },
  {
    accessorKey: 'end',
    header: 'Due',
    cell: ({ row }) => {
      const badge = dueBadge(row.original.end, row.original.progress)
      return h('div', { class: 'flex flex-col gap-0.5' }, [
        h('span', { class: 'text-xs text-muted-foreground' }, row.original.end || '-'),
        badge ? h(Badge, { variant: badge.variant, class: 'text-[10px] w-fit px-1.5 py-0' }, () => badge.label) : null,
      ])
    },
  },
  { accessorKey: 'viewable', header: 'Viewable', cell: ({ row }) => h('span', { class: 'text-[#2563EB]' }, row.original.viewable) },
  { accessorKey: 'author', header: 'Author', cell: ({ row }) => row.original.author || '-' },
  {
    id: 'actions',
    header: '',
    cell: ({ row }) =>
      h('div', { class: 'flex items-center gap-1' }, [
        h(Button, { variant: 'outline', size: 'icon', class: 'h-7 w-7', onClick: () => openEdit(row.original) }, () => h(Pencil, { class: 'h-3.5 w-3.5' })),
        h(Button, { variant: 'outline', size: 'icon', class: 'h-7 w-7 text-destructive hover:text-destructive hover:border-destructive', onClick: () => deleteTask(row.original) }, () => h(Trash2, { class: 'h-3.5 w-3.5' })),
      ]),
  },
]

onMounted(async () => {
  tasks.value = await api.get<Task[]>('/tasks')
})
</script>

<template>
  <div class="flex items-start justify-between">
    <PageHeader title="Tasks" description="List of all tasks" />
    <Button @click="openCreate">Add task</Button>
  </div>

  <!-- Stats row -->
  <div class="grid gap-3 sm:grid-cols-4 mb-2">
    <Card class="border-0 bg-gradient-to-br from-[#2563EB] to-[#4F46E5] text-white shadow-md">
      <CardContent class="flex items-center gap-3 pt-4 pb-4">
        <ClipboardList class="h-7 w-7 text-white/60 shrink-0" />
        <div>
          <p class="text-2xl font-bold">{{ tasks.length }}</p>
          <p class="text-xs text-white/70">Total Tasks</p>
        </div>
      </CardContent>
    </Card>
    <Card class="border-0 bg-gradient-to-br from-rose-500 to-red-600 text-white shadow-md">
      <CardContent class="flex items-center gap-3 pt-4 pb-4">
        <AlertCircle class="h-7 w-7 text-white/60 shrink-0" />
        <div>
          <p class="text-2xl font-bold">{{ tasks.filter(t => t.progress === 'Todo').length }}</p>
          <p class="text-xs text-white/70">Todo</p>
        </div>
      </CardContent>
    </Card>
    <Card class="border-0 bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-md">
      <CardContent class="flex items-center gap-3 pt-4 pb-4">
        <Loader class="h-7 w-7 text-white/60 shrink-0" />
        <div>
          <p class="text-2xl font-bold">{{ tasks.filter(t => t.progress === 'Doing').length }}</p>
          <p class="text-xs text-white/70">In Progress</p>
        </div>
      </CardContent>
    </Card>
    <Card class="border-0 bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md">
      <CardContent class="flex items-center gap-3 pt-4 pb-4">
        <CheckCircle2 class="h-7 w-7 text-white/60 shrink-0" />
        <div>
          <p class="text-2xl font-bold">{{ tasks.filter(t => t.progress === 'Done').length }}</p>
          <p class="text-xs text-white/70">Completed</p>
        </div>
      </CardContent>
    </Card>
  </div>

  <div class="grid gap-4 lg:grid-cols-[220px_1fr]">
    <div class="space-y-4">
      <Card>
        <CardContent class="space-y-2 pt-6">
          <p class="text-sm font-semibold">Priority</p>
          <button
            v-for="p in priorities"
            :key="p.label"
            type="button"
            class="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-accent"
            :class="priorityFilter.has(p.label) && 'bg-accent'"
            @click="toggle(priorityFilter, p.label)"
          >
            <Circle :class="['h-3 w-3 fill-current', p.color]" />
            {{ p.label }}
          </button>
        </CardContent>
      </Card>

      <Card>
        <CardContent class="space-y-2 pt-6">
          <p class="text-sm font-semibold">Progress</p>
          <button
            v-for="p in progresses"
            :key="p.label"
            type="button"
            class="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-accent"
            :class="progressFilter.has(p.label) && 'bg-accent'"
            @click="toggle(progressFilter, p.label)"
          >
            <Circle :class="['h-3 w-3 fill-current', p.color]" />
            {{ p.label }}
          </button>
        </CardContent>
      </Card>
    </div>

    <Card>
      <CardContent class="pt-6">
        <div class="mb-4 flex items-center gap-1 border-b border-border">
          <button
            v-for="tab in [['table', 'Table'], ['kanban', 'Kanban'], ['gantt', 'Ganttchart'], ['calendar', 'Calendar']] as const"
            :key="tab[0]"
            type="button"
            class="px-3 py-2 text-sm font-medium transition-colors"
            :class="activeTab === tab[0] ? 'border-b-2 border-[#2563EB] text-[#2563EB]' : 'text-muted-foreground hover:text-foreground'"
            @click="activeTab = tab[0]"
          >
            {{ tab[1] }}
          </button>
        </div>

        <div v-if="activeTab === 'table'">
          <div class="mb-4 flex items-center gap-3">
            <Input v-model="search" placeholder="Search by..." class="max-w-xs" />
            <Button variant="outline" @click="clearFilters">Clear</Button>
            <div v-if="selectedIds.length" class="ml-auto flex items-center gap-2">
              <span class="text-sm text-muted-foreground">{{ selectedIds.length }} selected</span>
              <Button variant="destructive" size="sm" :disabled="bulkDeleting" @click="bulkDelete">
                <Trash2 class="h-3.5 w-3.5" />
                {{ bulkDeleting ? 'Deleting...' : 'Delete selected' }}
              </Button>
            </div>
          </div>
          <DataTable
            :columns="columns"
            :data="filtered"
            search-placeholder="Search tasks..."
            selectable
            :row-id="(row: Task) => row.id"
            v-model:selected-ids="selectedIds"
          />
        </div>
        <div v-else-if="activeTab === 'kanban'">
          <TaskKanban :tasks="filtered" @move="moveTask" @edit="openEdit" />
        </div>
        <div v-else class="flex h-64 items-center justify-center text-sm text-muted-foreground">
          {{ activeTab === 'gantt' ? 'Gantt chart' : 'Calendar' }} view coming soon.
        </div>
      </CardContent>
    </Card>
  </div>

  <AddTaskDialog v-model:open="addOpen" :task="editing" @create="createTask" @update="updateTask" />
</template>
