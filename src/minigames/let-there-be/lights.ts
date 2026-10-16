import { DAY_FOUR_HOMES, DAY_FOUR_RISEN } from '../../content/levels/01-creation-and-fall/episode-1'
import { projectPoint, unprojectPoint, type SceneFrame } from '../../scene/evaluate'
import { STEP, type GameContext, type GameRules } from '../framework'
import { HINTS, pressed, released } from './shared'

/**
 * Day four. First, drag the sun to the day side and the moon to the night side; each
 * glides to its place once it's on the right side, and drifts back down to the hills
 * if it isn't. Then
 * sweep a hand across the night sky, and the stars scatter in its wake.
 */

type Body = 'sun' | 'moon'

interface BodyState {
  x: number
  y: number
  placed: boolean
}

interface SunMoonState {
  sun: BodyState
  moon: BodyState
  dragging: Body | null
  /** Where on the body it was picked up, so it doesn't jump to the finger. */
  grabX: number
  grabY: number
}

const depthOf = (frame: SceneFrame, id: string) => frame.actors.find((a) => a.id === id)?.depth ?? 0

/** Starts from wherever the body is now; it may still be rising. */
function bodyAt(context: GameContext, id: Body): BodyState {
  const actor = context.frame().actors.find((a) => a.id === id)
  return { x: actor?.x ?? DAY_FOUR_RISEN[id].x, y: actor?.y ?? DAY_FOUR_RISEN[id].y, placed: false }
}

/** Is the body on its own side of the sky? */
const onItsSide = (body: Body, screenX: number) => (body === 'sun' ? screenX < 0.47 : screenX > 0.53)

export const sunAndMoon: GameRules<SunMoonState> = {
  id: 'sun-and-moon',
  start: (context) => ({ sun: bodyAt(context, 'sun'), moon: bodyAt(context, 'moon'), dragging: null, grabX: 0, grabY: 0 }),
  step(state, inputs, context) {
    let { dragging, grabX, grabY } = state
    const bodies = { sun: { ...state.sun }, moon: { ...state.moon } }
    const frame = context.frame()
    const screenOf = (id: Body) => projectPoint(bodies[id].x, bodies[id].y, depthOf(frame, id), frame.camera)

    for (const input of inputs) {
      if (input.kind === 'pointer') {
        if (input.phase === 'down') {
          const reach = context.gentle ? 0.12 : 0.08
          const candidates = (['sun', 'moon'] as const).filter((id) => !bodies[id].placed)
          const hit = candidates
            .map((id) => ({ id, d: Math.hypot(screenOf(id).x - input.x, (screenOf(id).y - input.y) * 0.56) }))
            .filter((c) => c.d < reach)
            .sort((a, b) => a.d - b.d)[0]
          if (hit) {
            dragging = hit.id
            const p = screenOf(hit.id)
            grabX = input.x - p.x
            grabY = input.y - p.y
          }
        } else if (input.phase === 'move' && dragging) {
          const p = unprojectPoint(input.x - grabX, input.y - grabY, depthOf(frame, dragging), frame.camera)
          bodies[dragging].x = Math.min(0.97, Math.max(0.03, p.x))
          bodies[dragging].y = Math.min(0.66, Math.max(0.06, p.y))
        } else if (input.phase === 'up' && dragging) {
          if (onItsSide(dragging, screenOf(dragging).x)) bodies[dragging].placed = true
          dragging = null
        }
      }
    }
    if (pressed(inputs, 'left')) bodies.sun.placed = true
    if (pressed(inputs, 'right')) bodies.moon.placed = true
    if (pressed(inputs, 'primary')) {
      const next = (['sun', 'moon'] as const).find((id) => !bodies[id].placed)
      if (next) bodies[next].placed = true
    }

    for (const id of ['sun', 'moon'] as const) {
      if (dragging === id) continue
      const body = bodies[id]
      // Placed: it glides to its home. Otherwise it rests just above the hills.
      const target = body.placed ? DAY_FOUR_HOMES[id] : DAY_FOUR_RISEN[id]
      const pull = STEP * (body.placed ? 3.2 : 2)
      body.x += (target.x - body.x) * pull
      body.y += (target.y - body.y) * pull
    }
    if (dragging && bodies[dragging].placed) dragging = null
    return { sun: bodies.sun, moon: bodies.moon, dragging, grabX, grabY }
  },
  view(state) {
    const home = (id: Body) => Math.hypot(state[id].x - DAY_FOUR_HOMES[id].x, state[id].y - DAY_FOUR_HOMES[id].y) < 0.004
    return {
      live: { 'actor:sun.x': state.sun.x, 'actor:sun.y': state.sun.y, 'actor:moon.x': state.moon.x, 'actor:moon.y': state.moon.y },
      hint: state.dragging ? null : !state.sun.placed ? HINTS.sun : !state.moon.placed ? HINTS.moon : null,
      done: state.sun.placed && state.moon.placed && home('sun') && home('moon'),
    }
  },
}

interface StarsState {
  /** How many stars have been scattered, from 0 to 1. */
  amount: number
  down: boolean
  last: { x: number; y: number } | null
  keyHeld: boolean
  marks: { x: number; y: number; age: number }[]
}

export const stars: GameRules<StarsState> = {
  id: 'stars',
  start: () => ({ amount: 0, down: false, last: null, keyHeld: false, marks: [] }),
  step(state, inputs, context) {
    let { amount, down, last, keyHeld } = state
    let marks = state.marks.map((m) => ({ ...m, age: m.age + STEP })).filter((m) => m.age < 0.8)
    const span = context.gentle ? 0.9 : 1.5
    for (const input of inputs) {
      if (input.kind !== 'pointer') continue
      if (input.phase === 'down') {
        down = true
        last = { x: input.x, y: input.y }
      } else if (input.phase === 'move' && down && last) {
        // Only the sky counts.
        if (input.y < 0.62) {
          amount += Math.hypot(input.x - last.x, (input.y - last.y) * 0.56) / span
          marks = [...marks.slice(-14), { x: input.x, y: input.y, age: 0 }]
        }
        last = { x: input.x, y: input.y }
      } else if (input.phase === 'up') {
        down = false
        last = null
      }
    }
    if (pressed(inputs, 'right', 'primary', 'left')) keyHeld = true
    if (released(inputs, 'right', 'primary', 'left')) keyHeld = false
    if (keyHeld) amount += STEP / (context.gentle ? 2 : 3)
    return { amount: Math.min(1, amount), down, last, keyHeld, marks }
  },
  view(state) {
    return {
      live: { 'layer:stars-a.opacity': state.amount, 'layer:stars-b.opacity': Math.max(0, state.amount * 1.25 - 0.25) },
      hint: state.amount < 0.05 ? HINTS.stars : null,
      marks: state.marks,
      done: state.amount >= 1,
    }
  },
}
