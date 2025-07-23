'use client'
import { useHotkeys } from '@mantine/hooks'
import { IconBug, IconSettings, IconUser } from '@tabler/icons-react'
import { useSetAtom } from 'jotai'
import Image from 'next/image'
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
import { useSkin } from '@/hooks/use-skin'
import { currentSkinAtom } from './skin/viewer-canvas'
import { Button } from './ui/button'
import { Logo } from './ui/icons/logo'

function InsetButtonsCommandPalette() {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  useHotkeys([['mod+k', () => setOpen(true)]])

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
          <CommandGroupSkins setOpen={setOpen} />
        </CommandList>
      </CommandDialog>
    </>
  )
}

function CommandGroupSkins({ setOpen }: { setOpen: (open: boolean) => void }) {
  const router = useRouter()
  const { skins } = useSkin()
  const setSkin = useSetAtom(currentSkinAtom)

  if (!skins) return null

  return (
    <CommandGroup heading="Skins">
      {skins.map((skin, index) => (
        <CommandItem
          onSelect={() => {
            router.push('/')
            setSkin(skin)
            setOpen(false)
          }}
          key={skin.id}
          value={`${skin.id}-${index}-${skin.name}`}>
          <Image
            src={`data:image/png;base64,${skin.headBase64}`}
            alt={skin.name}
            width={16}
            height={16}
            className="rounded-sm [image-rendering:pixelated]"
          />
          <span>{skin.name}</span>
        </CommandItem>
      ))}
    </CommandGroup>
  )
}

export { InsetButtonsCommandPalette }
