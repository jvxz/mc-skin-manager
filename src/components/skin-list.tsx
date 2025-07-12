'use client'
import { Virtuoso } from 'react-virtuoso'
import { useLocalSkinList } from '@/store/skins'
import { SkinCard } from './skin-card'

function SkinList() {
  const { skins } = useLocalSkinList()

  if (skins.length === 0) {
    return <EmptyState />
  }

  return (
    <Virtuoso
      overscan={3}
      data={skins}
      className="box-border h-full"
      components={{
        Item: ({ children, ...props }) => (
          <div {...props} className="m-3">
            {children}
          </div>
        ),
      }}
      itemContent={index => {
        if (skins[index].inputType === 'file') {
          return <div>File</div>
        }

        return <SkinCard skin={skins[index]} />
      }}
    />
  )
}

function EmptyState() {
  return <div>No skins found</div>
}

export { SkinList, EmptyState }
