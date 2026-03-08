# QuantTable

Data table component optimized for financial data. Features custom cell rendering, numeric alignment, and compact layouts.

## Installation

```bash
npx @quanty-ui/cli add table
```

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `QuantTableColumn[]` | `[]` | Column configuration |
| `rows` | `QuantTableRow[]` | `[]` | Row data |
| `striped` | `boolean` | `false` | Alternating row colors |
| `compact` | `boolean` | `false` | Reduced padding |

### QuantTableColumn Type

```typescript
interface QuantTableColumn {
  key: string              // Data key
  label: string            // Column header
  align?: 'left' | 'right' | 'center'  // Text alignment
  width?: string           // Column width (CSS value)
}
```

### QuantTableRow Type

```typescript
interface QuantTableRow {
  id: string               // Unique row identifier
  [key: string]: any       // Dynamic data fields
}
```

## Slots

| Name | Props | Description |
|------|-------|-------------|
| `cell-{key}` | `{ value, row }` | Custom cell renderer for column `key` |

## Usage

### Basic Usage

```vue
<script setup lang="ts">
import QuantTable from '@/components/quant/table/QuantTable.vue'

const columns = [
  { key: 'ticker', label: 'Ticker' },
  { key: 'price', label: 'Price', align: 'right' },
  { key: 'change', label: 'Change', align: 'right' }
]

const rows = [
  { id: '1', ticker: 'BTCUSD', price: 68342.18, change: '+2.14%' },
  { id: '2', ticker: 'ETHUSD', price: 3542.22, change: '-1.08%' }
]
</script>

<template>
  <QuantTable :columns="columns" :rows="rows" />
</template>
```

### With Custom Cell Rendering

```vue
<script setup lang="ts">
const columns = [
  { key: 'ticker', label: 'Ticker' },
  { key: 'price', label: 'Price', align: 'right' },
  { key: 'change', label: 'Change', align: 'right' }
]

const rows = [
  { id: '1', ticker: 'BTCUSD', price: 68342.18, change: 2.14 },
  { id: '2', ticker: 'ETHUSD', price: 3542.22, change: -1.08 }
]
</script>

<template>
  <QuantTable :columns="columns" :rows="rows">
    <template #cell-change="{ value }">
      <QuantBadge :tone="value > 0 ? 'profit' : 'loss'">
        {{ value > 0 ? '+' : '' }}{{ value.toFixed(2) }}%
      </QuantBadge>
    </template>
  </QuantTable>
</template>
```

### Striped and Compact

```vue
<template>
  <QuantTable 
    :columns="columns" 
    :rows="rows" 
    striped 
    compact
  />
</template>
```

## Financial Use Cases

### Portfolio Positions

```vue
<script setup lang="ts">
import QuantTable from '@/components/quant/table/QuantTable.vue'
import QuantBadge from '@/components/quant/badge/QuantBadge.vue'
import QuantCode from '@/components/quant/code/QuantCode.vue'

const columns = [
  { key: 'ticker', label: 'Symbol' },
  { key: 'side', label: 'Side' },
  { key: 'quantity', label: 'Quantity', align: 'right' },
  { key: 'entry', label: 'Entry Price', align: 'right' },
  { key: 'current', label: 'Current Price', align: 'right' },
  { key: 'pnl', label: 'P&L', align: 'right' }
]

const rows = [
  { 
    id: '1', 
    ticker: 'BTC-USD', 
    side: 'Long',
    quantity: 2.5000,
    entry: 65000.00,
    current: 68342.18,
    pnl: 8355.45
  },
  { 
    id: '2', 
    ticker: 'ETH-USD', 
    side: 'Long',
    quantity: 15.0000,
    entry: 3600.00,
    current: 3542.22,
    pnl: -866.70
  }
]
</script>

<template>
  <QuantTable :columns="columns" :rows="rows" striped>
    <template #cell-ticker="{ value }">
      <QuantCode variant="ticker">{{ value }}</QuantCode>
    </template>
    
    <template #cell-side="{ value }">
      <QuantBadge :tone="value === 'Long' ? 'signal' : 'warning'" pill size="sm">
        {{ value }}
      </QuantBadge>
    </template>
    
    <template #cell-quantity="{ value }">
      <QuantCode variant="numeric">{{ value.toFixed(4) }}</QuantCode>
    </template>
    
    <template #cell-entry="{ value }">
      <QuantCode variant="numeric">{{ value.toLocaleString() }}</QuantCode>
    </template>
    
    <template #cell-current="{ value }">
      <QuantCode variant="numeric">{{ value.toLocaleString() }}</QuantCode>
    </template>
    
    <template #cell-pnl="{ value }">
      <QuantBadge :tone="value > 0 ? 'profit' : 'loss'">
        {{ value > 0 ? '+' : '' }}${{ Math.abs(value).toLocaleString() }}
      </QuantBadge>
    </template>
  </QuantTable>
</template>
```

### Market Watchlist

