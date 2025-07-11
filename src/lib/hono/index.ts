import { OpenAPIHono } from '@hono/zod-openapi'
import { type PinoLogger, pinoLogger } from 'hono-pino'
import pino from 'pino'
import pretty from 'pino-pretty'
import { notFound, onError } from 'stoker/middlewares'
import { defaultHook } from 'stoker/openapi'
import type { auth } from '../auth'

type AppBindings = {
  Variables: {
    logger: PinoLogger
    user: typeof auth.$Infer.Session.user | null
    session: typeof auth.$Infer.Session.session | null
  }
}

export function createHonoRouter() {
  return new OpenAPIHono<AppBindings>({
    defaultHook,
    strict: false,
  })
}

export function createHonoApp() {
  const app = createHonoRouter()

  app.use(
    pinoLogger({
      pino: pino(process.env.NODE_ENV === 'production' ? undefined : pretty()),
    }),
  )

  app.onError(onError)
  app.notFound(notFound)

  return app
}
