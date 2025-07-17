'use client'
import type { ToasterProps } from 'sonner'
import { Toaster as Sonner } from 'sonner'

function Toaster({ ...props }: ToasterProps) {
  return (
    <Sonner
      toastOptions={{
        classNames: {
          actionButton: '!bg-primary !text-primary-foreground font-medium',
          cancelButton: '!bg-muted !text-muted-foreground font-medium',
          description: '!text-muted-foreground',
          toast:
            'group toast !bg-card !text-card-foreground !border-border !shadow-none',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
