import { initTRPC } from '@trpc/server'

const t = initTRPC.create()

export const router = t.router
export const publicProcedure = t.procedure.use(async opts => {
  const result = await opts.next()

  // biome-ignore lint/suspicious/noConsole: server only
  console.debug(result)

  return result
})
