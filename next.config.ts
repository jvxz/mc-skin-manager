import type { NextConfig } from 'next'
import '@/env'

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    reactCompiler: true,
  },
  logging: {
    fetches: {
      fullUrl: true,
      hmrRefreshes: false,
    },
    incomingRequests: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
