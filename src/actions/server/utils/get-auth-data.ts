'use server'
import { headers as getHeaders } from 'next/headers'
import { auth } from '@/auth'

export async function getAuthData() {
  const headers = await getHeaders()
  const authData = await auth.api.getSession({ headers })

  if (!authData) {
    return null
  }

  return authData
}
