'use client'
import { notFound } from 'next/navigation'
import { useSkinList } from '@/hooks/use-skin-list'

export default function Page() {
  const { data: skins } = useSkinList()
  if (process.env.NODE_ENV !== 'development') return notFound()

  return <pre>{JSON.stringify(skins, null, 2)}</pre>
}
