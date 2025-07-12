import { Scalar } from '@scalar/hono-api-reference'
import { handle } from 'hono/vercel'
import { createHonoApp } from '@/lib/hono'
import { createOpenApi } from '@/lib/hono/open-api'
import { uploadRoute } from '@/lib/hono/routes/upload/route'

export const dynamic = 'force-dynamic'

const app = createHonoApp().basePath('/api')

createOpenApi(app)
app.get(
  '/scalar',
  Scalar({
    defaultHttpClient: {
      clientKey: 'fetch',
      targetKey: 'js',
    },
    theme: 'alternate',
    url: '/api/docs',
  }),
)

const routes = app.route('/upload', uploadRoute)

export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const PATCH = handle(app)
export const DELETE = handle(app)
export const HEAD = handle(app)
export const OPTIONS = handle(app)

export type AppType = typeof routes
