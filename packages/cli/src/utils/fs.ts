import fsExtra from 'fs-extra'
import { dirname } from 'node:path'

export async function writeFileToProject(path: string, content: string): Promise<void> {
  const { ensureDir, writeFile } = fsExtra
  await ensureDir(dirname(path))
  await writeFile(path, content, 'utf-8')
}
