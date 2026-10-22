import { describe, expect, it } from 'vitest'
import { BUCKET, TROUGHS, episode3 } from '../../content/levels/07-moses-is-called/episode-3'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { BUCKETS, wateringTheFlock } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode3, 2)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof wateringTheFlock.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = wateringTheFlock.start(ctx)
  const poses: (string | undefined)[] = []
  for (let t = 0; t < seconds; t += STEP) state = wateringTheFlock.step(state, player(state, t), ctx, (c) => poses.push(c.to.pose))
  return { state, view: wateringTheFlock.view(state, ctx), poses }
}

const down: GameInput = { kind: 'key', key: 'primary', down: true }
const up: GameInput = { kind: 'key', key: 'primary', down: false }
/** Holds for 1.2 seconds, lets go, and does it again every two seconds. */
const drawAndPour = (_: State, t: number): GameInput[] => {
  const phase = t % 2
  return phase < STEP ? [down] : phase >= 1.2 && phase < 1.2 + STEP ? [up] : []
}

describe('"Watering the flock"', () => {
  it('draws the bucket while held and pours it on letting go, until every trough is full', () => {
    const { state, view } = run(false, 2 * BUCKETS * TROUGHS.length + 6, drawAndPour)
    expect(state.poured).toEqual(TROUGHS.map(() => BUCKETS))
    for (const t of TROUGHS) {
      expect(view.live[`actor:${t.water}.opacity`]).toBe(1)
      expect(view.live[`actor:${t.flock}.y`]).toBe(t.flockTo)
    }
    expect(view.live['actor:bucket.y']).toBe(BUCKET.down)
    expect(view.done).toBe(true)
  })

  it('lets a bucket slip back if it’s let go before it’s full', () => {
    const { state } = run(false, 1.5, (_, t) => (t < STEP ? [down] : t >= 0.5 && t < 0.5 + STEP ? [up] : []))
    expect(state.bucket).toBe(0)
    expect(state.poured).toEqual(TROUGHS.map(() => 0))
  })

  it('in gentle mode, draws and pours with one tap', () => {
    const { state } = run(true, 2, (_, t) => (t < STEP ? [down, up] : []))
    expect(state.poured[0]).toBe(1)
  })

  it('plays through Episode 3, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode3, { gentle, player: (runner, seconds) => runner.queue(seconds % 2 < 1.3 ? down : up) })
      expect(comparisons).toHaveLength(episode3.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
