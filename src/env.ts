import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod/v4-mini'

export const env = createEnv({
  runtimeEnv: {
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    DATABASE_URL: process.env.DATABASE_URL,
  },
  server: {
    BETTER_AUTH_SECRET: z.string(),
    BETTER_AUTH_URL: z.url(),
    DATABASE_URL: z.url(),
  },
})
