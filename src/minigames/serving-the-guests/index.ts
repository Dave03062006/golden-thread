import { DISHES } from '../../content/levels/03-abraham-father-of-faith/episode-7'
import { STEP, type GameRules, type GameView, type Hint } from '../framework'

/**
 * Serving the guests (Level 3 script, Episode 7): serving and distributing. Abraham
 * hurries to make his three guests welcome. The player carries each thing to the mat in
 * the shade before them, in turn: water for their feet, the cakes, the calf, the curds and
 * milk. Each one set down brings a few words. Nothing is lost by being slow; the guests
 * wait kindly.
 *
 * Drag a dish to its place on the mat, or tap it and it's carried there; Space carries the
 * next one: the one-button way. In gentle mode the next dish glows, and one tap does.
 */

export const HINT: Hint = {
  pointer: 'Bring each thing to the mat in the shade before the guests: drag it there, or tap it.',
  keys: 'Or press Space to bring the next one.',
  gesture: 'drag',
}

/** How close to its place a dish must be let go; how fast a dish is carried; how far a tap may move. */
const NEAR = 0.08
const CARRY = 0.5
const TAP = 0.02
/** How long each dish's words show. */
const WORDS = 2.4

interface ServeState {
  time: number
  /** The dish being served now (those before it are on the mat). */
  index: number
  at: { x: number; y: number }
  drag: { px: number; py: number; x: number; y: number; moved: number } | null
  carrying: boolean
  servedAt: number
  doneAt: number
}

const SERVED = DISHES.map((d) => ({ title: d.title, text: d.text }))

export const servingTheGuests: GameRules<ServeState> = {
  id: 'serving-the-guests',
  start: () => ({ time: 0, index: 0, at: { ...DISHES[0]!.from }, drag: null, carrying: false, servedAt: -Infinity, doneAt: -1 }),
  step(state, inputs) {
    const time = state.time + STEP
    if (state.doneAt >= 0) return { ...state, time }
    let { index, drag, carrying, servedAt, doneAt } = state
    const at = { ...state.at }
    const dish = DISHES[index]!

    const serve = () => {
      index++
      servedAt = time
      drag = null
      carrying = false
      if (index >= DISHES.length) doneAt = time
      else Object.assign(at, DISHES[index]!.from)
    }

    for (const input of inputs) {
      if (input.kind === 'pointer') {
        if (input.phase === 'down' && Math.hypot(input.x - at.x, input.y - at.y) < 0.1) drag = { px: input.x, py: input.y, x: at.x, y: at.y, moved: 0 }
        else if (input.phase === 'move' && drag) {
          at.x = drag.x + (input.x - drag.px)
          at.y = drag.y + (input.y - drag.py)
          drag.moved = Math.max(drag.moved, Math.hypot(input.x - drag.px, input.y - drag.py))
        } else if (input.phase === 'up' && drag) {
          if (drag.moved < TAP) {
            // A tap: the dish is carried to its place.
            carrying = true
            drag = null
          } else if (Math.hypot(at.x - dish.to.x, at.y - dish.to.y) < NEAR) serve()
          else {
            Object.assign(at, dish.from)
            drag = null
          }
        }
      } else if (input.kind === 'key' && input.down && input.key === 'primary') carrying = true
    }

    if (carrying && index < DISHES.length) {
      const d = Math.hypot(dish.to.x - at.x, dish.to.y - at.y)
      if (d <= CARRY * STEP) {
        Object.assign(at, dish.to)
        serve()
      } else {
        at.x += ((dish.to.x - at.x) / d) * CARRY * STEP
        at.y += ((dish.to.y - at.y) / d) * CARRY * STEP
      }
    }
    return { time, index, at, drag, carrying, servedAt, doneAt }
  },
  view(state, context): GameView {
    const live: Record<string, number> = {}
    DISHES.forEach((d, i) => {
      const where = i < state.index ? d.to : i === state.index ? state.at : d.from
      live[`actor:${d.id}.x`] = where.x
      live[`actor:${d.id}.y`] = where.y
    })
    const next = DISHES[Math.min(state.index, DISHES.length - 1)]!
    live['actor:dish-glow.x'] = state.index < DISHES.length ? state.at.x : next.to.x
    live['actor:dish-glow.y'] = (state.index < DISHES.length ? state.at.y : next.to.y) - 0.03
    live['actor:dish-glow.opacity'] = context.gentle && state.index < DISHES.length ? 0.7 + 0.2 * Math.sin(state.time * Math.PI * 2 * 0.8) : 0
    const finished = state.doneAt >= 0
    const saying = state.index > 0 && state.time - state.servedAt < WORDS ? SERVED[state.index - 1]! : null
    return { live, hint: finished ? null : HINT, message: saying, done: finished && state.time - state.doneAt >= WORDS }
  },
}
