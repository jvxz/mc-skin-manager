'use client'

import { IconTrash } from '@tabler/icons-react'
import { saveAs } from 'file-saver'
import { useAtomValue } from 'jotai'
import { motion, useAnimation } from 'motion/react'
import { useSkin } from '@/hooks/use-skin'
import { Button } from '../ui/button'
import { currentSkinAtom } from './viewer-canvas'

function SkinViewerActions() {
  const { deleteSkin } = useSkin()
  const skin = useAtomValue(currentSkinAtom)

  const handleDownload = () => {
    if (!skin) return

    const blob = new Blob([skin.base64])
    saveAs(blob, `${skin.name}.png`)
  }

  return (
    <div className="flex w-full justify-end gap-3">
      <Button
        disabled={!skin}
        variant="destructive"
        onClick={() => skin && deleteSkin(skin)}>
        Delete
      </Button>
      <Button variant="outline" onClick={handleDownload}>
        Download
      </Button>
      <div className="flex-1" />
      <SkinViewerApplyButton />
    </div>
  )
}

function SkinViewerApplyButton() {
  const { applySkin } = useSkin()
  const skin = useAtomValue(currentSkinAtom)
  const controls = useAnimation()

  async function handleHoldStart() {
    if (!skin) return

    controls.set({ width: '0%' })
    await controls.start({
      transition: {
        duration: 1750 / 1000,
        ease: 'linear',
      },
      width: '100%',
    })
    applySkin(skin)
  }

  function handleHoldEnd() {
    controls.stop()
    controls.start({
      transition: { duration: 0.1 },
      width: '0%',
    })
  }

  return (
    <Button
      onMouseDown={handleHoldStart}
      onMouseUp={handleHoldEnd}
      onMouseLeave={handleHoldEnd}
      onTouchStart={handleHoldStart}
      onTouchEnd={handleHoldEnd}
      onTouchCancel={handleHoldEnd}
      className="relative touch-none overflow-hidden">
      <motion.div
        initial={{ width: '0%' }}
        animate={controls}
        className="absolute top-0 left-0 h-full bg-white/20"
      />
      <span className="relative z-10 flex w-full items-center justify-center gap-2">
        <IconTrash className="h-4 w-4" />
        Apply skin
      </span>
    </Button>
  )
}

export { SkinViewerActions }
