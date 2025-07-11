'use server'
import sharp from 'sharp'

type Params = {
  base64: string
}

export async function getSkinType({ base64 }: Params) {
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
