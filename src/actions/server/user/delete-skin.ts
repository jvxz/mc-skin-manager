'use server'
import { eq } from 'drizzle-orm'
import { UTApi } from 'uploadthing/server'
import { db } from '@/db'
import { type Skin, skins } from '@/db/schema'
import { getAuthData } from '../utils/get-auth-data'

export async function deleteUserSkin(skin: Skin) {
  const authData = await getAuthData()

  if (!authData) {
    throw new Error('Unauthorized')
  }

  if (skin.userId !== authData.user.id) {
    throw new Error('You are not allowed to delete this skin')
  }

  const key = skin.skinUrl.split('/').pop()

  if (!key) {
    throw new Error('Failed to delete skin')
  }

  const ut = new UTApi()
  await ut.deleteFiles(key)

  await db.delete(skins).where(eq(skins.id, skin.id))

  return {
    success: true,
  }
}
