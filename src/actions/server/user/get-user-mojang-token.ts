'use server'
import { eq } from 'drizzle-orm'
import { db } from '@/db'
import { schema } from '@/db/schema'
import { getAuthData } from '../utils/get-auth-data'

export async function getUserMojangToken() {
  const authData = await getAuthData()

  if (!authData) {
    return null
  }

  const accountData = await db
    .select()
    .from(schema.account)
    .where(eq(schema.account.userId, authData.user.id))

  if (!accountData) {
    return null
  }

  return accountData[0].mojangAccessToken
}
