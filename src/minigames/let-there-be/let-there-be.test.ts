import { describe, expect, it } from 'vitest'
import { episode1 } from '../../content/levels/01-creation-and-fall/episode-1'
import { Director } from '../../scene/director'
import type { SceneFrame } from '../../scene/evaluate'
import type { GameInput } from '../framework'
import { GAMES } from '../registry'
import { GameRunner } from '../runner'

/** What a player does in each interaction, in seconds from its start. */
const PLAYER: Record<string, { at: number; input: GameInput }[]> = {
  light: [
    { at: 0.2, input: { kind: 'pointer', phase: 'down', x: 0.3, y: 0.4 } },
    { at: 4, input: { kind: 'pointer', phase: 'up', x: 0.3, y: 0.4 } },
  ],
  firmament: [
    { at: 0.2, input: { kind: 'pointer', phase: 'down', x: 0.5, y: 0.7 } },
    { at: 0.4, input: { kind: 'pointer', phase: 'move', x: 0.5, y: 0.45 } },
    { at: 0.6, input: { kind: 'pointer', phase: 'up', x: 0.5, y: 0.45 } },
  ],
  land: [{ at: 0.2, input: { kind: 'key', key: 'up', down: true } }],
  plants: [
    { at: 0.2, input: { kind: 'pointer', phase: 'down', x: 0.2, y: 0.6 } },
    { at: 0.5, input: { kind: 'pointer', phase: 'down', x: 0.8, y: 0.6 } },
    { at: 0.8, input: { kind: 'key', key: 'primary', down: true } },
  ],
  'sun-and-moon': [
    // Drag the sun across to the day side; set the moon with a key.
    { at: 2, input: { kind: 'pointer', phase: 'down', x: 0.44, y: 0.44 } },
    { at: 2.3, input: { kind: 'pointer', phase: 'move', x: 0.3, y: 0.4 } },
    { at: 2.6, input: { kind: 'pointer', phase: 'move', x: 0.2, y: 0.25 } },
    { at: 2.8, input: { kind: 'pointer', phase: 'up', x: 0.2, y: 0.25 } },
    { at: 3, input: { kind: 'key', key: 'right', down: true } },
  ],
  stars: [
    { at: 0.2, input: { kind: 'key', key: 'right', down: true } },
    { at: 3.6, input: { kind: 'key', key: 'right', down: false } },
  ],
  creatures: [
    { at: 0.2, input: { kind: 'pointer', phase: 'down', x: 0.5, y: 0.6 } },
    { at: 0.4, input: { kind: 'pointer', phase: 'move', x: 0.5, y: 0.75 } },
    { at: 0.5, input: { kind: 'pointer', phase: 'up', x: 0.5, y: 0.75 } },
    { at: 0.7, input: { kind: 'key', key: 'up', down: true } },
  ],
  animals: [0.2, 0.5, 0.8, 1.1].map((at) => ({ at, input: { kind: 'key', key: 'primary', down: true } as GameInput })),
  rest: [
    { at: 3, input: { kind: 'key', key: 'primary', down: true } },
    { at: 12.5, input: { kind: 'key', key: 'primary', down: true } },
  ],
}

/** Frames compared to six decimal places, so rounding differences don't count. */
const rounded = (frame: SceneFrame) => JSON.parse(JSON.stringify(frame, (_key, value: unknown) => (typeof value === 'number' ? Math.round(value * 1e6) / 1e6 : value)))

const FRAME = 1 / 60

