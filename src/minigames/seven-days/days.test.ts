import { describe, expect, it } from 'vitest'
import { MARKS, SUN, episode2 } from '../../content/levels/06-job/episode-2'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { DAY, DAYS, sevenDays, skyAt } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode2, 0)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof sevenDays.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = sevenDays.start(ctx)
  let darkest = 0
  for (let t = 0; t < seconds; t += STEP) {
    state = sevenDays.step(state, player(state, t), ctx, () => {})
    darkest = Math.max(darkest, sevenDays.view(state, ctx).live['layer:night-sky.opacity']!)
  }
  return { state, view: sevenDays.view(state, ctx), darkest }
}

const tap: GameInput = { kind: 'pointer', phase: 'down', x: 0.5, y: 0.5 }
const everySecond = (_: State, t: number) => (Math.floor(t) !== Math.floor(t - STEP) ? [tap] : [])

describe('"Seven days"', () => {
  it('lets a day pass with each tap, night falling and morning returning, a mark for each day', () => {
    const { state, view, darkest } = run(false, (DAY + 1) * DAYS + 4, everySecond)
    expect(state.passed).toBe(DAYS)
    expect(darkest).toBe(1)
    for (const m of MARKS) expect(view.live[`actor:${m.id}.opacity`]).toBe(1)
    expect(view.live['layer:night-sky.opacity']).toBe(0)
    expect(view.live['actor:sun.x']).toBe(SUN.x)
    expect(view.done).toBe(true)
  })

  it('can’t hurry a day: taps while one passes do nothing', () => {
    const { state } = run(false, DAY - 0.1, (_, t) => (Math.floor(t * 10) !== Math.floor((t - STEP) * 10) ? [tap] : []))
    expect(state.passed).toBe(0)
  })

  it('goes round from morning to morning, the sun back in the east', () => {
    expect(skyAt(0)).toEqual(skyAt(1))
    expect(skyAt(0.7).night).toBe(1)
    expect(skyAt(0.24).sun.y).toBeCloseTo(SUN.top)
  })

  it('in gentle mode, lets the days pass on their own', () => {
    expect(run(true, (DAY + 0.7) * DAYS + 3).view.done).toBe(true)
  })

  it('plays through Episode 2, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode2, { gentle, player: (runner) => runner.queue({ kind: 'key', key: 'primary', down: true }) })
      expect(comparisons).toHaveLength(episode2.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
