import { DEMANDED, PATCHES, PER_PATCH, PILE } from '../../content/levels/08-the-plagues-and-the-passover/episode-2'
import { lerp } from '../../engine/motion'
import { STEP, type GameInput, type GameRules, type GameView, type Hint } from '../framework'

/**
 * Gathering stubble (Level 8 script, Episode 2): herding and gathering. A harvested field
 * under a hot sun, with stubble left in it here and there. The player gathers the stubble,
 * patch by patch, onto the pile by the brick pit. A tally shows the bricks it will make, and
 * beside it the number Pharaoh still demands, "the same number as before." However much is
 * gathered, it is never enough.
 *
 * Tap a patch (or sweep across it) to gather it, or press Space to gather the next. In
 * gentle mode a tap or sweep anywhere gathers the nearest patch.
 */

export const HINT: Hint = {
  pointer: 'Tap each patch of stubble to gather it for the bricks.',
  keys: 'Or press Space to gather the next.',
  gesture: 'tap',
}

/** How close a tap must be, how long each tally shows, and how long the end shows. */
const NEAR = 0.07
const WORDS = 1.6
const SHOW = 3

interface StubbleState {
  time: number
  gathered: boolean[]
  gatheredAt: number
  count: number
  doneAt: number
}

const TALLY = PATCHES.map((_, n) => ({ title: `Straw for ${(n + 1) * PER_PATCH} bricks`, text: `Pharaoh still demands ${DEMANDED}, the same number as before.` }))
const NEVER = { title: 'Never enough', text: `Straw for ${PATCHES.length * PER_PATCH} bricks, and Pharaoh demands ${DEMANDED}.` }

/** Which patch a tap lands on (in gentle mode, the nearest left), or -1. */
function patchAt(state: StubbleState, x: number, y: number, gentle: boolean): number {
  let best = -1
  let bestD = Infinity
  PATCHES.forEach((p, i) => {
    if (state.gathered[i]) return
    const d = Math.hypot(p.x - x, p.y - 0.02 - y)
    if (d < bestD && (gentle || d < NEAR)) {
      best = i
      bestD = d
    }
  })
  return best
}

export const gatheringStubble: GameRules<StubbleState> = {
  id: 'gathering-stubble',
  start: () => ({ time: 0, gathered: PATCHES.map(() => false), gatheredAt: -Infinity, count: 0, doneAt: -1 }),
  step(state, inputs: readonly GameInput[], context) {
    const time = state.time + STEP
    if (state.doneAt >= 0) return { ...state, time }
    const gathered = [...state.gathered]
    let { gatheredAt, count, doneAt } = state
    for (const input of inputs) {
      let which = -1
      if (input.kind === 'key' && input.key === 'primary' && input.down) which = gathered.indexOf(false)
      else if (input.kind === 'pointer' && input.phase !== 'up') which = patchAt({ ...state, gathered }, input.x, input.y, context.gentle && input.phase === 'down')
      if (which < 0 || gathered[which]) continue
      gathered[which] = true
      gatheredAt = time
      count++
      if (count === PATCHES.length) doneAt = time
    }
    return { time, gathered, gatheredAt, count, doneAt }
  },
  view(state): GameView {
    const live: Record<string, number> = { 'actor:pile.size': lerp(PILE.from, PILE.to, state.count / PATCHES.length) }
    PATCHES.forEach((p, i) => (live[`actor:${p.id}.opacity`] = state.gathered[i] ? 0 : 1))
    const finished = state.doneAt >= 0
    const telling = state.count > 0 && state.time - state.gatheredAt < WORDS
    // The last tally shows in full, then the words at the end.
    const message = telling ? TALLY[state.count - 1]! : finished ? NEVER : null
    return { live, hint: finished ? null : HINT, message, done: finished && state.time - state.doneAt >= WORDS + SHOW }
  },
}
