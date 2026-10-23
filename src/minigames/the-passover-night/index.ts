import { OUTSIDE, STEPS } from '../../content/levels/08-the-plagues-and-the-passover/episode-4'
import { actor } from '../../scene/build'
import { STEP, type GameInput, type GameRules, type GameView, type Hint } from '../framework'

/**
 * The Passover night (Level 8 script, Episode 4): serving and distributing. A family gets
 * ready for the Passover as God told them, step by step. First the father marks the two
 * doorposts and the lintel with the blood; then, inside, the player sets the meal on the
 * table (the roasted lamb, the unleavened bread, the bitter herbs); last, the family gets
 * ready to go: belts tied, sandals on, a staff in each hand. Each thing done glows, until the
 * house is ready and the lamp is lit.
 *
 * Tap the next thing to do (the door, a place at the table, the family), or press Space for
 * the next step. In gentle mode the next thing to do glows.
 */

export const HINT: Hint = {
  pointer: 'Get the family ready for the Passover: tap each thing to do, one after another.',
  keys: 'Or press Space for the next step.',
  gesture: 'tap',
}

/** How close a tap must be, how long the move indoors takes, how long each word and the end show. */
const NEAR = 0.07
const INDOORS = 1.6
const WORDS = 1.8
const SHOW = 2.6

interface PassoverState {
  time: number
  done: number
  doneAt: number
  /** When the family went indoors (the doorposts all marked), or -1. */
  insideAt: number
  readyAt: number
}

const SAID = STEPS.map((s) => ({ title: 'The Passover', text: s.word }))
const READY = { title: 'Ready', text: 'The house is marked, the meal is ready, and the family is ready to go.' }

export const thePassoverNight: GameRules<PassoverState> = {
  id: 'the-passover-night',
  start: () => ({ time: 0, done: 0, doneAt: -Infinity, insideAt: -1, readyAt: -1 }),
  step(state, inputs: readonly GameInput[], _context, emit) {
    const time = state.time + STEP
    if (state.readyAt >= 0) return { ...state, time }
    let { done, doneAt, insideAt, readyAt } = state
    // Between the door and the table, the family goes in.
    const moving = insideAt >= 0 && time - insideAt < INDOORS
    if (!moving && time - doneAt >= 0.4) {
      for (const input of inputs) {
        const next = STEPS[done]!
        const asked = (input.kind === 'key' && input.key === 'primary' && input.down) || (input.kind === 'pointer' && input.phase === 'down' && Math.hypot(input.x - next.x, input.y - next.y) < NEAR)
        if (!asked) continue
        done++
        doneAt = time
        // The father marks the door and serves the meal; then the family is ready.
        emit(actor('father', { pose: done <= OUTSIDE + 3 ? 'carry' : 'idle' }, { seconds: 0.3 }))
        if (done === OUTSIDE) insideAt = time
        if (done === STEPS.length) {
          readyAt = time
          emit(actor('mother', { pose: 'idle' }, { seconds: 0.3 }))
        }
        break
      }
    }
    return { time, done, doneAt, insideAt, readyAt }
  },
  view(state, context): GameView {
    const live: Record<string, number> = {}
    STEPS.forEach((s, i) => {
      if (s.id.startsWith('mark') || s.id.startsWith('dish')) live[`actor:${s.id}.opacity`] = i < state.done ? 1 : 0
    })
    const staffs = state.done === STEPS.length ? 1 : 0
    live['actor:staff-1.opacity'] = staffs
    live['actor:staff-2.opacity'] = staffs
    // Indoors: the table, and the lamp lit when the house is ready.
    const inside = state.insideAt < 0 ? 0 : Math.min(1, (state.time - state.insideAt - WORDS * 0.5) / (INDOORS - WORDS * 0.5))
    const indoors = Math.max(0, inside)
    live['layer:hebrew-quarter.opacity'] = 1 - indoors
    live['layer:house-inside.opacity'] = indoors
    live['actor:mat.opacity'] = indoors
    live['actor:lamp-glow.opacity'] = state.readyAt >= 0 ? Math.min(0.85, (state.time - state.readyAt) * 0.85) : 0
    const next = STEPS[Math.min(state.done, STEPS.length - 1)]!
    live['actor:next-glow.x'] = next.x
    live['actor:next-glow.y'] = next.y
    live['actor:next-glow.opacity'] = context.gentle && state.readyAt < 0 ? 0.6 + 0.2 * Math.sin(state.time * Math.PI * 1.6) : 0
    const finished = state.readyAt >= 0
    const saying = state.done > 0 && state.time - state.doneAt < WORDS
    const message = finished && state.time - state.readyAt >= WORDS * 0.6 ? READY : saying ? SAID[state.done - 1]! : null
    return { live, hint: finished ? null : HINT, message, done: finished && state.time - state.readyAt >= SHOW + WORDS * 0.6 }
  },
}
