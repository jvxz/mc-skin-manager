import { ViewTransitions } from 'next-view-transitions'
import { Providers } from '@/components/providers'

import './globals.css'
import type { Metadata } from 'next'
import { meta } from '@/lib/config'
import { mono, sans } from '@/lib/font'

export const metadata: Metadata = meta

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ViewTransitions>
      <html
        lang="en"
        className={`${sans.variable} ${mono.variable} overflow-y-hidden`}>
        {process.env.NODE_ENV === 'development' && (
          <head>
            <script
              crossOrigin="anonymous"
              src="//unpkg.com/react-scan/dist/auto.global.js"
              async
            />
          </head>
        )}
        <body className="h-screen antialiased">
          <Providers>{children}</Providers>
        </body>
      </html>
    </ViewTransitions>
  )
}
