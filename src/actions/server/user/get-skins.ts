'use server'
import { eq } from 'drizzle-orm'
import { db } from '@/db'
import { skins } from '@/db/schema'
import { getAuthData } from '../utils/get-auth-data'

export async function getUserSkins() {
  const authData = await getAuthData()

  if (!authData) {
    throw new Error('Unauthorized')
  }

  const userSkins = await db.query.skins.findMany({
    where: eq(skins.userId, authData.user.id),
  })

  return userSkins
}
