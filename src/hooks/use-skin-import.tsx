import { useMutation } from '@tanstack/react-query'
import { getSkinFromInput } from '@/actions/get-skin-from-input'
import { db } from '@/db'
import { skin } from '@/db/schema'
import { useSession } from '@/lib/auth/client'
import { client } from '@/lib/hono/client'
import { getSkinInputType } from '@/lib/utils'
import { useLocalSkinList } from '@/store/skins'
import { useActiveSkin } from '../store/active-skin'

function useSkinImport() {
  const { addSkin } = useLocalSkinList()
  const { setSkin } = useActiveSkin()
  const { data } = useSession()

  const { mutate: importSkin } = useMutation({
    mutationFn: async (input: string | File) => {
      const type = getSkinInputType(input)

      const skin = await getSkinFromInput({
        input,
        type,
      })

      await client.api.upload.$post({
        json: {
          base64: skin.base64,
        },
      })

      return skin
    },
    onSuccess: async skinData => {
      addSkin(skinData)
      setSkin(skinData)

      if (data?.session) {
        await db.insert(skin).values({
          base64: skinData.base64,
          name: 'test',
          userId: data.session.userId,
        })
      }
    },
  })

  return { importSkin }
}

export { useSkinImport }
