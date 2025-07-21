'use server'
import { eq } from 'drizzle-orm'
import { MojangAuthProfile } from 'minecraft-api-wrapper'
import { db } from '@/db'
import { schema } from '@/db/schema'
import { getAuthData } from '../utils/get-auth-data'

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

  const profile = new MojangAuthProfile(accountData[0].mojangAccessToken)

  const skin = await profile.getActiveSkin()
  const cape = await profile.getActiveCape()
  const name = await profile.getName()
  const uuid = await profile.getUUID()

  return {
    authenticated: profile.authenticated,
    cape,
    name,
    skin,
    uuid,
  }
}
