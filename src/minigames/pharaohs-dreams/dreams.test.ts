import { describe, expect, it } from 'vitest'
import { DREAMS, episode3 } from '../../content/levels/05-joseph-and-his-brothers/episode-3'
import { Director } from '../../scene/director'
import { STEP, type GameContext } from '../framework'
import { playThrough } from '../playthrough'
import { pharaohsDreams } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode3, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

describe('"Pharaoh’s dreams"', () => {
  it('reads each picture of the dreams in turn, showing it while it is read', () => {
    const ctx = context(false)
    let state = pharaohsDreams.start(ctx)
    expect(pharaohsDreams.view(state, ctx).live['actor:fat-cows.opacity']).toBe(1)
    for (const d of DREAMS) for (let t = 0; t < 2.2; t += STEP) state = pharaohsDreams.step(state, t < STEP ? [{ kind: 'choose', option: d.meaning }] : [], ctx, () => {})
    for (let t = 0; t < 1; t += STEP) state = pharaohsDreams.step(state, [], ctx, () => {})
    const view = pharaohsDreams.view(state, ctx)
    expect(view.choice?.trail).toHaveLength(DREAMS.length)
    expect(view.live['actor:thin-ears.opacity']).toBe(0)
    expect(view.done).toBe(true)
  })

  it('answers a wrong meaning with Joseph’s words, and asks again', () => {
    const ctx = context(false)
    let state = pharaohsDreams.start(ctx)
    state = pharaohsDreams.step(state, [{ kind: 'choose', option: 'war' }], ctx, () => {})
    expect(state.read).toBe(0)
    expect(pharaohsDreams.view(state, ctx).choice?.feedback?.text).toContain('It is not in me')
  })

  it('in gentle mode, makes the right meaning glow', () => {
    const ctx = context(true)
    expect(pharaohsDreams.view(pharaohsDreams.start(ctx), ctx).choice?.glow).toBe('plenty')
  })

  it('plays through Episode 3, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode3, {
        gentle,
        player: (runner) => {
          const choice = runner.view.choice
          if (choice?.options.length) runner.queue({ kind: 'choose', option: DREAMS[choice.trail?.length ?? 0]!.meaning })
        },
      })
      expect(comparisons).toHaveLength(episode3.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
