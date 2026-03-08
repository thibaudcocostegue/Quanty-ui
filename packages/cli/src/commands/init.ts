import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { cancel, isCancel, text } from '@clack/prompts'

type PackageManager = 'pnpm' | 'npm' | 'yarn'

interface InitOptions {
  cwd?: string
}

interface QuantUiConfig {
  componentsDir: string
  tokensImported: boolean
}

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
  const packageManager = detectPackageManager(cwd)

  writeQuantUiConfig(cwd, {
    componentsDir,
    tokensImported: false,
  })

  const tokensInstalled = installTokens(packageManager, cwd)
  const tokensImported = tokensInstalled ? tryInjectTokensImports(cwd) : false

  writeQuantUiConfig(cwd, {
    componentsDir,
    tokensImported,
  })

  console.log('✅ Quant UI initialized successfully.')
  console.log(`- componentsDir: ${componentsDir}`)
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

function tryInjectTokensImports(cwd: string): boolean {
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

  const imports = [
    "import '@quanty-ui/tokens/reset.css'",
    "import '@quanty-ui/tokens/typography.css'",
    "import '@quanty-ui/tokens/midnight.css'",
  ]

  const content = readFileSync(mainPath, 'utf-8')
  const linesToAdd = imports.filter((line) => !content.includes(line))

  if (linesToAdd.length === 0) {
    return true
  }

  const nextContent = `${linesToAdd.join('\n')}\n${content}`
  writeFileSync(mainPath, nextContent, 'utf-8')
  return true
}
