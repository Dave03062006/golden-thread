import { STEP, type GameInput, type GameRules, type GameView, type Hint } from './framework'

/**
 * A play of leading someone along a way on a map, turn by turn (spec §13.7, kinds 6 and 15).
 * Drag the one being led (or steer with the arrow keys); Space goes on to the next turn by
 * itself. In gentle mode it follows the way on its own. Level 14 marches Joshua's army up to
 * Gibeon this way, and Level 15 traces the way Israel came, as Jephthah told it.
 */

export interface AlongTheWay {
  id: string
  /** The turns of the way, in frame coordinates, from where it starts. */
  way: readonly { x: number; y: number }[]
  /** The actor that is led. */
  actor: string
  hint: Hint
  /** What shows while the turn `next` is still to reach. */
  leg: (next: number) => { title: string; text: string }
  /** What shows at the end. */
  arrived: { title: string; text: string }
}

/** How fast it goes (in gentle mode, slower); how near a turn counts as reached; how long the end shows. */
const SPEED = 0.16
const GENTLE_SPEED = 0.12
export const NEAR = 0.04
const SHOW = 2.4

interface WayState {
  time: number
  at: { x: number; y: number }
  /** The next turn of the way to reach. */
  next: number
  target: { x: number; y: number } | null
  auto: boolean
  keys: { left: boolean; right: boolean; up: boolean; down: boolean }
  doneAt: number
}

const toward = (from: { x: number; y: number }, to: { x: number; y: number }, step: number) => {
  const d = Math.hypot(to.x - from.x, to.y - from.y)
  return d <= step ? { ...to } : { x: from.x + ((to.x - from.x) / d) * step, y: from.y + ((to.y - from.y) / d) * step }
}

export function alongTheWay(config: AlongTheWay): GameRules<WayState> {
  const { way } = config
  return {
    id: config.id,
    start: () => ({ time: 0, at: { x: way[0]!.x, y: way[0]!.y }, next: 1, target: null, auto: false, keys: { left: false, right: false, up: false, down: false }, doneAt: -1 }),
    step(state, inputs: readonly GameInput[], context) {
      const time = state.time + STEP
      if (state.doneAt >= 0) return { ...state, time }
      let { next, target, auto, doneAt } = state
      const keys = { ...state.keys }
      for (const input of inputs) {
        if (input.kind === 'pointer' && input.phase !== 'up') target = { x: input.x, y: input.y }
        else if (input.kind === 'key') {
          if (input.key === 'primary') {
            if (input.down) auto = true
          } else keys[input.key] = input.down
        }
      }
      const goal = way[next]!
      const speed = (context.gentle && !auto ? GENTLE_SPEED : SPEED) * STEP
      let at = state.at
      if (auto || context.gentle) at = toward(at, goal, speed)
      else if (keys.left || keys.right || keys.up || keys.down) at = toward(at, { x: at.x + (keys.right ? 1 : keys.left ? -1 : 0), y: at.y + (keys.down ? 1 : keys.up ? -1 : 0) }, speed)
      else if (target) at = toward(at, target, speed)
      at = { x: Math.min(0.96, Math.max(0.04, at.x)), y: Math.min(0.86, Math.max(0.14, at.y)) }
      // Each turn of the way, reached, leads on to the next.
      if (Math.hypot(at.x - goal.x, at.y - goal.y) < NEAR) {
        at = { x: goal.x, y: goal.y }
        next++
        auto = false
        target = null
        if (next === way.length) doneAt = time
      }
      return { time, at, next: Math.min(next, way.length - 1), target, auto, keys, doneAt }
    },
    view(state): GameView {
      const finished = state.doneAt >= 0
      const live: Record<string, number> = { [`actor:${config.actor}.x`]: state.at.x, [`actor:${config.actor}.y`]: state.at.y }
      return { live, hint: finished ? null : config.hint, message: finished ? config.arrived : config.leg(state.next), done: finished && state.time - state.doneAt >= SHOW }
    },
  }
}
