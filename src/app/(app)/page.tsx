import { SkinList } from '@/components/skin/list'
import { SkinViewerCanvas } from '@/components/skin/viewer-canvas'

export default function Page() {
  return (
    <div className="flex size-full *:p-2">
      <SkinList />
      <div className="flex flex-1 items-center justify-center">
        <SkinViewerCanvas />
      </div>
    </div>
  )
}
