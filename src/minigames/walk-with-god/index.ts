import { CROWDS, WALK } from '../../content/levels/02-noah-and-the-nations/episode-1'
import { actor } from '../../scene/build'
import { STEP, type GameRules, type Hint } from '../framework'

/**
 * "Walk with God" (Level 2 script, Episode 1): a quiet interaction. Noah walks home
 * through the city at dusk toward the light at its edge, where his family waits. Crowds
 * come along the street the other way: the world going its own way. Walking into one
 * jostles Noah back a step and the light dims; waiting lets it pass. Nothing is ever
 * lost: the light waits for him, and he walks on.
 *
 * Hold Space, the right arrow, or a finger or the mouse anywhere to walk; let go to wait.
 * A single press walks a few steps, so Space tapped again and again works too. In gentle
 * mode Noah waits for the crowds on his own.
 */

export const HINT: Hint = {
  pointer: 'Hold to walk with Noah toward the light. Let go to let the crowd pass.',
  keys: 'Hold to walk with Noah: Space or the right arrow. Let go to let the crowd pass.',
  gesture: 'hold',
}

/** Noah's pace, in frame widths a second. */
const PACE = 0.075
/** How far a single press carries him, in seconds of walking. */
const BURST = 0.6
/** A press shorter than this is a quick press, which carries him its few steps. */
const QUICK = 0.25
/** How close a crowd must be to jostle him, in frame widths. */
const TOUCH = 0.04
/** How long a jostle holds him, and how far it pushes him back. */
const JOSTLED = { seconds: 0.8, back: 0.025 }
/** The crowds' pace, the other way. */
const CROWD_PACE = 0.065
/** Gentle mode: how far ahead Noah looks for a crowd, to wait for it. */
const LOOK_AHEAD = 0.09
/** How long the arrival home shows before the story goes on. */
const ARRIVED = 1.4

interface WalkState {
  x: number
  held: boolean
  /** How long the key or pointer has been held: a quick press walks a few steps on its own. */
  heldFor: number
  /** Seconds of walking left from the last single press. */
  burst: number
  /** Seconds left of a jostle. */
  jostled: number
  walking: boolean
  time: number
  /** The crowds that have already jostled him, and now part around him. */
  parted: string[]
  /** The crowds now walking (each starts at its own time). */
  moving: string[]
  /** Seconds since he reached home, or -1. */
  home: number
}

/** Where a crowd is at a moment: standing at its start, then walking left from its start time. */
export function crowdAt(index: number, time: number): number {
  const c = CROWDS[index]!
  return c.x - CROWD_PACE * Math.max(0, time - c.starts)
}

export const walkWithGod: GameRules<WalkState> = {
  id: 'walk-with-god',
  start: () => ({ x: WALK.start, held: false, heldFor: 0, burst: 0, jostled: 0, walking: false, time: 0, parted: [], moving: [], home: -1 }),
  step(state, inputs, context, emit) {
    let { x, held, heldFor, burst, jostled, walking, home } = state
    const parted = [...state.parted]
    const moving = [...state.moving]
    const time = state.time + STEP

    const press = () => {
      if (held) return
      held = true
      heldFor = 0
      burst = BURST
    }
    // Letting go after holding stops him; a quick press still carries him a few steps.
    const letGo = () => {
      if (held && heldFor > QUICK) burst = 0
      held = false
    }
    for (const input of inputs) {
      if (input.kind === 'key' && (input.key === 'primary' || input.key === 'right')) (input.down ? press : letGo)()
      else if (input.kind === 'pointer' && input.phase !== 'move') (input.phase === 'down' ? press : letGo)()
    }
    if (held) heldFor += STEP

    // The crowds set off, each at its own time.
    CROWDS.forEach((c) => {
      if (!moving.includes(c.id) && time >= c.starts) {
        moving.push(c.id)
        emit(actor(c.id, { pose: 'walk' }, { seconds: 0.3 }))
      }
    })

    let step = false
    if (home < 0) {
      if (jostled > 0) jostled = Math.max(0, jostled - STEP)
      else if (held || burst > 0) {
        // Gentle mode waits while a crowd is ahead or going by; otherwise he walks into it.
        const near = CROWDS.findIndex((c, i) => !parted.includes(c.id) && crowdAt(i, time) > x - TOUCH - 0.005 && crowdAt(i, time) - x < LOOK_AHEAD)
        const touching = CROWDS.findIndex((c, i) => !parted.includes(c.id) && Math.abs(crowdAt(i, time) - x) < TOUCH)
        if (context.gentle && near >= 0) {
          // Waiting.
        } else if (touching >= 0) {
          // Walking into the crowd: jostled back a step. Then it parts around him.
          jostled = JOSTLED.seconds
          x = Math.max(WALK.start, x - JOSTLED.back)
          parted.push(CROWDS[touching]!.id)
        } else {
          x = Math.min(WALK.home, x + PACE * STEP)
          step = true
        }
      }
      burst = Math.max(0, burst - STEP)
      if (x >= WALK.home) home = 0
    } else home += STEP

    if (step !== walking) {
      walking = step
      emit(actor('noah', { pose: step ? 'walk' : 'idle' }, { seconds: 0.25 }))
    }
    return { x, held, heldFor, burst, jostled, walking, time, parted, moving, home }
  },
  view(state) {
    const live: Record<string, number> = {
      'actor:noah.x': state.x,
      // The light goes a little ahead of him, and dims while he's jostled; it waits for him.
      'actor:path-light.x': Math.min(WALK.home + 0.02, state.x + 0.07),
      'actor:path-light.opacity': state.jostled > 0 ? 0.45 : 0.9,
    }
    CROWDS.forEach((c, i) => {
      live[`actor:${c.id}.x`] = crowdAt(i, state.time)
    })
    return { live, hint: state.home < 0 ? HINT : null, done: state.home >= ARRIVED }
  },
}
