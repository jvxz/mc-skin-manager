import {
  IconBoxModel,
  IconBrandMinecraft,
  IconExternalLink,
  IconTrash,
} from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'
import { useSetAtom } from 'jotai'
import { Link } from 'next-view-transitions'
import { toast } from 'sonner'
import { getUserMojangData } from '@/actions/server/user/get-user-mojang-data'
import { currentSkinAtom } from '@/components/skin/viewer-canvas'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
import type { Skin } from '@/db/schema'
import { useSkin } from '@/hooks/use-skin'

function SkinCardContextMenu({
  children,
  skin,
}: {
  children: React.ReactNode
  skin: Skin
}) {
  const { deleteSkin, applySkin, isMutating } = useSkin()
  const setCurrentSkin = useSetAtom(currentSkinAtom)

  const { data: isBound } = useQuery({
    queryFn: () => getUserMojangData(),
    queryKey: ['user-is-bound'],
  })

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={() => setCurrentSkin(skin)}>
          <IconBoxModel />
          Apply
        </ContextMenuItem>
        <ContextMenuItem variant="destructive" onClick={() => deleteSkin(skin)}>
          <IconTrash />
          Delete
        </ContextMenuItem>
        {isBound && (
          <>
            <ContextMenuSeparator />
            <ContextMenuItem
              disabled={isMutating}
              onClick={() => applySkin(skin)}>
              <IconBrandMinecraft />
              Apply to Minecraft
            </ContextMenuItem>
          </>
        )}
        <ContextMenuSeparator />
        <ContextMenuItem
          disabled={isMutating}
          onClick={() => {
            navigator.clipboard.writeText(skin.skinUrl)
            toast.success('Skin URL copied to clipboard')
          }}>
          Copy URL
        </ContextMenuItem>
        {skin.originalName && (
          <>
            <ContextMenuItem disabled={isMutating}>Copy UUID</ContextMenuItem>
            <ContextMenuItem disabled={isMutating}>Copy Name</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem asChild disabled={isMutating}>
              <Link
                className="flex items-center gap-2"
                href={`https://namemc.com/profile/${skin.originalName}`}
                target="_blank">
                <IconExternalLink />
                View user on NameMC
              </Link>
            </ContextMenuItem>
          </>
        )}
      </ContextMenuContent>
    </ContextMenu>
  )
}

export { SkinCardContextMenu }
