import { BEAK, FLIGHTS, HOME, type FlightStage } from '../../content/levels/02-noah-and-the-nations/episode-4'
import { actor } from '../../scene/build'
import { STEP, type GameKey, type GameRules, type GameView, type Hint } from '../framework'

/**
 * The dove (Level 2 script, Episode 4): the flight kind of play, in three short flights,
 * each from Noah's window. The player guides the dove from place to place: out over the
 * water, where she finds nowhere to land, and home to Noah's hand; to the olive tree, for
 * a leaf to carry back; and at last over the green hills to a tree, where she stays.
 *
 * She flies toward the pointer while it's held, or the way the arrow keys point. With
 * neither, she flies on her own toward where she needs to go, slowly, and each press of
 * Space beats her wings and speeds her on: the one-button way. In gentle mode a soft wind
 * carries her toward the place too, and she reaches it from farther away.
 */

/** How fast she flies when guided, and on her own, in frame widths a second. */
const GUIDED = 0.32
const ALONE = 0.06
/** What a beat of her wings adds, the most it can add, and how fast it fades. */
const BEAT = 0.18
const BEAT_MAX = 0.36
const BEAT_FADE = 0.5
/** The gentle wind toward where she's going. */
const WIND = 0.1
/** How close counts as there. */
const NEAR = { normal: 0.06, gentle: 0.1 }
/** How long what she finds stays on screen, and how long she takes to settle at the end. */
const FOUND_FOR = 2.6
const SETTLE = 1.4
/** Where she may fly: the sky and the air over the water, inside the frame. */
const BOUNDS = { left: 0.04, right: 0.96, top: 0.08, bottom: 0.8 }

type Arrow = Extract<GameKey, 'left' | 'right' | 'up' | 'down'>

interface DoveState {
  time: number
  x: number
  y: number
  vx: number
  vy: number
  facing: -1 | 1
  /** Which stage of the flight she's on; past the last, she's settling. */
  stage: number
  /** The arrow keys held, and where the pointer is held, if it is. */
  held: Arrow[]
  pointer: { x: number; y: number } | null
  /** Speed from the beats of her wings. */
  beat: number
  /** When she found the last thing she found, and which stage it was. */
  foundAt: number
  foundStage: number
  carrying: boolean
  /** When she reached the last place. */
  endedAt: number
}

const stageHints = new Map<FlightStage, Hint>()
function hintFor(stage: FlightStage): Hint {
  let hint = stageHints.get(stage)
  if (!hint) {
    hint = { pointer: `${stage.goal} Hold and point where she should fly.`, keys: 'Or fly her with the arrow keys, and press Space to beat her wings.', gesture: 'drag' }
    stageHints.set(stage, hint)
  }
  return hint
}

const toward = (fromX: number, fromY: number, to: { x: number; y: number }) => {
  const dx = to.x - fromX
  const dy = to.y - fromY
  const d = Math.hypot(dx, dy)
  return d < 1e-6 ? { x: 0, y: 0, d } : { x: dx / d, y: dy / d, d }
}

