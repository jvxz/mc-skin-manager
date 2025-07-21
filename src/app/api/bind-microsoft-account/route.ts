import { eq } from 'drizzle-orm'
import { type NextRequest, NextResponse } from 'next/server'
import { getAuthData } from '@/actions/server/utils/get-auth-data'
import { db } from '@/db'
import { schema } from '@/db/schema'
import { env } from '@/env'

export async function GET(request: NextRequest) {
  const authData = await getAuthData()

  if (!authData) {
    return NextResponse.redirect(
      new URL('/bind-microsoft-account?error=unauthorized', request.url),
    )
  }

  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.redirect(
      new URL('/bind-microsoft-account?error=no_code', request.url),
    )
  }

  const microsoftAccessToken = await authMicrosoft(code)

  if (!microsoftAccessToken) {
    return NextResponse.redirect(
      new URL(
        '/bind-microsoft-account?error=no_microsoft_access_token',
        request.url,
      ),
    )
  }

  const xboxLiveAccessToken = await authXboxLive(microsoftAccessToken)

  if (!xboxLiveAccessToken) {
    return NextResponse.redirect(
      new URL(
        '/bind-microsoft-account?error=no_xbox_live_access_token',
        request.url,
      ),
    )
  }

  const xboxLiveXstsResponse = await authXboxLiveXsts(xboxLiveAccessToken)

  if (!xboxLiveXstsResponse) {
    return NextResponse.redirect(
      new URL(
        '/bind-microsoft-account?error=no_xbox_live_xsts_token',
        request.url,
      ),
    )
  }

  const [xboxLiveXstsToken, xboxLiveXstsUserHash] = xboxLiveXstsResponse

  const mojangAccessToken = await authMojang(
    xboxLiveXstsToken,
    xboxLiveXstsUserHash,
  )

  if (!mojangAccessToken) {
    return NextResponse.redirect(
      new URL(
        '/bind-microsoft-account?error=no_mojang_access_token',
        request.url,
      ),
    )
  }

  await db
    .update(schema.account)
    .set({
      mojangAccessToken,
    })
    .where(eq(schema.account.userId, authData.user.id))

  return NextResponse.redirect(
    new URL('/bind-microsoft-account?success=true', request.url),
  )
}

async function authMicrosoft(code: string) {
  const microsoftAuthUrl =
    'https://login.microsoftonline.com/consumers/oauth2/v2.0/token'

  const microsoftResponse = await fetch(microsoftAuthUrl, {
    body: new URLSearchParams({
      client_id: env.MICROSOFT_CLIENT_ID,
      client_secret: env.MICROSOFT_CLIENT_SECRET,
      code,
      grant_type: 'authorization_code',
      redirect_uri: `${env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/bind-microsoft-account`,
      scope: 'XboxLive.signin',
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
  })

  if (!microsoftResponse.ok) return null

  const data = await microsoftResponse.json()
  return data.access_token as string
}

async function authXboxLive(microsoftAccessToken: string) {
  const xboxLiveAuthUrl = 'https://user.auth.xboxlive.com/user/authenticate'

  const xboxLiveResponse = await fetch(xboxLiveAuthUrl, {
    body: JSON.stringify({
      Properties: {
        AuthMethod: 'RPS',
        RpsTicket: `d=${microsoftAccessToken}`,
        SiteName: 'user.auth.xboxlive.com',
      },
      RelyingParty: 'http://auth.xboxlive.com',
      TokenType: 'JWT',
    }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })

  if (!xboxLiveResponse.ok) return null

  const data = await xboxLiveResponse.json()
  return data.Token as string
}

async function authXboxLiveXsts(XboxLiveToken: string) {
  const xboxLiveXstsUrl = 'https://xsts.auth.xboxlive.com/xsts/authorize'
  const xboxLiveXstsResponse = await fetch(xboxLiveXstsUrl, {
    body: JSON.stringify({
      Properties: {
        SandboxId: 'RETAIL',
        UserTokens: [XboxLiveToken],
      },
      RelyingParty: 'rp://api.minecraftservices.com/',
      TokenType: 'JWT',
    }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })

  if (!xboxLiveXstsResponse.ok) return null

  const data = await xboxLiveXstsResponse.json()
  return [data.Token as string, data.DisplayClaims.xui[0].uhs as string]
}

async function authMojang(
  xboxLiveXstsToken: string,
  xboxLiveXstsUserHash: string,
) {
  const mojangAuthUrl =
    'https://api.minecraftservices.com/authentication/login_with_xbox'

  const mojangResponse = await fetch(mojangAuthUrl, {
    body: JSON.stringify({
      identityToken: `XBL3.0 x=${xboxLiveXstsUserHash};${xboxLiveXstsToken}`,
    }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })
  if (!mojangResponse.ok) return null

  const data = await mojangResponse.json()
  return data.access_token as string
}
