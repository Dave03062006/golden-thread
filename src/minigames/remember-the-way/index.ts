import { STOPS, TOKEN } from '../../content/levels/13-moses-last-words/episode-1'
import { lerp } from '../../engine/motion'
import { STEP, type GameInput, type GameRules, type GameView, type Hint } from '../framework'

/**
 * Remember the way (Level 13 script, Episode 1): courier routes. A map of the whole journey,
 * from Egypt to the plains of Moab. The player carries Moses' memory along the road, stop by
 * stop, and at each one a picture lights up with a few words of what God did there: the
 * Passover, the sea, the manna, Sinai, the water from the rock, the bronze serpent, and at
 * last the plains of Moab. When the road is finished, the whole way shines.
 *
 * Tap the next stop (or press Space) to carry the memory there. In gentle mode the memory
 * moves on by itself, and a tap anywhere lights the next picture.
 */

export const HINT: Hint = {
  pointer: 'Carry Moses’ memory along the road: tap the next stop.',
  keys: 'Or press Space for the next.',
  gesture: 'tap',
}

/** How near a tap must be; how long the memory takes between stops; how long each picture's words show before it can go on; how long the end shows. */
const NEAR = 0.07
export const TRAVEL = 1.2
const WORDS = 2
const SHOW = 2.4

interface WayState {
  time: number
  /** The stop the memory has reached, or is going to. */
  at: number
  movedAt: number
  doneAt: number
}

const REMEMBERED = STOPS.map((s) => ({ title: s.place, text: s.text }))
const ALL = { title: 'All the way', text: '“Remember all the way which the LORD your God has led you these forty years.”' }

export const rememberTheWay: GameRules<WayState> = {
  id: 'remember-the-way',
  // The memory starts in Egypt, and the first picture is lit at once.
  start: () => ({ time: 0, at: 0, movedAt: -TRAVEL, doneAt: -1 }),
  step(state, inputs: readonly GameInput[], context) {
    const time = state.time + STEP
    if (state.doneAt >= 0) return { ...state, time }
    let { at, movedAt, doneAt } = state
    // The memory goes on only once the words at this stop have been shown.
    const ready = time - movedAt >= TRAVEL + WORDS
    const next = STOPS[at + 1]
    if (next && ready) {
      const asked = context.gentle || inputs.some((i) => (i.kind === 'key' && i.key === 'primary' && i.down) || (i.kind === 'pointer' && i.phase === 'down' && Math.hypot(next.x - i.x, next.y - i.y) < NEAR))
      if (asked) {
        at++
        movedAt = time
        if (at === STOPS.length - 1) doneAt = time
      }
    }
    return { time, at, movedAt, doneAt }
  },
  view(state): GameView {
    const t = Math.min(1, (state.time - state.movedAt) / TRAVEL)
    const from = STOPS[Math.max(0, state.at - 1)]!
    const to = STOPS[state.at]!
    const live: Record<string, number> = {
      [`actor:${TOKEN}.x`]: lerp(from.x, to.x, t),
      [`actor:${TOKEN}.y`]: lerp(from.y, to.y, t),
    }
    // Each picture lights as the memory arrives at its stop.
    STOPS.forEach((s, i) => (live[`actor:${s.id}.opacity`] = i < state.at ? 1 : i === state.at ? t : 0))
    const finished = state.doneAt >= 0
    const arrived = t === 1 && state.time - state.movedAt < TRAVEL + WORDS
    const message = arrived ? REMEMBERED[state.at]! : finished && t === 1 ? ALL : null
    return { live, hint: finished ? null : HINT, message, done: finished && state.time - state.doneAt >= TRAVEL + WORDS + SHOW }
  },
}
