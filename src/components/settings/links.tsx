'use client'
import { IconBug, IconUser } from '@tabler/icons-react'
import { motion } from 'motion/react'
import { usePathname } from 'next/navigation'
import { Link } from 'next-view-transitions'
import { Button } from '@/components/ui/button'

const SETTINGS_PATHS = [
  { icon: IconUser, label: 'Account', slug: '/settings/account' },
  { icon: IconBug, label: 'Debug', slug: '/settings/debug' },
]

function SettingsLinks() {
  const pathname = usePathname()
  const isActive = (path: string) => pathname === path

  return SETTINGS_PATHS.map(({ icon: Icon, slug, label }) => (
    <Button
      key={slug}
      asChild
      variant="ghost"
      className="h-10 w-full justify-start">
      <Link href={slug}>
        <Icon
          data-active={isActive(slug)}
          className="!size-5 z-10 data-[active=true]:text-foreground"
        />
        <span
          data-active={isActive(slug)}
          className="z-10 text-sm data-[active=true]:text-foreground">
          {label}
        </span>
        {isActive(slug) && (
          <motion.div
            key="bg"
            layoutId="settings-link-bg"
            transition={{
              duration: 0.15,
              type: 'tween',
            }}
            className="absolute inset-0 size-full rounded bg-muted bg-blend-lighten"></motion.div>
        )}
      </Link>
    </Button>
  ))
}

export { SettingsLinks }
