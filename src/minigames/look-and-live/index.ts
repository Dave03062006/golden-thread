import { BITTEN, BITTEN_Y } from '../../content/levels/12-forty-years-in-the-wilderness/episode-6'
import { actor } from '../../scene/build'
import { STEP, type GameInput, type GameRules, type GameView, type Hint } from '../framework'

/**
 * Look and live (Level 12 script, Episode 6): a quiet interaction. The camp at dusk, with the
 * bronze serpent lifted high in the middle. Around it, people who were bitten lie in their
 * tents with their eyes down. The player helps each one to look up: they lift their heads,
 * the glow of the serpent falls on their faces, and they are well. When everyone has looked,
 * the whole camp is facing the pole.
 *
 * Tap someone lying down (or press Space for the next) to help them look up. In gentle mode a
 * tap anywhere helps the next.
 */

export const HINT: Hint = {
  pointer: 'Help each one who was bitten to look up at the bronze serpent: tap them.',
  keys: 'Or press Space for the next.',
  gesture: 'tap',
}

/** How near a tap must be; how long the glow takes to come; how long words show; how long the end shows. */
const NEAR = 0.06
const GLOW = 0.8
const WORDS = 1.6
const SHOW = 2.6

interface LookState {
  time: number
  lookedAt: number[]
  count: number
  lastAt: number
  doneAt: number
}

const LOOKED = { title: 'Looked, and lived', text: '“If a serpent bit any man, he would look at the bronze serpent and live.”' }
const ALL = { title: 'The whole camp', text: 'Everyone who looked lived. God had kept his promise.' }

export const lookAndLive: GameRules<LookState> = {
  id: 'look-and-live',
  start: () => ({ time: 0, lookedAt: BITTEN.map(() => -1), count: 0, lastAt: -Infinity, doneAt: -1 }),
  step(state, inputs: readonly GameInput[], context, emit) {
    const time = state.time + STEP
    if (state.doneAt >= 0) return { ...state, time }
    const lookedAt = [...state.lookedAt]
    let { count, lastAt, doneAt } = state
    for (const input of inputs) {
      let which = -1
      if ((input.kind === 'key' && input.key === 'primary' && input.down) || (input.kind === 'pointer' && input.phase === 'down' && context.gentle)) which = lookedAt.indexOf(-1)
      else if (input.kind === 'pointer' && input.phase === 'down') which = BITTEN.findIndex((b, i) => lookedAt[i]! < 0 && Math.hypot(b.x - input.x, BITTEN_Y - 0.03 - input.y) < NEAR)
      if (which < 0) continue
      lookedAt[which] = time
      lastAt = time
      count++
      // They lift their heads to the serpent, and are well.
      emit(actor(BITTEN[which]!.id, { pose: 'pray' }, { seconds: 0.8 }))
      if (count === BITTEN.length) doneAt = time
    }
    return { time, lookedAt, count, lastAt, doneAt }
  },
  view(state): GameView {
    const live: Record<string, number> = {}
    BITTEN.forEach((b, i) => {
      const at = state.lookedAt[i]!
      live[`actor:${b.glow}.opacity`] = at < 0 ? 0 : 0.8 * Math.min(1, (state.time - at) / GLOW)
    })
    const finished = state.doneAt >= 0
    const telling = state.count > 0 && state.time - state.lastAt < WORDS
    const message = telling ? LOOKED : finished ? ALL : null
    return { live, hint: finished ? null : HINT, message, done: finished && state.time - state.doneAt >= WORDS + SHOW }
  },
}
