import { COMPANIES } from '../../content/levels/15-the-judges/episode-3'
import { STEP, type GameInput, type GameRules, type GameView, type Hint } from '../framework'

/**
 * Torches and trumpets (Level 15 script, Episode 3): timing. The dark hills around the camp of
 * Midian, with Gideon's three companies hidden in a ring. "Look at me, and do likewise": Gideon
 * signals, and the player does as he does while his signal lasts. Company by company, the
 * trumpets sound and the jars are smashed, and the torches flare until the valley is ringed
 * with fire; last of all, the great shout. A tap between signals does nothing, and a signal
 * missed comes again.
 *
 * Tap (or press Space) while Gideon signals. In gentle mode he waits until the player does.
 */

export const HINT: Hint = {
  pointer: 'Watch Gideon, and do as he does: tap while he gives the signal.',
  keys: 'Or press Space.',
  gesture: 'tap',
}

/** Gideon's signals, in order: each company blows its trumpets, then smashes its jars; then the shout. */
export const SIGNALS = [
  ...COMPANIES.flatMap((c, i) => [
    { kind: 'blow' as const, company: i, text: `Gideon lifts his trumpet. Company ${i + 1}: blow!` },
    { kind: 'break' as const, company: i, text: `Gideon smashes his jar. Company ${i + 1}: break the jars!`, torch: c },
  ]),
  { kind: 'shout' as const, company: -1, text: 'Now shout!' },
]

/** How long Gideon's signal lasts; how long he waits between signals; how long the end shows. */
export const SIGNAL = 1.6
export const WAIT = 1
const SHOW = 2.4

interface TorchState {
  time: number
  /** The signal Gideon is giving, or waiting to give. */
  next: number
  /** When that signal began (it comes after the wait). */
  signalAt: number
  doneAt: number
}

const SHOUT = { title: 'Three hundred torches', text: '“A sword for the LORD and for Gideon!”' }

export const torchesAndTrumpets: GameRules<TorchState> = {
  id: 'torches-and-trumpets',
  start: () => ({ time: 0, next: 0, signalAt: WAIT, doneAt: -1 }),
  step(state, inputs: readonly GameInput[], context) {
    const time = state.time + STEP
    if (state.doneAt >= 0) return { ...state, time }
    let { next, signalAt, doneAt } = state
    const signalling = time >= signalAt && (context.gentle || time < signalAt + SIGNAL)
    for (const input of inputs) {
      const tap = (input.kind === 'key' && input.key === 'primary' && input.down) || (input.kind === 'pointer' && input.phase === 'down')
      if (!tap || !signalling) continue
      next++
      signalAt = time + WAIT
      if (next === SIGNALS.length) doneAt = time
      break
    }
    // A signal missed comes again, after a pause.
    if (!context.gentle && doneAt < 0 && time >= signalAt + SIGNAL) signalAt = time + WAIT
    return { time, next, signalAt, doneAt }
  },
  view(state, context): GameView {
    const live: Record<string, number> = {}
    COMPANIES.forEach((c, i) => {
      const broken = state.next > i * 2 + 1
      live[`actor:${c.jar}.opacity`] = broken ? 0 : 1
      live[`actor:${c.torch}.opacity`] = broken ? 1 : 0
    })
    const finished = state.doneAt >= 0
    const signalling = state.time >= state.signalAt && (context.gentle || state.time < state.signalAt + SIGNAL)
    const message = finished ? SHOUT : { title: signalling ? 'Gideon’s signal' : 'Wait for Gideon…', text: signalling ? SIGNALS[state.next]!.text : '“Look at me, and do likewise.”' }
    return { live, hint: finished ? null : HINT, message, done: finished && state.time - state.doneAt >= SHOW }
  },
}
