<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { LayoutGrid, List, LayoutPanelTop, ExternalLink, Folder, Plus, X } from 'lucide-vue-next'
import { api } from '@/lib/api'
import { useToast } from '@/composables/useToast'
import PageHeader from '@/components/layout/PageHeader.vue'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select'
import AddBookmarkDialog from '@/components/bookmarks/AddBookmarkDialog.vue'

interface BookmarkItem {
  id: string
  title: string
  url: string
}

interface CategorySummary {
  slug: string
  name: string
  count: number
  items: BookmarkItem[]
}

const toast = useToast()
const categories = ref<CategorySummary[]>([])
const search = ref('')
const author = ref('')
const viewMode = ref<'grid' | 'list' | 'kanban'>('grid')
const addOpen = ref(false)
const addCategorySlug = ref<string | undefined>(undefined)

const filtered = computed(() =>
  categories.value.filter((c) => !search.value || c.name.toLowerCase().includes(search.value.toLowerCase())),
)

function clearFilters() {
  search.value = ''
  author.value = ''
}

function openAdd(slug?: string) {
  addCategorySlug.value = slug
  addOpen.value = true
}

async function refreshCategories() {
  categories.value = await api.get<CategorySummary[]>('/bookmarks/categories')
}

async function createBookmark(input: { title: string; url: string; categorySlug: string }) {
  try {
    await api.post('/bookmarks', input)
    await refreshCategories()
    toast.success(`Bookmark "${input.title}" added`)
  } catch (e) {
    toast.error(e instanceof Error ? e.message : 'Failed to add bookmark')
  }
}

async function deleteBookmark(bookmark: BookmarkItem) {
  if (!confirm(`Remove bookmark "${bookmark.title}"?`)) return
  try {
    await api.delete(`/bookmarks/${bookmark.id}`)
    await refreshCategories()
    toast.success('Bookmark removed')
  } catch (e) {
    toast.error(e instanceof Error ? e.message : 'Failed to remove bookmark')
  }
}

onMounted(refreshCategories)
</script>

<template>
  <div class="flex items-start justify-between">
    <PageHeader title="Bookmarks" description="List of all bookmarks" />
    <Button @click="openAdd()">
      <Plus class="h-4 w-4" />
      Add bookmark
    </Button>
  </div>

  <Card>
    <CardContent class="pt-6">
      <div class="mb-4 flex flex-wrap items-center gap-3">
        <div class="flex items-center gap-1 rounded-md border border-input p-1">
          <Button :variant="viewMode === 'grid' ? 'secondary' : 'ghost'" size="icon" class="h-7 w-7" @click="viewMode = 'grid'">
            <LayoutGrid class="h-4 w-4" />
          </Button>
          <Button :variant="viewMode === 'list' ? 'secondary' : 'ghost'" size="icon" class="h-7 w-7" @click="viewMode = 'list'">
            <List class="h-4 w-4" />
          </Button>
          <Button :variant="viewMode === 'kanban' ? 'secondary' : 'ghost'" size="icon" class="h-7 w-7" @click="viewMode = 'kanban'">
            <LayoutPanelTop class="h-4 w-4" />
          </Button>
        </div>
        <Input v-model="search" placeholder="Search by..." class="max-w-xs" />
        <Select v-model="author">
          <SelectTrigger class="w-40" placeholder="Author" />
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" @click="clearFilters">Clear</Button>
      </div>

      <div :class="viewMode === 'list' ? 'flex flex-col gap-4' : 'grid gap-4 md:grid-cols-2 lg:grid-cols-4'">
        <Card v-for="c in filtered" :key="c.slug" class="overflow-hidden p-0">
          <div class="flex items-center justify-between bg-[#2563EB] px-4 py-3 text-white">
            <span class="flex items-center gap-2 font-medium">
              <Folder class="h-4 w-4" />
              {{ c.name }}
            </span>
            <span class="text-sm font-semibold">{{ c.count }}</span>
          </div>
          <CardContent class="space-y-2 p-4">
            <div v-for="b in c.items" :key="b.id" class="group flex items-center justify-between gap-2 text-sm">
              <a :href="b.url" target="_blank" rel="noopener noreferrer" class="flex-1 truncate hover:underline">
                {{ b.title }}
              </a>
              <ExternalLink class="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              <button
                type="button"
                class="hidden h-5 w-5 shrink-0 items-center justify-center rounded text-muted-foreground hover:bg-accent hover:text-destructive group-hover:flex"
                @click="deleteBookmark(b)"
              >
                <X class="h-3 w-3" />
              </button>
            </div>
            <p v-if="!c.items.length" class="text-sm text-muted-foreground">No bookmarks yet</p>
            <div class="mt-2 flex gap-2">
              <Button variant="outline" class="flex-1">View all</Button>
              <Button variant="outline" size="icon" @click="openAdd(c.slug)">
                <Plus class="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </CardContent>
  </Card>

  <AddBookmarkDialog
    v-model:open="addOpen"
    :categories="categories.map((c) => ({ slug: c.slug, name: c.name }))"
    :default-category-slug="addCategorySlug"
    @create="createBookmark"
  />
</template>
