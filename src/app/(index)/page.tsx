import { SkinList } from '@/components/skin-list'
import { SkinListHeader } from '@/components/skin-list-header'
import { SkinViewer } from '@/components/skin-viewer'

export default function Page() {
  return (
    <div className="flex size-full">
      <div className="flex h-full min-h-0 w-[700px] flex-col border-r">
        <SkinListHeader />
        <SkinList />
      </div>
      <div className="grid w-full place-items-center">
        <SkinViewer />
      </div>
    </div>
  )
}
