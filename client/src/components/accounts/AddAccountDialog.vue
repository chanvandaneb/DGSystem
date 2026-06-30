<script setup lang="ts">
import { reactive } from 'vue'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { VisuallyHidden, DialogTitle } from 'reka-ui'

interface AccountInput {
  name: string
  link: string
  email: string
  username: string
  password: string
  pin: string
  expired: string
  notes: string
  category: string
  viewable: string
  team: string
  author: string
}

const open = defineModel<boolean>('open', { default: false })
const emit = defineEmits<{ create: [AccountInput] }>()

const blank = (): AccountInput => ({
  name: '',
  link: '',
  email: '',
  username: '',
  password: '',
  pin: '',
  expired: '',
  notes: '',
  category: '',
  viewable: 'TEAM: DES',
  team: '',
  author: '',
})

const form = reactive<AccountInput>(blank())

function submit() {
  emit('create', { ...form })
  Object.assign(form, blank())
  open.value = false
}
</script>

<template>
  <Dialog v-model:open="open">
    <DialogContent class="max-w-lg p-6">
      <VisuallyHidden as-child>
        <DialogTitle>Add account</DialogTitle>
      </VisuallyHidden>
      <h2 class="mb-4 text-lg font-semibold">Add account</h2>
      <form class="grid max-h-[70vh] gap-3 overflow-y-auto pr-1 sm:grid-cols-2" @submit.prevent="submit">
        <div class="sm:col-span-2">
          <label class="text-sm text-muted-foreground">Name</label>
          <Input v-model="form.name" required class="mt-1" />
        </div>
        <div>
          <label class="text-sm text-muted-foreground">Username</label>
          <Input v-model="form.username" class="mt-1" />
        </div>
        <div>
          <label class="text-sm text-muted-foreground">Password</label>
          <Input v-model="form.password" class="mt-1" />
        </div>
        <div>
          <label class="text-sm text-muted-foreground">Email</label>
          <Input v-model="form.email" class="mt-1" />
        </div>
        <div>
          <label class="text-sm text-muted-foreground">PIN</label>
          <Input v-model="form.pin" class="mt-1" />
        </div>
        <div class="sm:col-span-2">
          <label class="text-sm text-muted-foreground">Account link</label>
          <Input v-model="form.link" class="mt-1" />
        </div>
        <div>
          <label class="text-sm text-muted-foreground">Category</label>
          <Input v-model="form.category" class="mt-1" />
        </div>
        <div>
          <label class="text-sm text-muted-foreground">Expired</label>
          <Input v-model="form.expired" type="date" class="mt-1" />
        </div>
        <div>
          <label class="text-sm text-muted-foreground">Team</label>
          <Input v-model="form.team" class="mt-1" />
        </div>
        <div>
          <label class="text-sm text-muted-foreground">Author</label>
          <Input v-model="form.author" class="mt-1" />
        </div>
        <div class="sm:col-span-2">
          <label class="text-sm text-muted-foreground">Notes</label>
          <Input v-model="form.notes" class="mt-1" />
        </div>

        <div class="mt-2 flex justify-end gap-2 sm:col-span-2">
          <Button type="button" variant="outline" @click="open = false">Cancel</Button>
          <Button type="submit">Create account</Button>
        </div>
      </form>
    </DialogContent>
  </Dialog>
</template>
