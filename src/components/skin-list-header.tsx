import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SkinImportForm } from './skin-import-form'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

function SkinListHeader() {
  return (
    <div className="flex items-center gap-2 border-b p-3">
      <Popover>
        <PopoverTrigger asChild>
          <Button>Import</Button>
        </PopoverTrigger>
        <PopoverContent align="start" sideOffset={6} className="w-[300px]">
          <SkinImportForm />
        </PopoverContent>
      </Popover>
      <Input placeholder="Search..." />
    </div>
  )
}

export { SkinListHeader }
