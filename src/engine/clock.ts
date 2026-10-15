/**
 * The master clock. Every moving thing in the game (camera, characters, water, light)
 * moves on this one clock, so everything stays in step and pauses together.
 *
 * It runs once per screen refresh (60 times a second, or 120 on fast screens) and hands
 * each subscriber the real time that passed since the last frame. Movement is computed
 * from that elapsed time, never from a frame count, so speed is the same on every device.
 */

export interface FrameInfo {
  /** Seconds of game time since the last frame. 0 while the game is paused. */
  dt: number
  /** Total game time in seconds. Stops while paused. */
  time: number
  /** Seconds of real time since the last frame, even while paused (for menus). */
  realDt: number
  /** Total real time in seconds since the clock started. */
  realTime: number
}

export type Subscriber = (frame: FrameInfo) => void

/** What the clock needs from the browser. Tests pass fakes instead. */
export interface ClockDeps {
  requestFrame: (callback: (timestampMs: number) => void) => number
  cancelFrame: (id: number) => void
  now: () => number
}

/** One frame's numbers, reported to the performance probe. */
export interface FrameSample {
  /** When the frame started, in milliseconds (the browser's frame timestamp). */
  atMs: number
  /** Milliseconds since the previous frame. */
  intervalMs: number
  workMs: number
}

export interface Clock {
  start(): void
  stop(): void
  pause(): void
  resume(): void
  readonly paused: boolean
  readonly running: boolean
  readonly time: number
  /**
   * Calls `fn` every frame. Scene animations skip paused frames; pass
   * `whilePaused: true` for things that must keep moving, like the pause menu.
   * Returns a function that unsubscribes.
   */
  subscribe(fn: Subscriber, options?: { whilePaused?: boolean }): () => void
  /** Forget the last timestamp, so the next frame doesn't jump (after a hidden tab). */
  resetTiming(): void
  /** Milliseconds our own code spent in the last frame. */
  readonly lastWorkMs: number
  /** Called after every frame with its numbers. Used by the frame meter and perf tests. */
  onFrame: ((sample: FrameSample) => void) | null
  /** Runs one frame at the given timestamp. The loop calls this; tests call it directly. */
  tick(timestampMs: number): void
}

/** A frame longer than this (a hidden tab, a slow moment) counts as this long, so nothing jumps. */
export const MAX_FRAME_SECONDS = 0.1

interface Entry {
  fn: Subscriber
  whilePaused: boolean
}

export function createClock(deps: ClockDeps): Clock {
  let entries: Entry[] = []
  let lastTimestamp: number | null = null
  let frameId: number | null = null
  let paused = false
  let time = 0
  let realTime = 0
  let lastWorkMs = 0

  const loop = (timestamp: number) => {
    clock.tick(timestamp)
    frameId = deps.requestFrame(loop)
  }

  const clock: Clock = {
    get paused() {
      return paused
    },
    get running() {
      return frameId !== null
    },
    get time() {
      return time
    },
    get lastWorkMs() {
      return lastWorkMs
    },
    onFrame: null,

    start() {
      if (frameId !== null) return
      lastTimestamp = null
      frameId = deps.requestFrame(loop)
    },

    stop() {
      if (frameId === null) return
      deps.cancelFrame(frameId)
      frameId = null
    },

    pause() {
      paused = true
    },

    resume() {
      paused = false
    },

    subscribe(fn, options) {
      const entry: Entry = { fn, whilePaused: options?.whilePaused ?? false }
      entries = [...entries, entry]
      return () => {
        entries = entries.filter((e) => e !== entry)
      }
    },

    resetTiming() {
      lastTimestamp = null
    },

    tick(timestamp) {
      const intervalMs = lastTimestamp === null ? 0 : timestamp - lastTimestamp
      const realDt = Math.min(Math.max(intervalMs / 1000, 0), MAX_FRAME_SECONDS)
      lastTimestamp = timestamp
      const dt = paused ? 0 : realDt
      time += dt
      realTime += realDt

      const frame: FrameInfo = { dt, time, realDt, realTime }
      const workStart = deps.now()
      // Subscribing and unsubscribing replace the list instead of changing it, so a
      // subscriber may safely unsubscribe itself during this loop.
      for (const entry of entries) {
        if (paused && !entry.whilePaused) continue
        entry.fn(frame)
      }
      lastWorkMs = deps.now() - workStart
      clock.onFrame?.({ atMs: timestamp, intervalMs, workMs: lastWorkMs })
    },
  }

  return clock
}

/**
 * The one clock the game uses. It pauses its timing while the browser tab is hidden,
 * so coming back never makes things leap forward.
 */
export const gameClock: Clock =
  typeof window === 'undefined'
    ? createClock({ requestFrame: () => 0, cancelFrame: () => {}, now: () => 0 })
    : createClock({
        requestFrame: (cb) => window.requestAnimationFrame(cb),
        cancelFrame: (id) => window.cancelAnimationFrame(id),
        now: () => performance.now(),
      })

if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') gameClock.resetTiming()
  })
}
