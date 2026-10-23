import { PLAGUES } from '../../content/levels/08-the-plagues-and-the-passover/episode-3'
import { actor } from '../../scene/build'
import { STEP, type Choice, type GameRules, type GameView } from '../framework'

/**
 * The plagues in order (Level 8 script, Episode 3): ordering. The player puts the nine
 * plagues in the order they came, choosing the next one each time from among the plagues
 * still to come. Each one chosen shows its picture, with a word about it, and takes its place
 * along the scroll; a wrong choice gets a gentle "not yet." In gentle mode the right plague
 * glows.
 */

/** How long each plague's word shows before the next choice. */
export const SHOW = 2.2
/** How many plagues each choice offers. */
const OFFERED = 3

interface PlaguesState {
  time: number
  placed: number
  placedAt: number
  missed: string | null
}

/** The plagues offered for the next place: it and the next few after it, in a jumbled order. */
export function offered(placed: number) {
  const left = PLAGUES.slice(placed, placed + OFFERED)
  const turn = placed % left.length
  return [...left.slice(turn), ...left.slice(0, turn)]
}

const views = new Map<string, Choice>()
function choiceFor(state: PlaguesState, gentle: boolean): Choice {
  const showing = state.placed > 0 && (state.time - state.placedAt < SHOW || state.placed === PLAGUES.length)
  const key = `${state.placed}|${showing}|${state.missed}|${gentle}`
  let view = views.get(key)
  if (!view) {
    const trail = PLAGUES.slice(0, state.placed).map((p) => ({ title: p.name }))
    if (showing) {
      const p = PLAGUES[state.placed - 1]!
      view = { id: `placed-${state.placed}`, question: `${state.placed}. ${p.name}`, options: [], feedback: { right: true, text: p.word }, trail }
    } else {
      const missed = PLAGUES.find((p) => p.id === state.missed)
      view = {
        id: `place-${state.placed}`,
        question: state.placed === 0 ? 'Which plague came first?' : 'Which plague came next?',
        options: offered(state.placed).map((p) => ({ id: p.id, text: p.name })),
        feedback: missed ? { right: false, text: `Not yet: ${missed.name.toLowerCase()} came later.` } : null,
        trail,
        glow: gentle ? PLAGUES[state.placed]!.id : undefined,
      }
    }
    views.set(key, view)
  }
  return view
}

export const thePlaguesInOrder: GameRules<PlaguesState> = {
  id: 'the-plagues-in-order',
  start: () => ({ time: 0, placed: 0, placedAt: -Infinity, missed: null }),
  step(state, inputs, _context, emit) {
    const time = state.time + STEP
    let { placed, placedAt, missed } = state
    const asking = placed < PLAGUES.length && time - placedAt >= SHOW
    for (const input of inputs) {
      if (input.kind !== 'choose' || !asking) continue
      if (input.option === PLAGUES[placed]!.id) {
        emit(actor('plague-sign', { pose: PLAGUES[placed]!.id }, { seconds: 0.3 }))
        placed++
        placedAt = time
        missed = null
        break
      }
      missed = input.option
    }
    return { time, placed, placedAt, missed }
  },
  view(state, context): GameView {
    const finished = state.placed === PLAGUES.length
    const live = { 'actor:plague-sign.opacity': state.placed === 0 || (finished && state.time - state.placedAt >= SHOW) ? 0 : 0.95 }
    return { live, hint: null, choice: choiceFor(state, context.gentle), done: finished && state.time - state.placedAt >= SHOW + 0.6 }
  },
}
