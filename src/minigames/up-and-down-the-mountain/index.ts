import { JOURNEYS, STOPS } from '../../content/levels/10-sinai/episode-1'
import { actor } from '../../scene/build'
import { STEP, type GameInput, type GameRules, type GameView, type Hint } from '../framework'

/**
 * Up and down the mountain (Level 10 script, Episode 1): courier routes. The mountain in
 * profile, with a winding path from the camp to the top. The player takes Moses up and
 * down it, carrying the words between God and his people: up to hear God's word; down to
 * tell it to the elders; up again with the people's answer, "All that the LORD has spoken
 * we will do"; and down with God's word to get ready. At the end of each journey, the words
 * he carries are shown.
 *
 * Tap the next stop on the path (or press Space, or an arrow key) and Moses climbs or comes
 * down to it. In gentle mode he walks the path by himself.
 */

export const HINT: Hint = {
  pointer: 'Tap the next stop on the path, to take Moses up and down the mountain with God’s words.',
  keys: 'Or press Space for the next stop.',
  gesture: 'tap',
}

/** How fast Moses walks the path; how near a tap must be to the next stop; how long words show. */
const WALK = 0.16
const NEAR = 0.08
const WORDS = 2.4
const SHOW = 2.4

interface MountainState {
  time: number
  journey: number
  at: number
  /** The stop Moses is walking to, and how far along he is (0 to 1). */
  to: number | null
  along: number
  arrivedAt: number
  doneAt: number
}

/** The next stop on the way the current journey goes. */
const nextStop = (state: Pick<MountainState, 'journey' | 'at'>) => {
  const goal = JOURNEYS[state.journey]!.to
  return state.at + Math.sign(goal - state.at)
}

export const upAndDownTheMountain: GameRules<MountainState> = {
  id: 'up-and-down-the-mountain',
  start: () => ({ time: 0, journey: 0, at: 0, to: null, along: 0, arrivedAt: -Infinity, doneAt: -1 }),
  step(state, inputs: readonly GameInput[], context, emit) {
    const time = state.time + STEP
    if (state.doneAt >= 0) return { ...state, time }
    let { journey, at, to, along, arrivedAt, doneAt } = state
    if (to === null) {
      const next = nextStop({ journey, at })
      const asked = inputs.some((i) => (i.kind === 'key' && i.down) || (i.kind === 'pointer' && i.phase === 'down' && (context.gentle || Math.hypot(STOPS[next]!.x - i.x, STOPS[next]!.y - i.y) < NEAR)))
      // Gentle mode walks on by itself, after a moment to read the words.
      if (asked || (context.gentle && time - arrivedAt >= WORDS * 0.5)) {
        to = next
        along = 0
        emit(actor('climber', { pose: 'walk', facing: STOPS[next]!.x > STOPS[at]!.x ? 1 : -1 }, { seconds: 0.2 }))
      }
    } else {
      const a = STOPS[at]!
      const b = STOPS[to]!
      along = Math.min(1, along + (WALK * STEP) / Math.hypot(b.x - a.x, b.y - a.y))
      if (along >= 1) {
        at = to
        to = null
        along = 0
        if (at === JOURNEYS[journey]!.to) {
          arrivedAt = time
          emit(actor('climber', { pose: 'idle' }, { seconds: 0.2 }))
          journey++
          if (journey === JOURNEYS.length) {
            doneAt = time
            // He faces the camp, as the last journey ends.
            emit(actor('climber', { facing: -1 }, { seconds: 0.2 }))
          }
        }
      }
    }
    return { time, journey, at, to, along, arrivedAt, doneAt }
  },
  view(state): GameView {
    const finished = state.doneAt >= 0
    const a = STOPS[state.at]!
    const b = state.to === null ? a : STOPS[state.to]!
    const glow = finished ? STOPS[1]! : STOPS[state.to ?? nextStop(state)]!
    const live: Record<string, number> = {
      'actor:climber.x': a.x + (b.x - a.x) * state.along,
      'actor:climber.y': a.y + (b.y - a.y) * state.along,
      'actor:next-stop.x': glow.x,
      'actor:next-stop.y': glow.y,
      'actor:next-stop.opacity': finished ? 0 : 0.8,
    }
    const told = state.journey > 0 && state.time - state.arrivedAt < WORDS
    const message = told || finished ? JOURNEYS[state.journey - 1]! : null
    return { live, hint: finished ? null : HINT, message, done: finished && state.time - state.doneAt >= SHOW }
  },
}
