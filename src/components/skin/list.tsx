'use client'
import { SkinListCard } from '@/actions/client/skin/list-card'
import { useSkin } from '@/hooks/use-skin'
import { SkinListHeader } from './list-header'

function SkinList() {
  const { skins } = useSkin()

  return (
    <div className="flex flex-col gap-3">
      <SkinListHeader />
      <div className="flex flex-col gap-3">
        {skins?.map(skin => (
          <SkinListCard key={skin.id} skin={skin} />
        ))}
      </div>
    </div>
  )
}

export { SkinList }
