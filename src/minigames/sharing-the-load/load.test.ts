import { describe, expect, it } from 'vitest'
import { CASES, LEADERS, LINE, episode7 } from '../../content/levels/09-through-the-sea/episode-7'
import { Director } from '../../scene/director'
import { STEP, type GameContext } from '../framework'
import { playThrough } from '../playthrough'
import { SHOW, sharingTheLoad } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode7, 2)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

const right = (n: number) => (CASES[n]!.great ? 'moses' : 'leaders')

describe('"Sharing the load"', () => {
  it('sends each person to the right one, and the line grows shorter until it is gone', () => {
    const ctx = context(false)
    let state = sharingTheLoad.start(ctx)
    const answer = (n: number) => {
      for (let t = 0; t < SHOW + 0.1; t += STEP) state = sharingTheLoad.step(state, t < STEP ? [{ kind: 'choose', option: right(n) }] : [], ctx, () => {})
    }
    // Halfway, the front of the line is gone and the back still waits.
    for (let n = 0; n < CASES.length / 2; n++) answer(n)
    const halfway = sharingTheLoad.view(state, ctx).live
    expect(halfway[`actor:${LINE[0]}.opacity`]).toBe(0)
    expect(halfway[`actor:${LINE.at(-1)}.opacity`]).toBe(1)
    for (let n = CASES.length / 2; n < CASES.length; n++) answer(n)
    for (let t = 0; t < 1; t += STEP) state = sharingTheLoad.step(state, [], ctx, () => {})
    const view = sharingTheLoad.view(state, ctx)
    for (const id of LINE) expect(view.live[`actor:${id}.opacity`]).toBe(0)
    for (const l of LEADERS) expect(view.live[`actor:${l.glow}.opacity`]).toBeGreaterThan(0)
    expect(state.moses).toBe(CASES.filter((c) => c.great).length)
    expect(view.done).toBe(true)
  })

  it('asks again after a wrong choice, and in gentle mode the right one glows', () => {
    const ctx = context(false)
    const state = sharingTheLoad.step(sharingTheLoad.start(ctx), [{ kind: 'choose', option: 'moses' }], ctx, () => {})
    expect(state.answered).toBe(0)
    expect(sharingTheLoad.view(state, ctx).choice?.feedback?.right).toBe(false)
    const gentle = context(true)
    expect(sharingTheLoad.view(sharingTheLoad.start(gentle), gentle).choice?.glow).toBe(right(0))
  })

  it('plays through Episode 7, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode7, {
        gentle,
        player: (runner) => {
          const choice = runner.view.choice
          if (choice?.options.length) runner.queue({ kind: 'choose', option: right(Number(choice.id.split('-')[1])) })
        },
      })
      expect(comparisons).toHaveLength(episode7.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
