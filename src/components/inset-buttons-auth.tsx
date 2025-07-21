'use client'
import {
  IconBrandGithubFilled,
  IconLogout,
  IconUserCircle,
} from '@tabler/icons-react'
import { useState } from 'react'
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
import { IcBaselineDiscord } from './ui/icons/discord'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Spinner } from './ui/spinner'

function InsetButtonsAuth() {
  const [isLoading, setIsLoading] = useState<'discord' | 'github' | null>(null)
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
          isLoading={isLoading === 'discord'}
          onClick={() => {
            setIsLoading('discord')
            signIn.social({ provider: 'discord' })
          }}
          disabled={isLoading !== null && isLoading !== 'discord'}
          className="!glow-indigo-500 border border-[#5866F2] bg-[#5866F2]/85 text-[#5866F2]-foreground hover:bg-[#5866F2]/90 focus-visible:border-[#5866F2]/50 active:bg-[#5866F2]/85">
          <IcBaselineDiscord className="!size-4" />
          Sign in with Discord
        </Button>
        <Button
          isLoading={isLoading === 'github'}
          onClick={() => {
            setIsLoading('github')
            signIn.social({ provider: 'github' })
          }}
          disabled={isLoading !== null && isLoading !== 'github'}
          className="!glow-gray-500 border border-[#28282b] bg-[#28282b]/85 text-[#28282b]-foreground hover:bg-[#28282b]/90 focus-visible:border-[#28282b]/50 active:bg-[#28282b]/85">
          <IconBrandGithubFilled className="!size-4" />
          Sign in with GitHub
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export { InsetButtonsAuth }
