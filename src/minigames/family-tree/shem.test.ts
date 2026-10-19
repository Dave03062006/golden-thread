import { describe, expect, it } from 'vitest'
import { SHEM_LINE, episode7 } from '../../content/levels/02-noah-and-the-nations/episode-7'
import { Director } from '../../scene/director'
import { STEP, type GameContext } from '../framework'
import { playThrough } from '../playthrough'
import { familyTreeShem } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode7, 0)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

describe('"The family tree", from Shem to Abram', () => {
  it('places the ten names from Shem to Abram, each growing its branch, with its fact', () => {
    const ctx = context(false)
    let state = familyTreeShem.start(ctx)
    const facts: string[] = []
    for (const g of SHEM_LINE) {
      for (let t = 0; t < 3; t += STEP) {
        state = familyTreeShem.step(state, t < STEP ? [{ kind: 'choose', option: g.name }] : [], ctx, () => {})
        // Its fact shows for a moment after it's placed.
        const feedback = familyTreeShem.view(state, ctx).choice?.feedback
        if (t < 1 && t + STEP >= 1 && feedback) facts.push(feedback.text)
      }
    }
    const view = familyTreeShem.view(state, ctx)
    expect(state.placed).toBe(10)
    expect(view.live['actor:shem-branch-10.grow']).toBe(1)
    expect(view.done).toBe(true)
    expect(facts).toContain('Eber: from whose name may come the word “Hebrew”')
  })

  it('plays through Episode 7, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode7, {
        gentle,
        player: (runner) => {
          const choice = runner.view.choice
          if (choice?.options.length) runner.queue({ kind: 'choose', option: SHEM_LINE[choice.trail?.length ?? 0]!.name })
        },
      })
      expect(comparisons).toHaveLength(episode7.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
