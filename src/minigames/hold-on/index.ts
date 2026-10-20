import { SUN } from '../../content/levels/04-isaac-and-jacob/episode-6'
import { lerp } from '../../engine/motion'
import { actor } from '../../scene/build'
import { STEP, type GameInput, type GameRules, type GameView, type Hint } from '../framework'

/**
 * Hold on (Level 4 script, Episode 6): timing, in the dark. Jacob and the stranger, locked
 * together, two shadows against the stars. The player holds on, and every moment held, the
 * night moves on: the sun climbs toward the edge of the hills. Now and then the stranger pulls away, and
 * a ring of light around their hands closes: a press just as it closes keeps the grip. If it
 * closes first, Jacob's grip slips for a moment, but letting go never ends the game: he
 * simply catches hold again. When the day breaks, the stranger says, "Let me go."
 *
 * Hold the pointer down (or hold Space), and press again as the ring closes. In gentle mode
 * a hold is enough: the grip never slips.
 */

export const HINT: Hint = {
  pointer: 'Hold on through the night. When the ring of light closes around their hands, tap to keep your grip.',
  keys: 'Or hold Space, and press it again as the ring closes.',
  gesture: 'hold',
}

/** How long the night lasts while held, in seconds. */
const NIGHT = 18
/** When the stranger pulls away, in seconds of night held; how long the ring takes to close; how late a press still keeps the grip. */
const PULLS = [3, 7.5, 11.5, 15]
const CLOSING = 1.6
const IN_TIME = 0.5
/** How long a slip lasts before Jacob catches hold again, and how long daybreak shows. */
const SLIP = 1.2
const SHOW = 2.4

interface HoldState {
  time: number
  /** Seconds of night held. */
  held: number
  holding: boolean
  /** The pull under way: which one, and how far the ring has closed (0 to 1). */
  pull: number
  closed: number
  /** When the grip was last kept, and when it last slipped. */
  keptAt: number
  slipAt: number
  doneAt: number
}

const DAY = { title: 'The day is breaking', text: '“I will not let you go, unless you bless me.”' }
const KEPT = { title: 'Holding on', text: 'Jacob kept his grip.' }
const SLIPPED = { title: 'His grip slipped', text: 'But he catches hold again.' }
/** How long those words show. */
const WORDS = 1.2

const pressed = (inputs: readonly GameInput[]) => inputs.some((i) => (i.kind === 'pointer' && i.phase === 'down') || (i.kind === 'key' && i.key === 'primary' && i.down))

export const holdOn: GameRules<HoldState> = {
  id: 'hold-on',
  start: () => ({ time: 0, held: 0, holding: false, pull: -1, closed: 0, keptAt: -Infinity, slipAt: -Infinity, doneAt: -1 }),
  step(state, inputs, context, emit) {
    const time = state.time + STEP
    if (state.doneAt >= 0) return { ...state, time }
    let { held, holding, pull, closed, keptAt, slipAt, doneAt } = state
    const press = pressed(inputs)
    // In the order they came: a release and a fresh press leave Jacob holding.
    for (const input of inputs) {
      if (input.kind === 'pointer' && input.phase !== 'move') holding = input.phase === 'down'
      else if (input.kind === 'key' && input.key === 'primary') holding = input.down
    }
    const slipping = time - slipAt < SLIP

    if (pull >= 0) {
      // The ring closes; a press in time keeps the grip.
      closed = Math.min(1, closed + STEP / CLOSING)
      if (context.gentle || (press && closed >= 1 - IN_TIME / CLOSING)) {
        pull = -1
        closed = 0
        keptAt = time
        emit(actor('wrestlers', { pose: 'hold' }, { seconds: 0.4 }))
      } else if (closed >= 1) {
        pull = -1
        closed = 0
        slipAt = time
        emit(actor('wrestlers', { pose: 'slip' }, { seconds: 0.3 }))
      }
    } else if (holding && !slipping) {
      held = Math.min(NIGHT, held + STEP)
      const next = PULLS.findIndex((at) => state.held < at && held >= at)
      if (next >= 0) {
        pull = next
        closed = 0
        emit(actor('wrestlers', { pose: 'pull' }, { seconds: 0.4 }))
      }
    }
    // After a slip, Jacob catches hold again.
    if (state.slipAt === slipAt && slipAt > -Infinity && time - slipAt >= SLIP && state.time - slipAt < SLIP) emit(actor('wrestlers', { pose: 'hold' }, { seconds: 0.4 }))
    if (held >= NIGHT && pull < 0) doneAt = time
    return { time, held, holding, pull, closed, keptAt, slipAt, doneAt }
  },
  view(state): GameView {
    const night = state.held / NIGHT
    const live: Record<string, number> = {
      'actor:sun.y': lerp(SUN.from, SUN.to, night),
      'actor:sun.opacity': Math.min(1, night * 4),
      'actor:grip.opacity': state.pull >= 0 ? 0.85 : 0,
      'actor:grip.size': 0.12 - 0.08 * state.closed,
    }
    const finished = state.doneAt >= 0
    const words = state.time - state.keptAt < WORDS ? KEPT : state.time - state.slipAt < WORDS ? SLIPPED : null
    return { live, hint: finished ? null : HINT, message: finished ? DAY : words, done: finished && state.time - state.doneAt >= SHOW }
  },
}
