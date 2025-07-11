'use client'
import { useQueryClient } from '@tanstack/react-query'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { signIn, signOut, useSession } from '@/lib/auth/client'

export default function Page() {
  const qc = useQueryClient()
  const { data: session } = useSession()
  if (process.env.NODE_ENV !== 'development') return notFound()

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      {session?.session.token && (
        <Button onClick={() => signOut().then(() => qc.invalidateQueries())}>
          Log out
        </Button>
      )}
      <Button
        onClick={() => {
          signIn.social({
            provider: 'github',
          })
        }}>
        Login with GitHub
      </Button>
      <Button
        onClick={() => {
          signIn.social({
            provider: 'discord',
          })
        }}>
        Login with Discord
      </Button>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  )
}
