'use client'
import { IconPencil } from '@tabler/icons-react'
import { useAtomValue } from 'jotai'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { currentSkinAtom } from './viewer-canvas'

function SkinViewerInfo() {
  const skin = useAtomValue(currentSkinAtom)

  if (!skin) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-muted-foreground">
            No skin selected
          </CardTitle>
        </CardHeader>
      </Card>
    )
  }

  const formatDate = (date: Date | string) => {
    const d = new Date(date)
    return d.toLocaleDateString('en-US', {
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  }

  const formatSkinType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-3xl">
          <p title={skin.name}>{skin.name}</p>
          <Button variant="ghost" size="icon">
            <IconPencil />
          </Button>
          <div className="flex-1" />
          <Badge variant="outline">{formatSkinType(skin.skinType)}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-4 text-sm">
            <p className="text-muted-foreground">Created</p>
            <div className="flex-1 border-b border-dashed"></div>
            <p>{formatDate(skin.createdAt)}</p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <p className="text-muted-foreground">Imported from</p>
            <div className="flex-1 border-b border-dashed"></div>
            <p>TODO</p>
          </div>

          <div className="my-6" />

          {skin.uuid && (
            <div className="flex items-center gap-4 text-sm">
              <p className="text-muted-foreground">Player UUID</p>
              <div className="flex-1 border-b border-dashed"></div>
              <p className="break-all font-mono text-xs">{skin.uuid}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export { SkinViewerInfo }
