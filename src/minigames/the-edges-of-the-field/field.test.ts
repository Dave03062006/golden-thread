import { describe, expect, it } from 'vitest'
import { FIELD, GLEANERS, ROWS, episode7 } from '../../content/levels/11-the-tabernacle-and-the-holy-life/episode-7'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { REAP, along, theEdgesOfTheField } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode7, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof theEdgesOfTheField.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = theEdgesOfTheField.start(ctx)
  const titles: string[] = []
  for (let t = 0; t < seconds; t += STEP) {
    state = theEdgesOfTheField.step(state, player(state, t), ctx, () => {})
    const title = theEdgesOfTheField.view(state, ctx).message?.title
    if (title && titles.at(-1) !== title) titles.push(title)
  }
  return { state, titles, view: theEdgesOfTheField.view(state, ctx) }
}

const onField: GameInput = { kind: 'pointer', phase: 'down', x: FIELD.x, y: ROWS[1]!.y }
const tapGleaner = (i: number): GameInput => ({ kind: 'pointer', phase: 'down', x: GLEANERS[i]!.from, y: GLEANERS[i]!.y - 0.03 })
const every = (seconds: number, t: number) => Math.floor(t / seconds) !== Math.floor((t - STEP) / seconds)

describe('"The edges of the field"', () => {
  it('reaps every row, leaving the edges, then sends each gleaner tapped to the grain left for them', () => {
    const { state, titles, view } = run(false, 30, (s, t) => (!every(2, t) || s.sent === GLEANERS.length ? [] : s.reaped < ROWS.length ? [onField] : [tapGleaner(GLEANERS.length - 1 - s.sent)]))
    expect(state.reaped).toBe(ROWS.length)
    expect(titles).toEqual(['The sickle stops at the edge', ...GLEANERS.map((g) => g.name).reverse(), 'Enough for all'])
    ROWS.forEach((r) => expect(view.live[`actor:${r.id}.opacity`]).toBe(0))
    GLEANERS.forEach((g) => expect(view.live[`actor:${g.id}.x`]).toBeCloseTo(g.to))
    expect(view.done).toBe(true)
  })

  it('turns the reapers at the end of each row', () => {
    expect(along(0).to).toBe(along(1).from)
    expect(along(1).facing).toBe(-1)
  })

  it('waits for a row to be reaped before the next, and reaps nothing for a tap off the field, except in gentle mode', () => {
    const fast = run(false, REAP / 2, () => [{ kind: 'key', key: 'primary', down: true }])
    expect(fast.state.reaped).toBe(1)
    const off: GameInput = { kind: 'pointer', phase: 'down', x: 0.5, y: 0.2 }
    expect(run(false, 0.1, (_, t) => (t < STEP ? [off] : [])).state.reaped).toBe(0)
    expect(run(true, 0.1, (_, t) => (t < STEP ? [off] : [])).state.reaped).toBe(1)
  })

  it('plays through Episode 7, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode7, { gentle, player: (runner) => runner.queue({ kind: 'key', key: 'primary', down: true }) })
      expect(comparisons).toHaveLength(episode7.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
