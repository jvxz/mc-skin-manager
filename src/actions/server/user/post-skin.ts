'use server'
import { db } from '@/db'
import { type Skin, skins } from '@/db/schema'
import { getAuthData } from '../utils/get-auth-data'

export async function postSkin(skin: Omit<Skin, 'userId'>) {
  const authData = await getAuthData()

  await db.insert(skins).values({
    ...skin,
    userId: authData.user.id,
  })

  return {
    success: true,
  }
}
