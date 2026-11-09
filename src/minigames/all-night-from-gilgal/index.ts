import { ARMY, WAY } from '../../content/levels/14-joshua/episode-5'
import { STEP, type GameInput, type GameRules, type GameView, type Hint } from '../framework'

/**
 * All night from Gilgal (Level 14 script, Episode 5): pathfinding. A moonlit map of the hills
 * between Gilgal and Gibeon. The player leads Joshua's army up through the dark valleys, turn
 * by turn, to Gibeon's watch fire before the sky grows light.
 *
 * Drag the army (or steer it with the arrow keys) along the way; Space marches it on to the
 * next turn by itself. In gentle mode the army follows the way on its own.
 */

export const HINT: Hint = {
  pointer: 'Lead Joshua’s army up through the hills at night, to Gibeon’s watch fire.',
  keys: 'Or steer with the arrow keys, or press Space to march on.',
  gesture: 'drag',
}

/** How fast the army marches (in gentle mode, slower); how near a turn counts as reached; how long the end shows. */
const SPEED = 0.16
const GENTLE_SPEED = 0.12
export const NEAR = 0.04
const SHOW = 2.4

interface NightState {
  time: number
  army: { x: number; y: number }
  /** The next turn of the way to reach. */
  next: number
  target: { x: number; y: number } | null
  auto: boolean
  keys: { left: boolean; right: boolean; up: boolean; down: boolean }
  doneAt: number
}

const ARRIVED = { title: 'Before the dawn', text: '“So Joshua came upon them suddenly, having marched up all night from Gilgal.”' }

const toward = (from: { x: number; y: number }, to: { x: number; y: number }, step: number) => {
  const d = Math.hypot(to.x - from.x, to.y - from.y)
  return d <= step ? { ...to } : { x: from.x + ((to.x - from.x) / d) * step, y: from.y + ((to.y - from.y) / d) * step }
}

export const allNightFromGilgal: GameRules<NightState> = {
  id: 'all-night-from-gilgal',
  start: () => ({ time: 0, army: { ...WAY[0]! }, next: 1, target: null, auto: false, keys: { left: false, right: false, up: false, down: false }, doneAt: -1 }),
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
    const goal = WAY[next]!
    const speed = (context.gentle && !auto ? GENTLE_SPEED : SPEED) * STEP
    let army = state.army
    if (auto || context.gentle) army = toward(army, goal, speed)
    else if (keys.left || keys.right || keys.up || keys.down) army = toward(army, { x: army.x + (keys.right ? 1 : keys.left ? -1 : 0), y: army.y + (keys.down ? 1 : keys.up ? -1 : 0) }, speed)
    else if (target) army = toward(army, target, speed)
    army = { x: Math.min(0.96, Math.max(0.04, army.x)), y: Math.min(0.86, Math.max(0.14, army.y)) }
    // Each turn of the way, reached, leads on to the next.
    if (Math.hypot(army.x - goal.x, army.y - goal.y) < NEAR) {
      army = { ...goal }
      next++
      auto = false
      target = null
      if (next === WAY.length) doneAt = time
    }
    return { time, army, next: Math.min(next, WAY.length - 1), target, auto, keys, doneAt }
  },
  view(state): GameView {
    const finished = state.doneAt >= 0
    const live: Record<string, number> = {
      [`actor:${ARMY}.x`]: state.army.x,
      [`actor:${ARMY}.y`]: state.army.y,
    }
    const message = finished ? ARRIVED : { title: `Turn ${state.next} of ${WAY.length - 1}`, text: 'Up through the dark hills, toward Gibeon.' }
    return { live, hint: finished ? null : HINT, message, done: finished && state.time - state.doneAt >= SHOW }
  },
}
