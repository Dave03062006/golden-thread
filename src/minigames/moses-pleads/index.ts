import { PLEAS, REMEMBERED, STORMS } from '../../content/levels/10-sinai/episode-5'
import { STEP, type Choice, type GameRules, type GameView } from '../framework'

/**
 * Moses pleads (Level 10 script, Episode 5): matching and naming. Moses prays for his
 * people in three pleas (Exodus 32:11–13). Each is shown in his own words, and the player
 * matches it to what it asks God to remember: his own people, whom he saved; his holy name
 * among the nations; his promise to their fathers. With each plea matched, a storm cloud on
 * the mountain clears, until God turns from his anger. A wrong match gets a gentle "think
 * again"; in gentle mode the right match glows.
 */

/** How long each answer shows before the next plea; how long a cloud takes to clear. */
export const SHOW = 2.4
const CLEAR = 1.6

interface PleadState {
  time: number
  matched: number
  matchedAt: number
  missed: boolean
}

const views = new Map<string, Choice>()
function choiceFor(state: PleadState, gentle: boolean): Choice {
  const showing = state.matched > 0 && (state.time - state.matchedAt < SHOW || state.matched === PLEAS.length)
  const key = `${state.matched}|${showing}|${state.missed}|${gentle}`
  let view = views.get(key)
  if (!view) {
    const trail = PLEAS.slice(0, state.matched).map((p) => ({ title: REMEMBERED.find((r) => r.id === p.answer)!.text }))
    if (showing) {
      const p = PLEAS[state.matched - 1]!
      view = { id: `pleaded-${state.matched}`, question: `Moses prays: ${p.words}`, options: [], feedback: { right: true, text: REMEMBERED.find((r) => r.id === p.answer)!.text }, trail }
    } else {
      const p = PLEAS[state.matched]!
      view = {
        id: `plea-${state.matched}`,
        question: `Moses prays: ${p.words} What does he ask God to remember?`,
        options: REMEMBERED,
        feedback: state.missed ? { right: false, text: 'Think again: listen to Moses’ own words.' } : null,
        trail,
        glow: gentle ? p.answer : undefined,
      }
    }
    views.set(key, view)
  }
  return view
}

export const mosesPleads: GameRules<PleadState> = {
  id: 'moses-pleads',
  start: () => ({ time: 0, matched: 0, matchedAt: -Infinity, missed: false }),
  step(state, inputs) {
    const time = state.time + STEP
    let { matched, matchedAt, missed } = state
    const asking = matched < PLEAS.length && time - matchedAt >= SHOW
    for (const input of inputs) {
      if (input.kind !== 'choose' || !asking) continue
      if (input.option === PLEAS[matched]!.answer) {
        matched++
        matchedAt = time
        missed = false
        break
      }
      missed = true
    }
    return { time, matched, matchedAt, missed }
  },
  view(state, context): GameView {
    const finished = state.matched === PLEAS.length
    const live: Record<string, number> = {}
    // Each plea clears one of the storm clouds.
    STORMS.forEach((id, i) => (live[`actor:${id}.opacity`] = i >= state.matched ? 1 : i === state.matched - 1 ? Math.max(0, 1 - (state.time - state.matchedAt) / CLEAR) : 0))
    return { live, hint: null, choice: choiceFor(state, context.gentle), done: finished && state.time - state.matchedAt >= SHOW + 0.6 }
  },
}
