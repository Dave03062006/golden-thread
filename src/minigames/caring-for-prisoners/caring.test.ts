import { describe, expect, it } from 'vitest'
import { LIGHT, PRISONERS, episode2 } from '../../content/levels/05-joseph-and-his-brothers/episode-2'
import { Director } from '../../scene/director'
import { STEP, type GameContext } from '../framework'
import { playThrough } from '../playthrough'
import { caringForPrisoners } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode2, 2)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

describe('"Caring for the prisoners"', () => {
  it('gives each prisoner what he needs, brightening the room, until the butler and the baker', () => {
    const ctx = context(false)
    let state = caringForPrisoners.start(ctx)
    const cues: { target: string; to: { pose?: string } }[] = []
    for (const p of PRISONERS) for (let t = 0; t < 2.2; t += STEP) state = caringForPrisoners.step(state, t < STEP ? [{ kind: 'choose', option: p.need }] : [], ctx, (c) => cues.push(c))
    for (let t = 0; t < 1; t += STEP) state = caringForPrisoners.step(state, [], ctx, () => {})
    const view = caringForPrisoners.view(state, ctx)
    expect(state.cared).toBe(PRISONERS.length)
    expect(cues.filter((c) => c.to.pose === 'idle').map((c) => c.target)).toEqual(PRISONERS.slice(0, 4).map((p) => `actor:${p.id}`))
    expect(cues.filter((c) => c.target === 'actor:need').map((c) => c.to.pose)).toEqual(PRISONERS.slice(1).map((p) => p.need))
    expect(view.live['actor:window-light.opacity']).toBeCloseTo(LIGHT.from + LIGHT.each * PRISONERS.length)
    expect(view.done).toBe(true)
  })

  it('answers the wrong thing gently, and asks again', () => {
    const ctx = context(false)
    let state = caringForPrisoners.start(ctx)
    state = caringForPrisoners.step(state, [{ kind: 'choose', option: 'lamp' }], ctx, () => {})
    expect(state.cared).toBe(0)
    expect(caringForPrisoners.view(state, ctx).choice?.feedback?.right).toBe(false)
  })

  it('in gentle mode, makes the right thing glow on the tray', () => {
    const ctx = context(true)
    expect(caringForPrisoners.view(caringForPrisoners.start(ctx), ctx).choice?.glow).toBe('bread')
  })

  it('plays through Episode 2, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode2, {
        gentle,
        player: (runner) => {
          const choice = runner.view.choice
          const turn = Number(choice?.id.split('-')[1])
          if (choice?.options.length && choice.id.startsWith('prisoner-')) runner.queue({ kind: 'choose', option: PRISONERS[turn]!.need })
        },
      })
      expect(comparisons).toHaveLength(episode2.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
