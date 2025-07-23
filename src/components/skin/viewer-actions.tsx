'use client'
import { saveAs } from 'file-saver'
import { useAtomValue } from 'jotai'
import { motion, useAnimation } from 'motion/react'
import { useSkin } from '@/hooks/use-skin'
import { useUser } from '@/hooks/use-user'
import { Button } from '../ui/button'
import { MdiMinecraft } from '../ui/icons/minecraft'
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
      <Button disabled={!skin} variant="outline" onClick={handleDownload}>
        Download
      </Button>
      <div className="flex-1" />
      <SkinViewerApplyButton />
    </div>
  )
}

function SkinViewerApplyButton() {
  const { applySkin, isMutating } = useSkin()
  const { mojangData } = useUser()
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
      disabled={!skin || !mojangData}
      isLoading={isMutating}
      onMouseDown={handleHoldStart}
      onMouseUp={handleHoldEnd}
      onMouseLeave={handleHoldEnd}
      onTouchStart={handleHoldStart}
      onTouchEnd={handleHoldEnd}
      onTouchCancel={handleHoldEnd}
      className="!glow-lime-500 relative animate-in touch-none overflow-hidden border border-[#74b03c] bg-[#74b03c]/85 text-[#74b03c]-foreground hover:bg-[#74b03c]/90 focus-visible:border-[#74b03c]/50 active:bg-[#74b03c]/85">
      <motion.div
        initial={{ width: '0%' }}
        animate={controls}
        className="absolute top-0 left-0 h-full bg-white/20"
      />
      <span className="relative z-10 flex w-full items-center justify-center gap-2">
        <MdiMinecraft className="!size-4" />
        Apply skin to Minecraft
      </span>
    </Button>
  )
}

export { SkinViewerActions }
