import { FEASTS, MEANINGS, WHEEL } from '../../content/levels/11-the-tabernacle-and-the-holy-life/episode-6'
import { lerp } from '../../engine/motion'
import { STEP, type Choice, type GameRules, type GameView } from '../framework'

/**
 * The feasts of the year (Level 11 script, Episode 6): matching and naming. The year is a
 * wheel of twelve moons around the tabernacle. One by one the feasts come up in its middle,
 * each with its sign, and the player matches each to what it remembers or gives thanks for.
 * Each feast then takes its place on the wheel, at its season. A wrong match gets a gentle
 * "think again"; in gentle mode the right match glows.
 */

/** How long each answer shows before the next feast; how long a sign takes to reach its season. */
export const SHOW = 2.4
const SETTLE = 1.2
/** Where a feast's sign shows while it's asked: the middle of the wheel, above the tabernacle. */
const ASKED = { x: WHEEL.x, y: WHEEL.y - 0.08 }

interface FeastsState {
  time: number
  matched: number
  matchedAt: number
  missed: boolean
}

const views = new Map<string, Choice>()
function choiceFor(state: FeastsState, gentle: boolean): Choice {
  const showing = state.matched > 0 && (state.time - state.matchedAt < SHOW || state.matched === FEASTS.length)
  const key = `${state.matched}|${showing}|${state.missed}|${gentle}`
  let view = views.get(key)
  if (!view) {
    const meaning = (id: string) => MEANINGS.find((m) => m.id === id)!.text
    const trail = FEASTS.slice(0, state.matched).map((f) => ({ title: f.name, note: meaning(f.answer) }))
    if (showing) {
      const f = FEASTS[state.matched - 1]!
      view = { id: `matched-${state.matched}`, question: `${f.name}:`, options: [], feedback: { right: true, text: meaning(f.answer) }, trail }
    } else {
      const f = FEASTS[state.matched]!
      view = {
        id: `feast-${state.matched}`,
        question: `${f.name}, ${f.with}. What does it remember, or give thanks for?`,
        options: MEANINGS,
        feedback: state.missed ? { right: false, text: 'Think again: look at its sign.' } : null,
        trail,
        glow: gentle ? f.answer : undefined,
      }
    }
    views.set(key, view)
  }
  return view
}

const ease = (t: number) => t * t * (3 - 2 * t)

export const theFeastsOfTheYear: GameRules<FeastsState> = {
  id: 'the-feasts-of-the-year',
  start: () => ({ time: 0, matched: 0, matchedAt: -Infinity, missed: false }),
  step(state, inputs) {
    const time = state.time + STEP
    let { matched, matchedAt, missed } = state
    const asking = matched < FEASTS.length && time - matchedAt >= SHOW
    for (const input of inputs) {
      if (input.kind !== 'choose' || !asking) continue
      if (input.option === FEASTS[matched]!.answer) {
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
    const finished = state.matched === FEASTS.length
    const live: Record<string, number> = {}
    // The feast being asked shows in the middle; once matched, it goes to its season on the wheel.
    const asked = finished || state.time - state.matchedAt < SHOW ? -1 : state.matched
    FEASTS.forEach((f, i) => {
      const t = i < state.matched - 1 ? 1 : i === state.matched - 1 ? ease(Math.min(1, (state.time - state.matchedAt) / SETTLE)) : 0
      const shown = i < state.matched || i === asked
      live[`actor:${f.id}.x`] = lerp(ASKED.x, f.at.x, t)
      live[`actor:${f.id}.y`] = lerp(ASKED.y, f.at.y, t)
      live[`actor:${f.id}.opacity`] = shown ? 1 : 0
    })
    return { live, hint: null, choice: choiceFor(state, context.gentle), done: finished && state.time - state.matchedAt >= SHOW + 0.6 }
  },
}
