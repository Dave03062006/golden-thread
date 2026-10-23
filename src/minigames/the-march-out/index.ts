import { MARCHERS } from '../../content/levels/08-the-plagues-and-the-passover/episode-5'
import { STEP, type GameInput, type GameRules, type GameView, type Hint } from '../framework'

/**
 * The march out of Egypt (Level 8 script, Episode 5): rhythm. The column of God's people sets
 * out by moonlight, to the beat of a drum. The player taps along with the beat, and with each
 * step in time, more of the people join the march: a father with a child on his shoulders, a
 * flock, the brick-makers, a mother with her kneading bowl, until the whole multitude is on
 * the road. A step out of time doesn't stop anyone; the next beat comes round again.
 *
 * Tap (or press Space) with the beat, which shows as a pulse on screen as well as the drum.
 * In gentle mode any tap counts as a step in time.
 */

export const HINT: Hint = {
  pointer: 'Tap with the beat of the drum, and more of God’s people join the march.',
  keys: 'Or press Space with the beat.',
  gesture: 'tap',
}

/** How often the drum beats, how near the beat a tap must be, and how long a group takes to join. */
export const BEAT = 0.8
export const WINDOW = 0.22
const JOIN = 0.6
/** How long each group's word shows, and how long the end shows. */
const WORDS = 1.6
const SHOW = 2.6

interface MarchState {
  time: number
  joined: number
  joinedAt: number[]
  /** The beat last stepped on, so each beat counts once. */
  lastBeat: number
  doneAt: number
}

/** The nearest beat to a moment, and how far from it the moment is. */
export function nearestBeat(time: number) {
  const n = Math.round(time / BEAT)
  return { n, off: Math.abs(time - n * BEAT) }
}

const JOINED = MARCHERS.map((m, n) => ({ title: `${n + 1} of ${MARCHERS.length}`, text: m.text }))
const ALL = { title: 'The whole multitude', text: 'All the hosts of the LORD went out from the land of Egypt.' }

export const theMarchOut: GameRules<MarchState> = {
  id: 'the-march-out',
  start: () => ({ time: 0, joined: 0, joinedAt: MARCHERS.map(() => -1), lastBeat: 0, doneAt: -1 }),
  step(state, inputs: readonly GameInput[], context) {
    const time = state.time + STEP
    if (state.doneAt >= 0) return { ...state, time }
    let { joined, lastBeat, doneAt } = state
    const joinedAt = [...state.joinedAt]
    const tapped = inputs.some((i) => (i.kind === 'pointer' && i.phase === 'down') || (i.kind === 'key' && i.key === 'primary' && i.down))
    if (tapped) {
      const { n, off } = nearestBeat(time)
      if (n > lastBeat && (context.gentle || off <= WINDOW)) {
        joinedAt[joined] = time
        joined++
        lastBeat = n
        if (joined === MARCHERS.length) doneAt = time
      }
    }
    return { time, joined, joinedAt, lastBeat, doneAt }
  },
  view(state): GameView {
    const live: Record<string, number> = {}
    MARCHERS.forEach((m, i) => {
      const at = state.joinedAt[i]!
      live[`actor:${m.id}.opacity`] = at < 0 ? 0 : Math.min(1, (state.time - at) / JOIN)
    })
    // The drum's pulse: bright on each beat, fading between.
    const sinceBeat = state.time % BEAT
    const finished = state.doneAt >= 0
    live['actor:drum.opacity'] = finished ? 0 : 0.85 * Math.max(0, 1 - sinceBeat / (BEAT * 0.6))
    const telling = state.joined > 0 && state.time - state.joinedAt[state.joined - 1]! < WORDS
    const message = telling ? JOINED[state.joined - 1]! : finished ? ALL : null
    return { live, hint: finished ? null : HINT, message, done: finished && state.time - state.doneAt >= WORDS + SHOW }
  },
}
