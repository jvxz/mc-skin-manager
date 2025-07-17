import { Slot as SlotPrimitive } from 'radix-ui'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import type { ComponentProps } from 'react'
import { interactiveStyles } from '@/lib/styles'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  `${interactiveStyles.base} inline-flex w-fit shrink-0 cursor-default items-center justify-center px-2 py-0.5 text-xs tracking-wide select-none`,
  {
    defaultVariants: {
      variant: 'default',
    },
    variants: {
      variant: {
        default: `${interactiveStyles.variant.default}`,
        destructive: `${interactiveStyles.variant.destructive}`,
        ghost: `${interactiveStyles.variant.ghost}`,
        outline: `${interactiveStyles.variant.outline}`,
      },
    },
  },
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? SlotPrimitive.Slot : 'span'

  return (
    <Comp
      data-slot="badge"
      className={cn(
        badgeVariants({
          variant,
        }),
        className,
      )}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
