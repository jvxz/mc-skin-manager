'use client'
import { Toggle as TogglePrimitive } from 'radix-ui'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import type { ComponentProps } from 'react'
import { interactiveStyles } from '@/lib/styles'
import { cn } from '@/lib/utils'

const toggleVariants = cva(
  cn(
    interactiveStyles.base,
    `${interactiveStyles.base} data-[state=on]:bg-accent data-[state=on]:text-accent-foreground p-0`,
  ),
  {
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
    variants: {
      size: {
        default: [interactiveStyles.size.default, 'text-sm'],
        lg: [interactiveStyles.size.lg, 'text-sm'],
        sm: [interactiveStyles.size.sm, 'text-sm'],
      },
      variant: {
        default: [
          interactiveStyles.variant.ghost,
          'data-[state=on]:bg-muted m-0 border border-transparent',
        ],
        outline: [
          interactiveStyles.variant.outline,
          'data-[state=on]:bg-muted data-[state=on]:border-primary/30 m-0',
        ],
      },
    },
  },
)

function Toggle({
  className,
  variant,
  size,
  ...props
}: ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(
        toggleVariants({
          className,
          size,
          variant,
        }),
      )}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }
