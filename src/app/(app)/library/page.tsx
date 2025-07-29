import { LibrarySkinCard } from '@/components/library/skin-card'

export default function Page() {
  return (
    <div className="grid w-full grid-cols-4 gap-4">
      {Array.from({ length: 12 }).map((_, i) => {
        return <LibrarySkinCard key={i} />
      })}
    </div>
  )
}
