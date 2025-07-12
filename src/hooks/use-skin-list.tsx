import { useQuery } from '@tanstack/react-query'
import { eq } from 'drizzle-orm'
import { db } from '@/db'
import { skin } from '@/db/schema'
import { useSession } from '@/lib/auth/client'

function useSkinList() {
  const { data } = useSession()

  const skins = useQuery({
    queryFn: async () => {
      if (!data?.session) return []
      return await db
        .select()
        .from(skin)
        .where(eq(skin.userId, data.session.userId))
    },
    queryKey: ['skins'],
  })

  return skins
}

export { useSkinList }
