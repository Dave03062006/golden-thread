import { COMERS, COMERS_Y } from '../../content/levels/05-joseph-and-his-brothers/episode-6'
import { actor } from '../../scene/build'
import { STEP, type GameRules, type GameView, type Hint } from '../framework'

/**
 * Come near to me (Level 5 script, Episode 6): a quiet interaction. Joseph stands with his
 * arms open; his brothers stand back in fear, heads down. The player helps each one take a
 * step closer, and as he comes near, he stands up straight. Some hang back and need two
 * steps. When all have come near, Benjamin last, Joseph embraces him (the story goes on).
 *
 * Tap a brother to help him step closer, or press Space for the next. In gentle mode they
 * come near on their own, one after another.
 */

export const HINT: Hint = {
  pointer: 'Tap each brother to help him come near to Joseph.',
  keys: 'Or press Space to help the next one.',
  gesture: 'tap',
}

/** How long a step takes, how far a tap may be from a brother, how often they come in gentle mode, and how long the end shows. */
const STEP_SECONDS = 0.9
const NEAR = 0.05
const GENTLE = 1.1
const SHOW = 2

interface Comer {
  x: number
  /** Steps taken, and when the last began. */
  taken: number
  since: number
  from: number
}

interface NearState {
  time: number
  comers: Comer[]
  lastAt: number
  doneAt: number
}

const ALL_NEAR = { title: 'All of them near', text: 'And they came near.' }

const stepTo = (c: (typeof COMERS)[number], taken: number) => c.from + ((c.to - c.from) * taken) / c.steps

export const comeNear: GameRules<NearState> = {
  id: 'come-near',
  start: () => ({ time: 0, comers: COMERS.map((c) => ({ x: c.from, taken: 0, since: -Infinity, from: c.from })), lastAt: -Infinity, doneAt: -1 }),
  step(state, inputs, context, emit) {
    const time = state.time + STEP
    if (state.doneAt >= 0) return { ...state, time }
    const comers = state.comers.map((c) => ({ ...c }))
    let { lastAt, doneAt } = state
    const moving = (i: number) => time - comers[i]!.since < STEP_SECONDS
    const help = (i: number) => {
      const c = comers[i]!
      const def = COMERS[i]!
      if (c.taken >= def.steps || moving(i)) return
      c.from = c.x
      c.taken++
      c.since = time
      lastAt = time
      emit(actor(def.id, { pose: 'walk', facing: 1 }, { seconds: 0.2 }))
    }
    const next = () => comers.findIndex((c, i) => c.taken < COMERS[i]!.steps)
    for (const input of inputs) {
      if (input.kind === 'key' && input.key === 'primary' && input.down) {
        const i = next()
        if (i >= 0) help(i)
      } else if (input.kind === 'pointer' && input.phase === 'down') {
        let best = -1
        let bestD = NEAR
        comers.forEach((c, i) => {
          const d = Math.abs(c.x - input.x)
          if (d < bestD && input.y > COMERS_Y - 0.22 && input.y < COMERS_Y + 0.02) {
            best = i
            bestD = d
          }
        })
        if (best >= 0) help(best)
      }
    }
    if (context.gentle && time - lastAt >= GENTLE) {
      const i = next()
      if (i >= 0) help(i)
    }
    // Each brother walks his step, then stands (still bowed, if he has further to come).
    comers.forEach((c, i) => {
      const def = COMERS[i]!
      if (c.since === -Infinity) return
      const t = Math.min(1, (time - c.since) / STEP_SECONDS)
      const target = stepTo(def, c.taken)
      c.x = c.from + (target - c.from) * (1 - (1 - t) ** 2)
      if (t >= 1 && state.time - c.since < STEP_SECONDS) {
        const arrived = c.taken >= def.steps
        emit(actor(def.id, { pose: arrived || def.id === 'more-brothers' ? 'idle' : 'kneel' }, { seconds: 0.5 }))
      }
    })
    const allNear = comers.every((c, i) => c.taken >= COMERS[i]!.steps && time - c.since >= STEP_SECONDS)
    if (allNear) doneAt = time
    return { time, comers, lastAt, doneAt }
  },
  view(state): GameView {
    const live: Record<string, number> = {}
    state.comers.forEach((c, i) => (live[`actor:${COMERS[i]!.id}.x`] = c.x))
    const finished = state.doneAt >= 0
    return { live, hint: finished ? null : HINT, message: finished ? ALL_NEAR : null, done: finished && state.time - state.doneAt >= SHOW }
  },
}
