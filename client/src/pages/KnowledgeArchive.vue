<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Folder, LayoutGrid, List } from 'lucide-vue-next'
import { api } from '@/lib/api'
import PageHeader from '@/components/layout/PageHeader.vue'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select'
import { initials } from '@/lib/initials'

interface Article {
  id: string
  title: string
  category: string
  author: string
  excerpt: string
}

interface CategoryDetail {
  slug: string
  name: string
  description: string
  articles: Article[]
}

interface CategoryListItem {
  slug: string
  name: string
}

const route = useRoute()
const router = useRouter()

const categories = ref<CategoryListItem[]>([])
const detail = ref<CategoryDetail | null>(null)
const search = ref('')
const viewMode = ref<'grid' | 'list'>('grid')
const page = ref(1)
const pageSize = ref(6)

const filteredArticles = computed(
  () => detail.value?.articles.filter((a) => !search.value || a.title.toLowerCase().includes(search.value.toLowerCase())) ?? [],
)

const totalPages = computed(() => Math.max(1, Math.ceil(filteredArticles.value.length / pageSize.value)))

const pagedArticles = computed(() => {
  const start = (page.value - 1) * pageSize.value
  return filteredArticles.value.slice(start, start + pageSize.value)
})

function clearFilters() {
  search.value = ''
  page.value = 1
}

function selectCategory(slug: string) {
  router.push(`/knowledge/archive/${slug}`)
}

async function loadCategory(slug: string) {
  detail.value = await api.get<CategoryDetail>(`/knowledge/categories/${slug}`)
  page.value = 1
}

watch(
  () => route.params.category,
  (slug) => {
    if (typeof slug === 'string') loadCategory(slug)
  },
)

onMounted(async () => {
  categories.value = await api.get<CategoryListItem[]>('/knowledge/categories')
  const slug = route.params.category
  if (typeof slug === 'string') await loadCategory(slug)
})
</script>

<template>
  <PageHeader title="Knowledge archive" description="List of all knowledge archive" />

  <div class="grid gap-4 lg:grid-cols-[280px_1fr]">
    <Card class="h-fit">
      <CardContent class="pt-6">
        <p class="mb-3 flex items-center gap-2 text-sm font-semibold">
          <Folder class="h-4 w-4 text-[#2563EB]" />
          CATEGORIES
        </p>
        <div class="max-h-[60vh] space-y-1 overflow-y-auto">
          <button
            v-for="c in categories"
            :key="c.slug"
            type="button"
            :class="[
              'block w-full rounded-md px-3 py-2 text-left text-sm transition-colors',
              c.slug === route.params.category
                ? 'bg-[#2563EB] font-medium text-white'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
            ]"
            @click="selectCategory(c.slug)"
          >
            {{ c.name }}
          </button>
        </div>
      </CardContent>
    </Card>

    <Card v-if="detail">
      <CardContent class="pt-6">
        <h2 class="text-xl font-semibold">{{ detail.name }}</h2>
        <p class="text-sm text-muted-foreground">{{ detail.description }}</p>

        <div class="my-4 flex flex-wrap items-center gap-3">
          <Input v-model="search" placeholder="Search by..." class="max-w-sm" />
          <Button variant="outline" @click="clearFilters">Clear</Button>
          <div class="ml-auto flex items-center gap-1 rounded-md border border-input p-1">
            <Button :variant="viewMode === 'grid' ? 'secondary' : 'ghost'" size="icon" class="h-7 w-7" @click="viewMode = 'grid'">
              <LayoutGrid class="h-4 w-4" />
            </Button>
            <Button :variant="viewMode === 'list' ? 'secondary' : 'ghost'" size="icon" class="h-7 w-7" @click="viewMode = 'list'">
              <List class="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div :class="viewMode === 'list' ? 'flex flex-col gap-4' : 'grid gap-4 md:grid-cols-2 lg:grid-cols-3'">
          <Card v-for="a in pagedArticles" :key="a.id">
            <CardContent class="space-y-2 pt-6">
              <p class="font-medium leading-snug">{{ a.title }}</p>
              <Badge variant="outline">{{ a.category }}</Badge>
              <p class="line-clamp-3 text-sm text-muted-foreground">{{ a.excerpt }}</p>
              <div class="flex items-center justify-between border-t border-border pt-3">
                <div class="flex items-center gap-2">
                  <Avatar class="h-6 w-6 text-[10px]">{{ initials(a.author) }}</Avatar>
                  <span class="text-xs font-medium">{{ a.author }}</span>
                </div>
                <span class="text-xs text-[#2563EB]">viewmore</span>
              </div>
            </CardContent>
          </Card>
          <p v-if="!pagedArticles.length" class="text-sm text-muted-foreground">No articles found</p>
        </div>

        <div class="mt-6 flex items-center justify-between">
          <p class="text-sm text-muted-foreground">Total {{ filteredArticles.length }}</p>
          <div class="flex items-center gap-3">
            <Select :model-value="String(pageSize)" @update:model-value="(v) => { pageSize = Number(v); page = 1 }">
              <SelectTrigger class="w-20" />
              <SelectContent>
                <SelectItem v-for="size in [3, 6, 9]" :key="size" :value="String(size)">{{ size }}</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" :disabled="page <= 1" @click="page--">Prev</Button>
            <span class="text-sm">Page {{ page }} of {{ totalPages }}</span>
            <Button variant="outline" size="sm" :disabled="page >= totalPages" @click="page++">Next</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
