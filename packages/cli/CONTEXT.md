# CLI Development Context

## Overview

The `@quanty-ui/cli` package provides the `quanty-ui` command-line tool for installing components into user projects. It follows the **shadcn model**: components are copied as source files, not installed as npm dependencies.

## Tech Stack

- **citty** — Command routing framework
- **@clack/prompts** — Interactive terminal prompts
- **ofetch** — HTTP client for fetching component files from GitHub
- **unbuild** — Build tool with ESM output
- **fs-extra** — File system operations

## Commands

### `quanty-ui init`

Initializes Quanty UI in a Vue 3 project:
1. Prompts for components directory (default: `src/components/quant`)
2. Installs `@quanty-ui/tokens` package
3. Creates token import in project

**Location:** `packages/cli/src/commands/init.ts`

```typescript
import { defineCommand } from 'citty'
import { text, isCancel, cancel } from '@clack/prompts'

export default defineCommand({
  meta: {
    name: 'init',
    description: 'Initialize Quanty UI in your project'
  },
  async run() {
    const defaultDir = 'src/components/quant'
    
    const answer = await text({
      message: 'Components directory',
      placeholder: defaultDir
    })
    
    if (isCancel(answer)) {
      cancel('Operation cancelled')
      process.exit(0)
    }
    
    // Install @quanty-ui/tokens...
  }
})
```

### `quanty-ui add <component>`

Copies a component from GitHub to the user's project:
1. Resolves component from `registry.json`
2. Fetches `.vue` and `.ts` files from GitHub raw URL
3. Prompts if file already exists (overwrite?)
4. Recursively installs dependencies

**Location:** `packages/cli/src/commands/add.ts`

```typescript
import { defineCommand } from 'citty'
import { confirm, isCancel } from '@clack/prompts'
import { ofetch } from 'ofetch'

export default defineCommand({
  meta: {
    name: 'add',
    description: 'Add a component to your project'
  },
  args: {
    component: {
      type: 'positional',
      description: 'Component name to add',
      required: true
    }
  },
  async run({ args }) {
    // Fetch registry...
    // Download files...
    
    if (fileExists) {
      const overwrite = await confirm({
        message: 'File already exists. Overwrite?',
        initialValue: false
      })
      
      if (isCancel(overwrite)) {
        cancel('Operation cancelled')
        process.exit(0)
      }
    }
  }
})
```

## Registry Structure

**Location:** `packages/cli/src/registry.json`

The registry maps component names to their files and dependencies:

```json
{
  "version": "1",
  "baseUrl": "https://raw.githubusercontent.com/thibaudcocostegue/Quanty-ui/quanty-ui-cli-v0.1.0/components",
  "components": {
    "badge": {
      "files": [
        "badge/QuantBadge.vue",
        "badge/index.ts"
      ],
      "dependencies": []
    },
    "button": {
      "files": [
        "button/QuantButton.vue",
        "button/index.ts"
      ],
      "dependencies": []
    },
    "table": {
      "files": [
        "table/QuantTable.vue",
        "table/index.ts"
      ],
      "dependencies": ["button"]
    }
  }
}
```

### Adding a New Component to Registry

```json
{
  "your-component": {
    "files": [
      "your-component/QuantYourComponent.vue",
      "your-component/index.ts"
    ],
    "dependencies": []  // Or ["badge", "button"] if needed
  }
}
```

**Important:** Update the git tag in `baseUrl` after registry changes:
```
baseUrl: .../quanty-ui-cli-v0.1.0/...
         ↑ Must match your git tag
```

## Build Configuration

**Location:** `packages/cli/build.config.ts`

```typescript
import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['src/index'],
  rollup: {
    inlineDependencies: true
  },
  hooks: {
    'build:done': async (ctx) => {
      // Inject #!/usr/bin/env node shebang
      const outputPath = resolve(ctx.options.outDir, 'index.mjs')
      const content = await readFile(outputPath, 'utf-8')
      
      if (!content.startsWith('#!')) {
        await writeFile(
          outputPath,
          `#!/usr/bin/env node\n${content}`,
          'utf-8'
        )
      }
    }
  }
})
```

**Why the shebang?** The CLI needs `#!/usr/bin/env node` at the top of `dist/index.mjs` to be executable. unbuild doesn't add this automatically, so we inject it post-build.

## Package.json Essentials

```json
{
  "name": "@quanty-ui/cli",
  "type": "module",
  "bin": {
    "quanty-ui": "./dist/index.mjs"
  },
  "dependencies": {
    "@clack/prompts": "^1.1.0",
    "citty": "^0.1.6",
    "ofetch": "^1.5.1"
  }
}
```

- **`type: "module"`** — ESM-only package
- **`bin`** — Makes `quanty-ui` command available globally
- **`dist/index.mjs`** — Built output from unbuild

## GitHub URL Pattern

Components are fetched from GitHub raw URLs:

```
https://raw.githubusercontent.com/thibaudcocostegue/Quanty-ui/quanty-ui-cli-v0.1.0/components/badge/QuantBadge.vue
                                   ↑ repo owner       ↑ repo name    ↑ git tag           ↑ component path
```

**Why git tags?** Ensures stable URLs that don't break when `main` branch changes.

## Local Development

```bash
# Build CLI
cd packages/cli
pnpm build

# Test locally (from repo root)
node packages/cli/dist/index.mjs add badge
```

## Publishing Workflow

1. Update version in `package.json`
2. Build: `pnpm build`
3. Create git tag: `git tag quanty-ui-cli-v0.1.0`
4. Push tag: `git push origin quanty-ui-cli-v0.1.0`
5. Publish to npm: `npm publish` (from `packages/cli`)

**⚠️ Critical:** Git tag must be pushed BEFORE publishing to npm, since `registry.json` references the tag in URLs.

## Error Handling

Always check for cancellation on prompts:

```typescript
const answer = await text({ message: 'Directory?' })

if (isCancel(answer)) {
  cancel('Operation cancelled')
  process.exit(0)
}
```

## File Operations

Use `fs-extra` for safer file operations:

```typescript
import fs from 'fs-extra'

// Check if file exists
if (await fs.pathExists(filePath)) {
  // Prompt for overwrite...
}

// Ensure directory exists
await fs.ensureDir(dirname(filePath))

// Write file
await fs.writeFile(filePath, content, 'utf-8')
```

## Testing

```bash
# Test init command
cd /tmp && mkdir test-project && cd test-project
npm init -y
node /path/to/cli/dist/index.mjs init

# Test add command
node /path/to/cli/dist/index.mjs add badge
```
