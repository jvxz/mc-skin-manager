'use client'
import {
  LibrarySkinCard,
  LibrarySkinCardSkeleton,
} from '@/components/library/skin-card'
import { useSkin } from '@/hooks/use-skin'

export default function Page() {
  const { skins, isLoadingUserSkins } = useSkin()

  return (
    <div className="grid w-full grid-cols-5 gap-4">
      {!isLoadingUserSkins
        ? skins?.map(skin => {
            return <LibrarySkinCard key={skin.id} skin={skin} />
          })
        : Array.from({ length: 5 }).map((_, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: for loading state
            <LibrarySkinCardSkeleton key={index} />
          ))}
    </div>
  )
}
