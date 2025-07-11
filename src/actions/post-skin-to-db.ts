'use server'
import { db } from '@/db'
import { skinsTable } from '@/db/schema'
import type { Skin } from '@/lib/types'

export async function postSkinToDb(skin: Skin) {
  if (skin.inputType === 'file') return
  const res = await fetch(skin.skinUrl)
  const image = await res.arrayBuffer()
  const base64 = Buffer.from(image).toString('base64')

  await db.insert(skinsTable).values({
    base64,
  })
}
