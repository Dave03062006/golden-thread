import { describe, expect, it } from 'vitest'
import { MESSENGERS, WAY, episode4 } from '../../content/levels/15-the-judges/episode-4'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { theWayWeCame } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode4, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof theWayWeCame.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = theWayWeCame.start(ctx)
  for (let t = 0; t < seconds; t += STEP) state = theWayWeCame.step(state, player(state, t), ctx, () => {})
  return { state, view: theWayWeCame.view(state, ctx) }
}

describe('"The way we came"', () => {
  it('traces the way turn by turn, around Edom and Moab, to the Jabbok', () => {
    const { view } = run(false, 40, (s) => [{ kind: 'pointer', phase: 'move', x: WAY[s.next]!.x, y: WAY[s.next]!.y }])
    expect(view.live[`actor:${MESSENGERS}.x`]).toBe(WAY.at(-1)!.x)
    expect(view.done).toBe(true)
  })

  it('plays through its episode, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode4, { gentle, player: (runner) => runner.queue({ kind: 'key', key: 'primary', down: true }) })
      expect(comparisons).toHaveLength(episode4.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
