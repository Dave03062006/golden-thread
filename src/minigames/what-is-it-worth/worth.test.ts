import { describe, expect, it } from 'vitest'
import { PIECES, episode2 } from '../../content/levels/04-isaac-and-jacob/episode-2'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { whatIsItWorth } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode2, 3)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof whatIsItWorth.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = whatIsItWorth.start(ctx)
  const cues: { to: { pose?: string } }[] = []
  const titles: string[] = []
  for (let t = 0; t < seconds; t += STEP) {
    state = whatIsItWorth.step(state, player(state, t), ctx, (c) => cues.push(c))
    const title = whatIsItWorth.view(state, ctx).message?.title
    if (title && titles.at(-1) !== title) titles.push(title)
  }
  return { state, view: whatIsItWorth.view(state, ctx), cues, titles }
}

const tap: GameInput = { kind: 'pointer', phase: 'down', x: 0.5, y: 0.5 }
const space: GameInput = { kind: 'key', key: 'primary', down: true }

describe('"What is it worth?"', () => {
  it('places each piece of the birthright in turn, tipping the scales further each time', () => {
    const { view, cues, titles } = run(false, 20, (_, t) => (Math.floor(t / 2) !== Math.floor((t - STEP) / 2) ? [tap] : []))
    expect(cues.map((c) => c.to.pose)).toEqual(['tip-1', 'tip-2', 'tip-3', 'tip-4', 'tip-5'])
    expect(titles).toEqual([...PIECES.map((p) => p.title), 'Light as nothing'])
    expect(view.done).toBe(true)
  })

  it('waits while each name shows, so a quick second tap places nothing', () => {
    const { state } = run(false, 1, (_, t) => (t < STEP || (t > 0.5 && t < 0.5 + STEP) ? [space] : []))
    expect(state.placed).toBe(1)
  })

  it('does nothing until asked, but in gentle mode places the pieces by itself', () => {
    expect(run(false, 10).state.placed).toBe(0)
    expect(run(true, 30).view.done).toBe(true)
  })

  it('plays through Episode 2, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode2, { gentle, player: (runner) => runner.queue(space) })
      expect(comparisons).toHaveLength(episode2.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
