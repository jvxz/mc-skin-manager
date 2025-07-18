import {
  type QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { getSkinData } from '@/actions/client/skin/get-skin-data'
import { deleteSkin as deleteSkinAction } from '@/actions/server/user/delete-skin'
import { getSkins } from '@/actions/server/user/get-skins'
import { postSkin as postSkinAction } from '@/actions/server/user/post-skin'
import { currentSkinAtom } from '@/components/skin/viewer'
import type { Skin } from '@/db/schema'
import { handleQueryError } from '@/lib/trpc/query-client'

const POST_SKIN_KEY = 'post-skin'
const GET_SKINS_KEY = 'user-skins'
const DELETE_SKIN_KEY = 'delete-skin'

function useSkin() {
  const qc = useQueryClient()
  const [currentSkin, setCurrentSkin] = useAtom(currentSkinAtom)
  const { data: skins, refetch: refetchSkins } = useQuery({
    queryFn: () => getSkins(),
    queryKey: [GET_SKINS_KEY],
  })

  const { mutate: postSkin, isPending: isPosting } = useMutation({
    mutationFn: async (input: File | string) => {
      const skin = await getSkinData(input)

      removePendingSkin(qc)
      addSkinOptimistically(skin, qc, setCurrentSkin)

      return postSkinAction(skin)
    },
    mutationKey: [POST_SKIN_KEY],
    onError: (err, _, context) => {
      qc.setQueryData([GET_SKINS_KEY], context?.previousSkins)
      handleQueryError(err)
    },
    onMutate: async () => {
      await qc.cancelQueries({ queryKey: [GET_SKINS_KEY] })

      const previousSkins = qc.getQueryData<Skin[]>([GET_SKINS_KEY]) ?? []

      triggerPendingSkin(previousSkins, qc)

      // context for onError
      return { previousSkins }
    },
    onSettled: () => refetchSkins(),
  })

  const { mutate: deleteSkin, isPending: isDeleting } = useMutation({
    mutationFn: async (skin: Skin) => {
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

      removeSkinOptimistically(skin, qc)

      // context for onError
      return { previousSkins }
    },
    onSettled: () => refetchSkins(),
  })

  const isMutating = isPosting || isDeleting

  return {
    deleteSkin,
    isMutating,
    postSkin,
    skins,
  }
}

export { useSkin }

function triggerPendingSkin(previousSkins: Skin[], qc: QueryClient) {
  const pendingSkin: Skin = {
    base64: '',
    createdAt: new Date(),
    headBase64: '',
    id: 'pending',
    name: '',
    skinType: 'CLASSIC',
    userId: '',
    uuid: '',
  }

  qc.setQueryData<Skin[]>([GET_SKINS_KEY], () => [
    ...previousSkins,
    pendingSkin,
  ])
}

function removePendingSkin(qc: QueryClient) {
  const previousSkins = qc.getQueryData<Skin[]>([GET_SKINS_KEY]) ?? []
  qc.setQueryData<Skin[]>([GET_SKINS_KEY], () =>
    previousSkins.filter(skin => skin.id !== 'pending'),
  )
}

function addSkinOptimistically(
  skinInput: Omit<Skin, 'userId'>,
  qc: QueryClient,
  setCurrentSkin?: (skin: Skin) => void,
) {
  const skin: Skin = { ...skinInput, userId: '' }

  setCurrentSkin?.(skin)

  const previousSkins = qc.getQueryData<Skin[]>([GET_SKINS_KEY]) ?? []
  qc.setQueryData<Skin[]>([GET_SKINS_KEY], () => [...previousSkins, skin])
}

function removeSkinOptimistically(skin: Skin, qc: QueryClient) {
  const previousSkins = qc.getQueryData<Skin[]>([GET_SKINS_KEY]) ?? []

  qc.setQueryData<Skin[]>([GET_SKINS_KEY], () =>
    previousSkins.filter(s => s.id !== skin.id),
  )
}
