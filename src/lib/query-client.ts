import { defaultShouldDehydrateQuery, QueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      dehydrate: {
        shouldDehydrateQuery: query =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === 'pending',
      },
      mutations: {
        onError: handleQueryError,
      },
      queries: {
        staleTime: 30 * 1000,
      },
    },
  })
}

export function handleQueryError(error: Error) {
  toast.error(error.message)
}
