import { name, version } from '@/../package.json'
import type { createHonoApp } from '.'

export function createOpenApi(app: ReturnType<typeof createHonoApp>) {
  app.doc('/docs', {
    info: {
      title: name,
      version,
    },
    openapi: '3.0.0',
  })
}
