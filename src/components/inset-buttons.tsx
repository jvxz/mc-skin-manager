import { IconLibrary, IconSettings } from '@tabler/icons-react'
import { Link } from 'next-view-transitions'
import { InsetButtonsAuth } from './inset-buttons-auth'
import { InsetButtonsCommandPalette } from './inset-buttons-command-palette'
import { Button } from './ui/button'
import { Separator } from './ui/separator'

function InsetButtons() {
  return (
    <div className="absolute inset-0 m-2 w-[calc(var(--sidebar)-1.5rem)]">
      <div className="flex flex-col gap-2">
        <InsetButtonsCommandPalette />
        <Separator />
        <InsetButtonsAuth />
        <Button variant="ghost" className="size-16" asChild>
          <Link href="/">
            <IconLibrary className="!size-8" />
          </Link>
        </Button>
        <Button variant="ghost" className="size-16" asChild>
          <Link href="/settings/account">
            <IconSettings className="!size-8" />
          </Link>
        </Button>
      </div>
    </div>
  )
}

export { InsetButtons }
