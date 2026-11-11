import { CHAFF, CLEAN } from '../../content/levels/16-ruth/episode-4'
import { STEP, type GameInput, type GameRules, type GameView, type Hint } from '../framework'

/**
 * Winnowing (Level 16 script, Episode 4): timing. The threshing floor at evening. The wind comes
 * in gusts from the sea, and the player tosses the grain while it blows: the chaff flies away
 * and the clean barley falls back on the heap. A toss in still air does nothing; just wait for
 * the next gust.
 *
 * Tap (or press Space) while the wind blows. In gentle mode the wind blows on until the toss.
 */

export const HINT: Hint = {
  pointer: 'Toss the barley while the wind blows: tap when the breeze comes.',
  keys: 'Or press Space.',
  gesture: 'tap',
}

/** How many good tosses clean the heap; how long a gust lasts and the stillness between; how long the end shows. */
export const TOSSES = 6
export const GUST = 1.6
export const STILL = 1
const SHOW = 2.4

interface WinnowState {
  time: number
  tosses: number
  /** When the next gust begins (or began). */
  gustAt: number
  lastToss: number
  doneAt: number
}

const CLEANED = { title: 'Clean barley', text: '“See, he is winnowing barley tonight at the threshing floor.”' }

export const winnowing: GameRules<WinnowState> = {
  id: 'winnowing',
  start: () => ({ time: 0, tosses: 0, gustAt: STILL, lastToss: -Infinity, doneAt: -1 }),
  step(state, inputs: readonly GameInput[], context) {
    const time = state.time + STEP
    if (state.doneAt >= 0) return { ...state, time }
    let { tosses, gustAt, lastToss, doneAt } = state
    const blowing = time >= gustAt && (context.gentle || time < gustAt + GUST)
    for (const input of inputs) {
      const tap = (input.kind === 'key' && input.key === 'primary' && input.down) || (input.kind === 'pointer' && input.phase === 'down')
      if (!tap || !blowing) continue
      tosses++
      lastToss = time
      gustAt = time + STILL
      if (tosses === TOSSES) doneAt = time
      break
    }
    // A gust that passes without a toss comes again, after a moment of stillness.
    if (!context.gentle && doneAt < 0 && time >= gustAt + GUST) gustAt = time + STILL
    return { time, tosses, gustAt, lastToss, doneAt }
  },
  view(state, context): GameView {
    const finished = state.doneAt >= 0
    const flying = Math.max(0, 1 - (state.time - state.lastToss) / 0.8)
    const live: Record<string, number> = {
      [`actor:${CLEAN}.opacity`]: finished ? 1 : 0.3 + (0.7 * state.tosses) / TOSSES,
      [`actor:${CHAFF}.opacity`]: finished ? 0 : flying * 0.8,
    }
    const blowing = state.time >= state.gustAt && (context.gentle || state.time < state.gustAt + GUST)
    const message = finished ? CLEANED : { title: blowing ? 'The wind is blowing' : 'The air is still…', text: `${state.tosses} of ${TOSSES} tosses.` }
    return { live, hint: finished ? null : HINT, message, done: finished && state.time - state.doneAt >= SHOW }
  },
}
