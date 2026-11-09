import { BUNDLES, SOLDIERS } from '../../content/levels/14-joshua/episode-1'
import { lerp } from '../../engine/motion'
import { STEP, type GameInput, type GameRules, type GameView, type Hint } from '../framework'

/**
 * Hidden on the roof (Level 14 script, Episode 1): stealth and escape. Rahab's flat roof,
 * with the stalks of flax laid out in rows, and the king's men coming up the stairs. The
 * player covers the two spies with flax, bundle by bundle, before the soldiers reach the top;
 * then the soldiers look around, see only flax, and go away. If the soldiers reach the top
 * first, they stop on the stairs to search the house below, and give the player more time:
 * the spies are never found.
 *
 * Tap the next bundle of flax (or press Space). In gentle mode the soldiers climb slowly, and
 * a tap anywhere lays the next bundle.
 */

export const HINT: Hint = {
  pointer: 'The king’s men are coming! Cover the spies with flax: tap each bundle.',
  keys: 'Or press Space for the next bundle.',
  gesture: 'tap',
}

/** How long the soldiers take to climb (in gentle mode, longer); how near a tap must be; how long they look around; how long they take to leave; how long the end shows after. */
export const CLIMB = { normal: 7, gentle: 14 }
const NEAR = 0.05
const LOOK = 2
const LEAVE = 2.4
const SHOW = 0.6

interface RoofState {
  time: number
  covered: number
  coveredAt: number
  /** How far up the stairs the soldiers are, from 0 to 1. */
  climb: number
  lookedAt: number
  doneAt: number
}

const GONE = { title: 'Only flax', text: 'The king’s men looked all around the roof, saw only flax drying in the sun, and went away.' }
const SEARCH = { title: 'Searching the house', text: 'The soldiers search the rooms below first. Quickly, cover the spies!' }

export const hiddenOnTheRoof: GameRules<RoofState> = {
  id: 'hidden-on-the-roof',
  start: () => ({ time: 0, covered: 0, coveredAt: -Infinity, climb: 0, lookedAt: -1, doneAt: -1 }),
  step(state, inputs: readonly GameInput[], context) {
    const time = state.time + STEP
    if (state.doneAt >= 0) return { ...state, time }
    let { covered, coveredAt, climb, lookedAt, doneAt } = state
    if (covered < BUNDLES.length) {
      const next = BUNDLES[covered]!
      const asked = inputs.some((i) => (i.kind === 'key' && i.key === 'primary' && i.down) || (i.kind === 'pointer' && i.phase === 'down' && (context.gentle || Math.hypot(next.x - i.x, next.y - i.y) < NEAR)))
      if (asked) {
        covered++
        coveredAt = time
      }
      // The soldiers climb, but stop just below the top to search the house until the spies are covered.
      climb = Math.min(covered === BUNDLES.length ? 1 : 0.85, climb + STEP / (context.gentle ? CLIMB.gentle : CLIMB.normal))
    } else {
      climb = Math.min(1, climb + STEP / (context.gentle ? CLIMB.gentle : CLIMB.normal) * 3)
      if (climb === 1 && lookedAt < 0) lookedAt = time
      if (lookedAt >= 0 && time - lookedAt >= LOOK + LEAVE) doneAt = time
    }
    return { time, covered, coveredAt, climb, lookedAt, doneAt }
  },
  view(state): GameView {
    const live: Record<string, number> = {}
    BUNDLES.forEach((b, i) => (live[`actor:${b.id}.opacity`] = i < state.covered ? 1 : 0))
    // Up the stairs, then, after looking around, back down and away.
    const leaving = state.lookedAt >= 0 ? Math.min(1, Math.max(0, (state.time - state.lookedAt - LOOK) / LEAVE)) : 0
    const up = state.climb * (1 - leaving)
    live[`actor:${SOLDIERS.id}.x`] = lerp(SOLDIERS.from.x, SOLDIERS.to.x, up)
    live[`actor:${SOLDIERS.id}.y`] = lerp(SOLDIERS.from.y, SOLDIERS.to.y, up)
    live[`actor:${SOLDIERS.id}.opacity`] = 1 - leaving
    const finished = state.doneAt >= 0
    const waiting = state.covered < BUNDLES.length && state.climb >= 0.85
    const message = state.lookedAt >= 0 ? GONE : waiting ? SEARCH : null
    return { live, hint: state.covered < BUNDLES.length ? HINT : null, message, done: finished && state.time - state.doneAt >= SHOW }
  },
}
