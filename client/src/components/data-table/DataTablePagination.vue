<script setup lang="ts">
import type { Table } from '@tanstack/vue-table'
import { ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select'

const props = defineProps<{ table: Table<any> }>()
</script>

<template>
  <div class="flex items-center justify-between px-1 py-3">
    <div class="text-sm text-muted-foreground">
      Showing
      {{ props.table.getState().pagination.pageIndex * props.table.getState().pagination.pageSize + 1 }}
      to
      {{
        Math.min(
          (props.table.getState().pagination.pageIndex + 1) * props.table.getState().pagination.pageSize,
          props.table.getFilteredRowModel().rows.length,
        )
      }}
      of {{ props.table.getFilteredRowModel().rows.length }} entries
    </div>
    <div class="flex items-center gap-6">
      <div class="flex items-center gap-2">
        <p class="text-sm text-muted-foreground">Rows per page</p>
        <Select
          :model-value="`${props.table.getState().pagination.pageSize}`"
          @update:model-value="(v) => props.table.setPageSize(Number(v))"
        >
          <SelectTrigger class="w-[70px]" />
          <SelectContent>
            <SelectItem v-for="size in [5, 10, 20, 30]" :key="size" :value="`${size}`">
              {{ size }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div class="text-sm font-medium">
        Page {{ props.table.getState().pagination.pageIndex + 1 }} of {{ props.table.getPageCount() || 1 }}
      </div>
      <div class="flex items-center gap-1">
        <Button variant="outline" size="icon" :disabled="!props.table.getCanPreviousPage()" @click="props.table.setPageIndex(0)">
          <ChevronsLeft class="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" :disabled="!props.table.getCanPreviousPage()" @click="props.table.previousPage()">
          <ChevronLeft class="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" :disabled="!props.table.getCanNextPage()" @click="props.table.nextPage()">
          <ChevronRight class="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          :disabled="!props.table.getCanNextPage()"
          @click="props.table.setPageIndex(props.table.getPageCount() - 1)"
        >
          <ChevronsRight class="h-4 w-4" />
        </Button>
      </div>
    </div>
  </div>
</template>
