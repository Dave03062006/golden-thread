import { DOTHAN, NODES, ON_MAP, PATHS, SIGNS, START } from '../../content/levels/05-joseph-and-his-brothers/episode-1'
import { STEP, type GameKey, type GameRules, type GameView, type Hint } from '../framework'

/**
 * To Dothan (Level 5 script, Episode 1): pathfinding. The hill country between Shechem and
 * Dothan, seen from above like a cloth map. The player leads Joseph from crossroads to
 * crossroads toward his brothers in the north. Signs on the right way help: a shepherd's
 * fire still warm, a man in the field pointing north, a lost lamb. Some paths end at a wall
 * or a stream, and Joseph turns back. When he reaches Dothan, the story goes on.
 *
 * Tap a crossroads next to Joseph to walk there; or the arrow keys walk the path that way;
 * Space walks the next step of the way to Dothan. In gentle mode the way glows, and a tap
 * anywhere walks the next step.
 */

export const HINT: Hint = {
  pointer: 'Tap the paths to lead Joseph north to his brothers at Dothan.',
  keys: 'Or walk with the arrow keys, or press Space for the next step of the way.',
  gesture: 'tap',
}

/** How fast Joseph walks on the map, in frame widths a second; how close a tap must be to a crossroads; how long words show. */
const WALK = 0.22
const NEAR = 0.07
const WORDS = 2.2
const SHOW = 2.4

const neighbors = (n: number) => PATHS.flatMap(([a, b]) => (a === n ? [b] : b === n ? [a] : []))

/** The next crossroads on the shortest way from `from` to Dothan. */
function nextStep(from: number): number {
  const before = new Map<number, number>([[DOTHAN, DOTHAN]])
  const queue = [DOTHAN]
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
const DEAD_END: Words = { title: 'No way on', text: 'A wall and a stream block the way. Joseph turns back.' }
const NO_PATH: Words = { title: 'No path that way', text: 'Follow the paths between the crossroads.' }
const ARRIVED: Words = { title: 'Dothan', text: 'And there, by their flocks, were his brothers.' }

interface MapState {
  time: number
  at: number
  /** Where Joseph is walking to, and how far along the path he is (0 to 1). */
  to: number | null
  along: number
  words: Words | null
  saidAt: number
  doneAt: number
}

const DIRECTIONS: Partial<Record<GameKey, [number, number]>> = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] }

export const toDothan: GameRules<MapState> = {
  id: 'to-dothan',
  start: () => ({ time: 0, at: START, to: null, along: 0, words: null, saidAt: -Infinity, doneAt: -1 }),
  step(state, inputs, context) {
    const time = state.time + STEP
    if (state.doneAt >= 0) return { ...state, time }
    let { at, to, along, words, saidAt, doneAt } = state
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
        if (input.kind === 'pointer' && input.phase === 'down') {
          if (context.gentle) {
            go(nextStep(at))
            continue
          }
          let best = -1
          let bestD = NEAR
          NODES.forEach((n, i) => {
            const d = Math.hypot(n.x - input.x, n.y - input.y)
            if (d < bestD) {
              best = i
              bestD = d
            }
          })
          if (best < 0 || best === at) continue
          if (neighbors(at).includes(best)) go(best)
          else say(NO_PATH)
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
    } else {
      const a = NODES[at]!
      const b = NODES[to]!
      along = Math.min(1, along + (WALK * STEP) / Math.hypot(b.x - a.x, b.y - a.y))
      if (along >= 1) {
        at = to
        to = null
        along = 0
        if (at === DOTHAN) {
          doneAt = time
          say(ARRIVED)
        } else if (SIGNS[at]) say(SIGNS[at]!)
        else if (neighbors(at).length === 1) say(DEAD_END)
      }
    }
    return { time, at, to, along, words, saidAt, doneAt }
  },
  view(state, context): GameView {
    const a = NODES[state.at]!
    const b = state.to === null ? a : NODES[state.to]!
    const glow = NODES[state.to ?? nextStep(state.at)]!
    const live: Record<string, number> = {
      'actor:map-joseph.x': a.x + (b.x - a.x) * state.along,
      'actor:map-joseph.y': a.y + (b.y - a.y) * state.along + ON_MAP,
      'actor:path-glow.x': glow.x,
      'actor:path-glow.y': glow.y,
      'actor:path-glow.opacity': context.gentle && state.doneAt < 0 ? 0.7 + 0.2 * Math.sin(state.time * Math.PI * 1.6) : 0,
    }
    const finished = state.doneAt >= 0
    const message = state.words && (finished || state.time - state.saidAt < WORDS) ? state.words : null
    return { live, hint: finished ? null : HINT, message, done: finished && state.time - state.doneAt >= SHOW }
  },
}
