import { APPROACH, LIGHT } from '../../content/levels/07-moses-is-called/episode-4'
import { lerp } from '../../engine/motion'
import { actor } from '../../scene/build'
import { STEP, type GameRules, type GameView, type Hint } from '../framework'

/**
 * Turn aside and see (Level 7 script, Episode 4): light and reveal. The bush burns on the
 * mountainside, and Moses comes closer, a step at a time. With each step the flame's light
 * reaches further and shows more: from far off only the fire; nearer, the thorny branches,
 * and the green leaves untouched by it. "The bush is not burnt!" When he is close, the voice
 * comes (the story goes on).
 *
 * Tap (or press Space) for each step. In gentle mode Moses walks on by himself after a moment.
 */

export const HINT: Hint = {
  pointer: 'Tap to lead Moses closer to the burning bush, a step at a time.',
  keys: 'Or press Space for each step.',
  gesture: 'tap',
}

/** How long a step takes, how long gentle mode waits before the next, and how long the end shows. */
const STEP_SECONDS = 0.8
const GENTLE_WAIT = 1.4
const SHOW = 2.6
/** From this step on, the leaves can be seen. */
const LEAVES_AT = 3

interface ApproachState {
  time: number
  steps: number
  stepAt: number
  doneAt: number
}

const SEEN = [
  { title: 'A flame on the mountainside', text: 'Moses turns aside to see.' },
  { title: 'Closer', text: 'The branches are on fire.' },
  { title: 'Closer still', text: 'But the leaves are green.' },
  { title: 'The bush is not burnt!', text: 'It burns, and burns, and is not consumed.' },
  { title: 'A great sight', text: 'The light is all around him.' },
  { title: 'Close enough', text: 'Then a voice, out of the bush.' },
]

export const turnAsideAndSee: GameRules<ApproachState> = {
  id: 'turn-aside-and-see',
  start: () => ({ time: 0, steps: 0, stepAt: -Infinity, doneAt: -1 }),
  step(state, inputs, context, emit) {
    const time = state.time + STEP
    if (state.doneAt >= 0) return { ...state, time }
    let { steps, stepAt, doneAt } = state
    const busy = time - stepAt < STEP_SECONDS
    // A step under way ends.
    if (state.time - stepAt < STEP_SECONDS && !busy) {
      emit(actor('moses', { pose: 'idle' }, { seconds: 0.3 }))
      if (steps === APPROACH.steps) doneAt = time
    }
    const asked = inputs.some((i) => (i.kind === 'pointer' && i.phase === 'down') || (i.kind === 'key' && i.key === 'primary' && i.down))
    const onItsOwn = context.gentle && time - Math.max(0, stepAt) >= GENTLE_WAIT + STEP_SECONDS
    if (!busy && doneAt < 0 && steps < APPROACH.steps && (asked || onItsOwn)) {
      steps++
      stepAt = time
      emit(actor('moses', { pose: 'walk', facing: 1 }, { seconds: 0.2 }))
      if (steps === LEAVES_AT) emit(actor('bush', { pose: 'near' }, { seconds: 0.6 }))
    }
    return { time, steps, stepAt, doneAt }
  },
  view(state): GameView {
    // How far he has come: each step eased as he walks it.
    const walking = Math.min(1, (state.time - state.stepAt) / STEP_SECONDS)
    const near = (state.steps - 1 + walking) / APPROACH.steps
    const come = Math.max(0, state.steps === 0 ? 0 : near)
    const x = lerp(APPROACH.from, APPROACH.to, come)
    const live: Record<string, number> = {
      'actor:moses.x': x,
      'actor:rod.x': x + 0.018,
      'actor:bush-light.size': lerp(LIGHT.far.size, LIGHT.near.size, come),
      'actor:bush-light.opacity': lerp(LIGHT.far.opacity, LIGHT.near.opacity, come),
    }
    const finished = state.doneAt >= 0
    const message = state.steps > 0 ? SEEN[state.steps - 1]! : null
    return { live, hint: finished || state.steps === APPROACH.steps ? null : HINT, message, done: finished && state.time - state.doneAt >= SHOW }
  },
}
