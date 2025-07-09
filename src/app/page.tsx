import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export default function Page() {
  return (
    <div className="flex size-full">
      <div className="w-1/4 border-r">
        <div className="flex items-center gap-2 border-b p-3">
          <Button>Upload</Button>
          <Input placeholder="Search..." />
        </div>
        <div className="p-3">
          {Array.from({ length: 8 }).map((_, i) => {
            return (
              <Card key={i} className="mb-3">
                <div className="flex items-center gap-2">
                  <Avatar className="size-[48px]" square>
                    <AvatarImage src="https://github.com/jvxz.png" />
                    <AvatarFallback>JV</AvatarFallback>
                  </Avatar>
                  <CardHeader>
                    <CardTitle>Skin {i + 1}</CardTitle>
                    <CardDescription>
                      slim ⋅ uploaded 10 minutes ago
                    </CardDescription>
                  </CardHeader>
                </div>
                {/* <CardContent>
              <p>Card Content</p>
            </CardContent> */}
              </Card>
            )
          })}
        </div>
      </div>
      <div className="w-full "></div>
    </div>
  )
}
