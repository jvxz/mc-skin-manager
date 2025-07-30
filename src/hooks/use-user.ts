import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { getUserMojangData } from '@/actions/server/user/get-user-mojang-data'
import { unlinkUserMicrosoftAccount } from '@/actions/server/user/unlink-user-microsoft-account'
import { useSession } from '@/auth/client'

const MOJANG_DATA_KEY = ['user-mojang-data']
const UNLINK_MICROSOFT_ACCOUNT_KEY = ['unlink-user-microsoft-account']

export function useUser() {
  const qc = useQueryClient()
  const { data: authData, isPending: isLoadingAuthData } = useSession()

  const { data: mojangData, isLoading: isLoadingMojangData } = useQuery({
    queryFn: getUserMojangData,
    queryKey: MOJANG_DATA_KEY,
  })

  const {
    mutate: unlinkMicrosoftAccount,
    isPending: isUnlinkingMicrosoftAccount,
  } = useMutation({
    mutationFn: () => unlinkUserMicrosoftAccount(),
    mutationKey: UNLINK_MICROSOFT_ACCOUNT_KEY,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: MOJANG_DATA_KEY })
      toast.success('Your Microsoft account has been unlinked')
    },
  })

  const isLoading = isLoadingMojangData || isLoadingAuthData
  const isMutating = isUnlinkingMicrosoftAccount

  return {
    authData,
    isLoading,
    isMutating,
    mojangData,
    unlinkMicrosoftAccount,
  }
}
