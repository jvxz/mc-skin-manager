'use client'
import { IconCheck } from '@tabler/icons-react'
import { Link } from 'next-view-transitions'
import { Suspense } from 'react'
import { env } from '@/env'
import { useUser } from '@/hooks/use-user'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog'
import { Button } from '../ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { MdiMicrosoft } from '../ui/icons/microsoft'
import { Skeleton } from '../ui/skeleton'

function SettingsLinkMicrosoft() {
  return (
    <Card className="w-full p-6">
      <CardHeader>
        <CardTitle>Microsoft integration</CardTitle>
        <CardDescription>
          Apply skins to Minecraft by linking your Microsoft account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<Skeleton className="h-8 w-42" />}>
          <SettingsLinkMicrosoftActions />
        </Suspense>
      </CardContent>
    </Card>
  )
}

const link = `https://login.microsoftonline.com/consumers/oauth2/v2.0/authorize?client_id=${env.NEXT_PUBLIC_MICROSOFT_CLIENT_ID}&prompt=select_account&response_type=code&redirect_uri=${encodeURI(
  `${env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/bind-microsoft-account`,
)}&response_mode=query&scope=${encodeURI('XboxLive.SignIn')}`

function SettingsLinkMicrosoftActions() {
  const {
    mojangData,
    authData,
    unlinkMicrosoftAccount,
    isLoading,
    isMutating,
  } = useUser()

  if (isLoading) {
    return <Skeleton className="h-8 w-42" />
  }

  if (!authData?.user) {
    return (
      <Button
        disabled
        className="!glow-lime-500 border border-[#74b03c] bg-[#74b03c]/85 text-[#74b03c]-foreground opacity-50 hover:bg-[#74b03c]/90 focus-visible:border-[#74b03c]/50 active:bg-[#74b03c]/85"
        asChild>
        <Link href={link}>
          <MdiMicrosoft className="!size-4" />
          Sign in with Microsoft
        </Link>
      </Button>
    )
  }

  if (!mojangData) {
    return (
      <Button
        className="!glow-lime-500 border border-[#74b03c] bg-[#74b03c]/85 text-[#74b03c]-foreground hover:bg-[#74b03c]/90 focus-visible:border-[#74b03c]/50 active:bg-[#74b03c]/85"
        asChild>
        <Link href={link}>
          <MdiMicrosoft className="!size-4" />
          Sign in with Microsoft
        </Link>
      </Button>
    )
  }

  return (
    <div className="flex items-center gap-3">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            isLoading={isMutating}
            className="!glow-red-500 border border-destructive bg-destructive/85 text-destructive-foreground hover:bg-destructive/90 focus-visible:border-destructive/50 active:bg-destructive/85">
            Unlink
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unlink Microsoft account</AlertDialogTitle>
            <AlertDialogDescription>
              Unlinking your Microsoft account will disallow you to apply skins.
              Do you want to continue?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => unlinkMicrosoftAccount()}
              className="!glow-red-500 border border-destructive bg-destructive/85 text-destructive-foreground hover:bg-destructive/90 focus-visible:border-destructive/50 active:bg-destructive/85">
              Unlink
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="flex items-center gap-1 text-muted-foreground text-sm">
        <IconCheck className="size-5" />
        <p>
          Signed in as{' '}
          <span className="font-medium font-mono">{mojangData.name}</span>
        </p>
      </div>
    </div>
  )
}

export { SettingsLinkMicrosoft }
