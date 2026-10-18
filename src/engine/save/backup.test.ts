import { describe, expect, it } from 'vitest'
import { remindLater, shouldRemindBackup } from './backup'

const now = new Date('2026-10-18T12:00:00Z')
const daysAgo = (n: number) => new Date(now.getTime() - n * 86_400_000).toISOString()
const save = (changes = {}) => ({ completedEpisodes: ['l01-e1'], lastBackupAt: null, backupReminderAfter: null, ...changes })

describe('the backup reminder', () => {
  it('waits until there is progress worth keeping', () => {
    expect(shouldRemindBackup(save({ completedEpisodes: [] }), now)).toBe(false)
    expect(shouldRemindBackup(save(), now)).toBe(true)
  })

  it('stays quiet for two weeks after a backup', () => {
    expect(shouldRemindBackup(save({ lastBackupAt: daysAgo(3) }), now)).toBe(false)
    expect(shouldRemindBackup(save({ lastBackupAt: daysAgo(15) }), now)).toBe(true)
  })

  it('stays quiet for a week after "Not now"', () => {
    const later = remindLater(now)
    expect(shouldRemindBackup(save({ backupReminderAfter: later }), now)).toBe(false)
    expect(shouldRemindBackup(save({ backupReminderAfter: later }), new Date(Date.parse(later) + 1000))).toBe(true)
  })
})
