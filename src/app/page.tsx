'use client'
import { Virtuoso } from 'react-virtuoso'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'

const data = Array.from({ length: 120 })

export default function Page() {
  return (
    <div className="flex size-full">
      <div className="flex h-full min-h-0 w-1/4 flex-col border-r">
        <div className="flex items-center gap-2 border-b p-3">
          <Button>Upload</Button>
          <Input placeholder="Search..." />
        </div>
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
                  <CardDescription>
                    slim ⋅ uploaded 10 minutes ago
                  </CardDescription>
                </CardHeader>
              </div>
            </Card>
          )}
        />
      </div>
      <div className="w-full "></div>
    </div>
  )
}
