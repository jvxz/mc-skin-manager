import { SkinList } from '@/components/skin/list'
import { SkinViewer } from '@/components/skin/viewer'
import { SkinViewerInfo } from '@/components/skin/viewer-info'

export default function Page() {
  return (
    <div className="flex size-full shrink-0 items-center *:p-2">
      <div className="h-full w-1/5">
        <SkinList />
      </div>
      <div className="flex-1">
        <div className="mx-auto flex h-fit w-fit flex-row items-center justify-center gap-3">
          <SkinViewer />
          <SkinViewerInfo />
        </div>
      </div>
      {/* <div className="flex w-1/5 shrink-0 flex-col gap-3"></div> */}
    </div>
  )
}
