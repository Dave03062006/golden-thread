import { PLEAS } from '../../content/levels/03-abraham-father-of-faith/episode-8'
import { STEP, type Choice, type GameRules, type GameView } from '../framework'

/**
 * Abraham pleads (Level 3 script, Episode 8): a quiet play, with choosing. Abraham asks
 * again and again for Sodom. Each time the player chooses his next plea, always fewer
 * than before, down to ten; each time the light answers gently, "For the sake of …, I will
 * not destroy it." No choice is punished: a plea for more than he already asked is
 * answered, "Abraham asked for fewer each time." In gentle mode, the next plea glows.
 */

/** How long each answer shows before the next plea. */
const SHOW = 2.4

const words = (n: number) => ({ 50: 'fifty', 45: 'forty-five', 40: 'forty', 30: 'thirty', 20: 'twenty', 10: 'ten', 60: 'sixty', 100: 'a hundred' })[n] ?? String(n)

/** Each question: the plea that comes next, and a larger number offered beside it. */
const QUESTIONS = PLEAS.map((n, i) => {
  const right = `Suppose there are ${words(n)}.`
  const wrong = `Suppose there are ${words(i === 0 ? 100 : i === 1 ? 60 : PLEAS[i - 1]!)}.`
  const options = (i % 2 ? [right, wrong] : [wrong, right]).map((text) => ({ id: text, text }))
  return {
    question: i === 0 ? 'Abraham draws near to the LORD. What does he ask?' : `“For the sake of ${words(PLEAS[i - 1]!)} I will not destroy it.” Abraham speaks again:`,
    right,
    options,
    answer: `“For the sake of ${words(n)} I will not destroy it.”`,
  }
})

interface PleadState {
  time: number
  asked: number
  askedAt: number
  missed: boolean
}

const views = new Map<string, Choice>()
function choiceFor(state: PleadState, gentle: boolean): Choice {
  const showing = state.asked > 0 && (state.time - state.askedAt < SHOW || state.asked === PLEAS.length)
  const key = `${state.asked}|${showing}|${state.missed}|${gentle}`
  let view = views.get(key)
  if (!view) {
    const trail = PLEAS.slice(0, state.asked).map((n) => ({ title: String(n) }))
    if (showing) {
      const q = QUESTIONS[state.asked - 1]!
      view = { id: `asked-${state.asked}`, question: q.question, options: [], feedback: { right: true, text: q.answer }, trail, compact: true }
    } else {
      const q = QUESTIONS[state.asked]!
      view = {
        id: `plea-${state.asked}`,
        question: q.question,
        options: q.options,
        feedback: state.missed ? { right: false, text: 'Abraham asked for fewer each time.' } : null,
        trail,
        glow: gentle ? q.right : undefined,
        compact: true,
      }
    }
    views.set(key, view)
  }
  return view
}

export const abrahamPleads: GameRules<PleadState> = {
  id: 'abraham-pleads',
  start: () => ({ time: 0, asked: 0, askedAt: -Infinity, missed: false }),
  step(state, inputs) {
    const time = state.time + STEP
    let { asked, askedAt, missed } = state
    const asking = asked < PLEAS.length && time - askedAt >= SHOW
    for (const input of inputs) {
      if (input.kind !== 'choose' || !asking) continue
      if (input.option === QUESTIONS[asked]!.right) {
        asked++
        askedAt = time
        missed = false
        break
      }
      missed = true
    }
    return { time, asked, askedAt, missed }
  },
  view(state, context): GameView {
    const finished = state.asked === PLEAS.length
    return { live: {}, hint: null, choice: choiceFor(state, context.gentle), done: finished && state.time - state.askedAt >= SHOW + 0.4 }
  },
}

export const PLEA_OPTIONS = QUESTIONS.map((q) => q.right)
