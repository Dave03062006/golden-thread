import { NAMES } from '../../content/levels/03-abraham-father-of-faith/episode-6'
import { STEP, type Choice, type GameRules, type GameView } from '../framework'

/**
 * New names (Level 3 script, Episode 6): matching and naming, a quiet one. God gives new
 * names: the player chooses each one, Abram's, then Sarai's, then the name of the son not
 * yet born. A right choice lights that name in the air and says what it means ("Abraham:
 * father of a multitude"); another choice gets a gentle word and another try. In gentle
 * mode the right name glows among the choices.
 */

/** How long a name's meaning shows before the next. */
const SHOW = 2.4

interface NamesState {
  time: number
  /** How many names are given. */
  given: number
  /** When the last one was given. */
  givenAt: number
  /** The last name chosen that wasn't the one. */
  missed: string | null
}

/** Each question's options, in a fixed shuffled order (the screen keeps the same object while nothing changes). */
const OPTIONS = NAMES.map((n, i) => {
  const all = [n.answer, ...n.others]
  return all.map((_, k) => all[(k + i + 1) % all.length]!).map((text) => ({ id: text, text }))
})

const views = new Map<string, Choice>()
function choiceFor(state: NamesState, gentle: boolean): Choice {
  const showing = state.given > 0 && (state.time - state.givenAt < SHOW || state.given === NAMES.length)
  const key = `${state.given}|${showing}|${state.missed}|${gentle}`
  let view = views.get(key)
  if (!view) {
    const trail = NAMES.slice(0, state.given).map((n) => ({ title: n.answer, note: n.meaning.split(': ')[1] }))
    if (showing) {
      const n = NAMES[state.given - 1]!
      view = { id: `named-${state.given}`, question: n.question, options: [], feedback: { right: true, text: n.meaning }, trail }
    } else {
      const n = NAMES[state.given]!
      view = {
        id: `name-${state.given}`,
        question: n.question,
        options: OPTIONS[state.given]!,
        feedback: state.missed ? { right: false, text: `Not ${state.missed}. Listen again to what God says.` } : null,
        trail,
        glow: gentle ? n.answer : undefined,
      }
    }
    views.set(key, view)
  }
  return view
}

export const newNames: GameRules<NamesState> = {
  id: 'new-names',
  start: () => ({ time: 0, given: 0, givenAt: -Infinity, missed: null }),
  step(state, inputs) {
    const time = state.time + STEP
    let { given, givenAt, missed } = state
    const asking = given < NAMES.length && time - givenAt >= SHOW
    for (const input of inputs) {
      if (input.kind !== 'choose' || !asking) continue
      if (input.option === NAMES[given]!.answer) {
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
    const live: Record<string, number> = {}
    NAMES.forEach((_, i) => (live[`actor:name-light-${i + 1}.opacity`] = i < state.given ? 0.8 : 0))
    const finished = state.given === NAMES.length
    return { live, hint: null, choice: choiceFor(state, context.gentle), done: finished && state.time - state.givenAt >= SHOW + 0.4 }
  },
}
