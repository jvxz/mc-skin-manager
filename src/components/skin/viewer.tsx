import { SkinViewerActions } from './viewer-actions'
import { SkinViewerCanvas } from './viewer-canvas'
import { SkinViewerInfo } from './viewer-info'

function SkinViewer() {
  return (
    <div className="mx-auto flex h-fit w-fit flex-col gap-6 xl:w-[800px] xl:flex-row 2xl:w-[950px]">
      {/* <div className="size-full "></div> */}
      <div className="relative shrink-0 self-center">
        <SkinViewerCanvas />
      </div>
      <div className="flex w-full flex-col gap-3">
        <SkinViewerInfo />
        <SkinViewerActions />
      </div>
    </div>
  )
}

export { SkinViewer }
