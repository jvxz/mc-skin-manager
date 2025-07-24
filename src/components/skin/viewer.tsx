import { SkinViewerCanvas } from './viewer-canvas'

function SkinViewer() {
  return (
    <div className="mx-auto flex h-fit w-fit flex-col gap-6">
      <div className="relative shrink-0 self-center">
        <SkinViewerCanvas />
      </div>
    </div>
  )
}

export { SkinViewer }
