import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import { gameClock } from '../../engine/clock'
import type { Choice, Compare, GameKey, GameView, Hint } from '../../minigames/framework'
import type { GameRunner } from '../../minigames/runner'
import { Button } from '../../ui/components'
import { CompareCard } from './CompareCard'
import { Scripture } from './Line'

/** Keys the interactions understand. */
const KEYS: Record<string, GameKey> = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
  w: 'up',
  s: 'down',
  a: 'left',
  d: 'right',
  ' ': 'primary',
  Enter: 'primary',
}

/** How long before a hint appears, unless gentle mode shows it straight away. */
const HINT_DELAY_MS = 1400

/**
 * The layer over the scene during an interactive moment. It turns touch, mouse and keys
 * into the game's input, shows the instruction (for both touch and keys), and draws the
 * small things that belong to the gesture rather than to the world: the sparkles left by
 * a sweeping hand, the quiet "Rest" of the seventh day, and the answers to pick from in
 * the games played by choosing, and the passages compared in "Spot the twist".
 */
export function PlayLayer({ runner, gentle }: { runner: GameRunner; gentle: boolean }) {
  const layerRef = useRef<HTMLDivElement>(null)
  const marksRef = useRef<HTMLDivElement>(null)
  const pressed = useRef(false)
  const [hint, setHint] = useState<Hint | null>(runner.view.hint)
  const [restReady, setRestReady] = useState(false)
  const [hintDue, setHintDue] = useState(gentle)
  const [choice, setChoice] = useState<Choice | null>(runner.view.choice ?? null)
  const [compare, setCompare] = useState<Compare | null>(runner.view.compare ?? null)
  const [message, setMessage] = useState<GameView['message']>(runner.view.message ?? null)

  // The instruction waits a moment, so a player who already knows what to do isn't told.
  useEffect(() => {
    if (gentle) return
    const timer = setTimeout(() => setHintDue(true), HINT_DELAY_MS)
    return () => clearTimeout(timer)
  }, [gentle])

  // Each frame, follow what the game shows.
  useEffect(() => {
    let shownHint = runner.view.hint
    let shownReady = false
    let shownChoice = runner.view.choice ?? null
    let shownCompare = runner.view.compare ?? null
    let shownMessage = runner.view.message ?? null
    const pool: HTMLSpanElement[] = []
    return gameClock.subscribe(
      () => {
        const view = runner.view
        if (view.hint !== shownHint) {
          shownHint = view.hint
          setHint(view.hint)
        }
        if ((view.choice ?? null) !== shownChoice) {
          shownChoice = view.choice ?? null
          setChoice(shownChoice)
        }
        if ((view.message ?? null) !== shownMessage) {
          shownMessage = view.message ?? null
          setMessage(shownMessage)
        }
        if ((view.compare ?? null) !== shownCompare) {
          shownCompare = view.compare ?? null
          setCompare(shownCompare)
        }
        if (!!view.restReady !== shownReady) {
          shownReady = !!view.restReady
          setRestReady(shownReady)
        }
        const box = marksRef.current
        const marks = view.marks ?? []
        if (!box) return
        while (pool.length < marks.length) {
          const span = document.createElement('span')
          span.className = 'play-mark'
          box.append(span)
          pool.push(span)
        }
        pool.forEach((span, i) => {
          const mark = marks[i]
          span.hidden = !mark
          if (!mark) return
          span.style.left = `${mark.x * 100}%`
          span.style.top = `${mark.y * 100}%`
          span.style.opacity = String(Math.max(0, 1 - mark.age / 0.8))
        })
      },
      { whilePaused: true },
    )
  }, [runner])

  // Keys go to the game while it's on.
  useEffect(() => {
    const onKey = (down: boolean) => (event: KeyboardEvent) => {
      const key = KEYS[event.key] ?? KEYS[event.key.toLowerCase()]
      if (!key || event.altKey || event.ctrlKey || event.metaKey) return
      // Keys pressed on a control (a button, a phrase to tap) belong to that control.
      if (event.target instanceof HTMLElement && event.target.closest('button, input, textarea, select, a, [role="button"]')) return
      event.preventDefault()
      if (down && event.repeat) return
      runner.queue({ kind: 'key', key, down })
    }
    const keyDown = onKey(true)
    const keyUp = onKey(false)
    window.addEventListener('keydown', keyDown)
    window.addEventListener('keyup', keyUp)
    return () => {
      window.removeEventListener('keydown', keyDown)
      window.removeEventListener('keyup', keyUp)
    }
  }, [runner])

  const pointer = (phase: 'down' | 'move' | 'up') => (event: ReactPointerEvent<HTMLDivElement>) => {
    const layer = layerRef.current
    if (!layer || !event.isPrimary) return
    if (phase === 'move' && !pressed.current) return
    if (phase === 'down') {
      pressed.current = true
      layer.setPointerCapture(event.pointerId)
    }
    if (phase === 'up') pressed.current = false
    const rect = layer.getBoundingClientRect()
    runner.queue({ kind: 'pointer', phase, x: (event.clientX - rect.left) / rect.width, y: (event.clientY - rect.top) / rect.height })
  }

  const resting = hint?.gesture === 'rest'

  return (
    <div
      className="play-layer"
      ref={layerRef}
      onPointerDown={pointer('down')}
      onPointerMove={pointer('move')}
      onPointerUp={pointer('up')}
      onPointerCancel={pointer('up')}
    >
      <div className="play-marks" ref={marksRef} aria-hidden="true" />
      {hint && !resting && (hintDue || gentle) && (
        <output className="play-hint" data-gentle={gentle || undefined}>
          <span className="play-gesture" data-gesture={hint.gesture} aria-hidden="true" />
          <span className="play-hint-text">
            {hint.pointer}
            <small>{hint.keys}</small>
          </span>
        </output>
      )}
      {choice && <ChoiceCard choice={choice} choose={(option) => runner.queue({ kind: 'choose', option })} />}
      {message && (
        <output className={message.low ? 'play-message play-message-low' : 'play-message'} aria-live="polite">
          <span className="play-message-title">
            {message.title}
            {message.reference && <small>{message.reference}</small>}
          </span>
          <span className="play-message-text">
            <Scripture text={message.text} />
          </span>
        </output>
      )}
      {compare && (
        <CompareCard
          compare={compare}
          choose={(option) => runner.queue({ kind: 'choose', option })}
          finish={() => runner.queue({ kind: 'key', key: 'primary', down: true })}
        />
      )}
      {resting && (
        <div className="rest">
          <p className="rest-word">Rest</p>
          {restReady && (
            <Button variant="quiet" className="rest-continue" onClick={() => runner.queue({ kind: 'key', key: 'primary', down: true })}>
              Continue
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

/**
 * A question with its answers, as buttons. A new question takes the keyboard's focus, so
 * Tab and Enter answer it; after the right answer only the answer stays.
 */
function ChoiceCard({ choice, choose }: { choice: Choice; choose: (option: string) => void }) {
  const first = useRef<HTMLButtonElement>(null)
  const answered = choice.feedback?.right ?? false

  useEffect(() => {
    first.current?.focus({ preventScroll: true })
  }, [choice.id])

  return (
    <fieldset className="play-choice" data-compact={choice.compact || undefined} onPointerDown={(event) => event.stopPropagation()}>
      <legend className="play-choice-question">{choice.question}</legend>
      {choice.trail && choice.trail.length > 0 && (
        <ol className="play-choice-trail" aria-label="So far">
          {choice.trail.map((item) => (
            <li key={item.title}>
              {item.title}
              {item.note && (
                <small>
                  <Scripture text={item.note} />
                </small>
              )}
            </li>
          ))}
        </ol>
      )}
      {!answered && (
        <div className="play-choice-options">
          {choice.options.map((option, i) => (
            <button
              key={option.id}
              ref={i === 0 ? first : undefined}
              type="button"
              className="play-choice-option"
              data-glow={choice.glow === option.id || undefined}
              onClick={() => choose(option.id)}
            >
              {option.text}
            </button>
          ))}
        </div>
      )}
      <output className="play-choice-feedback" data-right={answered || undefined} aria-live="polite">
        {choice.feedback && <Scripture text={choice.feedback.text} />}
      </output>
    </fieldset>
  )
}
