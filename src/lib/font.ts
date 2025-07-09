import { Geist_Mono, Inter } from 'next/font/google'

export const sans = Inter({
  subsets: ['latin'],
  variable: '--next-sans',
})

export const mono = Geist_Mono({
  subsets: ['latin'],
  variable: '--next-mono',
})
