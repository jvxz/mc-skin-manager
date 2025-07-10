import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { z } from 'zod/v4'
import type { SkinTypeAsText } from './types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getSkinTextType(input: string): SkinTypeAsText {
  if (z.uuid().safeParse(input).success) return 'uuid'
  if (z.url().safeParse(input).success) return 'url'
  return 'username'
}
