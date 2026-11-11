import { PRAYER } from '../../content/levels/17-samuel-and-saul/episode-1'
import { lerp } from '../../engine/motion'
import { STEP, type GameInput, type GameRules, type GameView, type Hint } from '../framework'

/**
 * Pouring out her soul (Level 17 script, Episode 1): a quiet interaction. Hannah prays in
 * silence at Shiloh. The player presses and holds while she prays, and a soft light rises from
 * her; letting go is fine, she rests, and prays on when the player holds again. In gentle mode
 * one press is enough: she prays on by herself.
 */

export const HINT: Hint = {
  pointer: 'Press and hold to pray with Hannah, in silence.',
  keys: 'Or hold Space.',
  gesture: 'hold',
}

/** How long Hannah prays, held, until the light reaches the top; how long the end shows. */
export const PRAY = 4
const SHOW = 2.4

interface PrayerState {
  time: number
  holding: boolean
  prayed: number
  doneAt: number
}

const FINISHED = { title: 'Her lips moved', text: '“I have been pouring out my soul before the LORD.”' }

export const pouringOutHerSoul: GameRules<PrayerState> = {
  id: 'pouring-out-her-soul',
  start: () => ({ time: 0, holding: false, prayed: 0, doneAt: -1 }),
  step(state, inputs: readonly GameInput[], context) {
    const time = state.time + STEP
    if (state.doneAt >= 0) return { ...state, time }
    let { holding, doneAt } = state
    for (const input of inputs) {
      // In gentle mode, once begun, the prayer goes on by itself.
      if (input.kind === 'key' && input.key === 'primary') holding = input.down || (context.gentle && holding)
      else if (input.kind === 'pointer') holding = input.phase !== 'up' || (context.gentle && holding)
    }
    const prayed = holding ? Math.min(1, state.prayed + STEP / PRAY) : state.prayed
    if (prayed >= 1) doneAt = time
    return { time, holding, prayed, doneAt }
  },
  view(state): GameView {
    const finished = state.doneAt >= 0
    const live = {
      [`actor:${PRAYER.id}.y`]: finished ? PRAYER.to : lerp(PRAYER.from, PRAYER.to, state.prayed),
      [`actor:${PRAYER.id}.opacity`]: finished ? 0.9 : 0.6 + 0.3 * state.prayed,
    }
    return { live, hint: finished ? null : HINT, message: finished ? FINISHED : null, done: finished && state.time - state.doneAt >= SHOW }
  },
}
