<script setup lang="ts">
import { computed } from 'vue'

type QuantTableAlign = 'left' | 'center' | 'right'

interface QuantTableColumn {
  key: string
  label: string
  align?: QuantTableAlign
  width?: string
}

interface QuantTableProps {
  columns: QuantTableColumn[]
  rows: Record<string, unknown>[]
  rowKey?: string
  emptyLabel?: string
  compact?: boolean
  striped?: boolean
}

const props = withDefaults(defineProps<QuantTableProps>(), {
  rowKey: 'id',
  emptyLabel: 'No data available',
  compact: false,
  striped: true,
})

const hasRows = computed(() => props.rows.length > 0)

function getRowKey(row: Record<string, unknown>, index: number): string {
  const value = row[props.rowKey]
  if (typeof value === 'string' || typeof value === 'number') {
    return String(value)
  }

  return `${props.rowKey}-${index}`
}

function formatCellValue(value: unknown): string {
  if (value === null || value === undefined) {
    return '—'
  }

  if (typeof value === 'number') {
    return Number.isFinite(value) ? value.toLocaleString() : String(value)
  }

  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No'
  }

  return String(value)
}

function getAlignClass(align?: QuantTableAlign): string {
  return `quant-table__cell--${align ?? 'left'}`
}
</script>

<template>
  <div class="quant-table-wrap">
    <table :class="['quant-table', { 'quant-table--compact': compact, 'quant-table--striped': striped }]">
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            :class="['quant-table__head', getAlignClass(column.align)]"
            :style="column.width ? { width: column.width } : undefined"
            scope="col"
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>

      <tbody v-if="hasRows">
        <tr v-for="(row, rowIndex) in rows" :key="getRowKey(row, rowIndex)" class="quant-table__row">
          <td
            v-for="column in columns"
            :key="`${getRowKey(row, rowIndex)}-${column.key}`"
            :class="['quant-table__cell', getAlignClass(column.align)]"
          >
            <slot :name="`cell-${column.key}`" :value="row[column.key]" :row="row" :column="column">
              {{ formatCellValue(row[column.key]) }}
            </slot>
          </td>
        </tr>
      </tbody>

      <tbody v-else>
        <tr>
          <td class="quant-table__empty" :colspan="columns.length">
            {{ emptyLabel }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.quant-table-wrap {
  width: 100%;
  overflow-x: auto;
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  background: var(--surface-raised);
}

.quant-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-size: var(--font-size-sm);
  color: var(--text-primary);
}

.quant-table__head {
  padding: var(--spacing-3) var(--spacing-4);
  background: var(--surface-overlay);
  border-bottom: 1px solid var(--border-default);
  color: var(--text-secondary);
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-xs);
}

.quant-table__row {
  transition: background-color var(--transition-fast);
}

.quant-table__row:hover {
  background: color-mix(in srgb, var(--surface-subtle) 55%, transparent);
}

.quant-table__cell {
  padding: var(--spacing-3) var(--spacing-4);
  border-bottom: 1px solid var(--border-subtle);
  font-variant-numeric: tabular-nums;
}

.quant-table--compact .quant-table__head,
.quant-table--compact .quant-table__cell {
  padding-top: var(--spacing-2);
  padding-bottom: var(--spacing-2);
}

.quant-table--striped .quant-table__row:nth-child(even) {
  background: color-mix(in srgb, var(--surface-subtle) 35%, transparent);
}

.quant-table__cell--left {
  text-align: left;
}

.quant-table__cell--center {
  text-align: center;
}

.quant-table__cell--right {
  text-align: right;
}

.quant-table__empty {
  padding: var(--spacing-6) var(--spacing-4);
  text-align: center;
  color: var(--text-muted);
  font-size: var(--font-size-sm);
}
</style>
