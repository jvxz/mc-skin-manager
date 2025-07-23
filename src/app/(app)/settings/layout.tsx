import { IconBug, IconUser } from '@tabler/icons-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto mt-12 flex h-screen w-[1200px] flex-col gap-3">
      <h1 className="my-12 font-medium text-4xl">Settings</h1>
      <div className="flex gap-6">
        <div className="flex w-1/4 flex-col gap-1">
          <Input placeholder="Search" className="mb-3 h-10 w-full" />
          {/* <Button asChild variant="ghost" className="h-10 w-full justify-start">
            <Link href="/settings/general">
              <IconSettings />
              General
            </Link>
          </Button> */}
          <Button asChild variant="ghost" className="h-10 w-full justify-start">
            <Link href="/settings/account">
              <IconUser />
              Account
            </Link>
          </Button>
          <Button asChild variant="ghost" className="h-10 w-full justify-start">
            <Link href="/settings/debug">
              <IconBug />
              Debug
            </Link>
          </Button>
        </div>
        {children}
      </div>
    </div>
  )
}
