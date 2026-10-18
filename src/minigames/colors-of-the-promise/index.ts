import { PROMISE, RAINBOW, onBand } from '../../content/levels/02-noah-and-the-nations/episode-5'
import { STEP, type GameRules, type GameView, type Hint } from '../framework'

/**
 * Colors of the promise (Level 2 script, Episode 5): the light-and-reveal kind of play.
 * After the rain, the player draws the rainbow across the sky one band at a time, from
 * red to violet, by sweeping along its arc; a light runs along the band under their hand.
 * Each band, as it's drawn, lights up a few more words of God's promise, until all seven
 * shine and the promise reads complete.
 *
 * Space draws the next band by itself: the one-button way. In gentle mode, moving the
 * pointer anywhere across the sky draws the band.
 */

export const HINT: Hint = {
  pointer: 'Draw the rainbow: sweep along its arc, one color at a time.',
  keys: 'Or press Space to draw each color.',
  gesture: 'sweep',
}

const BANDS = RAINBOW.bands.length
/** How long Space takes to draw a band, how close to a band the pointer must sweep (in frame pixels), and how far a sweep may jump. */
const AUTO_SECONDS = 0.9
const NEAR = 80
const JUMP = 0.2
/** After a band is drawn, a moment before the next one takes the pointer's sweep. */
const PAUSE = 0.4
/** Gentle mode: how far across the sky (in frame pixels) the pointer moves to draw a whole band. */
const GENTLE_SWEEP = 1300
/** How long the whole promise shows before the play ends. */
const FINISH = 3

interface PromiseState {
  time: number
  /** The band being drawn (all seven drawn: 7), and how much of it, as the stretch of its arc covered. */
  band: number
  lo: number
  hi: number
  /** Bands Space has asked to draw. */
  queued: number
  pointer: { x: number; y: number } | null
  /** Where along the band the light is. */
  at: number
  finishedAt: number
  /** When the last band was drawn. */
  drawnAt: number
}

const covered = (s: PromiseState) => (s.lo < 0 ? 0 : Math.min(1, (s.hi - s.lo) / 0.95))

/** Where a frame point lies along a band's arc (0 left, 1 right), and how far it is from the band, in frame pixels. */
function along(band: number, x: number, y: number) {
  const dx = x * 1600 - RAINBOW.x * 1600
  const dy = RAINBOW.y * 900 - y * 900
  return { at: 1 - Math.atan2(Math.max(0, dy), dx) / Math.PI, off: Math.abs(Math.hypot(dx, dy) - RAINBOW.bands[band]!), below: dy < 0 }
}

// Shown low, so the rainbow above stays in view.
const messages = PROMISE.map((_, n) => ({ title: 'God’s promise', text: PROMISE.slice(0, n + 1).join(' '), low: true }))

export const colorsOfThePromise: GameRules<PromiseState> = {
  id: 'colors-of-the-promise',
  start: () => ({ time: 0, band: 0, lo: -1, hi: -1, queued: 0, pointer: null, at: 0, finishedAt: -1, drawnAt: -Infinity }),
  step(state, inputs, context) {
    const time = state.time + STEP
    let { band, lo, hi, queued, pointer, at, finishedAt } = state
    if (band >= BANDS) return { ...state, time }

    // A sweep along the arc covers a stretch of it; a touch away from that stretch starts a new one.
    const resting = time - state.drawnAt < PAUSE
    const mark = (q: number) => {
      if (resting) return
      if (lo >= 0 && q >= lo - JUMP && q <= hi + JUMP) {
        lo = Math.min(lo, q)
        hi = Math.max(hi, q)
      } else {
        lo = q
        hi = q
      }
      at = q
    }
    for (const input of inputs) {
      if (input.kind === 'key' && input.key === 'primary' && input.down) queued++
      else if (input.kind === 'pointer') {
        if (input.phase === 'up') pointer = null
        else if (input.phase === 'down' || pointer) {
          const from = pointer
          pointer = { x: input.x, y: input.y }
          if (context.gentle) {
            // Any sweep across the sky draws the band, from its left end on.
            if (from && input.y < RAINBOW.y && !resting) {
              if (lo < 0) lo = hi = 0
              hi = Math.min(1, hi + (Math.abs(input.x - from.x) * 1600) / GENTLE_SWEEP)
              at = hi
            }
          } else {
            const p = along(band, input.x, input.y)
            if (!p.below && p.off < NEAR) mark(p.at)
          }
        }
      }
    }
    // Space: the band draws itself, left to right.
    if (queued > 0) {
      if (lo < 0) lo = hi = 0
      hi = Math.min(1, hi + STEP / AUTO_SECONDS)
      lo = Math.min(lo, 0)
      at = hi
    }

    const next = { ...state, time, band, lo, hi, queued, pointer, at, finishedAt }
    if (covered(next) >= 1) {
      next.band = band + 1
      next.lo = -1
      next.hi = -1
      next.queued = Math.max(0, queued - 1)
      next.at = 0
      next.drawnAt = time
      if (next.band >= BANDS) next.finishedAt = time
    }
    return next
  },
  view(state): GameView {
    const live: Record<string, number> = {}
    for (let i = 0; i < BANDS; i++) live[`layer:rainbow-${i + 1}.opacity`] = i < state.band ? 1 : i === state.band ? covered(state) : 0
    // The light: running along the band being drawn, or waiting softly at the start of the next one.
    const drawing = state.lo >= 0
    const band = Math.min(state.band, BANDS - 1)
    const light = onBand(band, drawing ? state.at : 0)
    live['actor:brush.x'] = light.x
    live['actor:brush.y'] = light.y
    live['actor:brush.opacity'] = state.band >= BANDS ? 0 : drawing ? 0.95 : 0.45 + 0.25 * Math.sin(state.time * Math.PI * 2 * 0.8)
    const finished = state.band >= BANDS
    return {
      live,
      hint: finished ? null : HINT,
      message: state.band > 0 ? messages[state.band - 1]! : null,
      done: finished && state.time - state.finishedAt >= FINISH,
    }
  },
}
