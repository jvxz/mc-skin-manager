import {
  IconBrandDiscordFilled,
  IconBrandGithubFilled,
} from '@tabler/icons-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { signIn, useSession } from '@/lib/auth/client'
import { Button } from '../ui/button'

function SignInButton() {
  const { isPending } = useSession()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button disabled={isPending} size="sm">
          Sign in
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end">
        <div className="flex flex-col gap-2">
          <Button
            className="bg-[#5865F2] text-foreground hover:bg-[#5865F2] active:bg-[#5865F2]/80"
            onClick={() =>
              signIn.social({
                provider: 'discord',
              })
            }>
            Sign in with Discord <IconBrandDiscordFilled />
          </Button>
          <Button
            className="bg-[#212830] text-foreground hover:bg-[#212830] active:bg-[#212830]/80"
            onClick={() =>
              signIn.social({
                provider: 'github',
              })
            }>
            Sign in with GitHub <IconBrandGithubFilled />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export { SignInButton }
