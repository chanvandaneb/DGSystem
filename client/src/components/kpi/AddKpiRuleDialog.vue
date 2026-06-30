<script setup lang="ts">
import { reactive, watch, computed } from 'vue'
import { VisuallyHidden, DialogTitle } from 'reka-ui'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface KpiRuleInput {
  name: string
  category: string
  points: number
  description: string
}

interface KpiRuleWithId extends KpiRuleInput {
  id: string
}

const props = defineProps<{ rule?: KpiRuleWithId | null }>()
const open = defineModel<boolean>('open', { default: false })
const emit = defineEmits<{ create: [KpiRuleInput]; update: [string, KpiRuleInput] }>()

const isEdit = computed(() => !!props.rule)

const blank = () => ({ name: '', category: '', points: '5', description: '' })
const form = reactive(blank())

watch(open, (isOpen) => {
  if (isOpen) {
    Object.assign(form, props.rule ? { ...props.rule, points: String(props.rule.points) } : blank())
  }
})

function submit() {
  const payload = { ...form, points: Number(form.points) || 0 }
  if (isEdit.value && props.rule) {
    emit('update', props.rule.id, payload)
  } else {
    emit('create', payload)
  }
  open.value = false
}
</script>

<template>
  <Dialog v-model:open="open">
    <DialogContent class="max-w-md p-6">
      <VisuallyHidden as-child>
        <DialogTitle>{{ isEdit ? 'Edit KPI rule' : 'Add KPI rule' }}</DialogTitle>
      </VisuallyHidden>
      <h2 class="mb-4 text-lg font-semibold">{{ isEdit ? 'Edit KPI rule' : 'Add KPI rule' }}</h2>
      <form class="space-y-3" @submit.prevent="submit">
        <div>
          <label class="text-sm text-muted-foreground">Rule name</label>
          <Input v-model="form.name" required class="mt-1" />
        </div>
        <div>
          <label class="text-sm text-muted-foreground">Category</label>
          <Input v-model="form.category" class="mt-1" />
        </div>
        <div>
          <label class="text-sm text-muted-foreground">Points</label>
          <Input v-model="form.points" type="number" class="mt-1" />
        </div>
        <div>
          <label class="text-sm text-muted-foreground">Description</label>
          <Input v-model="form.description" class="mt-1" />
        </div>
        <div class="mt-2 flex justify-end gap-2">
          <Button type="button" variant="outline" @click="open = false">Cancel</Button>
          <Button type="submit">{{ isEdit ? 'Save changes' : 'Create rule' }}</Button>
        </div>
      </form>
    </DialogContent>
  </Dialog>
</template>
