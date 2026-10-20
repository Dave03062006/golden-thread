import { describe, expect, it } from 'vitest'
import { BOWS, COMPANY, JACOB_FROM, MEET, episode7 } from '../../content/levels/04-isaac-and-jacob/episode-7'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { sevenBows } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode7, 0)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof sevenBows.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = sevenBows.start(ctx)
  const cues: { to: { pose?: string } }[] = []
  for (let t = 0; t < seconds; t += STEP) state = sevenBows.step(state, player(state, t), ctx, (c) => cues.push(c))
  return { state, view: sevenBows.view(state, ctx), cues }
}

const space: GameInput = { kind: 'key', key: 'primary', down: true }
const pressEvery = (seconds: number) => (_: State, t: number) => (Math.floor(t / seconds) !== Math.floor((t - STEP) / seconds) ? [space] : [])

describe('"Seven bows"', () => {
  it('steps forward and bows seven times, and Esau’s company draws near', () => {
    const { view, cues } = run(false, 25, pressEvery(2.2))
    expect(cues.filter((c) => c.to.pose === 'kneel')).toHaveLength(BOWS)
    expect(view.live['actor:jacob.x']).toBeCloseTo(MEET)
    expect(view.live['actor:dust.x']).toBeCloseTo(COMPANY.dust.to.x)
    expect(view.live['actor:esaus-men.opacity']).toBeCloseTo(1)
    expect(view.message?.title).toBe('Seven times')
    expect(view.done).toBe(true)
  })

  it('cannot be hurried: presses during a bow do nothing', () => {
    const { state } = run(false, 2.5, (_, t) => (Math.floor(t * 10) !== Math.floor((t - STEP) * 10) ? [space] : []))
    expect(state.bowed).toBe(1)
  })

  it('stands still until asked, and in gentle mode bows on by itself after the first press', () => {
    expect(run(false, 4).view.live['actor:jacob.x']).toBe(JACOB_FROM)
    expect(run(true, 25, (_, t) => (t < STEP ? [space] : [])).view.done).toBe(true)
  })

  it('plays through Episode 7, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode7, { gentle, player: (runner) => runner.queue(space) })
      expect(comparisons).toHaveLength(episode7.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
