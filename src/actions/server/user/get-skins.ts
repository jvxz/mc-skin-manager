'use server'
import { eq } from 'drizzle-orm'
import { db } from '@/db'
import { skins } from '@/db/schema'
import { getAuthData } from '../utils/get-auth-data'

export async function getSkins() {
  const authData = await getAuthData()

  const userSkins = await db.query.skins.findMany({
    where: eq(skins.userId, authData.user.id),
  })

  return userSkins
}
