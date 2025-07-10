import { create } from 'zustand'
import type { Skin } from '@/lib/types'

type State = {
  skin: Skin | null
}

type Actions = {
  setSkin: (skin: Skin) => void
}

const initialState: State = {
  skin: null,
}

const useActiveSkin = create<State & Actions>(set => ({
  ...initialState,
  setSkin: skin => set({ skin }),
}))
export { useActiveSkin }