```vue
<script setup lang="ts">
const columns = [
  { key: 'ticker', label: 'Symbol', width: '120px' },
  { key: 'price', label: 'Last Price', align: 'right' },
  { key: 'change24h', label: '24h Change', align: 'right' },
  { key: 'volume', label: 'Volume', align: 'right' },
  { key: 'signal', label: 'Signal' }
]

const rows = [
  { 
    id: '1', 
    ticker: 'BTC-USD', 
    price: 68342.18, 
    change24h: 2.14,
    volume: '1.2B',
    signal: 'Long'
  },
  { 
    id: '2', 
    ticker: 'ETH-USD', 
    price: 3542.22, 
    change24h: -1.08,
    volume: '850M',
    signal: 'Neutral'
  },
  { 
    id: '3', 
    ticker: 'AAPL', 
    price: 198.74, 
    change24h: 0.63,
    volume: '45M',
    signal: 'Watch'
  }
]
</script>

<template>
  <QuantCard title="Market Watchlist">
    <QuantTable :columns="columns" :rows="rows" striped>
      <template #cell-ticker="{ value }">
        <QuantCode variant="ticker">{{ value }}</QuantCode>
      </template>
      
      <template #cell-price="{ value }">
        <QuantCode variant="numeric">
          {{ value.toLocaleString(undefined, { minimumFractionDigits: 2 }) }}
        </QuantCode>
      </template>
      
      <template #cell-change24h="{ value }">
        <span :style="{ color: value > 0 ? 'var(--color-profit)' : 'var(--color-loss)' }">
          {{ value > 0 ? '+' : '' }}{{ value.toFixed(2) }}%
        </span>
      </template>
      
      <template #cell-signal="{ value }">
        <QuantBadge 
          :tone="value === 'Long' ? 'signal' : value === 'Watch' ? 'warning' : 'neutral'"
          pill
          size="sm"
        >
          {{ value }}
        </QuantBadge>
      </template>
    </QuantTable>
  </QuantCard>
</template>
```

### Trade History

```vue
<script setup lang="ts">
const columns = [
  { key: 'time', label: 'Time' },
  { key: 'ticker', label: 'Symbol' },
  { key: 'side', label: 'Side' },
  { key: 'quantity', label: 'Qty', align: 'right' },
  { key: 'price', label: 'Price', align: 'right' },
  { key: 'total', label: 'Total', align: 'right' }
]

const rows = [
  { 
    id: '1', 
    time: '14:32:15',
    ticker: 'BTC-USD', 
    side: 'Buy',
    quantity: 0.5000,
    price: 68342.18,
    total: 34171.09
  },
  { 
    id: '2', 
    time: '14:28:43',
    ticker: 'ETH-USD', 
    side: 'Sell',
    quantity: 2.0000,
    price: 3542.22,
    total: 7084.44
  }
]
</script>

<template>
  <QuantCard title="Recent Trades">
    <QuantTable :columns="columns" :rows="rows" compact>
      <template #cell-time="{ value }">
        <QuantText variant="caption" color="secondary">{{ value }}</QuantText>
      </template>
      
      <template #cell-ticker="{ value }">
        <QuantCode variant="ticker">{{ value }}</QuantCode>
      </template>
      
      <template #cell-side="{ value }">
        <QuantBadge 
          :tone="value === 'Buy' ? 'profit' : 'loss'" 
          size="sm"
        >
          {{ value }}
        </QuantBadge>
      </template>
      
      <template #cell-quantity="{ value }">
        <QuantCode variant="numeric">{{ value.toFixed(4) }}</QuantCode>
      </template>
      
      <template #cell-price="{ value }">
        <QuantCode variant="numeric">{{ value.toLocaleString() }}</QuantCode>
      </template>
      
      <template #cell-total="{ value }">
        <QuantCode variant="numeric">${{ value.toLocaleString() }}</QuantCode>
      </template>
    </QuantTable>
  </QuantCard>
</template>
```

## Numeric Alignment

For financial data tables, always:
1. Set `align: 'right'` on numeric columns
2. Use `QuantCode` with `variant="numeric"` for automatic `tabular-nums`
3. Format numbers consistently with locale-aware formatting

Example:
```vue
<template #cell-price="{ value }">
  <QuantCode variant="numeric">
    {{ value.toLocaleString(undefined, { 
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }) }}
  </QuantCode>
</template>
```

## Design Tokens

QuantTable uses the following design tokens:

- `--surface-raised` (table background)
- `--surface-subtle` (striped row background, hover states)
- `--border-default` (borders)
- `--text-primary`, `--text-secondary`
- `--spacing-2`, `--spacing-3`, `--spacing-4`
- `--font-size-sm`
- `--font-weight-medium`
- `--transition-fast`

See [Design Tokens](/tokens) for customization.

## Accessibility

- Semantic HTML (`<table>`, `<thead>`, `<tbody>`, etc.)
- Proper `scope` attributes on headers
- Keyboard navigation support
- Screen reader friendly

## Related Components

- [QuantCode](/components/code) — Monospace numeric formatting
- [QuantBadge](/components/badge) — Status indicators in cells
- [QuantCard](/components/card) — Container for tables
