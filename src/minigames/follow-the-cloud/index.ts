import { MAP_CAMP, MAP_CLOUD, STAGES, START } from '../../content/levels/12-forty-years-in-the-wilderness/episode-1'
import { STEP, type GameInput, type GameRules, type GameView, type Hint } from '../framework'

/**
 * Follow the cloud (Level 12 script, Episode 1): pathfinding. A map of the wilderness, seen
 * from above, with the camp as a little cluster of tents and the cloud above it. When the
 * cloud lifts and moves on, the player leads the camp after it; when the camp reaches the
 * place where it settled, the tents are pitched. Sometimes the cloud stays a night,
 * sometimes many days, and the camp stays too. After four stages, it settles in the
 * wilderness of Paran.
 *
 * Drag the camp (or steer it with the arrow keys) after the cloud; Space sets out after it
 * by itself. In gentle mode the camp follows the cloud on its own.
 */

export const HINT: Hint = {
  pointer: 'The cloud has lifted: lead the camp after it, to where it settles.',
  keys: 'Or steer with the arrow keys, or press Space to follow it.',
  gesture: 'drag',
}

/** How fast the cloud and the camp move (frame widths a second); how near counts as there; how long the cloud stays; how long the end shows. */
const CLOUD_SPEED = 0.18
const SPEED = 0.16
const GENTLE_SPEED = 0.12
export const NEAR = 0.04
const STAY = 2.2
const SHOW = 2.4
/** Where the cloud hangs above the place it settles. */
const ABOVE = 0.08

interface CloudState {
  time: number
  /** Which stage the cloud is going to (or resting at). */
  stage: number
  /** Whether the camp has pitched its tents under the cloud at this stage, and when. */
  pitched: boolean
  pitchedAt: number
  cloud: { x: number; y: number }
  camp: { x: number; y: number }
  target: { x: number; y: number } | null
  auto: boolean
  keys: { left: boolean; right: boolean; up: boolean; down: boolean }
  doneAt: number
}

const PITCHED = STAGES.map((s, i) => ({ title: `Stage ${i + 1} of ${STAGES.length}`, text: `The cloud settled, and they pitched their tents. It stayed ${s.days}.` }))
const PARAN = { title: 'The wilderness of Paran', text: '“At the command of the LORD they encamped, and at the command of the LORD they set out.”' }

const toward = (from: { x: number; y: number }, to: { x: number; y: number }, step: number) => {
  const d = Math.hypot(to.x - from.x, to.y - from.y)
  return d <= step ? { ...to } : { x: from.x + ((to.x - from.x) / d) * step, y: from.y + ((to.y - from.y) / d) * step }
}

export const followTheCloud: GameRules<CloudState> = {
  id: 'follow-the-cloud',
  start: () => ({
    time: 0,
    stage: 0,
    pitched: false,
    pitchedAt: -Infinity,
    cloud: { x: START.x, y: START.y - ABOVE },
    camp: { ...START },
    target: null,
    auto: false,
    keys: { left: false, right: false, up: false, down: false },
    doneAt: -1,
  }),
  step(state, inputs: readonly GameInput[], context) {
    const time = state.time + STEP
    if (state.doneAt >= 0) return { ...state, time }
    let { stage, pitched, pitchedAt, target, auto, doneAt } = state
    const keys = { ...state.keys }
    for (const input of inputs) {
      if (input.kind === 'pointer' && input.phase !== 'up') target = { x: input.x, y: input.y }
      else if (input.kind === 'key') {
        if (input.key === 'primary') {
          if (input.down) auto = true
        } else keys[input.key] = input.down
      }
    }
    // When the cloud has stayed its time, it lifts and moves on to the next stage.
    if (pitched && time - pitchedAt >= STAY && stage < STAGES.length - 1) {
      stage++
      pitched = false
      auto = false
      target = null
    }
    const goal = STAGES[stage]!
    const cloud = toward(state.cloud, { x: goal.x, y: goal.y - ABOVE }, CLOUD_SPEED * STEP)
    let camp = state.camp
    if (!pitched) {
      const speed = (context.gentle && !auto ? GENTLE_SPEED : SPEED) * STEP
      if (auto || context.gentle) camp = toward(camp, goal, speed)
      else if (keys.left || keys.right || keys.up || keys.down) camp = toward(camp, { x: camp.x + (keys.right ? 1 : keys.left ? -1 : 0), y: camp.y + (keys.down ? 1 : keys.up ? -1 : 0) }, speed)
      else if (target) camp = toward(camp, target, speed)
      camp = { x: Math.min(0.96, Math.max(0.04, camp.x)), y: Math.min(0.78, Math.max(0.2, camp.y)) }
      // Under the cloud, once it has settled, the tents go up.
      const settled = cloud.x === goal.x && cloud.y === goal.y - ABOVE
      if (settled && Math.hypot(camp.x - goal.x, camp.y - goal.y) < NEAR) {
        camp = { x: goal.x, y: goal.y }
        pitched = true
        pitchedAt = time
        if (stage === STAGES.length - 1) doneAt = time
      }
    }
    return { time, stage, pitched, pitchedAt, cloud, camp, target, auto, keys, doneAt }
  },
  view(state): GameView {
    const finished = state.doneAt >= 0
    const live: Record<string, number> = {
      [`actor:${MAP_CAMP}.x`]: state.camp.x,
      [`actor:${MAP_CAMP}.y`]: state.camp.y,
      [`actor:${MAP_CLOUD}.x`]: state.cloud.x,
      [`actor:${MAP_CLOUD}.y`]: state.cloud.y,
    }
    const message = finished ? PARAN : state.pitched ? PITCHED[state.stage]! : null
    return { live, hint: finished || state.pitched ? null : HINT, message, done: finished && state.time - state.doneAt >= SHOW }
  },
}