describe('"Let there be…"', () => {
  it('has rules for every interaction in Episode 1', () => {
    const games = episode1.scenes.flatMap((s) => s.beats.flatMap((b) => (b.kind === 'play' ? [b.game] : [])))
    expect(games.filter((game) => !GAMES[game])).toEqual([])
  })

  it('plays through every day, leaving the world exactly as a checkpoint rebuilds it', () => {
    const director = new Director(episode1)
    let now = 0
    // At each new scene, the world as played and as rebuilt from that checkpoint, once everything has settled.
    const comparisons: { scene: number; played: unknown; rebuilt: unknown }[] = []
    const reached: number[] = []
    director.subscribe((event) => {
      if (event.type === 'checkpoint' && event.index > 0) reached.push(event.index)
    })
    /** Called once the director has fully entered a new scene. */
    const compare = () => {
      for (const scene of reached.splice(0)) {
        const rebuilt = new Director(episode1, scene)
        rebuilt.start(now)
        comparisons.push({ scene: scene + 1, played: rounded(director.frame(now + 20)), rebuilt: rounded(rebuilt.frame(now + 20)) })
      }
    }
    director.start(now)

    while (!director.ended) {
      const beat = director.beat!
      if (beat.kind !== 'play') {
        now += 0.5
        director.advance(now)
        compare()
        continue
      }
      const runner = new GameRunner(GAMES[beat.game]!, { gentle: false, frame: () => director.frame(now) }, director.timeline, now)
      const script = [...PLAYER[beat.game]!]
      const startedAt = now
      let done = false
      while (!done) {
        now += FRAME
        expect(now - startedAt, `"${beat.game}" should finish`).toBeLessThan(40)
        while (script.length && script[0]!.at <= now - startedAt) runner.queue(script.shift()!.input)
        done = runner.advanceTo(now).done
      }
      director.finishPlay(now)
      compare()
    }
    expect(comparisons).toHaveLength(episode1.scenes.length - 1)
    for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
  })

  it('lets the light ebb if it is let go too early, and grow again when held', () => {
    const director = new Director(episode1, 1)
    director.start(0)
    director.advance(1) // to the light
    let now = 1
    const runner = new GameRunner(GAMES.light!, { gentle: false, frame: () => director.frame(now) }, director.timeline, now)
    runner.queue({ kind: 'pointer', phase: 'down', x: 0.6, y: 0.3 })
    for (; now < 2.5; now += FRAME) runner.advanceTo(now)
    const held = director.timeline.value('actor:light-flood.grow', now)
    runner.queue({ kind: 'pointer', phase: 'up', x: 0.6, y: 0.3 })
    for (; now < 4; now += FRAME) runner.advanceTo(now)
    expect(director.timeline.value('actor:light-flood.grow', now)).toBeLessThan(held)
    expect(director.timeline.value('actor:light-flood.x', now)).toBeCloseTo(0.6)
    expect(runner.view.done).toBe(false)
  })

  it('lets a small lift of the sky sink back', () => {
    const director = new Director(episode1, 2)
    director.start(0)
    director.advance(1)
    let now = 1
    const runner = new GameRunner(GAMES.firmament!, { gentle: false, frame: () => director.frame(now) }, director.timeline, now)
    runner.queue({ kind: 'pointer', phase: 'down', x: 0.5, y: 0.7 })
    runner.queue({ kind: 'pointer', phase: 'move', x: 0.5, y: 0.65 })
    runner.queue({ kind: 'pointer', phase: 'up', x: 0.5, y: 0.65 })
    for (; now < 1.05; now += FRAME) runner.advanceTo(now)
    const lifted = director.timeline.value('layer:firmament.offsetY', now)
    for (; now < 5; now += FRAME) runner.advanceTo(now)
    expect(director.timeline.value('layer:firmament.offsetY', now)).toBeGreaterThan(lifted)
    expect(runner.view.done).toBe(false)
  })

  it('welcomes the animal that was tapped', () => {
    const director = new Director(episode1, 6)
    director.start(0)
    let now = 8 // the animals have arrived at the edges
    director.advance(now)
    const runner = new GameRunner(GAMES.animals!, { gentle: false, frame: () => director.frame(now) }, director.timeline, now)
    // The sheep waits at the right edge.
    runner.queue({ kind: 'pointer', phase: 'down', x: 0.9, y: 0.6 })
    for (const end = now + 4; now < end; now += FRAME) runner.advanceTo(now)
    expect(director.timeline.value('actor:sheep.x', now)).toBeCloseTo(0.56)
    expect(director.timeline.value('actor:lion.x', now)).toBeCloseTo(0.17)
  })
})
