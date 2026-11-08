import { ELDERS, glowOf } from '../../content/levels/12-forty-years-in-the-wilderness/episode-2'
import { STEP, type GameInput, type GameRules, type GameView, type Hint } from '../framework'

/**
 * The spirit on the seventy (Level 12 script, Episode 2): light and reveal. The elders stand in
 * a wide circle around the tent of meeting, in shadow, and the cloud comes down over the tent.
 * The player brings the light from Moses to each elder in turn, and each one lights up, ready
 * to help carry the people. When the circle is complete, two more wait far out in the camp:
 * Eldad and Medad, who were not at the tent at all. The light comes to them too.
 *
 * Tap the next elder (or press Space). In gentle mode a tap anywhere lights the next.
 */

export const HINT: Hint = {
  pointer: 'Bring the light from Moses to each of the elders: tap the next one.',
  keys: 'Or press Space for the next.',
  gesture: 'tap',
}

/** How near a tap must be; how long a light takes to come; how long words show; how long the end shows. */
const NEAR = 0.07
export const LIGHT = 0.6
const WORDS = 1.6
const SHOW = 2.6

interface SpiritState {
  time: number
  lit: number
  litAt: number
  doneAt: number
}

const AROUND = ELDERS.filter((e) => !e.far).length
const LIT = ELDERS.map((e, i) =>
  e.far ? { title: e.id === 'eldad' ? 'Eldad, in the camp' : 'Medad, in the camp', text: 'The spirit rested on him too, though he had not gone out to the tent.' } : { title: `${i + 1} of ${AROUND} around the tent`, text: 'The spirit rested on him, to help carry the people.' },
)
const ALL = { title: 'The burden shared', text: '“They shall bear the burden of the people with you, that you may not bear it yourself alone.”' }

export const theSpiritOnTheSeventy: GameRules<SpiritState> = {
  id: 'the-spirit-on-the-seventy',
  start: () => ({ time: 0, lit: 0, litAt: -Infinity, doneAt: -1 }),
  step(state, inputs: readonly GameInput[], context) {
    const time = state.time + STEP
    if (state.doneAt >= 0 || time - state.litAt < LIGHT) return { ...state, time }
    let { lit, litAt, doneAt } = state
    const next = ELDERS[lit]!
    const asked = inputs.some((i) => (i.kind === 'key' && i.key === 'primary' && i.down) || (i.kind === 'pointer' && i.phase === 'down' && (context.gentle || Math.hypot(next.x - i.x, next.y - 0.04 - i.y) < NEAR)))
    if (asked) {
      lit++
      litAt = time
      if (lit === ELDERS.length) doneAt = time
    }
    return { time, lit, litAt, doneAt }
  },
  view(state): GameView {
    const finished = state.doneAt >= 0
    const live: Record<string, number> = {}
    ELDERS.forEach((e, i) => (live[`actor:${glowOf(e.id)}.opacity`] = 0.8 * (i < state.lit - 1 ? 1 : i === state.lit - 1 ? Math.min(1, (state.time - state.litAt) / LIGHT) : 0)))
    const telling = state.lit > 0 && state.time - state.litAt < WORDS
    const message = finished && !telling ? ALL : telling ? LIT[state.lit - 1]! : null
    return { live, hint: finished ? null : HINT, message, done: finished && state.time - state.doneAt >= WORDS + SHOW }
  },
}
