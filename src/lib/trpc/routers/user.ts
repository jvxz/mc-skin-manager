import { getSkins } from '@/actions/server/user/get-skins'
import { publicProcedure, router } from '..'

export const userRouter = router({
  getSkins: publicProcedure.query(async () => await getSkins()),
})

export type UserRouter = typeof userRouter
