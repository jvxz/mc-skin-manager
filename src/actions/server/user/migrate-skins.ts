'use server'
import { db } from '@/db'
import { type Skin, skins } from '@/db/schema'
import { getAuthData } from '../utils/get-auth-data'

export async function migrateLocalSkinsToUser(localSkins: Skin[]) {
  const authData = await getAuthData()

  if (!authData) {
    throw new Error('Unauthorized')
  }

  const patchedLocalSkins = localSkins.map(skin => ({
    ...skin,
    createdAt: new Date(skin.createdAt),
    userId: authData.user.id,
  }))

  await db.insert(skins).values(patchedLocalSkins)

  return patchedLocalSkins
}
