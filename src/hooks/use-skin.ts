import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { toast } from 'sonner'
import { getSkinData } from '@/actions/client/skin/get-skin-data'
import { applySkinToMc } from '@/actions/server/user/apply-skin-to-mc'
import { deleteUserSkin as deleteSkinAction } from '@/actions/server/user/delete-skin'
import { getUserSkins } from '@/actions/server/user/get-skins'
import { migrateLocalSkinsToUser } from '@/actions/server/user/migrate-skins'
import { postUserSkin as postSkinAction } from '@/actions/server/user/post-skin'
import { useSession } from '@/auth/client'
import { currentSkinAtom } from '@/components/skin/viewer'
import type { Skin } from '@/db/schema'
import { handleQueryError } from '@/lib/query-client'
import { localSkinsAtom } from '@/stores/local-skins'

const POST_SKIN_KEY = 'post-skin'
const GET_SKINS_KEY = 'user-skins'
const DELETE_SKIN_KEY = 'delete-skin'
const APPLY_SKIN_KEY = 'apply-skin'
const MIGRATE_LOCAL_SKINS_KEY = 'migrate-local-skins'

function useSkin() {
  const qc = useQueryClient()
  const { data: sessionData, isPending: isLoadingSession } = useSession()

  const [currentSkin, setCurrentSkin] = useAtom(currentSkinAtom)
  const [localSkins, setLocalSkins] = useAtom(localSkinsAtom)

  const { data: userSkins, refetch: _refetchSkins } = useQuery({
    enabled: !!sessionData?.user,
    queryFn: () => getUserSkins(),
    queryKey: [GET_SKINS_KEY],
  })

  const { mutate: postSkin, isPending: isPosting } = useMutation({
    mutationFn: async (input: File | string) => {
      const skin = await getSkinData(input)

      removePendingSkin()

      if (!sessionData?.user) {
        return setLocalSkins(prev => [
          ...prev,
          {
            ...skin,
            skinUrl: '',
            userId: 'local',
          },
        ])
      }

      addSkinOptimistically(skin)

      return postSkinAction(skin)
    },
    mutationKey: [POST_SKIN_KEY],
    onError: err => {
      removePendingSkin()
      handleQueryError(err)
    },
    onMutate: async () => {
      await qc.cancelQueries({ queryKey: [GET_SKINS_KEY] })

      const previousSkins = qc.getQueryData<Skin[]>([GET_SKINS_KEY]) ?? []

      triggerPendingSkin(previousSkins)

      // context for onError
      return { previousSkins }
    },
    onSettled: () => refetchSkins(),
  })

  const { mutate: deleteSkin, isPending: isDeleting } = useMutation({
    mutationFn: async (skin: Skin) => {
      if (!sessionData?.user) {
        return setLocalSkins(prev => prev.filter(s => s.id !== skin.id))
      }

      return deleteSkinAction(skin)
    },
    mutationKey: [DELETE_SKIN_KEY],
    onError: (err, _, context) => {
      qc.setQueryData([GET_SKINS_KEY], context?.previousSkins)
      handleQueryError(err)
    },
    onMutate: async (skin: Skin) => {
      if (skin.id === currentSkin?.id) {
        setCurrentSkin(null)
      }

      await qc.cancelQueries({ queryKey: [GET_SKINS_KEY] })

      const previousSkins = qc.getQueryData<Skin[]>([GET_SKINS_KEY]) ?? []

      removeSkinOptimistically(skin)

      // context for onError
      return { previousSkins }
    },
    onSettled: () => refetchSkins(),
  })

  const { mutate: applySkin, isPending: isApplying } = useMutation({
    mutationFn: async (skin: Skin) =>
      toast.promise(applySkinToMc(skin), {
        error: 'Failed to apply skin',
        loading: 'Applying skin...',
        success: 'Your skin was applied to your Minecraft account',
      }),
    mutationKey: [APPLY_SKIN_KEY],
  })

  const { mutate: migrateLocalSkins, isPending: isMigrating } = useMutation({
    mutationFn: async () => {
      await migrateLocalSkinsToUser(localSkins)
      await refetchSkins()
    },
    mutationKey: [MIGRATE_LOCAL_SKINS_KEY],
    onError: err => {
      handleQueryError(err)
    },
    // onMutate: async (skin: Skin) => {},
    onSuccess: () => {
      setLocalSkins([])
      toast.success('Your local skins have been migrated')
    },
  })

  function triggerPendingSkin(previousSkins: Skin[]) {
    const pendingSkin: Skin = {
      base64: '',
      createdAt: new Date(),
      headBase64: '',
      id: 'pending',
      name: '',
      skinType: 'CLASSIC',
      skinUrl: '',
      userId: '',
      uuid: '',
    }

    if (!sessionData?.user) {
      return setLocalSkins(prev => [...prev, pendingSkin])
    }

    qc.setQueryData<Skin[]>([GET_SKINS_KEY], () => [
      ...previousSkins,
      pendingSkin,
    ])
  }

  function removePendingSkin() {
    if (!sessionData?.user) {
      return setLocalSkins(prev => prev.filter(skin => skin.id !== 'pending'))
    }

    const previousSkins = qc.getQueryData<Skin[]>([GET_SKINS_KEY]) ?? []
    qc.setQueryData<Skin[]>([GET_SKINS_KEY], () =>
      previousSkins.filter(skin => skin.id !== 'pending'),
    )
  }

  function addSkinOptimistically(skinInput: Omit<Skin, 'userId' | 'skinUrl'>) {
    const skin: Skin = { ...skinInput, skinUrl: '', userId: '' }

    setCurrentSkin(skin)

    if (!sessionData?.user) {
      return setLocalSkins(prev => [...prev, skin])
    }

    const previousSkins = qc.getQueryData<Skin[]>([GET_SKINS_KEY]) ?? []
    qc.setQueryData<Skin[]>([GET_SKINS_KEY], () => [...previousSkins, skin])
  }

  function removeSkinOptimistically(skin: Skin) {
    const previousSkins = qc.getQueryData<Skin[]>([GET_SKINS_KEY]) ?? []

    qc.setQueryData<Skin[]>([GET_SKINS_KEY], () =>
      previousSkins.filter(s => s.id !== skin.id),
    )
  }

  async function refetchSkins() {
    if (sessionData?.user) {
      await _refetchSkins()
    }
  }

  const isMutating =
    isPosting || isDeleting || isLoadingSession || isMigrating || isApplying

  const skins = sessionData?.user ? userSkins : localSkins

  return {
    applySkin,
    deleteSkin,
    isMutating,
    migrateLocalSkins,
    postSkin,
    skins,
  }
}

export { useSkin }
