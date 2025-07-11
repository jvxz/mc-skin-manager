import { env } from '@/env'
import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  dialect: 'postgresql',
  out: './drizzle',
  schema: './src/db/schema.ts',
})
