import { useMutation } from '@tanstack/react-query'
import { getSkinFromInput } from '@/actions/get-skin-from-input'
import { getSkinInputType } from '@/lib/utils'
import { useSkinList } from '@/store/skins'
import { useActiveSkin } from './active-skin'

function useSkinUpload() {
  const { addSkin } = useSkinList()
  const { setSkin } = useActiveSkin()
  const { mutate: uploadSkin } = useMutation({
    mutationFn: async (input: string | File) => {
      const type = getSkinInputType(input)

      const params = {
        input,
        type,
      }

      const skin = await getSkinFromInput(params)

      return skin
    },
    onSuccess: data => {
      addSkin(data)
      setSkin(data)
    },
  })

  return { uploadSkin }
}

export { useSkinUpload }
