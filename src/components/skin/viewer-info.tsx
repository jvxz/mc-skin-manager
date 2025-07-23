'use client'
import { IconPencil } from '@tabler/icons-react'
import { useAtomValue } from 'jotai'
import Link from 'next/link'
import { useState } from 'react'
import type { Skin } from '@/db/schema'
import { useSkin } from '@/hooks/use-skin'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Skeleton } from '../ui/skeleton'
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

  return (
    <Card className="h-63 w-full">
      <CardHeader>
        <SkinNameEditor skin={skin} />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <p className="text-muted-foreground">Created</p>
            <div className="flex-1 border-b border-dashed"></div>
            <p className="font-mono text-xs">{formatDate(skin.createdAt)}</p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <p className="text-muted-foreground">Imported from</p>
            <div className="flex-1 border-b border-dashed"></div>
            <p className="font-mono text-xs">{formatSource(skin.source)}</p>
          </div>

          <div className="my-6" />

          {skin.originalName && (
            <div className="flex items-center gap-2 text-sm">
              <p className="text-muted-foreground">Player name</p>
              <div className="flex-1 border-b border-dashed"></div>
              <p
                title={skin.originalName}
                className="truncate break-all font-mono text-xs">
                {skin.originalName}
              </p>
            </div>
          )}

          {skin.uuid && (
            <div className="flex items-center gap-2 text-sm">
              <p className="text-muted-foreground">Player UUID</p>
              <div className="flex-1 border-b border-dashed"></div>
              <p
                title={skin.uuid}
                className="truncate break-all font-mono text-xs">
                {skin.uuid}
              </p>
            </div>
          )}
        </div>

        <div className="my-6" />

        <div className="flex items-center gap-2 text-sm">
          <p className="text-muted-foreground">Skin URL</p>
          <div className="flex-1 border-b border-dashed"></div>
          {skin.skinUrl ? (
            <Link
              title={skin.skinUrl}
              className="w-56 truncate break-all font-mono text-xs hover:underline"
              href={skin.skinUrl}
              target="_blank">
              {skin.skinUrl}
            </Link>
          ) : (
            <Skeleton className="h-4 w-56 rounded-sm" />
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function SkinNameEditor({ skin }: { skin: Skin }) {
  const { renameSkin, isMutating } = useSkin()

  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(skin.name)

  const formatSkinType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()
  }

  return (
    <CardTitle className="flex items-center gap-2 text-3xl">
      {isEditing ? (
        <Input
          type="text"
          value={name}
          autoFocus
          className="h-9 text-2xl"
          onChange={e => setName(e.target.value)}
          onBlur={() => setIsEditing(false)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              renameSkin({ name, skin })
              setIsEditing(false)
            }
          }}
        />
      ) : (
        <>
          <p title={skin.name}>{skin.name}</p>
          <Button
            isLoading={isMutating}
            onClick={() => {
              setIsEditing(true)
              setName(skin.name)
            }}
            variant="ghost"
            size="icon">
            <IconPencil />
          </Button>
        </>
      )}
      <div className="flex-1" />
      <Badge variant="outline">{formatSkinType(skin.skinType)}</Badge>
    </CardTitle>
  )
}

function formatSource(source: Skin['source']) {
  switch (source) {
    case 'NAME_MC':
      return 'NameMC'
    case 'USERNAME':
      return 'Username'
    case 'UUID':
      return 'UUID'
    case 'URL':
      return 'URL'
    case 'FILE_UPLOAD':
      return 'File upload'
    default:
      return 'Unknown'
  }
}

export { SkinViewerInfo }
