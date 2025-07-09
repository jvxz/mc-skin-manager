import { IconUpload } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

function SkinListHeader() {
  return (
    <div className="flex items-center gap-2 border-b p-3">
      <Popover>
        <PopoverTrigger asChild>
          <Button>Import</Button>
        </PopoverTrigger>
        <PopoverContent align="start" sideOffset={6} className="w-[300px]">
          <div className="flex flex-col gap-2">
            <Input placeholder="Username, link, or UUID..." />
            <div className="flex w-full items-center gap-2">
              <Button variant="outline" className="mr-auto">
                Upload <IconUpload />
              </Button>
              <Button>Submit</Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      <Input placeholder="Search..." />
    </div>
  )
}

export { SkinListHeader }
