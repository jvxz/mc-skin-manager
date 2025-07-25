import { Ratelimit } from '@upstash/ratelimit' // for deno: see above
import { Redis } from '@upstash/redis' // see below for cloudflare and fastly adapters

// Create a new ratelimiter, that allows 10 requests per 10 seconds
export const ratelimit = new Ratelimit({
  analytics: true,
  limiter: Ratelimit.slidingWindow(10, '10 s'),
  /**
   * Optional prefix for the keys used in redis. This is useful if you want to share a redis
   * instance with other applications and want to avoid key collisions. The default prefix is
   * "@upstash/ratelimit"
   */
  prefix: '@upstash/ratelimit',
  redis: Redis.fromEnv({}),
})

// Use a constant string to limit all requests with a single ratelimit
// Or use a userID, apiKey or ip address for individual limits.
// const identifier = 'api'
// const { success } = await ratelimit.limit(identifier)

// if (!success) {
//   return "Unable to process at this time";
// }
// doExpensiveCalculation()
// return "Here you go!";
