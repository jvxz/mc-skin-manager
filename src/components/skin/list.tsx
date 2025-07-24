'use client'
import { atom, useAtomValue } from 'jotai'
import { useMemo, useRef } from 'react'
import { Virtualizer } from 'virtua'
import { SkinListCard } from '@/actions/client/skin/list-card'
import { useSkin } from '@/hooks/use-skin'
import { staticStyles } from '@/lib/styles'
import { cn } from '@/lib/utils'
import { buttonVariants } from '../ui/button'
import { Card } from '../ui/card'
import { ScrollArea } from '../ui/scroll-area'
import { SkinListHeader } from './list-header'

export const sortByAtom = atom<'newest' | 'oldest' | 'a-z' | 'z-a'>('newest')

function SkinList() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const { skins } = useSkin()
  const sortBy = useAtomValue(sortByAtom)

  const sortedSkins = useMemo(() => {
    if (!skins) return []

    return [...skins].sort((a, b) => {
      if (sortBy === 'newest')
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      if (sortBy === 'oldest')
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      if (sortBy === 'a-z') return a.name.localeCompare(b.name)
      if (sortBy === 'z-a') return b.name.localeCompare(a.name)
      return 0
    })
  }, [skins, sortBy])

  return (
    <div className="flex flex-col gap-3">
      <SkinListHeader />
      <div className="h-full">
        {skins && (
          <ScrollArea type="always" className="h-full" ref={scrollRef}>
            <Virtualizer overscan={16} scrollRef={scrollRef}>
              {sortedSkins.map(skin => (
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
          <div className="fade-in mt-px mr-3 flex animate-in flex-col gap-3">
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
