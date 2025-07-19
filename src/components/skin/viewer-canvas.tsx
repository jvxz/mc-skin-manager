'use client'
import { atom, useAtomValue } from 'jotai'
import { useCallback, useMemo } from 'react'
import ReactSkinview3d, {
  type ViewerReadyCallbackOptions,
} from 'react-skinview3d'
import {
  PlayerAnimation,
  type PlayerObject,
  type SkinViewerOptions,
} from 'skinview3d'
import { DirectionalLight } from 'three'
import type { Skin } from '@/db/schema'

export const currentSkinAtom = atom<Skin | null>(null)

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

function SkinViewerCanvas() {
  const skin = useAtomValue(currentSkinAtom)

  const model = useMemo((): SkinViewerOptions['model'] => {
    if (!skin) return undefined

    if (skin.skinType === 'SLIM') return 'slim'

    return 'default'
  }, [skin])

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
      data-active={!!skin}
      options={{
        animation: new WalkAnimation(),
        fov: 35,
        model,
      }}
      className="data-[active=false]:hidden"
      width={500}
      onReady={handleReady}
      height={700}
      skinUrl={skin?.base64 ?? ''}
    />
  )
}

export { SkinViewerCanvas }
