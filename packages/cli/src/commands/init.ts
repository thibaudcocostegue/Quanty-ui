import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, relative, resolve } from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { cancel, isCancel, select, text } from '@clack/prompts'

type PackageManager = 'pnpm' | 'npm' | 'yarn'

interface InitOptions {
  cwd?: string
}

interface QuantUiConfig {
  componentsDir: string
  theme: QuantTheme
  customThemeFile?: string
  tokensImported: boolean
}

type QuantTheme = 'midnight' | 'fund-color' | 'custom'

interface PackageJson {
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
}

export async function initCommand(options: InitOptions = {}) {
  const cwd = options.cwd ?? process.cwd()
  const packageJsonPath = resolve(cwd, 'package.json')

  if (!existsSync(packageJsonPath)) {
    console.error('No package.json found in the current directory.')
    process.exitCode = 1
    return
  }

  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8')) as PackageJson

  if (!isVueTsProject(packageJson)) {
    console.error('This project is not detected as Vue 3 + TypeScript.')
    process.exitCode = 1
    return
  }

  const componentsDir = await askComponentsDir()
  const theme = await askTheme()
  const packageManager = detectPackageManager(cwd)
  const customThemeFile = theme === 'custom' ? ensureCustomThemeFile(cwd) : undefined

  writeQuantUiConfig(cwd, {
    componentsDir,
    theme,
    customThemeFile,
    tokensImported: false,
  })

  const tokensInstalled = installTokens(packageManager, cwd)
  const tokensImported = tokensInstalled ? tryInjectTokensImports(cwd, theme, customThemeFile) : false

  writeQuantUiConfig(cwd, {
    componentsDir,
    theme,
    customThemeFile,
    tokensImported,
  })

  console.log('✅ Quant UI initialized successfully.')
  console.log(`- componentsDir: ${componentsDir}`)
  console.log(`- theme: ${theme}`)
  if (customThemeFile) {
    console.log(`- customThemeFile: ${customThemeFile}`)
  }
  console.log(`- packageManager: ${packageManager}`)
  console.log(`- tokensImported: ${tokensImported}`)
}

function isVueTsProject(packageJson: PackageJson): boolean {
  const dependencies = packageJson.dependencies ?? {}
  const devDependencies = packageJson.devDependencies ?? {}

  const vueVersion = dependencies.vue ?? devDependencies.vue
  const hasVue3 = typeof vueVersion === 'string' && vueVersion.includes('3')
  const hasTypeScript = Boolean(devDependencies.typescript ?? dependencies.typescript)

  return hasVue3 && hasTypeScript
}

async function askComponentsDir(): Promise<string> {
  const defaultDir = 'src/components/ui'
  const answer = await text({
    message: 'Components directory',
    placeholder: defaultDir,
    defaultValue: defaultDir,
  })

  if (isCancel(answer)) {
    cancel('Operation cancelled.')
    process.exitCode = 1
    return defaultDir
  }

  const value = String(answer).trim()
  return value.length > 0 ? normalizeDirectory(value) : defaultDir
}

function normalizeDirectory(value: string): string {
  return value.replace(/\\+/g, '/').replace(/\/$/, '')
}

async function askTheme(): Promise<QuantTheme> {
  const answer = await select({
    message: 'Default theme for this project',
    options: [
      { value: 'midnight', label: 'midnight (default Quant theme)' },
      { value: 'fund-color', label: 'fund-color (strict black/orange/gray/white)' },
      { value: 'custom', label: 'custom (generate local theme file)' },
    ],
    initialValue: 'midnight',
  })

  if (isCancel(answer)) {
    cancel('Operation cancelled.')
    process.exitCode = 1
    return 'midnight'
  }

  return answer as QuantTheme
}

function detectPackageManager(cwd: string): PackageManager {
  if (existsSync(resolve(cwd, 'pnpm-lock.yaml'))) return 'pnpm'
  if (existsSync(resolve(cwd, 'yarn.lock'))) return 'yarn'
  return 'npm'
}

