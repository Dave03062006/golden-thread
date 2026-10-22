import { BLESSINGS, SUN, glowOf } from '../../content/levels/06-job/episode-1'
import { lerp } from '../../engine/motion'
import { STEP, type GameRules, type GameView, type Hint } from '../framework'

/**
 * Job's blessings (Level 6 script, Episode 1): light and reveal. Dawn over Job's lands,
 * still dim. The player taps each of Job's blessings to light it, one by one: his seven
 * sons, his three daughters, his sheep, his camels, his oxen, his donkeys, his servants.
 * As each glows, a soft word of thanks rises, the way Job thanked God each morning. When
 * everything is lit, the sun rises.
 *
 * Tap a blessing to light it, or press Space to light the next. In gentle mode the next
 * blessing glows, and lights itself after a moment.
 */

export const HINT: Hint = {
  pointer: 'Tap each of Job’s blessings to light it in the dawn.',
  keys: 'Or press Space to light the next.',
  gesture: 'tap',
}

/** A moment before the first blessing lights itself in gentle mode, and how long a blessing's word of thanks (and its flash of light) shows. */
const DAWN = 1.5
const THANKS = 2
/** Gentle mode: how long before the next blessing lights itself. */
const AUTO = 2.6
/** How long the sunrise takes, and how long it shows before the story goes on. */
const SUNRISE = 2
const SHOW = 2.2

interface BlessingsState {
  time: number
  /** When each blessing was lit, or -1. */
  litAt: number[]
  /** The one lit last. */
  last: number
  doneAt: number
}

const THANKED = BLESSINGS.map((b) => ({ title: b.title, text: b.thanks }))
const SUNRISE_WORDS = { title: 'Every good gift', text: 'All that Job had came from God, and Job thanked him for it.' }

/** Which blessing a tap lands on, or -1. */
function blessingAt(x: number, y: number): number {
  return BLESSINGS.findIndex((b) => Math.abs(x - b.x) < b.spread / 2 + 0.04 && y > b.y - 0.1 && y < b.y + 0.03)
}

export const jobsBlessings: GameRules<BlessingsState> = {
  id: 'jobs-blessings',
  start: () => ({ time: 0, litAt: BLESSINGS.map(() => -1), last: -1, doneAt: -1 }),
  step(state, inputs, context) {
    const time = state.time + STEP
    if (state.doneAt >= 0) return { ...state, time }
    const litAt = [...state.litAt]
    let { last } = state
    const next = litAt.indexOf(-1)
    const light = (i: number) => {
      if (i < 0 || litAt[i]! >= 0) return
      litAt[i] = time
      last = i
    }
    for (const input of inputs) {
      if (input.kind === 'key' && input.key === 'primary' && input.down) light(litAt.indexOf(-1))
      else if (input.kind === 'pointer' && input.phase === 'down') light(blessingAt(input.x, input.y))
    }
    // Gentle mode: the next one lights itself after a moment.
    const lastLit = Math.max(DAWN, ...state.litAt)
    if (context.gentle && next >= 0 && litAt[next]! < 0 && time - lastLit >= AUTO) light(next)
    const doneAt = litAt.every((t) => t >= 0) ? time : -1
    return { time, litAt, last, doneAt }
  },
  view(state, context): GameView {
    const live: Record<string, number> = {}
    const lit = state.litAt.filter((t) => t >= 0).length
    const finished = state.doneAt >= 0
    const rise = finished ? Math.min(1, (state.time - state.doneAt) / SUNRISE) : 0
    // Each blessing flashes with light as it is lit, the light fading as its word of thanks
    // rises.
    BLESSINGS.forEach((b, i) => {
      const at = state.litAt[i]!
      live[`actor:${glowOf(b.id)}.opacity`] = at < 0 ? 0 : Math.max(0, 1 - (state.time - at) / THANKS) * Math.min(1, (state.time - at) / 0.3)
    })
    const since = state.last < 0 ? Infinity : state.time - state.litAt[state.last]!
    // Gentle mode: the next one glows.
    const next = state.litAt.indexOf(-1)
    const toGlow = BLESSINGS[next < 0 ? 0 : next]!
    live['actor:next-glow.x'] = toGlow.x
    live['actor:next-glow.y'] = toGlow.y - 0.04
    live['actor:next-glow.opacity'] = context.gentle && next >= 0 ? 0.6 + 0.2 * Math.sin(state.time * Math.PI * 1.6) : 0
    // The sun climbs a little with each blessing, and rises when all are lit.
    const before = SUN.low - (lit / BLESSINGS.length) * 0.08
    live['actor:sun.y'] = lerp(before, SUN.high, rise)
    live['layer:forest-sky.opacity'] = rise
    // The last word of thanks shows in full, then the words of the sunrise.
    const message = since < THANKS ? THANKED[state.last]! : finished ? SUNRISE_WORDS : null
    return { live, hint: finished ? null : HINT, message, done: finished && state.time - state.doneAt >= THANKS + SHOW }
  },
}
