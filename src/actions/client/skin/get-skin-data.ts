import { z } from 'zod'
import { getSkinDataFromUser } from '@/actions/server/skin/get-skin-data-from-user'
import { getSkinHeadBase64 } from '@/actions/server/skin/get-skin-head-base64'
import { getSkinType } from '@/actions/server/skin/get-skin-type'
import { fetchFromServer } from '@/actions/server/utils/fetch-from-server'
import type { Skin } from '@/db/schema'

export async function getSkinData(
  input: File | string,
): Promise<Omit<Skin, 'userId' | 'skinUrl'>> {
  const now = new Date()
  const isFile = input instanceof File
  const isUrl = z.url().safeParse(input).success

  if (isFile) {
    const base64 = await getSkinBase64FromFile(input)
    const skinType = await getSkinType(base64)
    const headBase64 = await getSkinHeadBase64(base64)

    return {
      base64,
      createdAt: now,
      headBase64,
      id: crypto.randomUUID(),
      name: 'Unnamed skin',
      skinType,
      uuid: null,
    }
  }

  if (isUrl) {
    const res = await fetchFromServer(input)

    if (!res.ok) {
      throw new Error('Failed to fetch skin from URL')
    }

    const buffer = await res.blob()
    const base64 = await getSkinBase64FromFile(buffer)
    const skinType = await getSkinType(base64)
    const headBase64 = await getSkinHeadBase64(base64)

    return {
      base64,
      createdAt: now,
      headBase64,
      id: crypto.randomUUID(),
      name: 'Unnamed skin',
      skinType,
      uuid: null,
    }
  }

  const { skinBlob, skinType, name, uuid } = await getSkinDataFromUser(input)

  const base64 = await getSkinBase64FromFile(skinBlob)
  const headBase64 = await getSkinHeadBase64(base64)

  return {
    base64,
    createdAt: now,
    headBase64,
    id: crypto.randomUUID(),
    name,
    skinType,
    uuid,
  }
}

function getSkinBase64FromFile(input: File | Blob) {
  const reader = new FileReader()

  return new Promise<string>((resolve, reject) => {
    reader.onload = () => {
      const base64 = reader.result as string
      resolve(base64)
    }

    reader.onerror = () => {
      reject(new Error('Failed to read file'))
    }

    reader.readAsDataURL(input)
  })
}
