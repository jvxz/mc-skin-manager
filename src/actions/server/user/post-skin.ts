'use server'
import { db } from '@/db'
import { type Skin, skins } from '@/db/schema'
import { getAuthData } from '../utils/get-auth-data'

export async function postUserSkin(skinInput: Omit<Skin, 'userId'>) {
  const authData = await getAuthData()

  const skin = {
    ...skinInput,
    userId: authData.user.id,
  }

  await db.insert(skins).values(skin)

  return skin
}
