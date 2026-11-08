import { REGIONS } from '../../content/levels/13-moses-last-words/episode-5'
import { STEP, type GameInput, type GameRules, type GameView, type Hint } from '../framework'

/**
 * All the land (Level 13 script, Episode 5): light and reveal. The view from the top of Nebo,
 * at first in evening haze. As God shows Moses the land, the player lights each part of it in
 * turn: Gilead as far as Dan, Naphtali, Ephraim and Manasseh, Judah as far as the western sea,
 * the Negeb, and the valley of Jericho. Each glows golden and its name appears, until the whole
 * land shines below him.
 *
 * Tap the next part of the land (or press Space). In gentle mode the next part glows, and
 * lights itself after a moment.
 */

export const HINT: Hint = {
  pointer: 'God shows Moses the whole land: tap each part to light it.',
  keys: 'Or press Space for the next.',
  gesture: 'tap',
}

/** How near a tap must be; how long a glow takes to come; gentle mode's wait; how long words show; how long the end shows. */
const NEAR = 0.1
const GLOW = 0.8
const GENTLE_WAIT = 1.4
const WORDS = 1.8
const SHOW = 2.6

interface LandState {
  time: number
  lit: number
  litAt: number
  doneAt: number
}

const SHOWN = REGIONS.map((r) => ({ title: r.name, text: 'The LORD showed Moses all the land.' }))
const ALL = { title: 'All the land', text: '“This is the land of which I swore to Abraham, to Isaac, and to Jacob.”' }

export const allTheLand: GameRules<LandState> = {
  id: 'all-the-land',
  start: () => ({ time: 0, lit: 0, litAt: -Infinity, doneAt: -1 }),
  step(state, inputs: readonly GameInput[], context) {
    const time = state.time + STEP
    if (state.doneAt >= 0 || time - state.litAt < GLOW) return { ...state, time }
    let { lit, litAt, doneAt } = state
    const next = REGIONS[lit]!
    const waited = time - Math.max(0, litAt) >= GENTLE_WAIT
    const asked = (context.gentle && waited) || inputs.some((i) => (i.kind === 'key' && i.key === 'primary' && i.down) || (i.kind === 'pointer' && i.phase === 'down' && Math.hypot(next.x - i.x, next.y - i.y) < NEAR))
    if (asked) {
      lit++
      litAt = time
      if (lit === REGIONS.length) doneAt = time
    }
    return { time, lit, litAt, doneAt }
  },
  view(state, context): GameView {
    const live: Record<string, number> = {}
    REGIONS.forEach((r, i) => {
      const k = i < state.lit - 1 ? 1 : i === state.lit - 1 ? Math.min(1, (state.time - state.litAt) / GLOW) : 0
      // In gentle mode the next part of the land glows faintly, before it lights.
      live[`actor:${r.glow}.opacity`] = 0.85 * k + (context.gentle && i === state.lit && state.doneAt < 0 ? 0.25 : 0)
    })
    const finished = state.doneAt >= 0
    const telling = state.lit > 0 && state.time - state.litAt < WORDS
    const message = telling ? SHOWN[state.lit - 1]! : finished ? ALL : null
    return { live, hint: finished ? null : HINT, message, done: finished && state.time - state.doneAt >= WORDS + SHOW }
  },
}
