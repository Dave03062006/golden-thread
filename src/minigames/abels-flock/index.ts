import { FLOCK, FOLD_GATE, STAFF_START } from '../../content/levels/01-creation-and-fall/episode-5'
import { actor } from '../../scene/build'
import { projectPoint, unprojectPoint, type SceneFrame } from '../../scene/evaluate'
import { STEP, type Choice, type GameRules, type Hint } from '../framework'

/**
 * "Abel's flock" (Level 1 script, Episode 5), in two parts.
 *
 * 1. Guide the sheep home into the fold with the shepherd's staff (finger, mouse or arrow
 *    keys): sheep step away from the staff, so it's held behind them to drive them toward
 *    the gate. A couple of lambs wander off and need nudging back. Space alone works too:
 *    each press brings the staff round behind the sheep farthest from home.
 * 2. In the fold, the firstborn lambs glow softly. The player chooses the offering, by
 *    tapping a lamb or picking from the choices. The firstborn, the first and best, fulfils
 *    it; anything else gets a quiet "Abel gave the first and the best", and another try.
 *
 * Gentle mode: slower sheep, a wider gate, no wandering lambs, and two choices.
 */

export const HINT: Hint = {
  pointer: 'Hold the staff behind the sheep to guide them into the fold.',
  keys: 'Move the staff with the arrow keys, or press Space to drive the next sheep home.',
  gesture: 'drag',
}

/** How close the staff must be for a sheep to step away, in frame widths. */
const NEAR = 0.11
/** How fast sheep move, in frame widths a second. */
const PACE = { normal: 0.11, gentle: 0.08 }
/** How fast the staff moves to where it's sent. */
const STAFF_SPEED = 0.45
/** Half the height of the gate. */
const GATE = { normal: 0.045, gentle: 0.075 }
/** How long a sheep takes to settle into its place in the fold. */
const SETTLE = 1.6
/** How long the right choice shows before moving on. */
const CHOSEN = 2.6
/** How far from the fold's line a sheep stops, if it isn't at the gate. */
const WALL = 0.006
/** The pasture's edges: where sheep can graze. */
const PASTURE = { left: 0.42, right: FOLD_GATE.x, top: 0.66, bottom: 0.87 }

interface Sheep {
  x: number
  y: number
  facing: -1 | 1
  walking: boolean
  /** Seconds since it came through the gate, or -1. */
  home: number
  /** Where it was when it came home, to settle from. */
  fromX: number
  fromY: number
}

interface FlockState {
  sheep: Record<string, Sheep>
  staff: { x: number; y: number }
  target: { x: number; y: number } | null
  held: { up: boolean; down: boolean; left: boolean; right: boolean }
  time: number
  phase: 'herd' | 'choose' | 'chosen'
  /** Seconds since the phase began. */
  clock: number
  missed: boolean
}

const QUESTION = 'Which will Abel bring as his offering to the LORD?'
const RIGHT = 'A firstborn lamb, the first and best of the flock'
const OPTIONS = [
  { id: 'firstborn', text: RIGHT },
  { id: 'old-ewe', text: 'An old ewe that’s going lame' },
  { id: 'nearest', text: 'Whichever lamb is nearest the gate' },
]
const NOT_THAT = { right: false, text: 'Abel gave the first and the best.' }
const CHOICES = {
  normal: { id: 'offering', question: QUESTION, options: OPTIONS, feedback: null } as Choice,
  gentle: { id: 'offering', question: QUESTION, options: [OPTIONS[1]!, OPTIONS[0]!], feedback: null } as Choice,
}
const AGAIN = { normal: { ...CHOICES.normal, feedback: NOT_THAT }, gentle: { ...CHOICES.gentle, feedback: NOT_THAT } }
const DONE_CHOICE = { ...CHOICES.normal, options: [], feedback: { right: true, text: 'Abel brought a firstborn lamb, the best he had.' } } as Choice

const depthOf = (frame: SceneFrame, id: string) => frame.actors.find((a) => a.id === id)?.depth ?? 0.45

