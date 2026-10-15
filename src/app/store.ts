import { create } from 'zustand'
import { createSaveSystem, type SaveSystem } from '../engine/save/saves'
import { indexedDbStore, memoryStore } from '../engine/save/storage'
import { newSave, type Position, type SaveData, type SlotIndex } from '../engine/save/types'
import { launch } from './params'

/** Where saves are kept: the browser's database, or memory only during scripted tests. */
export const saves: SaveSystem = createSaveSystem(
  launch.test || typeof indexedDB === 'undefined' ? memoryStore() : indexedDbStore('golden-thread', 'saves'),
)

export type Screen = 'title' | 'menu' | 'settings' | 'scene'

interface AppState {
  screen: Screen
  /** Where to go back to when leaving Settings. */
  returnTo: Screen
  slot: SlotIndex | null
  save: SaveData | null
  /** Seconds played since the save was last written. */
  unsavedSeconds: number

  go(screen: Screen): void
  openSettings(): void
  openSave(slot: SlotIndex, save: SaveData): void
  closeSave(): Promise<void>
  /** Changes the open save in memory. Call `commit` to write it. */
  changeSave(changes: Partial<SaveData>): void
  addPlayTime(seconds: number): void
  /** Records a checkpoint: where the player is, written to the save immediately. */
  checkpoint(position: Position): Promise<void>
  /** Writes the open save to its slot. */
  commit(): Promise<void>
}

export const useApp = create<AppState>()((set, get) => ({
  screen: 'title',
  returnTo: 'title',
  slot: null,
  save: null,
  unsavedSeconds: 0,

  go: (screen) => set({ screen }),

  openSettings: () => set((state) => ({ screen: 'settings', returnTo: state.screen === 'settings' ? state.returnTo : state.screen })),

  openSave: (slot, save) => set({ slot, save, screen: 'menu', unsavedSeconds: 0 }),

  closeSave: async () => {
    await get().commit()
    set({ slot: null, save: null, screen: 'title' })
  },

  changeSave: (changes) =>
    set((state) => (state.save ? { save: { ...state.save, ...changes } } : {})),

  addPlayTime: (seconds) => set((state) => ({ unsavedSeconds: state.unsavedSeconds + seconds })),

  checkpoint: async (position) => {
    get().changeSave({ position })
    await get().commit()
  },

  commit: async () => {
    const { slot, save, unsavedSeconds } = get()
    if (slot === null || !save) return
    const updated: SaveData = {
      ...save,
      playSeconds: save.playSeconds + unsavedSeconds,
      lastPlayedAt: new Date().toISOString(),
    }
    set({ save: updated, unsavedSeconds: 0 })
    await saves.write(slot, updated)
  },
}))

/** For scripted tests: open a throwaway save straight away. */
export function openTestSave(style: SaveData['style'], screen: Screen) {
  const save = newSave('Test pilgrim', style, new Date().toISOString())
  useApp.setState({ slot: 0, save, screen, returnTo: 'menu', unsavedSeconds: 0 })
}
