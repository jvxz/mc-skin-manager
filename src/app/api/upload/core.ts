import {
  createUploadthing,
  type FileRouter as UploadThingFileRouter,
} from 'uploadthing/next'
import { UploadThingError } from 'uploadthing/server'
import { getAuthData } from '@/actions/server/utils/get-auth-data'

const f = createUploadthing()

export const fileRouter = {
  imageUploader: f({
    image: {
      maxFileCount: 1,
      maxFileSize: '4MB',
    },
  })
    .middleware(async _ => {
      const authData = await getAuthData()

      if (!authData) throw new UploadThingError('Unauthorized')

      return { userId: authData.user.id }
    })
    .onUploadComplete(async ({ metadata }) => {
      return { uploadedBy: metadata.userId }
    }),
} satisfies UploadThingFileRouter

export type FileRouter = typeof fileRouter
