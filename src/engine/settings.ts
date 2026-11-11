import { create } from 'zustand'
import { createJSONStorage, persist, type StateStorage } from 'zustand/middleware'
import type { StyleId } from '../styles/ids'

/**
 * Settings that belong to this device rather than to a save file (spec §4): comfort
 * options and volumes. The art style itself lives in each save; `lastStyle` only
 * decides how the title screen looks before a save is chosen.
 */
export interface DeviceSettings {
  textSize: 'normal' | 'large' | 'larger'
  highContrast: boolean
  readableFont: boolean
  /** 'system' follows the device's own "reduce motion" setting. */
  reducedMotion: 'system' | 'on' | 'off'
  gentleMode: boolean
  autoAdvance: boolean
  readAloud: boolean
  musicVolume: number
  soundVolume: number
  voiceVolume: number
  /** The read-aloud voice the player chose, by name; none means the best one the device has (engine/voice.ts). */
  voiceName: string | null
  lastStyle: StyleId
  /** Sacred music (free, built in), the player's worship songs, or no music (spec §11.2). */
  musicMode: 'sacred' | 'worship' | 'off'
  /** For worship songs: play the player's own files, or listen along in their music app (spec §11.4). */
  worshipWay: 'files' | 'listen-along' | null
  /** The music app for listening along. */
  musicApp: MusicApp | null
  /** Worship songs in menus, minigames, the quiz and reflection; free instrumental music under the story. */
  keepStoryInstrumental: boolean
}

export type MusicApp = 'spotify' | 'apple-music' | 'youtube-music' | 'youtube'

export const DEFAULT_SETTINGS: DeviceSettings = {
  textSize: 'normal',
  highContrast: false,
  readableFont: false,
  reducedMotion: 'system',
  gentleMode: false,
  autoAdvance: false,
  readAloud: false,
  musicVolume: 0.8,
  soundVolume: 0.8,
  voiceVolume: 1,
  voiceName: null,
  lastStyle: 'paper-glass',
  musicMode: 'sacred',
  worshipWay: null,
  musicApp: null,
  keepStoryInstrumental: true,
}

interface SettingsStore extends DeviceSettings {
  update(changes: Partial<DeviceSettings>): void
  reset(): void
}

/** localStorage can be missing or blocked (private windows). Settings then simply aren't kept. */
const safeLocalStorage: StateStorage = {
  getItem: (name) => {
    try {
      return localStorage.getItem(name)
    } catch {
      return null
    }
  },
  setItem: (name, value) => {
    try {
      localStorage.setItem(name, value)
    } catch {
      // Not saved, but the game keeps working.
    }
  },
  removeItem: (name) => {
    try {
      localStorage.removeItem(name)
    } catch {
      // Nothing to do.
    }
  },
}

export const useSettings = create<SettingsStore>()(
  persist(
    (set) => ({
      ...DEFAULT_SETTINGS,
      update: (changes) => set(changes),
      reset: () => set(DEFAULT_SETTINGS),
    }),
    {
      name: 'golden-thread-settings',
      version: 1,
      storage: createJSONStorage(() => safeLocalStorage),
      partialize: ({ update: _update, reset: _reset, ...settings }) => settings,
    },
  ),
)

/** Whether motion should be reduced, combining the setting with the device preference. */
export function prefersReducedMotion(setting: DeviceSettings['reducedMotion'], deviceWantsLess: boolean): boolean {
  if (setting === 'on') return true
  if (setting === 'off') return false
  return deviceWantsLess
}
