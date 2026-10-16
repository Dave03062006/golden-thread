import { STEP, type GameRules, type Hint } from '../framework'
import { pressed } from './shared'

/**
 * Days two and three: swipe upward to lift something out of the waters (the dome of the
 * sky, then the dry land). It follows the finger; let go once it's lifted far enough and
 * it rises the rest of the way on its own. A smaller lift sinks gently back, inviting a
 * bigger one. Up, or Space, lifts it all at once.
 */

interface State {
  /** From 0 (still in the waters) to 1 (in its place). */
  lift: number
  dragging: boolean
  startY: number
  startLift: number
  /** Let go far enough: it's rising the rest of the way. */
  rising: boolean
}

/** A lifting game for these channels, each lifted from its starting offset to 0. */
export function liftGame(id: string, hint: Hint, channels: { channel: string; from: number }[]): GameRules<State> {
  return {
    id,
    start: () => ({ lift: 0, dragging: false, startY: 0, startLift: 0, rising: false }),
    step(state, inputs, context) {
      let { lift, dragging, startY, startLift, rising } = state
      const reach = context.gentle ? 2.6 : 1.8
      for (const input of inputs) {
        if (input.kind !== 'pointer' || rising) continue
        if (input.phase === 'down') {
          dragging = true
          startY = input.y
          startLift = lift
        } else if (input.phase === 'move' && dragging) {
          lift = Math.min(1, Math.max(0, startLift + (startY - input.y) * reach))
        } else if (input.phase === 'up') {
          dragging = false
          if (lift >= (context.gentle ? 0.25 : 0.4)) rising = true
        }
      }
      if (pressed(inputs, 'up', 'primary')) rising = true
      if (rising) lift = Math.min(1, lift + (1 - lift) * STEP * 4.5 + STEP * 0.12)
      else if (!dragging) lift = Math.max(0, lift - lift * STEP * 1.3)
      return { lift, dragging, startY, startLift, rising }
    },
    view(state) {
      return {
        live: Object.fromEntries(channels.map(({ channel, from }) => [channel, from * (1 - state.lift)])),
        hint: state.lift < 0.06 && !state.dragging ? hint : null,
        done: state.rising && state.lift >= 0.995,
      }
    },
  }
}
