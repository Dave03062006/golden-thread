import { formatReference } from '../../content/bible/books'
import { verseText } from '../../content/bible/verses'
import { CLAIMS } from '../../content/levels/06-job/episode-3'
import { STEP, type Choice, type GameRules, type GameView } from '../framework'

/**
 * True or twisted? (Level 6 script, Episode 3): spot the twist, like the serpent's words
 * in Level 1. One by one, things the friends said float up, and the player decides: is
 * this true of God, or is it twisted? Some of what they said was true about God, but they
 * used it to accuse a man God himself had called blameless. Each answer shows a short
 * explanation; a wrong one gets a gentle question to think again. In gentle mode the right
 * answer glows.
 */

/** How long each explanation shows before the next words. */
const SHOW = 3.2

const OPTIONS = [
  { id: 'true', text: 'True of God' },
  { id: 'twisted', text: 'Twisted' },
]
/** The words as the friend said them, in quotation marks of their own. */
const quoted = (ref: string) => `“${verseText(ref).replace(/^[“‘…]+|[”’…]+$/g, '')}”`

interface TwistedState {
  time: number
  weighed: number
  weighedAt: number
  missed: boolean
}

const views = new Map<string, Choice>()
function choiceFor(state: TwistedState, gentle: boolean): Choice {
  const showing = state.weighed > 0 && (state.time - state.weighedAt < SHOW || state.weighed === CLAIMS.length)
  const key = `${state.weighed}|${showing}|${state.missed}|${gentle}`
  let view = views.get(key)
  if (!view) {
    const trail = CLAIMS.slice(0, state.weighed).map((c) => ({ title: `${c.speaker}, ${formatReference(c.ref)}`, note: c.answer === 'true' ? 'True of God' : 'Twisted' }))
    if (showing) {
      const c = CLAIMS[state.weighed - 1]!
      view = { id: `weighed-${state.weighed}`, question: `${c.speaker}: ${quoted(c.ref)}`, options: [], feedback: { right: true, text: c.why }, trail }
    } else {
      const c = CLAIMS[state.weighed]!
      view = {
        id: `claim-${state.weighed}`,
        question: `${c.speaker} said: ${quoted(c.ref)} Is this true of God, or twisted?`,
        options: OPTIONS,
        feedback: state.missed ? { right: false, text: c.hint } : null,
        trail,
        glow: gentle ? c.answer : undefined,
      }
    }
    views.set(key, view)
  }
  return view
}

export const trueOrTwisted: GameRules<TwistedState> = {
  id: 'true-or-twisted',
  start: () => ({ time: 0, weighed: 0, weighedAt: -Infinity, missed: false }),
  step(state, inputs) {
    const time = state.time + STEP
    let { weighed, weighedAt, missed } = state
    const asking = weighed < CLAIMS.length && time - weighedAt >= SHOW
    for (const input of inputs) {
      if (input.kind !== 'choose' || !asking) continue
      if (input.option === CLAIMS[weighed]!.answer) {
        weighed++
        weighedAt = time
        missed = false
        break
      }
      missed = true
    }
    return { time, weighed, weighedAt, missed }
  },
  view(state, context): GameView {
    const finished = state.weighed === CLAIMS.length
    return { live: {}, hint: null, choice: choiceFor(state, context.gentle), done: finished && state.time - state.weighedAt >= SHOW + 0.6 }
  },
}
