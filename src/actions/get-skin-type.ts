'use server'
import sharp from 'sharp'

type ParamsAsUrl = {
  url: string
}

type ParamsAsBase64 = {
  base64: string
}

type Params = ParamsAsUrl | ParamsAsBase64

export async function getSkinType(params: Params) {
  if ('url' in params) {
    const { url } = params

    const res = await fetch(url)
    const arrayBuffer = await res.arrayBuffer()

    return await checkSkin(arrayBuffer)
  }

  const { base64 } = params

  const { buffer } = Buffer.from(base64, 'base64')

  return await checkSkin(buffer)
}

async function checkSkin(arrayBuffer: ArrayBuffer) {
  const meta = await sharp(arrayBuffer).metadata()

  if (meta.width / meta.height !== 1) throw new Error('Invalid skin')

  const { data, info } = await sharp(arrayBuffer).raw().toBuffer({
    resolveWithObject: true,
  })

  const rate = meta.width / 64

  const armPixelX = 19 * rate
  const armPixelY = 50 * rate

  const { width } = info
  const armIndex = (armPixelX * width + armPixelY) * 4

  return data[armIndex] === 0 ? 'slim' : 'classic'
}
