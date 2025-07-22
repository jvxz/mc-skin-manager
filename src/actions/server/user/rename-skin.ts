'use server'
import { eq } from 'drizzle-orm'
import { db } from '@/db'
import { type Skin, skins } from '@/db/schema'
import { getAuthData } from '../utils/get-auth-data'

export async function renameUserSkin(skin: Skin, name: string) {
  const authData = await getAuthData()

  if (!authData) {
    throw new Error('Unauthorized')
  }

  if (skin.userId !== authData.user.id) {
    throw new Error('You are not allowed to rename this skin')
  }

  await db.update(skins).set({ name }).where(eq(skins.id, skin.id))

  return {
    success: true,
  }
}
