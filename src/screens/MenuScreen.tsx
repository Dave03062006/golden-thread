import { useApp } from '../app/store'
import { Button, Panel } from '../ui/components'
import { formatPlayTime } from '../ui/format'
import { describePosition } from './places'
import './screens.css'

/** Things that arrive in later milestones, shown so the menu's shape is clear. */
const LATER = [
  { label: 'Cathedral', when: 'Milestone 6' },
  { label: 'World Map', when: 'Milestone 6' },
]

export function MenuScreen() {
  const save = useApp((s) => s.save)
  const go = useApp((s) => s.go)
  const openSettings = useApp((s) => s.openSettings)
  const openScreen = useApp((s) => s.openScreen)
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
          <Button onClick={() => go('quiz-menu')}>Quiz</Button>
          <Button onClick={() => openScreen('journal')}>Journal</Button>
          {LATER.map((item) => (
            <Button key={item.label} disabled aria-describedby="menu-later">
              {item.label}
            </Button>
          ))}
          <Button onClick={() => openScreen('music')}>Music</Button>
          <Button onClick={openSettings}>Settings</Button>
          <Button onClick={() => openScreen('credits')}>Credits</Button>
          <Button variant="quiet" onClick={closeSave}>
            Back to title
          </Button>
        </nav>
        <p id="menu-later" className="ui-note">
          The Cathedral and the World Map arrive in the next milestone.
        </p>
      </Panel>
    </main>
  )
}
