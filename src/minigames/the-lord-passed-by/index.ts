import { GLORY, NAMES } from '../../content/levels/10-sinai/episode-6'
import { STEP, type GameInput, type GameRules, type GameView, type Hint } from '../framework'

/**
 * The LORD passed by (Level 10 script, Episode 6): light and reveal. Moses stands in the
 * cleft of the rock, covered by God's hand, while God's glory passes by as a great light.
 * The player follows it across the rock face, and wherever the light passes, the words of
 * God's name shine out, one after another: "merciful," "gracious," "slow to anger," and the
 * rest (Exodus 34:6–7). When all are shown, the light has passed by.
 *
 * Drag the light, or move it with the arrow keys; Space takes it to the next word. In gentle
 * mode the light moves by itself.
 */

export const HINT: Hint = {
  pointer: 'Follow the light of God’s glory across the rock, to see the words of his name.',
  keys: 'Or move it with the arrow keys, or press Space for the next word.',
  gesture: 'drag',
}

/** How fast the light moves, how near it must pass a word, how long each word shows, how long the end shows. */
const SPEED = 0.4
const GENTLE_SPEED = 0.15
export const REACH = 0.08
const WORDS = 1.8
const SHOW = 2.6

interface GloryState {
  time: number
  light: { x: number; y: number }
  target: { x: number; y: number }
  auto: boolean
  keys: { left: boolean; right: boolean; up: boolean; down: boolean }
  shown: boolean[]
  count: number
  shownAt: number
  doneAt: number
}

const SHOWN = NAMES.map((n, i) => ({ title: `${i + 1} of ${NAMES.length}`, text: `“${n.text[0]!.toUpperCase()}${n.text.slice(1)}”` }))
const ALL = { title: '“The LORD, the LORD”', text: '“A God merciful and gracious, slow to anger, and abounding in steadfast love and faithfulness.”' }

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))

export const theLordPassedBy: GameRules<GloryState> = {
  id: 'the-lord-passed-by',
  start: () => ({ time: 0, light: { x: GLORY.x, y: GLORY.y }, target: { x: GLORY.x, y: GLORY.y }, auto: false, keys: { left: false, right: false, up: false, down: false }, shown: NAMES.map(() => false), count: 0, shownAt: -Infinity, doneAt: -1 }),
  step(state, inputs: readonly GameInput[], context) {
    const time = state.time + STEP
    if (state.doneAt >= 0) {
      // The light passes on across the rock, and away.
      const step = SPEED * STEP
      const toward = (from: number, to: number) => (Math.abs(to - from) <= step ? to : from + Math.sign(to - from) * step)
      return { ...state, time, light: { x: toward(state.light.x, GLORY.right), y: toward(state.light.y, GLORY.y) } }
    }
    let { auto, count, shownAt, doneAt } = state
    let target = { ...state.target }
    const keys = { ...state.keys }
    const light = { ...state.light }
    const shown = [...state.shown]
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
    const next = NAMES.find((_, i) => !shown[i])
    if (next && (auto || context.gentle)) target = { x: next.x, y: next.y }
    if (keys.left || keys.right) target.x = light.x + (keys.right ? 1 : -1) * 0.05
    if (keys.up || keys.down) target.y = light.y + (keys.down ? 1 : -1) * 0.05
    target = { x: clamp(target.x, GLORY.left, GLORY.right), y: clamp(target.y, GLORY.top, GLORY.bottom) }
    const speed = (context.gentle && !auto ? GENTLE_SPEED : SPEED) * STEP
    const d = Math.hypot(target.x - light.x, target.y - light.y)
    if (d <= speed) Object.assign(light, target)
    else {
      light.x += ((target.x - light.x) / d) * speed
      light.y += ((target.y - light.y) / d) * speed
    }
    NAMES.forEach((n, i) => {
      if (shown[i] || Math.hypot(n.x - light.x, n.y - light.y) > REACH) return
      shown[i] = true
      shownAt = time
      count++
      auto = false
      if (count === NAMES.length) doneAt = time
    })
    return { time, light, target, auto, keys, shown, count, shownAt, doneAt }
  },
  view(state): GameView {
    const finished = state.doneAt >= 0
    // When all are shown, the light passes on and fades.
    const passing = finished ? Math.min(1, (state.time - state.doneAt) / SHOW) : 0
    const live: Record<string, number> = {
      'actor:glory.x': state.light.x,
      'actor:glory.y': state.light.y,
      'actor:glory.opacity': 0.9 * (1 - passing),
    }
    NAMES.forEach((n, i) => (live[`actor:${n.id}.opacity`] = state.shown[i] ? 0.85 : 0))
    const told = state.count > 0 && state.time - state.shownAt < WORDS
    const message = told ? SHOWN[state.count - 1]! : finished ? ALL : null
    return { live, hint: finished ? null : HINT, message, done: finished && state.time - state.doneAt >= WORDS + SHOW }
  },
}
