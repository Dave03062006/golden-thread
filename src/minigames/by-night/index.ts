import { NIGHT } from '../../content/levels/03-abraham-father-of-faith/episode-3'
import { STEP, type GameRules, type GameView, type Hint } from '../framework'

/**
 * By night (Level 3 script, Episode 3): stealth and timing. Abram's men close in on the
 * sleeping camp from two sides, carrying torches. The player moves each band from cover
 * to cover, but only while the camp's watchman is looking the other way. A band sent on
 * while he looks toward it stays where it is, and a word says to wait. When both bands
 * are in place around the camp, the torches flare at once and the captives are freed. No
 * fighting is shown: only torches, and the captives running to Abram.
 *
 * Tap the left or right side (or press the left or right arrow) to move that band on;
 * Space moves the band the watchman isn't looking at: the one-button way. In gentle mode
 * the watchman turns slowly, and a band asked to move waits safely until it can.
 */

export const HINT: Hint = {
  pointer: 'Move each band of torches toward the camp, but only while the watchman looks the other way: tap its side.',
  keys: 'Or use the left and right arrows, or press Space to move the band he isn’t watching.',
  gesture: 'tap',
}

type Side = 'left' | 'right'

/** How long the watchman looks one way before turning, and how long a move from cover to cover takes. */
const LOOK = { normal: 2.4, gentle: 3.8 }
const MOVE = 1.1
/** How long a word shows, and how long the flare lasts before the story goes on. */
const WORDS = 2
const FLARE = 2.6

interface Band {
  /** The cover it's at (or leaving), and how far along to the next it has come. */
  at: number
  moving: number
  /** Gentle mode: asked to move, it waits for the watchman to look away. */
  waiting: boolean
}

interface NightState {
  time: number
  bands: Band[]
  spottedAt: number
  doneAt: number
}

const WAIT = { title: 'He’s looking this way', text: 'Wait until the watchman turns away.' }
const FREED = { title: 'The captives are freed!', text: 'The torches flare all around the camp, and the captives run to Abram.' }

/** Which way the watchman is looking at a moment. */
export const lookingAt = (time: number, gentle: boolean): Side => (Math.floor(time / (gentle ? LOOK.gentle : LOOK.normal)) % 2 === 0 ? 'left' : 'right')

const last = (i: number) => NIGHT.bands[i]!.path.length - 1

export const byNight: GameRules<NightState> = {
  id: 'by-night',
  start: () => ({ time: 0, bands: NIGHT.bands.map(() => ({ at: 0, moving: -1, waiting: false })), spottedAt: -Infinity, doneAt: -1 }),
  step(state, inputs, context) {
    const time = state.time + STEP
    if (state.doneAt >= 0) return { ...state, time }
    const bands = state.bands.map((b) => ({ ...b }))
    let { spottedAt, doneAt } = state
    const watched = lookingAt(time, context.gentle)

    /** Asks a band to move on to its next cover. */
    const ask = (i: number) => {
      const b = bands[i]!
      if (b.moving >= 0 || b.at >= last(i)) return
      if (NIGHT.bands[i]!.side === watched) {
        if (context.gentle) b.waiting = true
        else spottedAt = time
        return
      }
      b.moving = 0
      b.waiting = false
    }

    for (const input of inputs) {
      if (input.kind === 'pointer' && input.phase === 'down') ask(input.x < 0.5 ? 0 : 1)
      else if (input.kind === 'key' && input.down) {
        if (input.key === 'left') ask(0)
        else if (input.key === 'right') ask(1)
        else if (input.key === 'primary') {
          // The band the watchman isn't looking at, if it still has a way to go; otherwise the other.
          const safe = NIGHT.bands.findIndex((b) => b.side !== watched)
          ask(bands[safe]!.at < last(safe) ? safe : 1 - safe)
        }
      }
    }

    bands.forEach((b, i) => {
      if (b.waiting && NIGHT.bands[i]!.side !== watched) {
        b.waiting = false
        b.moving = 0
      }
      if (b.moving >= 0) {
        b.moving += STEP / MOVE
        if (b.moving >= 1) {
          b.at++
          b.moving = -1
        }
      }
    })
    if (bands.every((b, i) => b.at >= last(i))) doneAt = time
    return { time, bands, spottedAt, doneAt }
  },
  view(state, context): GameView {
    const live: Record<string, number> = {}
    state.bands.forEach((b, i) => {
      const path = NIGHT.bands[i]!.path
      const from = path[b.at]!
      const to = path[Math.min(b.at + 1, path.length - 1)]!
      const t = b.moving >= 0 ? b.moving : 0
      live[`actor:${NIGHT.bands[i]!.id}.x`] = from.x + (to.x - from.x) * t
      live[`actor:${NIGHT.bands[i]!.id}.y`] = from.y + (to.y - from.y) * t
    })
    live['actor:watchman.facing'] = state.doneAt >= 0 ? 1 : lookingAt(state.time, context.gentle) === 'left' ? -1 : 1
    const finished = state.doneAt >= 0
    return {
      live,
      hint: finished ? null : HINT,
      message: finished ? FREED : state.time - state.spottedAt < WORDS ? WAIT : null,
      done: finished && state.time - state.doneAt >= FLARE,
    }
  },
}
