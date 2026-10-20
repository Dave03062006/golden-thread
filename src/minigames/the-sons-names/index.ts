import { BABIES, SONS } from '../../content/levels/04-isaac-and-jacob/episode-5'
import { actor } from '../../scene/build'
import { STEP, type Choice, type GameRules, type GameView } from '../framework'

/**
 * The sons' names (Level 4 script, Episode 5): matching and naming. Each mother's words
 * are shown beside a sleeping baby, and the player gives the baby the name that sounds like
 * them in Hebrew: Reuben ("see, a son"), Simeon ("heard"), Levi ("joined"), Judah
 * ("praise"), and, last, Rachel's Joseph ("may he add"), who appears in her arms when his
 * turn comes. A name that doesn't fit gets a gentle word and another try. In gentle mode
 * the right name glows among the choices.
 */

/** How long a name's meaning shows before the next. */
const SHOW = 2.2

interface NamesState {
  time: number
  given: number
  givenAt: number
  missed: string | null
}

/** The names still to give, always offered in the same order. */
const ORDER = ['Judah', 'Reuben', 'Joseph', 'Levi', 'Simeon']
const OPTIONS = SONS.map((_, given) => ORDER.filter((n) => SONS.findIndex((s) => s.name === n) >= given).map((text) => ({ id: text, text })))

const views = new Map<string, Choice>()
function choiceFor(state: NamesState, gentle: boolean): Choice {
  const showing = state.given > 0 && (state.time - state.givenAt < SHOW || state.given === SONS.length)
  const key = `${state.given}|${showing}|${state.missed}|${gentle}`
  let view = views.get(key)
  if (!view) {
    const trail = SONS.slice(0, state.given).map((s) => ({ title: s.name, note: s.meaning.split(': ')[1] }))
    if (showing) {
      const s = SONS[state.given - 1]!
      view = { id: `named-${state.given}`, question: `${s.mother} says: ${s.words}`, options: [], feedback: { right: true, text: s.meaning }, trail }
    } else {
      const s = SONS[state.given]!
      view = {
        id: `son-${state.given}`,
        question: `${s.mother} says: ${s.words} What does she name him?`,
        options: OPTIONS[state.given]!,
        feedback: state.missed ? { right: false, text: `Not ${state.missed}. Listen to her words: his name sounds like them in Hebrew.` } : null,
        trail,
        glow: gentle ? s.name : undefined,
      }
    }
    views.set(key, view)
  }
  return view
}

export const theSonsNames: GameRules<NamesState> = {
  id: 'the-sons-names',
  start: () => ({ time: 0, given: 0, givenAt: -Infinity, missed: null }),
  step(state, inputs, _context, emit) {
    const time = state.time + STEP
    let { given, givenAt, missed } = state
    const asking = given < SONS.length && time - givenAt >= SHOW
    // Rachel's son comes last: she holds him as his turn begins.
    if (asking && given === SONS.length - 1 && state.time - givenAt < SHOW) emit(actor('rachel', { pose: 'carry' }, { seconds: 1 }))
    for (const input of inputs) {
      if (input.kind !== 'choose' || !asking) continue
      if (input.option === SONS[given]!.name) {
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
    BABIES.forEach((b, i) => (live[`actor:${b.light}.opacity`] = i < state.given ? 0.8 : 0))
    // Joseph is born, in Rachel's arms, when his turn comes: he fades in as it begins.
    const joseph = state.given === 5 ? 1 : state.given === 4 ? Math.min(1, Math.max(0, (state.time - state.givenAt - SHOW) / 0.8)) : 0
    live[`actor:${BABIES[4]!.id}.opacity`] = joseph
    const finished = state.given === SONS.length
    return { live, hint: null, choice: choiceFor(state, context.gentle), done: finished && state.time - state.givenAt >= SHOW + 0.4 }
  },
}
