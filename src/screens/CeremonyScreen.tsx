import { useEffect, useRef } from 'react'
import { useApp } from '../app/store'
import { LEVELS } from '../content/catalog'
import { Button, Panel } from '../ui/components'
import './quiz/quiz.css'
import './screens.css'

/**
 * The window ceremony at the end of a level (spec §3.3), for now a quiet stand-in: the
 * level is complete, and its cathedral window and map region arrive with the cathedral and
 * the world map in milestone 6.
 */
export function CeremonyScreen() {
  const save = useApp((s) => s.save)
  const levelEnd = useApp((s) => s.levelEnd)
  const go = useApp((s) => s.go)
  const level = LEVELS.find((l) => l.id === levelEnd) ?? LEVELS[0]!
  const heading = useRef<HTMLHeadingElement>(null)

  useEffect(() => heading.current?.focus(), [])

  if (!save) return null
  const threads = level.episodes.filter((e) => save.threadsFound.includes(e.thread.id)).length

  return (
    <main className="screen screen-ceremony">
      <Panel className="ceremony-panel">
        <p className="quiz-title">Level {level.number} complete</p>
        <h1 ref={heading} tabIndex={-1}>
          {level.title}
        </h1>
        <div className="ceremony-window" aria-hidden="true" />
        <p>
          You found {threads} of {level.episodes.length} golden threads in this level.
        </p>
        <p className="ui-note">Its window in the cathedral, and its place on the world map, are coming in the next part of the build.</p>
        <div className="quiz-actions">
          <Button variant="primary" onClick={() => go('menu')}>
            Back to the menu
          </Button>
        </div>
      </Panel>
    </main>
  )
}
