# Quanty-ui

> A modern, performance-focused Vue 3 component library for quantitative finance applications

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Vue 3](https://img.shields.io/badge/Vue-3.x-42b883.svg)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6.svg)](https://www.typescriptlang.org/)

Quanty-ui is a specialized design system and component library built for financial dashboards, trading interfaces, and data-intensive quant applications. It prioritizes **fast loading times**, **visual clarity**, and **high contrast** color schemes optimized for professional financial workflows.

---

## ✨ Features

- 🎨 **Finance-first Design**: Semantic colors for profit/loss, signals, and warnings
- ⚡ **Performance Optimized**: Lightweight, tree-shakeable components
- 🌙 **Dark Theme**: High-contrast "Midnight" theme reducing eye strain
- 📊 **Data-Dense UI**: Compact typography ideal for dashboards and tables
- 🔢 **Monospace Numbers**: Tabular figures for perfect numerical alignment
- ♿ **Accessible**: WCAG compliant with keyboard navigation support
- 🎯 **TypeScript Native**: Full type definitions included

---

## 🚀 Installation

```bash
npm install @quant-ui/core
```

```bash
yarn add @quant-ui/core
```

```bash
pnpm add @quant-ui/core
```

---

## 📖 Usage

### Global Registration

```typescript
import { createApp } from 'vue'
import QuantUI from '@quant-ui/core'
import '@quant-ui/core/styles'

const app = createApp(App)
app.use(QuantUI)
app.mount('#app')
```

### Individual Component Import

```vue
<script setup lang="ts">
import { QuantButton, QuantBadge } from '@quant-ui/core'
</script>

<template>
  <QuantButton variant="signal">Execute Trade</QuantButton>
  <QuantBadge type="profit">+12.5%</QuantBadge>
</template>
```

### Using Design Tokens

```vue
<style scoped>
.custom-card {
  background: var(--surface-raised);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  padding: var(--spacing-4);
  color: var(--text-primary);
}

.profit-text {
  color: var(--color-profit);
}
</style>
```

---

## 🎨 Design System

### Color Semantics

| Token | Purpose | Use Case |
|-------|---------|----------|
| `--color-profit` | Positive PnL, long positions | Green `#3fb950` |
| `--color-loss` | Negative PnL, short positions | Red `#f85149` |
| `--color-signal` | Alerts, CTAs, highlights | Blue `#58a6ff` |
| `--color-warning` | Drawdown, caution states | Yellow `#d29922` |
| `--color-neutral` | Flat, unchanged values | Gray `#8b949e` |

### Surface Hierarchy

- `--surface-base`: Main application background
- `--surface-raised`: Cards, panels, sidebars
- `--surface-overlay`: Modals, dropdowns, tooltips
- `--surface-subtle`: Hover states, selected rows
- `--surface-inset`: Input fields, code blocks

---

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build library
npm run build

# Type checking
npm run typecheck
```

---

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting a PR.

### 🌟 VibeCoder Philosophy

**Quanty-ui is a VibeCoder project.** We embrace the use of AI-assisted development tools to enhance productivity and code quality.

#### AI Usage Policy

- ✅ **AI assistance is allowed and encouraged** for code generation, refactoring, documentation, bug fixes, and testing

- 📝 **Mandatory disclosure**: Contributors **MUST** tag their PRs with:
  - `#VibeCoder` to indicate AI was used
  - Tool-specific hashtag: `#Copilot`, `#Claude`, `#ChatGPT`, `#Cursor`, etc.

- 🎯 **You remain responsible** for reviewing all AI-generated code and ensuring quality, correctness, and consistency

#### Example PR Description

```markdown
## Changes
- Added QuantTable component with sorting functionality
- Implemented responsive layout for mobile

#VibeCoder #Copilot
Initial component structure and tests generated with AI assistance.
Human review and adjustments applied to styling and accessibility.
```

### Language Policy

**English is the primary language** for:
- Code (variables, functions, comments)
- Documentation
- Issues and Pull Requests
- Commit messages

This ensures accessibility for the global open-source community.

---

## 📄 License

MIT © 2026 Thibaud Maciuk

See [LICENSE](LICENSE) file for details.

---

## 🔗 Links

- [Documentation](#) _(coming soon)_
- [Component Gallery](#) _(coming soon)_
- [GitHub Repository](https://github.com/thibaudcocostegue/Quanty-ui)
- [npm Package](https://www.npmjs.com/package/@quant-ui/core)

---

**Built with ❤️ for the quant community**
