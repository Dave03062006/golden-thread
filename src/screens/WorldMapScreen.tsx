import { useState } from 'react'
import { useApp } from '../app/store'
import { formatReference } from '../content/bible/books'
import { LEVELS } from '../content/catalog'
import { OUTLINE } from '../content/outline'
import { mapThreads, type LevelMarker } from '../map/core/features'
import { finishedLevels } from '../quiz/scopes'
import { Button, Dialog, Panel } from '../ui/components'
import { WorldMapView } from './map/WorldMapView'
import './cathedral/cathedral.css'
import './quiz/quiz.css'
import './screens.css'

/**
 * The world map (spec §9.1, §9.2): where the story has gone, region by region. Each
 * level's region is a marker; choosing it lists its episodes to play again and, once the
 * level is finished, its quiz. The Ages run along the foot, the current one marked.
 */
export function WorldMapScreen() {
  const save = useApp((s) => s.save)
  const go = useApp((s) => s.go)
  const openQuiz = useApp((s) => s.openQuiz)
  const startReplay = useApp((s) => s.startReplay)
  const [chosen, setChosen] = useState<LevelMarker | null>(null)
  if (!save) return null

  const finished = finishedLevels(save)
  const level = chosen ? LEVELS.find((l) => l.id === chosen.id) : undefined
  const threads = level ? mapThreads(save).filter((t) => level.episodes.some((e) => e.thread.id === t.id)) : []
  // The Age the player is in: the first with a level still to finish.
  const current = OUTLINE.find((age) => age.levels.some((l) => !LEVELS.some((built) => built.number === l.number && finished.includes(built))))?.numeral ?? 'I'

  return (
    <main className="screen screen-map">
      <Panel className="map-panel">
        <div className="cathedral-head">
          <h1>The World Map</h1>
          <div className="quiz-actions">
            <Button onClick={() => go('cathedral')}>Cathedral</Button>
            <Button variant="quiet" onClick={() => go('menu')}>
              Back
            </Button>
          </div>
        </div>
        <WorldMapView onChoose={setChosen} />
        <ol className="map-ages" aria-label="The Ages">
          {OUTLINE.map((age) => (
            <li key={age.numeral} aria-current={age.numeral === current}>
              {age.numeral}
              {age.numeral === current && <span>{age.title}</span>}
            </li>
          ))}
        </ol>
      </Panel>

      <Dialog open={!!chosen} title={chosen ? `Level ${chosen.number} · ${chosen.title}` : ''} onClose={() => setChosen(null)}>
        {chosen && level && (
          <div className="cathedral-detail">
            <p className="ui-note">The region of {chosen.label}</p>
            <ul className="map-episodes">
              {level.episodes.map((e) => {
                const played = save.completedEpisodes.includes(e.id)
                return (
                  <li key={e.id}>
                    <span>
                      {e.number}. {e.title} <span className="ui-note">({formatReference(e.passage)})</span>
                    </span>
                    {played ? (
                      <Button aria-label={`Play ${e.title} again`} onClick={() => startReplay(e.id, 'map')}>
                        Play again
                      </Button>
                    ) : (
                      <span className="ui-note">Not played yet</span>
                    )}
                  </li>
                )
              })}
            </ul>
            {threads.length > 0 && (
              <p>
                <strong>Golden threads from here:</strong> {threads.map((t) => `${t.title} (to ${t.toName})`).join('; ')}
              </p>
            )}
            <div className="quiz-actions">
              {finished.includes(level) && (
                <Button variant="primary" onClick={() => openQuiz(level.id)}>
                  Take the quiz
                </Button>
              )}
              <Button onClick={() => setChosen(null)}>Close</Button>
            </div>
          </div>
        )}
      </Dialog>
    </main>
  )
}
