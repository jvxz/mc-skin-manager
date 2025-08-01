import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useSetAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { deleteAccount } from '@/actions/server/user/delete-account'
import { getUserMojangData } from '@/actions/server/user/get-user-mojang-data'
import { unlinkUserMicrosoftAccount } from '@/actions/server/user/unlink-user-microsoft-account'
import { useSession } from '@/auth/client'
import { currentSkinAtom } from '@/components/skin/viewer-canvas'
import { persistedSkinCountAtom } from '@/stores/skin-count'

const MOJANG_DATA_KEY = ['user-mojang-data']
const UNLINK_MICROSOFT_ACCOUNT_KEY = ['unlink-user-microsoft-account']
const DELETE_USER_KEY = ['delete-user']

export function useUser() {
  const router = useRouter()
  const qc = useQueryClient()
  const {
    data: authData,
    isPending: isLoadingAuthData,
    refetch: refetchAuthData,
  } = useSession()
  const setSkinCount = useSetAtom(persistedSkinCountAtom)
  const setCurrentSkin = useSetAtom(currentSkinAtom)

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

  const { mutate: deleteUser, isPending: isDeletingUser } = useMutation({
    mutationFn: () => deleteAccount(),
    mutationKey: DELETE_USER_KEY,
    onSuccess: () => {
      setCurrentSkin(null)
      setSkinCount(0)
      router.push('/?deleted=true')
      refetchAuthData()
      toast.success('Your account has been deleted')
    },
  })

  const isLoading = isLoadingMojangData || isLoadingAuthData
  const isMutating = isUnlinkingMicrosoftAccount
  const isDeleting = isDeletingUser

  return {
    authData,
    deleteUser,
    isDeleting,
    isLoading,
    isMutating,
    mojangData,
    unlinkMicrosoftAccount,
  }
}
