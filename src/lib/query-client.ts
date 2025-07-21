import { defaultShouldDehydrateQuery, QueryClient } from '@tanstack/react-query'
import type {
  PersistedClient,
  Persister,
} from '@tanstack/react-query-persist-client'
import { del, get, set } from 'idb-keyval'
import { toast } from 'sonner'

export function idbPersister(idbValidKey: IDBValidKey = 'reactQuery') {
  return {
    persistClient: async (client: PersistedClient) => {
      await set(idbValidKey, client)
    },
    removeClient: async () => {
      await del(idbValidKey)
    },
    restoreClient: async () => {
      return await get<PersistedClient>(idbValidKey)
    },
  } satisfies Persister
}

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