/** A lamb's own wandering, the same every time: a slow drift that changes direction now and then. */
function wanderOf(index: number, time: number) {
  const turn = Math.floor(time / 3.2 + index * 0.7)
  const angle = Math.sin(turn * 12.9898 + index * 78.233) * Math.PI * 2
  return { x: Math.cos(angle), y: Math.sin(angle) * 0.5 }
}

export const abelsFlock: GameRules<FlockState> = {
  id: 'abels-flock',
  start: () => ({
    sheep: Object.fromEntries(FLOCK.map((a) => [a.id, { x: a.x, y: a.y, facing: 1 as const, walking: false, home: -1, fromX: a.x, fromY: a.y }])),
    staff: { ...STAFF_START },
    target: null,
    held: { up: false, down: false, left: false, right: false },
    time: 0,
    phase: 'herd',
    clock: 0,
    missed: false,
  }),
  step(state, inputs, context, emit) {
    const gentle = context.gentle
    const frame = context.frame()
    const staff = { ...state.staff }
    const held = { ...state.held }
    let { target, phase, clock, missed } = state
    const sheep: Record<string, Sheep> = {}
    for (const [id, s] of Object.entries(state.sheep)) sheep[id] = { ...s }

    const choose = (right: boolean) => {
      if (right) {
        phase = 'chosen'
        clock = 0
      } else missed = true
    }

    for (const input of inputs) {
      if (phase === 'herd') {
        if (input.kind === 'pointer') {
          if (input.phase === 'up') target = null
          else {
            const p = unprojectPoint(input.x, input.y, depthOf(frame, 'staff'), frame.camera)
            target = { x: p.x, y: p.y }
          }
        } else if (input.kind === 'key') {
          if (input.key === 'primary') {
            if (input.down) {
              // Behind the sheep farthest from home, on the far side from the gate.
              const away = FLOCK.filter((a) => sheep[a.id]!.home < 0).sort(
                (a, b) => Math.hypot(sheep[b.id]!.x - FOLD_GATE.x, sheep[b.id]!.y - FOLD_GATE.y) - Math.hypot(sheep[a.id]!.x - FOLD_GATE.x, sheep[a.id]!.y - FOLD_GATE.y),
              )[0]
              if (away) {
                const s = sheep[away.id]!
                const d = Math.hypot(s.x - FOLD_GATE.x, s.y - FOLD_GATE.y) || 1
                target = { x: s.x + ((s.x - FOLD_GATE.x) / d) * 0.06, y: s.y + ((s.y - FOLD_GATE.y) / d) * 0.06 }
              }
            }
          } else {
            held[input.key] = input.down
            if (input.down) target = null
          }
        }
      } else if (phase === 'choose') {
        if (input.kind === 'choose') choose(input.option === 'firstborn')
        else if (input.kind === 'pointer' && input.phase === 'down') {
          // Tapping a lamb in the fold chooses it.
          const tapped = FLOCK.map((a) => ({ a, p: projectPoint(sheep[a.id]!.x, sheep[a.id]!.y - 0.03, depthOf(frame, a.id), frame.camera) }))
            .map(({ a, p }) => ({ a, d: Math.hypot(p.x - input.x, (p.y - input.y) * 0.56) }))
            .filter(({ d }) => d < 0.04)
            .sort((a, b) => a.d - b.d)[0]
          if (tapped) choose(tapped.a.firstborn)
        }
      }
    }

    // The staff moves toward where it's sent, or with the arrow keys.
    const reach = STAFF_SPEED * STEP
    if (target) {
      const d = Math.hypot(target.x - staff.x, target.y - staff.y)
      if (d > 0.002) {
        const k = Math.min(1, reach / d)
        staff.x += (target.x - staff.x) * k
        staff.y += (target.y - staff.y) * k
      }
    } else {
      staff.x += ((held.right ? 1 : 0) - (held.left ? 1 : 0)) * reach
      staff.y += ((held.down ? 1 : 0) - (held.up ? 1 : 0)) * reach
    }
    staff.x = Math.min(0.95, Math.max(0.05, staff.x))
    staff.y = Math.min(0.95, Math.max(0.6, staff.y))

    // The flock.
    const pace = (gentle ? PACE.gentle : PACE.normal) * STEP
    const gate = gentle ? GATE.gentle : GATE.normal
    FLOCK.forEach((a, index) => {
      const s = sheep[a.id]!
      if (s.home >= 0) {
        s.home += STEP
        if (s.walking && s.home > SETTLE) {
          s.walking = false
          emit(actor(a.id, { pose: 'idle' }, { seconds: 0.4 }))
        }
        return
      }
      let vx = 0
      let vy = 0
      const dx = s.x - staff.x
      const dy = (s.y - staff.y) * 1.4
      const d = Math.hypot(dx, dy)
      if (d < NEAR && d > 0) {
        // Step away from the staff, faster the closer it is.
        const push = Math.sqrt(1 - d / NEAR)
        vx = (dx / d) * push
        vy = (dy / d) * push
        // Near the fold, the gate draws them in.
        const toGate = Math.hypot(FOLD_GATE.x - s.x, FOLD_GATE.y - s.y)
        if (toGate < 0.15) {
          vx += ((FOLD_GATE.x - s.x) / toGate) * 0.5
          vy += ((FOLD_GATE.y - s.y) / toGate) * 0.5
        }
      } else if (a.wanders && !gentle) {
        const w = wanderOf(index, state.time)
        vx = w.x * 0.3
        vy = w.y * 0.3
      }
      s.x += vx * pace
      s.y += vy * pace
      // Through the gate: home.
      // (Sheep held at the wall stand just short of it, so the gate reaches a little past that.)
      if (s.x >= FOLD_GATE.x - WALL - 0.002 && Math.abs(s.y - FOLD_GATE.y) < gate) {
        s.home = 0
        s.fromX = s.x
        s.fromY = s.y
        s.facing = 1
        if (!s.walking) {
          s.walking = true
          emit(actor(a.id, { pose: 'walk' }, { seconds: 0.3 }))
        }
        return
      }
      // The pasture's edges, and the fold's wall beside the gate.
      s.x = Math.min(PASTURE.right - WALL, Math.max(PASTURE.left, s.x))
      s.y = Math.min(PASTURE.bottom, Math.max(PASTURE.top, s.y))
      const moving = Math.hypot(vx, vy) > 0.15
      if (Math.abs(vx) > 0.1) s.facing = vx > 0 ? 1 : -1
      if (moving !== s.walking) {
        s.walking = moving
        emit(actor(a.id, { pose: moving ? 'walk' : 'idle' }, { seconds: 0.3 }))
      }
    })

    if (phase === 'herd' && FLOCK.every((a) => sheep[a.id]!.home > SETTLE)) {
      phase = 'choose'
      clock = 0
    }
    return { sheep, staff, target, held, time: state.time + STEP, phase, clock: clock + STEP, missed }
  },
  view(state, context) {
    const live: Record<string, number> = { 'actor:staff.x': state.staff.x, 'actor:staff.y': state.staff.y }
    FLOCK.forEach((a) => {
      const s = state.sheep[a.id]!
      let { x, y } = s
      if (s.home >= 0) {
        // Settling from the gate into its place.
        const t = Math.min(1, s.home / SETTLE)
        const k = t * t * (3 - 2 * t)
        x = s.fromX + (a.slot.x - s.fromX) * k
        y = s.fromY + (a.slot.y - s.fromY) * k
      }
      live[`actor:${a.id}.x`] = x
      live[`actor:${a.id}.y`] = y
      live[`actor:${a.id}.facing`] = s.facing
    })
    const glow = state.phase === 'herd' ? 0 : Math.min(1, state.clock / 1.2)
    live['actor:firstborn-glow-1.opacity'] = glow
    live['actor:firstborn-glow-2.opacity'] = glow
    let choice: Choice | null = null
    if (state.phase === 'choose') {
      const kind = context.gentle ? 'gentle' : 'normal'
      choice = state.missed ? AGAIN[kind] : CHOICES[kind]
    } else if (state.phase === 'chosen') choice = DONE_CHOICE
    return {
      live,
      hint: state.phase === 'herd' ? HINT : null,
      choice,
      done: state.phase === 'chosen' && state.clock >= CHOSEN,
    }
  },
}
