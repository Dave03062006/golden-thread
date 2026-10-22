import { BASKET, ROWS, SWING, reedY } from '../../content/levels/07-moses-is-called/episode-2'
import { actor } from '../../scene/build'
import { STEP, type GameInput, type GameRules, type GameView, type Hint } from '../framework'

/**
 * A basket of bulrushes (Level 7 script, Episode 2): building. The mother weaves a little
 * basket for her baby. A reed swings back and forth over it; the player lays it in when it
 * lines up, row by row, over and under, until the basket rises from its base to its rim.
 * Then the player sweeps dark pitch over it, so no water can come in. The baby is laid in
 * it, and the lid is closed.
 *
 * Tap (or press Space) when the reed lines up to weave it in; then sweep over the basket
 * (or press Space) to seal it. In gentle mode every tap weaves a row, and a sweep anywhere
 * spreads the pitch.
 */

export const WEAVE_HINT: Hint = {
  pointer: 'Tap when the reed lines up with the basket, to weave it in.',
  keys: 'Or press Space when it lines up.',
  gesture: 'tap',
}
export const SEAL_HINT: Hint = {
  pointer: 'Sweep over the basket to seal it with pitch, so no water can come in.',
  keys: 'Or press Space to seal it.',
  gesture: 'sweep',
}

/** How fast the reed swings (radians a second), and how close to the middle it must be. */
const SPEED = 2.2
export const LINED_UP = 0.03
/** How much sweeping seals the basket, how long Space takes, and how near a sweep must pass. */
const SWEEP_TO_SEAL = 0.9
const SPACE_SECONDS = 1.4
const NEAR = 0.16
/** How long each row's word shows, and how long the end shows. */
const WORDS = 1.4
const SHOW = 3

interface BasketState {
  time: number
  rows: number
  rowAt: number
  missedAt: number
  /** How far the pitch is spread, from 0 to 1, and Space spreading it. */
  sealed: number
  auto: boolean
  last: { x: number; y: number } | null
  sealedAt: number
  doneAt: number
}

/** Where the reed is in its swing, as an offset from the basket's middle. */
export const reedAt = (time: number) => Math.sin(time * SPEED) * SWING

const WOVEN = Array.from({ length: ROWS }, (_, n) => ({ title: 'Over and under', text: `${n + 1} of ${ROWS} rows woven` }))
const NOT_YET = { title: 'Not yet', text: 'Wait until the reed lines up with the basket.' }
const SEALED = { title: 'Bitumen and pitch', text: 'Sealed inside and out. Now the baby is laid in it, and the lid closed.' }

const pressed = (inputs: readonly GameInput[]) => inputs.some((i) => (i.kind === 'pointer' && i.phase === 'down') || (i.kind === 'key' && i.key === 'primary' && i.down))

export const aBasketOfBulrushes: GameRules<BasketState> = {
  id: 'a-basket-of-bulrushes',
  start: () => ({ time: 0, rows: 0, rowAt: -Infinity, missedAt: -Infinity, sealed: 0, auto: false, last: null, sealedAt: -1, doneAt: -1 }),
  step(state, inputs, context, emit) {
    const time = state.time + STEP
    if (state.doneAt >= 0) return { ...state, time }
    let { rows, rowAt, missedAt, sealed, auto, last, sealedAt, doneAt } = state
    if (rows < ROWS) {
      // Weaving: a tap lays the reed in if it lines up.
      if (pressed(inputs)) {
        if (context.gentle || Math.abs(reedAt(time)) < LINED_UP) {
          rows++
          rowAt = time
          emit(actor('basket', { pose: `row-${rows}` }, { seconds: 0.2 }))
        } else missedAt = time
      }
    } else if (sealedAt < 0) {
      // Sealing: sweeping over the basket, or Space, spreads the pitch.
      for (const input of inputs) {
        if (input.kind === 'key' && input.key === 'primary' && input.down) auto = true
        else if (input.kind === 'pointer') {
          if (input.phase === 'up') last = null
          else {
            const near = Math.hypot(input.x - BASKET.x, input.y - (BASKET.y - 0.06)) < NEAR
            if (last && (near || context.gentle)) sealed = Math.min(1, sealed + Math.hypot(input.x - last.x, input.y - last.y) / SWEEP_TO_SEAL)
            last = { x: input.x, y: input.y }
          }
        }
      }
      if (auto) sealed = Math.min(1, sealed + STEP / SPACE_SECONDS)
      if (sealed >= 1) {
        sealedAt = time
        emit(actor('basket', { pose: 'sealed' }, { seconds: 0.4 }))
      }
    } else if (time - sealedAt >= 1.2 && state.time - sealedAt < 1.2) {
      // The baby is laid in, and the lid closed.
      emit(actor('basket', { pose: 'closed' }, { seconds: 0.4 }))
      doneAt = time
    }
    return { time, rows, rowAt, missedAt, sealed, auto, last, sealedAt, doneAt }
  },
  view(state): GameView {
    const weaving = state.rows < ROWS
    const live: Record<string, number> = {
      'actor:loose-reed.x': BASKET.x + (weaving ? reedAt(state.time) : 0),
      'actor:loose-reed.y': reedY(Math.min(ROWS, state.rows + 1)),
      'actor:loose-reed.opacity': weaving ? 1 : 0,
    }
    const message =
      state.sealedAt >= 0 ? SEALED : state.time - state.missedAt < WORDS && weaving ? NOT_YET : state.time - state.rowAt < WORDS ? WOVEN[state.rows - 1]! : null
    const hint = state.sealedAt >= 0 ? null : weaving ? WEAVE_HINT : SEAL_HINT
    return { live, hint, message, done: state.doneAt >= 0 && state.time - state.doneAt >= SHOW }
  },
}
