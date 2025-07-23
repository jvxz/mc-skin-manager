import { eq } from 'drizzle-orm'
import { MojangAuthProfile } from 'minecraft-api-wrapper'
import { type NextRequest, NextResponse } from 'next/server'
import { getAuthData } from '@/actions/server/utils/get-auth-data'
import { db } from '@/db'
import { schema } from '@/db/schema'
import { env } from '@/env'

const redirect = '/settings/account'

export async function GET(request: NextRequest) {
  const authData = await getAuthData()

  if (!authData) {
    return NextResponse.redirect(
      new URL(`${redirect}?error=unauthorized`, request.url),
    )
  }

  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.redirect(
      new URL(`${redirect}?error=no_code`, request.url),
    )
  }

  const profile = new MojangAuthProfile(
    env.NEXT_PUBLIC_MICROSOFT_CLIENT_ID,
    env.MICROSOFT_CLIENT_SECRET,
    `${env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/bind-microsoft-account`,
    code,
  )

  const authenticated = await profile.authenticate()

  if (!authenticated) {
    return NextResponse.redirect(
      new URL(`${redirect}?error=no_authenticated`, request.url),
    )
  }

  await db
    .update(schema.account)
    .set({
      mojangAccessToken: profile.mojangAccessToken,
    })
    .where(eq(schema.account.userId, authData.user.id))

  return NextResponse.redirect(new URL(`${redirect}?success=true`, request.url))
}
