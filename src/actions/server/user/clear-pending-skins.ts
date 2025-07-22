'use server'
import { and, eq } from 'drizzle-orm'
import { db } from '@/db'
import { schema } from '@/db/schema'
import { getAuthData } from '../utils/get-auth-data'

export async function clearPendingSkins() {
  const authData = await getAuthData()

  if (!authData) {
    throw new Error('Unauthorized')
  }

  try {
    await db
      .delete(schema.skins)
      .where(
        and(
          eq(schema.skins.userId, authData.user.id),
          eq(schema.skins.id, 'pending'),
        ),
      )
  } catch (error) {
    console.error(error)
    throw new Error('Failed to clear pending skins')
  }

  return {
    success: true,
  }
}
