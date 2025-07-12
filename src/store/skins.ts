import { create } from 'zustand'
import type { Skin } from '@/lib/types'

type State = {
  skins: Skin[]
}

type Actions = {
  addSkin: (skin: Skin) => void
  removeSkin: (id: string) => void
  updateSkin: (id: string, skin: Skin) => void
  setSkins: (skins: Skin[]) => void
}

const initialState: State = {
  skins: [],
}

const useLocalSkinList = create<State & Actions>(set => ({
  ...initialState,
  addSkin: skin => set(state => ({ skins: [...state.skins, skin] })),
  removeSkin: id =>
    set(state => ({ skins: state.skins.filter(skin => skin.id !== id) })),
  setSkins: skins => set({ skins }),
  updateSkin: (id, skin) =>
    set(state => ({ skins: state.skins.map(s => (s.id === id ? skin : s)) })),
}))
export { useLocalSkinList }
