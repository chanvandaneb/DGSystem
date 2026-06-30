<script setup lang="ts">
import { ref } from 'vue'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

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
  assignee: string
  viewable: string
  author: string
}

const props = defineProps<{ tasks: Task[] }>()
const emit = defineEmits<{ move: [string, TaskProgress]; edit: [Task] }>()

const columns: { key: TaskProgress; label: string; tone: string }[] = [
  { key: 'Todo', label: 'Todo', tone: 'border-t-red-400' },
  { key: 'Doing', label: 'Doing', tone: 'border-t-blue-400' },
  { key: 'Done', label: 'Done', tone: 'border-t-emerald-400' },
]

const priorityVariant: Record<TaskPriority, 'secondary' | 'warning' | 'destructive'> = {
  Low: 'secondary',
  Medium: 'secondary',
  High: 'warning',
  Urgent: 'destructive',
}

const dragId = ref<string | null>(null)
const overColumn = ref<TaskProgress | null>(null)

function onDragStart(task: Task) {
  dragId.value = task.id
}
function onDragEnd() {
  dragId.value = null
  overColumn.value = null
}
function onDrop(progress: TaskProgress) {
  if (dragId.value) emit('move', dragId.value, progress)
  onDragEnd()
}

function tasksFor(progress: TaskProgress) {
  return props.tasks.filter((t) => t.progress === progress)
}
</script>

<template>
  <div class="grid gap-4 md:grid-cols-3">
    <div
      v-for="col in columns"
      :key="col.key"
      class="rounded-lg border border-border bg-muted/40 p-3"
      :class="overColumn === col.key && 'ring-2 ring-[#2563EB]/40'"
      @dragover.prevent="overColumn = col.key"
      @dragleave="overColumn = null"
      @drop="onDrop(col.key)"
    >
      <div class="mb-3 flex items-center justify-between px-1">
        <p class="text-sm font-semibold">{{ col.label }}</p>
        <Badge variant="outline">{{ tasksFor(col.key).length }}</Badge>
      </div>
      <div class="min-h-[120px] space-y-2">
        <Card
          v-for="t in tasksFor(col.key)"
          :key="t.id"
          draggable="true"
          class="cursor-grab border-t-2 p-0 active:cursor-grabbing"
          :class="`${col.tone} ${dragId === t.id ? 'opacity-50' : ''}`"
          @dragstart="onDragStart(t)"
          @dragend="onDragEnd"
          @click="emit('edit', t)"
        >
          <CardContent class="space-y-2 p-3">
            <p class="text-sm font-medium leading-snug">{{ t.subject }}</p>
            <div class="flex items-center justify-between">
              <Badge :variant="priorityVariant[t.priority]">{{ t.priority }}</Badge>
              <span class="text-xs text-muted-foreground">{{ t.category }}</span>
            </div>
            <p v-if="t.assignee" class="text-xs text-muted-foreground">Assignee: {{ t.assignee }}</p>
            <p v-if="t.end" class="text-xs text-muted-foreground">Due {{ t.end }}</p>
          </CardContent>
        </Card>
        <p v-if="!tasksFor(col.key).length" class="px-1 text-xs text-muted-foreground">Drop tasks here</p>
      </div>
    </div>
  </div>
</template>
