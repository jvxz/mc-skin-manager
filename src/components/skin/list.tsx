'use client'
import { useRef } from 'react'
import { Virtualizer } from 'virtua'
import { SkinListCard } from '@/actions/client/skin/list-card'
import { useSkin } from '@/hooks/use-skin'
import { staticStyles } from '@/lib/styles'
import { cn } from '@/lib/utils'
import { buttonVariants } from '../ui/button'
import { Card } from '../ui/card'
import { ScrollArea } from '../ui/scroll-area'
import { SkinListHeader } from './list-header'

function SkinList() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const { skins } = useSkin()

  return (
    <div className="flex w-[350px] flex-col gap-3 xl:w-[350px] 2xl:flex 2xl:w-[450px]">
      <SkinListHeader />
      <div className="h-full">
        {skins && (
          <ScrollArea type="always" className="h-full" ref={scrollRef}>
            <Virtualizer overscan={16} scrollRef={scrollRef}>
              {skins.map(skin => (
                <SkinListCard
                  key={skin.id}
                  skin={skin}
                  className="!mb-3 first:mt-px last:mb-px"
                />
              ))}
            </Virtualizer>
          </ScrollArea>
        )}
        {!skins && (
          <div className="mt-px mr-3 flex flex-col gap-3 animate-in fade-in">
            {Array.from({ length: 3 }).map((_, i) => {
              return (
                <Card
                  // biome-ignore lint/suspicious/noArrayIndexKey: intended; loading state
                  key={i}
                  className={cn(
                    buttonVariants({ variant: 'outline' }),
                    staticStyles.variant.default,
                    'pointer-events-none flex h-18 animate-pulse flex-row items-center justify-start gap-3 p-3',
                  )}
                />
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export { SkinList }
