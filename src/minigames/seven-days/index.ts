import { MARKS, SUN } from '../../content/levels/06-job/episode-2'
import { lerp } from '../../engine/motion'
import { STEP, type GameRules, type GameView, type Hint } from '../framework'

/**
 * Seven days (Level 6 script, Episode 2): a quiet interaction. Job and his three friends
 * sit on the ground together, and nothing needs to be done. Each tap lets a day pass: the
 * sun crosses the sky, evening falls, the night comes with the moon, and morning returns.
 * A mark is scratched in the dust for each day. Seven days and seven nights, and no one
 * speaks.
 *
 * A tap anywhere (or Space) lets the next day pass; a day can't be hurried. In gentle mode
 * the days pass on their own.
 */

export const HINT: Hint = {
  pointer: 'Tap to let a day pass, as Job’s friends sit with him.',
  keys: 'Or press Space for each day.',
  gesture: 'tap',
}

export const DAYS = MARKS.length
/** How long a day takes to pass, and how long the last morning shows before the story goes on. */
export const DAY = 3
const SHOW = 2.4

interface DaysState {
  time: number
  /** Days fully passed, and when the one under way began (or -Infinity). */
  passed: number
  startedAt: number
  /** Gentle mode: the first press sets the days going; they also go on their own. */
  doneAt: number
}

const smooth = (t: number) => (t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t))
/** A rise from `a` to `b`, then a fall from `c` to `d`, over a day's fraction. */
const bump = (f: number, a: number, b: number, c: number, d: number) => smooth((f - a) / (b - a)) * (1 - smooth((f - c) / (d - c)))

/** The sky through one day, from morning (0) to the next morning (1). */
export function skyAt(f: number) {
  const evening = bump(f, 0.4, 0.52, 0.82, 0.94)
  const night = bump(f, 0.5, 0.62, 0.8, 0.96)
  // The sun crosses from east to west, sets, and comes up in the east again at the end.
  const across = Math.min(1, f / 0.48)
  const sun = f < 0.48 ? { x: lerp(SUN.x, SUN.west, across), y: lerp(SUN.y, SUN.top, Math.sin(across * Math.PI)), opacity: 1 - smooth((f - 0.42) / 0.06) } : { x: SUN.x, y: SUN.y, opacity: smooth((f - 0.92) / 0.08) }
  return { evening, night, moon: night * 0.8, sun }
}

const COUNT = Array.from({ length: DAYS + 1 }, (_, n) => ({ title: 'Seven days and seven nights', text: n === 1 ? 'One day.' : `${n} days.` }))
const STILL = { title: 'Seven days and seven nights', text: 'No one says a word. They stay with him.' }

export const sevenDays: GameRules<DaysState> = {
  id: 'seven-days',
  start: () => ({ time: 0, passed: 0, startedAt: -Infinity, doneAt: -1 }),
  step(state, inputs, context) {
    const time = state.time + STEP
    if (state.doneAt >= 0) return { ...state, time }
    let { passed, startedAt, doneAt } = state
    // The day under way ends.
    if (time - startedAt >= DAY && state.time - startedAt < DAY) {
      passed++
      if (passed === DAYS) doneAt = time
    }
    const busy = time - startedAt < DAY
    const asked = inputs.some((i) => (i.kind === 'pointer' && i.phase === 'down') || (i.kind === 'key' && i.key === 'primary' && i.down))
    // Gentle mode: the days go on by themselves, a breath apart.
    const onTheirOwn = context.gentle && time - Math.max(0, startedAt + DAY) >= 0.6
    if (!busy && doneAt < 0 && (asked || onTheirOwn)) startedAt = time
    return { time, passed, startedAt, doneAt }
  },
  view(state): GameView {
    const since = state.time - state.startedAt
    const f = state.doneAt < 0 && since < DAY ? since / DAY : 0
    const sky = skyAt(f)
    const live: Record<string, number> = {
      'layer:evening-sky.opacity': sky.evening,
      'layer:night-sky.opacity': sky.night,
      'actor:sun.x': sky.sun.x,
      'actor:sun.y': sky.sun.y,
      'actor:sun.opacity': sky.sun.opacity,
      'actor:moon.opacity': sky.moon,
    }
    // Each day's mark is scratched as its morning comes.
    MARKS.forEach((m, i) => (live[`actor:${m.id}.opacity`] = i < state.passed ? 1 : 0))
    const finished = state.doneAt >= 0
    return { live, hint: finished ? null : HINT, message: finished ? STILL : state.passed > 0 ? COUNT[state.passed]! : null, done: finished && state.time - state.doneAt >= SHOW }
  },
}
