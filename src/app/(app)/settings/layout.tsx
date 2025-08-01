import { SettingsLinks } from '@/components/settings/links'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto mt-12 flex h-screen w-[1200px] flex-col gap-3">
      <h1 className="my-12 ml-2.5 font-medium text-4xl">Settings</h1>
      <div className="flex gap-6">
        <div className="flex w-1/4 flex-col gap-1">
          <SettingsLinks />
        </div>
        {children}
      </div>
    </div>
  )
}
