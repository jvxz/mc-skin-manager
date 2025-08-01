'use server'
import { UTApi } from 'uploadthing/server'

export async function postThumbnailToUT(thumbnail: string) {
  const ut = new UTApi()

  const thumbnailFileBuffer = Buffer.from(thumbnail, 'base64')
  const thumbnailFile = new File([thumbnailFileBuffer], 'thumbnail.png', {
    type: 'image/png',
  })

  const uploadRes = await ut.uploadFiles(thumbnailFile)

  if (uploadRes.error) {
    throw new Error('Failed to upload thumbnail')
  }

  return uploadRes.data.ufsUrl
}
