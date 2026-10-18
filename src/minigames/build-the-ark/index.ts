import { ARK, ARK_PARTS } from '../../content/levels/02-noah-and-the-nations/episode-2'
import { actor } from '../../scene/build'
import { STEP, type GameRules, type Hint } from '../framework'

/**
 * Building the ark (Level 2 script, Episode 2): the building kind of play. The ark is
 * built in the order of God's plan, part by part: the keel, the ribs, the three decks,
 * the planked hull with its rooms, the roof, and the door in its side. Each part arrives
 * above the ark while its outline glows on the plan; the player brings it down into place
 * (dragging it, or with the arrow keys), and a few words of the plan appear. A part let go
 * too far from its place floats back with a hint. Then the player sweeps pitch over the
 * hull, inside and out, until it shines.
 *
 * Space alone sets each part in place, and spreads the pitch. Gentle mode lets a part
 * snap into place from much farther away.
 */

export const BUILD_HINT: Hint = {
  pointer: 'Drag each part of the ark down to where its outline glows.',
  keys: 'Press Space to set each part in place, or move it with the arrow keys.',
  gesture: 'drag',
}

export const PITCH_HINT: Hint = {
  pointer: 'Sweep across the ark to seal it with pitch, inside and out.',
  keys: 'Press Space to spread the pitch over the ark.',
  gesture: 'sweep',
}

/** Where each part arrives: high above its place. */
const ARRIVE = { x: ARK.x, y: ARK.y - 0.36 }
/** How close a part must be let go to snap into place. */
const SNAP = { normal: 0.07, gentle: 0.2 }
/** How fast the arrow keys move a part, and Space carries it home. */
const MOVE = 0.45
const CARRY = 0.9
/** How long the plan's words show after a part is set. */
const WORDS = 1.8
/** How much pitch each Space press spreads, and a sweep per frame width. */
const DAB = 0.17
const SWEEP = 2.2
/** How long the finished ark shines before the story goes on. */
const SHINE = 1.4

interface BuildState {
  /** The part being placed now (all before it are set). */
  index: number
  part: { x: number; y: number }
  /** The pointer, while dragging: where it went down, and where the part was then. */
  drag: { px: number; py: number; x: number; y: number } | null
  /** Space is carrying the part into place. */
  carrying: boolean
  held: { up: boolean; down: boolean; left: boolean; right: boolean }
  /** The part last let go in the wrong place, for its hint. */
  missed: string | null
  /** Seconds since the last part was set (its words show for a moment). */
  sinceSet: number
  phase: 'build' | 'pitch' | 'done'
  pitch: number
  /** Where the pointer last was, in the pitch, to measure sweeps. */
  last: { x: number; y: number } | null
  clock: number
}

const home = () => ({ x: ARK.x, y: ARK.y })

/** The plan's words for each part, and its hint, made once (the screen keeps showing the same one). */
const WORDS_OF = new Map(ARK_PARTS.map((p) => [p.id, { title: 'God’s plan', text: p.words }]))
const HINT_OF = new Map(ARK_PARTS.map((p) => [p.id, { title: 'Not there', text: p.hint }]))

