'use client'
import {
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
  IconRefresh,
} from '@tabler/icons-react'
import { atom, useAtomValue } from 'jotai'
import { useCallback, useMemo, useRef, useState } from 'react'
import ReactSkinview3d, {
  type ViewerReadyCallbackOptions,
} from 'react-skinview3d'
import {
  PlayerAnimation,
  type PlayerObject,
  type SkinViewer,
  type SkinViewerOptions,
} from 'skinview3d'
import { DirectionalLight } from 'three'
import type { Skin } from '@/db/schema'
import { Button } from '../ui/button'

const SIZE_MULTIPLIER = 6.5

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
  const viewerRef = useRef<SkinViewer | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const skin = useAtomValue(currentSkinAtom)

  const model = useMemo((): SkinViewerOptions['model'] => {
    if (!skin) return undefined

    if (skin.skinType === 'SLIM') return 'slim'

    return 'default'
  }, [skin])

  const handleReady = useCallback(({ viewer }: ViewerReadyCallbackOptions) => {
    viewerRef.current = viewer
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

    // viewer
  }, [])

  const handleCameraReset = useCallback(() => {
    viewerRef.current?.camera.position.set(-25, 20, 48)
  }, [])

  const handleAnimationPause = useCallback(() => {
    if (!viewerRef.current || !viewerRef.current.animation) return

    viewerRef.current.animation.paused = !isPaused
    setIsPaused(!isPaused)
  }, [isPaused])

  return (
    <div className="relative size-full">
      <ReactSkinview3d
        data-active={!!skin}
        options={{
          animation: new WalkAnimation(),
          fov: 35,
          model,
        }}
        className="size-full data-[active=false]:hidden"
        width={64 * SIZE_MULTIPLIER}
        onReady={handleReady}
        height={64 * SIZE_MULTIPLIER * 1.375}
        skinUrl={`data:image/png;base64,${skin?.base64}`}
      />
      <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-80 hover:opacity-100 duration-150">
        <Button size="icon" variant="ghost" onClick={handleCameraReset}>
          <IconRefresh />
        </Button>
        <Button size="icon" variant="ghost" onClick={handleAnimationPause}>
          {isPaused ? <IconPlayerPlayFilled /> : <IconPlayerPauseFilled />}
        </Button>
      </div>
      <div
        className="-z-10 absolute inset-0 block rounded bg-repeat opacity-80 dark:hidden"
        style={{
          backgroundImage:
            'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACAAQMAAAD58POIAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAZQTFRF/Pz85ubmamHL2wAAACVJREFUeJxjZICC/1CacVRgVGBUYFSASAF0mVGBUYFRgVEBIgUAct6AQSI44csAAAAASUVORK5CYII=)',
        }}
      />
      <div
        className="-z-10 absolute inset-0 hidden rounded bg-repeat opacity-80 dark:block"
        style={{
          backgroundImage:
            'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACAAQMAAAD58POIAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAZQTFRFHR0dCQkJh+NMmQAAACVJREFUeJxjZICC/1CacVRgVGBUYFSASAF0mVGBUYFRgVEBIgUAct6AQSI44csAAAAASUVORK5CYII=)',
        }}
      />
    </div>
  )
}

export { SkinViewerCanvas }
