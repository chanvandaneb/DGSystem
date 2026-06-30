<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { LayoutGrid, List, LayoutPanelTop, Pin, FileText, Folder } from 'lucide-vue-next'
import { api } from '@/lib/api'
import PageHeader from '@/components/layout/PageHeader.vue'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select'

interface ArticleSummary {
  id: string
  title: string
  pinned: boolean
}

interface CategorySummary {
  slug: string
  name: string
  description: string
  count: number
  articles: ArticleSummary[]
}

const router = useRouter()
const categories = ref<CategorySummary[]>([])
const search = ref('')
const author = ref('')
const viewMode = ref<'grid' | 'list' | 'kanban'>('grid')

const filtered = computed(() =>
  categories.value.filter((c) => !search.value || c.name.toLowerCase().includes(search.value.toLowerCase())),
)

function clearFilters() {
  search.value = ''
  author.value = ''
}

function viewAll(slug: string) {
  router.push(`/knowledge/archive/${slug}`)
}

onMounted(async () => {
  categories.value = await api.get<CategorySummary[]>('/knowledge/categories')
})
</script>

<template>
  <PageHeader title="Knowledges" description="List of all knowledges" />

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

      <div :class="viewMode === 'list' ? 'flex flex-col gap-4' : 'grid gap-4 md:grid-cols-2 lg:grid-cols-3'">
        <Card v-for="c in filtered" :key="c.slug" class="overflow-hidden p-0">
          <div class="flex items-center justify-between bg-[#2563EB] px-4 py-3 text-white">
            <span class="flex items-center gap-2 font-medium">
              <Folder class="h-4 w-4" />
              {{ c.name }}
            </span>
            <span class="text-sm font-semibold">{{ c.count }}</span>
          </div>
          <CardContent class="space-y-2 p-4">
            <div v-for="a in c.articles" :key="a.id" class="flex items-center gap-2 text-sm">
              <Pin v-if="a.pinned" class="h-3.5 w-3.5 shrink-0 text-red-500" />
              <FileText v-else class="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              <span class="truncate">{{ a.title }}</span>
            </div>
            <p v-if="!c.articles.length" class="text-sm text-muted-foreground">No articles yet</p>
            <Button variant="outline" class="mt-2 w-full" @click="viewAll(c.slug)">View all</Button>
          </CardContent>
        </Card>
      </div>
    </CardContent>
  </Card>
</template>
