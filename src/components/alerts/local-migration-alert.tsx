import { useAtom } from 'jotai'
import { useCallback } from 'react'
import { toast } from 'sonner'
import { useSession } from '@/auth/client'
import { useSkin } from '@/hooks/use-skin'
import { localSkinsAtom } from '@/stores/local-skins'
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

function LocalMigrationAlert() {
  const { migrateLocalSkins, isMutating } = useSkin()

  const [localSkins, setLocalSkins] = useAtom(localSkinsAtom)
  const { data: sessionData, isPending: isLoadingSession } = useSession()

  const shouldNotShow =
    !localSkins ||
    localSkins.length === 0 ||
    isLoadingSession ||
    !sessionData?.user

  const handleDelete = useCallback(() => {
    setLocalSkins([])
    toast.success('Your local skins have been deleted')
  }, [setLocalSkins])

  const handleMigrate = useCallback(() => {
    migrateLocalSkins()
  }, [migrateLocalSkins])

  if (shouldNotShow) return null

  return (
    <AlertDialog open>
      <AlertDialogTrigger>Open</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Local skin migration</AlertDialogTitle>
          <AlertDialogDescription className="my-2 space-y-2">
            <p className="leading-relaxed">
              It seems like you have imported skins while you were not logged
              in. These skins will not sync across devices. Would you like to
              migrate them to your account?
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleDelete}>Delete</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button isLoading={isMutating} onClick={handleMigrate}>
              Migrate
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export { LocalMigrationAlert }
