import { describe, expect, it } from 'vitest'
import { COMERS, COMERS_Y, episode6 } from '../../content/levels/05-joseph-and-his-brothers/episode-6'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { comeNear } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode6, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof comeNear.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = comeNear.start(ctx)
  const cues: { target: string; to: { pose?: string } }[] = []
  for (let t = 0; t < seconds; t += STEP) state = comeNear.step(state, player(state, t), ctx, (c) => cues.push(c))
  return { state, view: comeNear.view(state, ctx), cues }
}

const space: GameInput = { kind: 'key', key: 'primary', down: true }
const everySecond = (_: State, t: number) => (Math.floor(t) !== Math.floor(t - STEP) ? [space] : [])
const steps = COMERS.reduce((a, c) => a + c.steps, 0)

describe('"Come near to me"', () => {
  it('brings each brother near, one step at a time, until all stand close', () => {
    const { view, cues } = run(false, steps + 4, everySecond)
    COMERS.forEach((c) => expect(view.live[`actor:${c.id}.x`]).toBeCloseTo(c.to))
    expect(cues.filter((c) => c.to.pose === 'walk')).toHaveLength(steps)
    expect(view.done).toBe(true)
  })

  it('helps the brother tapped, and only by a step', () => {
    const simeon = COMERS.findIndex((c) => c.id === 'simeon')
    const { state, cues } = run(false, 2, (_, t) => (t < STEP ? [{ kind: 'pointer', phase: 'down', x: COMERS[simeon]!.from, y: COMERS_Y - 0.1 }] : []))
    expect(state.comers[simeon]!.taken).toBe(1)
    expect(state.comers[simeon]!.x).toBeLessThan(COMERS[simeon]!.to)
    // Still bowed: he has another step to come.
    expect(cues.at(-1)?.to.pose).toBe('kneel')
  })

  it('waits for the player, and in gentle mode they come near on their own', () => {
    expect(run(false, 4).state.comers.every((c) => c.taken === 0)).toBe(true)
    expect(run(true, steps * 1.2 + 4).view.done).toBe(true)
  })

  it('plays through Episode 6, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode6, { gentle, player: (runner) => runner.queue(space) })
      expect(comparisons).toHaveLength(episode6.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
