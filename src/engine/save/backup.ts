import type { SaveData } from './types'

/**
 * When to remind the player to export a backup (spec §4, "Keeping data"). Browsers can
 * clear what a site stores, and a save lives only on this device, so now and then the
 * menu suggests downloading a copy. It never nags: only once there's progress worth
 * keeping, at most every two weeks, and "Not now" quiets it for a week.
 */

const DAY_MS = 24 * 60 * 60 * 1000
/** How long a backup counts as recent. */
export const BACKUP_FRESH_DAYS = 14
/** How long "Not now" quiets the reminder. */
export const REMIND_LATER_DAYS = 7

export function shouldRemindBackup(save: Pick<SaveData, 'completedEpisodes' | 'lastBackupAt' | 'backupReminderAfter'>, now: Date): boolean {
  if (save.completedEpisodes.length === 0) return false
  if (save.backupReminderAfter && now.getTime() < Date.parse(save.backupReminderAfter)) return false
  if (!save.lastBackupAt) return true
  return now.getTime() - Date.parse(save.lastBackupAt) >= BACKUP_FRESH_DAYS * DAY_MS
}

/** The time a "Not now" quiets the reminder until. */
export function remindLater(now: Date): string {
  return new Date(now.getTime() + REMIND_LATER_DAYS * DAY_MS).toISOString()
}
