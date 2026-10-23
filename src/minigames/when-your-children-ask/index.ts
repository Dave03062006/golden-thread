import { ASKED, MEANINGS } from '../../content/levels/08-the-plagues-and-the-passover/episode-6'
import { STEP, type Choice, type GameRules, type GameView } from '../framework'

/**
 * When your children ask (Level 8 script, Episode 6): matching and naming. At the Passover
 * table, the youngest child points to each thing in turn and asks, "What does this mean?"
 * The player chooses the answer that belongs to it: the lamb, the flat bread, the bitter
 * herbs, the staff by the wall. Each right answer is told to the child, who points to the
 * next. A wrong answer gets a gentle "think again"; in gentle mode the right answer glows.
 */

/** How long each answer shows before the child asks about the next thing. */
export const SHOW = 2.4

const OPTIONS = MEANINGS.map((m) => ({ id: m.id, text: m.text }))

interface AskState {
  time: number
  answered: number
  answeredAt: number
  missed: boolean
}

const views = new Map<string, Choice>()
function choiceFor(state: AskState, gentle: boolean): Choice {
  const showing = state.answered > 0 && (state.time - state.answeredAt < SHOW || state.answered === ASKED.length)
  const key = `${state.answered}|${showing}|${state.missed}|${gentle}`
  let view = views.get(key)
  if (!view) {
    const trail = ASKED.slice(0, state.answered).map((a) => ({ title: a.name[0]!.toUpperCase() + a.name.slice(1) }))
    if (showing) {
      const a = ASKED[state.answered - 1]!
      view = { id: `told-${state.answered}`, question: `“What does ${a.name} mean?”`, options: [], feedback: { right: true, text: MEANINGS.find((m) => m.id === a.answer)!.text }, trail }
    } else {
      const a = ASKED[state.answered]!
      view = {
        id: `ask-${state.answered}`,
        question: `The child points to ${a.name}: “What does this mean?”`,
        options: OPTIONS,
        feedback: state.missed ? { right: false, text: 'Think again: what happened on the night God brought his people out of Egypt?' } : null,
        trail,
        glow: gentle ? a.answer : undefined,
      }
    }
    views.set(key, view)
  }
  return view
}

export const whenYourChildrenAsk: GameRules<AskState> = {
  id: 'when-your-children-ask',
  start: () => ({ time: 0, answered: 0, answeredAt: -Infinity, missed: false }),
  step(state, inputs) {
    const time = state.time + STEP
    let { answered, answeredAt, missed } = state
    const asking = answered < ASKED.length && time - answeredAt >= SHOW
    for (const input of inputs) {
      if (input.kind !== 'choose' || !asking) continue
      if (input.option === ASKED[answered]!.answer) {
        answered++
        answeredAt = time
        missed = false
        break
      }
      missed = true
    }
    return { time, answered, answeredAt, missed }
  },
  view(state, context): GameView {
    const finished = state.answered === ASKED.length
    // A glow on the thing the child is pointing to.
    const showing = state.answered > 0 && state.time - state.answeredAt < SHOW
    const pointing = ASKED[Math.min(ASKED.length - 1, showing || finished ? state.answered - 1 : state.answered)]!
    const live = { 'actor:asking.x': pointing.x, 'actor:asking.opacity': finished && !showing ? 0 : 0.8 }
    return { live, hint: null, choice: choiceFor(state, context.gentle), done: finished && state.time - state.answeredAt >= SHOW + 0.6 }
  },
}
