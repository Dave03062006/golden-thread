import { describe, expect, it } from 'vitest'
import { PLAGUES, episode3 } from '../../content/levels/08-the-plagues-and-the-passover/episode-3'
import { Director } from '../../scene/director'
import { STEP, type GameContext } from '../framework'
import { playThrough } from '../playthrough'
import { SHOW, offered, thePlaguesInOrder } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode3, 2)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

describe('"The plagues in order"', () => {
  it('places the nine plagues in order, each with its picture and its word', () => {
    const ctx = context(false)
    let state = thePlaguesInOrder.start(ctx)
    const poses: (string | undefined)[] = []
    const words: string[] = []
    for (const p of PLAGUES) {
      for (let t = 0; t < SHOW + 0.1; t += STEP) {
        state = thePlaguesInOrder.step(state, t < STEP ? [{ kind: 'choose', option: p.id }] : [], ctx, (c) => poses.push(c.to.pose))
        const feedback = thePlaguesInOrder.view(state, ctx).choice?.feedback
        if (t < 1 && t + STEP >= 1 && feedback) words.push(feedback.text)
      }
    }
    for (let t = 0; t < 1; t += STEP) state = thePlaguesInOrder.step(state, [], ctx, () => {})
    expect(poses).toEqual(PLAGUES.map((p) => p.id))
    expect(words).toEqual(PLAGUES.map((p) => p.word))
    expect(thePlaguesInOrder.view(state, ctx).done).toBe(true)
  })

  it('always offers the next plague, among later ones only', () => {
    PLAGUES.forEach((p, n) => {
      const ids = offered(n).map((o) => o.id)
      expect(ids).toContain(p.id)
      expect(ids.every((id) => PLAGUES.findIndex((q) => q.id === id) >= n)).toBe(true)
    })
  })

  it('answers a plague out of turn gently, and in gentle mode the right one glows', () => {
    const ctx = context(false)
    const state = thePlaguesInOrder.step(thePlaguesInOrder.start(ctx), [{ kind: 'choose', option: 'gnats' }], ctx, () => {})
    expect(state.placed).toBe(0)
    expect(thePlaguesInOrder.view(state, ctx).choice?.feedback?.text).toBe('Not yet: gnats came later.')
    const gentle = context(true)
    expect(thePlaguesInOrder.view(thePlaguesInOrder.start(gentle), gentle).choice?.glow).toBe('blood')
  })

  it('plays through Episode 3, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode3, {
        gentle,
        player: (runner) => {
          const choice = runner.view.choice
          if (choice?.options.length) runner.queue({ kind: 'choose', option: PLAGUES[choice.trail?.length ?? 0]!.id })
        },
      })
      expect(comparisons).toHaveLength(episode3.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
