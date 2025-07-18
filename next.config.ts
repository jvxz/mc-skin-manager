import type { NextConfig } from 'next'
import '@/env'

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    devtoolNewPanelUI: true,
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
