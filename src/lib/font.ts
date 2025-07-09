import { IBM_Plex_Mono, Inter } from 'next/font/google'

export const sans = Inter({
  subsets: ['latin'],
  variable: '--next-sans',
})

export const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--next-mono',
  weight: ['100', '200', '300', '400', '500', '600', '700'],
})
