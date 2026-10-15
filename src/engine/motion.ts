/**
 * Motion helpers. Nothing in the game starts or stops abruptly: every movement follows
 * an easing curve (a gentle start and/or finish) or a spring.
 */

export type Easing = (t: number) => number

/** Easing curves. Each takes progress from 0 to 1 and returns the eased progress. */
export const ease = {
  linear: (t: number) => t,
  inOutSine: (t: number) => -(Math.cos(Math.PI * t) - 1) / 2,
  outCubic: (t: number) => 1 - (1 - t) ** 3,
  inOutCubic: (t: number) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2),
  outQuint: (t: number) => 1 - (1 - t) ** 5,
  /** Smooth at both ends, with no sudden change in speed. Good for camera moves. */
  smoother: (t: number) => t * t * t * (t * (t * 6 - 15) + 10),
} satisfies Record<string, Easing>

export type EaseName = keyof typeof ease

/** The shared timings from the design (spec §10, rule 3). */
export const timing = {
  /** Buttons and menus: quick and springy. */
  quick: { seconds: 0.3, ease: 'outCubic' },
  /** Story camera moves: slow and graceful. */
  story: { seconds: 1.8, ease: 'inOutCubic' },
  /** Prayer and other quiet moments: very slow drifts. */
  quiet: { seconds: 4, ease: 'inOutSine' },
  /** Switching art styles mid-scene. */
  styleSwitch: { seconds: 0.6, ease: 'inOutSine' },
} as const satisfies Record<string, { seconds: number; ease: EaseName }>

export function clamp(x: number, min = 0, max = 1): number {
  return Math.min(Math.max(x, min), max)
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

/** How far through a span of time we are, from 0 to 1. */
export function progress(start: number, seconds: number, now: number): number {
  return seconds <= 0 ? 1 : clamp((now - start) / seconds)
}

/** A value at a moment in time. `ease` shapes the movement that arrives at this keyframe. */
export interface Keyframe {
  at: number
  value: number
  ease?: EaseName
}

/**
 * The value of a keyframed track at `time`. Before the first keyframe it holds the first
 * value; after the last, the last value.
 */
export function sampleTrack(track: readonly Keyframe[], time: number): number {
  const first = track[0]
  if (!first) return 0
  if (time <= first.at) return first.value
  for (let i = 1; i < track.length; i++) {
    const to = track[i]!
    if (time <= to.at) {
      const from = track[i - 1]!
      const t = progress(from.at, to.at - from.at, time)
      return lerp(from.value, to.value, ease[to.ease ?? 'inOutSine'](t))
    }
  }
  return track[track.length - 1]!.value
}

/** The total length of a track in seconds. */
export function trackLength(track: readonly Keyframe[]): number {
  return track[track.length - 1]?.at ?? 0
}

/**
 * Plays time back and forth over a span, so a looping camera move glides back
 * instead of snapping to the start.
 */
export function pingPong(time: number, length: number): number {
  if (length <= 0) return 0
  const cycle = time % (length * 2)
  return cycle <= length ? cycle : length * 2 - cycle
}

export interface SpringState {
  value: number
  velocity: number
}

export interface SpringOptions {
  /** How strongly it pulls toward the target. */
  stiffness?: number
  /** How quickly the wobble dies down. */
  damping?: number
}

/**
 * Moves a spring one step toward its target. It is advanced in small fixed steps,
 * so it behaves the same at 60 or 120 frames a second.
 */
export function stepSpring(
  state: SpringState,
  target: number,
  dt: number,
  { stiffness = 170, damping = 26 }: SpringOptions = {},
): SpringState {
  const step = 1 / 240
  let { value, velocity } = state
  let remaining = dt
  while (remaining > 0) {
    const h = Math.min(step, remaining)
    const force = -stiffness * (value - target) - damping * velocity
    velocity += force * h
    value += velocity * h
    remaining -= h
  }
  return { value, velocity }
}
