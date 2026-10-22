import { formatReference } from '../../content/bible/books'
import { FAINT, LINES, REDEEMER } from '../../content/levels/06-job/episode-4'
import { lerp } from '../../engine/motion'
import { STEP, type Choice, type GameRules, type GameView } from '../framework'

/**
 * Carved in the rock (Level 6 script, Episode 4): memory. The words of Job 19:25 glow on
 * the rock: "For I know that my Redeemer lives, and at last he will stand upon the earth."
 * Then some of the words fade, leaving gaps. The player chooses the missing words in order
 * (Redeemer, lives, stand, earth), and each is carved back into the rock in light, one line
 * at a time. Then the whole verse shines. A wrong word gets a gentle "not quite"; in gentle
 * mode the right word glows among the choices.
 */

/** How long the whole verse shines at first, how long its words take to fade, and how long each carved word shows. */
const OPEN = 3
const FADE = 1
const SHOW = 1.4
/** How long the whole verse shines at the end before the story goes on. */
const END = 2.6

const ASK = OPEN + FADE
const WORDS = [...REDEEMER.missing, ...REDEEMER.others]
// A fixed jumble, so the right words aren't in order.
const OPTIONS = [6, 4, 0, 7, 1, 5, 2, 3].map((i) => ({ id: WORDS[i]!, text: WORDS[i]! }))
const OPENING = { title: formatReference('JOB 19:25'), text: REDEEMER.text }

/** The verse with the words not yet carved back left as gaps. */
function withGaps(found: number): string {
  let text = REDEEMER.text
  REDEEMER.missing.forEach((word, i) => {
    if (i >= found) text = text.replace(new RegExp(`\\b${word}\\b`), '___')
  })
  return text
}

interface CarvedState {
  time: number
  found: number
  foundAt: number
  missed: string | null
}

const views = new Map<string, Choice>()
function choiceFor(state: CarvedState, gentle: boolean): Choice | null {
  if (state.time < ASK) return null
  const total = REDEEMER.missing.length
  const showing = state.found > 0 && (state.time - state.foundAt < SHOW || state.found === total)
  const key = `${state.found}|${showing}|${state.missed}|${gentle}`
  let view = views.get(key)
  if (!view) {
    const trail = REDEEMER.missing.slice(0, state.found).map((title) => ({ title }))
    if (showing) {
      const word = REDEEMER.missing[state.found - 1]!
      const text = state.found === total ? 'The whole verse shines on the rock.' : `“${word}” is carved back into the rock.`
      view = { id: `carved-${state.found}`, question: withGaps(state.found), options: [], feedback: { right: true, text }, trail }
    } else {
      view = {
        id: `gap-${state.found}`,
        question: `${withGaps(state.found)} Which word comes next?`,
        options: OPTIONS,
        feedback: state.missed ? { right: false, text: `Not “${state.missed}”. Listen to Job again.` } : null,
        trail,
        glow: gentle ? REDEEMER.missing[state.found] : undefined,
        compact: true,
      }
    }
    views.set(key, view)
  }
  return view
}

export const carvedInTheRock: GameRules<CarvedState> = {
  id: 'carved-in-the-rock',
  start: () => ({ time: 0, found: 0, foundAt: -Infinity, missed: null }),
  step(state, inputs) {
    const time = state.time + STEP
    let { found, foundAt, missed } = state
    const asking = time >= ASK && found < REDEEMER.missing.length && time - foundAt >= SHOW
    for (const input of inputs) {
      if (input.kind !== 'choose' || !asking) continue
      if (input.option === REDEEMER.missing[found]) {
        found++
        foundAt = time
        missed = null
        break
      }
      missed = input.option
    }
    return { time, found, foundAt, missed }
  },
  view(state, context): GameView {
    const live: Record<string, number> = {}
    // At first the whole verse shines; then the lines fade, and each comes back as its word is carved.
    const fading = Math.min(1, Math.max(0, (state.time - OPEN) / FADE))
    const carving = Math.min(1, (state.time - state.foundAt) / 0.6)
    LINES.forEach((l, i) => {
      live[`actor:${l.id}.opacity`] = i < state.found - 1 ? 1 : i === state.found - 1 ? lerp(FAINT, 1, carving) : lerp(1, FAINT, fading)
    })
    const finished = state.found === REDEEMER.missing.length
    return { live, hint: null, message: state.time < ASK ? OPENING : null, choice: choiceFor(state, context.gentle), done: finished && state.time - state.foundAt >= END }
  },
}
