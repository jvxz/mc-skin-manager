'use client'
import { useAtomValue } from 'jotai'
import {
  LibrarySkinCard,
  LibrarySkinCardSkeleton,
} from '@/components/library/skin-card'
import { useSkin } from '@/hooks/use-skin'
import { persistedSkinCountAtom } from '@/stores/skin-count'

export default function Page() {
  const { skins, isLoadingUserSkins } = useSkin()
  const skinCount = useAtomValue(persistedSkinCountAtom)

  return (
    <div className="grid w-full grid-cols-5 gap-4">
      {!isLoadingUserSkins
        ? skins?.map(skin => {
            return <LibrarySkinCard key={skin.id} skin={skin} />
          })
        : Array.from({ length: skinCount }).map((_, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: for loading state
            <LibrarySkinCardSkeleton key={index} />
          ))}
    </div>
  )
}
