'use client'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth/client'

export default function Page() {
  const qc = useQueryClient()
  const { data: session } = useQuery({
    queryFn: () => authClient.getSession(),
    queryKey: ['session'],
  })

  if (process.env.NODE_ENV !== 'development') return notFound()

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      {session?.data?.session.token && (
        <Button
          onClick={() =>
            authClient.signOut().then(() => qc.invalidateQueries())
          }>
          Log out
        </Button>
      )}
      <Button
        onClick={() => {
          authClient.signIn.social({
            provider: 'github',
          })
        }}>
        Login with GitHub
      </Button>
      <Button
        onClick={() => {
          authClient.signIn.social({
            provider: 'discord',
          })
        }}>
        Login with Discord
      </Button>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  )
}
