'use client'
import dynamic from 'next/dynamic'
import type { ThemeProviderProps } from 'next-themes'
import { NuqsAdapter } from 'nuqs/adapters/next'
import { TRPCReactProvider } from '@/lib/trpc/client'
import { Toaster } from './ui/sonner'

// prevent hydration errors
const NextThemesProvider = dynamic(
  async () => import('next-themes').then(e => e.ThemeProvider),
  {
    ssr: false,
  },
)

function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <TRPCReactProvider>
      <NextThemesProvider
        disableTransitionOnChange
        attribute="class"
        defaultTheme="system"
        enableSystem
        {...props}>
        <NuqsAdapter>{children}</NuqsAdapter>
        <Toaster />
      </NextThemesProvider>
    </TRPCReactProvider>
  )
}

export { Providers }
