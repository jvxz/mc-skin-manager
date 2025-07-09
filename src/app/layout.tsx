import { Providers } from '@/components/providers'
import './globals.css'
import type { Metadata } from 'next'
import { meta } from '@/lib/config'
import { mono, sans } from '@/lib/font'

export const metadata: Metadata = meta

export default function RootLayout({
  children,
  navbar,
}: Readonly<{
  children: React.ReactNode
  navbar: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      {process.env.NODE_ENV === 'development' && (
        <head>
          <script
            crossOrigin="anonymous"
            src="//unpkg.com/react-scan/dist/auto.global.js"
            async
          />
        </head>
      )}
      <body className="antialiased">
        <Providers>
          <div className="flex flex-col">
            {navbar}
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
