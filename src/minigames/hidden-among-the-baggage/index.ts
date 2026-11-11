import { HIDING, PILES, SAUL } from '../../content/levels/17-samuel-and-saul/episode-5'
import { STEP, type GameInput, type GameRules, type GameView, type Hint } from '../framework'

/**
 * Hidden among the baggage (Level 17 script, Episode 5): searching. The lot has fallen on Saul,
 * but he can't be found: he is hiding behind one of the piles of baggage at the edge of the
 * camp. The player searches the piles one by one until he is found.
 *
 * Tap a pile (or press Space for the next). In gentle mode Space goes straight to the right pile.
 */

export const HINT: Hint = {
  pointer: 'Find Saul: tap the piles of baggage to search behind them.',
  keys: 'Or press Space to search the next pile.',
  gesture: 'tap',
}

/** Piles stand 0.12 to the right of their x (the set's layout); how near a tap must be; how long the end shows. */
const OFFSET = 0.12
const NEAR = 0.06
const SHOW = 2.4

interface SearchState {
  time: number
  searched: boolean[]
  foundAt: number
}

const EMPTY = { title: 'Not here', text: 'Only sacks and jars. Keep looking.' }
const FOUND = { title: 'Found!', text: '“Behold, he has hidden himself among the baggage.”' }

export const hiddenAmongTheBaggage: GameRules<SearchState> = {
  id: 'hidden-among-the-baggage',
  start: () => ({ time: 0, searched: PILES.map(() => false), foundAt: -1 }),
  step(state, inputs: readonly GameInput[], context) {
    const time = state.time + STEP
    if (state.foundAt >= 0) return { ...state, time }
    const searched = [...state.searched]
    let { foundAt } = state
    for (const input of inputs) {
      let which = -1
      if (input.kind === 'key' && input.key === 'primary' && input.down) which = context.gentle ? HIDING : searched.indexOf(false)
      else if (input.kind === 'pointer' && input.phase === 'down') which = PILES.findIndex((p) => Math.abs(p.x + OFFSET - input.x) < NEAR && input.y > 0.7)
      if (which < 0) continue
      searched[which] = true
      if (which === HIDING) {
        foundAt = time
        break
      }
    }
    return { time, searched, foundAt }
  },
  view(state): GameView {
    const found = state.foundAt >= 0
    const live: Record<string, number> = { [`actor:${SAUL}.opacity`]: found ? 1 : 0 }
    PILES.forEach((p, i) => (live[`actor:${p.id}.opacity`] = state.searched[i] && i !== HIDING ? 0.5 : 1))
    const message = found ? FOUND : state.searched.some(Boolean) ? EMPTY : null
    return { live, hint: found ? null : HINT, message, done: found && state.time - state.foundAt >= SHOW }
  },
}
