import { useApp } from '../app/store'
import { Button, Panel } from '../ui/components'
import { formatPlayTime } from '../ui/format'
import { describePosition } from './places'
import './screens.css'

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
          <Button onClick={() => go('cathedral')}>Cathedral</Button>
          <Button onClick={() => go('map')}>World Map</Button>
          <Button onClick={() => openScreen('music')}>Music</Button>
          <Button onClick={openSettings}>Settings</Button>
          <Button onClick={() => openScreen('credits')}>Credits</Button>
          <Button variant="quiet" onClick={closeSave}>
            Back to title
          </Button>
        </nav>
      </Panel>
    </main>
  )
}
