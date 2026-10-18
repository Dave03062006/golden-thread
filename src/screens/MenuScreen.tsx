import { useState } from 'react'
import { downloadBackup } from '../app/backup'
import { useApp } from '../app/store'
import { remindLater, shouldRemindBackup } from '../engine/save/backup'
import { Button, Panel } from '../ui/components'
import { formatPlayTime } from '../ui/format'
import { Whereabouts } from './places'
import './screens.css'

export function MenuScreen() {
  const save = useApp((s) => s.save)
  const go = useApp((s) => s.go)
  const openSettings = useApp((s) => s.openSettings)
  const openScreen = useApp((s) => s.openScreen)
  const closeSave = useApp((s) => s.closeSave)
  const changeSave = useApp((s) => s.changeSave)
  const commit = useApp((s) => s.commit)
  // Decided once as the menu opens, so the reminder doesn't vanish while being read.
  const [remind] = useState(() => !!save && shouldRemindBackup(save, new Date()))
  const [reminded, setReminded] = useState<'saved' | 'later' | null>(null)
  if (!save) return null

  const backUp = () => {
    changeSave({ lastBackupAt: downloadBackup(save) })
    void commit()
    setReminded('saved')
  }
  const notNow = () => {
    changeSave({ backupReminderAfter: remindLater(new Date()) })
    void commit()
    setReminded('later')
  }

  return (
    <main className="screen screen-menu">
      <Panel className="menu-panel">
        <p className="title-kicker">Golden Thread</p>
        <h1 className="menu-name">{save.name}</h1>
        <p className="menu-where">
          <Whereabouts position={save.position} /> · {formatPlayTime(save.playSeconds)}
        </p>
        <nav className="menu-list" aria-label="Main menu">
          <Button variant="primary" onClick={() => go('story')}>
            {save.position ? 'Continue' : 'Begin'}
          </Button>
          <Button onClick={() => go('quiz-menu')}>Quiz</Button>
          <Button onClick={() => openScreen('journal')}>Journal</Button>
          <Button onClick={() => go('cathedral')}>Cathedral</Button>
          <Button onClick={() => go('map')}>World Map</Button>
          <Button onClick={() => openScreen('music')}>Music</Button>
          <Button onClick={openSettings}>Settings</Button>
          <Button onClick={() => openScreen('credits')}>Credits</Button>
          <Button variant="quiet" onClick={closeSave}>
            Back to title
          </Button>
        </nav>
        {remind && (
          <section className="menu-backup" aria-label="Backup">
            {reminded === null && (
              <>
                <p>
                  Your journey is kept only in this browser, which can clear what it stores. A backup file keeps it safe, and lets you carry on on another device.
                </p>
                <div className="menu-backup-actions">
                  <Button onClick={backUp}>Export a backup</Button>
                  <Button variant="quiet" onClick={notNow}>
                    Not now
                  </Button>
                </div>
              </>
            )}
            {/* Always there, so screen readers hear the message when it appears. */}
            <output aria-live="polite">{reminded === 'saved' ? 'Backup saved to your downloads. Keep it somewhere safe.' : reminded === 'later' ? 'You’ll be reminded again in a week.' : ''}</output>
          </section>
        )}
      </Panel>
    </main>
  )
}
