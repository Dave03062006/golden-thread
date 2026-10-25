import { DEAD_ENDS, FOLLOWERS, NODES, PATHS, SHORE, START, STRAGGLERS } from '../../content/levels/09-through-the-sea/episode-2'
import { STEP, type GameKey, type GameRules, type GameView, type Hint } from '../framework'

/**
 * The path through the sea (Level 9 script, Episode 2): pathfinding. Night on the seabed
 * between the walls of water, seen from above. The player leads the people across, taking
 * Moses from crossroads to crossroads toward the far shore, while the families follow in a
 * line behind him. Some ways end at a pool left in a hollow or a reef of rock, and the people
 * turn back. On the right way wait the stragglers: a child looking at the fish, an old man
 * resting, a lost lamb. Each joins the line when Moses reaches them. When everyone is across,
 * dawn breaks on the far shore.
 *
 * Tap (or drag to) a crossroads next to Moses to walk there; the arrow keys walk the path
 * that way; Space walks the next step of the way across. In gentle mode the way glows, and
 * Moses walks on along it by himself if the player waits.
 */

export const HINT: Hint = {
  pointer: 'Lead God’s people across the sea: tap the paths to walk Moses to the far shore.',
  keys: 'Or walk with the arrow keys, or press Space for the next step of the way.',
  gesture: 'tap',
}

/** How fast Moses walks on the map; how close a tap must be to a crossroads; how long the line waits in gentle mode. */
const WALK = 0.2
const NEAR = 0.07
const GENTLE_WAIT = 1.2
/** How far apart the people in the line walk, along the way Moses has come. */
export const GAP = 0.05
/** How long the line takes to gather on the far shore at the end. */
const GATHER = 1.2
const WORDS = 2.2
const SHOW = 2.6

const neighbors = (n: number) => PATHS.flatMap(([a, b]) => (a === n ? [b] : b === n ? [a] : []))

/** The next crossroads on the shortest way from `from` to the far shore. */
export function nextStep(from: number): number {
  const before = new Map<number, number>([[SHORE, SHORE]])
  const queue = [SHORE]
  while (queue.length) {
    const n = queue.shift()!
    for (const m of neighbors(n)) {
      if (before.has(m)) continue
      before.set(m, n)
      queue.push(m)
    }
  }
  return before.get(from) ?? from
}

interface Words {
  title: string
  text: string
}
const NO_PATH: Words = { title: 'No path that way', text: 'Follow the dry paths between the crossroads.' }
const ACROSS: Words = { title: 'The far shore', text: 'Everyone is across, and the morning is coming.' }

/** The order the stragglers join the line in, along the right way. */
const JOINING = Object.keys(STRAGGLERS).map(Number)

interface SeaState {
  time: number
  at: number
  to: number | null
  along: number
  /** The crossroads Moses has walked through, in order: the line follows the same way. */
  trail: number[]
  joined: number[]
  words: Words | null
  saidAt: number
  /** When Moses last stopped, so gentle mode can walk on after a moment. */
  stoppedAt: number
  doneAt: number
}

const DIRECTIONS: Partial<Record<GameKey, [number, number]>> = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] }

/** A point on the way Moses has come, so far behind him along it. */
function behind(trail: readonly number[], at: { x: number; y: number }, distance: number) {
  let left = distance
  let from = at
  for (let i = trail.length - 1; i >= 0; i--) {
    const to = NODES[trail[i]!]!
    const d = Math.hypot(to.x - from.x, to.y - from.y)
    if (d >= left) return { x: from.x + ((to.x - from.x) * left) / d, y: from.y + ((to.y - from.y) * left) / d }
    left -= d
    from = to
  }
  return from
}

