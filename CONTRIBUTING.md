# Contributing to Quanty-ui

Thank you for your interest in contributing to Quanty-ui! This guide will help you get started.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Git
- A code editor

### Setup

```bash
# Clone the repository
git clone https://github.com/thibaudcocostegue/Quanty-ui.git
cd Quanty-ui

# Install dependencies
npm install

# Start development server
npm run dev

# Run type checking
npm run typecheck

# Build the library
npm run build
```

---

## 📁 Project Structure

```
src/
├── index.ts              # Main entry point, plugin registration
├── tokens/               # Design tokens (CSS variables)
│   ├── midnight.css      # Color palette and theme
│   ├── reset.css         # CSS reset
│   └── typography.css    # Typography styles
├── components/           # Vue components
│   └── quantButton/      # Component folder (camelCase)
│       ├── quantButton.vue
│       ├── quantButton.spec.ts
│       └── index.ts
└── composables/          # Vue composables
    └── useTheme.ts
```

---

## 🎨 Coding Standards

### Naming Conventions

**camelCase** is used throughout the project:

- **Files**: `quantButton.vue`, `quantTable.vue`, `useDebounce.ts`
- **Folders**: `quantButton/`, `composables/`
- **Components**: All components are prefixed with `quant` (e.g., `quantButton`, `quantBadge`)
- **Variables**: `backgroundColor`, `isLoading`, `handleClick`
- **Functions**: `formatCurrency()`, `calculateProfit()`

### Component Structure

Each component should follow this structure:

```vue
<script setup lang="ts">
// Imports
import { ref, computed } from 'vue'

// Props interface
interface Props {
  variant?: 'profit' | 'loss' | 'signal'
  disabled?: boolean
}

// Props with defaults
const props = withDefaults(defineProps<Props>(), {
  variant: 'signal',
  disabled: false,
})

// Emits
const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

// Composables
// State
// Computed
// Methods
// Lifecycle hooks
</script>

<template>
  <!-- Template -->
</template>

<style scoped>
/* Only use design tokens, no hardcoded values */
.quant-button {
  background: var(--surface-raised);
  color: var(--text-primary);
  border-radius: var(--radius-md);
  padding: var(--spacing-2) var(--spacing-4);
}
</style>
```

### CSS Guidelines

- **Always use design tokens**: `var(--surface-raised)`, `var(--spacing-4)`, etc.
- **No hardcoded colors or spacing**: Use tokens from `midnight.css`
- **Scoped styles**: Use `<style scoped>` to avoid style leakage
- **BEM-like naming**: `.quant-button`, `.quant-button__icon`, `.quant-button--disabled`

### TypeScript

- **Strict mode enabled**: All code must pass TypeScript checks
- **Explicit types**: Avoid `any`, use proper interfaces
- **Props typing**: Use TypeScript interfaces for component props
- **Exports**: Use named exports for components and composables

---

## 🌿 Git Workflow

### Branch Naming

```
feature/quantButtonComponent
fix/tableHeaderAlignment
docs/readmeInstallation
refactor/designTokens
```

### Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add quantTable component with sorting
fix: correct profit color contrast ratio
docs: update installation instructions
style: format code with prettier
refactor: simplify useDebounce composable
test: add tests for quantBadge
chore: update dependencies
```

### Pull Request Process

1. **Create a feature branch** from `main`
2. **Make your changes** following the coding standards
3. **Test thoroughly**: Ensure type checks pass (`npm run typecheck`)
4. **Write clear commits** using conventional commit format
5. **Update documentation** if needed (README, component docs)
6. **Tag your PR** with VibeCoder hashtags (see below)
7. **Submit PR** with a clear description of changes

---

## 🤖 VibeCoder Policy

**AI assistance is allowed !** Quanty-ui embraces AI-powered development tools.

### Mandatory Tagging

All PRs using AI tools **MUST** include these hashtags in the description:

```markdown
#VibeCoder #Copilot

or

#VibeCoder #Claude #Cursor
```

### Supported Tools

- GitHub Copilot (`#Copilot`)
- Claude (`#Claude`)
- ChatGPT (`#ChatGPT`)
- Cursor (`#Cursor`)
- Codeium (`#Codeium`)
- Any other AI coding assistant

### Your Responsibility

Despite AI assistance, **you are responsible** for:
- Reviewing all generated code
- Ensuring code quality and correctness
- Testing functionality thoroughly
- Following project conventions
- Understanding what you submit

---

## 🧪 Testing

### Component Testing

```bash
# Run tests (when implemented)
npm run test

# Run tests in watch mode
npm run test:watch
```

### Manual Testing

Test your components in the dev environment:

```bash
npm run dev
```

Create test pages in a local `playground/` folder (gitignored) to test components visually.

---

## 📦 Creating a New Component

1. **Create component folder** in `src/components/`:
   ```
   src/components/quantButton/
   ```

2. **Create component file**: `quantButton.vue`

3. **Create index.ts** for exports:
   ```typescript
   export { default as quantButton } from './quantButton.vue'
   ```

4. **Register in main index.ts**:
   ```typescript
   import quantButton from './components/quantButton/quantButton.vue'
   
   const components = [quantButton]
   
   export { quantButton }
   ```

5. **Use design tokens** exclusively in your styles

6. **Add TypeScript types** for all props and emits

7. **Test thoroughly** before submitting PR

---

## 🎯 Design Principles

### Performance First
- Keep components lightweight
- Avoid unnecessary reactivity
- Use `v-once` and `v-memo` when appropriate
- Lazy-load when possible

### Accessibility
- Use semantic HTML
- Support keyboard navigation
- Provide ARIA labels when needed
- Ensure sufficient color contrast

### Finance-Focused
- Use semantic color tokens (`--color-profit`, `--color-loss`)
- Support tabular numbers for alignment
- Dense layouts for data-heavy interfaces
- Dark theme optimized for long sessions

---

## 💬 Communication

### Language Policy

**English only** for:
- Code (variables, functions, comments)
- Commit messages
- Pull requests and issues
- Documentation

This ensures the project remains accessible to the global open-source community.

### Getting Help

- Open an issue for bugs or feature requests
- Use discussions for questions
- Tag maintainers if you need guidance

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to Quanty-ui! 🚀**
