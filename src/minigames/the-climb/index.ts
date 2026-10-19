import { CLIMB, ISAAC_BEHIND, WOOD_ON } from '../../content/levels/03-abraham-father-of-faith/episode-10'
import { actor } from '../../scene/build'
import { STEP, type GameRules, type GameView, type Hint } from '../framework'

/**
 * The climb (Level 3 script, Episode 10): a quiet play, like "walk with God." The player
 * holds to walk father and son up the steep path together, Isaac carrying the wood. The
 * path is long and the steps are slow. Halfway up, they stop to rest.
 *
 * Hold the pointer or Space to walk; one press walks a few steps. In gentle mode, once
 * started, the walk goes on by itself.
 */

export const HINT: Hint = {
  pointer: 'Hold to walk father and son up the mountain path together.',
  keys: 'Or hold Space; each press walks a few steps.',
  gesture: 'hold',
}

/** How fast they climb, along the path (from 0 to 1) a second; how long one press walks. */
const PACE = 0.075
const BURST = 0.8
/** How long they stand before the story goes on. */
const REST = 1

interface ClimbState {
  time: number
  /** How far along the path, from 0 to 1. */
  along: number
  holding: boolean
  /** Seconds of walking left from a press. */
  burst: number
  started: boolean
  walking: boolean
  doneAt: number
}

/** A point along the path, from 0 (the foot) to 1 (where they rest). */
export function onPath(t: number): { x: number; y: number } {
  const span = (CLIMB.length - 1) * Math.max(0, Math.min(1, t))
  const i = Math.min(CLIMB.length - 2, Math.floor(span))
  const f = span - i
  const a = CLIMB[i]!
  const b = CLIMB[i + 1]!
  return { x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f }
}

/** How far along the path Isaac is: a little behind his father. */
const isaacAlong = (t: number) => t - ISAAC_BEHIND / 0.4

export const theClimb: GameRules<ClimbState> = {
  id: 'the-climb',
  start: () => ({ time: 0, along: 0, holding: false, burst: 0, started: false, walking: false, doneAt: -1 }),
  step(state, inputs, context, emit) {
    const time = state.time + STEP
    if (state.doneAt >= 0) return { ...state, time }
    let { along, holding, burst, started, walking, doneAt } = state
    for (const input of inputs) {
      const down = (input.kind === 'key' && input.key === 'primary' && input.down) || (input.kind === 'pointer' && input.phase === 'down')
      const up = (input.kind === 'key' && input.key === 'primary' && !input.down) || (input.kind === 'pointer' && input.phase === 'up')
      if (down) {
        holding = true
        burst = BURST
        started = true
      } else if (up) holding = false
    }
    const moving = holding || burst > 0 || (context.gentle && started)
    burst = Math.max(0, burst - STEP)
    if (moving) along = Math.min(1, along + PACE * STEP)
    // Walking or standing: the pose changes when the walk starts or stops.
    const nowWalking = moving && along < 1
    if (nowWalking !== walking) {
      for (const id of ['abraham', 'isaac']) emit(actor(id, { pose: nowWalking ? 'walk' : 'idle' }, { seconds: 0.3 }))
      walking = nowWalking
    }
    if (along >= 1) doneAt = time
    return { time, along, holding, burst, started, walking, doneAt }
  },
  view(state): GameView {
    const father = onPath(state.along)
    const son = onPath(isaacAlong(state.along))
    const isaacY = son.y + 0.01 + (state.along >= 1 ? 0.025 : 0)
    const live = {
      'actor:abraham.x': father.x,
      'actor:abraham.y': father.y,
      'actor:isaac.x': son.x,
      'actor:isaac.y': isaacY,
      'actor:wood.x': son.x + WOOD_ON.x,
      'actor:wood.y': isaacY + WOOD_ON.y,
    }
    const finished = state.doneAt >= 0
    return { live, hint: finished ? null : HINT, done: finished && state.time - state.doneAt >= REST }
  },
}
