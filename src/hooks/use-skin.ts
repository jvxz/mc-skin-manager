import { useMutation } from '@tanstack/react-query'
import { getSkinData } from '@/actions/client/skin/get-skin-data'
import { postSkin as postSkinAction } from '@/actions/server/user/post-skin'

const POST_SKIN_KEY = 'post-skin'

function useSkin() {
  const { mutate: postSkin, isPending } = useMutation({
    mutationFn: async (input: File | string) => {
      const skin = await getSkinData(input)
      return postSkinAction(skin)
    },
    mutationKey: [POST_SKIN_KEY],
  })

  return {
    isPending,
    postSkin,
  }
}

export { useSkin }
