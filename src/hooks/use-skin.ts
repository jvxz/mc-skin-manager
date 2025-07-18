import {
  type QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { getSkinData } from '@/actions/client/skin/get-skin-data'
import { getSkins } from '@/actions/server/user/get-skins'
import { postSkin as postSkinAction } from '@/actions/server/user/post-skin'
import type { Skin } from '@/db/schema'
import { handleQueryError } from '@/lib/trpc/query-client'

const POST_SKIN_KEY = 'post-skin'
const GET_SKINS_KEY = 'user-skins'

function useSkin() {
  const qc = useQueryClient()
  const { data: skins, refetch: refetchSkins } = useQuery({
    queryFn: () => getSkins(),
    queryKey: [GET_SKINS_KEY],
  })

  const { mutate: postSkin, isPending } = useMutation({
    mutationFn: async (input: File | string) => {
      const skin = await getSkinData(input)
      removePendingSkin(qc)
      addSkinOptimistically(skin, qc)
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
    onSettled: () => {
      refetchSkins()
    },
  })

  return {
    isPending,
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

function addSkinOptimistically(skin: Omit<Skin, 'userId'>, qc: QueryClient) {
  const previousSkins = qc.getQueryData<Skin[]>([GET_SKINS_KEY]) ?? []

  qc.setQueryData<Skin[]>([GET_SKINS_KEY], () => [
    ...previousSkins,
    { ...skin, userId: '' },
  ])
}