function installTokens(packageManager: PackageManager, cwd: string): boolean {
  const commandByManager: Record<PackageManager, { command: string; args: string[] }> = {
    pnpm: { command: 'pnpm', args: ['add', '@quanty-ui/tokens'] },
    npm: { command: 'npm', args: ['install', '@quanty-ui/tokens'] },
    yarn: { command: 'yarn', args: ['add', '@quanty-ui/tokens'] },
  }

  const { command, args } = commandByManager[packageManager]
  const result = spawnSync(command, args, { cwd, stdio: 'inherit' })

  if (result.status === 0) {
    return true
  }

  const localTokensPath = getLocalTokensPath()
  if (localTokensPath && existsSync(localTokensPath)) {
    console.warn('Failed to install @quanty-ui/tokens from npm. Trying local package fallback...')
    const fallbackArgsByManager: Record<PackageManager, { command: string; args: string[] }> = {
      pnpm: { command: 'pnpm', args: ['add', localTokensPath] },
      npm: { command: 'npm', args: ['install', localTokensPath] },
      yarn: { command: 'yarn', args: ['add', localTokensPath] },
    }

    const fallback = fallbackArgsByManager[packageManager]
    const fallbackResult = spawnSync(fallback.command, fallback.args, { cwd, stdio: 'inherit' })
    if (fallbackResult.status === 0) {
      return true
    }
  }

  console.error('Failed to install @quanty-ui/tokens.')
  process.exitCode = 1
  return false
}

function getLocalTokensPath(): string | null {
  const currentDir = fileURLToPath(new URL('.', import.meta.url))
  const candidates = [
    resolve(currentDir, '../../../tokens'),
    resolve(currentDir, '../../tokens'),
    resolve(currentDir, '../tokens'),
  ]

  const path = candidates.find((item) => existsSync(item))
  return path ?? null
}

function writeQuantUiConfig(cwd: string, config: QuantUiConfig): void {
  const path = resolve(cwd, 'quant-ui.json')
  writeFileSync(path, `${JSON.stringify(config, null, 2)}\n`, 'utf-8')
}

function ensureCustomThemeFile(cwd: string): string {
  const relativePath = 'src/styles/quant-theme.custom.css'
  const absolutePath = resolve(cwd, relativePath)

  if (!existsSync(absolutePath)) {
    mkdirSync(resolve(cwd, 'src/styles'), { recursive: true })
    writeFileSync(
      absolutePath,
      `/* Quant UI custom theme overrides */\n[data-quant-theme='custom'] {\n  /* Keep semantic tokens only */\n  --surface-base: #000000;\n  --surface-raised: #050505;\n  --text-primary: #ffffff;\n  --text-secondary: #9b9b9b;\n  --color-signal: #ff9900;\n  --border-default: #888888;\n}\n`,
      'utf-8'
    )
  }

  return relativePath
}

function tryInjectTokensImports(cwd: string, theme: QuantTheme, customThemeFile?: string): boolean {
  const mainCandidates = [
    resolve(cwd, 'src/main.ts'),
    resolve(cwd, 'src/main.js'),
    resolve(cwd, 'main.ts'),
    resolve(cwd, 'main.js'),
  ]

  const mainPath = mainCandidates.find((candidate) => existsSync(candidate))
  if (!mainPath) {
    console.warn('No main.ts/main.js file found. Add token imports manually.')
    return false
  }

  const content = readFileSync(mainPath, 'utf-8')
  const linesToAdd: string[] = []

  if (!content.includes("import '@quanty-ui/tokens'")) {
    linesToAdd.push("import '@quanty-ui/tokens'")
  }

  if (theme === 'custom' && customThemeFile) {
    const customAbsolutePath = resolve(cwd, customThemeFile)
    let importPath = relative(dirname(mainPath), customAbsolutePath).replace(/\\+/g, '/')
    if (!importPath.startsWith('.')) {
      importPath = `./${importPath}`
    }
    const customImport = `import '${importPath}'`
    if (!content.includes(customImport)) {
      linesToAdd.push(customImport)
    }
  }

  const applyThemeSnippet = buildThemeApplySnippet(theme)
  const hasThemeSnippet = content.includes("// quanty-ui: enforce configured theme")
  const nextContentBase = linesToAdd.length > 0 ? `${linesToAdd.join('\n')}\n${content}` : content

  if (linesToAdd.length === 0 && hasThemeSnippet) {
    return true
  }

  const nextContent = hasThemeSnippet ? nextContentBase : `${applyThemeSnippet}\n${nextContentBase}`
  writeFileSync(mainPath, nextContent, 'utf-8')
  return true
}

function buildThemeApplySnippet(theme: QuantTheme): string {
  if (theme === 'midnight') {
    return "// quanty-ui: enforce configured theme\ndocument.documentElement.removeAttribute('data-quant-theme')"
  }

  return `// quanty-ui: enforce configured theme\ndocument.documentElement.setAttribute('data-quant-theme', '${theme}')`
}
