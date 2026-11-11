import { STEP, type GameInput, type GameRules, type GameView, type Hint } from './framework'

/**
 * A play of aiming (spec §13.7, kind 4): a marker swings back and forth, and the player lets go
 * when it is on the target. Too early or too late, and it simply swings again; nothing is lost.
 * In gentle mode the target is wider and the marker slower. Level 18 aims David's sling and
 * Jonathan's arrow this way.
 */

export interface AimAt {
  id: string
  /** The actor that swings, between `from` and `to` across the frame, and where the target is. */
  marker: string
  from: number
  to: number
  target: number
  /** How near the target counts as a hit; how long one swing takes (each, and in gentle mode). */
  zone: number
  gentleZone: number
  period: number
  gentlePeriod: number
  hint: Hint
  /** What shows while aiming, after a miss, and after the hit. */
  waiting: { title: string; text: string }
  missed: { title: string; text: string }
  hit: { title: string; text: string }
  /** What else the scene shows after the hit, `t` of the way through it (0 to 1). */
  after?: (t: number) => Record<string, number>
}

/** How long a miss shows; how long the hit takes to play out; how long the end shows. */
const MISS = 1.2
const FOLLOW = 1
const SHOW = 2.4

interface AimState {
  time: number
  missAt: number
  hitAt: number
}

export function aimAt(config: AimAt): GameRules<AimState> {
  const position = (time: number, gentle: boolean) => {
    const period = gentle ? config.gentlePeriod : config.period
    return config.from + (config.to - config.from) * (0.5 - 0.5 * Math.cos((2 * Math.PI * time) / period))
  }
  return {
    id: config.id,
    start: () => ({ time: 0, missAt: -Infinity, hitAt: -1 }),
    step(state, inputs: readonly GameInput[], context) {
      const time = state.time + STEP
      if (state.hitAt >= 0) return { ...state, time }
      let { missAt, hitAt } = state
      for (const input of inputs) {
        const tap = (input.kind === 'key' && input.key === 'primary' && input.down) || (input.kind === 'pointer' && input.phase === 'down')
        if (!tap) continue
        if (Math.abs(position(time, context.gentle) - config.target) < (context.gentle ? config.gentleZone : config.zone)) {
          hitAt = time
          break
        }
        missAt = time
      }
      return { time, missAt, hitAt }
    },
    view(state, context): GameView {
      const hit = state.hitAt >= 0
      const t = hit ? Math.min(1, (state.time - state.hitAt) / FOLLOW) : 0
      const live: Record<string, number> = { [`actor:${config.marker}.x`]: hit ? config.target : position(state.time, context.gentle), ...(config.after?.(t) ?? {}) }
      const message = hit ? config.hit : state.time - state.missAt < MISS ? config.missed : config.waiting
      return { live, hint: hit ? null : config.hint, message, done: hit && state.time - state.hitAt >= FOLLOW + SHOW }
    },
  }
}
