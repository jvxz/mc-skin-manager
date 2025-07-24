'use client'
import { IconDownload, IconExternalLink, IconTrash } from '@tabler/icons-react'
import { saveAs } from 'file-saver'
import { useAtomValue } from 'jotai'
import { motion, useAnimation } from 'motion/react'
import { Link } from 'next-view-transitions'
import { useSkin } from '@/hooks/use-skin'
import { useUser } from '@/hooks/use-user'
import { Button } from '../ui/button'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'
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
        size="icon"
        onClick={() => skin && deleteSkin(skin)}>
        <IconTrash />
      </Button>
      <Button
        size="icon"
        disabled={!skin}
        variant="soft"
        onClick={handleDownload}>
        <IconDownload />
      </Button>
      <div className="flex-1" />
      <SkinViewerApplyButton />
    </div>
  )
}

function SkinViewerApplyButton() {
  const { applySkin, isMutating } = useSkin()
  const { mojangData, authData } = useUser()
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

  if (!skin || !mojangData || !authData)
    return (
      <HoverCard>
        <HoverCardTrigger>
          <Button className="!glow-lime-500 pointer-events-none relative animate-in touch-none overflow-hidden border border-[#74b03c] bg-[#74b03c]/85 text-[#74b03c]-foreground opacity-50 hover:bg-[#74b03c]/90 focus-visible:border-[#74b03c]/50 active:bg-[#74b03c]/85">
            <span className="relative z-10 flex w-full items-center justify-center gap-2">
              <MdiMinecraft className="!size-4" />
              Apply skin to Minecraft
            </span>
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="flex flex-col gap-4" side="top">
          {!mojangData && authData && (
            <>
              <p>
                You must be bound to a Microsoft account to apply a skin to your
                Minecraft account.
              </p>
              <Button className="ml-auto w-fit" asChild>
                <Link href="/settings/account">
                  Bind account <IconExternalLink />
                </Link>
              </Button>
            </>
          )}

          {!authData && (
            <p>
              You must be logged in to apply a skin to your Minecraft account.
            </p>
          )}
        </HoverCardContent>
      </HoverCard>
    )

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
