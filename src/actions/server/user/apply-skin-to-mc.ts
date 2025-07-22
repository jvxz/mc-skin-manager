'use server'
import { MojangAuthProfile } from 'minecraft-api-wrapper'
import type { Skin } from '@/db/schema'
import { getAuthData } from '../utils/get-auth-data'
import { getUserMojangData } from './get-user-mojang-data'

export async function applySkinToMc(skin: Skin) {
  const authData = await getAuthData()

  if (!authData) {
    throw new Error(
      'Unauthorized',
      // {
      // cause: 'Unauthorized user attempted to apply skin to Minecraft',
      // }
    )
  }

  const mojangData = await getUserMojangData()

  if (!mojangData) {
    throw new Error(
      'User not bound to Microsoft account',
      // {
      // cause:
      // 'Authorized user attempted to apply skin to Minecraft without a bound Microsoft account',
      // }
    )
  }

  const profile = new MojangAuthProfile(mojangData.accessToken)

  const res = await profile.changeSkin(
    skin.skinUrl,
    skin.skinType === 'SLIM' ? 'slim' : 'classic',
  )

  if (res) {
    throw new Error(
      'Failed to apply skin',
      // {
      // cause:
      // 'Authorized user with bound Microsoft account encountered an unknown error while applying skin to their Minecraft account',
      // }
    )
  }

  return res
}
