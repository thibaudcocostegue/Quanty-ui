# QuantCard

Container component with optional header and footer. Ideal for grouping related content in dashboards and panels.

## Installation

```bash
npx @quanty-ui/cli add card
```

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | — | Card title (optional) |
| `subtitle` | `string` | — | Card subtitle (optional) |
| `bordered` | `boolean` | `true` | Show border |
| `padded` | `boolean` | `true` | Apply padding |

## Slots

| Name | Description |
|------|-------------|
| `default` | Card body content |
| `header` | Custom header (overrides title/subtitle) |
| `footer` | Card footer content |

## Usage

### Basic Usage

```vue
<script setup lang="ts">
import QuantCard from '@/components/quant/card/QuantCard.vue'
</script>

<template>
  <QuantCard title="Portfolio Summary">
    Equity: $152,340.00
  </QuantCard>
</template>
```

### With Title and Subtitle

```vue
<template>
  <QuantCard 
    title="Total Portfolio Value" 
    subtitle="All accounts"
  >
    <div class="value">$152,340.00</div>
    <div class="change">+2.3% today</div>
  </QuantCard>
</template>
```

### Without Border or Padding

```vue
<template>
  <QuantCard :bordered="false" :padded="false">
    Custom content with no border or padding
  </QuantCard>
</template>
```

### Custom Header Slot

```vue
<template>
  <QuantCard>
    <template #header>
      <div class="custom-header">
        <QuantHeading :level="4">Custom Header</QuantHeading>
        <QuantBadge tone="signal">Live</QuantBadge>
      </div>
    </template>
    
    Card body content
  </QuantCard>
</template>
```

### With Footer

```vue
<template>
  <QuantCard title="Risk Analysis">
    <p>Current drawdown: 4.1%</p>
    <p>Maximum exposure: $50,000</p>
    
    <template #footer>
      <QuantBadge tone="warning">Monitor</QuantBadge>
    </template>
  </QuantCard>
</template>
```

## Financial Use Cases

### Portfolio Summary

```vue
<template>
  <QuantCard 
    title="Portfolio Performance" 
    subtitle="Last 24 hours"
  >
    <div class="metrics">
      <div class="metric">
        <QuantText variant="label">Total P&L</QuantText>
        <QuantCode variant="numeric">+12,450.00</QuantCode>
      </div>
      
      <div class="metric">
        <QuantText variant="label">Win Rate</QuantText>
        <QuantCode variant="numeric">68.5%</QuantCode>
      </div>
      
      <div class="metric">
        <QuantText variant="label">Sharpe Ratio</QuantText>
        <QuantCode variant="numeric">1.85</QuantCode>
      </div>
    </div>
    
    <template #footer>
      <QuantButton variant="outline" size="sm">
        View Details
      </QuantButton>
    </template>
  </QuantCard>
</template>
```

### Position Card

```vue
<template>
  <QuantCard>
    <template #header>
      <div class="position-header">
        <div>
          <QuantCode variant="ticker">BTC-USD</QuantCode>
          <QuantBadge tone="signal" pill size="sm">Long</QuantBadge>
        </div>
        <QuantCode variant="numeric">68,342.18</QuantCode>
      </div>
    </template>
    
    <div class="position-details">
      <div class="row">
        <QuantText variant="label">Entry Price</QuantText>
        <QuantCode variant="numeric">65,000.00</QuantCode>
      </div>
      
      <div class="row">
        <QuantText variant="label">Quantity</QuantText>
        <QuantCode variant="numeric">2.5000</QuantCode>
      </div>
      
      <div class="row">
        <QuantText variant="label">Unrealized P&L</QuantText>
        <QuantBadge tone="profit">+8,355.45</QuantBadge>
      </div>
    </div>
    
    <template #footer>
      <QuantButton tone="loss" variant="outline" size="sm">
        Close Position
      </QuantButton>
    </template>
  </QuantCard>
</template>
```

### Market Overview

```vue
<template>
  <div class="dashboard-grid">
    <QuantCard title="Crypto Markets" subtitle="Top movers">
      <div class="market-list">
        <div class="asset">
          <QuantCode variant="ticker">BTC-USD</QuantCode>
          <QuantBadge tone="profit">+2.14%</QuantBadge>
        </div>
        <div class="asset">
          <QuantCode variant="ticker">ETH-USD</QuantCode>
          <QuantBadge tone="loss">-1.08%</QuantBadge>
        </div>
      </div>
    </QuantCard>
    
    <QuantCard title="Equities" subtitle="S&P 500">
      <div class="market-list">
        <div class="asset">
          <QuantCode variant="ticker">AAPL</QuantCode>
          <QuantBadge tone="profit">+0.63%</QuantBadge>
        </div>
        <div class="asset">
          <QuantCode variant="ticker">MSFT</QuantCode>
          <QuantBadge tone="neutral">+0.02%</QuantBadge>
        </div>
      </div>
    </QuantCard>
  </div>
</template>
```

### Alert Card

```vue
<template>
  <QuantCard :bordered="true">
    <template #header>
      <div class="alert-header">
        <QuantBadge tone="warning">Alert</QuantBadge>
        <QuantText variant="caption" color="secondary">
          2 minutes ago
        </QuantText>
      </div>
    </template>
    
    <QuantText variant="body">
      Portfolio drawdown exceeded 5% threshold. Review your positions.
    </QuantText>
    
    <template #footer>
      <QuantButton tone="signal" variant="outline" size="sm">
        Review Positions
      </QuantButton>
    </template>
  </QuantCard>
</template>
```

## Design Tokens

QuantCard uses the following design tokens:

- `--surface-raised` (background)
- `--border-default` (border color)
- `--spacing-4`, `--spacing-3` (padding)
- `--radius-lg` (border radius)
- `--shadow-sm` (elevation)

See [Design Tokens](/tokens) for customization.

## Accessibility

- Semantic HTML (`<div>` with proper structure)
- Proper heading hierarchy when using title prop
- Color-independent information (uses text labels)

## Related Components

- [QuantBadge](/components/badge) — Status indicators for card headers
- [QuantButton](/components/button) — Actions in card footers
- [QuantHeading](/components/heading) — Custom card headers
