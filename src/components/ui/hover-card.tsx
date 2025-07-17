'use client'
import { HoverCard as HoverCardPrimitive } from 'radix-ui'
import type { ComponentProps } from 'react'
import { popoverStyles } from '@/lib/styles'
import { cn } from '@/lib/utils'

function HoverCard({
  openDelay = 200,
  closeDelay = 100,
  ...props
}: ComponentProps<typeof HoverCardPrimitive.Root>) {
  return (
    <HoverCardPrimitive.Root
      data-slot="hover-card"
      openDelay={openDelay}
      closeDelay={closeDelay}
      {...props}
    />
  )
}

function HoverCardTrigger({
  ...props
}: ComponentProps<typeof HoverCardPrimitive.Trigger>) {
  return (
    <HoverCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />
  )
}

function HoverCardContent({
  className,
  align = 'center',
  sideOffset = 4,
  ...props
}: ComponentProps<typeof HoverCardPrimitive.Content>) {
  return (
    <HoverCardPrimitive.Content
      data-slot="hover-card-content"
      align={align}
      sideOffset={sideOffset}
      className={cn(popoverStyles.content, 'w-64 p-4 text-sm', className)}
      {...props}
    />
  )
}

export { HoverCard, HoverCardContent, HoverCardTrigger }
