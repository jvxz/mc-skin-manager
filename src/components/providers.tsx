'use client'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import dynamic from 'next/dynamic'
import type { ThemeProviderProps } from 'next-themes'
import { NuqsAdapter } from 'nuqs/adapters/next'
import { idbPersister, makeQueryClient } from '@/lib/query-client'
import { LocalMigrationAlert } from './alerts/local-migration-alert'
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
    <PersistQueryClientProvider
      persistOptions={{ persister: idbPersister() }}
      client={queryClient}>
      <NextThemesProvider
        disableTransitionOnChange
        attribute="class"
        defaultTheme="system"
        enableSystem
        {...props}>
        <NuqsAdapter>{children}</NuqsAdapter>
        <Toaster />
        <LocalMigrationAlert />
        <ReactQueryDevtools />
      </NextThemesProvider>
    </PersistQueryClientProvider>
  )
}

export { Providers }
