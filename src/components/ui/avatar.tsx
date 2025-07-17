'use client'
import { Avatar as AvatarPrimitive } from 'radix-ui'
import type { ComponentProps } from 'react'
import { staticStyles } from '@/lib/styles'
import { cn } from '@/lib/utils'

function Avatar({
  className,
  square = false,
  ...props
}: ComponentProps<typeof AvatarPrimitive.Root> & {
  square?: boolean
}) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        staticStyles.base,
        staticStyles.variant.default,
        'relative flex size-8 shrink-0 overflow-hidden rounded-full p-0',
        square && 'rounded-sm *:data-[slot=avatar-fallback]:rounded-sm',
        className,
      )}
      {...props}
    />
  )
}

function AvatarImage({
  className,
  ...props
}: ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn('aspect-square size-full', className)}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        staticStyles.variant.default,
        'flex size-full items-center justify-center rounded-full border-0',
        className,
      )}
      {...props}
    />
  )
}

export { Avatar, AvatarFallback, AvatarImage }
