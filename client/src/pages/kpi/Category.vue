<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { api } from '@/lib/api'
import PageHeader from '@/components/layout/PageHeader.vue'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface KpiCategory {
  id: string
  name: string
  description: string
  ruleCount: number
}

const categories = ref<KpiCategory[]>([])

onMounted(async () => {
  categories.value = await api.get<KpiCategory[]>('/kpi/categories')
})
</script>

<template>
  <div class="flex items-start justify-between">
    <PageHeader title="KPI Categories" description="Manage KPI categories" />
    <Button>Add KPI Category</Button>
  </div>

  <div class="grid gap-4 md:grid-cols-3">
    <Card v-for="c in categories" :key="c.id">
      <CardHeader class="pb-2">
        <CardTitle class="text-base text-foreground">{{ c.name }}</CardTitle>
        <CardDescription>{{ c.description }}</CardDescription>
      </CardHeader>
      <CardContent>
        <Badge variant="secondary">{{ c.ruleCount }} rules</Badge>
      </CardContent>
    </Card>
  </div>
</template>
