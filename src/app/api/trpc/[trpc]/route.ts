import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter } from '@/lib/trpc/server'

function handler(req: Request) {
  return fetchRequestHandler({
    createContext: () => {
      return {}
    },
    endpoint: '/api/trpc',
    req,
    router: appRouter,
  })
}

export { handler as GET, handler as POST }
