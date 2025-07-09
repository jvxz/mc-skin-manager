import { IconBrandMinecraft } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'

export default function Navbar() {
  return (
    <nav className="flex h-12 w-full items-center border-b bg-card px-2">
      <Button variant="ghost" size="icon" className="scale-125">
        <IconBrandMinecraft />
      </Button>
      <div className="flex flex-row" />
    </nav>
  )
}
