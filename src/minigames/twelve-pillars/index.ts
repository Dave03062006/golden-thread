import { PILLARS } from '../../content/levels/10-sinai/episode-3'
import { STEP, type GameInput, type GameRules, type GameView, type Hint } from '../framework'

/**
 * Twelve pillars (Level 10 script, Episode 3): building and stacking. Around the altar at
 * the foot of the mountain are twelve places, and the player sets up a standing stone on
 * each, one for each of the twelve tribes, named as it rises. When all twelve stand, the
 * whole people is gathered around the altar.
 *
 * Tap the next place (its glow shows where), or press Space. In gentle mode a tap anywhere
 * sets the next stone.
 */

export const HINT: Hint = {
  pointer: 'Set up a pillar for each of the twelve tribes: tap the glowing place.',
  keys: 'Or press Space for the next pillar.',
  gesture: 'tap',
}

/** How near a tap must be; how long a stone takes to rise; how long a name shows; how long the end shows. */
const NEAR = 0.07
export const RISE = 0.5
const WORDS = 1.4
const SHOW = 2.4

interface PillarsState {
  time: number
  set: number
  setAt: number
  doneAt: number
}

const NAMED = PILLARS.map((p, n) => ({ title: `${n + 1} of ${PILLARS.length}`, text: `A pillar for the tribe of ${p.tribe}.` }))
const ALL = { title: 'The twelve tribes of Israel', text: 'The whole people, gathered around the altar.' }

export const twelvePillars: GameRules<PillarsState> = {
  id: 'twelve-pillars',
  start: () => ({ time: 0, set: 0, setAt: -Infinity, doneAt: -1 }),
  step(state, inputs: readonly GameInput[], context) {
    const time = state.time + STEP
    if (state.doneAt >= 0) return { ...state, time }
    let { set, setAt, doneAt } = state
    // A new stone can be set once the last has risen.
    if (time - setAt >= RISE) {
      const next = PILLARS[set]!
      const asked = inputs.some((i) => (i.kind === 'key' && i.key === 'primary' && i.down) || (i.kind === 'pointer' && i.phase === 'down' && (context.gentle || Math.hypot(next.x - i.x, next.y - 0.02 - i.y) < NEAR)))
      if (asked) {
        set++
        setAt = time
        if (set === PILLARS.length) doneAt = time
      }
    }
    return { time, set, setAt, doneAt }
  },
  view(state): GameView {
    const finished = state.doneAt >= 0
    const live: Record<string, number> = {}
    PILLARS.forEach((p, i) => (live[`actor:${p.id}.opacity`] = i < state.set - 1 ? 1 : i === state.set - 1 ? Math.min(1, (state.time - state.setAt) / RISE) : 0))
    const next = PILLARS[Math.min(state.set, PILLARS.length - 1)]!
    live['actor:next-pillar.x'] = next.x
    live['actor:next-pillar.y'] = next.y - 0.03
    live['actor:next-pillar.opacity'] = finished ? 0 : 0.8
    const message = state.set > 0 && state.time - state.setAt < WORDS ? NAMED[state.set - 1]! : finished ? ALL : null
    return { live, hint: finished ? null : HINT, message, done: finished && state.time - state.doneAt >= WORDS + SHOW }
  },
}
