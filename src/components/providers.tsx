'use client'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import dynamic from 'next/dynamic'
import type { ThemeProviderProps } from 'next-themes'
import { NuqsAdapter } from 'nuqs/adapters/next'
import { makeQueryClient } from '@/lib/query-client'
import { LocalMigrationAlert } from './alerts/local-migration-alert'
import { TailwindIndicator } from './tailwind-indicator'
import { Toaster } from './ui/sonner'

// prevent hydration errors
const NextThemesProvider = dynamic(
  async () => import('next-themes').then(e => e.ThemeProvider),
  {
    ssr: false,
  },
)

const queryClient = makeQueryClient()

function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <NextThemesProvider
        disableTransitionOnChange
        attribute="class"
        defaultTheme="system"
        enableSystem
        {...props}>
        <NuqsAdapter>{children}</NuqsAdapter>
        <Toaster position="top-center" richColors />
        <LocalMigrationAlert />
        <TailwindIndicator />
        <ReactQueryDevtools />
      </NextThemesProvider>
    </QueryClientProvider>
  )
}

export { Providers }
