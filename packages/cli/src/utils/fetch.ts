import { ofetch } from 'ofetch'

export async function fetchFile(url: string): Promise<string> {
  return ofetch(url, {
    responseType: 'text',
    timeout: 8000,
    retry: 0,
  })
}
