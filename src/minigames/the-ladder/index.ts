import { ANGELS, LADDER, railX, stepY } from '../../content/levels/04-isaac-and-jacob/episode-4'
import { actor } from '../../scene/build'
import { STEP, type GameRules, type GameView, type Hint } from '../framework'

/**
 * The ladder (Level 4 script, Episode 4): light and reveal. The dark sky over sleeping
 * Jacob. Each tap lights the next step of the ladder, from the ground upward, and angels
 * step onto it: some climbing toward heaven, others coming down toward Jacob. When the last
 * step reaches the light at the top, the angels go up and down the whole ladder, and the
 * LORD speaks (the story goes on).
 *
 * A tap anywhere (or Space) lights the next step. In gentle mode, once the first step is
 * lit, the rest light by themselves, one after another.
 */

export const HINT: Hint = {
  pointer: 'Tap to light the steps of the ladder, from the earth to heaven.',
  keys: 'Or press Space to light the next step.',
  gesture: 'tap',
}

/** The shortest time between two steps, how often they light by themselves in gentle mode, and how long the angels climb before the story goes on. */
const BETWEEN = 0.3
const GENTLE = 0.8
const SHOW = 2.6
/** How long an angel takes to climb the ladder (or come down it), in seconds. */
const CLIMB = 8

interface LadderState {
  time: number
  lit: number
  litAt: number
}

const REACHED = { title: 'The gate of heaven', text: 'The angels of God were going up and coming down.', low: true }

export const theLadder: GameRules<LadderState> = {
  id: 'the-ladder',
  start: () => ({ time: 0, lit: 0, litAt: -Infinity }),
  step(state, inputs, context, emit) {
    const time = state.time + STEP
    let { lit, litAt } = state
    if (lit < LADDER.steps && time - litAt >= BETWEEN) {
      const asked = inputs.some((i) => (i.kind === 'pointer' && i.phase === 'down') || (i.kind === 'key' && i.key === 'primary' && i.down))
      if (asked || (context.gentle && lit > 0 && time - litAt >= GENTLE)) {
        lit++
        litAt = time
        emit(actor('ladder', { pose: `lit-${lit}` }, { seconds: 0.4 }))
      }
    }
    return { time, lit, litAt }
  },
  view(state): GameView {
    const live: Record<string, number> = {}
    // Each angel climbs (or comes down) the part of the ladder that is lit, fading in and out at its ends.
    const top = stepY(Math.max(0, state.lit - 1))
    const bottom = stepY(0)
    for (const a of ANGELS) {
      const t = (state.time / CLIMB + a.phase) % 1
      const y = bottom + (top - bottom) * (a.up ? t : 1 - t)
      const visible = state.lit >= a.from
      live[`actor:${a.id}.x`] = railX(y, a.up ? -1 : 1)
      live[`actor:${a.id}.y`] = y
      live[`actor:${a.id}.opacity`] = visible ? 0.9 * Math.sin(Math.PI * t) ** 0.3 : 0
    }
    const finished = state.lit === LADDER.steps
    return { live, hint: finished ? null : HINT, message: finished ? REACHED : null, done: finished && state.time - state.litAt >= SHOW }
  },
}
