import { describe, expect, it } from 'vitest'
import { HOUSES, MIDWIVES, episode1 } from '../../content/levels/07-moses-is-called/episode-1'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { theMidwivesNight, watchAt } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode1, 2)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof theMidwivesNight.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = theMidwivesNight.start(ctx)
  let movedInLight = false
  for (let t = 0; t < seconds; t += STEP) {
    const before = state.x
    state = theMidwivesNight.step(state, player(state, t), ctx, () => {})
    if (state.x > before && watchAt(state.time, gentle) === 'looking') movedInLight = true
  }
  return { state, view: theMidwivesNight.view(state, ctx), movedInLight }
}

const hold: GameInput = { kind: 'key', key: 'primary', down: true }
const holdFromStart = (_: State, t: number) => (t < STEP ? [hold] : [])

describe('"The midwives’ night"', () => {
  it('walks the midwives down the street while held, lighting a lamp at every house', () => {
    const { state, view, movedInLight } = run(false, 30, holdFromStart)
    expect(state.reached).toBe(HOUSES.length)
    expect(movedInLight).toBe(false)
    for (const h of HOUSES) expect(view.live[`actor:${h.id}.opacity`]).toBe(0.9)
    expect(view.live['actor:puah.x']).toBeCloseTo(HOUSES.at(-1)!.x - MIDWIVES.gap)
    expect(view.done).toBe(true)
  })

  it('stands still when not held, and waits in the shadows while the light is on the street', () => {
    expect(run(false, 3).state.x).toBe(MIDWIVES.from)
    const ctx = context(false)
    let state = theMidwivesNight.start(ctx)
    state = theMidwivesNight.step(state, [hold], ctx, () => {})
    while (watchAt(state.time, false) !== 'looking') state = theMidwivesNight.step(state, [], ctx, () => {})
    const x = state.x
    for (let t = 0; t < 1; t += STEP) state = theMidwivesNight.step(state, [], ctx, () => {})
    expect(state.x).toBe(x)
    expect(theMidwivesNight.view(state, ctx).message?.title).toBe('The watchman’s light!')
  })

  it('in gentle mode, lets the watchman look less often', () => {
    const looking = (gentle: boolean) => Array.from({ length: 1200 }, (_, i) => watchAt(i / 60, gentle)).filter((w) => w === 'looking').length
    expect(looking(true)).toBeLessThan(looking(false))
  })

  it('plays through Episode 1, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode1, { gentle, player: (runner, seconds) => seconds < 0.05 && runner.queue(hold) })
      expect(comparisons).toHaveLength(episode1.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
