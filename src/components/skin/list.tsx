'use client'
import { useRef } from 'react'
import { Virtualizer } from 'virtua'
import { SkinListCard } from '@/actions/client/skin/list-card'
import { useSkin } from '@/hooks/use-skin'
import { ScrollArea } from '../ui/scroll-area'
import { SkinListHeader } from './list-header'

function SkinList() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const { skins } = useSkin()

  return (
    <div className="flex w-[350px] flex-col gap-3 xl:w-[350px] 2xl:flex 2xl:w-[450px]">
      <SkinListHeader />
      <div className="h-full">
        <ScrollArea type="always" className="h-full" ref={scrollRef}>
          <Virtualizer overscan={16} scrollRef={scrollRef}>
            {skins?.map(skin => (
              <SkinListCard
                key={skin.id}
                skin={skin}
                className="!mb-3 first:mt-px last:mb-px"
              />
            ))}
          </Virtualizer>
        </ScrollArea>
      </div>
    </div>
  )
}

export { SkinList }
