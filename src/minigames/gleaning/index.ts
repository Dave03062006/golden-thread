import { HEAP, STALKS } from '../../content/levels/16-ruth/episode-3'
import { STEP, type GameInput, type GameRules, type GameView, type Hint } from '../framework'

/**
 * Gleaning (Level 16 script, Episode 3): gathering. The field behind Boaz's reapers, with the
 * stalks they leave, some of them dropped on purpose. The player gathers them, and Ruth's heap
 * of barley grows until it is an ephah.
 *
 * Tap a stalk (or press Space for the next). In gentle mode a tap anywhere gathers the next.
 */

export const HINT: Hint = {
  pointer: 'Help Ruth glean: tap each stalk of barley left behind the reapers.',
  keys: 'Or press Space for the next.',
  gesture: 'tap',
}

/** How near a tap must be; how long a stalk takes to gather; how long the end shows. */
const NEAR = 0.05
export const GATHER = 0.6
const SHOW = 2.4

interface GleanState {
  time: number
  gatheredAt: number[]
  doneAt: number
}

const FULL = { title: 'An ephah of barley', text: '“So she gleaned in the field until evening.”' }

export const gleaning: GameRules<GleanState> = {
  id: 'gleaning',
  start: () => ({ time: 0, gatheredAt: STALKS.map(() => -1), doneAt: -1 }),
  step(state, inputs: readonly GameInput[], context) {
    const time = state.time + STEP
    if (state.doneAt >= 0) return { ...state, time }
    const gatheredAt = [...state.gatheredAt]
    let { doneAt } = state
    for (const input of inputs) {
      let which = -1
      if ((input.kind === 'key' && input.key === 'primary' && input.down) || (input.kind === 'pointer' && input.phase === 'down' && context.gentle)) which = gatheredAt.indexOf(-1)
      else if (input.kind === 'pointer' && input.phase === 'down') which = STALKS.findIndex((s, i) => gatheredAt[i]! < 0 && Math.hypot(s.x - input.x, s.y - 0.02 - input.y) < NEAR)
      if (which < 0) continue
      gatheredAt[which] = time
      if (!gatheredAt.includes(-1)) doneAt = time
    }
    return { time, gatheredAt, doneAt }
  },
  view(state): GameView {
    const live: Record<string, number> = {}
    let gathered = 0
    STALKS.forEach((s, i) => {
      const at = state.gatheredAt[i]!
      const t = at < 0 ? 0 : Math.min(1, (state.time - at) / GATHER)
      live[`actor:${s.id}.opacity`] = 1 - t
      gathered += t
    })
    live[`actor:${HEAP}.opacity`] = gathered / STALKS.length
    const finished = state.doneAt >= 0
    const count = state.gatheredAt.filter((at) => at >= 0).length
    const message = finished ? FULL : count ? { title: `${count} of ${STALKS.length}`, text: 'Handfuls left on purpose, for Ruth to glean.' } : null
    return { live, hint: finished ? null : HINT, message, done: finished && state.time - state.doneAt >= GATHER + SHOW }
  },
}
