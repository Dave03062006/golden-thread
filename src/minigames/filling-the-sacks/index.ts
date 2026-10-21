import { SACKS } from '../../content/levels/05-joseph-and-his-brothers/episode-4'
import { actor } from '../../scene/build'
import { STEP, type GameRules, type GameView, type Hint } from '../framework'

/**
 * Filling the sacks (Level 5 script, Episode 4): building and stacking. A heap of grain, an
 * empty sack, and five donkeys waiting, two sacks each. The player fills each sack with
 * grain (holding fills it), and when it's full, the brother's silver goes back in on top, as
 * Joseph ordered. A press then lifts the sack onto its donkey. When the last donkey is
 * loaded, the brothers set off for home.
 *
 * Hold the pointer down (or Space) to fill; press again to load. In gentle mode, one tap
 * fills a sack and loads it by itself.
 */

export const HINT: Hint = {
  pointer: 'Hold to fill the sack with grain, then tap to load it on a donkey.',
  keys: 'Or hold Space to fill, and press it again to load.',
  gesture: 'hold',
}

/** How long a sack takes to fill, how long the silver shows before a gentle load, and how long the end shows. */
const FILL = 1
const GENTLE_LOAD = 0.6
const SHOW = 2.2

interface FillState {
  time: number
  loaded: number
  fill: number
  holding: boolean
  /** Gentle mode: a tap sets this sack going. */
  auto: boolean
  fullAt: number
  doneAt: number
}

const COUNT = Array.from({ length: SACKS.length + 1 }, (_, n) => ({ title: 'Sacks loaded', text: `${n} of ${SACKS.length}` }))
const FINISHED = { title: 'Every sack full', text: 'And every man’s money put back in his sack.' }

const poseFor = (fill: number) => (fill >= 1 ? 'full' : fill >= 0.4 ? 'half' : 'empty')

export const fillingTheSacks: GameRules<FillState> = {
  id: 'filling-the-sacks',
  start: () => ({ time: 0, loaded: 0, fill: 0, holding: false, auto: false, fullAt: -1, doneAt: -1 }),
  step(state, inputs, context, emit) {
    const time = state.time + STEP
    if (state.doneAt >= 0) return { ...state, time }
    let { loaded, fill, holding, auto, fullAt, doneAt } = state
    // A fresh press while the sack is already full loads it.
    let load = false
    for (const input of inputs) {
      const down = (input.kind === 'pointer' && input.phase === 'down') || (input.kind === 'key' && input.key === 'primary' && input.down)
      const up = (input.kind === 'pointer' && input.phase === 'up') || (input.kind === 'key' && input.key === 'primary' && !input.down)
      if (down) {
        if (fill >= 1) load = true
        holding = true
        if (context.gentle) auto = true
      } else if (up) holding = false
    }
    const before = poseFor(fill)
    if (fill < 1 && (holding || auto)) {
      fill = Math.min(1, fill + STEP / FILL)
      if (fill >= 1) fullAt = time
    }
    if (auto && fill >= 1 && time - fullAt >= GENTLE_LOAD) load = true
    if (load) {
      loaded++
      fill = 0
      auto = false
      fullAt = -1
      if (loaded === SACKS.length) doneAt = time
    }
    if (poseFor(fill) !== before) emit(actor('filling-sack', { pose: poseFor(fill) }, { seconds: 0.3 }))
    return { time, loaded, fill, holding, auto, fullAt, doneAt }
  },
  view(state): GameView {
    const live: Record<string, number> = {}
    SACKS.forEach((s, i) => (live[`actor:${s.id}.opacity`] = i < state.loaded ? 1 : 0))
    const finished = state.doneAt >= 0
    live['actor:filling-sack.opacity'] = finished ? 0 : 1
    live['actor:silver.opacity'] = state.fill >= 1 ? 1 : 0
    return { live, hint: finished ? null : HINT, message: finished ? FINISHED : state.loaded > 0 ? COUNT[state.loaded]! : null, done: finished && state.time - state.doneAt >= SHOW }
  },
}
