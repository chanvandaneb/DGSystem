<script setup lang="ts">
import { h, ref, reactive, computed, onMounted, watch } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { Link2, ExternalLink, Copy, Pencil, Trash2, ImageOff } from 'lucide-vue-next'
import { api } from '@/lib/api'
import { useToast } from '@/composables/useToast'
import PageHeader from '@/components/layout/PageHeader.vue'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import DataTable from '@/components/data-table/DataTable.vue'

interface Account {
  id: string
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

const toast = useToast()
const accounts = ref<Account[]>([])
const search = ref('')
const selected = ref<Account | null>(null)
const activeTab = ref<'detail' | 'history'>('detail')
const saving = ref(false)
const selectedIds = ref<string[]>([])
const bulkDeleting = ref(false)

const form = reactive<Partial<Account>>({})

watch(selected, (a) => {
  Object.assign(form, a ?? {})
})

const filtered = computed(() =>
  accounts.value.filter((a) => !search.value || a.name.toLowerCase().includes(search.value.toLowerCase())),
)

function select(account: Account) {
  selected.value = account
  activeTab.value = 'detail'
}

function clearFilters() {
  search.value = ''
}

async function saveAccount() {
  if (!selected.value) return
  saving.value = true
  try {
    const updated = await api.put<Account>(`/accounts/${selected.value.id}`, form)
    accounts.value = accounts.value.map((a) => (a.id === updated.id ? updated : a))
    selected.value = updated
    toast.success('Account updated')
  } catch (e) {
    toast.error(e instanceof Error ? e.message : 'Failed to save account')
  } finally {
    saving.value = false
  }
}

async function deleteAccount(account: Account) {
  if (!confirm(`Delete "${account.name}"? This can't be undone.`)) return
  try {
    await api.delete(`/accounts/${account.id}`)
    accounts.value = accounts.value.filter((a) => a.id !== account.id)
    if (selected.value?.id === account.id) selected.value = null
    toast.success(`Account "${account.name}" deleted`)
  } catch (e) {
    toast.error(e instanceof Error ? e.message : 'Failed to delete account')
  }
}

async function bulkDelete() {
  if (!selectedIds.value.length) return
  if (!confirm(`Delete ${selectedIds.value.length} selected account(s)? This can't be undone.`)) return
  bulkDeleting.value = true
  try {
    await api.post('/accounts/bulk-delete', { ids: selectedIds.value })
    accounts.value = accounts.value.filter((a) => !selectedIds.value.includes(a.id))
    if (selected.value && selectedIds.value.includes(selected.value.id)) selected.value = null
    toast.success(`${selectedIds.value.length} account(s) deleted`)
    selectedIds.value = []
  } catch (e) {
    toast.error(e instanceof Error ? e.message : 'Bulk delete failed')
  } finally {
    bulkDeleting.value = false
  }
}

const columns: ColumnDef<Account, any>[] = [
  { accessorKey: 'id', header: 'ID' },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) =>
      h(
        'button',
        { class: 'font-medium text-left hover:underline', onClick: () => select(row.original) },
        row.original.name,
      ),
  },
  { accessorKey: 'username', header: 'Username' },
  {
    accessorKey: 'link',
    header: 'Link',
    cell: ({ row }) =>
      row.original.link
        ? h('a', { href: row.original.link, target: '_blank', rel: 'noopener noreferrer', class: 'text-[#2563EB] hover:underline' }, row.original.link)
        : '-',
  },
  {
    accessorKey: 'viewable',
    header: 'Viewable',
    cell: ({ row }) => h(Badge, { variant: 'secondary' }, () => row.original.viewable),
  },
  { accessorKey: 'author', header: 'Author' },
  {
    id: 'actions',
    header: 'Action',
    cell: ({ row }) =>
      h('div', { class: 'flex items-center gap-1' }, [
        h(Button, { variant: 'ghost', size: 'icon', class: 'h-7 w-7', onClick: () => row.original.link && window.open(row.original.link, '_blank') }, () => h(Link2, { class: 'h-3.5 w-3.5' })),
        h(Button, { variant: 'ghost', size: 'icon', class: 'h-7 w-7', onClick: () => select(row.original) }, () => h(ExternalLink, { class: 'h-3.5 w-3.5' })),
        h(Button, { variant: 'ghost', size: 'icon', class: 'h-7 w-7', onClick: () => navigator.clipboard.writeText(row.original.username) }, () => h(Copy, { class: 'h-3.5 w-3.5' })),
        h(Button, { variant: 'ghost', size: 'icon', class: 'h-7 w-7', onClick: () => select(row.original) }, () => h(Pencil, { class: 'h-3.5 w-3.5' })),
        h(Button, { variant: 'ghost', size: 'icon', class: 'h-7 w-7 text-destructive hover:text-destructive', onClick: () => deleteAccount(row.original) }, () => h(Trash2, { class: 'h-3.5 w-3.5' })),
      ]),
  },
]

