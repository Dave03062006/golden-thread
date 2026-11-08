import { CHOICES, CHOOSER, LIFE_ROAD } from '../../content/levels/13-moses-last-words/episode-4'
import { lerp } from '../../engine/motion'
import { STEP, type Choice, type GameRules, type GameView } from '../framework'

/**
 * Choose life (Level 13 script, Episode 4): matching and naming. Two roads, side by side: one
 * down to the river and across into a green land, the other turning back into the dry hills.
 * The things a person can choose come one by one, and the player sends each to the road it
 * belongs to. Each one sent to the road of life lights another stretch of it, and the family
 * walks on along it, until it shines all the way across the river. A wrong road gets a gentle
 * word; in gentle mode the right road glows.
 */

/** How long each answer shows before the next choice comes; how long a stretch of road takes to light. */
export const SHOW = 2
const LIGHT = 0.8
const OPTIONS = [
  { id: 'life', text: 'The road of life' },
  { id: 'away', text: 'The road away' },
]

interface LifeState {
  time: number
  sorted: number
  sortedAt: number
  missed: boolean
}

const answerOf = (n: number) => (CHOICES[n]!.life ? 'life' : 'away')
/** How many of the first `n` choices belong to the road of life. */
const lifeCount = (n: number) => CHOICES.slice(0, n).filter((c) => c.life).length

const views = new Map<string, Choice>()
function choiceFor(state: LifeState, gentle: boolean): Choice {
  const showing = state.sorted > 0 && (state.time - state.sortedAt < SHOW || state.sorted === CHOICES.length)
  const key = `${state.sorted}|${showing}|${state.missed}|${gentle}`
  let view = views.get(key)
  if (!view) {
    const trail = CHOICES.slice(0, state.sorted).map((c) => ({ title: c.text, note: c.life ? 'life' : 'away' }))
    if (showing) {
      const c = CHOICES[state.sorted - 1]!
      view = { id: `sorted-${state.sorted}`, question: `${c.text}:`, options: [], feedback: { right: true, text: c.life ? 'The road of life, toward the land.' : 'That road leads away, back into the dry hills.' }, trail }
    } else {
      const c = CHOICES[state.sorted]!
      view = {
        id: `choice-${state.sorted}`,
        question: `${c.text}. Which road does it belong to?`,
        options: OPTIONS,
        feedback: state.missed ? { right: false, text: 'Think again: does it bring you nearer to God, or away from him?' } : null,
        trail,
        glow: gentle ? answerOf(state.sorted) : undefined,
      }
    }
    views.set(key, view)
  }
  return view
}

export const chooseLife: GameRules<LifeState> = {
  id: 'choose-life',
  start: () => ({ time: 0, sorted: 0, sortedAt: -Infinity, missed: false }),
  step(state, inputs) {
    const time = state.time + STEP
    let { sorted, sortedAt, missed } = state
    const asking = sorted < CHOICES.length && time - sortedAt >= SHOW
    for (const input of inputs) {
      if (input.kind !== 'choose' || !asking) continue
      if (input.option === answerOf(sorted)) {
        sorted++
        sortedAt = time
        missed = false
        break
      }
      missed = true
    }
    return { time, sorted, sortedAt, missed }
  },
  view(state, context): GameView {
    const t = state.sorted === 0 ? 0 : Math.min(1, (state.time - state.sortedAt) / LIGHT)
    const before = lifeCount(Math.max(0, state.sorted - 1))
    const now = lifeCount(state.sorted)
    const live: Record<string, number> = {}
    // Each choice of life lights the next stretch of the road, and the family walks on to it.
    LIFE_ROAD.forEach((r, i) => (live[`actor:${r.id}.opacity`] = 0.85 * (i < before ? 1 : i < now ? t : 0)))
    const from = before === 0 ? CHOOSER : LIFE_ROAD[before - 1]!
    const to = now === 0 ? CHOOSER : LIFE_ROAD[now - 1]!
    live['actor:chooser.x'] = lerp(from.x, to.x, t)
    live['actor:chooser.y'] = lerp(from.y, to.y, t) + 0.02
    const finished = state.sorted === CHOICES.length
    return { live, hint: null, choice: choiceFor(state, context.gentle), done: finished && state.time - state.sortedAt >= SHOW + 0.6 }
  },
}
