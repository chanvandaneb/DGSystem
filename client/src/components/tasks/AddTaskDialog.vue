<script setup lang="ts">
import { reactive, watch, computed } from 'vue'
import { VisuallyHidden, DialogTitle } from 'reka-ui'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select'

type TaskPriority = 'Low' | 'Medium' | 'High' | 'Urgent'
type TaskProgress = 'Todo' | 'Doing' | 'Done'

interface TaskInput {
  subject: string
  priority: TaskPriority
  category: string
  progress: TaskProgress
  start: string
  end: string
  assignee: string
  author: string
}

interface TaskWithId extends TaskInput {
  id: string
}

const props = defineProps<{ task?: TaskWithId | null }>()
const open = defineModel<boolean>('open', { default: false })
const emit = defineEmits<{ create: [TaskInput]; update: [string, TaskInput] }>()

const isEdit = computed(() => !!props.task)

const blank = (): TaskInput => ({
  subject: '',
  priority: 'Medium',
  category: '',
  progress: 'Todo',
  start: '',
  end: '',
  assignee: '',
  author: '',
})

const form = reactive<TaskInput>(blank())

watch(open, (isOpen) => {
  if (isOpen) Object.assign(form, props.task ?? blank())
})

function submit() {
  if (isEdit.value && props.task) {
    emit('update', props.task.id, { ...form })
  } else {
    emit('create', { ...form })
  }
  open.value = false
}
</script>

<template>
  <Dialog v-model:open="open">
    <DialogContent class="max-w-lg p-6">
      <VisuallyHidden as-child>
        <DialogTitle>{{ isEdit ? 'Edit task' : 'Add task' }}</DialogTitle>
      </VisuallyHidden>
      <h2 class="mb-4 text-lg font-semibold">{{ isEdit ? 'Edit task' : 'Add task' }}</h2>
      <form class="grid gap-3 sm:grid-cols-2" @submit.prevent="submit">
        <div class="sm:col-span-2">
          <label class="text-sm text-muted-foreground">Subject</label>
          <Input v-model="form.subject" required class="mt-1" />
        </div>
        <div>
          <label class="text-sm text-muted-foreground">Priority</label>
          <Select v-model="form.priority">
            <SelectTrigger class="mt-1 w-full" />
            <SelectContent>
              <SelectItem v-for="p in ['Low', 'Medium', 'High', 'Urgent']" :key="p" :value="p">{{ p }}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label class="text-sm text-muted-foreground">Progress</label>
          <Select v-model="form.progress">
            <SelectTrigger class="mt-1 w-full" />
            <SelectContent>
              <SelectItem v-for="p in ['Todo', 'Doing', 'Done']" :key="p" :value="p">{{ p }}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label class="text-sm text-muted-foreground">Category</label>
          <Input v-model="form.category" class="mt-1" />
        </div>
        <div>
          <label class="text-sm text-muted-foreground">Assignee</label>
          <Input v-model="form.assignee" class="mt-1" />
        </div>
        <div>
          <label class="text-sm text-muted-foreground">Start</label>
          <Input v-model="form.start" type="date" class="mt-1" />
        </div>
        <div>
          <label class="text-sm text-muted-foreground">End</label>
          <Input v-model="form.end" type="date" class="mt-1" />
        </div>
        <div class="sm:col-span-2">
          <label class="text-sm text-muted-foreground">Author</label>
          <Input v-model="form.author" class="mt-1" />
        </div>

        <div class="mt-2 flex justify-end gap-2 sm:col-span-2">
          <Button type="button" variant="outline" @click="open = false">Cancel</Button>
          <Button type="submit">{{ isEdit ? 'Save changes' : 'Create task' }}</Button>
        </div>
      </form>
    </DialogContent>
  </Dialog>
</template>
