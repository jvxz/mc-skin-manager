import { useMutation } from '@tanstack/react-query'
import { getSkinFromInput } from '@/actions/get-skin-from-input'
import { postSkinToDb } from '@/actions/post-skin-to-db'
import { getSkinInputType } from '@/lib/utils'
import { useSkinList } from '@/store/skins'
import { useActiveSkin } from './active-skin'

function useSkinImport() {
  const { addSkin } = useSkinList()
  const { setSkin } = useActiveSkin()
  const { mutate: importSkin } = useMutation({
    mutationFn: async (input: string | File) => {
      const type = getSkinInputType(input)

      const skin = await getSkinFromInput({
        input,
        type,
      })

      await postSkinToDb(skin)

      return skin
    },
    onSuccess: data => {
      addSkin(data)
      setSkin(data)
    },
  })

  return { importSkin }
}

export { useSkinImport }
