# QuantBadge

Inline status indicator for PnL, signals, and states. Optimized for financial dashboards with semantic color coding.

## Installation

```bash
npx @quanty-ui/cli add badge
```

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `tone` | `'neutral' \| 'signal' \| 'profit' \| 'loss' \| 'warning'` | `'neutral'` | Semantic color variant |
| `size` | `'sm' \| 'md'` | `'md'` | Badge size |
| `pill` | `boolean` | `false` | Rounded pill shape |

## Usage

### Basic Usage

```vue
<script setup lang="ts">
import QuantBadge from '@/components/quant/badge/QuantBadge.vue'
</script>

<template>
  <QuantBadge>Neutral</QuantBadge>
</template>
```

### Tone Variants

```vue
<template>
  <div>
    <QuantBadge tone="neutral">Neutral</QuantBadge>
    <QuantBadge tone="signal">Signal</QuantBadge>
    <QuantBadge tone="profit">+12.5%</QuantBadge>
    <QuantBadge tone="loss">-3.2%</QuantBadge>
    <QuantBadge tone="warning">Risk: High</QuantBadge>
  </div>
</template>
```

### Sizes

```vue
<template>
  <div>
    <QuantBadge size="sm">Small</QuantBadge>
    <QuantBadge size="md">Medium</QuantBadge>
  </div>
</template>
```

### Pill Shape

```vue
<template>
  <QuantBadge tone="signal" pill>Long</QuantBadge>
</template>
```

## Financial Use Cases

### Portfolio Summary

```vue
<template>
  <div class="portfolio-summary">
    <h2>Today's Performance</h2>
    <div class="metrics">
      <div class="metric">
        <span>Total PnL</span>
        <QuantBadge tone="profit" size="sm">+$12,450</QuantBadge>
      </div>
      <div class="metric">
        <span>Drawdown</span>
        <QuantBadge tone="warning" size="sm">-2.3%</QuantBadge>
      </div>
      <div class="metric">
        <span>Signal</span>
        <QuantBadge tone="signal" size="sm" pill>Long ETH</QuantBadge>
      </div>
    </div>
  </div>
</template>
```

### Position Status

```vue
<template>
  <table>
    <thead>
      <tr>
        <th>Symbol</th>
        <th>Status</th>
        <th>PnL</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>BTCUSD</td>
        <td><QuantBadge tone="signal" pill>Long</QuantBadge></td>
        <td><QuantBadge tone="profit">+2.14%</QuantBadge></td>
      </tr>
      <tr>
        <td>ETHUSD</td>
        <td><QuantBadge tone="neutral" pill>Flat</QuantBadge></td>
        <td><QuantBadge tone="loss">-1.08%</QuantBadge></td>
      </tr>
    </tbody>
  </table>
</template>
```

## Design Tokens

QuantBadge uses the following design tokens:

- `--color-profit`, `--color-profit-bg`
- `--color-loss`, `--color-loss-bg`
- `--color-signal`, `--color-signal-bg`
- `--color-warning`, `--color-warning-bg`
- `--color-neutral` (uses `--text-muted` for neutral tone)
- `--spacing-1`, `--spacing-2`
- `--font-size-xs`, `--font-size-sm`
- `--font-weight-medium`
- `--radius-sm`, `--radius-full`

See [Design Tokens](/tokens) for customization.

## Accessibility

- Uses semantic HTML (`<span>`)
- Sufficient color contrast for WCAG AA
- Works with screen readers (content passed via slot)

## Related Components

- [QuantButton](/components/button) — Interactive buttons with similar tone variants
- [QuantCard](/components/card) — Container for grouped badges
