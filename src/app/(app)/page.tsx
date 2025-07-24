import { SkinList } from '@/components/skin/list'
import { SkinViewer } from '@/components/skin/viewer'
import { SkinViewerInfo } from '@/components/skin/viewer-info'

export default function Page() {
  return (
    <div className="flex size-full shrink-0 *:p-2">
      <div className="w-1/5">
        <SkinList />
      </div>
      <div className="flex flex-1 items-center justify-center">
        <SkinViewer />
      </div>
      <div className="flex w-1/5 shrink-0 flex-col gap-3">
        <SkinViewerInfo />
      </div>
    </div>
  )
}
