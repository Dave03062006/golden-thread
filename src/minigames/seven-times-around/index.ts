import { FALLEN, MARCH, WALLS } from '../../content/levels/14-joshua/episode-3'
import { pieceX } from '../../content/levels/11-the-tabernacle-and-the-holy-life/stage'
import { lerp } from '../../engine/motion'
import { STEP, type GameInput, type GameRules, type GameView, type Hint } from '../framework'

/**
 * Seven times around (Level 14 script, Episode 3): rhythm. The procession circles the walls in
 * silence, and the player keeps the march in step, tapping on each beat (a soft light pulses
 * with it). Each day is one circle; the seventh day, seven. Then the player holds for the long
 * blast of the trumpets, and taps for the great shout, and the walls fall flat.
 *
 * Tap (or press Space) on each beat; hold for the trumpets; tap to shout. In gentle mode any
 * tap counts as a step. A march never stops for a missed beat: after three misses in a row,
 * the next tap counts anyway.
 */

export const HINTS: Record<'march' | 'trumpets' | 'shout', Hint> = {
  march: { pointer: 'Keep the march in step: tap on each beat as the light pulses.', keys: 'Or press Space on each beat.', gesture: 'tap' },
  trumpets: { pointer: 'Now hold for the long blast of the trumpets.', keys: 'Or hold Space.', gesture: 'hold' },
  shout: { pointer: 'Shout! Tap for the great shout.', keys: 'Or press Space.', gesture: 'tap' },
}

/** One beat; how near a tap must be to it (in gentle mode, any tap); steps to a circle; circles each day; how long the trumpets sound; how long the walls take to fall; how long the end shows. */
export const BEAT = 0.6
const WINDOW = 0.16
export const STEPS = 3
export const DAYS = [1, 1, 1, 1, 1, 1, 7]
export const CIRCLES = DAYS.reduce((a, b) => a + b, 0)
const MISSES = 3
export const BLAST = 1.2
const FALL = 1.2
const SHOW = 2.4

type Phase = 'march' | 'trumpets' | 'shout' | 'fallen'

interface MarchState {
  time: number
  phase: Phase
  steps: number
  /** The last beat a step was counted on, so each beat counts once. */
  lastBeat: number
  misses: number
  held: number
  holding: boolean
  phaseAt: number
}

/** Which day it is, after `circles` circles. */
function dayOf(circles: number): number {
  let total = 0
  for (let d = 0; d < DAYS.length; d++) {
    total += DAYS[d]!
    if (circles < total) return d + 1
  }
  return DAYS.length
}

const SHOUT = { title: 'The wall fell down flat', text: '“Shout; for the LORD has given you the city.”' }

export const sevenTimesAround: GameRules<MarchState> = {
  id: 'seven-times-around',
  start: () => ({ time: 0, phase: 'march', steps: 0, lastBeat: -1, misses: 0, held: 0, holding: false, phaseAt: 0 }),
  step(state, inputs: readonly GameInput[], context) {
    const time = state.time + STEP
    let { phase, steps, lastBeat, misses, held, holding, phaseAt } = state
    for (const input of inputs) {
      const down = (input.kind === 'key' && input.key === 'primary' && input.down) || (input.kind === 'pointer' && input.phase === 'down')
      const up = (input.kind === 'key' && input.key === 'primary' && !input.down) || (input.kind === 'pointer' && input.phase === 'up')
      if (phase === 'march' && down) {
        const beat = Math.round(time / BEAT)
        const onBeat = Math.abs(time - beat * BEAT) <= WINDOW
        if (beat === lastBeat) continue
        if (context.gentle || onBeat || misses >= MISSES) {
          steps++
          lastBeat = beat
          misses = 0
          if (steps === CIRCLES * STEPS) {
            phase = 'trumpets'
            phaseAt = time
          }
        } else misses++
      } else if (phase === 'trumpets') {
        if (down) holding = true
        if (up) holding = false
      } else if (phase === 'shout' && down && time - phaseAt > 0.2) {
        phase = 'fallen'
        phaseAt = time
      }
    }
    if (phase === 'trumpets') {
      held = holding ? held + STEP : held
      if (held >= BLAST) {
        phase = 'shout'
        phaseAt = time
      }
    }
    return { time, phase, steps, lastBeat, misses, held, holding, phaseAt }
  },
  view(state): GameView {
    // The procession walks across the front of the walls, a third of the way at each step, and comes round again.
    const marching = state.phase === 'march'
    const x = marching ? lerp(MARCH.from, MARCH.to - 0.2, (state.steps % STEPS) / STEPS) : MARCH.from
    const pulse = marching ? Math.max(0, 1 - Math.abs(state.time / BEAT - Math.round(state.time / BEAT)) * 4) : 0
    const fall = state.phase === 'fallen' ? Math.min(1, (state.time - state.phaseAt) / FALL) : 0
    const live: Record<string, number> = {
      'actor:marchers.x': x,
      'actor:trumpeters.x': x + 0.1,
      'actor:ark-glow.x': x + 0.2,
      // The glow rests while the march goes round (so it is found standing still), and returns when the walls fall.
      'actor:ark-glow.opacity': state.phase === 'fallen' ? 0.85 : marching ? 0.85 * Math.max(0, 1 - state.time / 0.5) : 0,
      'actor:ark-carried.x': pieceX('ark', x + 0.2, 1.2),
      'actor:beat.opacity': 0.8 * pulse,
      [`layer:${WALLS}.opacity`]: 1 - fall,
      [`layer:${FALLEN}.opacity`]: fall,
    }
    const circles = Math.floor(state.steps / STEPS)
    const day = dayOf(Math.min(circles, CIRCLES - 1))
    const onDay = circles - DAYS.slice(0, day - 1).reduce((a, b) => a + b, 0)
    const message =
      state.phase === 'fallen'
        ? SHOUT
        : state.phase === 'march'
          ? { title: `Day ${day}`, text: day < 7 ? 'Once around the city, in silence.' : `Around the city ${Math.min(7, onDay + 1)} of 7 times.` }
          : null
    const hint = state.phase === 'fallen' ? null : HINTS[state.phase]
    return { live, hint, message, done: state.phase === 'fallen' && state.time - state.phaseAt >= FALL + SHOW }
  },
}
