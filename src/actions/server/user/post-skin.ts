'use server'
import { UTApi } from 'uploadthing/server'
import { db } from '@/db'
import { type Skin, skins } from '@/db/schema'
import { getAuthData } from '../utils/get-auth-data'
import { getFileFromB64 } from '../utils/get-file-from-b64'

const ut = new UTApi()

export async function postUserSkin(
  skinInput: Omit<Skin, 'userId' | 'skinUrl'>,
) {
  const authData = await getAuthData()

  if (!authData) {
    throw new Error('Unauthorized')
  }

  const skinFile = getFileFromB64(
    skinInput.base64,
    `${authData.user.id}/${skinInput.id}.png`,
  )

  const uploadRes = await ut.uploadFiles(skinFile)

  if (uploadRes.error) {
    throw new Error('Failed to upload skin')
  }

  const skin = {
    ...skinInput,
    skinUrl: uploadRes.data.ufsUrl,
    userId: authData.user.id,
  }

  await db.insert(skins).values(skin)

  return skin
}
