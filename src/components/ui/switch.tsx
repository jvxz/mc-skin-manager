'use client'
import { Switch as SwitchPrimitive } from 'radix-ui'
import type { ComponentProps } from 'react'
import { interactiveStyles, staticStyles } from '@/lib/styles'
import { cn } from '@/lib/utils'

function Switch({
  className,
  ...props
}: ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        staticStyles.base,
        staticStyles.variant.default,
        'data-[state=checked]:glow-primary inline-flex h-5 w-9 items-center rounded-full border-2 border-muted bg-muted p-0 transition-all duration-150 data-[state=checked]:border-primary data-[state=checked]:bg-primary',
        className,
      )}
      {...props}>
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          interactiveStyles.base,
          interactiveStyles.variant.default,
          'pointer-events-none block size-4 rounded-full border-0 bg-background ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0',
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
