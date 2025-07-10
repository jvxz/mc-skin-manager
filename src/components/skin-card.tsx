import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useActiveSkin } from '@/hooks/active-skin'
import type { Skin } from '@/lib/types'

function SkinCard({ skin }: { skin: Skin }) {
  const { setSkin } = useActiveSkin()

  const handleClick = () => {
    setSkin(skin)
  }

  return (
    <Card onClick={handleClick} className="hover:border-primary">
      <div className="flex items-center gap-2">
        <Avatar className="size-[48px]" square>
          {skin.type === 'file' ? (
            <AvatarImage src={URL.createObjectURL(skin.file)} />
          ) : (
            <AvatarImage src={skin.skinUrl} />
          )}
          <AvatarFallback className="animate-pulse bg-muted"></AvatarFallback>
        </Avatar>
        <CardHeader>
          <CardTitle>{getSkinText(skin)}</CardTitle>
          <CardDescription>slim ⋅ uploaded 10 minutes ago</CardDescription>
        </CardHeader>
      </div>
    </Card>
  )
}

function getSkinText(skin: Skin) {
  switch (skin.type) {
    case 'file':
      return skin.file.name

    case 'url':
      return skin.skinUrl

    case 'username':
      return `${skin.username}'s skin`

    case 'uuid':
      return skin.uuid
  }
}

export { SkinCard }
