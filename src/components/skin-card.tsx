import { IconExternalLink } from '@tabler/icons-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
import { useActiveSkin } from '@/hooks/active-skin'
import type { Skin } from '@/lib/types'

function SkinCard({ skin }: { skin: Skin }) {
  const { setSkin } = useActiveSkin()

  const handleClick = () => {
    setSkin(skin)
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <Card onClick={handleClick} className="hover:border-primary">
          <div className="flex items-center gap-2">
            <Avatar className="size-[48px]" square>
              {skin.inputType === 'file' ? (
                <AvatarImage src={skin.skinData} />
              ) : (
                <AvatarImage src={skin.skinUrl} />
              )}
              <AvatarFallback className="animate-pulse bg-muted"></AvatarFallback>
            </Avatar>
            <CardHeader>
              <CardTitle title={getSkinText(skin)} className="truncate">
                {getSkinText(skin)}
              </CardTitle>
              <CardDescription>
                {/* {skin.skinType} ⋅ uploaded 10 minutes ago */}
                {skin.skinType}
              </CardDescription>
            </CardHeader>
          </div>
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Apply</ContextMenuItem>
        <ContextMenuItem>Rename</ContextMenuItem>
        <ContextMenuItem variant="destructive">Delete</ContextMenuItem>

        {skin.inputType === 'username' || skin.inputType === 'uuid' ? (
          <>
            <ContextMenuSeparator />
            <ContextMenuItem
              onClick={() => navigator.clipboard.writeText(skin.skinUrl)}>
              Copy URL
            </ContextMenuItem>
            <ContextMenuItem
              onClick={() => navigator.clipboard.writeText(skin.username)}>
              Copy Username
            </ContextMenuItem>
            <ContextMenuItem
              onClick={() => navigator.clipboard.writeText(skin.uuid)}>
              Copy UUID
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem
              onClick={() =>
                window.open(
                  `https://namemc.com/profile/${skin.username}`,
                  '_blank',
                )
              }>
              Open in NameMC <IconExternalLink />
            </ContextMenuItem>
          </>
        ) : null}
      </ContextMenuContent>
    </ContextMenu>
  )
}

function getSkinText(skin: Skin) {
  switch (skin.inputType) {
    case 'file':
      return 'TODO'

    case 'url':
      return skin.skinUrl

    case 'username':
      return `${skin.username}'s skin`

    case 'uuid':
      return skin.uuid
  }
}

export { SkinCard }
