import { LIGHT, PILLAR, TENTS } from '../../content/levels/09-through-the-sea/episode-1'
import { STEP, type GameInput, type GameRules, type GameView, type Hint } from '../framework'

/**
 * The light in the camp (Level 9 script, Episode 1): light and reveal. Night by the sea.
 * First the player moves the pillar of cloud from before the camp to behind it, between the
 * people and the chariots of Egypt, which vanish into its darkness. Then its light reaches into
 * the camp, and the player brings it over the tents: each frightened family it finds grows
 * calm, and its lamp glows, until the whole camp is lit and at rest.
 *
 * Drag to move the pillar, then the light; the arrow keys move them too; Space moves the
 * pillar by itself, then takes the light to the next dark tent. In gentle mode the light is
 * wider, and drifts toward the next dark tent by itself.
 */

export const HINTS: Record<'pillar' | 'light', Hint> = {
  pillar: { pointer: 'Drag the pillar of cloud behind the camp, between God’s people and the chariots.', keys: 'Or use the arrow keys, or press Space.', gesture: 'drag' },
  light: { pointer: 'Bring the light to every tent in the camp.', keys: 'Or move it with the arrow keys, or press Space for the next tent.', gesture: 'drag' },
}

/** How fast the pillar and the light move, in frame widths a second; how near the light must come to a tent. */
const PILLAR_SPEED = 0.35
const LIGHT_SPEED = 0.4
const GENTLE_DRIFT = 0.12
export const REACH = 0.07
const GENTLE_REACH = 0.12
/** How long each tent's words show, and how long the end shows. */
const WORDS = 1.8
const SHOW = 2.6

interface CampState {
  time: number
  phase: 'pillar' | 'light'
  pillar: number
  /** Where the pillar or the light is heading; whether Space sends them by themselves. */
  target: { x: number; y: number }
  auto: boolean
  keys: { left: boolean; right: boolean; up: boolean; down: boolean }
  light: { x: number; y: number }
  lit: boolean[]
  litAt: number
  count: number
  doneAt: number
}

const LIT = TENTS.map((t, n) => ({ title: `${n + 1} of ${TENTS.length}`, text: t.text }))
const BEHIND = { title: 'Between the camps', text: 'On Egypt’s side, darkness; on Israel’s side, light.' }
const ALL = { title: '“Fear not”', text: 'The whole camp rests, and the LORD keeps watch.' }

const moveToward = (from: number, to: number, step: number) => (Math.abs(to - from) <= step ? to : from + Math.sign(to - from) * step)
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))

export const theLightInTheCamp: GameRules<CampState> = {
  id: 'the-light-in-the-camp',
  start: () => ({
    time: 0,
    phase: 'pillar',
    pillar: PILLAR.front,
    target: { x: PILLAR.front, y: LIGHT.y },
    auto: false,
    keys: { left: false, right: false, up: false, down: false },
    light: { x: LIGHT.x, y: LIGHT.y },
    lit: TENTS.map(() => false),
    litAt: -Infinity,
    count: 0,
    doneAt: -1,
  }),
  step(state, inputs: readonly GameInput[], context) {
    const time = state.time + STEP
    if (state.doneAt >= 0) return { ...state, time }
    let { phase, pillar, auto, litAt, count, doneAt } = state
    let target = { ...state.target }
    const keys = { ...state.keys }
    const light = { ...state.light }
    const lit = [...state.lit]
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
    if (phase === 'pillar') {
      if (context.gentle || auto) target.x = PILLAR.behind
      if (keys.left || keys.right) target.x = pillar + (keys.right ? 1 : -1) * 0.05
      pillar = moveToward(pillar, clamp(target.x, PILLAR.behind, PILLAR.front), PILLAR_SPEED * STEP)
      if (pillar <= PILLAR.behind + 0.005) {
        pillar = PILLAR.behind
        phase = 'light'
        auto = false
        target = { ...light }
        litAt = time
      }
    } else {
      const next = TENTS.find((_, i) => !lit[i])
      if (next && (auto || (context.gentle && !inputs.some((i) => i.kind === 'pointer')))) target = { x: next.x, y: next.y }
      if (keys.left || keys.right) target.x = light.x + (keys.right ? 1 : -1) * 0.05
      if (keys.up || keys.down) target.y = light.y + (keys.down ? 1 : -1) * 0.05
      target = { x: clamp(target.x, LIGHT.left, LIGHT.right), y: clamp(target.y, LIGHT.top, LIGHT.bottom) }
      const speed = (context.gentle && !auto ? GENTLE_DRIFT : LIGHT_SPEED) * STEP
      const d = Math.hypot(target.x - light.x, target.y - light.y)
      if (d <= speed) Object.assign(light, target)
      else {
        light.x += ((target.x - light.x) / d) * speed
        light.y += ((target.y - light.y) / d) * speed
      }
      const reach = context.gentle ? GENTLE_REACH : REACH
      TENTS.forEach((t, i) => {
        if (lit[i] || Math.hypot(t.x - light.x, t.y - light.y) > reach) return
        lit[i] = true
        litAt = time
        count++
        auto = false
        if (count === TENTS.length) doneAt = time
      })
    }
    return { time, phase, pillar, target, auto, keys, light, lit, litAt, count, doneAt }
  },
  view(state): GameView {
    const finished = state.doneAt >= 0
    // The chariots vanish into the cloud's darkness as the pillar comes between.
    const between = clamp((state.pillar - PILLAR.behind) / 0.2, 0, 1)
    const live: Record<string, number> = {
      'actor:pillar.x': state.pillar,
      'actor:pillar-light.x': state.pillar,
      'actor:dust.opacity': between,
      'actor:chariots.opacity': between,
      'actor:camp-light.x': state.light.x,
      'actor:camp-light.y': state.light.y,
      'actor:camp-light.opacity': state.phase === 'light' && !finished ? 0.85 : 0,
    }
    TENTS.forEach((t, i) => (live[`actor:${t.light}.opacity`] = state.lit[i] ? 0.85 : 0))
    const telling = state.time - state.litAt < WORDS
    const message = finished ? (state.time - state.doneAt < WORDS ? LIT[TENTS.length - 1]! : ALL) : telling ? (state.count > 0 ? LIT[state.count - 1]! : BEHIND) : null
    return { live, hint: finished ? null : HINTS[state.phase], message, done: finished && state.time - state.doneAt >= WORDS + SHOW }
  },
}
