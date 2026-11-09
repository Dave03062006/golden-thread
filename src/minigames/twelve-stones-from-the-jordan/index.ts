import { BANK, STONES } from '../../content/levels/14-joshua/episode-2'
import { lerp } from '../../engine/motion'
import { STEP, type GameInput, type GameRules, type GameView, type Hint } from '../framework'

/**
 * Twelve stones from the Jordan (Level 14 script, Episode 2): building and stacking. The dry
 * riverbed, with the priests and the ark standing in the middle. One man from each tribe comes
 * down; the player helps each lift a stone from the riverbed and carry it up to the bank, and
 * its tribe's name is shown. (At Gilgal, the story sets the twelve stones up in a circle.)
 *
 * Tap a stone (or press Space for the next). In gentle mode a tap anywhere carries the next.
 */

export const HINT: Hint = {
  pointer: 'Help a man from each tribe carry a stone out of the Jordan: tap each stone.',
  keys: 'Or press Space for the next.',
  gesture: 'tap',
}

/** How near a tap must be; how long a stone takes to carry; how long its name shows; how long the end shows. */
const NEAR = 0.05
export const CARRY = 0.9
const WORDS = 1.4
const SHOW = 2.4

interface StonesState {
  time: number
  carriedAt: number[]
  count: number
  lastAt: number
  doneAt: number
}

const CARRIED = STONES.map((s, i) => ({ title: `${i + 1} of 12`, text: `A stone for the tribe of ${s.tribe}.` }))
const ALL = { title: 'Twelve stones', text: '“So these stones shall be to the people of Israel a memorial for ever.”' }

export const twelveStonesFromTheJordan: GameRules<StonesState> = {
  id: 'twelve-stones-from-the-jordan',
  start: () => ({ time: 0, carriedAt: STONES.map(() => -1), count: 0, lastAt: -Infinity, doneAt: -1 }),
  step(state, inputs: readonly GameInput[], context) {
    const time = state.time + STEP
    if (state.doneAt >= 0) return { ...state, time }
    const carriedAt = [...state.carriedAt]
    let { count, lastAt, doneAt } = state
    for (const input of inputs) {
      let which = -1
      if ((input.kind === 'key' && input.key === 'primary' && input.down) || (input.kind === 'pointer' && input.phase === 'down' && context.gentle)) which = carriedAt.indexOf(-1)
      else if (input.kind === 'pointer' && input.phase === 'down') which = STONES.findIndex((s, i) => carriedAt[i]! < 0 && Math.hypot(s.x - input.x, s.y - 0.01 - input.y) < NEAR)
      if (which < 0) continue
      carriedAt[which] = time
      lastAt = time
      count++
      if (count === STONES.length) doneAt = time
    }
    return { time, carriedAt, count, lastAt, doneAt }
  },
  view(state): GameView {
    const live: Record<string, number> = {}
    STONES.forEach((s, i) => {
      const at = state.carriedAt[i]!
      const t = at < 0 ? 0 : Math.min(1, (state.time - at) / CARRY)
      live[`actor:${s.id}.y`] = lerp(s.y, BANK.y, t)
      live[`actor:${s.id}.opacity`] = 1 - t
    })
    const finished = state.doneAt >= 0
    const telling = state.count > 0 && state.time - state.lastAt < WORDS
    const message = telling ? CARRIED[state.count - 1]! : finished ? ALL : null
    return { live, hint: finished ? null : HINT, message, done: finished && state.time - state.doneAt >= CARRY + SHOW }
  },
}
