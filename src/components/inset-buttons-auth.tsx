'use client'
import {
  IconBrandGithubFilled,
  IconLogout,
  IconUserCircle,
} from '@tabler/icons-react'
import { signIn, signOut, useSession } from '@/auth/client'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { MdiMicrosoft } from './ui/icons/microsoft'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Spinner } from './ui/spinner'

function InsetButtonsAuth() {
  const { data: sessionData, isPending } = useSession()

  if (isPending)
    return (
      <Button disabled variant="ghost" className="size-16">
        <Spinner className="!size-8" />
      </Button>
    )

  if (sessionData?.user) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" className="size-16">
            <Avatar>
              <AvatarImage src={sessionData.user.image ?? ''} />
              <AvatarFallback>
                {sessionData.user.name?.slice(0, 2).toUpperCase() ?? ''}
              </AvatarFallback>
            </Avatar>
          </Button>
        </PopoverTrigger>
        <PopoverContent side="right" className="p-3">
          <Button
            onClick={() =>
              signOut({
                fetchOptions: {
                  onSuccess: () => window.location.reload(),
                },
              })
            }
            variant="outline"
            className="w-full">
            <IconLogout className="!size-4" />
            Sign out
          </Button>
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="size-16">
          <IconUserCircle className="!size-8" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Welcome back!</DialogTitle>
        </DialogHeader>
        <Button
          isLoading={isPending}
          onClick={() => signIn.social({ provider: 'microsoft' })}
          className="!glow-lime-500 border border-[#74b03c] bg-[#74b03c]/85 text-[#74b03c]-foreground hover:bg-[#74b03c]/90 focus-visible:border-[#74b03c]/50 active:bg-[#74b03c]/85">
          <MdiMicrosoft className="!size-4" />
          Sign in with Microsoft
        </Button>
        <Button
          isLoading={isPending}
          onClick={() => signIn.social({ provider: 'github' })}
          className="!glow-gray-500 border border-[#28282b] bg-[#28282b]/85 text-[#28282b]-foreground hover:bg-[#28282b]/90 focus-visible:border-[#28282b]/50 active:bg-[#28282b]/85">
          <IconBrandGithubFilled className="!size-4" />
          Sign in with GitHub
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export { InsetButtonsAuth }
