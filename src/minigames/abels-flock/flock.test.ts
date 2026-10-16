import { describe, expect, it } from 'vitest'
import { FLOCK, FOLD_GATE, episode5 } from '../../content/levels/01-creation-and-fall/episode-5'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { abelsFlock } from '.'

/** The scene where the flock is herded, at rest, for the rules to look at. */
function context(gentle: boolean): GameContext {
  const director = new Director(episode5, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

const space: GameInput = { kind: 'key', key: 'primary', down: true }

/** Plays the rules, calling `player` every step with the state and the seconds so far. */
function run(gentle: boolean, seconds: number, player: (state: ReturnType<typeof abelsFlock.start>, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = abelsFlock.start(ctx)
  for (let t = 0; t < seconds; t += STEP) state = abelsFlock.step(state, player(state, t), ctx, () => {})
  return { state, view: abelsFlock.view(state, ctx) }
}

/** Presses Space once a second and a half: the one-button way to herd. */
const pressing = (_: unknown, t: number) => (Math.floor(t / 1.5) !== Math.floor((t - STEP) / 1.5) ? [space] : [])

describe('"Abel\'s flock"', () => {
  it('drives sheep away from the staff', () => {
    const sheep = FLOCK[0]!
    const { state } = run(false, 1, (_, t) => (t === 0 ? [{ kind: 'pointer', phase: 'down', x: sheep.x - 0.06, y: sheep.y - 0.02 }] : []))
    expect(state.sheep[sheep.id]!.x).toBeGreaterThan(sheep.x)
  })

  it('brings the whole flock home with Space alone, then asks for the offering', () => {
    for (const gentle of [false, true]) {
      const { state, view } = run(gentle, 150, pressing)
      expect(FLOCK.filter((a) => state.sheep[a.id]!.home < 0).map((a) => a.id)).toEqual([])
      expect(state.phase).toBe('choose')
      expect(view.choice?.options).toHaveLength(gentle ? 2 : 3)
      expect(view.live['actor:firstborn-glow-1.opacity']).toBeGreaterThan(0)
    }
  })

  it('lets the lambs wander, except in gentle mode', () => {
    const lamb = FLOCK.find((a) => a.wanders)!
    const moved = (gentle: boolean) => {
      const { state } = run(gentle, 6)
      return Math.hypot(state.sheep[lamb.id]!.x - lamb.x, state.sheep[lamb.id]!.y - lamb.y)
    }
    expect(moved(false)).toBeGreaterThan(0.02)
    expect(moved(true)).toBe(0)
  })

  it('keeps sheep out of the fold except through the gate', () => {
    const { state } = run(false, 20, () => [{ kind: 'key', key: 'right', down: true }])
    const outside = FLOCK.map((a) => state.sheep[a.id]!).filter((s) => s.home < 0)
    expect(outside.filter((s) => s.x >= FOLD_GATE.x)).toEqual([])
  })

  it('answers any offering but the firstborn with "Abel gave the first and the best", and lets the player choose again', () => {
    const ctx = context(false)
    let { state } = run(false, 150, pressing)
    state = abelsFlock.step(state, [{ kind: 'choose', option: 'old-ewe' }], ctx, () => {})
    expect(abelsFlock.view(state, ctx).choice?.feedback?.text).toBe('Abel gave the first and the best.')
    state = abelsFlock.step(state, [{ kind: 'choose', option: 'firstborn' }], ctx, () => {})
    expect(state.phase).toBe('chosen')
    for (let t = 0; t < 3; t += STEP) state = abelsFlock.step(state, [], ctx, () => {})
    expect(abelsFlock.view(state, ctx).done).toBe(true)
  })

  it('plays through Episode 5, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      let last = -1
      const comparisons = playThrough(episode5, {
        gentle,
        limit: 200,
        player(runner, seconds) {
          const choice = runner.view.choice
          if (choice && !choice.feedback) runner.queue({ kind: 'choose', option: 'firstborn' })
          else if (!choice && Math.floor(seconds / 1.5) !== last) {
            last = Math.floor(seconds / 1.5)
            runner.queue(space)
          }
        },
      })
      expect(comparisons).toHaveLength(episode5.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
