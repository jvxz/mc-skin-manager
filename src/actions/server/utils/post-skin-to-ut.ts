import { UTApi } from 'uploadthing/server'
import type { Skin } from '@/db/schema'

export async function postSkinToUT(skin: Skin) {
  const ut = new UTApi()

  const skinFileBuffer = Buffer.from(skin.base64, 'base64')
  const skinFile = new File([skinFileBuffer], `${skin.id}.png`, {
    type: 'image/png',
  })

  const uploadRes = await ut.uploadFiles(skinFile)

  if (uploadRes.error) {
    throw new Error('Failed to upload skin')
  }

  return uploadRes.data.ufsUrl
}
