import { OpenAPIHono } from '@hono/zod-openapi'
import { type PinoLogger, pinoLogger } from 'hono-pino'
import pino from 'pino'
import pretty from 'pino-pretty'
import { notFound, onError } from 'stoker/middlewares'
import { defaultHook } from 'stoker/openapi'

type AppBindings = { Variables: { logger: PinoLogger } }

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
