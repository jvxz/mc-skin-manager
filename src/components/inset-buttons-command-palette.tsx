'use client'
import { IconBug, IconSettings, IconUser } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { Button } from './ui/button'
import { Logo } from './ui/icons/logo'

function InsetButtonsCommandPalette() {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const handleSelect = (fn: () => void) => {
    fn()
    setOpen(false)
  }

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="ghost" className="size-16">
        <Logo className="!size-8" />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search for a skin..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Settings">
            <CommandItem
              onSelect={() =>
                handleSelect(() => router.push('/settings/general'))
              }>
              <IconSettings />
              <span>General</span>
            </CommandItem>
            <CommandItem
              onSelect={() =>
                handleSelect(() => router.push('/settings/account'))
              }>
              <IconUser />
              <span>Account</span>
            </CommandItem>
            <CommandItem
              onSelect={() =>
                handleSelect(() => router.push('/settings/debug'))
              }>
              <IconBug />
              <span>Debug</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Skins">
            <CommandItem>
              <span>Skin 1</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}

export { InsetButtonsCommandPalette }
