import { DAY_THREE_PLANTS } from '../../content/levels/01-creation-and-fall/episode-1'
import { projectPoint } from '../../scene/evaluate'
import { STEP, type GameRules } from '../framework'
import { HINTS, outCubic, toward } from './shared'

/**
 * Day three, second part: tap the land and green spreads there. Each tap makes the
 * nearest plants spring up; after three taps the whole land is green. Space grows them
 * from left to right instead.
 */

/** How long a plant takes to grow, in seconds. */
const GROWING = 1.6

interface State {
  /** Seconds since each plant began to grow, or -1. */
  growing: Record<string, number>
  grass: number
}

export const plants: GameRules<State> = {
  id: 'plants',
  start: () => ({ growing: Object.fromEntries(DAY_THREE_PLANTS.map((id) => [id, -1])), grass: 0 }),
  step(state, inputs, context) {
    const growing = { ...state.growing }
    const waiting = () => DAY_THREE_PLANTS.filter((id) => growing[id]! < 0)
    const perTap = context.gentle ? 3 : 2
    for (const input of inputs) {
      if (input.kind === 'pointer' && input.phase === 'down') {
        // The plants nearest the tap, as they appear on screen.
        const frame = context.frame()
        const distance = (id: string) => {
          const a = frame.actors.find((actor) => actor.id === id)
          if (!a) return Infinity
          const p = projectPoint(a.x, a.y, a.depth, frame.camera)
          return Math.hypot(p.x - input.x, (p.y - input.y) * 0.5)
        }
        for (const id of waiting().sort((a, b) => distance(a) - distance(b)).slice(0, perTap)) growing[id] = 0
      } else if (input.kind === 'key' && input.down) {
        for (const id of waiting().slice(0, perTap)) growing[id] = 0
      }
    }
    let started = 0
    for (const id of DAY_THREE_PLANTS) {
      if (growing[id]! >= 0) {
        growing[id] = growing[id]! + STEP
        started++
      }
    }
    return { growing, grass: toward(state.grass, started / DAY_THREE_PLANTS.length, STEP / 1.2) }
  },
  view(state) {
    const live: Record<string, number> = { 'layer:grass.opacity': state.grass }
    for (const id of DAY_THREE_PLANTS) live[`actor:${id}.grow`] = state.growing[id]! < 0 ? 0 : outCubic(state.growing[id]! / GROWING)
    const all = DAY_THREE_PLANTS.every((id) => state.growing[id]! >= GROWING)
    const none = DAY_THREE_PLANTS.every((id) => state.growing[id]! < 0)
    return { live, hint: none ? HINTS.plants : null, done: all && state.grass >= 0.999 }
  },
}
