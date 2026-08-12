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

Quanty-ui follows the **shadcn model**: components are copied as source files into your project via the CLI, not installed as a bundled npm dependency. This keeps every component fully owned and customizable in your codebase.

```bash
npx @quanty-ui/cli init
```

This installs `@quanty-ui/tokens` (design tokens) and configures your chosen theme in `main.ts`.

---

## 📖 Usage

### Adding a Component

```bash
npx @quanty-ui/cli add button
```

This copies `QuantButton.vue` + `index.ts` into your project's components directory.

```vue
<script setup lang="ts">
import QuantButton from '@/components/quant/button/QuantButton.vue'
</script>

<template>
  <QuantButton variant="signal">Execute Trade</QuantButton>
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
# Install dependencies (monorepo root)
pnpm install

# Type checking
pnpm typecheck

# Run tests
pnpm test
```

### 🖼️ Component Playground

The `playground/` package showcases every component in a live demo page.

```bash
# Install dependencies (monorepo root)
pnpm install

# Start the playground dev server
pnpm --filter playground dev
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
- [CLI on npm](https://www.npmjs.com/package/@quanty-ui/cli)
- [Tokens on npm](https://www.npmjs.com/package/@quanty-ui/tokens)

---

**Built with ❤️ for the quant community**
