'use client'
import { useCallback } from 'react'
import ReactSkinview3d, {
  type ViewerReadyCallbackOptions,
} from 'react-skinview3d'
import { PlayerAnimation, type PlayerObject } from 'skinview3d'
import { DirectionalLight } from 'three'

class WalkAnimation extends PlayerAnimation {
  animate(player: PlayerObject) {
    const t = this.progress * 3.5

    player.skin.leftLeg.rotation.x = Math.sin(t) * 0.4
    player.skin.rightLeg.rotation.x = Math.sin(t + Math.PI) * 0.4

    player.skin.leftArm.rotation.x = Math.sin(t + Math.PI) * 0.4
    player.skin.rightArm.rotation.x = Math.sin(t) * 0.4

    const basicCapeRotationX = Math.PI * 0.1
    player.cape.rotation.x = Math.sin(t / 2.5) * 0.06 + basicCapeRotationX
  }
}

function SkinViewer() {
  const handleReady = useCallback(({ viewer }: ViewerReadyCallbackOptions) => {
    viewer.controls.enableZoom = false

    // all of these three.js properties (except for the camera position)
    // were taken from the namemc skin viewerœ

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
  }, [])

  return (
    <ReactSkinview3d
      capeUrl={'/test-cape.png'}
      options={{
        animation: new WalkAnimation(),
        fov: 35,
        model: 'auto-detect',
      }}
      width={500}
      onReady={handleReady}
      height={700}
      skinUrl={'/assets/steve.png'}
    />
  )
}

export { SkinViewer }