onMounted(async () => {
  accounts.value = await api.get<Account[]>('/accounts')
})
</script>

<template>
  <PageHeader title="Accounts" description="Manage all system accounts" />

  <div class="grid gap-4 lg:grid-cols-[1fr_360px]">
    <Card>
      <CardContent class="pt-6">
        <div class="mb-4 flex flex-wrap items-center gap-3">
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
          search-placeholder="Search accounts..."
          selectable
          :row-id="(row: Account) => row.id"
          v-model:selected-ids="selectedIds"
        />
      </CardContent>
    </Card>

    <Card class="h-fit">
      <CardContent class="pt-6">
        <div class="mb-4 flex gap-1 rounded-md bg-muted p-1">
          <button
            type="button"
            :class="[
              'flex-1 rounded px-3 py-1.5 text-sm font-medium transition-colors',
              activeTab === 'detail' ? 'bg-background shadow-sm' : 'text-muted-foreground',
            ]"
            @click="activeTab = 'detail'"
          >
            Detail
          </button>
          <button
            type="button"
            :class="[
              'flex-1 rounded px-3 py-1.5 text-sm font-medium transition-colors',
              activeTab === 'history' ? 'bg-background shadow-sm' : 'text-muted-foreground',
            ]"
            @click="activeTab = 'history'"
          >
            History
          </button>
        </div>

        <div v-if="activeTab === 'detail'">
          <div v-if="!selected" class="py-10 text-center text-sm text-muted-foreground">
            Select an account to view or edit its details.
          </div>
          <div v-else class="space-y-3">
            <div>
              <label class="text-xs text-muted-foreground">Name</label>
              <Input v-model="form.name" class="mt-1" />
            </div>
            <div>
              <label class="text-xs text-muted-foreground">Account link</label>
              <Input v-model="form.link" class="mt-1" />
            </div>
            <div>
              <label class="text-xs text-muted-foreground">Email</label>
              <Input v-model="form.email" class="mt-1" />
            </div>
            <div>
              <label class="text-xs text-muted-foreground">Username</label>
              <Input v-model="form.username" class="mt-1" />
            </div>
            <div>
              <label class="text-xs text-muted-foreground">Password</label>
              <Input v-model="form.password" class="mt-1" />
            </div>
            <div>
              <label class="text-xs text-muted-foreground">PIN</label>
              <Input v-model="form.pin" class="mt-1" />
            </div>
            <div>
              <label class="text-xs text-muted-foreground">Expired</label>
              <Input v-model="form.expired" type="date" class="mt-1" />
            </div>
            <div>
              <label class="text-xs text-muted-foreground">Notes</label>
              <Input v-model="form.notes" class="mt-1" />
            </div>
            <div>
              <label class="text-xs text-muted-foreground">Category</label>
              <Input v-model="form.category" class="mt-1" />
            </div>
            <div>
              <label class="text-xs text-muted-foreground">Viewable</label>
              <Input v-model="form.viewable" class="mt-1" />
            </div>
            <div>
              <label class="text-xs text-muted-foreground">Team</label>
              <Input v-model="form.team" class="mt-1" />
            </div>
            <div>
              <label class="text-xs text-muted-foreground">Author</label>
              <Input v-model="form.author" class="mt-1" />
            </div>

            <div class="flex flex-col items-center justify-center gap-2 rounded-md border border-dashed border-border py-8 text-muted-foreground">
              <ImageOff class="h-6 w-6" />
              <span class="text-xs">No image</span>
            </div>

            <Button class="w-full" :disabled="saving" @click="saveAccount">
              {{ saving ? 'Saving...' : 'Save changes' }}
            </Button>
          </div>
        </div>

        <div v-else class="py-10 text-center text-sm text-muted-foreground">
          No history yet.
        </div>
      </CardContent>
    </Card>
  </div>
</template>
