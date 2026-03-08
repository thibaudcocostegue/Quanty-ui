# Component Development Context

## Folder Structure

Each component lives in its own folder with exactly two files:

```
components/
└── badge/
    ├── QuantBadge.vue    # Component implementation
    └── index.ts          # Export file
```

**index.ts pattern:**
```typescript
export { default } from './QuantBadge.vue'
```

## Component Template

```vue
<script setup lang="ts">
interface QuantBadgeProps {
  tone?: 'neutral' | 'signal' | 'profit' | 'loss' | 'warning'
  size?: 'sm' | 'md'
  pill?: boolean
}

const props = withDefaults(defineProps<QuantBadgeProps>(), {
  tone: 'neutral',
  size: 'md',
  pill: false
})
</script>

<template>
  <span 
    :class="[
      'quant-badge',
      `quant-badge--${props.tone}`,
      `quant-badge--${props.size}`,
      { 'quant-badge--pill': props.pill }
    ]"
  >
    <slot />
  </span>
</template>

<style scoped>
.quant-badge {
  display: inline-flex;
  align-items: center;
  font-weight: var(--font-weight-medium);
  border-radius: var(--radius-sm);
}

.quant-badge--md {
  padding: var(--spacing-1) var(--spacing-2);
  font-size: var(--font-size-xs);
}

.quant-badge--profit {
  background: var(--color-profit-bg);
  color: var(--color-profit);
}
</style>
```

## Critical Rules

### 1. Never Hardcode Values

❌ **Wrong:**
```css
.quant-button {
  background: #3fb950;
  padding: 8px 16px;
  border-radius: 6px;
}
```

✅ **Correct:**
```css
.quant-button {
  background: var(--color-profit);
  padding: var(--spacing-2) var(--spacing-4);
  border-radius: var(--radius-md);
}
```

### 2. TypeScript Props Required

All props must:
- Be explicitly typed with an interface
- Have defaults via `withDefaults()`
- Use union types for variants

```typescript
interface QuantButtonProps {
  tone?: 'neutral' | 'signal' | 'profit' | 'loss' | 'warning'  // Union type
  variant?: 'solid' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<QuantButtonProps>(), {
  tone: 'neutral',
  variant: 'solid',
  size: 'md',
  disabled: false,
  loading: false
})
```

### 3. Style Scoping Mandatory

Always use `<style scoped>` to prevent style leakage:

```vue
<style scoped>
.quant-card {
  background: var(--surface-raised);
}
</style>
```

### 4. BEM-like Kebab-case Naming

```css
/* Component */
.quant-badge { }

/* Modifier */
.quant-badge--profit { }
.quant-badge--pill { }

/* Element */
.quant-table__header { }
.quant-table__cell { }

/* Modifier on element */
.quant-table__cell--numeric { }
```

### 5. Keep Components Focused

Target ~60 lines per component. If larger:
- Extract logic to composables
- Use slots for flexibility
- Simplify styling

## Current Components

| Component | Purpose | Key Props |
|-----------|---------|-----------|
| **QuantBadge** | Status indicators | `tone`, `size`, `pill` |
| **QuantButton** | Interactive buttons | `tone`, `variant`, `size`, `loading`, `disabled` |
| **QuantCard** | Container with header/footer | `title`, `subtitle`, `bordered`, `padded` |
| **QuantTable** | Data tables | `columns`, `rows`, `striped`, `compact` |
| **QuantHeading** | Semantic headings (h1-h6) | `level`, `color` |
| **QuantText** | Paragraph/label/caption | `variant`, `color`, `as` |
| **QuantCode** | Monospace code snippets | `variant`, `inline` |

## Slots Pattern

Use slots for flexible content:

```vue
<template>
  <div class="quant-card">
    <header v-if="$slots.header || title" class="quant-card__header">
      <slot name="header">
        <h3>{{ title }}</h3>
      </slot>
    </header>
    
    <div class="quant-card__body">
      <slot />  <!-- Default slot -->
    </div>
    
    <footer v-if="$slots.footer" class="quant-card__footer">
      <slot name="footer" />
    </footer>
  </div>
</template>
```

## Emits Pattern

Type your emits for better DX:

```typescript
const emit = defineEmits<{
  click: [event: MouseEvent]
  change: [value: string]
  'update:modelValue': [value: string]
}>()

function handleClick(event: MouseEvent) {
  emit('click', event)
}
```

## Special Cases

### Dynamic Tags

For components like `QuantHeading` that render different HTML elements:

```vue
<script setup lang="ts">
const props = defineProps<{ level: 1 | 2 | 3 | 4 | 5 | 6 }>()
const tag = `h${props.level}`
</script>

<template>
  <component :is="tag" class="quant-heading">
    <slot />
  </component>
</template>
```

### Financial Typography

Use `font-variant-numeric: tabular-nums` for aligned numbers:

```css
.quant-table__cell--numeric {
  font-variant-numeric: tabular-nums;
  text-align: right;
}

.quant-code {
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
}
```

## Testing in Playground

After creating a component, add it to `playground/src/App.vue`:

```vue
<script setup lang="ts">
import QuantBadge from '../../components/badge/QuantBadge.vue'
</script>

<template>
  <section class="playground__section">
    <h2>QuantBadge</h2>
    <QuantBadge tone="profit">+12.5%</QuantBadge>
    <QuantBadge tone="loss">-3.2%</QuantBadge>
  </section>
</template>
```

Then run:
```bash
cd playground && pnpm dev
```
