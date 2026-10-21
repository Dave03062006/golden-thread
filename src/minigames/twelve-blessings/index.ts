import { BLESSINGS, SONS } from '../../content/levels/05-joseph-and-his-brothers/episode-7'
import { actor } from '../../scene/build'
import { STEP, type Choice, type GameRules, type GameView } from '../framework'

/**
 * The twelve blessings (Level 5 script, Episode 7): matching and naming. Jacob's twelve sons
 * stand around his bed. One by one, a picture from his blessings rises over them: a lion, a
 * ship by the shore, a strong donkey, a serpent by the road, a deer let loose, a fruitful
 * vine over a wall, a wolf, rich bread. The player gives each picture to the son it belongs
 * to; a son it doesn't fit gets Jacob's own words as a hint. Reuben, Simeon, Levi and Gad,
 * blessed without a picture, are named as the play begins. In gentle mode the right son
 * glows.
 */

/** How long the opening word shows, and each blessing's words after it is given. */
const OPENING = 3
const SHOW = 2

const OPTIONS = SONS.map((son) => ({ id: son, text: son }))
const OPEN_WORDS = { title: 'Jacob blesses his twelve sons', text: 'Every one of them: Reuben, Simeon, Levi and Gad were blessed too, without a picture.' }

interface BlessingsState {
  time: number
  given: number
  givenAt: number
  missed: string | null
}

const views = new Map<string, Choice>()
function choiceFor(state: BlessingsState, gentle: boolean): Choice {
  const showing = state.given > 0 && (state.time - state.givenAt < SHOW || state.given === BLESSINGS.length)
  const key = `${state.given}|${showing}|${state.missed}|${gentle}`
  let view = views.get(key)
  if (!view) {
    const trail = BLESSINGS.slice(0, state.given).map((b) => ({ title: b.son, note: b.shows }))
    if (showing) {
      const b = BLESSINGS[state.given - 1]!
      view = { id: `blessed-${state.given}`, question: `Jacob blesses ${b.son}.`, options: [], feedback: { right: true, text: b.words }, trail }
    } else {
      const b = BLESSINGS[state.given]!
      view = {
        id: `blessing-${state.given}`,
        question: `Jacob’s blessing shows ${b.shows}. Whose blessing is it?`,
        options: OPTIONS,
        feedback: state.missed ? { right: false, text: `Not ${state.missed}. Listen to Jacob: ${b.words}` } : null,
        trail,
        glow: gentle ? b.son : undefined,
        compact: true,
      }
    }
    views.set(key, view)
  }
  return view
}

export const twelveBlessings: GameRules<BlessingsState> = {
  id: 'twelve-blessings',
  start: () => ({ time: 0, given: 0, givenAt: -Infinity, missed: null }),
  step(state, inputs, _context, emit) {
    const time = state.time + STEP
    let { given, givenAt, missed } = state
    const asking = given < BLESSINGS.length && time - givenAt >= SHOW
    // As each picture's turn begins, it rises over the sons.
    if (asking && given > 0 && state.time - givenAt < SHOW) emit(actor('blessing', { pose: BLESSINGS[given]!.picture }, { seconds: 0.3 }))
    for (const input of inputs) {
      if (input.kind !== 'choose' || !asking) continue
      if (input.option === BLESSINGS[given]!.son) {
        given++
        givenAt = time
        missed = null
        break
      }
      missed = input.option
    }
    return { time, given, givenAt, missed }
  },
  view(state, context): GameView {
    const finished = state.given === BLESSINGS.length
    const live = { 'actor:blessing.opacity': finished && state.time - state.givenAt >= SHOW ? 0 : 0.95 }
    const message = state.time < OPENING ? OPEN_WORDS : null
    return { live, hint: null, message, choice: choiceFor(state, context.gentle), done: finished && state.time - state.givenAt >= SHOW + 0.6 }
  },
}
