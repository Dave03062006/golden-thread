import { LAMP_START, MERCY_SIGNS } from '../../content/levels/01-creation-and-fall/episode-4'
import { verseText } from '../../content/bible/verses'
import { formatReference } from '../../content/bible/books'
import { projectPoint, unprojectPoint, type SceneFrame } from '../../scene/evaluate'
import { STEP, type GameRules, type Hint } from '../framework'
import { outCubic } from '../let-there-be/shared'

/**
 * "Lights in the dark" (Level 1 script, Episode 4). As the man and the woman go out of
 * the garden at dusk, the player guides a small light through the darkening land, with a
 * finger, the mouse or the arrow keys, to find three signs of God's mercy inside the
 * judgment: the promise, the garments, and the name Eve. Each find brightens the path and
 * recalls its verse. Space alone carries the light to the next sign. In gentle mode the
 * light is larger and the signs easier to reach.
 */

export const HINT: Hint = {
  pointer: 'Guide the light to the glowing signs.',
  keys: 'Move the light with the arrow keys, or press Space to go to the next sign.',
  gesture: 'drag',
}

/** How fast the light moves, in frame widths a second. */
const SPEED = 0.32
/** How long a found sign's verse stays before the next can be read, in seconds. */
const READ = 3.2
/** How long after the last find before moving on. */
const LINGER = 3.6
/** How large the light is (the story's end of play sets it back to normal). */
export const LAMP_SIZE = { normal: 0.1, gentle: 0.15 }
/** How bright the path is at first, and how much each find adds. */
const PATH_START = 0.25
const PATH_STEP = 0.25

interface LightsState {
  x: number
  y: number
  /** Where the light is heading, if anywhere (a finger, or Space toward a sign). */
  target: { x: number; y: number } | null
  held: { up: boolean; down: boolean; left: boolean; right: boolean }
  /** Seconds since each sign was found, by id, or -1. */
  found: Record<string, number>
  /** The sign whose verse is showing. */
  showing: string | null
}

const depthOf = (frame: SceneFrame, id: string) => frame.actors.find((a) => a.id === id)?.depth ?? 0.45

/** The messages, made once so the screen sees the same object while one shows. */
const MESSAGES = Object.fromEntries(MERCY_SIGNS.map((s) => [s.id, { title: s.title, reference: formatReference(s.ref), text: verseText(s.ref) }]))

export const lightsInTheDark: GameRules<LightsState> = {
  id: 'lights-in-the-dark',
  start: () => ({
    x: LAMP_START.x,
    y: LAMP_START.y,
    target: null,
    held: { up: false, down: false, left: false, right: false },
    found: Object.fromEntries(MERCY_SIGNS.map((s) => [s.id, -1])),
    showing: null,
  }),
  step(state, inputs, context) {
    let { x, y, target, showing } = state
    const held = { ...state.held }
    const found = { ...state.found }
    const frame = context.frame()
    const depth = depthOf(frame, 'lamp')

    for (const input of inputs) {
      if (input.kind === 'pointer') {
        if (input.phase === 'up') target = null
        else {
          const p = unprojectPoint(input.x, input.y, depth, frame.camera)
          target = { x: p.x, y: p.y }
        }
      } else if (input.kind === 'key') {
        if (input.key === 'primary') {
          if (input.down) {
            const next = MERCY_SIGNS.find((s) => found[s.id]! < 0)
            if (next) target = { x: next.x, y: next.y }
          }
        } else {
          held[input.key] = input.down
          if (input.down) target = null
        }
      }
    }

    // Move: toward the target, or with the arrow keys.
    const reach = SPEED * STEP
    if (target) {
      const d = Math.hypot(target.x - x, target.y - y)
      if (d > 0.002) {
        const k = Math.min(1, reach / d)
        x += (target.x - x) * k
        y += (target.y - y) * k
      }
    } else {
      x += ((held.right ? 1 : 0) - (held.left ? 1 : 0)) * reach
      y += ((held.down ? 1 : 0) - (held.up ? 1 : 0)) * reach * 1.6
    }
    x = Math.min(0.97, Math.max(0.03, x))
    y = Math.min(0.92, Math.max(0.12, y))

    // Find: the light comes close enough to a sign (closer in screen terms than in the world).
    const radius = context.gentle ? 0.07 : 0.045
    const me = projectPoint(x, y, depth, frame.camera)
    for (const s of MERCY_SIGNS) {
      if (found[s.id]! >= 0) {
        found[s.id] = found[s.id]! + STEP
        continue
      }
      const p = projectPoint(s.x, s.y, depthOf(frame, s.id), frame.camera)
      if (Math.hypot(p.x - me.x, (p.y - me.y) * 0.56) < radius) {
        found[s.id] = 0
        showing = s.id
        if (target && Math.hypot(target.x - s.x, target.y - s.y) < 0.01) target = null
      }
    }
    if (showing && found[showing]! > READ && MERCY_SIGNS.every((s) => found[s.id]! < 0 || found[s.id]! > READ)) showing = null
    return { x, y, target, held, found, showing }
  },
  view(state, context) {
    // In gentle mode the light is larger.
    const live: Record<string, number> = { 'actor:lamp.x': state.x, 'actor:lamp.y': state.y, 'actor:lamp.size': context.gentle ? LAMP_SIZE.gentle : LAMP_SIZE.normal }
    let count = 0
    for (const s of MERCY_SIGNS) {
      const t = state.found[s.id]!
      if (t >= 0) count++
      // A found sign flares, then settles into a quiet glow.
      live[`actor:${s.id}.opacity`] = t < 0 ? 1 : 0.45 + 0.55 * (1 - outCubic(t / 1.6))
    }
    live['layer:east-path.opacity'] = PATH_START + PATH_STEP * count
    const last = Math.min(...MERCY_SIGNS.map((s) => state.found[s.id]!))
    return {
      live,
      hint: count < MERCY_SIGNS.length ? HINT : null,
      message: state.showing ? MESSAGES[state.showing]! : null,
      done: last >= LINGER,
    }
  },
}

