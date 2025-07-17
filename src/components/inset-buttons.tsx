import { IconLayoutSidebar } from '@tabler/icons-react'
import { useExpanded } from '@/hooks/use-expanded'
import { Button } from './ui/button'

function InsetButtons() {
  const { expanded, setExpanded } = useExpanded()

  return (
    <div className="absolute inset-0 m-2 w-[calc(var(--expanded)-1.5rem)]">
      <Button
        variant="ghost"
        onClick={() => setExpanded(!expanded)}
        className="size-16">
        <IconLayoutSidebar className="!size-7" />
      </Button>
    </div>
  )
}

export { InsetButtons }
