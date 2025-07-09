import { z } from '@hono/zod-openapi'
import { jsonContent } from 'stoker/openapi/helpers'
import { createHonoRouter } from '@/lib/hono'

const app = createHonoRouter()

const route = app.openapi(
  {
    method: 'get',
    // this is required to be type casted as a const,
    // otherwise the rpc client will throw a type error
    path: '/' as const,
    responses: {
      200: jsonContent(
        z.object({
          message: z.string(),
        }),
        'test resolved 🔥',
      ),
    },
  },
  async c => c.json({ message: 'hello from hono!! 🔥' }, 200),
)

export { route as greeting }
