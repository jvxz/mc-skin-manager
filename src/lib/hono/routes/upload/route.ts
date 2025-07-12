import { z } from '@hono/zod-openapi'
import { jsonContent } from 'stoker/openapi/helpers'
import { db } from '@/db'
import { skin } from '@/db/schema'
import { createHonoRouter } from '../..'

const app = createHonoRouter()

const route = app.openapi(
  {
    description: 'Upload a skin to the server',
    method: 'post',
    path: '/' as const,
    request: {
      body: {
        content: {
          'text/plain': {
            schema: z.string(),
          },
        },
      },
    },
    responses: {
      200: jsonContent(
        z.object({
          message: z.string(),
        }),
        'Skin uploaded',
      ),
      401: jsonContent(
        z.object({
          message: z.string(),
        }),
        'Unauthorized',
      ),
      422: jsonContent(
        z.object({
          message: z.string(),
        }),
        'Invalid skin',
      ),
    },
  },
  async c => {
    const session = c.var.session

    if (!session) {
      return c.json({ message: 'Unauthorized' }, 401)
    }

    const { base64 } = await c.req.json()

    await db.insert(skin).values({
      base64,
      name: 'test',
      userId: session.userId,
    })

    return c.json({ message: 'Skin uploaded' }, 200)
  },
)

export { route as uploadRoute }
