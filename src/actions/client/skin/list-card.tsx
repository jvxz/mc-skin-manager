import { useAtom } from 'jotai'
import Image from 'next/image'
import { currentSkinAtom } from '@/components/skin/viewer-canvas'
import { SkinCardContextMenu } from '@/components/skin-card-context-menu'
import { buttonVariants } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import type { Skin } from '@/db/schema'
import { staticStyles } from '@/lib/styles'
import { cn, formatDate, formatSkinType, timeAgo } from '@/lib/utils'

function SkinListCard({ skin, className }: { skin: Skin; className?: string }) {
  const [currentSkin, setCurrentSkin] = useAtom(currentSkinAtom)

  if (skin.id === 'pending')
    return (
      <Card
        className={cn(
          buttonVariants({ variant: 'soft' }),
          staticStyles.variant.default,
          'pointer-events-none flex h-18 animate-pulse flex-row items-center justify-start gap-3 p-3',
          className,
        )}
      />
    )

  return (
    <SkinCardContextMenu skin={skin}>
      <Card
        onClick={() => setCurrentSkin(skin)}
        className={cn(
          buttonVariants({ variant: 'soft' }),
          staticStyles.variant.default,
          ' flex h-18 flex-row items-center justify-start gap-3 p-3 transition duration-150',
          className,
        )}>
        <div className="relative">
          <Image
            src={`data:image/png;base64,${skin.headBase64}`}
            alt={skin.name}
            width={48}
            height={48}
            className="rounded [image-rendering:pixelated]"
          />
          <div
            title="Currently active"
            data-active={currentSkin?.id === skin.id}
            className="-right-1 -top-1 absolute size-2.5 rounded-full border border-emerald-400 bg-emerald-400/80 transition-opacity duration-150 data-[active=false]:opacity-0 data-[active=true]:opacity-100"
          />
        </div>
        <div className="!h-full flex flex-1 flex-col justify-around gap-1">
          <p data-slot="skin-name" className="w-fit font-medium text-base">
            {skin.name}
          </p>
          <p className="text-muted-foreground text-sm ">
            {formatSkinType(skin.skinType)}
          </p>
        </div>
        <div className="flex h-full flex-col justify-end ">
          <TooltipProvider>
            <Tooltip delayDuration={1000}>
              <TooltipTrigger asChild>
                <p className="cursor-pointer text-muted-foreground text-xs">
                  {timeAgo(new Date(skin.createdAt))}
                </p>
              </TooltipTrigger>
              <TooltipContent>
                <p className="font-medium text-muted-foreground text-xs">
                  {formatDate(new Date(skin.createdAt))}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </Card>
    </SkinCardContextMenu>
  )
}

export { SkinListCard }
