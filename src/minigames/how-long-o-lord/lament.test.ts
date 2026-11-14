import { describe, expect, it } from 'vitest'
import { FIRE, LAMENT, episode3 } from '../../content/levels/20-the-psalms/episode-3'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { howLongOLord } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode3, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof howLongOLord.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = howLongOLord.start(ctx)
  for (let t = 0; t < seconds; t += STEP) state = howLongOLord.step(state, player(state, t), ctx, () => {})
  return { state, view: howLongOLord.view(state, ctx) }
}

describe('"How long, O LORD?"', () => {
  it('puts Psalm 13 in order, and the fire grows', () => {
    const { state, view } = run(false, 15, (s) => (s.time - s.placedAt > 2.1 && s.placed < LAMENT.length ? [{ kind: 'choose', option: `lament-${s.placed + 1}` }] : []))
    expect(state.placed).toBe(LAMENT.length)
    expect(view.live[`actor:${FIRE}.opacity`]).toBeCloseTo(0.9)
    expect(view.done).toBe(true)
  })

  it('says "not yet" to beginning with the praise', () => {
    const { state } = run(false, 2.2, (_s, t) => (t > 2.05 && t < 2.06 ? [{ kind: 'choose', option: 'lament-4' }] : []))
    expect(state.placed).toBe(0)
  })

  it('plays through its episode, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode3, { gentle, player: (runner) => {
        const choice = runner.view.choice
        if (choice?.options.length) for (const o of choice.options) runner.queue({ kind: 'choose', option: o.id })
      } })
      expect(comparisons).toHaveLength(episode3.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
