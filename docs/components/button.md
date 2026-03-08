# QuantButton

Interactive button component with variants and states. Supports loading states, disabled states, and semantic color tones for financial actions.

## Installation

```bash
npx @quanty-ui/cli add button
```

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `tone` | `'neutral' \| 'signal' \| 'profit' \| 'loss' \| 'warning'` | `'neutral'` | Semantic color variant |
| `variant` | `'solid' \| 'outline' \| 'ghost'` | `'solid'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `disabled` | `boolean` | `false` | Disabled state |
| `loading` | `boolean` | `false` | Loading state |

## Events

| Name | Payload | Description |
|------|---------|-------------|
| `click` | `MouseEvent` | Emitted when button is clicked |

## Usage

### Basic Usage

```vue
<script setup lang="ts">
import QuantButton from '@/components/quant/button/QuantButton.vue'
</script>

<template>
  <QuantButton>Click me</QuantButton>
</template>
```

### Tone Variants

```vue
<template>
  <div>
    <QuantButton tone="neutral">Neutral</QuantButton>
    <QuantButton tone="signal">Signal</QuantButton>
    <QuantButton tone="profit">Buy</QuantButton>
    <QuantButton tone="loss">Sell</QuantButton>
    <QuantButton tone="warning">Close Position</QuantButton>
  </div>
</template>
```

### Visual Variants

```vue
<template>
  <div>
    <QuantButton variant="solid" tone="signal">Solid</QuantButton>
    <QuantButton variant="outline" tone="signal">Outline</QuantButton>
    <QuantButton variant="ghost" tone="signal">Ghost</QuantButton>
  </div>
</template>
```

### Sizes

```vue
<template>
  <div>
    <QuantButton size="sm">Small</QuantButton>
    <QuantButton size="md">Medium</QuantButton>
    <QuantButton size="lg">Large</QuantButton>
  </div>
</template>
```

### States

```vue
<template>
  <div>
    <QuantButton :loading="true">Loading...</QuantButton>
    <QuantButton :disabled="true">Disabled</QuantButton>
  </div>
</template>
```

### Click Handling

```vue
<script setup lang="ts">
import { ref } from 'vue'
import QuantButton from '@/components/quant/button/QuantButton.vue'

const isTrading = ref(false)

async function handleTrade() {
  isTrading.value = true
  try {
    await executeTrade()
  } finally {
    isTrading.value = false
  }
}
</script>

<template>
  <QuantButton 
    tone="profit" 
    :loading="isTrading"
    @click="handleTrade"
  >
    Execute Trade
  </QuantButton>
</template>
```

## Financial Use Cases

### Trading Actions

```vue
<template>
  <div class="trade-panel">
    <QuantButton tone="profit" variant="solid" size="lg">
      Buy Long
    </QuantButton>
    
    <QuantButton tone="loss" variant="solid" size="lg">
      Sell Short
    </QuantButton>
    
    <QuantButton tone="warning" variant="outline">
      Close All Positions
    </QuantButton>
    
    <QuantButton tone="neutral" variant="ghost">
      Cancel Order
    </QuantButton>
  </div>
</template>
```

### Order Confirmation

```vue
<script setup lang="ts">
import { ref } from 'vue'

const submitting = ref(false)

async function confirmOrder() {
  submitting.value = true
  try {
    await submitOrder()
    // Handle success
  } catch (error) {
    // Handle error
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="order-modal">
    <QuantHeading :level="3">Confirm Order</QuantHeading>
    <QuantText>Are you sure you want to execute this trade?</QuantText>
    
    <div class="actions">
      <QuantButton 
        tone="profit" 
        :loading="submitting"
        @click="confirmOrder"
      >
        Confirm Trade
      </QuantButton>
      
      <QuantButton 
        tone="neutral" 
        variant="ghost"
        :disabled="submitting"
      >
        Cancel
      </QuantButton>
    </div>
  </div>
</template>
```

### Filter and Actions Bar

```vue
<template>
  <div class="toolbar">
    <QuantButton variant="outline" size="sm">
      Filter
    </QuantButton>
    
    <QuantButton variant="outline" size="sm">
      Sort
    </QuantButton>
    
    <QuantButton variant="outline" size="sm">
      Export
    </QuantButton>
    
    <QuantButton tone="signal" size="sm">
      New Position
    </QuantButton>
  </div>
</template>
```

## Design Tokens

QuantButton uses the following design tokens:

- `--color-profit`, `--color-loss`, `--color-signal`, `--color-warning`
- `--text-primary`, `--text-secondary`
- `--surface-subtle`
- `--border-default`, `--border-focus`
- `--spacing-1`, `--spacing-2`, `--spacing-3`, `--spacing-4`
- `--font-size-sm`, `--font-size-base`
- `--font-weight-medium`
- `--radius-md`
- `--transition-fast`

See [Design Tokens](/tokens) for customization.

## Accessibility

- Semantic HTML (`<button>`)
- Keyboard accessible (Enter/Space to activate)
- Focus visible with `--border-focus` ring
- Disabled buttons are not focusable
- Loading state prevents multiple clicks

## Related Components

- [QuantBadge](/components/badge) — Status indicators
- [QuantCard](/components/card) — Container for grouped actions
