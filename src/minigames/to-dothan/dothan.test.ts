import { describe, expect, it } from 'vitest'
import { DOTHAN, NODES, ON_MAP, START, episode1 } from '../../content/levels/05-joseph-and-his-brothers/episode-1'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { toDothan } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode1, 2)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof toDothan.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = toDothan.start(ctx)
  const titles: string[] = []
  for (let t = 0; t < seconds; t += STEP) {
    state = toDothan.step(state, player(state, t), ctx, () => {})
    const title = toDothan.view(state, ctx).message?.title
    if (title && titles.at(-1) !== title) titles.push(title)
  }
  return { state, view: toDothan.view(state, ctx), titles }
}

const space: GameInput = { kind: 'key', key: 'primary', down: true }
const key = (k: 'up' | 'down' | 'left' | 'right'): GameInput => ({ kind: 'key', key: k, down: true })
const tap = (n: number): GameInput => ({ kind: 'pointer', phase: 'down', x: NODES[n]!.x, y: NODES[n]!.y })
/** Whenever Joseph is standing still, does `input`. */
const whenStill = (input: (state: State) => GameInput[]) => (state: State) => (state.to === null && state.doneAt < 0 ? input(state) : [])

describe('"To Dothan"', () => {
  it('walks the way to Dothan with Space, past each sign, and arrives', () => {
    const { state, view, titles } = run(false, 20, whenStill(() => [space]))
    expect(state.at).toBe(DOTHAN)
    expect(titles).toEqual(['A shepherd’s fire', 'A man in the field', 'A lost lamb', 'Dothan'])
    expect(view.live['actor:map-joseph.y']).toBeCloseTo(NODES[DOTHAN]!.y + ON_MAP)
    expect(view.done).toBe(true)
  })

  it('walks only along a path to a crossroads next to him', () => {
    const far = run(false, 2, (_, t) => (t < STEP ? [tap(DOTHAN)] : []))
    expect(far.state.at).toBe(START)
    expect(far.titles).toEqual(['No path that way'])
    const near = run(false, 2, (_, t) => (t < STEP ? [tap(1)] : []))
    expect(near.state.at).toBe(1)
  })

  it('follows the arrow keys, and turns back at a dead end', () => {
    // Up the left side: from the first crossroads, up to the dead end by the wall.
    const steps: GameInput[] = [key('right'), key('up'), key('right'), key('right')]
    let i = 0
    const { state, titles } = run(false, 12, whenStill(() => (i < steps.length ? [steps[i++]!] : [])))
    expect(state.at).toBe(6)
    expect(titles).toContain('No way on')
  })

  it('in gentle mode, walks the way from any tap', () => {
    const { view } = run(true, 20, whenStill(() => [{ kind: 'pointer', phase: 'down', x: 0.5, y: 0.5 }]))
    expect(view.done).toBe(true)
  })

  it('plays through Episode 1, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode1, { gentle, player: (runner) => runner.queue(space) })
      expect(comparisons).toHaveLength(episode1.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
