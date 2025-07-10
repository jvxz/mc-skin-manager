import { useMutation } from '@tanstack/react-query'
import { getSkinFromText } from '@/actions/get-skin-from-username'
import type { Skin } from '@/lib/types'
import { getSkinTextType } from '@/lib/utils'
import { useSkinList } from '@/store/skins'
import { useActiveSkin } from './active-skin'

function useSkinUpload() {
  const { addSkin } = useSkinList()
  const { setSkin } = useActiveSkin()
  const { mutate: uploadSkin } = useMutation({
    mutationFn: async (input: string | File) => {
      if (typeof input === 'string') {
        const type = getSkinTextType(input)
        const skin = await getSkinFromText(type, input)

        return skin
      }

      const res: Skin = {
        file: input,
        id: crypto.randomUUID(),
        type: 'file',
      }

      return res
    },
    onSuccess: data => {
      addSkin(data)
      setSkin(data)
    },
  })

  return { uploadSkin }
}

export { useSkinUpload }
