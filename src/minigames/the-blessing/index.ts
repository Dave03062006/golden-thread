import { BLESSING, WORD_LIGHTS } from '../../content/levels/04-isaac-and-jacob/episode-3'
import { STEP, type Choice, type GameRules, type GameView } from '../framework'

/**
 * The blessing (Level 4 script, Episode 3): ordering. Isaac's hands rest on Jacob's head,
 * and the words of the blessing float up out of order. The player sets them in the order
 * Isaac spoke them: the dew of heaven, the fatness of the earth, grain and wine; peoples
 * serving; lord over his brothers; blessed be everyone who blesses him. Each word set
 * shines over them; a word chosen out of place drifts back with a hint. In gentle mode the
 * next words glow among the choices.
 */

/** How long a word set shows before the next is asked for. */
const SHOW = 1.6

interface BlessingState {
  time: number
  /** How many words are set, and when the last was. */
  given: number
  givenAt: number
  /** The last words chosen out of place. */
  missed: string | null
}

/** The words still to set, always offered in the same scrambled order. */
const SCRAMBLE = [3, 0, 5, 2, 4, 1]
const optionsFor = (given: number) => SCRAMBLE.filter((i) => i >= given).map((i) => ({ id: BLESSING[i]!.words, text: BLESSING[i]!.words }))
const OPTIONS = BLESSING.map((_, given) => optionsFor(given))

const views = new Map<string, Choice>()
function choiceFor(state: BlessingState, gentle: boolean): Choice {
  const showing = state.given > 0 && (state.time - state.givenAt < SHOW || state.given === BLESSING.length)
  const key = `${state.given}|${showing}|${state.missed}|${gentle}`
  let view = views.get(key)
  if (!view) {
    const trail = BLESSING.slice(0, state.given).map((b) => ({ title: b.words }))
    if (showing) view = { id: `set-${state.given}`, question: 'Isaac blesses Jacob.', options: [], feedback: { right: true, text: `“…${BLESSING[state.given - 1]!.words.toLowerCase()}…”` }, trail }
    else {
      const next = BLESSING[state.given]!
      view = {
        id: `word-${state.given}`,
        question: state.given === 0 ? 'What did Isaac say first?' : 'And what did he say next?',
        options: OPTIONS[state.given]!,
        feedback: state.missed ? { right: false, text: `Not yet. ${next.hint}` } : null,
        trail,
        glow: gentle ? next.words : undefined,
      }
    }
    views.set(key, view)
  }
  return view
}

export const theBlessing: GameRules<BlessingState> = {
  id: 'the-blessing',
  start: () => ({ time: 0, given: 0, givenAt: -Infinity, missed: null }),
  step(state, inputs) {
    const time = state.time + STEP
    let { given, givenAt, missed } = state
    const asking = given < BLESSING.length && time - givenAt >= SHOW
    for (const input of inputs) {
      if (input.kind !== 'choose' || !asking) continue
      if (input.option === BLESSING[given]!.words) {
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
    WORD_LIGHTS.forEach((w, i) => (live[`actor:${w.id}.opacity`] = i < state.given ? 0.85 : 0))
    const finished = state.given === BLESSING.length
    return { live, hint: null, choice: choiceFor(state, context.gentle), done: finished && state.time - state.givenAt >= SHOW + 0.6 }
  },
}
