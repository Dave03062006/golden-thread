import { FAMILY, MANNA } from '../../content/levels/09-through-the-sea/episode-4'
import { STEP, type GameInput, type GameRules, type GameView, type Hint } from '../framework'

/**
 * Enough for each (Level 9 script, Episode 4): herding and gathering. Morning in the camp,
 * the ground white with manna, and before one tent a family of six with an empty omer jar for
 * each. The player gathers the manna, and it fills the jars, one for each person; however much
 * is gathered, every jar comes out exactly full, "nothing over, no lack." When the sun grows
 * hot, the rest melts away. Then the sixth day, with twice as much for each; and on the
 * seventh the ground is bare, and the family rests. (In Level 8, Pharaoh's stubble was never
 * enough. God's bread is always enough.)
 *
 * Tap a patch of manna (or sweep across it) to gather it, or press Space to gather the next.
 * In gentle mode a tap or sweep anywhere gathers the nearest patch.
 */

export const HINT: Hint = {
  pointer: 'Gather the manna for the family: tap each patch, or sweep across them.',
  keys: 'Or press Space to gather the next.',
  gesture: 'sweep',
}

/** How close a tap must be; how long a patch takes to melt; how long words show; how long the end shows. */
const NEAR = 0.07
const MELT = 1.6
const WORDS = 2
const SHOW = 3
/** The days of gathering: the first morning, and the sixth day with twice as much. */
export const DAYS = 2

interface MannaState {
  time: number
  day: number
  /** The patches gathered this day, and how many jars are filled. */
  gathered: boolean[]
  filled: number
  filledAt: number
  /** When this day's jars were all filled, and the rest began to melt. */
  meltAt: number
  doneAt: number
}

const FILLED = FAMILY.map((_, n) => ({ title: `An omer for ${n + 1} of ${FAMILY.length}`, text: 'As much as each can eat.' }))
const HEAPED = FAMILY.map((_, n) => ({ title: `Two omers for ${n + 1} of ${FAMILY.length}`, text: 'The sixth day: twice as much, for the day of rest.' }))
const MELTED = { title: 'Nothing over, no lack', text: 'Every jar is full. When the sun grows hot, the rest melts away.' }
const SABBATH = { title: 'The seventh day', text: 'The ground is bare: today is a sabbath to the LORD. The family rests.' }

/** Which patch a tap lands on (in gentle mode, the nearest left), or -1. */
function patchAt(gathered: readonly boolean[], x: number, y: number, gentle: boolean): number {
  let best = -1
  let bestD = Infinity
  MANNA.forEach((m, i) => {
    if (gathered[i]) return
    const d = Math.hypot(m.x - x, m.y - y)
    if (d < bestD && (gentle || d < NEAR)) {
      best = i
      bestD = d
    }
  })
  return best
}

export const enoughForEach: GameRules<MannaState> = {
  id: 'enough-for-each',
  start: () => ({ time: 0, day: 0, gathered: MANNA.map(() => false), filled: 0, filledAt: -Infinity, meltAt: -1, doneAt: -1 }),
  step(state, inputs: readonly GameInput[], context) {
    const time = state.time + STEP
    if (state.doneAt >= 0) return { ...state, time }
    let { day, gathered, filled, filledAt, meltAt, doneAt } = state
    if (meltAt >= 0) {
      // The rest melts; then the next day's manna lies on the ground, or the sabbath comes.
      if (time - meltAt >= MELT + WORDS) {
        day++
        if (day === DAYS) doneAt = time
        else {
          gathered = MANNA.map(() => false)
          filled = 0
          meltAt = -1
        }
      }
      return { time, day, gathered, filled, filledAt, meltAt, doneAt }
    }
    gathered = [...gathered]
    for (const input of inputs) {
      let which = -1
      if (input.kind === 'key' && input.key === 'primary' && input.down) which = gathered.indexOf(false)
      else if (input.kind === 'pointer' && input.phase !== 'up') which = patchAt(gathered, input.x, input.y, context.gentle)
      if (which < 0 || filled === FAMILY.length) continue
      gathered[which] = true
      filled++
      filledAt = time
      if (filled === FAMILY.length) meltAt = time
    }
    return { time, day, gathered, filled, filledAt, meltAt, doneAt }
  },
  view(state): GameView {
    const finished = state.doneAt >= 0
    const live: Record<string, number> = {}
    const melting = state.meltAt >= 0 ? Math.min(1, (state.time - state.meltAt) / MELT) : 0
    MANNA.forEach((m, i) => (live[`actor:${m.id}.opacity`] = finished || state.gathered[i] ? 0 : 1 - melting))
    FAMILY.forEach((f, i) => {
      const full = state.day > 0 || i < state.filled
      live[`actor:${f.full}.opacity`] = full ? 1 : 0
      live[`actor:${f.heaped}.opacity`] = finished || (state.day === 1 && i < state.filled) ? 1 : 0
    })
    const told = state.time - state.filledAt < WORDS
    // The last jar's words show in full before the melting's.
    const day = state.day === 0 ? FILLED : HEAPED
    const message = finished ? SABBATH : told ? day[state.filled - 1]! : state.meltAt >= 0 ? MELTED : null
    return { live, hint: finished || state.meltAt >= 0 ? null : HINT, message, done: finished && state.time - state.doneAt >= SHOW }
  },
}
