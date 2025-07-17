'use server'
import { TRPCError } from '@trpc/server'
import { headers as getHeaders } from 'next/headers'
import { auth } from '@/auth'

export async function getAuthData() {
  const headers = await getHeaders()
  const authData = await auth.api.getSession({ headers })

  if (!authData) {
    throw new TRPCError({
      cause: authData,
      code: 'UNAUTHORIZED',
      message: 'Unauthorized',
    })
  }

  return authData
}
