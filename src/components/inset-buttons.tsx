import { IconLibrary, IconSettings } from '@tabler/icons-react'
import Link from 'next/link'
import { InsetButtonsAuth } from './inset-buttons-auth'
import { Button } from './ui/button'

function InsetButtons() {
  return (
    <div className="absolute inset-0 m-2 w-[calc(var(--expanded)-1.5rem)]">
      <div className="flex flex-col gap-2">
        <InsetButtonsAuth />
        <Button variant="ghost" className="size-16" asChild>
          <Link href="/">
            <IconLibrary className="!size-8" />
          </Link>
        </Button>
        <Button variant="ghost" className="size-16" asChild>
          <Link href="/settings">
            <IconSettings className="!size-8" />
          </Link>
        </Button>
      </div>
    </div>
  )
}

export { InsetButtons }
