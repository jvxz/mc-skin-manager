import { IconBoxModel, IconCursorText, IconTrash } from '@tabler/icons-react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useSetAtom } from 'jotai'
import Image from 'next/image'
import { currentSkinAtom } from '@/components/skin/viewer'
import { buttonVariants } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import type { Skin } from '@/db/schema'
import { staticStyles } from '@/lib/styles'
import { cn } from '@/lib/utils'

dayjs.extend(relativeTime)

function SkinListCard({ skin }: { skin: Skin }) {
  const setSkin = useSetAtom(currentSkinAtom)

  if (skin.id === 'pending')
    return (
      <Card
        className={cn(
          buttonVariants({ variant: 'outline' }),
          staticStyles.variant.default,
          'pointer-events-none flex h-18 animate-pulse flex-row items-center justify-start gap-3 p-3',
        )}
      />
    )

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <Card
          onClick={() => setSkin(skin)}
          className={cn(
            buttonVariants({ variant: 'outline' }),
            staticStyles.variant.default,
            'flex h-18 flex-row items-center justify-start gap-3 p-3 transition duration-150',
          )}>
          <Image
            src={`data:image/png;base64,${skin.headBase64}`}
            alt={skin.name}
            width={48}
            height={48}
            className="rounded [image-rendering:pixelated]"
          />
          <div className="!h-full flex flex-1 flex-col justify-around gap-1">
            <p data-slot="skin-name" className="w-fit font-medium text-base">
              {skin.name}
            </p>
            <p className="text-muted-foreground text-sm ">
              {skin.skinType.charAt(0).toUpperCase() +
                skin.skinType.slice(1).toLocaleLowerCase()}
            </p>
          </div>
          <div className="flex h-full flex-col justify-end ">
            <TooltipProvider>
              <Tooltip delayDuration={1000}>
                <TooltipTrigger asChild>
                  <p className="cursor-pointer text-muted-foreground text-xs">
                    {dayjs(skin.createdAt).fromNow()}
                  </p>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-medium text-muted-foreground text-xs">
                    {dayjs(skin.createdAt).format('MMM DD, YYYY h:mma')}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={() => setSkin(skin)}>
          <IconBoxModel />
          Apply
        </ContextMenuItem>
        <ContextMenuItem>
          <IconCursorText />
          Rename
        </ContextMenuItem>
        <ContextMenuItem variant="destructive">
          <IconTrash />
          Delete
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>Copy URL</ContextMenuItem>
        <ContextMenuItem>Copy UUID</ContextMenuItem>
        <ContextMenuItem>Copy Name</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export { SkinListCard }
