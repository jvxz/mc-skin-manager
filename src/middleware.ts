import { type NextRequest, NextResponse } from 'next/server'
import { ratelimit } from './lib/ratelimit'

export async function middleware(request: NextRequest) {
  const { success } = await ratelimit.limit(
    request.headers.get('x-forwarded-for') ?? '127.0.0.1',
  )

  if (!success) {
    return new Response('Too many requests', { status: 429 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/api/:path*',
}
