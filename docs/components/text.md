# QuantText# QuantText















































































































































































- [QuantCode](/components/code) — Monospace code snippets- [QuantHeading](/components/heading) — Semantic headings## Related Components- Respects user font size preferences- Sufficient color contrast for WCAG AA- Semantic HTML elements (p, span, div, etc.)## AccessibilitySee [Design Tokens](/tokens) for customization.- `--line-height-tight`, `--line-height-normal`- `--font-weight-normal`, `--font-weight-medium`- `--font-size-xs`, `--font-size-sm`, `--font-size-base`- `--text-primary`, `--text-secondary`, `--text-muted`QuantText uses the following design tokens:## Design Tokens**Note:** Caption variant defaults to `--text-secondary` color for better hierarchy.| `caption` | `--font-size-xs` (11px) | `--line-height-normal` (1.5) | Normal | Footnotes || `label` | `--font-size-sm` (12px) | `--line-height-tight` (1.2) | Medium | Form labels || `body` | `--font-size-base` (14px) | `--line-height-normal` (1.5) | Normal | Main content ||---------|-----------|-------------|-------------|----------|| Variant | Font Size | Line Height | Font Weight | Use Case |## Typography Styles```</template>  </div>    </QuantText>      Calculated based on historical volatility (90 days)    <QuantText variant="caption" color="muted">    </QuantText>      This strategy has a moderate risk profile with potential drawdown up to 15%.    <QuantText variant="body" color="primary">    <QuantText variant="label">Risk Level</QuantText>  <div class="info-card"><template>```vue### Information Cards```</template>  </form>    </div>      </QuantText>        Minimum order: 0.001 BTC      <QuantText variant="caption" color="secondary">      <input id="quantity" type="number" placeholder="0.5" />      </QuantText>        Quantity      <QuantText variant="label" as="label" for="quantity">    <div class="field">        </div>      <input id="symbol" type="text" placeholder="BTC-USD" />      </QuantText>        Symbol      <QuantText variant="label" as="label" for="symbol">    <div class="field">  <form class="trade-form"><template>```vue### Form Labels```</template>  </div>    </QuantText>      Data delayed by 15 minutes. Not financial advice.    <QuantText variant="caption" color="muted">        </div>      </QuantText>        2024-03-08 14:32:15 UTC      <QuantText variant="caption" color="secondary">      <QuantText variant="label">Last updated</QuantText>    <div class="metadata">        </QuantText>      Long position opened on 2024-03-01 with 2.5x leverage.    <QuantText variant="body">        <QuantHeading :level="3">BTC-USD Position</QuantHeading>  <div class="position-card"><template>```vue## Financial Dashboard Example```</template>  </div>    <QuantText as="div" variant="body">Block text</QuantText>    <!-- Render as div -->        <QuantText as="span" variant="label">Inline label</QuantText>    <!-- Render as span -->  <div><template>```vue### Custom HTML Element```</template>  </div>    <QuantText color="muted">Muted text color</QuantText>    <QuantText color="secondary">Secondary text color</QuantText>    <QuantText color="primary">Primary text color</QuantText>  <div><template>```vue### Color Variants```</template>  </div>    </QuantText>      Caption text for footnotes and small details.    <QuantText variant="caption">        </QuantText>      Label text for form fields and metadata.    <QuantText variant="label">        </QuantText>      Body text for main content and descriptions.    <QuantText variant="body">  <div><template>```vue### Variants```</template>  <QuantText>This is body text.</QuantText><template></script>import QuantText from '@/components/quant/text/QuantText.vue'<script setup lang="ts">```vue### Basic Usage## Usage| `as` | `string` | `'p'` | HTML element to render || `color` | `'primary' \| 'secondary' \| 'muted'` | `'primary'` | Text color || `variant` | `'body' \| 'label' \| 'caption'` | `'body'` | Text style variant ||------|------|---------|-------------|| Name | Type | Default | Description |## Props```npx @quanty-ui/cli add text```bash## InstallationFlexible text component for body copy, labels, and captions. Supports multiple variants and custom HTML elements.
Flexible text component for body content, labels, and captions. Provides consistent typography with semantic variants.

