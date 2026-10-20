import { PIECES } from '../../content/levels/04-isaac-and-jacob/episode-2'
import { actor } from '../../scene/build'
import { STEP, type GameRules, type GameView, type Hint } from '../framework'

/**
 * What is it worth? (Level 4 script, Episode 2): a quiet interaction, weighing. A pair of
 * golden scales: on one pan the steaming bowl of stew, heavy to a hungry man. The player
 * places on the other pan, one by one, what the birthright really meant: a double share,
 * the headship of the family, the blessing of Abraham, God's promise of a land and a great
 * nation, the line of the Savior. With each the scales tip further, until the stew flies up,
 * light as nothing.
 *
 * A tap anywhere (or Space) places the next piece, and its name shows for a moment. In
 * gentle mode the pieces float to the pan by themselves, one after another.
 */

export const HINT: Hint = {
  pointer: 'Tap to place on the scales, one by one, what the birthright meant.',
  keys: 'Or press Space to place the next.',
  gesture: 'tap',
}

/** How long each piece's name shows before the next can be placed, and how long the end shows. */
const SHOW = 1.6
const END = 2.6
/** In gentle mode, how long before the next piece places itself. */
const GENTLE = 2.4

interface WeighState {
  time: number
  placed: number
  placedAt: number
}

const PLACED = PIECES.map((p) => ({ title: p.title, text: p.text }))
const LIGHT = { title: 'Light as nothing', text: 'All this, against a single meal.' }

export const whatIsItWorth: GameRules<WeighState> = {
  id: 'what-is-it-worth',
  start: () => ({ time: 0, placed: 0, placedAt: -Infinity }),
  step(state, inputs, context, emit) {
    const time = state.time + STEP
    let { placed, placedAt } = state
    if (placed < PIECES.length && time - placedAt >= SHOW) {
      const asked = inputs.some((i) => (i.kind === 'pointer' && i.phase === 'down') || (i.kind === 'key' && i.key === 'primary' && i.down))
      const waited = context.gentle && time - Math.max(0, placedAt) >= GENTLE
      if (asked || waited) {
        placed++
        placedAt = time
        emit(actor('scales', { pose: `tip-${placed}` }, { seconds: 0.9, ease: 'inOutSine' }))
      }
    }
    return { time, placed, placedAt }
  },
  view(state): GameView {
    const finished = state.placed === PIECES.length
    const showing = state.placed > 0 && state.time - state.placedAt < SHOW
    const message = finished && !showing ? LIGHT : showing ? PLACED[state.placed - 1]! : null
    return { live: {}, hint: finished ? null : HINT, message, done: finished && state.time - state.placedAt >= SHOW + END }
  },
}
