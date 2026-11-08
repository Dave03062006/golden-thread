import { describe, expect, it } from 'vitest'
import { GOAT, SINS, episode5 } from '../../content/levels/11-the-tabernacle-and-the-holy-life/episode-5'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { AWAY, HOLD, carriedFarAway } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode5, 2)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof carriedFarAway.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = carriedFarAway.start(ctx)
  const emitted: string[] = []
  for (let t = 0; t < seconds; t += STEP) state = carriedFarAway.step(state, player(state, t), ctx, (cue) => emitted.push(`${cue.target} ${cue.to.pose}`))
  return { state, emitted, view: carriedFarAway.view(state, ctx) }
}

const tap = (i: number): GameInput => ({ kind: 'pointer', phase: 'down', x: SINS[i]!.x, y: SINS[i]!.y - 0.01 })
const hold: GameInput = { kind: 'key', key: 'primary', down: true }
const layAll = (t: number) => (t < SINS.length && Math.floor(t) !== Math.floor(t - STEP) ? [tap(Math.floor(t))] : [])

describe('"Carried far away"', () => {
  it('lays each sin tapped on the goat, and asks for a hold to send it', () => {
    const { state, view } = run(false, SINS.length + 1, (_, t) => layAll(t))
    expect(state.count).toBe(SINS.length)
    SINS.forEach((s) => expect(view.live[`actor:${s.id}.y`]).toBe(GOAT.back))
    expect(view.hint?.gesture).toBe('hold')
    expect(state.sentAt).toBe(-1)
  })

  it('sends the goat away only after a long enough hold, carrying every sin out of sight', () => {
    const short = run(false, SINS.length + 1 + HOLD.normal / 2, (_, t) => (t < SINS.length + 1 ? layAll(t) : [hold]))
    expect(short.state.sentAt).toBe(-1)
    const { state, view, emitted } = run(false, SINS.length + 2 + HOLD.normal + AWAY + 3, (_, t) => (t < SINS.length + 1 ? layAll(t) : [hold]))
    expect(state.sentAt).toBeGreaterThan(0)
    expect(emitted).toEqual(['actor:goat walk', 'actor:leader walk'])
    expect(view.live['actor:goat.x']).toBeCloseTo(GOAT.away)
    expect(view.live['actor:goat.opacity']).toBe(0)
    SINS.forEach((s) => expect(view.live[`actor:${s.id}.opacity`]).toBe(0))
    expect(view.message?.title).toBe('The camp is clear')
    expect(view.done).toBe(true)
  })

  it('in gentle mode, lays the nearest stone wherever the tap lands', () => {
    const bare: GameInput = { kind: 'pointer', phase: 'down', x: 0.5, y: 0.3 }
    expect(run(false, 0.1, (_, t) => (t < STEP ? [bare] : [])).state.count).toBe(0)
    expect(run(true, 0.1, (_, t) => (t < STEP ? [bare] : [])).state.count).toBe(1)
  })

  it('plays through Episode 5, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode5, { gentle, player: (runner) => runner.queue(hold) })
      expect(comparisons).toHaveLength(episode5.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
