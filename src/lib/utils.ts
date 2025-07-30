import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { twMerge } from 'tailwind-merge'
import { z } from 'zod'

dayjs.extend(relativeTime)

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function timeAgo(date: Date) {
  return dayjs(date).fromNow()
}

export function formatDate(date: Date) {
  return dayjs(date).format('MMM D, YYYY')
}

type NameMCResult =
  | {
      type: 'skin'
      url: string
    }
  | {
      type: 'user'
      username: string
    }
  | false

export function validateNameMC(link: string | File): NameMCResult {
  const isNameMC = z
    .url({
      hostname: /^namemc\.com$/,
    })
    .safeParse(link)

  if (!isNameMC.success) {
    return false
  }

  const url = new URL(isNameMC.data)

  if (url.pathname === '/') {
    return false
  }

  if (url.pathname.startsWith('/skin/')) {
    const skinId = url.pathname.split('/').pop()
    const skinUrl = `https://s.namemc.com/i/${skinId}.png`

    return {
      type: 'skin' as const,
      url: skinUrl,
    }
  }

  if (url.pathname.startsWith('/profile/')) {
    const username = url.pathname.split('/')[2].split('.')[0]

    return {
      type: 'user' as const,
      username,
    }
  }

  return false
}

export function formatSkinType(skinType: 'SLIM' | 'CLASSIC') {
  return (
    skinType.charAt(0).toUpperCase() + skinType.slice(1).toLocaleLowerCase()
  )
}
