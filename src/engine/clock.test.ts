import { describe, expect, it } from 'vitest'
import { MAX_FRAME_SECONDS, createClock, type FrameInfo } from './clock'

function fakeClock() {
  let nowMs = 0
  const clock = createClock({
    requestFrame: () => 1,
    cancelFrame: () => {},
    now: () => nowMs,
  })
  return { clock, setNow: (ms: number) => (nowMs = ms) }
}

describe('clock', () => {
  it('reports elapsed real time between frames', () => {
    const { clock } = fakeClock()
    const frames: FrameInfo[] = []
    clock.subscribe((f) => frames.push(f))
    clock.tick(1000)
    clock.tick(1016)
    clock.tick(1033)
    expect(frames[0]?.dt).toBe(0)
    expect(frames[1]?.dt).toBeCloseTo(0.016)
    expect(frames[2]?.time).toBeCloseTo(0.033)
  })

  it('caps a long gap so nothing jumps', () => {
    const { clock } = fakeClock()
    let last: FrameInfo | undefined
    clock.subscribe((f) => (last = f))
    clock.tick(0)
    clock.tick(5000)
    expect(last?.dt).toBe(MAX_FRAME_SECONDS)
  })

  it('stops game time while paused but keeps menus moving', () => {
    const { clock } = fakeClock()
    let sceneFrames = 0
    let menuFrames = 0
    clock.subscribe(() => sceneFrames++)
    clock.subscribe(() => menuFrames++, { whilePaused: true })
    clock.tick(0)
    clock.pause()
    clock.tick(16)
    clock.tick(32)
    expect(sceneFrames).toBe(1)
    expect(menuFrames).toBe(3)
    expect(clock.time).toBe(0)
    clock.resume()
    clock.tick(48)
    expect(clock.time).toBeCloseTo(0.016)
  })

  it('does not jump after timing is reset', () => {
    const { clock } = fakeClock()
    clock.tick(0)
    clock.tick(16)
    clock.resetTiming()
    clock.tick(9000)
    expect(clock.time).toBeCloseTo(0.016)
  })

  it('lets a subscriber unsubscribe', () => {
    const { clock } = fakeClock()
    let calls = 0
    const off = clock.subscribe(() => calls++)
    clock.tick(0)
    off()
    clock.tick(16)
    expect(calls).toBe(1)
  })

  it('measures the work done in a frame', () => {
    const { clock, setNow } = fakeClock()
    clock.subscribe(() => setNow(5))
    const samples: number[] = []
    clock.onFrame = (s) => samples.push(s.workMs)
    setNow(0)
    clock.tick(0)
    expect(samples[0]).toBe(5)
  })
})
