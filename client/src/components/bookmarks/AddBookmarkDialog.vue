<script setup lang="ts">
import { reactive, watch } from 'vue'
import { VisuallyHidden, DialogTitle } from 'reka-ui'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select'

interface BookmarkInput {
  title: string
  url: string
  categorySlug: string
}

const props = defineProps<{ categories: { slug: string; name: string }[]; defaultCategorySlug?: string }>()
const open = defineModel<boolean>('open', { default: false })
const emit = defineEmits<{ create: [BookmarkInput] }>()

const blank = (): BookmarkInput => ({ title: '', url: '', categorySlug: props.defaultCategorySlug ?? props.categories[0]?.slug ?? '' })
const form = reactive<BookmarkInput>(blank())

watch(open, (isOpen) => {
  if (isOpen) Object.assign(form, blank())
})

function submit() {
  emit('create', { ...form })
  open.value = false
}
</script>

<template>
  <Dialog v-model:open="open">
    <DialogContent class="max-w-md p-6">
      <VisuallyHidden as-child>
        <DialogTitle>Add bookmark</DialogTitle>
      </VisuallyHidden>
      <h2 class="mb-4 text-lg font-semibold">Add bookmark</h2>
      <form class="space-y-3" @submit.prevent="submit">
        <div>
          <label class="text-sm text-muted-foreground">Title</label>
          <Input v-model="form.title" required class="mt-1" />
        </div>
        <div>
          <label class="text-sm text-muted-foreground">URL</label>
          <Input v-model="form.url" type="url" placeholder="https://" required class="mt-1" />
        </div>
        <div>
          <label class="text-sm text-muted-foreground">Category</label>
          <Select v-model="form.categorySlug">
            <SelectTrigger class="mt-1 w-full" />
            <SelectContent>
              <SelectItem v-for="c in categories" :key="c.slug" :value="c.slug">{{ c.name }}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div class="mt-2 flex justify-end gap-2">
          <Button type="button" variant="outline" @click="open = false">Cancel</Button>
          <Button type="submit">Add bookmark</Button>
        </div>
      </form>
    </DialogContent>
  </Dialog>
</template>
