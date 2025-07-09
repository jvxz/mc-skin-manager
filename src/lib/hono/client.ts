import { hc } from 'hono/client'
import type { AppType } from '@/app/api/[...route]/route'

function getBaseUrl() {
  if (typeof window !== 'undefined') return ''
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return 'http://localhost:3000'
}

export const client = hc<AppType>(getBaseUrl())
