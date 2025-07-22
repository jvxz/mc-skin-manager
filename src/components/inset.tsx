import { InsetButtons } from './inset-buttons'
import { Card } from './ui/card'

function Inset({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex size-full flex-row-reverse bg-card p-2">
      <Card className="z-10 h-full w-[calc(100vw-var(--sidebar))] overflow-y-auto rounded bg-background p-0">
        {children}
      </Card>
      <InsetButtons />
    </div>
  )
}

export { Inset }
