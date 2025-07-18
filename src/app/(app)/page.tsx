import { SkinList } from '@/components/skin/list'
import { SkinViewer } from '@/components/skin/viewer'

export default function Page() {
  return (
    <div className="flex size-full *:p-2">
      <div className="w-[400px] border-r">
        <SkinList />
      </div>
      <div className="flex flex-1 items-center justify-center">
        <SkinViewer />
      </div>
    </div>
  )
}
