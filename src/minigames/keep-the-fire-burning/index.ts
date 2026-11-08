import { EVENING, FLAME, NIGHT, RING, SMOKE } from '../../content/levels/11-the-tabernacle-and-the-holy-life/episode-4'
import { STEP, type GameInput, type GameRules, type GameView, type Hint } from '../framework'

/**
 * Keep the fire burning (Level 11 script, Episode 4): timing. The altar fire, through one
 * day and one night, as the sky turns to evening and night and back to morning. The fire
 * slowly sinks, and a ring of light around it shows when it needs wood. The player lays on
 * wood at the right moment: too early and the priest waits, too late and the flames grow
 * small, but the fire never goes out. Morning and evening, the offering is laid on it, and
 * the smoke goes up.
 *
 * Tap (or press Space) when the ring of light shows. In gentle mode the moment for wood
 * lasts much longer.
 */

export const HINT: Hint = {
  pointer: 'Keep the fire burning: when the ring of light shows, tap to lay on wood.',
  keys: 'Or press Space.',
  gesture: 'tap',
}

/** How long the day and night last; how fast the fire sinks; when it needs wood (in gentle mode, sooner); how low it sinks. */
export const DAY = 30
const SINK = 0.09
export const READY = { normal: 0.55, gentle: 0.85 }
const LOW = 0.25
/** How many times wood must be laid on, at least, before the day and night are done. */
export const FEEDS = 4
/** When the morning and evening offerings are laid on the fire, as fractions of the day. */
const OFFERINGS = [
  { at: 0.08, title: 'The morning offering', text: 'The priest lays the offering on the fire, and the smoke goes up.' },
  { at: 0.5, title: 'The evening offering', text: 'At evening, again the offering, and again the smoke goes up.' },
]
const WORDS = 2
const SHOW = 2.4

interface FireState {
  time: number
  /** How high the fire burns, from LOW to 1. */
  fire: number
  feeds: number
  /** The last thing that happened, and when: wood laid on, or the priest waiting. */
  said: 'fed' | 'wait' | null
  saidAt: number
  doneAt: number
}

const FED = { title: 'Wood on the fire', text: '“The priest shall burn wood on it every morning.”' }
const WAIT = { title: 'Not yet', text: 'The fire is still burning well. The priest waits.' }
const SMALL = { title: 'The flames grow small', text: 'Lay on wood: the fire must not go out.' }
const DAWN = { title: 'A new morning', text: '“Fire shall be kept burning upon the altar continually; it shall not go out.”' }

/** How far through the day and night, from 0 to 1. */
const dayOf = (time: number) => Math.min(1, time / DAY)
const smooth = (a: number, b: number, t: number) => {
  const k = Math.min(1, Math.max(0, (t - a) / (b - a)))
  return k * k * (3 - 2 * k)
}

export const keepTheFireBurning: GameRules<FireState> = {
  id: 'keep-the-fire-burning',
  start: () => ({ time: 0, fire: 1, feeds: 0, said: null, saidAt: -Infinity, doneAt: -1 }),
  step(state, inputs: readonly GameInput[], context) {
    const time = state.time + STEP
    if (state.doneAt >= 0) return { ...state, time }
    let { fire, feeds, said, saidAt, doneAt } = state
    fire = Math.max(LOW, fire - SINK * STEP)
    const ready = context.gentle ? READY.gentle : READY.normal
    const pressed = inputs.some((i) => (i.kind === 'key' && i.key === 'primary' && i.down) || (i.kind === 'pointer' && i.phase === 'down'))
    if (pressed) {
      if (fire <= ready) {
        fire = 1
        feeds++
        said = 'fed'
        // Wood laid on once the night is over, and the fire has been kept all through it: a new day.
        if (time >= DAY && feeds >= FEEDS) doneAt = time
      } else said = 'wait'
      saidAt = time
    }
    return { time, fire, feeds, said, saidAt, doneAt }
  },
  view(state, context): GameView {
    const finished = state.doneAt >= 0
    const day = dayOf(state.time)
    const ready = !finished && state.fire <= (context.gentle ? READY.gentle : READY.normal)
    const offering = OFFERINGS.find((o) => day >= o.at && day < o.at + WORDS / DAY)
    const live: Record<string, number> = {
      [`actor:${FLAME.id}.size`]: finished ? FLAME.max : FLAME.min + (FLAME.max - FLAME.min) * state.fire,
      [`actor:${RING}.opacity`]: ready ? 0.55 + 0.25 * Math.sin(state.time * Math.PI * 3) : 0,
      [`actor:${SMOKE.id}.opacity`]: offering ? 0.95 : SMOKE.opacity,
      // Evening comes halfway through, then the night, then the dawn again.
      [`layer:${EVENING}.opacity`]: smooth(0.35, 0.5, day) * (1 - smooth(0.85, 1, day)),
      [`layer:${NIGHT}.opacity`]: smooth(0.5, 0.65, day) * (1 - smooth(0.85, 1, day)),
    }
    const recent = state.time - state.saidAt < WORDS
    const message = finished ? DAWN : offering ? offering : recent && state.said === 'fed' ? FED : recent && state.said === 'wait' ? WAIT : state.fire <= LOW + 0.01 ? SMALL : null
    return { live, hint: finished ? null : HINT, message, done: finished && state.time - state.doneAt >= SHOW }
  },
}
