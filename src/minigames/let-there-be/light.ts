import { STEP, type GameRules } from '../framework'
import { HINTS, outCubic, smooth } from './shared'

/**
 * Day one: press and hold anywhere, and light grows from that point until it fills
 * everything. Letting go too early lets it ebb a little, waiting to be called again.
 * Once it's full, letting go settles it.
 */

interface State {
  /** Where the light breaks out, in the frame. */
  x: number
  y: number
  /** From 0 (darkness) to 1 (light everywhere). */
  grow: number
  holding: boolean
  /** Seconds since the light filled everything, or -1. */
  full: number
}

export const light: GameRules<State> = {
  id: 'light',
  start: () => ({ x: 0.5, y: 0.42, grow: 0, holding: false, full: -1 }),
  step(state, inputs, context) {
    let { x, y, grow, holding, full } = state
    for (const input of inputs) {
      if (input.kind === 'pointer') {
        if (input.phase === 'down') {
          holding = true
          // The light breaks out where the player first calls it.
          if (grow < 0.03) {
            x = input.x
            y = input.y
          }
        }
        if (input.phase === 'up') holding = false
      } else if (input.kind === 'key' && input.key === 'primary') {
        holding = input.down
        if (input.down && grow < 0.03) {
          x = 0.5
          y = 0.42
        }
      }
    }
    if (holding || full >= 0) grow = Math.min(1, grow + STEP / (context.gentle ? 2 : 3.2))
    else if (!context.gentle) grow = Math.max(0, grow - STEP / 9)
    if (grow >= 1 && full < 0) full = 0
    if (full >= 0) full += STEP
    return { x, y, grow, holding, full }
  },
  view(state) {
    const { x, y, grow } = state
    return {
      live: {
        'actor:light-flood.x': x,
        'actor:light-flood.y': y,
        'actor:light-flood.grow': grow ** 1.25,
        'actor:light-flood.opacity': grow > 0.001 ? 1 : 0,
        'actor:first-light.x': x,
        'actor:first-light.y': y,
        'actor:first-light.opacity': outCubic(grow * 5),
        'layer:darkness.opacity': 0.94 * (1 - smooth(grow * 1.15)),
        'actor:spirit.opacity': 0.9 * (1 - smooth(grow * 1.6)),
      },
      hint: grow < 0.04 ? HINTS.light : null,
      // Letting go settles it; holding on settles it too, after a moment.
      done: state.full >= 0 && (!state.holding || state.full > 2),
    }
  },
}
