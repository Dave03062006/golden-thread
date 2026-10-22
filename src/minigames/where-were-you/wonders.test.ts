import { describe, expect, it } from 'vitest'
import { WONDERS, cloudOf, episode5 } from '../../content/levels/06-job/episode-5'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { whereWereYou } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode5, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof whereWereYou.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = whereWereYou.start(ctx)
  const titles: string[] = []
  for (let t = 0; t < seconds; t += STEP) {
    state = whereWereYou.step(state, player(state, t), ctx, () => {})
    const title = whereWereYou.view(state, ctx).message?.title
    if (title && titles.at(-1) !== title) titles.push(title)
  }
  return { state, view: whereWereYou.view(state, ctx), titles }
}

const space: GameInput = { kind: 'key', key: 'primary', down: true }
const everyFourSeconds = (_: State, t: number) => (Math.floor(t / 4) !== Math.floor((t - STEP) / 4) ? [space] : [])
/** Sweeps back and forth over one place. */
const sweepAt =
  (x: number, y: number) =>
  (_: State, t: number): GameInput[] => [{ kind: 'pointer', phase: t < STEP ? 'down' : 'move', x: x + 0.03 * Math.sin(t * 20), y }]

describe('"Where were you?"', () => {
  it('finds every wonder with God’s question for it, then the storm stills', () => {
    const { view, titles } = run(false, 4 * WONDERS.length + 6, everyFourSeconds)
    expect(titles).toHaveLength(WONDERS.length + 1)
    expect(titles[0]).toBe('The sea held back by its shore · Job 38:8')
    expect(titles.at(-1)).toBe('The storm begins to still')
    for (const w of WONDERS) {
      expect(view.live[`actor:${w.id}.opacity`]).toBe(1)
      expect(view.live[`actor:${cloudOf(w.id)}.opacity`]).toBe(0)
    }
    expect(view.done).toBe(true)
  })

  it('clears the cloud a sweep passes over, in any order', () => {
    const horse = WONDERS.findIndex((w) => w.id === 'horse')
    const { state, view } = run(false, 3, sweepAt(WONDERS[horse]!.x, WONDERS[horse]!.y))
    expect(state.cleared[horse]).toBe(1)
    expect(state.cleared.filter((c) => c >= 1)).toHaveLength(1)
    expect(view.message?.text).toBe('Do you give the horse his might?')
  })

  it('quotes God’s questions as the verses give them', () => {
    const { titles } = run(false, 4 * WONDERS.length + 6, everyFourSeconds)
    expect(titles.slice(0, -1)).toEqual(WONDERS.map((w) => expect.stringContaining(w.title)))
  })

  it('in gentle mode, clears the next cloud with a sweep anywhere, the wonder glowing through', () => {
    const ctx = context(true)
    expect(whereWereYou.view(whereWereYou.start(ctx), ctx).live['actor:wonder-glow.opacity']).toBeGreaterThan(0.3)
    const { state } = run(true, 3, sweepAt(0.5, 0.15))
    expect(state.cleared[0]).toBe(1)
  })

  it('plays through Episode 5, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode5, { gentle, player: (runner) => runner.queue(space) })
      expect(comparisons).toHaveLength(episode5.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
