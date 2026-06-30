<script setup lang="ts">
import type { Table } from '@tanstack/vue-table'
import { ChevronDown } from 'lucide-vue-next'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu'

const props = defineProps<{ table: Table<any>; searchPlaceholder?: string }>()
</script>

<template>
  <div class="flex items-center justify-between gap-2 pb-4">
    <Input
      :model-value="(props.table.getState().globalFilter as string) ?? ''"
      @update:model-value="(v) => props.table.setGlobalFilter(v)"
      :placeholder="searchPlaceholder ?? 'Search...'"
      class="max-w-sm"
    />
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline" size="sm">
          Columns
          <ChevronDown class="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuCheckboxItem
          v-for="column in props.table.getAllLeafColumns().filter((c) => c.getCanHide())"
          :key="column.id"
          :checked="column.getIsVisible()"
          @update:checked="(v: boolean) => column.toggleVisibility(!!v)"
        >
          {{ column.id }}
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>
