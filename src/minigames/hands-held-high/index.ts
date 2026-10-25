import { BANNERS, HILL } from '../../content/levels/09-through-the-sea/episode-6'
import { actor } from '../../scene/build'
import { STEP, type GameInput, type GameRules, type GameView, type Hint } from '../framework'

/**
 * Hands held high (Level 9 script, Episode 6): timing. Moses stands on the hilltop with the
 * rod of God raised. Slowly his arms grow tired and begin to sink, and down in the valley the
 * banners show the battle turning. Each time they start to sink, the player lifts them again,
 * before they fall; each lift is harder than the last. Then Aaron and Hur come: the player
 * sets a stone for Moses to sit on, and Aaron and Hur hold up his hands, one on each side, and
 * they stay steady until the going down of the sun.
 *
 * Tap (or press Space) to lift his hands as they begin to sink, then to set the stone, then to
 * call Aaron and Hur. In gentle mode his arms sink slowly, and Aaron and Hur come sooner.
 */

export const HINTS: Record<'lift' | 'stone' | 'hold' | 'steady', Hint | null> = {
  lift: { pointer: 'When Moses’ hands begin to sink, tap to lift them up again.', keys: 'Or press Space.', gesture: 'tap' },
  stone: { pointer: 'His hands grow weary. Tap to set a stone for Moses to sit on.', keys: 'Or press Space.', gesture: 'tap' },
  hold: { pointer: 'Tap for Aaron and Hur to hold up his hands.', keys: 'Or press Space.', gesture: 'tap' },
  steady: null,
}

/** How fast his arms sink at first, how much faster after each lift, and below what height a lift takes. */
const SINK = 0.14
const TIRING = 0.45
export const LIFT_BELOW = 0.75
/** Below this the hands are down, and Amalek prevails. */
export const DOWN = 0.5
/** How many lifts before Aaron and Hur come (in gentle mode, fewer). */
export const LIFTS = 4
const GENTLE_LIFTS = 2
/** How fast the battle turns, how long Aaron and Hur take to come, and how long the sun takes to set. */
const TURN = 0.25
const COME = 1.2
const SUNSET = 4
const WORDS = 2
const SHOW = 2.4

type Phase = 'lift' | 'stone' | 'hold' | 'steady'

interface HandsState {
  time: number
  phase: Phase
  /** How high Moses' hands are (1, held up; 0, fallen), and how many times they've been lifted. */
  hands: number
  lifts: number
  /** How the battle stands, from 0 (Amalek prevails) to 1 (Israel prevails). */
  tide: number
  phaseAt: number
  liftedAt: number
  doneAt: number
}

const LIFTED = { title: 'Israel prevails', text: 'Whenever Moses held up his hand, Israel prevailed.' }
const SINKING = { title: 'Amalek prevails', text: 'Whenever he lowered his hand, Amalek prevailed.' }
const WEARY = { title: 'Weary hands', text: 'Moses’ hands grew weary.' }
const SAT = { title: 'A stone', text: 'They took a stone and put it under him, and he sat upon it.' }
const STEADY = { title: 'Steady until sunset', text: 'Aaron and Hur held up his hands, one on each side.' }

const clamp = (v: number) => Math.min(1, Math.max(0, v))

export const handsHeldHigh: GameRules<HandsState> = {
  id: 'hands-held-high',
  start: () => ({ time: 0, phase: 'lift', hands: 1, lifts: 0, tide: 0.6, phaseAt: 0, liftedAt: -Infinity, doneAt: -1 }),
  step(state, inputs: readonly GameInput[], context, emit) {
    const time = state.time + STEP
    if (state.doneAt >= 0) return { ...state, time }
    let { phase, hands, lifts, tide, phaseAt, liftedAt, doneAt } = state
    const tapped = inputs.some((i) => (i.kind === 'pointer' && i.phase === 'down') || (i.kind === 'key' && i.key === 'primary' && i.down))
    const was = hands
    if (phase === 'lift') {
      hands = clamp(hands - SINK * (1 + TIRING * lifts) * (context.gentle ? 0.5 : 1) * STEP)
      if (tapped && hands < LIFT_BELOW) {
        hands = 1
        lifts++
        liftedAt = time
        if (lifts >= (context.gentle ? GENTLE_LIFTS : LIFTS)) {
          phase = 'stone'
          phaseAt = time
        }
      }
    } else if (phase === 'stone') {
      // His hands sink while the stone is fetched; a tap sets it, and he sits.
      hands = clamp(hands - SINK * STEP)
      if (tapped && time - phaseAt > 0.3) {
        phase = 'hold'
        phaseAt = time
        emit(actor('moses', { pose: 'kneel' }, { seconds: 0.4 }))
      }
    } else if (phase === 'hold') {
      hands = clamp(hands - SINK * STEP)
      if (tapped && time - phaseAt > 0.3) {
        phase = 'steady'
        phaseAt = time
        hands = 1
        emit(actor('aaron', { pose: 'lift' }, { seconds: COME }))
        emit(actor('hur', { pose: 'lift' }, { seconds: COME }))
      }
    } else if (time - phaseAt >= SUNSET) doneAt = time
    // Moses' arms, up or down, as his hands cross the line between.
    if (phase === 'lift' || phase === 'stone') {
      if (was >= DOWN && hands < DOWN) emit(actor('moses', { pose: 'idle' }, { seconds: 0.4 }))
      else if (was < DOWN && hands >= DOWN) emit(actor('moses', { pose: 'lift' }, { seconds: 0.3 }))
    }
    tide = clamp(tide + (hands >= DOWN ? TURN : -TURN) * STEP)
    if (phase === 'steady') tide = clamp(tide + TURN * STEP)
    return { time, phase, hands, lifts, tide, phaseAt, liftedAt, doneAt }
  },
  view(state): GameView {
    const finished = state.doneAt >= 0
    const coming = state.phase === 'steady' ? Math.min(1, (state.time - state.phaseAt) / COME) : 0
    const sunset = state.phase === 'steady' ? Math.min(1, (state.time - state.phaseAt) / SUNSET) : 0
    const tide = finished ? 1 : state.tide
    const live: Record<string, number> = {
      'actor:banner-israel.y': BANNERS.low + (BANNERS.high - BANNERS.low) * tide,
      'actor:banner-amalek.y': BANNERS.high + (BANNERS.low - BANNERS.high) * tide,
      'actor:stone.opacity': state.phase === 'lift' || state.phase === 'stone' ? 0 : 1,
      'actor:aaron.x': HILL.aaron.from + (HILL.aaron.holding - HILL.aaron.from) * coming,
      'actor:hur.x': HILL.hur.from + (HILL.hur.holding - HILL.hur.from) * coming,
      'layer:forest-sky.opacity': 1 - sunset,
      'layer:evening-sky.opacity': sunset,
    }
    const message =
      state.phase === 'steady'
        ? STEADY
        : state.phase === 'hold'
          ? SAT
          : state.phase === 'stone'
            ? WEARY
            : state.time - state.liftedAt < WORDS
              ? LIFTED
              : state.hands < DOWN
                ? SINKING
                : null
    return { live, hint: finished ? null : HINTS[state.phase], message, done: finished && state.time - state.doneAt >= SHOW }
  },
}
