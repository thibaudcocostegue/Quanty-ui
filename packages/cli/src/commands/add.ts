import { createInterface } from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import pc from 'picocolors'
import { getRegistry } from '../utils/registry'
import { fetchFile } from '../utils/fetch'
import { writeFileToProject } from '../utils/fs'

interface AddOptions {
  components: string[]
  force?: boolean
  cwd?: string
}

interface QuantUiConfig {
  componentsDir: string
  tokensImported: boolean
}

export async function addCommand(options: AddOptions): Promise<void> {
  const cwd = options.cwd ?? process.cwd()
  const force = Boolean(options.force)
  const requestedComponents = options.components.map((item) => item.trim()).filter(Boolean)

  if (requestedComponents.length === 0) {
    console.error('Please provide at least one component name. Example: quant-ui add badge')
    process.exitCode = 1
    return
  }

  const config = getQuantUiConfig(cwd)
  if (!config) {
    console.error('quant-ui.json not found. Please run "quant-ui init" first.')
    process.exitCode = 1
    return
  }

  const registry = getRegistry()
  let installOrder: string[]

  try {
    installOrder = resolveComponentsWithDependencies(requestedComponents, registry.components)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to resolve component dependencies.'
    console.error(message)
    process.exitCode = 1
    return
  }

  if (installOrder.length === 0) {
    console.error('No valid components to install.')
    process.exitCode = 1
    return
  }

  const addedFiles: string[] = []
  const skippedFiles: string[] = []

  for (const componentName of installOrder) {
    const component = registry.components[componentName]
    if (!component) {
      console.error(`Unknown component: ${componentName}`)
      process.exitCode = 1
      return
    }

    for (const relativeFile of component.files) {
      const sourceUrl = `${registry.baseUrl}/${relativeFile}`
      const destination = resolve(cwd, config.componentsDir, relativeFile)

      if (existsSync(destination) && !force) {
        const overwrite = await askOverwrite(destination)
        if (!overwrite) {
          skippedFiles.push(destination)
          continue
        }
      }

      const content = await resolveComponentContent(sourceUrl, relativeFile)
      await writeFileToProject(destination, content)
      addedFiles.push(destination)
    }
  }

  printSummary(installOrder, addedFiles, skippedFiles)
}

async function resolveComponentContent(sourceUrl: string, relativeFile: string): Promise<string> {
  try {
    return await fetchFile(sourceUrl)
  } catch {
    const localPath = getLocalComponentFilePath(relativeFile)
    if (existsSync(localPath)) {
      return readFileSync(localPath, 'utf-8')
    }

    throw new Error(`Unable to download component file and no local fallback found: ${relativeFile}`)
  }
}

function getLocalComponentFilePath(relativeFile: string): string {
  const currentDir = fileURLToPath(new URL('.', import.meta.url))
  const candidates = [
    resolve(currentDir, 'components', relativeFile),
    resolve(currentDir, '../components', relativeFile),
    resolve(currentDir, '../../components', relativeFile),
    resolve(currentDir, '../../../components', relativeFile),
    resolve(currentDir, '../../../../components', relativeFile),
  ]

  const path = candidates.find((item) => existsSync(item))
  return path ?? candidates[0]
}

function getQuantUiConfig(cwd: string): QuantUiConfig | null {
  const path = resolve(cwd, 'quant-ui.json')
  if (!existsSync(path)) {
    return null
  }

  const raw = readFileSync(path, 'utf-8')
  return JSON.parse(raw) as QuantUiConfig
}

function resolveComponentsWithDependencies(
  requested: string[],
  components: Record<string, { dependencies: string[] }>,
): string[] {
  const visited = new Set<string>()
  const visiting = new Set<string>()
  const order: string[] = []

  const visit = (name: string): void => {
    if (visited.has(name)) return
    if (visiting.has(name)) {
      throw new Error(`Circular dependency detected around: ${name}`)
    }

    const component = components[name]
    if (!component) {
      throw new Error(`Unknown component: ${name}`)
    }

    visiting.add(name)
    for (const dependency of component.dependencies) {
      visit(dependency)
    }
    visiting.delete(name)

    visited.add(name)
    order.push(name)
  }

  for (const name of requested) {
    visit(name)
  }

  return order
}

async function askOverwrite(path: string): Promise<boolean> {
  const rl = createInterface({ input, output })
  try {
    const answer = await rl.question(`File already exists: ${path}. Overwrite? (y/N): `)
    const normalized = answer.trim().toLowerCase()
    return normalized === 'y' || normalized === 'yes'
  } finally {
    rl.close()
  }
}

function printSummary(components: string[], added: string[], skipped: string[]): void {
  console.log(pc.green('✅ Components added successfully.'))
  console.log(`- Components: ${components.join(', ')}`)
  console.log(`- Files added: ${added.length}`)
  if (added.length > 0) {
    for (const item of added) {
      console.log(`  + ${item}`)
    }
  }

  if (skipped.length > 0) {
    console.log(pc.yellow(`- Files skipped: ${skipped.length}`))
    for (const item of skipped) {
      console.log(`  - ${item}`)
    }
  }
}
