import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useApp } from '../app/store'
import { dayLight, nave } from '../cathedral/model'
import { LEVELS } from '../content/catalog'
import { Button, Panel } from '../ui/components'
import { NaveView } from './cathedral/NaveView'
import './quiz/quiz.css'
import './screens.css'

/** In the ceremony the window is to watch; its panels open nothing yet. */
const nothing = () => {}

/**
 * The window ceremony at the end of a level (spec §3.3): the level's window in the
 * cathedral, its panels set one by one (their glass drifting in, the lead drawing itself,
 * light flooding through), until the window is complete.
 */
export function CeremonyScreen() {
  const save = useApp((s) => s.save)
  const levelEnd = useApp((s) => s.levelEnd)
  const go = useApp((s) => s.go)
  const level = LEVELS.find((l) => l.id === levelEnd) ?? LEVELS[0]!
  const heading = useRef<HTMLHeadingElement>(null)
  const [complete, setComplete] = useState(false)
  const [light] = useState(() => dayLight(new Date()))
  // Just this level's bay, filling the screen.
  const bays = useMemo(() => (save ? nave(save).filter((b) => b.windows.some((w) => w.level?.id === level.id)) : []), [save, level])

  const actions = useRef<HTMLDivElement>(null)
  const allSet = useCallback(() => setComplete(true), [])

  useEffect(() => heading.current?.focus(), [])
  // Once the window is complete, the way on takes the focus (and comes into view on small screens).
  useEffect(() => {
    if (complete) actions.current?.querySelector('button')?.focus()
  }, [complete])

  if (!save) return null
  const threads = level.episodes.filter((e) => save.threadsFound.includes(e.thread.id)).length

  return (
    <main className="screen screen-ceremony" data-light={light}>
      <Panel className="ceremony-panel">
        <p className="quiz-title">Level {level.number} complete</p>
        <h1 ref={heading} tabIndex={-1}>
          {level.title}
        </h1>
        <NaveView bays={bays} label={`The window of Level ${level.number}`} onChoose={nothing} onAllSet={allSet} />
        <p aria-live="polite">{complete ? 'Its window in the cathedral is complete.' : 'Its window in the cathedral is being set…'}</p>
        <p>
          You found {threads} of {level.episodes.length} golden threads in this level.
        </p>
        <div className="quiz-actions" ref={actions}>
          <Button variant="primary" onClick={() => go('cathedral')} disabled={!complete}>
            Visit the cathedral
          </Button>
          <Button onClick={() => go('menu')}>Back to the menu</Button>
        </div>
      </Panel>
    </main>
  )
}
