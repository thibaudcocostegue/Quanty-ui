import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index'
  ],
  declaration: true,
  rollup: {
    emitCJS: false
  },
  hooks: {
    'build:done': async () => {
      // Add shebang to the generated ESM file for CLI execution
      const fs = await import('fs')
      const path = await import('path')
      const mjs = path.join(process.cwd(), 'dist', 'index.mjs')
      if (fs.existsSync(mjs)) {
        const content = fs.readFileSync(mjs, 'utf-8')
        if (!content.startsWith('#!/usr/bin/env node')) {
          fs.writeFileSync(mjs, `#!/usr/bin/env node\n${content}`)
        }
      }
    }
  }
})
