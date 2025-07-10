'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SkinImportForm } from './skin-import-form'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

function SkinListHeader() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex items-center gap-2 border-b p-3">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button>Import</Button>
        </PopoverTrigger>
        <PopoverContent align="start" sideOffset={6} className="w-[300px]">
          <SkinImportForm setIsOpen={setIsOpen} />
        </PopoverContent>
      </Popover>
      <Input placeholder="Search..." />
    </div>
  )
}

export { SkinListHeader }
