import { SettingsLinkMicrosoft } from '@/components/settings/link-microsoft'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Page() {
  return (
    <div className="mx-auto mt-12 flex h-screen w-[1200px] flex-col gap-3">
      <h1 className="my-12 font-medium text-4xl">Settings</h1>
      <div className="flex gap-6">
        <div className="flex w-1/4 flex-col gap-3">
          <Input placeholder="Search" className="mb-3 h-10 w-full" />
          <Button variant="ghost" className="h-10 w-full justify-start">
            General
          </Button>
        </div>
        <div className="flex w-full flex-col">
          <SettingsLinkMicrosoft />
        </div>
      </div>
    </div>
  )
}
