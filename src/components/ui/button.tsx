import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import { Slot as SlotPrimitive } from 'radix-ui'
import type { ComponentProps } from 'react'
import { interactiveStyles } from '@/lib/styles'
import { cn } from '@/lib/utils'
import { Spinner } from './spinner'

const buttonVariants = cva(
  `${interactiveStyles.base} relative inline-flex items-center justify-center`,
  {
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
    variants: {
      size: {
        default: interactiveStyles.size.default,
        icon: interactiveStyles.size.icon,
        lg: interactiveStyles.size.lg,
        sm: interactiveStyles.size.sm,
      },
      variant: {
        default: interactiveStyles.variant.default,
        destructive: interactiveStyles.variant.destructive,
        ghost: interactiveStyles.variant.ghost,
        link: interactiveStyles.variant.link,
        outline: interactiveStyles.variant.outline,
      },
    },
  },
)

function Button({
  className,
  children,
  variant,
  size,
  asChild = false,
  isLoading = false,
  disabled = false,
  ...props
}: ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    isLoading?: boolean
    disabled?: boolean
  }) {
  const Comp = asChild ? SlotPrimitive.Slot : 'button'

  if (asChild)
    return (
      <Comp
        data-slot="button"
        disabled={disabled || isLoading}
        className={cn(
          buttonVariants({
            className,
            size,
            variant,
          }),
          isLoading && 'grid text-transparent [grid-template-areas:stack]',
          disabled && 'pointer-events-none',
        )}
        {...props}>
        {children}
      </Comp>
    )

  return (
    <Comp
      data-slot="button"
      disabled={disabled || isLoading}
      className={cn(
        buttonVariants({
          className,
          size,
          variant,
        }),
        isLoading && 'grid text-transparent [grid-template-areas:stack]',
        disabled && 'pointer-events-none',
      )}
      {...props}>
      {children}
      {isLoading && (
        <span className="absolute inset-0 grid place-items-center">
          <Spinner className="size-6" />
        </span>
      )}
    </Comp>
  )
}

export { Button, buttonVariants }
