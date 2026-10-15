import { checksumOf } from './checksum'
import { upgradeSave } from './migrations'
import type { KeyValueStore } from './storage'
import { SLOTS, SaveError, type SaveData, type SaveEnvelope, type SlotIndex } from './types'

/** What a save slot holds right now. */
export type SlotState =
  | { slot: SlotIndex; state: 'empty' }
  | { slot: SlotIndex; state: 'ok'; data: SaveData; restoredFromBackup: boolean }
  | { slot: SlotIndex; state: 'damaged' }

/** The tag inside an exported save file, so we can recognize one when it's imported. */
export const EXPORT_FORMAT = 'golden-thread-save'

const mainKey = (slot: SlotIndex) => `slot-${slot}`
const backupKey = (slot: SlotIndex) => `slot-${slot}-backup`

function seal(data: SaveData): SaveEnvelope {
  return { data, checksum: checksumOf(data) }
}

/** Returns the save inside an envelope if it's intact and readable, otherwise null. */
function open(envelope: unknown): SaveData | null {
  if (typeof envelope !== 'object' || envelope === null) return null
  const { data, checksum } = envelope as Partial<SaveEnvelope>
  if (!data || checksum !== checksumOf(data)) return null
  try {
    return upgradeSave(data)
  } catch {
    return null
  }
}

export interface SaveSystem {
  listSlots(): Promise<SlotState[]>
  load(slot: SlotIndex): Promise<SlotState>
  /** Writes a save, keeping the previous one as a backup. */
  write(slot: SlotIndex, data: SaveData): Promise<void>
  remove(slot: SlotIndex): Promise<void>
  /** The text of a save file the player can download. */
  exportText(data: SaveData, nowIso: string): string
  /** Reads a save file the player chose, checks it, and stores it in a slot. */
  importText(text: string, slot: SlotIndex): Promise<SaveData>
}

export function createSaveSystem(store: KeyValueStore): SaveSystem {
  const system: SaveSystem = {
    async listSlots() {
      return Promise.all(SLOTS.map((slot) => system.load(slot)))
    },

    async load(slot) {
      const main = await store.get<SaveEnvelope>(mainKey(slot))
      const fromMain = open(main)
      if (fromMain) return { slot, state: 'ok', data: fromMain, restoredFromBackup: false }

      const backup = await store.get<SaveEnvelope>(backupKey(slot))
      const fromBackup = open(backup)
      if (fromBackup) {
        // The main copy was damaged. Put the good backup back in its place.
        await store.set(mainKey(slot), seal(fromBackup))
        return { slot, state: 'ok', data: fromBackup, restoredFromBackup: true }
      }

      return main === undefined && backup === undefined ? { slot, state: 'empty' } : { slot, state: 'damaged' }
    },

    async write(slot, data) {
      const current = await store.get<SaveEnvelope>(mainKey(slot))
      if (open(current)) await store.set(backupKey(slot), current)
      await store.set(mainKey(slot), seal(data))
    },

    async remove(slot) {
      await store.del(mainKey(slot))
      await store.del(backupKey(slot))
    },

    exportText(data, nowIso) {
      return JSON.stringify({ format: EXPORT_FORMAT, exportedAt: nowIso, save: seal(data) }, null, 2)
    },

    async importText(text, slot) {
      let parsed: unknown
      try {
        parsed = JSON.parse(text)
      } catch {
        throw new SaveError('not-a-save', 'This file is not a Golden Thread save.')
      }
      const file = parsed as { format?: unknown; save?: SaveEnvelope }
      if (file?.format !== EXPORT_FORMAT || !file.save) {
        throw new SaveError('not-a-save', 'This file is not a Golden Thread save.')
      }
      if (file.save.checksum !== checksumOf(file.save.data)) {
        throw new SaveError('damaged', 'This save file is damaged or was changed by hand.')
      }
      const data = upgradeSave(file.save.data)
      await system.write(slot, data)
      return data
    },
  }
  return system
}
