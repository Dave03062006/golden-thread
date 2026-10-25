import { ANSWERS, CASES, LEADERS, LINE } from '../../content/levels/09-through-the-sea/episode-7'
import { STEP, type Choice, type GameRules, type GameView } from '../framework'

/**
 * Sharing the load (Level 9 script, Episode 7): serving and distributing. The people wait in
 * a long line, each with something to bring: a lost sheep, a broken pot, a quarrel over where
 * a tent's ground ends, a question about God's law. As Jethro advised, small matters go to
 * the leaders Moses has chosen, and great matters to Moses. The player sends each person to
 * the right one; each leader helps the people sent to him, and the line grows shorter, until
 * it is gone and the sun is still high. A wrong choice gets a gentle "think again"; in gentle
 * mode the right one glows.
 */

/** How long each answer shows before the next person comes forward. */
export const SHOW = 2.2

interface LoadState {
  time: number
  answered: number
  answeredAt: number
  missed: boolean
  /** How many people each leader has helped, and how many Moses has. */
  helped: number[]
  moses: number
}

const views = new Map<string, Choice>()
function choiceFor(state: LoadState, gentle: boolean): Choice {
  const showing = state.answered > 0 && (state.time - state.answeredAt < SHOW || state.answered === CASES.length)
  const key = `${state.answered}|${showing}|${state.missed}|${gentle}`
  let view = views.get(key)
  if (!view) {
    if (showing) {
      const c = CASES[state.answered - 1]!
      view = {
        id: `sent-${state.answered}`,
        question: c.text,
        options: [],
        feedback: { right: true, text: c.great ? 'Moses brings it before God, and teaches them God’s way.' : 'The leader decides it, and the people go home in peace.' },
      }
    } else {
      const c = CASES[state.answered]!
      view = {
        id: `case-${state.answered}`,
        question: `${state.answered + 1} of ${CASES.length}: ${c.text} Who should hear it?`,
        options: ANSWERS,
        feedback: state.missed ? { right: false, text: 'Think again: Jethro said every great matter goes to Moses, and every small one to the leaders.' } : null,
        glow: gentle ? (c.great ? 'moses' : 'leaders') : undefined,
      }
    }
    views.set(key, view)
  }
  return view
}

export const sharingTheLoad: GameRules<LoadState> = {
  id: 'sharing-the-load',
  start: () => ({ time: 0, answered: 0, answeredAt: -Infinity, missed: false, helped: LEADERS.map(() => 0), moses: 0 }),
  step(state, inputs) {
    const time = state.time + STEP
    let { answered, answeredAt, missed, moses } = state
    let helped = state.helped
    const asking = answered < CASES.length && time - answeredAt >= SHOW
    for (const input of inputs) {
      if (input.kind !== 'choose' || !asking) continue
      const c = CASES[answered]!
      if (input.option === (c.great ? 'moses' : 'leaders')) {
        if (c.great) moses++
        else {
          // The small matters go round the leaders in turn.
          helped = [...helped]
          const small = CASES.slice(0, answered).filter((x) => !x.great).length
          helped[small % LEADERS.length]!++
        }
        answered++
        answeredAt = time
        missed = false
        break
      }
      missed = true
    }
    return { time, answered, answeredAt, missed, helped, moses }
  },
  view(state, context): GameView {
    const finished = state.answered === CASES.length
    const live: Record<string, number> = {}
    // The line grows shorter, a group for every two people heard.
    LINE.forEach((id, i) => (live[`actor:${id}.opacity`] = state.answered >= (i + 1) * (CASES.length / LINE.length) ? 0 : 1))
    LEADERS.forEach((l, i) => (live[`actor:${l.glow}.opacity`] = finished ? 0.8 : state.helped[i]! > 0 ? 0.8 : 0))
    live['actor:moses-glow.opacity'] = finished || state.moses > 0 ? 0.8 : 0
    return { live, hint: null, choice: choiceFor(state, context.gentle), done: finished && state.time - state.answeredAt >= SHOW + 0.6 }
  },
}
