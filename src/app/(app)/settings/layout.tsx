import { IconBug, IconUser } from '@tabler/icons-react'
import { Link } from 'next-view-transitions'
import { Button } from '@/components/ui/button'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto mt-12 flex h-screen w-[1200px] flex-col gap-3">
      <h1 className="my-12 ml-2.5 font-medium text-4xl">Settings</h1>
      <div className="flex gap-6">
        <div className="flex w-1/4 flex-col gap-1">
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
