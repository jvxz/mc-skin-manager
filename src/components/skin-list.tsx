'use client'
import { Virtuoso } from 'react-virtuoso'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

function SkinList() {
  const data: string[] = []

  if (data.length === 0) {
    return <EmptyState />
  }

  return (
    <Virtuoso
      overscan={3}
      data={data}
      className="box-border h-full"
      components={{
        Item: ({ children, ...props }) => (
          <div {...props} className="m-3">
            {children}
          </div>
        ),
      }}
      itemContent={index => (
        <Card className="">
          <div className="flex items-center gap-2">
            <Avatar className="size-[48px]" square>
              <AvatarImage src="https://github.com/jvxz.png" />
              <AvatarFallback>JV</AvatarFallback>
            </Avatar>
            <CardHeader>
              <CardTitle>Skin {index}</CardTitle>
              <CardDescription>slim ⋅ uploaded 10 minutes ago</CardDescription>
            </CardHeader>
          </div>
        </Card>
      )}
    />
  )
}

function EmptyState() {
  return <div>No skins found</div>
}

export { SkinList, EmptyState }
