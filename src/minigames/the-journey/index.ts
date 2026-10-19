import { JOURNEY } from '../../content/levels/03-abraham-father-of-faith/episode-1'
import { STEP, type GameKey, type GameRules, type GameView, type Hint } from '../framework'

/**
 * The journey (Level 3 script, Episode 1): the courier kind of play, on the map. The
 * caravan travels from Haran to Canaan along the old road, and the player leads it from
 * stop to stop: the Euphrates, an oasis, Damascus, and down into the hills to Shechem. At
 * each stop it rests for a moment and a line about the road appears. Led away from the
 * road, it drifts back to it.
 *
 * The caravan follows the pointer while it's held, or the arrow keys; Space leads it on to
 * the next stop by itself: the one-button way. In gentle mode, holding anything (the
 * pointer, a key) leads it along the road, and the next stop glows brighter.
 */

export const HINT: Hint = {
  pointer: 'Lead the caravan along the road to the glowing stop: hold and point the way.',
  keys: 'Or move it with the arrow keys, or press Space to lead it to the next stop.',
  gesture: 'drag',
}

/** How fast the caravan goes, led and on its own (Space), in map widths a second. */
const LED = 0.16
const LEADING = 0.12
/** How far from the road it may stray before it drifts back, and how close counts as at a stop. */
const OFF_ROAD = 0.06
const NEAR = { normal: 0.035, gentle: 0.06 }
/** How long each stop's words show, and how long the caravan rests in Canaan at the end. */
const RESTS = 2.2

type Arrow = Extract<GameKey, 'left' | 'right' | 'up' | 'down'>

interface JourneyState {
  time: number
  x: number
  y: number
  /** The stop it's heading for now (all before it are passed). */
  stop: number
  pointer: { x: number; y: number } | null
  held: Arrow[]
  /** Space (or, in gentle mode, any hold) is leading it on by itself. */
  leading: boolean
  facing: -1 | 1
  /** When it reached the last stop it reached. */
  restedAt: number
}

const MESSAGES = JOURNEY.stops.map((s) => ({ title: s.title, text: s.text }))

/** The nearest point on the road between two stops. */
function onRoad(from: { x: number; y: number }, to: { x: number; y: number }, x: number, y: number) {
  const dx = to.x - from.x
  const dy = to.y - from.y
  const t = Math.max(0, Math.min(1, ((x - from.x) * dx + (y - from.y) * dy) / (dx * dx + dy * dy)))
  return { x: from.x + dx * t, y: from.y + dy * t }
}

export const theJourney: GameRules<JourneyState> = {
  id: 'the-journey',
  start: () => ({ time: 0, ...JOURNEY.start, stop: 0, pointer: null, held: [], leading: false, facing: -1, restedAt: -Infinity }),
  step(state, inputs, context) {
    const time = state.time + STEP
    if (state.stop >= JOURNEY.stops.length) return { ...state, time }
    let { x, y, stop, pointer, held, leading, facing, restedAt } = state
    for (const input of inputs) {
      if (input.kind === 'pointer') {
        if (input.phase === 'down' || (input.phase === 'move' && pointer)) pointer = { x: input.x, y: input.y }
        else if (input.phase === 'up') pointer = null
      } else if (input.kind === 'key') {
        if (input.key === 'primary') {
          if (input.down) leading = true
        } else if (input.down) held = held.includes(input.key) ? held : [...held, input.key]
        else held = held.filter((k) => k !== input.key)
      }
    }
    const goal = JOURNEY.stops[stop]!.at
    const from = stop === 0 ? JOURNEY.start : JOURNEY.stops[stop - 1]!.at
    // While resting at a stop, it waits.
    const resting = time - restedAt < RESTS * 0.6
    if (!resting) {
      let dx = 0
      let dy = 0
      let speed = 0
      if (leading || (context.gentle && (pointer || held.length))) {
        dx = goal.x - x
        dy = goal.y - y
        speed = LEADING
      } else if (pointer) {
        dx = pointer.x - x
        dy = pointer.y - y
        speed = Math.hypot(dx, dy) > 0.01 ? LED : 0
      } else if (held.length) {
        dx = (held.includes('right') ? 1 : 0) - (held.includes('left') ? 1 : 0)
        dy = (held.includes('down') ? 1 : 0) - (held.includes('up') ? 1 : 0)
        speed = LED
      }
      const d = Math.hypot(dx, dy)
      if (d > 0 && speed > 0) {
        const step = Math.min(d, speed * STEP)
        x += (dx / d) * step
        y += (dy / d) * step
        if (Math.abs(dx) > 0.002) facing = dx > 0 ? 1 : -1
      }
      // Off the road, it drifts back to it.
      const road = onRoad(from, goal, x, y)
      const off = Math.hypot(road.x - x, road.y - y)
      if (off > OFF_ROAD) {
        x += (road.x - x) * Math.min(1, STEP * 3)
        y += (road.y - y) * Math.min(1, STEP * 3)
      }
    }
    // Reaching the stop.
    if (Math.hypot(goal.x - x, goal.y - y) < (context.gentle ? NEAR.gentle : NEAR.normal)) {
      x = goal.x
      y = goal.y
      stop++
      restedAt = time
      leading = false
    }
    return { time, x, y, stop, pointer, held, leading, facing, restedAt }
  },
  view(state, context): GameView {
    const finished = state.stop >= JOURNEY.stops.length
    const goal = JOURNEY.stops[Math.min(state.stop, JOURNEY.stops.length - 1)]!.at
    const glow = context.gentle ? 0.95 : 0.6
    const live = {
      'actor:caravan.x': state.x,
      'actor:caravan.y': state.y,
      'actor:caravan.facing': state.facing,
      'actor:goal.x': goal.x,
      'actor:goal.y': goal.y,
      'actor:goal.opacity': finished ? 0 : glow + 0.15 * Math.sin(state.time * Math.PI * 2 * 0.8),
    }
    const showing = state.stop > 0 && state.time - state.restedAt < RESTS
    return {
      live,
      hint: finished ? null : HINT,
      message: showing ? MESSAGES[state.stop - 1]! : null,
      done: finished && state.time - state.restedAt >= RESTS,
    }
  },
}
