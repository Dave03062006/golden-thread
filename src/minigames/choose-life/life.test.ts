import { describe, expect, it } from 'vitest'
import { CHOICES, LIFE_ROAD, episode4 } from '../../content/levels/13-moses-last-words/episode-4'
import { Director } from '../../scene/director'
import { STEP, type GameContext } from '../framework'
import { playThrough } from '../playthrough'
import { SHOW, chooseLife } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode4, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

const answer = (n: number) => (CHOICES[n]!.life ? 'life' : 'away')

describe('"Choose life"', () => {
  it('lights a stretch of the road of life for each choice of life, until it shines all the way', () => {
    const ctx = context(false)
    let state = chooseLife.start(ctx)
    CHOICES.forEach((_, n) => {
      for (let t = 0; t < SHOW + 0.1; t += STEP) state = chooseLife.step(state, t < STEP ? [{ kind: 'choose', option: answer(n) }] : [], ctx, () => {})
    })
    for (let t = 0; t < 1; t += STEP) state = chooseLife.step(state, [], ctx, () => {})
    const view = chooseLife.view(state, ctx)
    for (const r of LIFE_ROAD) expect(view.live[`actor:${r.id}.opacity`]).toBe(0.85)
    expect(view.live['actor:chooser.x']).toBe(LIFE_ROAD.at(-1)!.x)
    expect(view.done).toBe(true)
  })

  it('gives a gentle word for the wrong road, and in gentle mode the right road glows', () => {
    const ctx = context(false)
    const state = chooseLife.step(chooseLife.start(ctx), [{ kind: 'choose', option: 'away' }], ctx, () => {})
    expect(state.sorted).toBe(0)
    expect(chooseLife.view(state, ctx).choice?.feedback?.right).toBe(false)
    const gentle = context(true)
    expect(chooseLife.view(chooseLife.start(gentle), gentle).choice?.glow).toBe('life')
  })

  it('plays through Episode 4, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode4, {
        gentle,
        player: (runner) => {
          const choice = runner.view.choice
          if (choice?.options.length) runner.queue({ kind: 'choose', option: answer(choice.trail?.length ?? 0) })
        },
      })
      expect(comparisons).toHaveLength(episode4.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
