import { PlayerAnimation, type PlayerObject, SkinViewer } from 'skinview3d'
import { DirectionalLight } from 'three'
import type { Skin } from '@/db/schema'

const WIDTH = 89.6 * 6
const HEIGHT = 160 * 6

class WalkAnimation extends PlayerAnimation {
  animate(player: PlayerObject) {
    this.progress = 1.45
    const t = this.progress * 3.5

    player.skin.leftLeg.rotation.x = Math.sin(t) * 0.4
    player.skin.rightLeg.rotation.x = Math.sin(t + Math.PI) * 0.4

    player.skin.leftArm.rotation.x = Math.sin(t + Math.PI) * 0.4
    player.skin.rightArm.rotation.x = Math.sin(t) * 0.4

    const basicCapeRotationX = Math.PI * 0.1
    player.cape.rotation.x = Math.sin(t / 2.5) * 0.06 + basicCapeRotationX
  }
}

export async function generateThumbnail(
  skin: Omit<Skin, 'userId' | 'skinUrl' | 'thumbnailUrl'>,
) {
  const canvas = document.createElement('canvas')
  document.body.appendChild(canvas)

  canvas.width = WIDTH
  canvas.height = HEIGHT

  const viewer = new SkinViewer({
    animation: new WalkAnimation(),
    canvas,
    height: HEIGHT,
    width: WIDTH,
  })

  // clear default camera light
  viewer.cameraLight.clear()

  // set global light
  viewer.globalLight.color.set(0xffffff)
  viewer.globalLight.intensity = 2.3

  // set directional light
  const dirLight = new DirectionalLight(0xffffff, 1)
  dirLight.position.set(0.678, 0.284, 0.678)
  // @ts-expect-error
  viewer.scene.add(dirLight)

  // set camera properties
  viewer.fov = 38
  viewer.camera.near = 60 - 20
  viewer.camera.far = 60 + 20
  // default camera position
  viewer.camera.position.set(-25, 20, 48)

  await viewer.loadSkin(`data:image/png;base64,${skin.base64}`)

  viewer.render()

  const blob = await new Promise<Blob>((resolve, reject) => {
    requestAnimationFrame(() => {
      canvas.toBlob(blob => {
        if (blob) {
          resolve(blob)
        } else {
          reject(new Error('Failed to generate thumbnail'))
        }
      })
    })
  })

  const buffer = await blob.arrayBuffer()
  const base64 = Buffer.from(buffer).toString('base64')

  return base64
}
