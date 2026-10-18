import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useApp } from '../app/store'
import { formatReference } from '../content/bible/books'
import { threadById } from '../content/threads'
import { dayLight, nave, type CathedralWindow, type DayLight, type Panel } from '../cathedral/model'
import { finishedLevels } from '../quiz/scopes'
import { Button, Dialog, Panel as Card } from '../ui/components'
import { NaveView, type NaveHandle } from './cathedral/NaveView'
import './screens.css'

const LIGHT_NAMES: Record<DayLight, string> = {
  dawn: 'Morning light through the glass',
  day: 'Full daylight through the glass',
  dusk: 'Evening glow through the glass',
  night: 'Night: candlelight and the last of the glow',
}

/**
 * The glass cathedral (spec §9.1, §9.2): the hub of the game. The nave's 14 bays hold a
 * window for every level, read bottom to top; finished episodes are set as lit panels,
 * golden threads glow across the nave, and the light follows the time of day. Choosing a
 * panel offers "Step inside", which replays its episode without changing progress.
 */
export function CathedralScreen() {
  const save = useApp((s) => s.save)
  const go = useApp((s) => s.go)
  const openQuiz = useApp((s) => s.openQuiz)
  const startReplay = useApp((s) => s.startReplay)
  const naveRef = useRef<NaveHandle>(null)
  const [light, setLight] = useState<DayLight>(() => dayLight(new Date()))
  const [chosen, setChosen] = useState<{ window: CathedralWindow; panel?: Panel } | null>(null)
  const [age, setAge] = useState('I')
  const bays = useMemo(() => (save ? nave(save) : []), [save])
  const choose = useCallback((window: CathedralWindow, panel?: Panel) => setChosen({ window, panel }), [])

  // The light changes as the day goes on.
  useEffect(() => {
    const timer = setInterval(() => setLight(dayLight(new Date())), 60_000)
    return () => clearInterval(timer)
  }, [])

  // Start at the Age the player is in (once: setting panels changes the save, not the view).
  const started = useRef(false)
  useEffect(() => {
    if (started.current || bays.length === 0) return
    started.current = true
    const current = bays.find((b) => b.windows.some((w) => w.level && !w.complete))?.numeral ?? 'I'
    setAge(current)
    requestAnimationFrame(() => naveRef.current?.showAge(current, false))
  }, [bays])

  if (!save) return null
  const finished = finishedLevels(save)

  const stepInside = (panel: Panel) => {
    setChosen(null)
    naveRef.current?.flyInto(panel.episode, () => startReplay(panel.episode, 'cathedral'))
  }

  const showAge = (numeral: string) => {
    setAge(numeral)
    naveRef.current?.showAge(numeral)
  }

  const panel = chosen?.panel
  const episode = panel ? chosen.window.level?.episodes.find((e) => e.id === panel.episode) : undefined
  const thread = episode && save.threadsFound.includes(episode.thread.id) ? threadById(episode.thread.id) : undefined

  return (
    <main className="screen screen-cathedral" data-light={light}>
      <Card className="cathedral-panel">
        <div className="cathedral-head">
          <h1>The Cathedral</h1>
          <p className="cathedral-light">{LIGHT_NAMES[light]}</p>
          <div className="quiz-actions">
            <Button onClick={() => go('map')}>World map</Button>
            <Button variant="quiet" onClick={() => go('menu')}>
              Back
            </Button>
          </div>
        </div>
        <NaveView ref={naveRef} label="The nave of the cathedral" onChoose={choose} />
        <nav className="cathedral-ages" aria-label="The Ages">
          {bays.map((b) => (
            <Button key={b.numeral} variant="quiet" aria-current={b.numeral === age} onClick={() => showAge(b.numeral)} title={b.title}>
              {b.numeral}
            </Button>
          ))}
        </nav>
      </Card>

      <Dialog open={!!chosen} title={chosen ? (panel ? `Episode ${chosen.window.panels.indexOf(panel) + 1} · ${panel.title}` : `Level ${chosen.window.number} · ${chosen.window.title}`) : ''} onClose={() => setChosen(null)}>
        {chosen && panel && episode && (
          <div className="cathedral-detail">
            <p className="ui-note">{formatReference(episode.passage)}</p>
            {panel.state === 'dark' ? (
              <p>This panel is set when you finish the episode.</p>
            ) : (
              <>
                {thread && (
                  <p>
                    <strong>Golden thread:</strong> {thread.title}
                  </p>
                )}
                <p className="ui-note">Step inside to play this episode again. It won’t change where you are in the story.</p>
              </>
            )}
            <div className="quiz-actions">
              {panel.state !== 'dark' && (
                <Button variant="primary" onClick={() => stepInside(panel)}>
                  Step inside
                </Button>
              )}
              <Button onClick={() => setChosen(null)}>Close</Button>
            </div>
          </div>
        )}
        {chosen && !panel && (
          <div className="cathedral-detail">
            {chosen.window.level ? (
              <>
                <p>
                  {chosen.window.panels.filter((p) => p.state !== 'dark').length} of {chosen.window.panels.length} panels set
                  {chosen.window.complete ? ': the window is complete.' : '.'}
                </p>
                <p className="ui-note">Choose a panel in the window to step inside its episode.</p>
              </>
            ) : (
              <p>This window waits for its level, which is still to come.</p>
            )}
            <div className="quiz-actions">
              {chosen.window.level && finished.includes(chosen.window.level) && (
                <Button variant="primary" onClick={() => openQuiz(chosen.window.level!.id)}>
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
