import { describe, expect, it } from 'vitest'
import { COURAGE, JOSHUA, MOSES, TRIBES, episode3 } from '../../content/levels/13-moses-last-words/episode-3'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { HOLD, beStrong } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode3, 2)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof beStrong.start>
const hold: GameInput = { kind: 'key', key: 'primary', down: true }

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = beStrong.start(ctx)
  const emitted: string[] = []
  for (let t = 0; t < seconds; t += STEP) state = beStrong.step(state, player(state, t), ctx, (cue) => emitted.push(`${cue.target} ${cue.to.pose}`))
  return { state, emitted, view: beStrong.view(state, ctx) }
}

describe('"Be strong and of good courage"', () => {
  it('passes the light to Joshua while Moses’ hands rest on him, with all of Moses’ words', () => {
    const { state, emitted, view } = run(false, HOLD.normal + 0.2, () => [hold])
    expect(state.passedAt).toBeGreaterThan(0)
    expect(emitted).toEqual([`actor:${MOSES.id} idle`, `actor:${JOSHUA.id} idle`])
    expect(view.live[`actor:${JOSHUA.glow}.opacity`]).toBeCloseTo(0.85)
    expect(view.message?.text).toBe(COURAGE.join(' '))
  })

  it('waits when the hands are lifted, and goes on when they rest again', () => {
    const half = run(false, HOLD.normal, (_, t) => (t < HOLD.normal / 2 ? [hold] : [{ kind: 'key', key: 'primary', down: false }]))
    expect(half.state.passedAt).toBe(-1)
    expect(half.state.held).toBeCloseTo(HOLD.normal / 2, 1)
  })

  it('then brings each tribe tapped to follow Joshua', () => {
    const { view } = run(false, HOLD.normal + TRIBES.length * 1.5 + 4, (s, t) => (s.passedAt < 0 ? [hold] : Math.floor(t / 1.5) !== Math.floor((t - STEP) / 1.5) && s.came < TRIBES.length ? [{ kind: 'pointer', phase: 'down', x: TRIBES[s.came]!.x, y: 0.75 }] : []))
    for (const t of TRIBES) expect(view.live[`actor:${t.id}.x`]).toBeCloseTo(t.to)
    expect(view.done).toBe(true)
  })

  it('in gentle mode, needs only a short hold, and the tribes come by themselves', () => {
    const { view } = run(true, HOLD.gentle + TRIBES.length * 1.3 + 4, (_, t) => (t < HOLD.gentle + 0.1 ? [hold] : []))
    expect(view.done).toBe(true)
  })

  it('plays through Episode 3, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode3, { gentle, player: (runner) => runner.queue(hold) })
      expect(comparisons).toHaveLength(episode3.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
