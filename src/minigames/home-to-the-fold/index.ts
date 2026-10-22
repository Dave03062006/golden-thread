import { HERDS } from '../../content/levels/06-job/episode-6'
import { lerp } from '../../engine/motion'
import { actor } from '../../scene/build'
import { STEP, type GameRules, type GameView, type Hint } from '../framework'

/**
 * Home to the fold (Level 6 script, Episode 6): herding and gathering. Green hills, and
 * Job's new flocks and herds spreading over them: sheep, camels, oxen and donkeys, twice
 * as many as before. The player calls each herd home to the fold, and it comes trotting
 * in; as it arrives, the count shows it doubled: "seven thousand before; now fourteen
 * thousand."
 *
 * Tap a herd to call it home, or press Space for the next. In gentle mode the herds come
 * home by themselves, one after another.
 */

export const HINT: Hint = {
  pointer: 'Tap each of Job’s herds to call it home to the fold.',
  keys: 'Or press Space for the next herd.',
  gesture: 'tap',
}

/** How long a herd takes to come home, how long its count shows, and how long the end shows. */
const TROT = 2.6
const WORDS = 2.4
const SHOW = 2.6
/** Gentle mode: how long after the last call the next herd sets off by itself. */
const AUTO = 1.8
/** How close a tap must be to a grazing herd. */
const NEAR = 0.08

interface FoldState {
  time: number
  /** When each herd was called, or -1. */
  calledAt: number[]
  /** The herd that came home last, and when. */
  last: number
  homeAt: number
  doneAt: number
}

const COUNTS = HERDS.map((h) => ({ title: h.title, text: h.text }))
const ALL_HOME = { title: 'Twice as much as before', text: 'The LORD gave Job twice as much as he had before.' }
const smooth = (t: number) => (t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t))

export const homeToTheFold: GameRules<FoldState> = {
  id: 'home-to-the-fold',
  start: () => ({ time: 0, calledAt: HERDS.map(() => -1), last: -1, homeAt: -Infinity, doneAt: -1 }),
  step(state, inputs, context, emit) {
    const time = state.time + STEP
    if (state.doneAt >= 0) return { ...state, time }
    const calledAt = [...state.calledAt]
    let { last, homeAt } = state
    const call = (i: number) => {
      if (i < 0 || calledAt[i]! >= 0) return
      calledAt[i] = time
      emit(actor(HERDS[i]!.id, { pose: 'walk', facing: 1 }, { seconds: 0.3 }))
    }
    for (const input of inputs) {
      if (input.kind === 'key' && input.key === 'primary' && input.down) call(calledAt.indexOf(-1))
      else if (input.kind === 'pointer' && input.phase === 'down') call(HERDS.findIndex((h) => Math.hypot(input.x - h.from.x, input.y - h.from.y + 0.02) < NEAR))
    }
    if (context.gentle && time - Math.max(1, ...state.calledAt) >= AUTO) call(calledAt.indexOf(-1))
    // Herds arriving at the fold settle down.
    HERDS.forEach((h, i) => {
      const at = calledAt[i]!
      if (at >= 0 && time - at >= TROT && state.time - at < TROT) {
        emit(actor(h.id, { pose: 'idle' }, { seconds: 0.4 }))
        last = i
        homeAt = time
      }
    })
    const doneAt = calledAt.every((at) => at >= 0 && time - at >= TROT) ? time : -1
    return { time, calledAt, last, homeAt, doneAt }
  },
  view(state, context): GameView {
    const live: Record<string, number> = {}
    HERDS.forEach((h, i) => {
      const at = state.calledAt[i]!
      const t = at < 0 ? 0 : smooth((state.time - at) / TROT)
      live[`actor:${h.id}.x`] = lerp(h.from.x, h.to.x, t)
      live[`actor:${h.id}.y`] = lerp(h.from.y, h.to.y, t)
    })
    // In gentle mode, the next herd to come home glows.
    const next = state.calledAt.indexOf(-1)
    const glowAt = HERDS[next < 0 ? 0 : next]!.from
    live['actor:herd-glow.x'] = glowAt.x
    live['actor:herd-glow.y'] = glowAt.y - 0.02
    live['actor:herd-glow.opacity'] = context.gentle && next >= 0 ? 0.6 + 0.2 * Math.sin(state.time * Math.PI * 1.6) : 0
    const finished = state.doneAt >= 0
    const counting = state.last >= 0 && state.time - state.homeAt < WORDS
    const message = counting ? COUNTS[state.last]! : finished ? ALL_HOME : null
    return { live, hint: finished ? null : HINT, message, done: finished && state.time - state.doneAt >= WORDS + SHOW }
  },
}
