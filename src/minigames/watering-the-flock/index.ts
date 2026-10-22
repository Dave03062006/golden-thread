import { BUCKET, TROUGHS } from '../../content/levels/07-moses-is-called/episode-3'
import { lerp } from '../../engine/motion'
import { actor } from '../../scene/build'
import { STEP, type GameInput, type GameRules, type GameView, type Hint } from '../framework'

/**
 * Watering the flock (Level 7 script, Episode 3): pouring and water. The seven daughters'
 * sheep crowd around the empty troughs by the well in Midian. The player helps Moses draw
 * the bucket up from the well (hold) and pour it into the next trough (let go), until every
 * trough is full; the sheep at each full trough come up to it and drink.
 *
 * Hold (a pointer or Space) to draw the bucket up; let go when it's full to pour. A bucket
 * let go before it's full slips back down. In gentle mode a tap draws and pours by itself.
 */

export const HINT: Hint = {
  pointer: 'Hold to draw water from the well, then let go to pour it into a trough for the flock.',
  keys: 'Or hold Space to draw, and let go to pour.',
  gesture: 'hold',
}

/** How long the bucket takes to come up full, to pour, and to slip back; how many buckets fill a trough. */
const FILL = 1
const POUR = 0.6
const SLIP = 0.4
export const BUCKETS = 2
/** How long each trough's word shows, and how long the end shows. */
const WORDS = 1.8
const SHOW = 2.6

interface FlockState {
  time: number
  /** How far up the bucket is, from 0 (down the well) to 1 (up and full). */
  bucket: number
  holding: boolean
  /** Gentle mode: a tap draws and pours by itself. */
  auto: boolean
  /** When the pour under way began, or -1. */
  pouringAt: number
  /** Buckets poured into each trough. */
  poured: number[]
  /** When each trough filled (or -1), and the last one. */
  filledAt: number[]
  fullAt: number
  doneAt: number
}

const WATERED = TROUGHS.map((_, n) => ({ title: 'The flock drinks', text: `${n + 1} of ${TROUGHS.length} troughs full` }))
const FINISHED = { title: 'Every trough full', text: 'Moses stood up and helped them, and watered their flock.' }

const pressed = (inputs: readonly GameInput[]) => inputs.some((i) => (i.kind === 'pointer' && i.phase === 'down') || (i.kind === 'key' && i.key === 'primary' && i.down))
const released = (inputs: readonly GameInput[]) => inputs.some((i) => (i.kind === 'pointer' && i.phase === 'up') || (i.kind === 'key' && i.key === 'primary' && !i.down))

export const wateringTheFlock: GameRules<FlockState> = {
  id: 'watering-the-flock',
  start: () => ({ time: 0, bucket: 0, holding: false, auto: false, pouringAt: -1, poured: TROUGHS.map(() => 0), filledAt: TROUGHS.map(() => -1), fullAt: -Infinity, doneAt: -1 }),
  step(state, inputs, context, emit) {
    const time = state.time + STEP
    if (state.doneAt >= 0) return { ...state, time }
    let { bucket, holding, auto, pouringAt, fullAt, doneAt } = state
    const poured = [...state.poured]
    const filledAt = [...state.filledAt]
    const wasHolding = holding
    if (pressed(inputs)) {
      holding = true
      if (context.gentle) auto = true
    }
    if (released(inputs)) holding = false
    if (pouringAt >= 0) {
      // Pouring into the next trough that isn't full.
      if (time - pouringAt >= POUR) {
        const trough = poured.findIndex((n) => n < BUCKETS)
        poured[trough]!++
        if (poured[trough] === BUCKETS) {
          fullAt = time
          filledAt[trough] = time
        }
        pouringAt = -1
        bucket = 0
        emit(actor('moses', { pose: 'idle' }, { seconds: 0.3 }))
        if (poured.every((n) => n >= BUCKETS)) doneAt = time
      }
    } else if (holding || auto) {
      if (!wasHolding && !auto) emit(actor('moses', { pose: 'lift' }, { seconds: 0.3 }))
      if (auto && bucket === 0) emit(actor('moses', { pose: 'lift' }, { seconds: 0.3 }))
      bucket = Math.min(1, bucket + STEP / FILL)
      // Gentle mode pours a full bucket by itself; otherwise letting go of a full bucket pours it.
      if (auto && bucket >= 1) {
        auto = false
        pouringAt = time
        emit(actor('moses', { pose: 'carry' }, { seconds: 0.3 }))
      }
    } else if (bucket >= 1 && wasHolding) {
      pouringAt = time
      emit(actor('moses', { pose: 'carry' }, { seconds: 0.3 }))
    } else if (bucket > 0) {
      if (wasHolding) emit(actor('moses', { pose: 'idle' }, { seconds: 0.3 }))
      bucket = Math.max(0, bucket - STEP / SLIP)
    }
    return { time, bucket, holding, auto, pouringAt, poured, filledAt, fullAt, doneAt }
  },
  view(state): GameView {
    const live: Record<string, number> = { 'actor:bucket.y': lerp(BUCKET.down, BUCKET.up, state.bucket) }
    const trough = state.poured.findIndex((n) => n < BUCKETS)
    const pouring = state.pouringAt >= 0 ? Math.min(1, (state.time - state.pouringAt) / POUR) : 0
    TROUGHS.forEach((t, i) => {
      const level = (state.poured[i]! + (i === trough ? pouring : 0)) / BUCKETS
      live[`actor:${t.water}.opacity`] = level
      // The sheep come up to a trough once it's full.
      const at = state.filledAt[i]!
      live[`actor:${t.flock}.y`] = at < 0 ? t.flockFrom : lerp(t.flockFrom, t.flockTo, Math.min(1, (state.time - at) / 1))
    })
    const full = state.poured.filter((n) => n >= BUCKETS).length
    const finished = state.doneAt >= 0
    const message = state.time - state.fullAt < WORDS ? WATERED[full - 1]! : finished ? FINISHED : null
    return { live, hint: finished ? null : HINT, message, done: finished && state.time - state.doneAt >= WORDS + SHOW }
  },
}
