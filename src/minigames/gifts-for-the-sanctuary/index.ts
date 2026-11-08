import { GIFTS, HEAP } from '../../content/levels/11-the-tabernacle-and-the-holy-life/episode-1'
import { lerp } from '../../engine/motion'
import { STEP, type GameInput, type GameRules, type GameView, type Hint } from '../framework'

/**
 * Gifts for the sanctuary (Level 11 script, Episode 1): herding and gathering. The workshop,
 * with a row of empty places for everything on God's list (Exodus 25:3–7), and the people
 * bringing their gifts from the tents. The player brings each gift to its place, and its use
 * is shown. When every place is filled, the people go on coming, and the heap grows past
 * the list: "much more than enough."
 *
 * Tap a gift (or drag it) to bring it to its place, or press Space for the next. In gentle
 * mode a tap anywhere brings the nearest gift.
 */

export const HINT: Hint = {
  pointer: 'Bring each gift to its place in the workshop: tap it.',
  keys: 'Or press Space for the next gift.',
  gesture: 'tap',
}

/** How near a tap must be; how long a gift takes to reach its place; how long words show; how long the heap grows; how long the end shows. */
const NEAR = 0.06
export const CARRY = 0.7
const WORDS = 1.6
const GROW = 3
const SHOW = 2.6

interface GiftsState {
  time: number
  /** When each gift was brought, or -1 while it waits. */
  broughtAt: number[]
  count: number
  lastAt: number
  doneAt: number
}

const BROUGHT = GIFTS.map((g) => ({ title: g.name, text: g.use }))
const ENOUGH = { title: 'Much more than enough', text: '“The people bring much more than enough for doing the work.”' }

/** Which waiting gift a tap lands on (in gentle mode, the nearest), or -1. */
function giftAt(broughtAt: number[], x: number, y: number, gentle: boolean): number {
  let best = -1
  let bestD = Infinity
  GIFTS.forEach((g, i) => {
    if (broughtAt[i]! >= 0) return
    const d = Math.hypot(g.from.x - x, g.from.y - 0.015 - y)
    if (d < bestD && (gentle || d < NEAR)) {
      best = i
      bestD = d
    }
  })
  return best
}

const ease = (t: number) => t * t * (3 - 2 * t)

export const giftsForTheSanctuary: GameRules<GiftsState> = {
  id: 'gifts-for-the-sanctuary',
  start: () => ({ time: 0, broughtAt: GIFTS.map(() => -1), count: 0, lastAt: -Infinity, doneAt: -1 }),
  step(state, inputs: readonly GameInput[], context) {
    const time = state.time + STEP
    if (state.doneAt >= 0) return { ...state, time }
    const broughtAt = [...state.broughtAt]
    let { count, lastAt, doneAt } = state
    for (const input of inputs) {
      let which = -1
      if (input.kind === 'key' && input.key === 'primary' && input.down) which = broughtAt.indexOf(-1)
      else if (input.kind === 'pointer' && input.phase === 'down') which = giftAt(broughtAt, input.x, input.y, context.gentle)
      if (which < 0) continue
      broughtAt[which] = time
      lastAt = time
      count++
      if (count === GIFTS.length) doneAt = time
    }
    return { time, broughtAt, count, lastAt, doneAt }
  },
  view(state): GameView {
    const live: Record<string, number> = {}
    GIFTS.forEach((g, i) => {
      const at = state.broughtAt[i]!
      const t = at < 0 ? 0 : ease(Math.min(1, (state.time - at) / CARRY))
      live[`actor:${g.id}.x`] = lerp(g.from.x, g.to.x, t)
      live[`actor:${g.id}.y`] = lerp(g.from.y, g.to.y, t)
      live[`actor:${g.id}.opacity`] = 1
      live[`actor:${g.place}.opacity`] = 0.45 * (1 - t)
    })
    const finished = state.doneAt >= 0
    // When the list is full, the people go on bringing, and the heap grows.
    const growing = finished ? ease(Math.min(1, Math.max(0, state.time - state.doneAt - CARRY) / GROW)) : 0
    live[`actor:${HEAP.id}.size`] = lerp(HEAP.from, HEAP.to, growing)
    live[`actor:${HEAP.id}.opacity`] = finished ? Math.min(1, (state.time - state.doneAt) / CARRY) : 0
    const telling = state.count > 0 && state.time - state.lastAt < WORDS
    const message = finished && state.time - state.doneAt >= WORDS ? ENOUGH : telling ? BROUGHT[state.broughtAt.indexOf(state.lastAt)]! : null
    return { live, hint: finished ? null : HINT, message, done: finished && state.time - state.doneAt >= CARRY + GROW + SHOW }
  },
}
