import { describe, expect, it } from 'vitest'
import { RAIDERS, WAY, episode5 } from '../../content/levels/18-david-the-shepherd-king/episode-5'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { throughTheSleepingCamp } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode5, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof throughTheSleepingCamp.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = throughTheSleepingCamp.start(ctx)
  for (let t = 0; t < seconds; t += STEP) state = throughTheSleepingCamp.step(state, player(state, t), ctx, () => {})
  return { state, view: throughTheSleepingCamp.view(state, ctx) }
}

describe('"Through the sleeping camp"', () => {
  it('leads David and Abishai gap by gap to Saul’s spear and jar', () => {
    const { view } = run(false, 20, (s) => [{ kind: 'pointer', phase: 'move', x: WAY[s.next]!.x, y: WAY[s.next]!.y }])
    expect(view.live[`actor:${RAIDERS}.x`]).toBe(WAY.at(-1)!.x)
    expect(view.done).toBe(true)
  })

  it('plays through its episode, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode5, { gentle, player: (runner) => runner.queue({ kind: 'key', key: 'primary', down: true }) })
      expect(comparisons).toHaveLength(episode5.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
