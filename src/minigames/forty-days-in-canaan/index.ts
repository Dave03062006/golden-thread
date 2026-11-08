import { CLUSTER, COVERS, SPIES, WATCHMAN } from '../../content/levels/12-forty-years-in-the-wilderness/episode-3'
import { lerp } from '../../engine/motion'
import { STEP, type GameInput, type GameRules, type GameView, type Hint } from '../framework'

/**
 * Forty days in Canaan (Level 12 script, Episode 3): stealth and escape. The hill country,
 * with a walled city on the heights and a watchman on its wall, who looks out over the hills,
 * then away. The player moves the spies from cover to cover while he looks away, gathering
 * the fruit of the land as they go: figs, pomegranates, and the great cluster of grapes, which
 * two of them carry on a pole. Sent on while he looks out, they stay where they are, and a word
 * says to wait. At the far side they are safely through, after forty days.
 *
 * Tap (or press Space) to move on to the next cover. In gentle mode the watchman turns
 * slowly, and spies sent on at the wrong moment wait safely until they can go.
 */

export const HINT: Hint = {
  pointer: 'When the watchman looks away, tap to move the spies to the next cover.',
  keys: 'Or press Space.',
  gesture: 'tap',
}

/** How long the watchman looks each way (in gentle mode, longer); how long a move takes; how long words show; how long the end shows. */
export const LOOK = { normal: 2.2, gentle: 3.4 }
export const MOVE = 1
const WORDS = 1.8
const SHOW = 2.4

interface CanaanState {
  time: number
  /** Which cover the spies are at (or moving to). */
  at: number
  movedAt: number
  /** In gentle mode, a move asked for while the watchman looks out, waiting for him to turn. */
  waiting: boolean
  waitAt: number
  doneAt: number
}

/** Whether the watchman is looking out over the hills at this moment: he starts looking away. */
export const lookingOut = (time: number, gentle: boolean) => Math.floor(time / (gentle ? LOOK.gentle : LOOK.normal)) % 2 === 1

const FRUIT: Record<string, { title: string; text: string }> = {
  figs: { title: 'Figs', text: 'The fruit of the land, to bring back to Moses.' },
  pomegranates: { title: 'Pomegranates', text: 'The land was rich, as God had said.' },
  grapes: { title: 'A single cluster of grapes', text: 'So heavy that two of them carried it on a pole between them.' },
}
const WAIT = { title: 'Wait', text: 'The watchman is looking this way. Wait until he turns.' }
const HOME = { title: 'Forty days', text: 'They had seen the whole land. Now, home to Kadesh.' }

export const fortyDaysInCanaan: GameRules<CanaanState> = {
  id: 'forty-days-in-canaan',
  start: () => ({ time: 0, at: 0, movedAt: -Infinity, waiting: false, waitAt: -Infinity, doneAt: -1 }),
  step(state, inputs: readonly GameInput[], context) {
    const time = state.time + STEP
    if (state.doneAt >= 0) return { ...state, time }
    let { at, movedAt, waiting, waitAt, doneAt } = state
    // Still moving, or gathering the fruit where they have just arrived: the next move waits.
    const moving = time - movedAt < MOVE + (at > 0 && COVERS[at]!.fruit ? WORDS : 0)
    const asked = inputs.some((i) => (i.kind === 'key' && i.key === 'primary' && i.down) || (i.kind === 'pointer' && i.phase === 'down'))
    if (asked && !moving) {
      if (lookingOut(time, context.gentle)) {
        waitAt = time
        if (context.gentle) waiting = true
      } else waiting = true
    }
    if (waiting && !moving && !lookingOut(time, context.gentle)) {
      at++
      movedAt = time
      waiting = false
      if (at === COVERS.length - 1) doneAt = time
    }
    return { time, at, movedAt, waiting, waitAt, doneAt }
  },
  view(state, context): GameView {
    const finished = state.doneAt >= 0
    const t = state.at === 0 ? 1 : Math.min(1, (state.time - state.movedAt) / MOVE)
    const from = COVERS[Math.max(0, state.at - 1)]!
    const to = COVERS[state.at]!
    const x = lerp(from.x, to.x, t)
    const y = lerp(from.y, to.y, t)
    // The grapes are carried from where they were cut.
    const grapesAt = COVERS.findIndex((c) => c.fruit === 'grapes')
    const carried = state.at > grapesAt || (state.at === grapesAt && t === 1)
    const live: Record<string, number> = {
      [`actor:${SPIES}.x`]: x,
      [`actor:${SPIES}.y`]: y,
      // He looks out toward the spies (to the left) and away; once they are through, he stands as the scene set him.
      [`actor:${WATCHMAN.id}.facing`]: finished || lookingOut(state.time, context.gentle) ? -1 : 1,
      [`actor:${CLUSTER}.x`]: carried ? x : COVERS[grapesAt]!.x,
      [`actor:${CLUSTER}.y`]: carried ? y : COVERS[grapesAt]!.y,
      'actor:cluster-glow.x': carried ? x : COVERS[grapesAt]!.x,
    }
    const arrived = state.at > 0 && state.time - state.movedAt >= MOVE && state.time - state.movedAt < MOVE + WORDS
    const fruit = arrived ? COVERS[state.at]!.fruit : undefined
    const message = finished && state.time - state.doneAt >= MOVE ? HOME : fruit ? FRUIT[fruit]! : state.time - state.waitAt < WORDS ? WAIT : null
    return { live, hint: finished ? null : HINT, message, done: finished && state.time - state.doneAt >= MOVE + SHOW }
  },
}
