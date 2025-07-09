'use client'
import {
  defaultShouldDehydrateQuery,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import type { ThemeProviderProps } from 'next-themes'
import { Toaster } from './ui/sonner'

const queryClient = new QueryClient({
  defaultOptions: {
    dehydrate: {
      shouldDehydrateQuery: query =>
        defaultShouldDehydrateQuery(query) || query.state.status === 'pending',
    },
    queries: {
      staleTime: 30 * 1000,
    },
  },
})

// prevent hydration errors
const NextThemesProvider = dynamic(
  async () => import('next-themes').then(e => e.ThemeProvider),
  {
    ssr: false,
  },
)

function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        {...props}>
        {children}
        <Toaster />
      </NextThemesProvider>
    </QueryClientProvider>
  )
}

export { Providers }
