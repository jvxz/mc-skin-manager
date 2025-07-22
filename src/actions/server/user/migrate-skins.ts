'use server'
import { db } from '@/db'
import { type Skin, skins } from '@/db/schema'
import { getAuthData } from '../utils/get-auth-data'
import { postSkinToUT } from '../utils/post-skin-to-ut'

export async function migrateLocalSkinsToUser(localSkins: Skin[]) {
  const authData = await getAuthData()

  if (!authData) {
    throw new Error('Unauthorized')
  }

  const patchedLocalSkins: Skin[] = await Promise.all(
    localSkins.map(async skin => {
      if (skin.skinUrl === '') {
        const skinUrl = await postSkinToUT(skin)

        return {
          ...skin,
          createdAt: new Date(skin.createdAt),
          skinUrl,
          userId: authData.user.id,
        }
      }

      return {
        ...skin,
        createdAt: new Date(skin.createdAt),
        userId: authData.user.id,
      }
    }),
  )

  await db.insert(skins).values(patchedLocalSkins)

  return patchedLocalSkins
}
