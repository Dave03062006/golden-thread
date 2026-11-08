import { COURAGE, JOSHUA, MOSES, TRIBES } from '../../content/levels/13-moses-last-words/episode-3'
import { lerp } from '../../engine/motion'
import { actor } from '../../scene/build'
import { STEP, type GameInput, type GameRules, type GameView, type Hint } from '../framework'

/**
 * Be strong and of good courage (Level 13 script, Episode 3): a quiet interaction. Moses
 * stands before Joshua with all Israel watching. The player rests Moses' hands on Joshua's
 * head, and while they rest there the light passes from Moses to Joshua, and Moses' words rise
 * one by one. When the light has passed, Joshua stands, and the tribes come one by one to
 * follow him.
 *
 * Press and hold (or hold Space) to rest Moses' hands on Joshua; then tap each tribe (or press
 * Space) to bring it. In gentle mode a short hold is enough, and the tribes come by themselves.
 */

export const HINTS: Record<'hold' | 'tribes', Hint> = {
  hold: { pointer: 'Press and hold to rest Moses’ hands on Joshua’s head.', keys: 'Or hold Space.', gesture: 'hold' },
  tribes: { pointer: 'Now the tribes come to follow Joshua: tap each one.', keys: 'Or press Space for the next.', gesture: 'tap' },
}

/** How long the hands must rest (in gentle mode, less); how near a tap must be; how long a tribe takes to come; gentle mode's pace; how long the end shows. */
export const HOLD = { normal: 4, gentle: 1.5 }
const NEAR = 0.08
const COME = 1
const GENTLE_PACE = 1.2
const SHOW = 2.4

interface CourageState {
  time: number
  holding: boolean
  held: number
  passedAt: number
  came: number
  cameAt: number
  doneAt: number
}

const FOLLOW = { title: 'They followed Joshua', text: '“So the people of Israel obeyed him, and did as the LORD had commanded Moses.”' }

export const beStrong: GameRules<CourageState> = {
  id: 'be-strong',
  start: () => ({ time: 0, holding: false, held: 0, passedAt: -1, came: 0, cameAt: -Infinity, doneAt: -1 }),
  step(state, inputs: readonly GameInput[], context, emit) {
    const time = state.time + STEP
    if (state.doneAt >= 0) return { ...state, time }
    let { holding, held, passedAt, came, cameAt, doneAt } = state
    const hold = context.gentle ? HOLD.gentle : HOLD.normal
    if (passedAt < 0) {
      for (const input of inputs) {
        if (input.kind === 'key' && input.key === 'primary') holding = input.down
        else if (input.kind === 'pointer' && input.phase !== 'move') holding = input.phase === 'down'
      }
      // While the hands rest on him, the light passes; let go, and it waits.
      if (holding) held = Math.min(hold, held + STEP)
      if (held >= hold) {
        passedAt = time
        emit(actor(MOSES.id, { pose: 'idle' }, { seconds: 0.8 }))
        emit(actor(JOSHUA.id, { pose: 'idle' }, { seconds: 0.8 }))
      }
      return { time, holding, held, passedAt, came, cameAt, doneAt }
    }
    // Then the tribes come, one at a time.
    if (time - cameAt >= COME && came < TRIBES.length) {
      const next = TRIBES[came]!
      const asked = (context.gentle && time - Math.max(cameAt, passedAt) >= GENTLE_PACE) || inputs.some((i) => (i.kind === 'key' && i.key === 'primary' && i.down) || (i.kind === 'pointer' && i.phase === 'down' && Math.abs(i.x - next.x) < NEAR))
      if (asked) {
        came++
        cameAt = time
        if (came === TRIBES.length) doneAt = time
      }
    }
    return { time, holding, held, passedAt, came, cameAt, doneAt }
  },
  view(state, context): GameView {
    const k = state.held / (context.gentle ? HOLD.gentle : HOLD.normal)
    const live: Record<string, number> = {
      [`actor:${MOSES.glow}.opacity`]: lerp(0.85, 0.3, k),
      [`actor:${JOSHUA.glow}.opacity`]: 0.85 * k,
    }
    TRIBES.forEach((t, i) => {
      const step = i < state.came - 1 ? 1 : i === state.came - 1 ? Math.min(1, (state.time - state.cameAt) / COME) : 0
      live[`actor:${t.id}.x`] = lerp(t.x, t.to, step)
    })
    const passed = state.passedAt >= 0
    const finished = state.doneAt >= 0
    // Moses' words rise one by one as the light passes, and the last stays.
    const word = passed ? COURAGE.length - 1 : Math.min(COURAGE.length - 1, Math.floor(k * COURAGE.length))
    const message = finished ? FOLLOW : state.held > 0 ? { title: 'Moses says', text: COURAGE.slice(0, word + 1).join(' ') } : null
    return { live, hint: finished ? null : passed ? HINTS.tribes : HINTS.hold, message, done: finished && state.time - state.doneAt >= COME + SHOW }
  },
}
