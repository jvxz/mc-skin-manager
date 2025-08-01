import { SettingsDeleteAccount } from '@/components/settings/delete-account'
import { SettingsLinkMicrosoft } from '@/components/settings/link-microsoft'

export default function Page() {
  return (
    <div className="flex w-full flex-col gap-3">
      <SettingsLinkMicrosoft />
      <SettingsDeleteAccount />
    </div>
  )
}
