import { Card } from '../ui/card'
import { SkinListHeader } from './list-header'

function SkinList() {
  return (
    <div className="flex flex-col gap-3">
      <SkinListHeader />
      <Card>Skin</Card>
    </div>
  )
}

export { SkinList }
