'use client'
import { notFound } from 'next/navigation'
import { signIn, signOut, useSession } from '@/auth/client'
import { Button } from '@/components/ui/button'

export default function Page() {
  const { data: session } = useSession()

  if (process.env.NODE_ENV !== 'development') return notFound()

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <Button
        onClick={() =>
          signIn.social({
            provider: 'microsoft',
          })
        }>
        Sign in with Microsoft
      </Button>
      <Button onClick={() => signOut()}>Sign out</Button>
    </div>
  )
}
