import {
  useMutation,
  useMutationState,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { useAtom, useSetAtom } from 'jotai'
import { toast } from 'sonner'
import { generateThumbnail } from '@/actions/client/skin/generate-thumbnail'
import { getSkinData } from '@/actions/client/skin/get-skin-data'
import { applySkinToMc } from '@/actions/server/user/apply-skin-to-mc'
import { deleteUserSkin as deleteSkinAction } from '@/actions/server/user/delete-skin'
import { getUserSkins } from '@/actions/server/user/get-skins'
import { migrateLocalSkinsToUser } from '@/actions/server/user/migrate-skins'
import { postUserSkin as postSkinAction } from '@/actions/server/user/post-skin'
import { renameUserSkin } from '@/actions/server/user/rename-skin'
import { postThumbnailToUI } from '@/actions/server/utils/post-thumbnail-to-ut'
import { useSession } from '@/auth/client'
import { currentSkinAtom } from '@/components/skin/viewer-canvas'
import type { Skin } from '@/db/schema'
import { handleQueryError } from '@/lib/query-client'
import { localSkinsAtom } from '@/stores/local-skins'
import { persistedSkinCountAtom } from '@/stores/skin-count'

export const GET_SKINS_KEY = 'user-skins'
const POST_SKIN_KEY = 'post-skin'
const RENAME_SKIN_KEY = 'rename-skin'
const DELETE_SKIN_KEY = 'delete-skin'
const APPLY_SKIN_KEY = 'apply-skin'
const MIGRATE_LOCAL_SKINS_KEY = 'migrate-local-skins'

function useSkin() {
  const qc = useQueryClient()
  const { data: sessionData } = useSession()

  const [currentSkin, setCurrentSkin] = useAtom(currentSkinAtom)
  const [localSkins, setLocalSkins] = useAtom(localSkinsAtom)
  const setSkinCount = useSetAtom(persistedSkinCountAtom)

  const {
    data: userSkins,
    refetch: _refetchSkins,
    isLoading: isLoadingUserSkins,
  } = useQuery({
    queryFn: async () => {
      const skins = await getUserSkins()
      setSkinCount(skins?.length ?? 0)
      return skins
    },
    queryKey: [GET_SKINS_KEY],
  })

  const { mutate: postSkin } = useMutation({
    mutationFn: async (input: File | string) => {
      const skin = await getSkinData(input)

      removePendingSkin()

      if (!sessionData?.user) {
        const newSkin = {
          ...skin,
          skinUrl: '',
          thumbnailUrl: '',
          userId: 'local',
        }

        setCurrentSkin(newSkin)
        setSkinCount(prev => prev + 1)

        return setLocalSkins(prev => [...prev, newSkin])
      }

      addSkinOptimistically(skin)

      const thumbnail = await generateThumbnail(skin)
      const thumbnailUrl = await postThumbnailToUI(thumbnail)

      setSkinCount(prev => prev + 1)

      return postSkinAction({ ...skin, thumbnailUrl })
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
    onSuccess: skin => {
      refetchSkins()
      if (skin && currentSkin?.id === skin?.id) {
        setCurrentSkin(skin)
      }
    },
  })

  const { mutate: renameSkin } = useMutation({
    mutationFn: async ({ skin, name }: { skin: Skin; name: string }) => {
      if (!sessionData?.user) {
        const newSkin = { ...skin, name }

        const newLocalSkins = localSkins.map(s =>
          s.id === skin.id ? newSkin : s,
        )

        if (currentSkin?.id === skin.id) {
          setCurrentSkin(newSkin)
        }

        return setLocalSkins(newLocalSkins)
      }

      return renameUserSkin(skin, name)
    },
    mutationKey: [RENAME_SKIN_KEY],
    onError: err => {
      refetchSkins()
      handleQueryError(err)
    },
    onMutate: async ({ skin, name }) => {
      if (sessionData?.user) {
        await qc.cancelQueries({ queryKey: [GET_SKINS_KEY] })
        const previousSkins = qc.getQueryData<Skin[]>([GET_SKINS_KEY]) ?? []

        const skinToBeRenamed = previousSkins.find(s => s.id === skin.id)

        if (!skinToBeRenamed) {
          throw new Error('Skin not found')
        }

        const newSkins = previousSkins.map(s =>
          s.id === skin.id ? { ...s, name } : s,
        )

        if (currentSkin?.id === skin.id) {
          setCurrentSkin({ ...currentSkin, name })
        }

        qc.setQueryData<Skin[]>([GET_SKINS_KEY], () => newSkins)

        return { previousSkins }
      }
    },
  })

  const { mutate: deleteSkin } = useMutation({
    mutationFn: async (skin: Skin) => {
      if (!sessionData?.user) {
        setSkinCount(prev => prev - 1)
        return setLocalSkins(prev => prev.filter(s => s.id !== skin.id))
      }

      await deleteSkinAction(skin)
      setSkinCount(prev => prev - 1)
      return
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

  const { mutate: applySkin } = useMutation({
    mutationFn: async (skin: Skin) =>
      toast.promise(applySkinToMc(skin), {
        error: 'Failed to apply skin',
        loading: 'Applying skin...',
        success: 'Your skin was applied to your Minecraft account',
      }),
    mutationKey: [APPLY_SKIN_KEY],
  })

  const { mutate: migrateLocalSkins } = useMutation({
    mutationFn: async () => {
      await migrateLocalSkinsToUser(localSkins)
      await refetchSkins()

      const newCount = localSkins.length + (userSkins?.length ?? 0)
      setSkinCount(newCount)
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
      originalName: null,
      skinType: 'CLASSIC',
      skinUrl: '',
      source: 'URL',
      thumbnailUrl: '',
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

  function addSkinOptimistically(
    skinInput: Omit<Skin, 'userId' | 'skinUrl' | 'thumbnailUrl'>,
  ) {
    const skin: Skin = {
      ...skinInput,
      skinUrl: '',
      thumbnailUrl: '',
      userId: '',
    }

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

  const mutations = useMutationState({
    filters: { status: 'pending' },
  })

  const isMutating = mutations.length > 0

  const skins = sessionData?.user ? userSkins : localSkins

  return {
    applySkin,
    deleteSkin,
    isLoadingUserSkins,
    isMutating,
    migrateLocalSkins,
    postSkin,
    renameSkin,
    skins,
  }
}

export { useSkin }
