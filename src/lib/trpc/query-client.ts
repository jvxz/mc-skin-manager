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
        onError: error => {
          toast.error(error.message)
        },
      },
      queries: {
        staleTime: 30 * 1000,
      },
    },
  })
}
