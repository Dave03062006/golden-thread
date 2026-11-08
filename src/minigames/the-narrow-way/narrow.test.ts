import { describe, expect, it } from 'vitest'
import { MEETINGS, RIDER, ROAD_Y, episode7 } from '../../content/levels/12-forty-years-in-the-wilderness/episode-7'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { theNarrowWay } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode7, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof theNarrowWay.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = theNarrowWay.start(ctx)
  const titles: string[] = []
  const emitted: string[] = []
  for (let t = 0; t < seconds; t += STEP) {
    state = theNarrowWay.step(state, player(state, t), ctx, (cue) => emitted.push(`${cue.target} ${cue.to.pose}`))
    const title = theNarrowWay.view(state, ctx).message?.title
    if (title && titles.at(-1) !== title) titles.push(title)
  }
  return { state, titles, emitted, view: theNarrowWay.view(state, ctx) }
}

describe('"The narrow way"', () => {
  it('steers the donkey around the angel, into the field and against the wall, and lies down at the narrow place', () => {
    // The player drags to the safe side of each meeting, and taps once she has stopped.
    const { titles, emitted, view } = run(false, 30, (s) => (s.stoppedAt >= 0 ? [{ kind: 'pointer', phase: 'down', x: 0.5, y: ROAD_Y }] : [{ kind: 'pointer', phase: 'move', x: 0.5, y: MEETINGS[s.passed]!.safe }]))
    expect(titles).toEqual(MEETINGS.map((m) => m.title))
    expect(emitted).toEqual([`actor:${RIDER.id} lie`])
    expect(view.live[`actor:${RIDER.id}.x`]).toBeCloseTo(MEETINGS.at(-1)!.x - 0.08)
    expect(view.done).toBe(true)
  })

  it('turns aside by herself if the player does not steer, so nothing goes wrong', () => {
    const { state } = run(false, 13)
    expect(state.passed).toBe(MEETINGS.length - 1)
  })

  it('in gentle mode, lies down by herself at the narrow place', () => {
    expect(run(true, 25).state.layAt).toBeGreaterThan(0)
    expect(run(false, 25).state.layAt).toBe(-1)
  })

  it('plays through Episode 7, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode7, { gentle, player: (runner) => runner.queue({ kind: 'key', key: 'primary', down: true }) })
      expect(comparisons).toHaveLength(episode7.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
