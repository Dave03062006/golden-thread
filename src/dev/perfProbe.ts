import { gameClock, type FrameSample } from '../engine/clock'

export interface PerfProbe {
  samples: FrameSample[]
  reset(): void
}

declare global {
  interface Window {
    __goldenThreadPerf?: PerfProbe
  }
}

/**
 * Records every frame's timing so the performance script (scripts/perf.mjs) can read
 * them. Only switched on by `?perf` in the address.
 */
export function installPerfProbe() {
  const probe: PerfProbe = {
    samples: [],
    reset() {
      probe.samples = []
    },
  }
  const previous = gameClock.onFrame
  gameClock.onFrame = (sample) => {
    previous?.(sample)
    probe.samples.push(sample)
  }
  window.__goldenThreadPerf = probe
}
