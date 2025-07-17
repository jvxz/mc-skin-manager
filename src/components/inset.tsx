'use client'
import { useExpanded } from '@/hooks/use-expanded'
import { InsetButtons } from './inset-buttons'
import { Card } from './ui/card'

function Inset({ children }: { children: React.ReactNode }) {
  const { expanded } = useExpanded()

  return (
    <div className="flex size-full flex-row-reverse bg-card p-2">
      <Card
        data-expanded={expanded}
        className="z-10 h-full w-[calc(100vw-var(--not-expanded))] overflow-y-auto rounded bg-background p-0 transition-all data-[expanded=true]:w-[calc(100vw-var(--expanded))]">
        {children}
      </Card>
      <InsetButtons />
    </div>
  )
}

export { Inset }
