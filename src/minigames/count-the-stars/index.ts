import { STARS, STAR_FIELDS } from '../../content/levels/03-abraham-father-of-faith/episode-4'
import { STEP, type GameRules, type GameView, type Hint } from '../framework'

/**
 * Count the stars (Level 3 script, Episode 4): light and reveal. "Number the stars, if you
 * are able to number them." The player taps the sky to count stars, one by one, and each
 * lights where it's tapped. Then the stars begin to appear by themselves, faster than
 * anyone could count, in fields and streams, until the Milky Way spills across the sky and
 * the count gives up: "So shall your descendants be."
 *
 * Space counts the next star: the one-button way. In gentle mode, a sweep across the sky
 * counts a star wherever it passes.
 */

export const HINT: Hint = {
  pointer: 'Count the stars: tap the sky to light each one.',
  keys: 'Or press Space to count the next star.',
  gesture: 'tap',
}

/** How many the player counts by hand before the stars run away; how long the running takes; how long the full sky shows. */
const BY_HAND = STARS.length
const RUNAWAY = 7
const FULL = 3
/** Gentle mode: how far a sweep goes for each star it counts. */
const SWEEP = 0.12

interface CountState {
  time: number
  /** The stars lit by hand, where. */
  lit: { x: number; y: number }[]
  /** When the stars began to come by themselves. */
  runawayAt: number
  /** Where a sweep last counted a star. */
  swept: { x: number; y: number } | null
}

const counting = new Map<number, { title: string; text: string; low: boolean }>()
function countMessage(n: number) {
  let m = counting.get(n)
  if (!m) {
    m = { title: 'Counting the stars', text: n.toLocaleString('en-US'), low: true }
    counting.set(n, m)
  }
  return m
}
// Shown low, so the sky above stays clear for counting.
const TOO_MANY = { title: 'Too many to count', text: '“So shall your descendants be.”', low: true }

/** How many have been counted at a moment of the runaway: faster and faster. */
const runawayCount = (t: number) => Math.floor(BY_HAND + (Math.exp(Math.min(t, RUNAWAY) * 1.35) - 1) * 0.6)

export const countTheStars: GameRules<CountState> = {
  id: 'count-the-stars',
  start: () => ({ time: 0, lit: [], runawayAt: -1, swept: null }),
  step(state, inputs, context) {
    const time = state.time + STEP
    if (state.runawayAt >= 0) return { ...state, time }
    const lit = [...state.lit]
    let { swept } = state
    const count = (at?: { x: number; y: number }) => {
      if (lit.length < BY_HAND) lit.push(at ?? STARS[lit.length]!)
    }
    for (const input of inputs) {
      if (input.kind === 'key' && input.down && input.key === 'primary') count()
      else if (input.kind === 'pointer' && input.y < 0.6) {
        if (input.phase === 'down') {
          count({ x: input.x, y: input.y })
          swept = { x: input.x, y: input.y }
        } else if (input.phase === 'move' && swept && context.gentle && Math.hypot(input.x - swept.x, input.y - swept.y) > SWEEP) {
          count({ x: input.x, y: input.y })
          swept = { x: input.x, y: input.y }
        } else if (input.phase === 'up') swept = null
      }
    }
    return { time, lit, runawayAt: lit.length >= BY_HAND ? time : -1, swept }
  },
  view(state): GameView {
    const live: Record<string, number> = {}
    STARS.forEach((at, i) => {
      const star = state.lit[i] ?? at
      live[`actor:star-${i + 1}.x`] = star.x
      live[`actor:star-${i + 1}.y`] = star.y
      live[`actor:star-${i + 1}.opacity`] = i < state.lit.length ? 1 : 0
    })
    // Running away: the fields of stars fade in one after another.
    const t = state.runawayAt >= 0 ? state.time - state.runawayAt : -1
    STAR_FIELDS.forEach((id, i) => {
      live[`layer:${id}.opacity`] = t < 0 ? 0 : Math.max(0, Math.min(1, (t - i * (RUNAWAY / STAR_FIELDS.length)) / 1.5))
    })
    const finished = t >= RUNAWAY
    const message = state.lit.length === 0 ? null : t < 0 ? countMessage(state.lit.length) : finished ? TOO_MANY : countMessage(runawayCount(t))
    return { live, hint: t < 0 ? HINT : null, message, done: finished && t >= RUNAWAY + FULL }
  },
}
