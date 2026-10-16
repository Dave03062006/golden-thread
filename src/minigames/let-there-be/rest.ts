import { STEP, type GameRules } from '../framework'
import { HINTS } from './shared'

/**
 * Day seven: nothing to do. For a while there is only the music and the moving light,
 * and the word "Rest". Then the player may go on, whenever they're ready.
 */
interface RestState {
  seconds: number
  ready: boolean
  go: boolean
}

export const rest: GameRules<RestState> = {
  id: 'rest',
  start: () => ({ seconds: 0, ready: false, go: false }),
  step(state, inputs, context) {
    const seconds = state.seconds + STEP
    const ready = seconds >= (context.gentle ? 9 : 12)
    const asked = inputs.some((i) => (i.kind === 'pointer' && i.phase === 'down') || (i.kind === 'key' && i.down))
    return { seconds, ready, go: state.go || (ready && asked) }
  },
  view(state) {
    return { live: {}, hint: HINTS.rest, restReady: state.ready, done: state.go }
  },
}
