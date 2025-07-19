import { getUserSkins } from '@/actions/server/user/get-skins'
import { publicProcedure, router } from '..'

export const userRouter = router({
  getSkins: publicProcedure.query(async () => await getUserSkins()),
})

export type UserRouter = typeof userRouter
