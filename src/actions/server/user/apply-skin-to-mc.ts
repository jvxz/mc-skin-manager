'use server'
import type { Skin } from '@/db/schema'
import { getAuthData } from '../utils/get-auth-data'
import { getUserMojangData } from './get-user-mojang-data'

export async function applySkinToMc(skin: Skin) {
  const authData = await getAuthData()

  if (!authData) {
    throw new Error('Unauthorized')
  }

  const mojangData = await getUserMojangData()

  if (!mojangData) {
    throw new Error('User not bound to Microsoft account')
  }

  const body = new FormData()

  body.append('variant', skin.skinType)

  const imgRes = await fetch(skin.skinUrl)
  const imgBlob = await imgRes.blob()

  body.append('file', imgBlob, 'skin.png')

  const res = await fetch(
    'https://api.minecraftservices.com/minecraft/profile/skins',
    {
      body,
      headers: {
        Authorization: `Bearer ${mojangData.accessToken}`,
      },
      method: 'POST',
    },
  )

  if (!res.ok) {
    throw new Error('Failed to apply skin')
  }

  return {
    success: true,
  }
}
