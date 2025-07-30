import { useSetAtom } from 'jotai'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import type { Skin } from '@/db/schema'
import { staticStyles } from '@/lib/styles'
import { cn, formatDate, formatSkinType } from '@/lib/utils'
import { currentSkinAtom } from '../skin/viewer-canvas'
import { SkinCardContextMenu } from '../skin-card-context-menu'
import { Badge } from '../ui/badge'
import { buttonVariants } from '../ui/button'
import { Card } from '../ui/card'
import { Skeleton } from '../ui/skeleton'

function LibrarySkinCard({ skin }: { skin: Skin }) {
  const router = useRouter()
  const setCurrentSkin = useSetAtom(currentSkinAtom)

  return (
    <SkinCardContextMenu skin={skin}>
      <Card
        onClick={() => {
          setCurrentSkin(skin)
          router.push('/')
        }}
        className={cn(
          buttonVariants({ variant: 'soft' }),
          staticStyles.variant.default,
          'fade-in-0 zoom-in-95 flex h-92 w-full animate-in flex-col justify-start gap-0 p-3 transition duration-150',
        )}>
        <div className="flex w-full items-center justify-between">
          <h1 className="font-medium text-lg">{skin.name}</h1>
          <Badge variant="outline">{formatSkinType(skin.skinType)}</Badge>
        </div>
        {skin.thumbnailUrl ? (
          <Image
            alt={skin.name}
            height={512}
            src={skin.thumbnailUrl}
            width={512}
            className="mx-auto w-fit"
          />
        ) : (
          <Skeleton className="size-full" />
        )}

        <p className="text-center text-muted-foreground text-sm">
          {formatDate(new Date(skin.createdAt))}
        </p>
      </Card>
    </SkinCardContextMenu>
  )
}

function LibrarySkinCardSkeleton() {
  return <Card className="h-92 w-full animate-pulse flex-col gap-0 p-3" />
}

export { LibrarySkinCard, LibrarySkinCardSkeleton }
