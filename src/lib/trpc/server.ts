import { publicProcedure, router } from './index'

export const appRouter = router({
  hello: publicProcedure.query(
    () =>
      new Promise<string>(resolve => {
        setTimeout(() => {
          resolve('data from trpc!')
        }, 5000)
      }),
  ),
})

export type AppRouter = typeof appRouter
