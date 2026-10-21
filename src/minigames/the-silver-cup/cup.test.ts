import { describe, expect, it } from 'vitest'
import { ROADSIDE, episode5 } from '../../content/levels/05-joseph-and-his-brothers/episode-5'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { theSilverCup } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode5, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof theSilverCup.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = theSilverCup.start(ctx)
  const cues: { target: string }[] = []
  const titles: string[] = []
  for (let t = 0; t < seconds; t += STEP) {
    state = theSilverCup.step(state, player(state, t), ctx, (c) => cues.push(c))
    const title = theSilverCup.view(state, ctx).message?.title
    if (title && titles.at(-1) !== title) titles.push(title)
  }
  return { state, view: theSilverCup.view(state, ctx), cues, titles }
}

const space: GameInput = { kind: 'key', key: 'primary', down: true }
const tap = (i: number): GameInput => ({ kind: 'pointer', phase: 'down', x: ROADSIDE[i]!.x, y: ROADSIDE[i]!.y - 0.02 })
const everySecond = (_: State, t: number) => (Math.floor(t) !== Math.floor(t - STEP) ? [space] : [])

describe('"The silver cup"', () => {
  it('opens the sacks from the eldest to the youngest, and finds the cup in Benjamin’s', () => {
    const { view, cues, titles } = run(false, 16, everySecond)
    expect(cues.map((c) => c.target)).toEqual(ROADSIDE.map((s) => `actor:${s.id}`))
    expect(titles[0]).toBe('Reuben’s sack')
    expect(titles.at(-1)).toBe('Benjamin’s sack')
    expect(view.live['actor:cup.opacity']).toBe(1)
    expect(view.done).toBe(true)
  })

  it('opens a tapped sack only in its turn, with a word when one is out of turn', () => {
    const { state, titles } = run(false, 1, (_, t) => (t < STEP ? [tap(10)] : t > 0.3 && t < 0.3 + STEP ? [tap(0)] : []))
    expect(state.opened).toBe(1)
    expect(titles).toEqual(['The eldest first', 'Reuben’s sack'])
  })

  it('in gentle mode, makes the next sack glow', () => {
    const ctx = context(true)
    const view = theSilverCup.view(theSilverCup.start(ctx), ctx)
    expect(view.live['actor:search-glow.opacity']).toBeGreaterThan(0.4)
    expect(view.live['actor:search-glow.x']).toBe(ROADSIDE[0]!.x)
  })

  it('plays through Episode 5, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode5, { gentle, player: (runner) => runner.queue(space) })
      expect(comparisons).toHaveLength(episode5.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
