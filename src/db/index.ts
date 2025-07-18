import { drizzle } from 'drizzle-orm/neon-http'
import { env } from '@/env'
import { schema } from './schema'

export const db = drizzle(env.DATABASE_URL, {
  schema,
})
