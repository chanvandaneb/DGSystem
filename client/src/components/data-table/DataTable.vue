<script setup lang="ts" generic="TData">
import { ref, watch, computed, h } from 'vue'
import {
  FlexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
  type ColumnDef,
  type SortingState,
  type VisibilityState,
  type RowSelectionState,
} from '@tanstack/vue-table'
import { ArrowUpDown } from 'lucide-vue-next'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import DataTableToolbar from './DataTableToolbar.vue'
import DataTablePagination from './DataTablePagination.vue'

const props = defineProps<{
  columns: ColumnDef<TData, any>[]
  data: TData[]
  searchPlaceholder?: string
  selectable?: boolean
  rowId?: (row: TData) => string
}>()

const selectedIds = defineModel<string[]>('selectedIds', { default: () => [] })

const sorting = ref<SortingState>([])
const columnVisibility = ref<VisibilityState>({})
const globalFilter = ref('')
const rowSelection = ref<RowSelectionState>(
  Object.fromEntries(selectedIds.value.map((id) => [id, true])),
)

const allColumns = computed<ColumnDef<TData, any>[]>(() => {
  if (!props.selectable) return props.columns
  const selectColumn: ColumnDef<TData, any> = {
    id: '__select',
    header: ({ table }) =>
      h(Checkbox, {
        modelValue: table.getIsAllPageRowsSelected() ? true : table.getIsSomePageRowsSelected() ? 'indeterminate' : false,
        'onUpdate:modelValue': (v: boolean | 'indeterminate') => table.toggleAllPageRowsSelected(!!v),
      }),
    cell: ({ row }) =>
      h(Checkbox, {
        modelValue: row.getIsSelected(),
        'onUpdate:modelValue': (v: boolean | 'indeterminate') => row.toggleSelected(!!v),
      }),
    enableSorting: false,
    enableHiding: false,
  }
  return [selectColumn, ...props.columns]
})

const table = useVueTable({
  get data() {
    return props.data
  },
  get columns() {
    return allColumns.value
  },
  getRowId: props.rowId ? (row) => props.rowId!(row) : undefined,
  state: {
    get sorting() {
      return sorting.value
    },
    get columnVisibility() {
      return columnVisibility.value
    },
    get globalFilter() {
      return globalFilter.value
    },
    get rowSelection() {
      return rowSelection.value
    },
  },
  onSortingChange: (updater) => {
    sorting.value = typeof updater === 'function' ? updater(sorting.value) : updater
  },
  onColumnVisibilityChange: (updater) => {
    columnVisibility.value = typeof updater === 'function' ? updater(columnVisibility.value) : updater
  },
  onGlobalFilterChange: (updater) => {
    globalFilter.value = typeof updater === 'function' ? updater(globalFilter.value) : updater
  },
  onRowSelectionChange: (updater) => {
    rowSelection.value = typeof updater === 'function' ? updater(rowSelection.value) : updater
  },
  enableRowSelection: !!props.selectable,
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
})

watch(rowSelection, (val) => {
  selectedIds.value = Object.keys(val).filter((k) => val[k])
})
</script>

<template>
  <DataTableToolbar :table="table" :search-placeholder="searchPlaceholder" />

  <Table>
    <TableHeader>
      <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
        <TableHead v-for="header in headerGroup.headers" :key="header.id">
          <Button
            v-if="header.column.getCanSort()"
            variant="ghost"
            size="sm"
            class="-ml-3 h-8"
            @click="header.column.toggleSorting(header.column.getIsSorted() === 'asc')"
          >
            <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header" :props="header.getContext()" />
            <ArrowUpDown class="ml-2 h-3.5 w-3.5" />
          </Button>
          <FlexRender v-else-if="!header.isPlaceholder" :render="header.column.columnDef.header" :props="header.getContext()" />
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <template v-if="table.getRowModel().rows.length">
        <TableRow v-for="row in table.getRowModel().rows" :key="row.id">
          <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
            <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
          </TableCell>
        </TableRow>
      </template>
      <TableRow v-else>
        <TableCell :colspan="allColumns.length" class="h-24 text-center text-muted-foreground">
          No results.
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>

  <DataTablePagination :table="table" />
</template>
