'use server'
import sharp from 'sharp'

type Params = {
  url: string
  skipCheck?: boolean
}

export async function getSkinType({ url, skipCheck = false }: Params) {
  const res = await fetch(url)
  const arrayBuffer = await res.arrayBuffer()

  const meta = await sharp(arrayBuffer).metadata()

  if (!skipCheck) {
    if (meta.width / meta.height !== 1) throw new Error('Invalid skin')
  }

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
