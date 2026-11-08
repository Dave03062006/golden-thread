import { ANGEL, BEHIND, LANES, MEETINGS, RIDER, ROAD_Y } from '../../content/levels/12-forty-years-in-the-wilderness/episode-7'
import { actor } from '../../scene/build'
import { STEP, type GameInput, type GameRules, type GameView, type Hint } from '../framework'

/**
 * The narrow way (Level 12 script, Episode 7): steering. The player is the donkey, carrying
 * Balaam along a road that grows narrower: open fields, then a lane between vineyard walls,
 * then a narrow pass in the rocks. The angel of the LORD stands in the way, seen only by the
 * donkey (and the player), and the player steers around him: into the field, then close
 * against the wall. At the narrow place there is no way around, and the donkey lies down.
 * Nothing can go wrong: a donkey not steered aside in time turns aside by herself.
 *
 * Drag up or down (or use the arrow keys) to steer; Space turns aside the safe way, and lies
 * down at the narrow place. In gentle mode the donkey turns aside, and lies down, by herself.
 */

export const HINTS: Record<'steer' | 'lie', Hint> = {
  steer: { pointer: 'The donkey sees the angel in the road: steer her around him.', keys: 'Use the up and down arrows, or press Space to turn aside.', gesture: 'drag' },
  lie: { pointer: 'There is no way to turn. Tap for the donkey to lie down.', keys: 'Or press Space.', gesture: 'tap' },
}

/** How fast the donkey walks and turns; how close to the angel she must have turned aside; how long words show; how long the end shows. */
const SPEED = 0.06
const TURN = 0.25
const CLOSE = 0.07
/** Where she stops before the angel in the narrow place. */
const STOP = 0.08
const WORDS = 2.2
const SHOW = 2.6
const GENTLE_LIE = 1

interface RoadState {
  time: number
  x: number
  y: number
  /** Where the player is steering, from a drag, or by the keys. */
  aim: number | null
  keys: { up: boolean; down: boolean }
  auto: boolean
  /** How many meetings are past, and when the last was. */
  passed: number
  passedAt: number
  stoppedAt: number
  layAt: number
}

const toward = (from: number, to: number, step: number) => (Math.abs(to - from) <= step ? to : from + Math.sign(to - from) * step)

export const theNarrowWay: GameRules<RoadState> = {
  id: 'the-narrow-way',
  start: () => ({ time: 0, x: RIDER.from, y: ROAD_Y, aim: null, keys: { up: false, down: false }, auto: false, passed: 0, passedAt: -Infinity, stoppedAt: -1, layAt: -1 }),
  step(state, inputs: readonly GameInput[], context, emit) {
    const time = state.time + STEP
    if (state.layAt >= 0) return { ...state, time }
    let { x, y, aim, auto, passed, passedAt, stoppedAt, layAt } = state
    const keys = { ...state.keys }
    let pressed = false
    for (const input of inputs) {
      if (input.kind === 'pointer') {
        if (input.phase !== 'up') aim = input.y
        if (input.phase === 'down') pressed = true
      } else if (input.kind === 'key') {
        if (input.key === 'primary') {
          if (input.down) {
            auto = true
            pressed = true
          }
        } else if (input.key === 'up' || input.key === 'down') keys[input.key] = input.down
      }
    }
    const meeting = MEETINGS[passed]
    const last = passed === MEETINGS.length - 1
    if (last) {
      // The narrow place: she walks up to the angel, stops, and lies down.
      const stopAt = meeting!.x - STOP
      x = toward(x, stopAt, SPEED * STEP)
      y = toward(y, ROAD_Y, TURN * STEP)
      if (x === stopAt && stoppedAt < 0) stoppedAt = time
      if (stoppedAt >= 0 && (pressed || (context.gentle && time - stoppedAt >= GENTLE_LIE))) {
        layAt = time
        emit(actor(RIDER.id, { pose: 'lie' }, { seconds: 0.6 }))
      }
      return { time, x, y, aim, keys, auto, passed, passedAt, stoppedAt, layAt }
    }
    x += SPEED * STEP
    // Steering: the keys, or a drag; Space, or gentle mode, turns aside the safe way.
    if (auto || context.gentle) aim = meeting!.safe
    else if (keys.up || keys.down) aim = y + (keys.down ? 1 : -1) * 0.05
    if (aim !== null) y = toward(y, Math.min(LANES.bottom, Math.max(LANES.top, aim)), TURN * STEP)
    // Coming up to the angel: if she isn't aside yet, she turns aside by herself.
    if (x >= meeting!.x - CLOSE && Math.abs(y - meeting!.safe) > 0.015) y = toward(y, meeting!.safe, TURN * 2 * STEP)
    if (x >= meeting!.x + CLOSE) {
      passed++
      passedAt = time
      aim = ROAD_Y
      auto = false
    }
    return { time, x, y, aim, keys, auto, passed, passedAt, stoppedAt, layAt }
  },
  view(state): GameView {
    const lay = state.layAt >= 0
    const meeting = MEETINGS[Math.min(state.passed, MEETINGS.length - 1)]!
    const live: Record<string, number> = {
      [`actor:${RIDER.id}.x`]: state.x,
      [`actor:${RIDER.id}.y`]: state.y,
      'actor:servants.x': state.x - BEHIND,
      [`actor:${ANGEL}.x`]: meeting.x,
      [`actor:${ANGEL}.opacity`]: 0.9,
    }
    const told = state.passed > 0 && state.time - state.passedAt < WORDS
    const message = lay ? MEETINGS.at(-1)! : told ? MEETINGS[state.passed - 1]! : null
    const hint = lay ? null : state.stoppedAt >= 0 ? HINTS.lie : HINTS.steer
    return { live, hint, message, done: lay && state.time - state.layAt >= WORDS + SHOW }
  },
}
