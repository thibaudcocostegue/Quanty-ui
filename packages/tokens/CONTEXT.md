# Design Tokens Context

## Overview

The `@quanty-ui/tokens` package contains the **CSS custom properties** that form the foundation of the Quanty UI design system. These tokens are installed as an npm package and imported by user projects.

## File Structure

```
packages/tokens/
├── midnight.css      # Design tokens (colors, spacing, typography)
├── reset.css         # CSS normalization
├── typography.css    # Base typography styles
├── index.css         # Entry point (imports all three)
└── package.json
```

## Import Order (Critical)

**Order matters.** Always import in this sequence:

```css
@import './midnight.css';    /* 1. Tokens first (variables) */
@import './reset.css';       /* 2. Then reset (normalize) */
@import './typography.css';  /* 3. Finally typography (base styles) */
```

This is automated in `index.css`, so users simply:

```typescript
// main.ts
import '@quanty-ui/tokens'
```

## Token Categories

### Surfaces (Backgrounds & Layers)

```css
--surface-base      /* App background (#0d1117) */
--surface-raised    /* Cards, panels, sidebars (#161b22) */
--surface-overlay   /* Modals, dropdowns, tooltips (#21262d) */
--surface-subtle    /* Hover states, selected rows (#30363d) */
--surface-inset     /* Inputs, code blocks (#090d13) */
```

**Usage:**
```css
.quant-card {
  background: var(--surface-raised);
}

.quant-button:hover {
  background: var(--surface-subtle);
}
```

### Text Colors

```css
--text-primary      /* Main content (#e6edf3) */
--text-secondary    /* Labels, metadata (#8b949e) */
--text-muted        /* Placeholders, disabled (#484f58) */
--text-inverse      /* Text on light backgrounds (#0d1117) */
--text-link         /* Hyperlinks (#58a6ff) */
```

### Finance Semantic Colors

```css
/* Foreground colors */
--color-profit      /* Positive PnL, long positions (#3fb950) */
--color-loss        /* Negative PnL, short positions (#f85149) */
--color-neutral     /* Flat, unchanged (#8b949e) */
--color-signal      /* Alerts, highlights, CTAs (#58a6ff) */
--color-warning     /* Drawdown, caution (#d29922) */

/* Background colors (12% opacity for badges/chips) */
--color-profit-bg   /* Soft green background */
--color-loss-bg     /* Soft red background */
--color-signal-bg   /* Soft blue background */
--color-warning-bg  /* Soft yellow background */
```

**Usage:**
```css
.quant-badge--profit {
  background: var(--color-profit-bg);
  color: var(--color-profit);
}

.pnl-value--positive {
  color: var(--color-profit);
}
```

### Borders

```css
--border-subtle     /* rgba(255, 255, 255, 0.05) */
--border-default    /* rgba(255, 255, 255, 0.08) */
--border-strong     /* rgba(255, 255, 255, 0.16) */
--border-focus      /* Focus rings (#1f6feb) */
```

### Spacing (4px base)

```css
--spacing-1   /*  4px */
--spacing-2   /*  8px */
--spacing-3   /* 12px */
--spacing-4   /* 16px */
--spacing-6   /* 24px */
--spacing-8   /* 32px */
--spacing-12  /* 48px */
--spacing-16  /* 64px */
```

**Usage:**
```css
.quant-card {
  padding: var(--spacing-4);
  gap: var(--spacing-3);
}
```

### Border Radius

```css
--radius-sm    /* 4px  - badges, chips */
--radius-md    /* 6px  - buttons, inputs */
--radius-lg    /* 8px  - cards, panels */
--radius-xl    /* 12px - large cards */
--radius-full  /* 9999px - pills, avatars */
```

### Typography

```css
/* Font families */
--font-sans   /* 'Inter', system-ui, sans-serif */
--font-mono   /* 'JetBrains Mono', 'Fira Code', monospace */

/* Font sizes (dense for dashboards) */
--font-size-xs    /* 11px */
--font-size-sm    /* 12px */
--font-size-base  /* 14px - default */
--font-size-md    /* 15px */
--font-size-lg    /* 16px */
--font-size-xl    /* 20px */
--font-size-2xl   /* 24px */

/* Font weights */
--font-weight-normal    /* 400 */
--font-weight-medium    /* 500 */
--font-weight-semibold  /* 600 */
--font-weight-bold      /* 700 */

/* Line heights */
--line-height-tight   /* 1.2  - headings */
--line-height-normal  /* 1.5  - body text */
--line-height-loose   /* 1.75 - long-form content */
```

