# Getting Started

Quanty UI is a design system for quantitative finance Vue 3 applications. It provides production-ready components optimized for trading platforms, portfolio dashboards, and financial data visualization.

## Prerequisites

- **Vue 3** (3.3+)
- **TypeScript** (5.0+)
- **pnpm** (recommended) or npm/yarn

## Installation

### 1. Install Design Tokens

First, install the design tokens package:

```bash
pnpm add @quanty-ui/tokens
```

### 2. Initialize Quanty UI

Run the CLI init command to set up your project:

```bash
npx @quanty-ui/cli init
```

This will prompt you for a components directory (default: `src/components/quant`) and install the necessary dependencies.

### 3. Import Tokens

In your `main.ts`, import the design tokens before mounting your app:

```typescript
import '@quanty-ui/tokens'
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```

### 4. Add Components

Add individual components using the CLI:

```bash
# Add a badge component
npx @quanty-ui/cli add badge

# Add a button component
npx @quanty-ui/cli add button

# Add multiple components
npx @quanty-ui/cli add badge button card table
```

Components are copied to your project as source files, giving you full control over customization.

## Usage Example

After adding the `QuantBadge` component, you can use it in your Vue components:

```vue
<script setup lang="ts">
import QuantBadge from '@/components/quant/badge/QuantBadge.vue'
</script>

<template>
  <div class="portfolio">
    <h1>Portfolio Summary</h1>
    
    <div class="metrics">
      <QuantBadge tone="profit">+12.5%</QuantBadge>
      <QuantBadge tone="loss">-3.2%</QuantBadge>
      <QuantBadge tone="signal">Long</QuantBadge>
      <QuantBadge tone="warning">Risk: High</QuantBadge>
    </div>
  </div>
</template>
```

## Architecture

Quanty UI follows the **shadcn model**:

- **Components are not bundled** — they're copied to your project as source files
- **Full ownership** — modify components directly in your codebase
- **Zero lock-in** — no npm package to update or maintain
- **Design tokens as npm package** — single source of truth for colors, spacing, typography

## Next Steps

- Learn about [Design Tokens](/tokens)
- Browse [Components](/components/badge)
- Check out the [GitHub repository](https://github.com/thibaudcocostegue/Quanty-ui)
