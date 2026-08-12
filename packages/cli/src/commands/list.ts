import pc from 'picocolors'
import { getRegistry } from '../utils/registry'

export async function listCommand(): Promise<void> {
  const registry = getRegistry()
  const names = Object.keys(registry.components).sort()

  console.log(pc.bold(`Available components (${names.length}):`))
  for (const name of names) {
    const { dependencies } = registry.components[name]
    const deps = dependencies.length > 0 ? pc.dim(` (depends on: ${dependencies.join(', ')})`) : ''
    console.log(`  ${pc.cyan(name)}${deps}`)
  }
}