function flight(id: keyof typeof FLIGHTS): GameRules<DoveState> {
  const stages = FLIGHTS[id]
  const carries = stages.some((s) => s.pluck)
  return {
    id,
    start: () => ({ time: 0, x: HOME.x, y: HOME.y, vx: 0, vy: 0, facing: -1, stage: 0, held: [], pointer: null, beat: 0, foundAt: -Infinity, foundStage: -1, carrying: false, endedAt: -1 }),
    step(state, inputs, context, emit) {
      const time = state.time + STEP
      let { x, y, vx, vy, facing, stage, beat, foundAt, foundStage, carrying, endedAt, pointer } = state
      let held = state.held
      for (const input of inputs) {
        if (input.kind === 'key') {
          if (input.key === 'primary') {
            if (input.down) beat = Math.min(BEAT_MAX, beat + BEAT)
          } else if (input.down) held = held.includes(input.key) ? held : [...held, input.key]
          else held = held.filter((k) => k !== input.key)
        } else if (input.kind === 'pointer') {
          if (input.phase === 'down' || (input.phase === 'move' && pointer)) pointer = { x: input.x, y: input.y }
          else if (input.phase === 'up') pointer = null
        }
      }
      beat = Math.max(0, beat - BEAT_FADE * STEP)

      const goal = stages[Math.min(stage, stages.length - 1)]!.at
      if (endedAt >= 0) {
        // Settling: she glides the last little way and comes to rest.
        x += (goal.x - x) * Math.min(1, STEP * 4)
        y += (goal.y - y) * Math.min(1, STEP * 4)
        return { ...state, time, x, y, vx: 0, vy: 0, held, pointer, beat }
      }

      // Which way she wants to fly, and how fast.
      let want = { x: 0, y: 0 }
      let speed = ALONE + beat
      if (pointer) {
        const to = toward(x, y, pointer)
        want = to.d > 0.01 ? to : { x: 0, y: 0 }
        speed = GUIDED * Math.min(1, to.d / 0.05)
      } else if (held.length) {
        const kx = (held.includes('right') ? 1 : 0) - (held.includes('left') ? 1 : 0)
        const ky = (held.includes('down') ? 1 : 0) - (held.includes('up') ? 1 : 0)
        const d = Math.hypot(kx, ky) || 1
        want = { x: kx / d, y: ky / d }
        speed = GUIDED
      } else want = toward(x, y, goal)
      let wx = want.x * speed
      let wy = want.y * speed
      if (context.gentle) {
        const to = toward(x, y, goal)
        wx += to.x * WIND
        wy += to.y * WIND
      }
      vx += (wx - vx) * Math.min(1, STEP * 4)
      vy += (wy - vy) * Math.min(1, STEP * 4)
      x = Math.min(BOUNDS.right, Math.max(BOUNDS.left, x + vx * STEP))
      y = Math.min(BOUNDS.bottom, Math.max(BOUNDS.top, y + vy * STEP))
      if (vx > 0.02) facing = 1
      else if (vx < -0.02) facing = -1

      // Reaching the place she's flying to.
      const here = stages[stage]!
      if (Math.hypot(here.at.x - x, here.at.y - y) < (context.gentle ? NEAR.gentle : NEAR.normal)) {
        if (here.found) {
          foundAt = time
          foundStage = stage
        }
        if (here.pluck) {
          carrying = true
          emit(actor('dove', { pose: 'leaf' }, { seconds: 0.3 }))
        }
        stage++
        if (stage >= stages.length) endedAt = time
      }
      return { time, x, y, vx, vy, facing, stage, held, pointer, beat, foundAt, foundStage, carrying, endedAt }
    },
    view(state): GameView {
      const goal = stages[Math.min(state.stage, stages.length - 1)]!.at
      const live: Record<string, number> = {
        'actor:dove.x': state.x,
        'actor:dove.y': state.y,
        'actor:dove.facing': state.facing,
        'actor:goal.x': goal.x,
        'actor:goal.y': goal.y,
        // The place to fly to glows softly until she gets there.
        'actor:goal.opacity': state.endedAt >= 0 ? 0 : 0.8 + 0.2 * Math.sin(state.time * Math.PI * 2 * 0.7),
      }
      if (carries) {
        live['actor:olive-leaf.x'] = state.carrying ? state.x + state.facing * BEAK.x : goal.x
        live['actor:olive-leaf.y'] = state.carrying ? state.y + BEAK.y : goal.y
        live['actor:olive-leaf.opacity'] = state.carrying ? 0.85 : 0
      }
      const found = state.foundStage >= 0 && state.time - state.foundAt < FOUND_FOR ? stages[state.foundStage]!.found! : null
      const settled = state.endedAt >= 0 && state.time - state.endedAt >= Math.max(SETTLE, found ? FOUND_FOR : 0)
      return { live, hint: state.endedAt >= 0 ? null : hintFor(stages[state.stage]!), message: found, done: settled }
    },
  }
}

export const theDove: Record<string, GameRules<DoveState>> = { 'dove-1': flight('dove-1'), 'dove-2': flight('dove-2'), 'dove-3': flight('dove-3') }
