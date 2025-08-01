'use server'
import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { UTApi } from 'uploadthing/server'
import { auth } from '@/auth'
import { db } from '@/db'
import { skins } from '@/db/schema'
import { getAuthData } from '../utils/get-auth-data'

export async function deleteAccount() {
  const authData = await getAuthData()

  if (!authData) {
    throw new Error('Unauthorized')
  }

  const userSkins = await db.query.skins.findMany({
    where: eq(skins.userId, authData.user.id),
  })

  if (userSkins.length > 0) {
    const skinKeys = userSkins
      .map(skin => {
        const key = skin.skinUrl.split('/').pop()

        if (key) {
          return key
        }
        return null
      })
      .filter(n => n !== null)

    const thumbnailKeys = userSkins
      .map(skin => {
        const key = skin.thumbnailUrl.split('/').pop()

        if (key) {
          return key
        }
        return null
      })
      .filter(n => n !== null)

    const ut = new UTApi()
    await Promise.all([ut.deleteFiles(skinKeys), ut.deleteFiles(thumbnailKeys)])
  }

  await auth.api.deleteUser({
    body: {},
    headers: await headers(),
  })

  return {
    success: true,
  }
}
