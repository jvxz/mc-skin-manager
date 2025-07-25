'use server'
import sharp from 'sharp'

const HEAD_XY = [8, 8] as const
const HELMET_XY = [40, 8] as const

export async function getSkinHeadBase64(base64: string) {
  const image = Buffer.from(
    base64.replace(/^data:image\/\w+;base64,/, ''),
    'base64',
  )

  const { data, info } = await sharp(image).ensureAlpha().raw().toBuffer({
    resolveWithObject: true,
  })

  if (info.width / info.height !== 1 && info.width / info.height !== 2) {
    throw new Error('Invalid skin: must be 1:1 or 1:2')
  }

  const head = await sharp(data, {
    raw: {
      channels: 4,
      height: info.height,
      width: info.width,
    },
  })
    .extract({
      height: 8,
      left: HEAD_XY[0],
      top: HEAD_XY[1],
      width: 8,
    })
    .toBuffer({
      resolveWithObject: true,
    })

  const helmet = await sharp(data, {
    raw: {
      channels: 4,
      height: info.height,
      width: info.width,
    },
  })
    .extract({
      height: 8,
      left: HELMET_XY[0],
      top: HELMET_XY[1],
      width: 8,
    })
    .toBuffer({
      resolveWithObject: true,
    })

  const mergedHead = await sharp(head.data, {
    raw: {
      channels: 4,
      height: 8,
      width: 8,
    },
  })
    .composite([
      {
        input: helmet.data,
        raw: {
          channels: 4,
          height: 8,
          width: 8,
        },
      },
    ])
    .png()
    .toBuffer({
      resolveWithObject: true,
    })

  return mergedHead.data.toString('base64')
}
