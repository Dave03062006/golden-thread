import { HOUSES, MIDWIVES } from '../../content/levels/07-moses-is-called/episode-1'
import { actor } from '../../scene/build'
import { STEP, type GameInput, type GameRules, type GameView, type Hint } from '../framework'

/**
 * The midwives' night (Level 7 script, Episode 1): stealth and escape. Night in the Hebrew
 * quarter. Shiphrah and Puah go from house to house, bringing the newborn sons safely home,
 * while Pharaoh's watchman walks his round with a lantern. The player moves them along the
 * street, and when the watchman turns his light toward them, they stop in the shadows and
 * wait until it turns away: nobody is caught, they only wait. At each house they reach, a
 * lamp is lit in the window. Five houses, five babies safe.
 *
 * Hold (a pointer or Space) to walk. In gentle mode the watchman is slow and sleepy: his
 * light turns less often, and only for a moment.
 */

export const HINT: Hint = {
  pointer: 'Hold to walk the midwives along the street. When the watchman’s light turns, they wait in the shadows.',
  keys: 'Or hold Space to walk.',
  gesture: 'hold',
}

/** How fast the midwives walk, in frame widths a second. */
const WALK = 0.065
/** The watchman's round: how long he looks away, turns (his lantern rises), and looks down the street. */
const WATCH = { away: 3.4, turning: 0.7, looking: 2.2 }
const SLEEPY = { away: 5.5, turning: 1, looking: 1.2 }
/** How long the end shows before the story goes on. */
const SHOW = 2.6

interface NightState {
  time: number
  x: number
  holding: boolean
  walking: boolean
  /** Houses reached, and when the last was. */
  reached: number
  reachedAt: number
  doneAt: number
}

type Watch = 'away' | 'turning' | 'looking'

/** Where the watchman is in his round at a moment. */
export function watchAt(time: number, gentle: boolean): Watch {
  const w = gentle ? SLEEPY : WATCH
  const t = time % (w.away + w.turning + w.looking)
  return t < w.away ? 'away' : t < w.away + w.turning ? 'turning' : 'looking'
}

const SAFE = HOUSES.map((_, n) => ({ title: n === HOUSES.length - 1 ? 'Five babies safe' : 'A baby boy, safe at home', text: `${n + 1} of ${HOUSES.length} houses` }))
const WAIT = { title: 'The watchman’s light!', text: 'They wait in the shadows until it turns away.' }
const DAWN = { title: 'The midwives feared God', text: 'Every baby boy was safe at home with his mother.' }

const pressed = (inputs: readonly GameInput[]) => inputs.some((i) => (i.kind === 'pointer' && i.phase === 'down') || (i.kind === 'key' && i.key === 'primary' && i.down))
const released = (inputs: readonly GameInput[]) => inputs.some((i) => (i.kind === 'pointer' && i.phase === 'up') || (i.kind === 'key' && i.key === 'primary' && !i.down))

export const theMidwivesNight: GameRules<NightState> = {
  id: 'the-midwives-night',
  start: () => ({ time: 0, x: MIDWIVES.from, holding: false, walking: false, reached: 0, reachedAt: -Infinity, doneAt: -1 }),
  step(state, inputs, context, emit) {
    const time = state.time + STEP
    if (state.doneAt >= 0) return { ...state, time }
    let { x, holding, walking, reached, reachedAt, doneAt } = state
    if (pressed(inputs)) holding = true
    if (released(inputs)) holding = false
    const watch = watchAt(time, context.gentle)
    // The watchman turns toward the street as his round goes on, and away again.
    const before = watchAt(state.time, context.gentle)
    if (before !== watch && watch === 'looking') emit(actor('watchman', { facing: -1 }, { seconds: 0.3 }))
    if (before !== watch && watch === 'away') emit(actor('watchman', { facing: 1 }, { seconds: 0.3 }))
    // They walk while held, except while the light is on the street.
    const go = holding && watch !== 'looking'
    if (go !== walking) {
      walking = go
      for (const id of ['shiphrah', 'puah']) emit(actor(id, { pose: go ? 'walk' : 'idle', facing: 1 }, { seconds: 0.2 }))
    }
    if (walking) x = Math.min(HOUSES.at(-1)!.x, x + WALK * STEP)
    while (reached < HOUSES.length && x >= HOUSES[reached]!.x) {
      reached++
      reachedAt = time
    }
    if (reached === HOUSES.length) {
      doneAt = time
      if (walking) {
        walking = false
        for (const id of ['shiphrah', 'puah']) emit(actor(id, { pose: 'idle', facing: 1 }, { seconds: 0.2 }))
      }
    }
    return { time, x, holding, walking, reached, reachedAt, doneAt }
  },
  view(state, context): GameView {
    const watch = state.doneAt >= 0 ? 'away' : watchAt(state.time, context.gentle)
    const live: Record<string, number> = {
      'actor:shiphrah.x': state.x,
      'actor:puah.x': state.x - MIDWIVES.gap,
      'actor:watch-light.x': state.x,
      'actor:watch-light.opacity': watch === 'looking' ? 0.75 : watch === 'turning' ? 0.3 : 0,
    }
    HOUSES.forEach((h, i) => (live[`actor:${h.id}.opacity`] = i < state.reached ? 0.9 : 0))
    const finished = state.doneAt >= 0
    const justReached = state.reached > 0 && state.time - state.reachedAt < 1.8
    const message = finished && !justReached ? DAWN : justReached ? SAFE[state.reached - 1]! : watch === 'looking' && state.holding ? WAIT : null
    return { live, hint: finished ? null : HINT, message, done: finished && state.time - state.doneAt >= SHOW }
  },
}
