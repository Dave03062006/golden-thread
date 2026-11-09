import { DOOR, HIDDEN, LAMP } from '../../content/levels/14-joshua/episode-4'
import { lerp } from '../../engine/motion'
import { STEP, type GameInput, type GameRules, type GameView, type Hint } from '../framework'

/**
 * Brought into the light (Level 14 script, Episode 4): searching. Achan's tent, dim. Joshua
 * has asked him not to hide anything. The player looks with a lamp for what he buried in the
 * ground: the mantle from Shinar, the silver, the bar of gold. Each one found is lifted out and
 * carried to the door, into the light.
 *
 * Drag the lamp (or move it with the arrow keys); Space takes it to the next hidden thing. In
 * gentle mode the lamp is larger, and each hidden thing glints when it comes near.
 */

export const HINT: Hint = {
  pointer: 'Search Achan’s tent with the lamp for what he hid in the ground.',
  keys: 'Or move it with the arrow keys, or press Space for the next.',
  gesture: 'drag',
}

/** How fast the lamp moves; how near it must come (in gentle mode, farther); how long a found thing takes to carry to the door; how long words show; how long the end shows. */
const SPEED = 0.4
export const REACH = { normal: 0.06, gentle: 0.12 }
const CARRY = 1
const WORDS = 1.8
const SHOW = 2.4

interface SearchState {
  time: number
  lamp: { x: number; y: number }
  target: { x: number; y: number }
  auto: boolean
  keys: { left: boolean; right: boolean; up: boolean; down: boolean }
  foundAt: number[]
  count: number
  lastAt: number
  doneAt: number
}

const FOUND = HIDDEN.map((h) => ({ title: h.name, text: 'Brought out of the ground, into the light.' }))
const ALL = { title: 'Nothing hidden', text: '“My son, give glory to the LORD God of Israel… do not hide it from me.”' }

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))

export const broughtIntoTheLight: GameRules<SearchState> = {
  id: 'brought-into-the-light',
  start: () => ({ time: 0, lamp: { x: LAMP.x, y: LAMP.y }, target: { x: LAMP.x, y: LAMP.y }, auto: false, keys: { left: false, right: false, up: false, down: false }, foundAt: HIDDEN.map(() => -1), count: 0, lastAt: -Infinity, doneAt: -1 }),
  step(state, inputs: readonly GameInput[], context) {
    const time = state.time + STEP
    if (state.doneAt >= 0) return { ...state, time }
    let { auto, count, lastAt, doneAt } = state
    let target = { ...state.target }
    const keys = { ...state.keys }
    const lamp = { ...state.lamp }
    const foundAt = [...state.foundAt]
    for (const input of inputs) {
      if (input.kind === 'pointer' && input.phase !== 'up') {
        target = { x: input.x, y: input.y }
        auto = false
      } else if (input.kind === 'key') {
        if (input.key === 'primary') {
          if (input.down) auto = true
        } else keys[input.key] = input.down
      }
    }
    const next = HIDDEN.find((_, i) => foundAt[i]! < 0)
    if (next && auto) target = { x: next.x, y: next.y }
    if (keys.left || keys.right) target.x = lamp.x + (keys.right ? 1 : -1) * 0.05
    if (keys.up || keys.down) target.y = lamp.y + (keys.down ? 1 : -1) * 0.05
    target = { x: clamp(target.x, LAMP.left, LAMP.right), y: clamp(target.y, LAMP.top, LAMP.bottom) }
    const step = SPEED * STEP
    const d = Math.hypot(target.x - lamp.x, target.y - lamp.y)
    if (d <= step) Object.assign(lamp, target)
    else {
      lamp.x += ((target.x - lamp.x) / d) * step
      lamp.y += ((target.y - lamp.y) / d) * step
    }
    const reach = context.gentle ? REACH.gentle : REACH.normal
    HIDDEN.forEach((h, i) => {
      if (foundAt[i]! >= 0 || Math.hypot(h.x - lamp.x, h.y - lamp.y) > reach) return
      foundAt[i] = time
      lastAt = time
      count++
      auto = false
      if (count === HIDDEN.length) doneAt = time
    })
    return { time, lamp, target, auto, keys, foundAt, count, lastAt, doneAt }
  },
  view(state, context): GameView {
    const finished = state.doneAt >= 0
    // When all is found, the lamp goes to the door with the rest, and fades.
    const out = finished ? Math.min(1, (state.time - state.doneAt) / CARRY) : 0
    const live: Record<string, number> = {
      [`actor:${LAMP.id}.x`]: lerp(state.lamp.x, DOOR.x, out),
      [`actor:${LAMP.id}.y`]: lerp(state.lamp.y, DOOR.y, out),
      [`actor:${LAMP.id}.opacity`]: 0.9 * (1 - out),
    }
    HIDDEN.forEach((h, i) => {
      const at = state.foundAt[i]!
      const t = at < 0 ? 0 : Math.min(1, (state.time - at) / CARRY)
      live[`actor:${h.id}.x`] = lerp(h.x, DOOR.x - 0.08, t)
      live[`actor:${h.id}.y`] = lerp(h.y, DOOR.y, t)
      // Dim in the ground; in gentle mode it glints as the lamp comes near; bright once found.
      const near = context.gentle && at < 0 ? Math.max(0, 1 - Math.hypot(h.x - state.lamp.x, h.y - state.lamp.y) / 0.3) : 0
      live[`actor:${h.id}.opacity`] = at < 0 ? 0.25 + 0.5 * near : 0.25 + 0.75 * t
    })
    const telling = state.count > 0 && state.time - state.lastAt < WORDS
    const message = telling ? FOUND[state.foundAt.indexOf(state.lastAt)]! : finished ? ALL : null
    return { live, hint: finished ? null : HINT, message, done: finished && state.time - state.doneAt >= WORDS + SHOW }
  },
}
