import { SIGNS, WELL_AT } from '../../content/levels/03-abraham-father-of-faith/episode-5'
import { STEP, type GameRules, type GameView, type Hint } from '../framework'

/**
 * The well (Level 3 script, Episode 5): searching, with light and reveal. The wilderness
 * shimmers in the heat. Where the player sweeps, the haze clears a little, and the signs
 * of water appear one after another (a green shoot, another, a bird come down to drink),
 * each leading on to the next, until the well itself appears: "God opened her eyes."
 *
 * Sweeping over the next sign reveals it; Space reveals the next sign: the one-button way.
 * In gentle mode the next sign glows, and a sweep anywhere clears the haze.
 */

export const HINT: Hint = {
  pointer: 'Sweep across the desert to clear the haze, and follow the signs of water.',
  keys: 'Or press Space to find the next sign.',
  gesture: 'sweep',
}

/** How close a sweep must pass to a sign, how much sweeping reveals one, and how long Space takes. */
const NEAR = 0.13
const SWEEP_TO_REVEAL = 0.5
const SPACE_SECONDS = 0.9
/** How long the well shows before the story goes on. */
const SHOW = 2.2

interface WellState {
  time: number
  /** How far each sign (and, last, the well) is revealed, from 0 to 1. */
  revealed: number[]
  /** Space asked for the next sign. */
  auto: boolean
  last: { x: number; y: number } | null
  foundAt: number
}

const TARGETS = [...SIGNS.map((s) => s.at), WELL_AT]
const FOUND = { title: 'A well of water', text: 'God opened her eyes, and she saw a well of water.' }

export const theWell: GameRules<WellState> = {
  id: 'the-well',
  start: () => ({ time: 0, revealed: TARGETS.map(() => 0), auto: false, last: null, foundAt: -1 }),
  step(state, inputs, context) {
    const time = state.time + STEP
    if (state.foundAt >= 0) return { ...state, time }
    const revealed = [...state.revealed]
    let { auto, last } = state
    const next = revealed.findIndex((r) => r < 1)
    const target = TARGETS[next]!
    for (const input of inputs) {
      if (input.kind === 'key' && input.down && input.key === 'primary') auto = true
      else if (input.kind === 'pointer') {
        if (input.phase === 'up') last = null
        else {
          if (last) {
            const moved = Math.hypot(input.x - last.x, input.y - last.y)
            const close = Math.hypot(input.x - target.x, input.y - target.y) < NEAR
            if (close || context.gentle) revealed[next] = Math.min(1, revealed[next]! + moved / SWEEP_TO_REVEAL)
          }
          last = { x: input.x, y: input.y }
        }
      }
    }
    if (auto) {
      revealed[next] = Math.min(1, revealed[next]! + STEP / SPACE_SECONDS)
      if (revealed[next]! >= 1) auto = false
    }
    const foundAt = revealed.every((r) => r >= 1) ? time : -1
    return { time, revealed, auto, last, foundAt }
  },
  view(state, context): GameView {
    const live: Record<string, number> = {}
    SIGNS.forEach((s, i) => (live[`actor:${s.id}.opacity`] = state.revealed[i]!))
    live['actor:well.opacity'] = state.revealed.at(-1)!
    // The haze thins as the signs are found, and is gone when the well appears.
    const progress = state.revealed.reduce((a, b) => a + b, 0) / state.revealed.length
    live['layer:heat-haze.opacity'] = Math.max(0, 1 - progress)
    // In gentle mode, the next sign glows.
    const next = state.revealed.findIndex((r) => r < 1)
    const glowAt = TARGETS[next < 0 ? SIGNS.length - 1 : Math.min(next, SIGNS.length - 1)]!
    live['actor:sign-glow.x'] = glowAt.x
    live['actor:sign-glow.y'] = glowAt.y
    live['actor:sign-glow.opacity'] = context.gentle && next >= 0 ? 0.7 + 0.2 * Math.sin(state.time * Math.PI * 2 * 0.8) : 0
    const finished = state.foundAt >= 0
    return { live, hint: finished ? null : HINT, message: finished ? FOUND : null, done: finished && state.time - state.foundAt >= SHOW }
  },
}
