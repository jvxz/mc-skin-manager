'use server'
import { eq } from 'drizzle-orm'
import { $fetch } from 'ofetch'
import { db } from '@/db'
import { schema } from '@/db/schema'
import { getAuthData } from '../utils/get-auth-data'

type MojangData = {
  id: string
  name: string
  skins: [
    {
      id: string
      state: 'ACTIVE' | 'INACTIVE'
      url: string
      textureKey: string
      variant: 'SLIM' | 'CLASSIC'
    },
  ]
  capes: {
    id: string
    state: 'INACTIVE' | 'ACTIVE'
    url: string
    alias: string
  }[]
}

export async function getUserMojangData() {
  const authData = await getAuthData()

  if (!authData) {
    return null
  }

  const accountData = await db
    .select()
    .from(schema.account)
    .where(eq(schema.account.userId, authData.user.id))

  if (!accountData[0].mojangAccessToken) {
    return null
  }

  const profile = await $fetch<MojangData>(
    'https://api.minecraftservices.com/minecraft/profile',
    {
      headers: {
        Authorization: `Bearer ${accountData[0].mojangAccessToken}`,
      },
    },
  ).catch(async error => {
    if (error.status === 401) {
      await db
        .update(schema.account)
        .set({ mojangAccessToken: null })
        .where(eq(schema.account.userId, authData.user.id))
      return null
    }
    throw error
  })

  if (!profile) {
    return null
  }

  return {
    accessToken: accountData[0].mojangAccessToken,
    name: profile.name,
  }
}
