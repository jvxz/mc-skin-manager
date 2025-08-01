'use server'
import { db } from '@/db'
import { type Skin, skins } from '@/db/schema'
import { getAuthData } from '../utils/get-auth-data'
import { postSkinToUT } from '../utils/post-skin-to-ut'
import { postThumbnailToUT } from '../utils/post-thumbnail-to-ut'

type Props = {
  localSkin: Skin
  thumbnailB64: string
}[]

export async function migrateLocalSkinsToUser(props: Props) {
  const authData = await getAuthData()

  if (!authData) {
    throw new Error('Unauthorized')
  }

  const patchedSkins: Skin[] = await Promise.all(
    props.map(async skin => {
      const thumbnailUrl = await postThumbnailToUT(skin.thumbnailB64)
      if (skin.localSkin.skinUrl === '') {
        const skinUrl = await postSkinToUT(skin.localSkin)

        return {
          ...skin.localSkin,
          createdAt: new Date(skin.localSkin.createdAt),
          skinUrl,
          thumbnailUrl,
          userId: authData.user.id,
        }
      }

      return {
        ...skin.localSkin,
        createdAt: new Date(skin.localSkin.createdAt),
        thumbnailUrl,
        userId: authData.user.id,
      }
    }),
  )

  await db.insert(skins).values(patchedSkins)

  return patchedSkins
}
