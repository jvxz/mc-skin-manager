'use client'
import { notFound } from 'next/navigation'
import { SkinViewer } from '@/components/skin-viewer'

export default function Page() {
  if (process.env.NODE_ENV !== 'development') return notFound()

  return (
    <div className="grid size-full place-items-center">
      <SkinViewer />
    </div>
  )
}
