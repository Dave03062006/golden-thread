import { STORM_ARK, STORM_WAVES, windowOf } from '../../content/levels/02-noah-and-the-nations/episode-3'
import { actor } from '../../scene/build'
import { STEP, type GameRules, type Hint } from '../framework'

/**
 * Through the storm (Level 2 script, Episode 3): the steering kind of play. Great waves
 * roll toward the ark from one side or the other; the player leans the ark into each wave
 * as it arrives (the arrow keys, or a tap on that side of the screen), so it rides over
 * the crest and the lamps inside stay steady. A wave met badly only rocks the ark harder
 * and the lamplight flickers; the ark never sinks, and the storm goes on, until at last
 * it eases.
 *
 * Space leans into whichever wave is coming next: the one-button way. In gentle mode the
 * waves come more slowly, and the ark leans by itself if the player waits.
 */

export const HINT: Hint = {
  pointer: 'Lean the ark into each wave: tap the side the wave comes from as it rises.',
  keys: 'Lean into each wave with the left and right arrows, or press Space as it rises.',
  gesture: 'tap',
}

/** How long a wave takes to roll from the edge of the view to the ark, in seconds. */
const ROLL = { normal: 2.6, gentle: 3.8 }
/** How long a lean lasts, and how early before the crest it counts. */
const LEAN = 1.1
/** How long a wave met badly pushes the ark over. */
const PUSHED = 0.7
/** How long the lamplight flickers after a wave met badly. */
const FLICKER = 1.2
/** Gentle mode: the ark leans by itself this long before a crest. */
const AUTO = 0.5
/** How long the storm takes to ease after the last wave. */
const EASE = 2.4
/** How high a crest lifts the ark, and how far its window moves as it leans. */
const LIFT = 0.045
const LEAN_SHIFT = 0.01

type Side = 'left' | 'right'

interface StormState {
  time: number
  /** Which way the ark leans now, and for how much longer. */
  lean: Side | null
  leanLeft: number
  /** The waves that have reached the ark, and how each was met. */
  met: ('rode' | 'rocked')[]
  flicker: number
  /** How far the ark leans, easing toward the lean: −1 left, 0 upright, 1 right. */
  tilt: number
}

/** When each wave reaches the ark (gentle mode spreads them out). */
const crestAt = (i: number, gentle: boolean) => STORM_WAVES[i]!.at * (gentle ? 1.4 : 1)
/** The wave that comes next: the first not yet met. */
const nextWave = (state: StormState) => (state.met.length < STORM_WAVES.length ? state.met.length : -1)

/** Where a wave is at a moment: from the edge of the view on its side, across the ark, and on. */
export function waveAt(i: number, time: number, gentle: boolean): { x: number; opacity: number } {
  const w = STORM_WAVES[i]!
  const roll = gentle ? ROLL.gentle : ROLL.normal
  const t = (time - (crestAt(i, gentle) - roll)) / roll
  const from = w.side === 'left' ? -0.15 : 1.15
  const x = from + (STORM_ARK.x - from) * t
  const opacity = t < 0 ? 0 : t < 0.15 ? t / 0.15 : t < 1.3 ? 1 : Math.max(0, 1 - (t - 1.3) / 0.3)
  return { x, opacity }
}

export const throughTheStorm: GameRules<StormState> = {
  id: 'through-the-storm',
  start: () => ({ time: 0, lean: null, leanLeft: 0, met: [], flicker: 0, tilt: 0 }),
  step(state, inputs, context, emit) {
    const gentle = context.gentle
    let { lean, leanLeft, flicker } = state
    const met = [...state.met]
    const time = state.time + STEP
    const lean_ = (side: Side) => {
      if (lean !== side) emit(actor('ark-sea', { pose: side === 'left' ? 'lean-left' : 'lean-right' }, { seconds: 0.35, ease: 'outCubic' }))
      lean = side
      leanLeft = LEAN
    }
    const next = nextWave(state)

    for (const input of inputs) {
      if (input.kind === 'key' && input.down) {
        if (input.key === 'left' || input.key === 'right') lean_(input.key)
        else if (input.key === 'primary' && next >= 0) lean_(STORM_WAVES[next]!.side)
      } else if (input.kind === 'pointer' && input.phase === 'down') lean_(input.x < 0.5 ? 'left' : 'right')
    }
    // Gentle mode: if the player waits, the ark leans into the coming wave by itself.
    if (gentle && next >= 0 && lean === null && crestAt(next, gentle) - time < AUTO) lean_(STORM_WAVES[next]!.side)

    // A wave reaching the ark: ridden if the ark leans into it, or it rocks the ark.
    if (next >= 0 && time >= crestAt(next, gentle)) {
      const rode = lean === STORM_WAVES[next]!.side
      met.push(rode ? 'rode' : 'rocked')
      if (!rode) {
        // Met badly, the wave pushes the ark over the other way for a moment.
        flicker = FLICKER
        lean_(STORM_WAVES[next]!.side === 'left' ? 'right' : 'left')
        leanLeft = PUSHED
      }
    }

    if (lean) {
      leanLeft -= STEP
      if (leanLeft <= 0) {
        lean = null
        emit(actor('ark-sea', { pose: 'rock' }, { seconds: 0.6, ease: 'inOutSine' }))
      }
    }
    flicker = Math.max(0, flicker - STEP)
    const toward = lean === 'left' ? -1 : lean === 'right' ? 1 : 0
    const tilt = state.tilt + (toward - state.tilt) * Math.min(1, STEP * 8)
    return { time, lean, leanLeft, met, flicker, tilt }
  },
  view(state, context) {
    const live: Record<string, number> = {}
    let lift = 0
    STORM_WAVES.forEach((w, i) => {
      const at = waveAt(i, state.time, context.gentle)
      live[`actor:${w.id}.x`] = at.x
      live[`actor:${w.id}.opacity`] = at.opacity
      lift = Math.max(lift, at.opacity * Math.exp(-(((at.x - STORM_ARK.x) / 0.14) ** 2)))
    })
    // The ark rises over each crest, and its window with it, leaning as the ark leans.
    const window = windowOf(STORM_ARK)
    live['actor:ark-sea.y'] = STORM_ARK.y - LIFT * lift
    live['actor:ark-window.y'] = window.y - LIFT * lift
    live['actor:ark-window.x'] = window.x + LEAN_SHIFT * state.tilt
    // The lamplight through the window: steady, or flickering after a wave met badly.
    live['actor:ark-window.opacity'] = state.flicker > 0 ? 0.45 + 0.35 * Math.abs(Math.sin(state.time * 18)) : 0.85
    const allMet = state.met.length === STORM_WAVES.length
    const easedFor = allMet ? state.time - crestAt(STORM_WAVES.length - 1, context.gentle) : 0
    return { live, hint: allMet ? null : HINT, done: allMet && easedFor >= EASE }
  },
}
