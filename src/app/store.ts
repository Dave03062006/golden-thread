import { create } from 'zustand'
import { createSaveSystem, type SaveSystem } from '../engine/save/saves'
import { indexedDbStore, memoryStore } from '../engine/save/storage'
import { newSave, type Position, type SaveData, type SlotIndex } from '../engine/save/types'
import { launch } from './params'

/** Where saves are kept: the browser's database, or memory only during scripted tests. */
export const saves: SaveSystem = createSaveSystem(
  launch.test || typeof indexedDB === 'undefined' ? memoryStore() : indexedDbStore('golden-thread', 'saves'),
)

export type Screen = 'title' | 'menu' | 'settings' | 'scene' | 'story' | 'music' | 'credits' | 'quiz-menu' | 'quiz' | 'reflection' | 'journal' | 'ceremony'

interface AppState {
  screen: Screen
  /** Where to go back to when leaving Settings. */
  returnTo: Screen
  slot: SlotIndex | null
  save: SaveData | null
  /** Seconds played since the save was last written. */
  unsavedSeconds: number
  /** The quiz being taken: a level's id, an Age's ("age:I"), or "all" (see quiz/scopes.ts). */
  quizScope: string | null
  /**
   * At the end of a level (spec §3.3), the level whose quiz, reflection and window ceremony
   * come in turn. Null when the quiz is taken from the menu.
   */
  levelEnd: string | null
  /** A level's reflection opened again from the journal, outside a level's end. */
  reflectionLevel: string | null

  go(screen: Screen): void
  openSettings(): void
  /** Opens a screen that has a Back button, remembering where to go back to. */
  openScreen(screen: Screen): void
  openSave(slot: SlotIndex, save: SaveData): void
  closeSave(): Promise<void>
  /** Changes the open save in memory. Call `commit` to write it. */
  changeSave(changes: Partial<SaveData>): void
  addPlayTime(seconds: number): void
  /** Records a checkpoint: where the player is, written to the save immediately. */
  checkpoint(position: Position): Promise<void>
  /** Writes the open save to its slot. */
  commit(): Promise<void>
  /** Opens a quiz from the menu. */
  openQuiz(scope: string): void
  /** The last episode of a level is done: its quiz, then reflection, then the ceremony. */
  startLevelEnd(level: string): void
  /** Opens a level's reflection again, to write more (from the journal). */
  openReflection(level: string): void
}

export const useApp = create<AppState>()((set, get) => ({
  screen: 'title',
  returnTo: 'title',
  slot: null,
  save: null,
  unsavedSeconds: 0,
  quizScope: null,
  levelEnd: null,
  reflectionLevel: null,

  go: (screen) => set({ screen }),

  openReflection: (level) => set({ screen: 'reflection', reflectionLevel: level, levelEnd: null }),

  openQuiz: (scope) => set({ screen: 'quiz', quizScope: scope, levelEnd: null }),

  startLevelEnd: (level) => {
    const save = get().save
    if (save && !save.completedLevels.includes(level)) get().changeSave({ completedLevels: [...save.completedLevels, level] })
    void get().commit()
    set({ screen: 'quiz', quizScope: level, levelEnd: level })
  },

  openSettings: () => set((state) => ({ screen: 'settings', returnTo: state.screen === 'settings' ? state.returnTo : state.screen })),

  openScreen: (screen) => set((state) => ({ screen, returnTo: state.screen === screen ? state.returnTo : state.screen })),

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

/**
 * For scripted tests: open a throwaway save straight away. The screens of a level's end
 * open as if Level 1 has just been finished.
 */
export function openTestSave(style: SaveData['style'], screen: Screen) {
  const save = newSave('Test pilgrim', style, new Date().toISOString())
  const levelEnd = ['quiz-menu', 'quiz', 'reflection', 'ceremony'].includes(screen)
  if (levelEnd) save.completedLevels = ['l01']
  useApp.setState({ slot: 0, save, screen, returnTo: 'menu', unsavedSeconds: 0, quizScope: levelEnd ? 'l01' : null, levelEnd: screen === 'quiz-menu' ? null : levelEnd ? 'l01' : null })
}
