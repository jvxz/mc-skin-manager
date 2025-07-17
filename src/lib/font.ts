import { Inter } from 'next/font/google'
import localFont from 'next/font/local'

export const sans = Inter({
  subsets: ['latin'],
  variable: '--next-sans',
})

export const mono = localFont({
  src: [
    {
      path: './fonts/TwilioSansMono-Medium.woff2',
      style: 'normal',
      weight: '500',
    },
    {
      path: './fonts/TwilioSansMono-Regular.woff2',
      style: 'normal',
      weight: '400',
    },
    // {
    //   path: './fonts/Writer-Bold.ttf',
    //   style: 'bold',
    //   weight: '700',
    // },
  ],
  variable: '--next-mono',
})
