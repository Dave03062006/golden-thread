import { describe, expect, it } from 'vitest'
import { HERDS, episode6 } from '../../content/levels/06-job/episode-6'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { homeToTheFold } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode6, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof homeToTheFold.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = homeToTheFold.start(ctx)
  const cues: { target: string; pose?: string }[] = []
  const titles: string[] = []
  for (let t = 0; t < seconds; t += STEP) {
    state = homeToTheFold.step(state, player(state, t), ctx, (c) => cues.push({ target: c.target, pose: c.to.pose }))
    const title = homeToTheFold.view(state, ctx).message?.title
    if (title && titles.at(-1) !== title) titles.push(title)
  }
  return { state, view: homeToTheFold.view(state, ctx), cues, titles }
}

const space: GameInput = { kind: 'key', key: 'primary', down: true }
const everyThreeSeconds = (_: State, t: number) => (Math.floor(t / 3) !== Math.floor((t - STEP) / 3) ? [space] : [])

describe('"Home to the fold"', () => {
  it('calls each herd home in turn, with its count doubled as it arrives', () => {
    const { view, cues, titles } = run(false, 3 * HERDS.length + 6, everyThreeSeconds)
    expect(titles).toEqual([...HERDS.map((h) => h.title), 'Twice as much as before'])
    expect(cues).toEqual(HERDS.flatMap((h) => [{ target: `actor:${h.id}`, pose: 'walk' }, { target: `actor:${h.id}`, pose: 'idle' }]))
    for (const h of HERDS) {
      expect(view.live[`actor:${h.id}.x`]).toBe(h.to.x)
      expect(view.live[`actor:${h.id}.y`]).toBe(h.to.y)
    }
    expect(view.done).toBe(true)
  })

  it('calls a tapped herd, in any order', () => {
    const camels = HERDS.findIndex((h) => h.id === 'camels')
    const { state } = run(false, 1, (_, t) => (t < STEP ? [{ kind: 'pointer', phase: 'down', x: HERDS[camels]!.from.x, y: HERDS[camels]!.from.y - 0.02 }] : []))
    expect(state.calledAt.map((at) => at >= 0)).toEqual(HERDS.map((_, i) => i === camels))
  })

  it('in gentle mode, brings the herds home by themselves', () => {
    const ctx = context(true)
    expect(homeToTheFold.view(homeToTheFold.start(ctx), ctx).live['actor:herd-glow.opacity']).toBeGreaterThan(0.4)
    expect(run(true, 20).view.done).toBe(true)
  })

  it('plays through Episode 6, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode6, { gentle, player: (runner) => runner.queue(space) })
      expect(comparisons).toHaveLength(episode6.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
