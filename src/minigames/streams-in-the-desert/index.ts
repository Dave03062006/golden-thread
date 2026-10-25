import { THIRSTY } from '../../content/levels/09-through-the-sea/episode-5'
import { STEP, type GameInput, type GameRules, type GameView, type Hint } from '../framework'

/**
 * Streams in the desert (Level 9 script, Episode 5): pouring and water. Water gushes from the
 * rock and runs down the dry valley. A stone blocks the way to each of the thirsty: the
 * families with their jars, the children, the flocks, the cattle. The player rolls each stone
 * aside to send the stream to them, and everyone who drinks brightens, and the valley turns
 * green where the water runs, until all have drunk.
 *
 * Tap a stone to roll it aside; or choose one with the arrow keys and press Space (Space
 * alone opens the next). In gentle mode a tap anywhere opens the next way, and the water finds
 * its way by itself after a moment.
 */

export const HINT: Hint = {
  pointer: 'Roll each stone aside, to send the water to everyone who is thirsty.',
  keys: 'Or choose a stone with the arrow keys, and press Space.',
  gesture: 'tap',
}

/** How close a tap must be to a stone; how long the water takes to run; how long gentle mode waits. */
const NEAR = 0.07
const RUN = 1.2
const GENTLE_WAIT = 2.5
/** How far a stone rolls aside; how long words show; how long the end shows. */
export const ROLL = { x: 0.03, y: 0.015 }
const WORDS = 2
const SHOW = 2.6

interface StreamsState {
  time: number
  openedAt: number[]
  /** The stone chosen with the arrow keys. */
  chosen: number
  lastAt: number
  count: number
  doneAt: number
}

const DRUNK = THIRSTY.map((t, n) => ({ title: `${n + 1} of ${THIRSTY.length}`, text: t.text }))
const ALL = { title: 'All have drunk', text: 'In the driest place, God gave water enough for everyone.' }

const ramp = (since: number) => Math.min(1, Math.max(0, since / RUN))

export const streamsInTheDesert: GameRules<StreamsState> = {
  id: 'streams-in-the-desert',
  start: () => ({ time: 0, openedAt: THIRSTY.map(() => -1), chosen: 0, lastAt: 0, count: 0, doneAt: -1 }),
  step(state, inputs: readonly GameInput[], context) {
    const time = state.time + STEP
    if (state.doneAt >= 0) return { ...state, time }
    const openedAt = [...state.openedAt]
    let { chosen, lastAt, count, doneAt } = state
    const open = (i: number) => {
      if (i < 0 || openedAt[i]! >= 0) return
      openedAt[i] = time
      lastAt = time
      count++
      if (count === THIRSTY.length) doneAt = time
      const next = openedAt.findIndex((at) => at < 0)
      if (next >= 0) chosen = next
    }
    for (const input of inputs) {
      if (input.kind === 'key' && input.down) {
        if (input.key === 'left' || input.key === 'right') chosen = (chosen + (input.key === 'right' ? 1 : THIRSTY.length - 1)) % THIRSTY.length
        else if (input.key === 'primary') open(openedAt[chosen]! < 0 ? chosen : openedAt.findIndex((at) => at < 0))
      } else if (input.kind === 'pointer' && input.phase === 'down') {
        if (context.gentle) open(openedAt.findIndex((at) => at < 0))
        else open(THIRSTY.findIndex((t, i) => openedAt[i]! < 0 && Math.hypot(t.stoneX - input.x, t.y - input.y) < NEAR))
      }
    }
    // Gentle mode: the water finds its way to the next of the thirsty by itself.
    if (context.gentle && doneAt < 0 && time - lastAt >= GENTLE_WAIT) open(openedAt.findIndex((at) => at < 0))
    return { time, openedAt, chosen, lastAt, count, doneAt }
  },
  view(state): GameView {
    const finished = state.doneAt >= 0
    const live: Record<string, number> = {}
    THIRSTY.forEach((t, i) => {
      const at = state.openedAt[i]!
      const flow = at < 0 ? 0 : ramp(state.time - at)
      live[`actor:${t.stream}.opacity`] = flow
      live[`actor:${t.grass}.opacity`] = at < 0 ? 0 : ramp(state.time - at - RUN * 0.5)
      live[`actor:${t.stone}.x`] = t.stoneX + ROLL.x * (at < 0 ? 0 : ramp((state.time - at) * 2))
      live[`actor:${t.stone}.y`] = t.y + 0.01 + ROLL.y * (at < 0 ? 0 : ramp((state.time - at) * 2))
    })
    live['actor:stone-glow.x'] = THIRSTY[finished ? 0 : state.chosen]!.stoneX
    live['actor:stone-glow.opacity'] = finished ? 0 : 0.6
    const message = state.count > 0 && state.time - state.lastAt < WORDS ? DRUNK[state.count - 1]! : finished ? ALL : null
    return { live, hint: finished ? null : HINT, message, done: finished && state.time - state.doneAt >= WORDS + SHOW }
  },
}
