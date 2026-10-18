import type { SaveData } from '../engine/save/types'
import { downloadText } from '../ui/format'
import { saves } from './store'

/** Downloads a save as a backup file, named after the player. Returns the time it was made. */
export function downloadBackup(data: SaveData, now = new Date()): string {
  const at = now.toISOString()
  const safeName = data.name.replace(/[^\w-]+/g, '-').toLowerCase() || 'save'
  downloadText(`golden-thread-${safeName}.json`, saves.exportText({ ...data, lastBackupAt: at }, at))
  return at
}
