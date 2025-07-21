'use server'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { db } from '@/db'
import { account } from '@/db/schema'
import { getAuthData } from '../utils/get-auth-data'
import { getUserMojangData } from './get-user-mojang-data'

export async function unlinkUserMicrosoftAccount() {
  const authData = await getAuthData()

  if (!authData) {
    throw new Error('Unauthorized')
  }

  const mojangData = await getUserMojangData()

  if (!mojangData) {
    throw new Error('You are not linked to a Microsoft account')
  }

  await db
    .update(account)
    .set({
      mojangAccessToken: null,
    })
    .where(eq(account.userId, authData.user.id))

  revalidatePath('/settings')

  return {
    success: true,
  }
}
