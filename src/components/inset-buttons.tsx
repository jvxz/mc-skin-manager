'use client'
import { IconBoxModel, IconLibrary, IconSettings } from '@tabler/icons-react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { InsetButtonsAuth } from './inset-buttons-auth'
import { InsetButtonsCommandPalette } from './inset-buttons-command-palette'
import { ThemeToggle } from './theme-toggle'
import { Button } from './ui/button'
import { Separator } from './ui/separator'

const PATHS = [
  { icon: IconBoxModel, slug: '/' },
  { icon: IconLibrary, slug: '/library' },
  { icon: IconSettings, slug: '/settings/account' },
]

function InsetButtons() {
  const pathname = usePathname()
  const isActive = (path: string) =>
    pathname === path || pathname.split('/')[1] === path.split('/')[1]

  return (
    <div className="absolute inset-0 m-2 w-[calc(var(--sidebar)-1.5rem)]">
      <div className="flex h-full flex-col gap-2">
        <InsetButtonsCommandPalette />
        <Separator />
        {PATHS.map(({ icon: Icon, slug }) => (
          <Button
            key={slug}
            variant="ghost"
            className="relative size-16"
            asChild>
            <Link href={slug}>
              <Icon
                data-active={isActive(slug)}
                className="!size-8 z-10 data-[active=true]:text-foreground"
              />
              {isActive(slug) && (
                <motion.div
                  key="bg"
                  layoutId="inset-button-bg"
                  transition={{
                    duration: 0.15,
                    type: 'tween',
                  }}
                  className="absolute inset-0 size-full rounded bg-muted bg-blend-lighten"></motion.div>
              )}
            </Link>
          </Button>
        ))}
        <div className="mt-auto" />
        <InsetButtonsAuth />
        <ThemeToggle />
      </div>
    </div>
  )
}

export { InsetButtons }