export const buildTheArk: GameRules<BuildState> = {
  id: 'build-the-ark',
  start: () => ({
    index: 0,
    part: { ...ARRIVE },
    drag: null,
    carrying: false,
    held: { up: false, down: false, left: false, right: false },
    missed: null,
    sinceSet: WORDS,
    phase: 'build',
    pitch: 0,
    last: null,
    clock: 0,
  }),
  step(state, inputs, context, emit) {
    const snap = context.gentle ? SNAP.gentle : SNAP.normal
    let { index, drag, carrying, missed, sinceSet, phase, pitch, last, clock } = state
    const part = { ...state.part }
    const held = { ...state.held }
    const distance = () => Math.hypot(part.x - ARK.x, part.y - ARK.y)

    const set = () => {
      Object.assign(part, home())
      index += 1
      sinceSet = 0
      missed = null
      drag = null
      carrying = false
      if (index < ARK_PARTS.length) {
        Object.assign(part, ARRIVE)
        emit(actor('ark-plan', { pose: ARK_PARTS[index]!.id }, { seconds: 0.3 }))
      } else {
        phase = 'pitch'
        clock = 0
        emit(actor('ark-plan', { pose: 'idle' }, { seconds: 0.3 }))
      }
    }
    /** Let go: into place if it's close enough, or back up with a hint. */
    const letGo = () => {
      drag = null
      if (distance() < snap) set()
      else {
        missed = ARK_PARTS[index]!.id
        Object.assign(part, ARRIVE)
      }
    }

    for (const input of inputs) {
      if (phase === 'build') {
        if (input.kind === 'pointer') {
          if (input.phase === 'down') drag = { px: input.x, py: input.y, x: part.x, y: part.y }
          else if (input.phase === 'move' && drag) {
            part.x = drag.x + (input.x - drag.px)
            part.y = drag.y + (input.y - drag.py)
          } else if (input.phase === 'up' && drag) letGo()
        } else if (input.kind === 'key') {
          if (input.key === 'primary') {
            if (input.down) carrying = true
          } else held[input.key] = input.down
        }
      } else if (phase === 'pitch') {
        if (input.kind === 'pointer') {
          if (input.phase === 'up') last = null
          else {
            // Sweeping over the ark spreads the pitch.
            const over = Math.abs(input.x - ARK.x) < 0.34 && input.y > ARK.y - 0.5 && input.y < ARK.y + 0.02
            if (last && over) pitch = Math.min(1, pitch + Math.hypot(input.x - last.x, input.y - last.y) * SWEEP)
            last = { x: input.x, y: input.y }
          }
        } else if (input.kind === 'key' && input.down) pitch = Math.min(1, pitch + DAB)
      }
    }

    if (phase === 'build') {
      if (carrying) {
        // Space carries the part straight to its place.
        const d = distance()
        const reach = CARRY * STEP
        if (d <= reach) set()
        else {
          part.x += ((ARK.x - part.x) / d) * reach
          part.y += ((ARK.y - part.y) / d) * reach
        }
      } else if (!drag) {
        part.x += ((held.right ? 1 : 0) - (held.left ? 1 : 0)) * MOVE * STEP
        part.y += ((held.down ? 1 : 0) - (held.up ? 1 : 0)) * MOVE * STEP
        // Steered with the keys, it settles into place once it's close.
        if ((held.left || held.right || held.up || held.down) && distance() < snap * 0.6) set()
      }
    } else if (phase === 'pitch' && pitch >= 1) {
      phase = 'done'
      clock = 0
    }
    return { index, part, drag, carrying, held, missed, sinceSet: sinceSet + STEP, phase, pitch, last, clock: clock + STEP }
  },
  view(state) {
    const live: Record<string, number> = {}
    ARK_PARTS.forEach((p, i) => {
      const placing = state.phase === 'build' && i === state.index
      const at = placing ? state.part : home()
      live[`actor:${p.actor}.x`] = at.x
      live[`actor:${p.actor}.y`] = at.y
      live[`actor:${p.actor}.opacity`] = i < state.index || placing ? 1 : 0
    })
    live['actor:ark-plan.opacity'] = state.phase === 'build' ? 0.9 : 0
    live['actor:part-pitch.opacity'] = state.pitch
    // The plan's words for the part just set, for a moment; or the hint for one misplaced.
    const justSet = state.index > 0 && state.sinceSet < WORDS ? ARK_PARTS[state.index - 1]!.id : null
    const message = justSet ? WORDS_OF.get(justSet)! : state.missed ? HINT_OF.get(state.missed)! : null
    return {
      live,
      hint: state.phase === 'build' ? BUILD_HINT : state.phase === 'pitch' ? PITCH_HINT : null,
      message,
      done: state.phase === 'done' && state.clock >= SHINE,
    }
  },
}
