# QuantCode

Monospace code component for tickers, numeric values, and formulas. Features tabular numerals for perfect number alignment.

## Installation

```bash
npx @quanty-ui/cli add code
```

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'ticker' \| 'numeric' \| 'formula'` | `'numeric'` | Code style variant |
| `inline` | `boolean` | `true` | Inline vs block display |

## Usage

### Basic Usage

```vue
<script setup lang="ts">
import QuantCode from '@/components/quant/code/QuantCode.vue'
</script>

<template>
  <QuantCode>+1,250.50</QuantCode>
</template>
```

### Variants

```vue
<template>
  <div>
    <QuantCode variant="ticker">AAPL</QuantCode>
    <QuantCode variant="numeric">+1,250.50</QuantCode>
    <QuantCode variant="formula">sharpe = mean(r) / std(r)</QuantCode>
  </div>
</template>
```

### Block Display

```vue
<template>
  <QuantCode variant="formula" :inline="false">
function calculateSharpe(returns) {
  const mean = returns.reduce((a, b) => a + b) / returns.length
  const std = Math.sqrt(
    returns.map(x => Math.pow(x - mean, 2))
           .reduce((a, b) => a + b) / returns.length
  )
  return mean / std
}
  </QuantCode>
</template>
```

## Financial Use Cases

### Market Tickers

```vue
<template>
  <div class="watchlist">
    <div class="asset">
      <QuantCode variant="ticker">BTC-USD</QuantCode>
      <QuantCode variant="numeric">68,342.18</QuantCode>
    </div>
    <div class="asset">
      <QuantCode variant="ticker">ETH-USD</QuantCode>
      <QuantCode variant="numeric">3,542.22</QuantCode>
    </div>
    <div class="asset">
      <QuantCode variant="ticker">AAPL</QuantCode>
      <QuantCode variant="numeric">198.74</QuantCode>
    </div>
  </div>
</template>
```

### Numeric Data in Tables

```vue
<template>
  <table class="portfolio-table">
    <thead>
      <tr>
        <th>Symbol</th>
        <th>Quantity</th>
        <th>Price</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><QuantCode variant="ticker">BTC-USD</QuantCode></td>
        <td><QuantCode variant="numeric">2.5000</QuantCode></td>
        <td><QuantCode variant="numeric">68,342.18</QuantCode></td>
        <td><QuantCode variant="numeric">170,855.45</QuantCode></td>
      </tr>
      <tr>
        <td><QuantCode variant="ticker">ETH-USD</QuantCode></td>
        <td><QuantCode variant="numeric">15.0000</QuantCode></td>
        <td><QuantCode variant="numeric">3,542.22</QuantCode></td>
        <td><QuantCode variant="numeric">53,133.30</QuantCode></td>
      </tr>
    </tbody>
  </table>
</template>
```

### Trading Formulas

```vue
<template>
  <div class="strategy-doc">
    <QuantHeading :level="3">Risk Metrics</QuantHeading>
    
    <QuantText variant="label">Sharpe Ratio</QuantText>
    <QuantCode variant="formula">sharpe = mean(r) / std(r)</QuantCode>
    
    <QuantText variant="label">Max Drawdown</QuantText>
    <QuantCode variant="formula">MDD = max(peak - trough) / peak</QuantCode>
    
    <QuantText variant="label">Position Size</QuantText>
    <QuantCode variant="formula">size = capital * risk / (entry - stop)</QuantCode>
  </div>
</template>
```

### Order Execution

```vue
<template>
  <div class="order-confirmation">
    <QuantText variant="body">Order executed successfully:</QuantText>
    
    <div class="details">
      <QuantText variant="label">Symbol</QuantText>
      <QuantCode variant="ticker">BTC-USD</QuantCode>
    </div>
    
    <div class="details">
      <QuantText variant="label">Fill Price</QuantText>
      <QuantCode variant="numeric">68,342.18</QuantCode>
    </div>
    
    <div class="details">
      <QuantText variant="label">Quantity</QuantText>
      <QuantCode variant="numeric">0.5000</QuantCode>
    </div>
    
    <div class="details">
      <QuantText variant="label">Order ID</QuantText>
      <QuantCode variant="formula">ORD-2024030815324501</QuantCode>
    </div>
  </div>
</template>
```

## Variant Styles

| Variant | Font Size | Color | Background | Use Case |
|---------|-----------|-------|------------|----------|
| `ticker` | `--font-size-sm` | `--color-signal` | Transparent | Asset symbols |
| `numeric` | `--font-size-base` | `--text-primary` | Transparent | Numbers/prices |
| `formula` | `--font-size-sm` | `--text-secondary` | `--surface-inset` | Code/formulas |

**All variants use:**
- `font-family: var(--font-mono)`
- `font-variant-numeric: tabular-nums` (critical for alignment)

## Tabular Numerals

The `font-variant-numeric: tabular-nums` property ensures all digits have the same width, making numbers align perfectly in tables:

```
Without tabular-nums:    With tabular-nums:
1,234.56                 1,234.56
  234.56                   234.56
   34.56                    34.56
    4.56                     4.56
```

## Design Tokens

QuantCode uses the following design tokens:

- `--font-mono` (JetBrains Mono, Fira Code, Cascadia Code)
- `--font-size-sm`, `--font-size-base`
- `--font-weight-normal`, `--font-weight-medium`
- `--text-primary`, `--text-secondary`
- `--color-signal`
- `--surface-inset`
- `--radius-sm`

See [Design Tokens](/tokens) for customization.

## Accessibility

- Uses semantic HTML (`<code>` for inline, `<pre>` for block)
- Monospace font improves readability
- Sufficient color contrast for WCAG AA

## Related Components

- [QuantText](/components/text) — Body text and labels
- [QuantBadge](/components/badge) — Status indicators
- [QuantTable](/components/table) — Data tables with numeric columns
