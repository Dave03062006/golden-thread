import { useApp } from '../app/store'
import { Button, Panel } from '../ui/components'
import { formatPlayTime } from '../ui/format'
import { describePosition } from './places'
import './screens.css'

/** Things that arrive in later milestones, shown so the menu's shape is clear. */
const LATER = [
  { label: 'Cathedral', when: 'Milestone 6' },
  { label: 'World Map', when: 'Milestone 6' },
  { label: 'Quiz', when: 'Milestone 5' },
  { label: 'Journal', when: 'Milestone 5' },
]

export function MenuScreen() {
  const save = useApp((s) => s.save)
  const go = useApp((s) => s.go)
  const openSettings = useApp((s) => s.openSettings)
  const closeSave = useApp((s) => s.closeSave)
  if (!save) return null

  return (
    <main className="screen screen-menu">
      <Panel className="menu-panel">
        <p className="title-kicker">Golden Thread</p>
        <h1 className="menu-name">{save.name}</h1>
        <p className="menu-where">
          {describePosition(save.position)} · {formatPlayTime(save.playSeconds)}
        </p>
        <nav className="menu-list" aria-label="Main menu">
          <Button variant="primary" onClick={() => go('story')}>
            {save.position ? 'Continue' : 'Begin'}
          </Button>
          {LATER.map((item) => (
            <Button key={item.label} disabled aria-describedby="menu-later">
              {item.label}
            </Button>
          ))}
          <Button onClick={openSettings}>Settings</Button>
          <Button variant="quiet" onClick={closeSave}>
            Back to title
          </Button>
        </nav>
        <p id="menu-later" className="ui-note">
          Cathedral, World Map, Quiz and Journal arrive in later milestones.
        </p>
      </Panel>
    </main>
  )
}
