import { FALL, MOSES, PROMISES } from '../../content/levels/08-the-plagues-and-the-passover/episode-1'
import { actor } from '../../scene/build'
import { STEP, type GameInput, type GameRules, type GameView, type Hint } from '../framework'

/**
 * God's promises (Level 8 script, Episode 1): catching. Night over Egypt. God's promises
 * fall from the sky like stars, one after another (Exodus 6:6–8), and the player moves
 * Moses to catch each one in his open hands. Each promise caught shines and stays in the
 * sky above him; one that's missed rises again and falls once more, because God's promises
 * don't fall away.
 *
 * Drag (or hold a pointer) to walk Moses under the promise; the arrow keys walk him too.
 * Space catches the next promise by itself: Moses walks to meet it. In gentle mode the
 * promises fall slowly, and Moses walks to meet them by himself.
 */

export const HINT: Hint = {
  pointer: 'Move Moses under each promise of God as it falls, to catch it in his hands.',
  keys: 'Or use the arrow keys, or press Space to catch the next.',
  gesture: 'drag',
}

/** How fast the promises fall and Moses walks, in frame heights and widths a second; how near is a catch. */
const FALL_SPEED = 0.13
const GENTLE_FALL = 0.08
const WALK = 0.45
const REACH = 0.07
/** How long each promise's words show, and how long the end shows. */
const WORDS = 2
const SHOW = 2.6

interface PromisesState {
  time: number
  /** The promise falling now, how far it has fallen, and when the last was caught. */
  falling: number
  y: number
  caughtAt: number
  missedAt: number
  /** Where Moses is, where he is going, whether he walks, and whether Space has him catch by himself. */
  x: number
  target: number
  walking: boolean
  auto: boolean
  keys: { left: boolean; right: boolean }
  doneAt: number
}

const CAUGHT = PROMISES.map((p) => ({ title: 'God’s promise', text: `“${p.text}.”` }))
const AGAIN = { title: 'Again', text: 'God’s promises don’t fall away. Here it comes again.' }
const ALL = { title: '“I am the LORD”', text: 'Six promises, and God would keep every one.' }

export const godsPromises: GameRules<PromisesState> = {
  id: 'gods-promises',
  start: () => ({ time: 0, falling: 0, y: FALL.from, caughtAt: -Infinity, missedAt: -Infinity, x: MOSES.from, target: MOSES.from, walking: false, auto: false, keys: { left: false, right: false }, doneAt: -1 }),
  step(state, inputs: readonly GameInput[], context, emit) {
    const time = state.time + STEP
    if (state.doneAt >= 0) return { ...state, time }
    let { falling, y, caughtAt, missedAt, x, target, walking, auto, doneAt } = state
    const keys = { ...state.keys }
    for (const input of inputs) {
      if (input.kind === 'pointer' && input.phase !== 'up') target = input.x
      else if (input.kind === 'key') {
        if (input.key === 'left') keys.left = input.down
        else if (input.key === 'right') keys.right = input.down
        else if (input.key === 'primary' && input.down) auto = true
      }
    }
    const promise = PROMISES[falling]!
    // Gentle mode, and Space: Moses walks to meet the promise by himself.
    if (context.gentle || auto) target = promise.x
    if (keys.left || keys.right) target = x + (keys.right ? 1 : -1) * 0.05
    target = Math.min(MOSES.right, Math.max(MOSES.left, target))
    const step = WALK * STEP
    const moving = Math.abs(target - x) > step
    x = moving ? x + Math.sign(target - x) * step : target
    if (moving !== walking) {
      walking = moving
      emit(actor('moses', moving ? { pose: 'walk', facing: target > x ? 1 : -1 } : { pose: 'lift' }, { seconds: 0.2 }))
    }
    // The promise falls; Moses' hands catch it, or it rises to fall again.
    const waiting = time - caughtAt < WORDS * 0.5
    if (!waiting) y += (context.gentle ? GENTLE_FALL : FALL_SPEED) * STEP
    if (y >= FALL.hands && y < FALL.hands + 0.03 && Math.abs(promise.x - x) < REACH) {
      caughtAt = time
      auto = false
      falling++
      y = FALL.from
      if (falling === PROMISES.length) doneAt = time
    } else if (y >= FALL.gone) {
      missedAt = time
      y = FALL.from
    }
    return { time, falling, y, caughtAt, missedAt, x, target, walking, auto, keys, doneAt }
  },
  view(state): GameView {
    const live: Record<string, number> = {
      'actor:moses.x': state.x,
      'actor:rod.x': state.x + 0.018,
      'actor:hands-glow.x': state.x,
      'actor:hands-glow.opacity': state.doneAt >= 0 ? 0 : 0.5,
    }
    PROMISES.forEach((p, i) => {
      const held = i < state.falling
      const now = i === state.falling
      live[`actor:${p.id}.x`] = held ? p.held.x : p.x
      live[`actor:${p.id}.y`] = held ? p.held.y : now ? state.y : FALL.from
      live[`actor:${p.id}.opacity`] = held || now ? 1 : 0
    })
    const finished = state.doneAt >= 0
    const caught = state.time - state.caughtAt < WORDS
    const message = caught ? (finished && state.time - state.caughtAt >= WORDS * 0.5 ? ALL : CAUGHT[state.falling - 1]!) : finished ? ALL : state.time - state.missedAt < WORDS ? AGAIN : null
    return { live, hint: finished ? null : HINT, message, done: finished && state.time - state.doneAt >= SHOW }
  },
}
