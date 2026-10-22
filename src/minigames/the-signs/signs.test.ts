import { describe, expect, it } from 'vitest'
import { ELDERS, SIGNS, episode5 } from '../../content/levels/07-moses-is-called/episode-5'
import { Director } from '../../scene/director'
import { STEP, type GameContext } from '../framework'
import { playThrough } from '../playthrough'
import { SHOW, theSigns } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode5, 2)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

describe('"The signs"', () => {
  it('shows the signs in God’s order, with his words for each, until the elders bow', () => {
    const ctx = context(false)
    let state = theSigns.start(ctx)
    const titles: string[] = []
    const cues: { target: string; pose?: string }[] = []
    let serpentSeen = false
    for (const sign of SIGNS) {
      for (let t = 0; t < SHOW + 0.1; t += STEP) {
        state = theSigns.step(state, t < STEP ? [{ kind: 'choose', option: sign.id }] : [], ctx, (c) => cues.push({ target: c.target, pose: c.to.pose }))
        const view = theSigns.view(state, ctx)
        if (view.message && titles.at(-1) !== view.message.title) titles.push(view.message.title)
        if (view.live['actor:serpent.opacity'] === 1) serpentSeen = true
      }
    }
    for (let t = 0; t < 1; t += STEP) state = theSigns.step(state, [], ctx, () => {})
    expect(titles).toEqual(['Exodus 4:4', 'Exodus 4:6', 'Exodus 4:7', 'Exodus 4:9'])
    expect(serpentSeen).toBe(true)
    expect(cues).toContainEqual({ target: 'actor:poured-water', pose: 'red' })
    for (const id of ELDERS) expect(cues.at(-ELDERS.length + ELDERS.indexOf(id))).toEqual({ target: `actor:${id}`, pose: 'kneel' })
    expect(theSigns.view(state, ctx).done).toBe(true)
  })

  it('answers a sign out of turn gently, and offers only the signs not yet shown', () => {
    const ctx = context(false)
    let state = theSigns.step(theSigns.start(ctx), [{ kind: 'choose', option: 'water' }], ctx, () => {})
    expect(state.shown).toBe(0)
    expect(theSigns.view(state, ctx).choice?.feedback?.right).toBe(false)
    state = theSigns.step(state, [{ kind: 'choose', option: 'rod' }], ctx, () => {})
    for (let t = 0; t < SHOW + 0.1; t += STEP) state = theSigns.step(state, [], ctx, () => {})
    expect(theSigns.view(state, ctx).choice?.options.map((o) => o.id)).toEqual(['hand', 'water'])
  })

  it('in gentle mode, makes the next sign glow', () => {
    const ctx = context(true)
    expect(theSigns.view(theSigns.start(ctx), ctx).choice?.glow).toBe('rod')
  })

  it('plays through Episode 5, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode5, {
        gentle,
        player: (runner) => {
          const choice = runner.view.choice
          if (choice?.options.length) runner.queue({ kind: 'choose', option: SIGNS[choice.trail?.length ?? 0]!.id })
        },
      })
      expect(comparisons).toHaveLength(episode5.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