export const thePathThroughTheSea: GameRules<SeaState> = {
  id: 'the-path-through-the-sea',
  start: () => ({ time: 0, at: START, to: null, along: 0, trail: [START], joined: [], words: null, saidAt: -Infinity, stoppedAt: 0, doneAt: -1 }),
  step(state, inputs, context) {
    const time = state.time + STEP
    if (state.doneAt >= 0) return { ...state, time }
    let { at, to, along, trail, joined, words, saidAt, stoppedAt, doneAt } = state
    const say = (w: Words) => {
      words = w
      saidAt = time
    }
    const go = (n: number) => {
      to = n
      along = 0
    }

    if (to === null) {
      for (const input of inputs) {
        if (to !== null) break
        if (input.kind === 'pointer' && input.phase !== 'up') {
          let best = -1
          let bestD = NEAR
          NODES.forEach((n, i) => {
            const d = Math.hypot(n.x - input.x, n.y - input.y)
            if (d < bestD) {
              best = i
              bestD = d
            }
          })
          if (best < 0 || best === at) {
            if (context.gentle && input.phase === 'down') go(nextStep(at))
            continue
          }
          if (neighbors(at).includes(best)) go(best)
          else if (input.phase === 'down') say(NO_PATH)
        } else if (input.kind === 'key' && input.down) {
          if (input.key === 'primary') go(nextStep(at))
          else {
            const dir = DIRECTIONS[input.key]
            if (!dir) continue
            // The path that best follows the arrow, if any goes roughly that way.
            let best = -1
            let bestDot = 0.4
            for (const n of neighbors(at)) {
              const dx = NODES[n]!.x - NODES[at]!.x
              const dy = NODES[n]!.y - NODES[at]!.y
              const dot = (dx * dir[0] + dy * dir[1]) / Math.hypot(dx, dy)
              if (dot > bestDot) {
                best = n
                bestDot = dot
              }
            }
            if (best >= 0) go(best)
            else say(NO_PATH)
          }
        }
      }
      // Gentle mode: after a moment's wait, Moses walks on along the way by himself.
      if (to === null && context.gentle && time - stoppedAt >= GENTLE_WAIT) go(nextStep(at))
    } else {
      const a = NODES[at]!
      const b = NODES[to]!
      along = Math.min(1, along + (WALK * STEP) / Math.hypot(b.x - a.x, b.y - a.y))
      if (along >= 1) {
        at = to
        to = null
        along = 0
        stoppedAt = time
        trail = [...trail, at]
        const straggler = STRAGGLERS[at]
        if (at === SHORE) {
          doneAt = time
          say(ACROSS)
        } else if (straggler && !joined.includes(at)) {
          joined = [...joined, at]
          say(straggler)
        } else if (DEAD_ENDS[at]) say(DEAD_ENDS[at]!)
      }
    }
    return { time, at, to, along, trail, joined, words, saidAt, stoppedAt, doneAt }
  },
  view(state, context): GameView {
    const a = NODES[state.at]!
    const b = state.to === null ? a : NODES[state.to]!
    const moses = { x: a.x + (b.x - a.x) * state.along, y: a.y + (b.y - a.y) * state.along }
    const glow = NODES[state.to ?? nextStep(state.at)]!
    const live: Record<string, number> = {
      'actor:map-moses.x': moses.x,
      'actor:map-moses.y': moses.y,
      'actor:way-glow.x': glow.x,
      'actor:way-glow.y': glow.y,
      'actor:way-glow.opacity': context.gentle && state.doneAt < 0 ? 0.7 + 0.2 * Math.sin(state.time * Math.PI * 1.6) : 0,
    }
    // The line behind Moses: the two families, then each straggler in the order they joined.
    // Once everyone is across, the line gathers on the far shore beside him.
    const line = [...FOLLOWERS, ...JOINING.filter((n) => state.joined.includes(n)).map((n) => STRAGGLERS[n]!.id)]
    const gather = state.doneAt < 0 ? 0 : Math.min(1, (state.time - state.doneAt) / GATHER)
    const shore = NODES[SHORE]!
    line.forEach((id, i) => {
      const p = behind(state.trail, moses, GAP * (i + 1))
      live[`actor:${id}.x`] = p.x + (shore.x - p.x) * gather
      live[`actor:${id}.y`] = p.y + (shore.y - p.y) * gather
    })
    // The stragglers still waiting stand beside their crossroads.
    for (const n of JOINING) {
      if (state.joined.includes(n)) continue
      const s = STRAGGLERS[n]!
      live[`actor:${s.id}.x`] = NODES[n]!.x + 0.04
      live[`actor:${s.id}.y`] = NODES[n]!.y - 0.04
    }
    const finished = state.doneAt >= 0
    const message = state.words && (finished || state.time - state.saidAt < WORDS) ? state.words : null
    return { live, hint: finished ? null : HINT, message, done: finished && state.time - state.doneAt >= SHOW }
  },
}
