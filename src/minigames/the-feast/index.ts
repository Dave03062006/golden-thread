import { DANCERS, LAMPS } from '../../content/levels/03-abraham-father-of-faith/episode-9'
import { STEP, type GameRules, type GameView, type Hint } from '../framework'

/**
 * The feast (Level 3 script, Episode 9): rhythm. Musicians play at Isaac's feast, and the
 * player keeps the beat on a drum. Each beat kept brings more dancers and lamps; a beat
 * missed doesn't stop the music. When enough beats are kept (or the song comes round to
 * its end anyway) the whole camp is dancing, and Sarah lifts Isaac high: "God has made
 * laughter for me."
 *
 * Any tap or key keeps the beat, Space included; a light pulses on every beat for those
 * who follow by eye. In gentle mode the beat is slower and any press near it counts.
 */

export const HINT: Hint = {
  pointer: 'Keep the beat on the drum: tap each time the light pulses.',
  keys: 'Or press Space on each beat.',
  gesture: 'tap',
}

/** The beat (seconds between beats), how near it a press must be, and how many beats are kept by the end. */
const BEAT = { normal: 0.75, gentle: 1 }
const WINDOW = { normal: 0.18, gentle: 0.32 }
export const GOAL = 12
/** The song ends after this many beats, kept or not. */
const SONG = 32
/** How long the joy goes on after the last beat. */
const JOY = 3

interface FeastState {
  time: number
  kept: number
  /** The last beat kept, so one beat counts once. */
  lastBeat: number
  doneAt: number
}

const JOYFUL = { title: 'The whole camp is dancing', text: '“God has made laughter for me.”' }

export const theFeast: GameRules<FeastState> = {
  id: 'the-feast',
  start: () => ({ time: 0, kept: 0, lastBeat: -1, doneAt: -1 }),
  step(state, inputs, context) {
    const time = state.time + STEP
    if (state.doneAt >= 0) return { ...state, time }
    const beat = context.gentle ? BEAT.gentle : BEAT.normal
    const window = context.gentle ? WINDOW.gentle : WINDOW.normal
    let { kept, lastBeat, doneAt } = state
    const pressed = inputs.some((i) => (i.kind === 'key' && i.down) || (i.kind === 'pointer' && i.phase === 'down'))
    if (pressed) {
      // The nearest beat, the first one a beat in.
      const n = Math.max(1, Math.round(time / beat))
      if (n !== lastBeat && Math.abs(time - n * beat) <= window) {
        kept++
        lastBeat = n
      }
    }
    if (kept >= GOAL || time >= SONG * beat) doneAt = time
    return { time, kept, lastBeat, doneAt }
  },
  view(state, context): GameView {
    const beat = context.gentle ? BEAT.gentle : BEAT.normal
    const progress = Math.min(1, state.doneAt >= 0 ? 1 : state.kept / GOAL)
    const live: Record<string, number> = {}
    DANCERS.forEach((id, i) => (live[`actor:${id}.opacity`] = Math.max(0, Math.min(1, progress * DANCERS.length - i))))
    LAMPS.forEach((id, i) => (live[`actor:${id}.opacity`] = Math.max(0, Math.min(1, progress * LAMPS.length - i))))
    // The light pulses on every beat, bright at the beat and fading after it.
    const phase = (state.time % beat) / beat
    live['actor:beat.opacity'] = state.doneAt >= 0 ? 0 : 0.35 + 0.6 * Math.max(0, 1 - phase * 3)
    live['actor:beat.size'] = 0.05 + 0.03 * Math.max(0, 1 - phase * 3)
    const finished = state.doneAt >= 0
    return { live, hint: finished ? null : HINT, message: finished ? JOYFUL : null, done: finished && state.time - state.doneAt >= JOY }
  },
}