### Shadows

```css
--shadow-sm    /* 0 1px 2px rgba(0, 0, 0, 0.4) */
--shadow-md    /* 0 4px 12px rgba(0, 0, 0, 0.5) */
--shadow-lg    /* 0 8px 24px rgba(0, 0, 0, 0.6) */

/* Special financial glow effects */
--shadow-glow-profit   /* Green glow for profit highlights */
--shadow-glow-loss     /* Red glow for loss highlights */
```

### Transitions

```css
--transition-fast   /* 80ms ease  - micro-interactions */
--transition-base   /* 150ms ease - default animations */
--transition-slow   /* 300ms ease - page transitions */
```

### Z-index

```css
--z-base      /* 0   - normal flow */
--z-raised    /* 10  - elevated elements */
--z-dropdown  /* 100 - dropdown menus */
--z-overlay   /* 200 - modal overlays */
--z-modal     /* 300 - modal content */
--z-toast     /* 400 - notifications */
```

## Primitives vs Semantics

### Primitives (--_ prefix)

**Never use these directly in components:**

```css
--_blue-500: #58a6ff;
--_green-500: #3fb950;
--_gray-800: #30363d;
/* ...etc */
```

Primitives are **internal building blocks**. They're referenced by semantic tokens only.

### Semantics (use these)

**Always use semantic tokens in components:**

```css
/* ❌ Wrong */
.quant-button {
  background: var(--_blue-500);
  color: var(--_gray-100);
}

/* ✅ Correct */
.quant-button {
  background: var(--color-signal);
  color: var(--text-primary);
}
```

**Why?** Semantic tokens can be remapped without breaking components. For example, changing `--color-signal` from blue to purple updates all components instantly.

## Modifying Tokens

### ✅ Safe to Edit: midnight.css

You can modify `midnight.css` to:
- Add new semantic tokens
- Change theme colors
- Adjust spacing/typography scales
- Create alternative themes

```css
/* Example: Add new spacing value */
--spacing-10: 40px;

/* Example: Add new semantic color */
--color-caution: var(--_orange-500);
--color-caution-bg: color-mix(in srgb, var(--_orange-500) 12%, transparent);
```

### ❌ Never Edit: reset.css

**Do not modify `reset.css`.** It contains carefully balanced CSS normalization rules. Changing it can introduce browser inconsistencies.

If you need custom resets, add them to `typography.css` or component styles.

### ⚠️ Carefully Edit: typography.css

You can modify `typography.css` for:
- Base font smoothing
- Default body styles
- Global heading styles

But keep it minimal — most styling should live in components.

## Package Configuration

**packages/tokens/package.json:**

```json
{
  "name": "@quanty-ui/tokens",
  "version": "0.1.0",
  "type": "module",
  "style": "./index.css",
  "exports": {
    ".": "./index.css"
  }
}
```

- **`"style"`** — Points to the main CSS entry (for bundlers)
- **`"exports"`** — Enables `import '@quanty-ui/tokens'` in user code

## Installation by Users

Via CLI:
```bash
npx quanty-ui init
# Installs @quanty-ui/tokens and sets up imports
```

Or manually:
```bash
npm install @quanty-ui/tokens
```

```typescript
// main.ts
import '@quanty-ui/tokens'
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```

## Financial Typography Best Practices

For numeric data:

```css
.price-display {
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;  /* ← Critical for alignment */
  text-align: right;
}
```

**Why `tabular-nums`?** Makes all digits the same width, so numbers in tables align vertically.

## Color Mixing for Variants

`color-mix()` creates soft background colors:

```css
/* 12% opacity backgrounds for badges */
--color-profit-bg: color-mix(in srgb, var(--_green-500) 12%, transparent);
```

To create your own:

```css
/* 20% opacity hover state */
.quant-button:hover {
  background: color-mix(in srgb, var(--color-signal) 20%, transparent);
}
```

## Testing Token Changes

After editing tokens:

```bash
# Build tokens package
cd packages/tokens
pnpm build  # (if applicable)

# Test in playground
cd ../playground
pnpm dev
```

The playground imports `@quanty-ui/tokens` via workspace protocol, so changes are live.
