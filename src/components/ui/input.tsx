import type { ComponentProps } from 'react'
import { staticStyles } from '@/lib/styles'
import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        staticStyles.base,
        staticStyles.variant.default,
        'flex w-full min-w-0 cursor-text px-3 py-1 transition-all selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground focus-visible:ring-0 md:text-sm',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
