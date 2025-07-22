'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { clearPendingSkins as clearPendingSkinsAction } from '@/actions/server/user/clear-pending-skins'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { GET_SKINS_KEY } from '@/hooks/use-skin'

function SettingsDebugClearPendingSkins() {
  const qc = useQueryClient()
  const { mutate: clearPendingSkins, isPending } = useMutation({
    mutationFn: clearPendingSkinsAction,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [GET_SKINS_KEY] })
      toast.success('Pending skins cleared')
    },
  })

  return (
    <Card className="w-full p-6">
      <CardHeader>
        <CardTitle>Clear pending skins</CardTitle>
        <CardDescription>
          If one or more of your skins are stuck in a pending state, you can
          clear them here.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          variant="destructive"
          isLoading={isPending}
          onClick={() => clearPendingSkins()}>
          Clear pending skins
        </Button>
      </CardContent>
    </Card>
  )
}

export { SettingsDebugClearPendingSkins }
