import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

export interface RegistryComponent {
  files: string[]
  dependencies: string[]
}

export interface RegistrySchema {
  version: string
  baseUrl: string
  components: Record<string, RegistryComponent>
}

export function getRegistry(): RegistrySchema {
  const currentDir = fileURLToPath(new URL('.', import.meta.url))
  const candidates = [
    resolve(currentDir, 'registry.json'),
    resolve(currentDir, '../src/registry.json'),
    resolve(currentDir, '../registry.json'),
  ]

  const path = candidates.find((item) => existsSync(item))
  if (!path) {
    throw new Error('registry.json not found.')
  }

  const raw = readFileSync(path, 'utf-8')
  return JSON.parse(raw) as RegistrySchema
}
