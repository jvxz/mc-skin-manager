import { signOut, useSession } from '@/lib/auth/client'
import { Button } from '../ui/button'

function SignOutButton() {
  const { isPending } = useSession()

  return (
    <Button disabled={isPending} size="sm" onClick={() => signOut()}>
      Sign out
    </Button>
  )
}

export { SignOutButton }
