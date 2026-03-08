# AI Agent Guide for Quanty-ui

## Project Purpose

Quanty-ui is a **design system for quantitative finance Vue 3 applications**. It provides production-ready components optimized for trading platforms, portfolio dashboards, and financial data visualization.

## Architecture Model (shadcn-inspired)

**Components are NOT bundled into an npm package.** Instead:

1. Users run `npx quanty-ui init` to set up tokens
2. Users run `npx quanty-ui add badge` to copy component source into their project
3. Components live in the user's codebase — full control, no black box

This approach gives developers ownership and customization freedom.

## Repository Structure

```
Quanty-ui/
├── packages/
│   ├── cli/              # Command-line tool (quanty-ui init/add)
│   └── tokens/           # CSS custom properties (design system foundation)
├── components/           # Component source files (copied to user projects)
│   ├── badge/
│   ├── button/
│   ├── card/
│   └── ...
├── playground/           # Development showcase (pnpm workspace)
└── docs/                 # Documentation
```

## Tech Stack

- **Vue 3** (Composition API with `<script setup>`)
- **TypeScript** (strict mode, explicit prop types)
- **Vite** (build tool for playground)
- **pnpm workspaces** (monorepo management)
- **unbuild** (CLI package bundler)
- **citty + @clack/prompts** (CLI framework and interactive prompts)

## CSS Architecture

**Layered token system** (import order matters):

```
midnight.css    → Design tokens (colors, spacing, typography)
    ↓
reset.css       → CSS normalization
    ↓
typography.css  → Base typography styles
    ↓
components      → Component-specific styles
```

**Token categories:**
- `--surface-*` — backgrounds and layers
- `--text-*` — text colors (primary/secondary/muted)
- `--color-*` — semantic colors (profit/loss/signal/warning)
- `--border-*` — borders and dividers
- `--spacing-*` — margins and padding
- `--radius-*` — border-radius values
- `--font-*` — typography (size, weight, family)
- `--transition-*` — animation timing

**Primitives vs Semantics:**
- Primitives: `--_blue-500`, `--_gray-800` (internal, prefixed with `--_`)
- Semantics: `--color-profit`, `--surface-raised` (use these in components)

## Naming Conventions

- **Component prefix:** All components start with `Quant` (e.g., `QuantBadge`, `QuantButton`)
- **Folders:** kebab-case (`badge/`, `button/`, not `quantBadge/`)
- **CSS classes:** BEM-like kebab-case (`.quant-badge`, `.quant-button--solid`, `.quant-table__cell`)
- **Files:** PascalCase for Vue components (`QuantBadge.vue`), kebab-case for CSS (`midnight.css`)

## Commit Tagging for AI Contributions

When contributing with AI assistance, include these hashtags in your PR description:

```
#VibeCoder #Copilot
#VibeCoder #Claude #Cursor
#VibeCoder #ChatGPT
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for full git workflow.

## What Belongs Where

| Content | Location | Purpose |
|---------|----------|---------|
| CSS tokens | `packages/tokens/` | Design system foundation (colors, spacing, etc.) |
| CLI logic | `packages/cli/src/` | `quanty-ui init` and `quanty-ui add` commands |
| Component source | `components/` | Vue components copied to user projects via CLI |
| Development preview | `playground/` | Live component showcase during development |
| Documentation | `docs/` | Component API, usage guides |

## Quick Start for AI Agents

1. **Adding a new component:**
   - Create `components/<name>/Quant<Name>.vue`
   - Create `components/<name>/index.ts` with `export { default } from './Quant<Name>.vue'`
   - Add entry to `packages/cli/src/registry.json`
   - Add showcase to `playground/src/App.vue`

2. **Modifying CSS tokens:**
   - Edit `packages/tokens/midnight.css` only
   - Never touch `reset.css`
   - Semantic tokens only (no `--_` primitives in components)

3. **Testing:**
   - Run `pnpm --filter playground dev` for live preview
   - Run `pnpm --filter playground build-only` to validate build

## Key Constraints

- ✅ Use CSS custom properties exclusively (never hardcode colors/spacing)
- ✅ Keep components under 60 lines when possible
- ✅ `<style scoped>` mandatory on all components
- ✅ TypeScript props with explicit types and defaults
- ✅ BEM-like kebab-case CSS naming (`.quant-badge--profit`)
- ❌ No external component dependencies (keep it lean)
- ❌ No hardcoded hex colors or pixel values in components
- ❌ No camelCase CSS classes (use kebab-case)
