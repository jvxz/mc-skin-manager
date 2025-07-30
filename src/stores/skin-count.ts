import { atomWithStorage } from 'jotai/utils'

export const persistedSkinCountAtom = atomWithStorage<number>('skin-count', 0)
