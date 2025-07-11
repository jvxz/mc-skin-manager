'use server'
import * as mc from 'minecraft-api-wrapper'
import type { Skin, SkinInputType } from '@/lib/types'
import { getSkinType } from './get-skin-type'

type Params = {
  type: SkinInputType
  input: string | File
}

export async function getSkinFromInput({ type, input }: Params): Promise<Skin> {
  switch (type) {
    case 'username': {
      const profile = await mc.getProfileFromUsername(input as string)

      if (!profile) throw new Error('Profile not found from username')

      const url = await profile.getSkinUrl()

      if (!url) throw new Error('Username has no skin')

      const uuid = profile.getUUID()

      const skinType = await getSkinType({
        url,
      })

      return {
        id: crypto.randomUUID(),
        inputType: 'username',
        skinType,
        skinUrl: url,
        username: input as string,
        uuid,
      }
    }
    case 'uuid': {
      const profile = await mc.getProfileFromUUID(input as string)

      if (!profile) throw new Error('Profile not found from UUID')

      const url = await profile.getSkinUrl()

      if (!url) throw new Error('UUID has no skin')

      const username = profile.getName()

      const skinType = await getSkinType({
        url,
      })

      return {
        id: crypto.randomUUID(),
        inputType: 'uuid',
        skinType,
        skinUrl: url,
        username,
        uuid: input as string,
      }
    }
    case 'url': {
      const skinType = await getSkinType({
        url: input as string,
      })

      return {
        id: crypto.randomUUID(),
        inputType: 'url',
        skinType,
        skinUrl: input as string,
      }
    }
    case 'file': {
      const buffer = Buffer.from(await (input as File).arrayBuffer())
      const base64 = buffer.toString('base64')

      const skinType = await getSkinType({
        base64,
      })

      return {
        id: crypto.randomUUID(),
        inputType: 'file',
        skinData: base64,
        skinType,
      }
    }
    default:
      return {
        id: crypto.randomUUID(),
        inputType: 'url',
        skinType: 'classic',
        skinUrl: input as string,
      }
  }
}
