# Design Tokens

Design tokens are the foundation of Quanty UI's visual language. They provide a consistent set of CSS custom properties for colors, spacing, typography, and other design primitives.

## Token Architecture

Tokens are organized in three layers:

1. **midnight.css** — Design tokens (colors, spacing, typography)
2. **reset.css** — CSS normalization
3. **typography.css** — Base typography styles

**Import order matters.** When you import `@quanty-ui/tokens`, these files are loaded in the correct sequence.

## Surfaces (Backgrounds & Layers)

| Token | Value | Usage |
|-------|-------|-------|
| `--surface-base` | `#0d1117` | App background |
| `--surface-raised` | `#161b22` | Cards, panels, sidebars |
| `--surface-overlay` | `#21262d` | Modals, dropdowns, tooltips |
| `--surface-subtle` | `#30363d` | Hover states, selected rows |
| `--surface-inset` | `#090d13` | Inputs, code blocks |

**Example:**
```css
.card {
  background: var(--surface-raised);
  border-radius: var(--radius-lg);
}
```

## Text Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--text-primary` | `#e6edf3` | Main content |
| `--text-secondary` | `#8b949e` | Labels, metadata |
| `--text-muted` | `#484f58` | Placeholders, disabled |
| `--text-inverse` | `#0d1117` | Text on light backgrounds |
| `--text-link` | `#58a6ff` | Hyperlinks |

## Finance Semantic Colors

Quanty UI provides semantic colors specifically designed for financial applications:

| Token | Value | Usage |
|-------|-------|-------|
| `--color-profit` | `#3fb950` | Positive PnL, long positions |
| `--color-loss` | `#f85149` | Negative PnL, short positions |
| `--color-neutral` | `#8b949e` | Flat, unchanged values |
| `--color-signal` | `#58a6ff` | Alerts, highlights, CTAs |
| `--color-warning` | `#d29922` | Drawdown, caution indicators |

**Background variants (12% opacity):**

| Token | Usage |
|-------|-------|
| `--color-profit-bg` | Soft green background for badges |
| `--color-loss-bg` | Soft red background for badges |
| `--color-signal-bg` | Soft blue background for badges |
| `--color-warning-bg` | Soft yellow background for badges |

**Example:**
```css
.pnl-positive {
  color: var(--color-profit);
}

.badge-profit {
  background: var(--color-profit-bg);
  color: var(--color-profit);
}
```

## Borders

| Token | Value | Usage |
|-------|-------|-------|
| `--border-subtle` | `rgba(255, 255, 255, 0.05)` | Subtle dividers |
| `--border-default` | `rgba(255, 255, 255, 0.08)` | Default borders |
| `--border-strong` | `rgba(255, 255, 255, 0.16)` | Emphasized borders |
| `--border-focus` | `#1f6feb` | Focus rings |

## Spacing (4px base)

| Token | Value | Usage |
|-------|-------|-------|
| `--spacing-1` | `4px` | Minimal spacing |
| `--spacing-2` | `8px` | Small spacing |
| `--spacing-3` | `12px` | Medium spacing |
| `--spacing-4` | `16px` | Default spacing |
| `--spacing-6` | `24px` | Large spacing |
| `--spacing-8` | `32px` | Extra large spacing |
| `--spacing-12` | `48px` | Section spacing |
| `--spacing-16` | `64px` | Page spacing |

**Example:**
```css
.card {
  padding: var(--spacing-4);
  gap: var(--spacing-3);
}
```

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | `4px` | Badges, chips |
| `--radius-md` | `6px` | Buttons, inputs |
| `--radius-lg` | `8px` | Cards, panels |
| `--radius-xl` | `12px` | Large cards |
| `--radius-full` | `9999px` | Pills, avatars |

## Typography

### Font Families

| Token | Value |
|-------|-------|
| `--font-sans` | `'Inter', system-ui, sans-serif` |
| `--font-mono` | `'JetBrains Mono', 'Fira Code', monospace` |

### Font Sizes (Dense for Dashboards)

| Token | Value | Usage |
|-------|-------|-------|
| `--font-size-xs` | `11px` | Tiny labels |
| `--font-size-sm` | `12px` | Small text |
| `--font-size-base` | `14px` | Default body text |
| `--font-size-md` | `15px` | Medium text |
| `--font-size-lg` | `16px` | Large text |
| `--font-size-xl` | `20px` | Large headings |
| `--font-size-2xl` | `24px` | Extra large headings |

### Font Weights

| Token | Value |
|-------|-------|
| `--font-weight-normal` | `400` |
| `--font-weight-medium` | `500` |
| `--font-weight-semibold` | `600` |
| `--font-weight-bold` | `700` |

### Line Heights

| Token | Value | Usage |
|-------|-------|-------|
| `--line-height-tight` | `1.2` | Headings |
| `--line-height-normal` | `1.5` | Body text |
| `--line-height-loose` | `1.75` | Long-form content |

## Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0, 0, 0, 0.4)` | Subtle elevation |
| `--shadow-md` | `0 4px 12px rgba(0, 0, 0, 0.5)` | Default elevation |
| `--shadow-lg` | `0 8px 24px rgba(0, 0, 0, 0.6)` | High elevation |
| `--shadow-glow-profit` | Green glow | Profit highlights |
| `--shadow-glow-loss` | Red glow | Loss highlights |

## Transitions

| Token | Value | Usage |
|-------|-------|-------|
| `--transition-fast` | `80ms ease` | Micro-interactions |
| `--transition-base` | `150ms ease` | Default animations |
| `--transition-slow` | `300ms ease` | Page transitions |

## Z-index Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--z-base` | `0` | Normal flow |
| `--z-raised` | `10` | Elevated elements |
| `--z-dropdown` | `100` | Dropdown menus |
| `--z-overlay` | `200` | Modal overlays |
| `--z-modal` | `300` | Modal content |
| `--z-toast` | `400` | Notifications |

## Best Practices

### ✅ Do

```css
.button {
  background: var(--color-signal);
  padding: var(--spacing-2) var(--spacing-4);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
}
```

### ❌ Don't

```css
.button {
  background: #58a6ff;  /* Never hardcode colors */
  padding: 8px 16px;    /* Never hardcode spacing */
  border-radius: 6px;   /* Never hardcode radius */
  font-size: 14px;      /* Never hardcode sizes */
}
```

## Customization

To customize tokens, fork the `@quanty-ui/tokens` package or override them in your global CSS:

```css
:root {
  /* Override existing token */
  --color-profit: #00ff00;
  
  /* Add new token */
  --color-custom: #ff00ff;
}
```

## Financial Typography

For numeric data alignment, use tabular figures:

```css
.price {
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
  text-align: right;
}
```

This ensures all digits have the same width, making columns of numbers align vertically.
