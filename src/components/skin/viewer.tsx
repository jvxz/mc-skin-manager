import { SkinViewerCanvas } from './viewer-canvas'

function SkinViewer() {
  return (
    <div className="flex size-full">
      <div className="size-full "></div>
      <div className="relative shrink-0 self-center">
        <SkinViewerCanvas />
      </div>
      <div className="size-full "></div>
    </div>
  )
}

export { SkinViewer }
