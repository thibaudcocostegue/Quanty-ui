# QuantHeading

Semantic headings (h1-h6) with consistent typography and color variants. Provides proper document structure with design system styling.

## Installation

```bash
npx @quanty-ui/cli add heading
```

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `level` | `1 \| 2 \| 3 \| 4 \| 5 \| 6` | — | Heading level (required) |
| `color` | `'primary' \| 'secondary' \| 'muted'` | `'primary'` | Text color variant |

## Usage

### Basic Usage

```vue
<script setup lang="ts">
import QuantHeading from '@/components/quant/heading/QuantHeading.vue'
</script>

<template>
  <QuantHeading :level="1">Portfolio Overview</QuantHeading>
</template>
```

### All Levels

```vue
<template>
  <div>
    <QuantHeading :level="1">Heading 1</QuantHeading>
    <QuantHeading :level="2">Heading 2</QuantHeading>
    <QuantHeading :level="3">Heading 3</QuantHeading>
    <QuantHeading :level="4">Heading 4</QuantHeading>
    <QuantHeading :level="5">Heading 5</QuantHeading>
    <QuantHeading :level="6">Heading 6</QuantHeading>
  </div>
</template>
```

### Color Variants

```vue
<template>
  <div>
    <QuantHeading :level="2" color="primary">Primary Color</QuantHeading>
    <QuantHeading :level="3" color="secondary">Secondary Color</QuantHeading>
    <QuantHeading :level="4" color="muted">Muted Color</QuantHeading>
  </div>
</template>
```

## Financial Dashboard Example

```vue
<template>
  <div class="dashboard">
    <QuantHeading :level="1">
      Trading Dashboard
    </QuantHeading>
    
    <section>
      <QuantHeading :level="2">
        Active Positions
      </QuantHeading>
      
      <QuantHeading :level="3" color="secondary">
        Crypto Markets
      </QuantHeading>
      <!-- Position table here -->
      
      <QuantHeading :level="3" color="secondary">
        Equity Markets
      </QuantHeading>
      <!-- Position table here -->
    </section>
    
    <section>
      <QuantHeading :level="2">
        Analytics
      </QuantHeading>
      
      <QuantHeading :level="4" color="muted">
        Risk Metrics
      </QuantHeading>
      <!-- Metrics content -->
    </section>
  </div>
</template>
```

## Typography Scale

| Level | Font Size | Font Weight | Use Case |
|-------|-----------|-------------|----------|
| 1 | `--font-size-2xl` (24px) | `--font-weight-semibold` | Page titles |
| 2 | `--font-size-xl` (20px) | `--font-weight-semibold` | Section headings |
| 3 | `--font-size-lg` (16px) | `--font-weight-medium` | Subsection headings |
| 4 | `--font-size-md` (15px) | `--font-weight-medium` | Card headings |
| 5 | `--font-size-base` (14px) | `--font-weight-medium` | Small headings |
| 6 | `--font-size-sm` (12px) | `--font-weight-medium` | Tiny headings |

All levels use `--line-height-tight` (1.2) for compact spacing.

## Design Tokens

QuantHeading uses the following design tokens:

- `--text-primary`, `--text-secondary`, `--text-muted`
- `--font-size-xs` through `--font-size-2xl`
- `--font-weight-medium`, `--font-weight-semibold`
- `--line-height-tight`

See [Design Tokens](/tokens) for customization.

## Accessibility

- Uses proper semantic HTML (`<h1>` through `<h6>`)
- Maintains document outline and heading hierarchy
- Screen reader friendly

## Related Components

- [QuantText](/components/text) — Body text, labels, and captions
- [QuantCode](/components/code) — Code snippets and formulas
