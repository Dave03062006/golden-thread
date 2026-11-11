import { STEP, type GameInput, type GameRules, type GameView, type Hint } from './framework'

/**
 * A play of acting at the right moment (spec §13.7, kinds 5 and 16): after a pause, a signal
 * comes and stays for a moment, and the player taps while it lasts. A tap at any other time
 * does nothing, and a signal missed comes again. In gentle mode the signal waits until the
 * player taps. Level 18 moves David's men while Saul's lookouts look away, and dances with David
 * on the beat, this way.
 */

export interface AtTheSignal {
  id: string
  /** How many signals in all. */
  count: number
  /** How long each signal lasts; how long the pause before it. */
  open: number
  wait: number
  hint: Hint
  /** What shows while waiting, during a signal, and at the end; `n` signals taken so far. */
  waiting: (n: number) => { title: string; text: string }
  signal: (n: number) => { title: string; text: string }
  finished: { title: string; text: string }
  /** What the scene shows with `n` signals taken, the last of them `t` of the way in (0 to 1). */
  live: (n: number, t: number) => Record<string, number>
}

/** How long a step takes to show; how long the end shows. */
const SETTLE = 0.6
const SHOW = 2.4

interface SignalState {
  time: number
  taken: number
  takenAt: number
  /** When the next signal begins (or began). */
  signalAt: number
  doneAt: number
}

export function atTheSignal(config: AtTheSignal): GameRules<SignalState> {
  const open = (state: SignalState, gentle: boolean) => state.time >= state.signalAt && (gentle || state.time < state.signalAt + config.open)
  return {
    id: config.id,
    start: () => ({ time: 0, taken: 0, takenAt: -Infinity, signalAt: config.wait, doneAt: -1 }),
    step(state, inputs: readonly GameInput[], context) {
      const time = state.time + STEP
      if (state.doneAt >= 0) return { ...state, time }
      let { taken, takenAt, signalAt, doneAt } = state
      const signalling = open({ ...state, time }, context.gentle)
      for (const input of inputs) {
        const tap = (input.kind === 'key' && input.key === 'primary' && input.down) || (input.kind === 'pointer' && input.phase === 'down')
        if (!tap || !signalling) continue
        taken++
        takenAt = time
        signalAt = time + config.wait
        if (taken === config.count) doneAt = time
        break
      }
      // A signal missed comes again, after a pause.
      if (!context.gentle && doneAt < 0 && time >= signalAt + config.open) signalAt = time + config.wait
      return { time, taken, takenAt, signalAt, doneAt }
    },
    view(state, context): GameView {
      const finished = state.doneAt >= 0
      const t = state.taken === 0 ? 0 : Math.min(1, (state.time - state.takenAt) / SETTLE)
      const message = finished ? config.finished : open(state, context.gentle) ? config.signal(state.taken) : config.waiting(state.taken)
      return { live: config.live(state.taken, t), hint: finished ? null : config.hint, message, done: finished && state.time - state.doneAt >= SETTLE + SHOW }
    },
  }
}
