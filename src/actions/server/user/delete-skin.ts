'use server'
import { eq } from 'drizzle-orm'
import { db } from '@/db'
import { type Skin, skins } from '@/db/schema'
import { getAuthData } from '../utils/get-auth-data'

export async function deleteUserSkin(skin: Skin) {
  const authData = await getAuthData()

  if (skin.userId !== authData.user.id) {
    throw new Error('You are not allowed to delete this skin')
  }

  await db.delete(skins).where(eq(skins.id, skin.id))

  return {
    success: true,
  }
}