## Installation

```bash
npx @quanty-ui/cli add text
```

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'body' \| 'label' \| 'caption'` | `'body'` | Text style variant |
| `color` | `'primary' \| 'secondary' \| 'muted'` | `'primary'` | Text color |
| `as` | `string` | `'p'` | HTML tag to render (e.g., `span`, `div`) |

## Usage

### Basic Usage

```vue
<script setup lang="ts">
import QuantText from '@/components/quant/text/QuantText.vue'
</script>

<template>
  <QuantText>This is body text.</QuantText>
</template>
```

### Variants

```vue
<template>
  <div>
    <QuantText variant="body">
      Daily PnL summary for the current trading session.
    </QuantText>
    
    <QuantText variant="label">
      Last Updated
    </QuantText>
    
    <QuantText variant="caption">
      Data delayed by 15 minutes
    </QuantText>
  </div>
</template>
```

### Color Variants

```vue
<template>
  <div>
    <QuantText color="primary">
      Primary text color
    </QuantText>
    
    <QuantText color="secondary">
      Secondary text color
    </QuantText>
    
    <QuantText color="muted">
      Muted text color
    </QuantText>
  </div>
</template>
```

### Custom HTML Tag

```vue
<template>
  <QuantText as="span" variant="label">
    Inline label
  </QuantText>
  
  <QuantText as="div" variant="body">
    Block body text
  </QuantText>
</template>
```

## Financial Dashboard Example

```vue
<template>
  <div class="metric-card">
    <QuantText variant="label" color="secondary">
      Total Portfolio Value
    </QuantText>
    
    <QuantText variant="body" as="div" style="font-size: 24px; font-weight: 600;">
      $152,340.00
    </QuantText>
    
    <QuantText variant="caption" color="muted">
      Updated 2 minutes ago
    </QuantText>
  </div>
</template>
```

### Form Labels

```vue
<template>
  <div class="form-field">
    <QuantText variant="label" as="label" for="ticker-input">
      Ticker Symbol
    </QuantText>
    <input id="ticker-input" type="text" />
    
    <QuantText variant="caption" color="muted">
      Enter a valid ticker (e.g., AAPL, BTCUSD)
    </QuantText>
  </div>
</template>
```

## Typography Specifications

| Variant | Font Size | Line Height | Font Weight | Use Case |
|---------|-----------|-------------|-------------|----------|
| `body` | `--font-size-base` (14px) | `--line-height-normal` (1.5) | `400` | Paragraphs, descriptions |
| `label` | `--font-size-sm` (12px) | `--line-height-tight` (1.2) | `--font-weight-medium` (500) | Form labels, metric labels |
| `caption` | `--font-size-xs` (11px) | `--line-height-normal` (1.5) | `400` | Footnotes, help text |

**Note:** Caption variant defaults to `--text-secondary` color for reduced visual weight.

## Design Tokens

QuantText uses the following design tokens:

- `--text-primary`, `--text-secondary`, `--text-muted`
- `--font-size-xs`, `--font-size-sm`, `--font-size-base`
- `--font-weight-normal`, `--font-weight-medium`
- `--line-height-tight`, `--line-height-normal`

See [Design Tokens](/tokens) for customization.

## Best Practices

### ✅ Do

```vue
<!-- Use semantic variants -->
<QuantText variant="label">Last Price</QuantText>
<QuantText variant="body">$68,342.18</QuantText>
<QuantText variant="caption">15 min delay</QuantText>

<!-- Use color for hierarchy -->
<QuantText color="secondary">Optional field</QuantText>
```

### ❌ Don't

```vue
<!-- Don't use inline styles for font sizes -->
<QuantText style="font-size: 12px">Label</QuantText>

<!-- Use variant instead -->
<QuantText variant="label">Label</QuantText>
```

## Accessibility

- Renders semantic HTML by default (`<p>`)
- Supports custom tags via `as` prop for proper structure
- Sufficient color contrast for all color variants

## Related Components

- [QuantHeading](/components/heading) — Semantic headings
- [QuantCode](/components/code) — Code snippets and formulas
