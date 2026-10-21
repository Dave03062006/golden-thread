import { ROADSIDE } from '../../content/levels/05-joseph-and-his-brothers/episode-5'
import { actor } from '../../scene/build'
import { STEP, type GameRules, type GameView, type Hint } from '../framework'

/**
 * The silver cup (Level 5 script, Episode 5): searching. Eleven sacks stand in a row by the
 * road, from Reuben's, the eldest, to Benjamin's, the youngest. The steward searched
 * "beginning with the eldest and ending with the youngest", and the player opens them in
 * that order. Each holds grain and silver, and its owner breathes again, until the last: the
 * cup is in Benjamin's sack. A sack opened out of turn gets a gentle word.
 *
 * Tap a sack to open it, or press Space to open the next. In gentle mode the next sack
 * glows.
 */

export const HINT: Hint = {
  pointer: 'Open the sacks as the steward did: from the eldest brother’s to the youngest’s.',
  keys: 'Or press Space to open the next sack.',
  gesture: 'tap',
}

/** How close a tap must be to a sack, how long the words show, and how long the end shows. */
const NEAR = 0.05
const BETWEEN = 0.6
const WORDS = 1.6
const SHOW = 2.6

interface SearchState {
  time: number
  opened: number
  openedAt: number
  /** The last word: a sack opened in turn, or one tapped out of turn. */
  outOfTurn: boolean
  saidAt: number
}

const OPENED = ROADSIDE.map((s) => ({ title: `${s.owner}’s sack`, text: 'Grain, and his silver. Not the cup.' }))
const FOUND = { title: 'Benjamin’s sack', text: 'The cup was found in Benjamin’s sack.' }
const IN_ORDER = { title: 'The eldest first', text: 'The steward began with the eldest, and ended with the youngest.' }

export const theSilverCup: GameRules<SearchState> = {
  id: 'the-silver-cup',
  start: () => ({ time: 0, opened: 0, openedAt: -Infinity, outOfTurn: false, saidAt: -Infinity }),
  step(state, inputs, _context, emit) {
    const time = state.time + STEP
    let { opened, openedAt, outOfTurn, saidAt } = state
    if (opened < ROADSIDE.length && time - openedAt >= BETWEEN) {
      for (const input of inputs) {
        let which = -1
        if (input.kind === 'key' && input.key === 'primary' && input.down) which = opened
        else if (input.kind === 'pointer' && input.phase === 'down') which = ROADSIDE.findIndex((s) => Math.hypot(s.x - input.x, s.y - 0.02 - input.y) < NEAR)
        if (which < 0) continue
        if (which === opened) {
          emit(actor(ROADSIDE[opened]!.id, { pose: 'half' }, { seconds: 0.4 }))
          opened++
          openedAt = time
          outOfTurn = false
          saidAt = time
          break
        }
        if (which > opened) {
          outOfTurn = true
          saidAt = time
        }
      }
    }
    return { time, opened, openedAt, outOfTurn, saidAt }
  },
  view(state, context): GameView {
    const finished = state.opened === ROADSIDE.length
    const next = ROADSIDE[Math.min(state.opened, ROADSIDE.length - 1)]!
    const live: Record<string, number> = {
      'actor:search-glow.x': next.x,
      'actor:search-glow.y': next.y - 0.04,
      'actor:search-glow.opacity': context.gentle && !finished ? 0.7 + 0.2 * Math.sin(state.time * Math.PI * 1.6) : 0,
      'actor:cup.opacity': finished ? 1 : 0,
    }
    const speaking = state.time - state.saidAt < WORDS
    const message = finished ? FOUND : speaking ? (state.outOfTurn ? IN_ORDER : OPENED[state.opened - 1]!) : null
    return { live, hint: finished ? null : HINT, message, done: finished && state.time - state.openedAt >= SHOW }
  },
}
