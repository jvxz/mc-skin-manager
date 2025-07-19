import { atomWithStorage } from 'jotai/utils'
import type { Skin } from '@/db/schema'

export const localSkinsAtom = atomWithStorage<Skin[]>('local-skins', [])
