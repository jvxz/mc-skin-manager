'use server'
import * as mc from 'minecraft-api-wrapper'
import type { Skin, SkinTypeAsText } from '@/lib/types'

export async function getSkinFromText(
  type: SkinTypeAsText,
  text: string,
): Promise<Skin> {
  switch (type) {
    case 'username': {
      const profile = await mc.getProfileFromUsername(text)

      if (!profile) throw new Error('Profile not found from username')

      const url = await profile.getSkinUrl()

      if (!url) throw new Error('Username has no skin')

      const uuid = profile.getUUID()

      return {
        id: crypto.randomUUID(),
        skinUrl: url,
        type: 'username',
        username: text,
        uuid,
      }
    }
    case 'uuid': {
      const profile = await mc.getProfileFromUUID(text)

      if (!profile) throw new Error('Profile not found from UUID')

      const url = await profile.getSkinUrl()

      if (!url) throw new Error('UUID has no skin')

      const username = profile.getName()

      return {
        id: crypto.randomUUID(),
        skinUrl: url,
        type: 'uuid',
        username,
        uuid: text,
      }
    }
    default:
      return {
        id: crypto.randomUUID(),
        skinUrl: text,
        type,
      }
  }
}
