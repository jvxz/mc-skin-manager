'use client'
import { motion, useAnimation } from 'motion/react'
import { useState } from 'react'
import { useSkin } from '@/hooks/use-skin'
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

function SettingsDeleteAccount() {
  const { isDeleting, authData } = useUser()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Card className="w-full p-6">
      <CardHeader>
        <CardTitle>Delete account</CardTitle>
        <CardDescription>Delete your account and all your data</CardDescription>
      </CardHeader>
      <CardContent>
        <AlertDialog open={isOpen || isDeleting} onOpenChange={setIsOpen}>
          <AlertDialogTrigger asChild>
            <Button disabled={!authData} variant="destructive">
              Delete account
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                Deleting your account will permanently delete all your data.
                None of your data will be able to be recovered.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction asChild>
                <ConfirmDeleteButton />
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  )
}

function ConfirmDeleteButton() {
  const { isMutating } = useSkin()
  const controls = useAnimation()
  const { deleteUser, isDeleting } = useUser()

  async function handleHoldStart() {
    controls.set({ width: '0%' })
    await controls.start({
      transition: {
        duration: 4000 / 1000,
        ease: 'linear',
      },
      width: '100%',
    })

    deleteUser()
  }

  function handleHoldEnd() {
    controls.stop()
    controls.start({
      transition: { duration: 0.1 },
      width: '0%',
    })
  }

  return (
    <Button
      isLoading={isDeleting || isMutating}
      onMouseDown={handleHoldStart}
      onMouseUp={handleHoldEnd}
      onMouseLeave={handleHoldEnd}
      onTouchStart={handleHoldStart}
      onTouchEnd={handleHoldEnd}
      onTouchCancel={handleHoldEnd}
      className="!glow-red-500 relative animate-in touch-none overflow-hidden border border-destructive bg-destructive/85 text-destructive-foreground hover:bg-destructive/90 focus-visible:border-destructive/50 active:bg-destructive/85">
      <motion.div
        initial={{ width: '0%' }}
        animate={controls}
        className="absolute top-0 left-0 h-full bg-white/20"
      />
      <span className="relative z-10 flex w-full items-center justify-center gap-2">
        Delete account
      </span>
    </Button>
  )
}

export { SettingsDeleteAccount }
