import { describe, expect, it } from 'vitest'
import { CLOUD_RISE, FAMILIES, MAP, TOWER, episode6 } from '../../content/levels/02-noah-and-the-nations/episode-6'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput, type GameRules } from '../framework'
import { playThrough } from '../playthrough'
import { PER_TIER, scatter, theTower } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode6, 2)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

/** Plays rules, calling `player` every step with the state and the seconds so far. */
function run<S>(rules: GameRules<S>, gentle: boolean, seconds: number, player: (state: S, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = rules.start(ctx)
  const cues: unknown[] = []
  for (let t = 0; t < seconds; t += STEP) state = rules.step(state, player(state, t), ctx, (cue) => cues.push(cue))
  return { state, view: rules.view(state, ctx), cues }
}

const space: GameInput = { kind: 'key', key: 'primary', down: true }
type Stack = ReturnType<typeof theTower.start>
type Scatter = ReturnType<typeof scatter.start>

/** Drops the load just as it swings over the middle of the tower. */
const wellTimed = (state: Stack): GameInput[] => {
  const x = (phase: number) => Math.sin(phase)
  const now = x(state.phase)
  const next = x(state.phase + 1.7 * STEP)
  return !state.falling && Math.sign(now) !== Math.sign(next) ? [space] : []
}

describe('"The tower", stacking', () => {
  it('raises a terrace for every two loads dropped over the tower, the builders cheering, the clouds rising out of reach', () => {
    const { state, view, cues } = run(theTower, false, 60, wellTimed)
    expect(state.tiers).toBe(TOWER.tiers)
    expect(state.misses).toBe(0)
    expect(cues).toHaveLength(TOWER.tiers - TOWER.begun)
    expect(view.live['layer:high-clouds.offsetY']).toBeCloseTo(-CLOUD_RISE * (TOWER.tiers - TOWER.begun), 2)
    expect(view.done).toBe(true)
  })

  it('lets a load dropped beside the tower fall away, and slows the swing to help', () => {
    const { state, view } = run(theTower, false, 1.2, (_, t) => (t > 0.8 && t < 0.8 + STEP ? [space] : []))
    expect(state.tiers).toBe(TOWER.begun)
    expect(state.loads).toBe(0)
    expect(state.misses).toBe(1)
    expect(view.message?.title).toBe('Beside the tower')
  })

  it('after three misses, holds the load still over the tower so the next drop lands', () => {
    // Misses three times by dropping at the far end of the swing, then drops whenever.
    const { state } = run(theTower, false, 30, (s, t) => {
      if (s.falling) return []
      if (s.misses < 3) return Math.abs(Math.sin(s.phase)) > 0.98 ? [space] : []
      return Math.floor((t + STEP) / 0.7) > Math.floor(t / 0.7) ? [space] : []
    })
    expect(state.tiers).toBeGreaterThan(TOWER.begun)
  })

  it('in gentle mode, holds any drop over the tower', () => {
    const presses = (_: Stack, t: number) => (Math.floor((t + STEP) / 0.7) > Math.floor(t / 0.7) ? [space] : [])
    const gentle = run(theTower, true, 30, presses)
    expect(gentle.state.tiers * PER_TIER + gentle.state.loads).toBeGreaterThan(8)
  })
})

/** Drags the family on its way to a place, in one smooth stroke, and lets go. */
const dragTo = (to: (s: Scatter) => { x: number; y: number }) => (state: Scatter, t: number): GameInput[] => {
  const k = (t % 1.5) / 1.2
  if (k > 1) return k < 1 + STEP ? [{ kind: 'pointer', phase: 'up', x: 0, y: 0 }] : []
  const from = MAP.babel
  const goal = to(state)
  const p = { x: from.x + (goal.x - from.x) * k, y: from.y + (goal.y - from.y) * k }
  return [{ kind: 'pointer', phase: t % 1.5 < STEP ? 'down' : 'move', ...p }]
}

describe('"The tower", scattered', () => {
  it('settles each family when it’s brought to its own land', () => {
    const { state, view } = run(scatter, false, 10, dragTo((s) => FAMILIES[Math.min(s.index, 2)]!.land))
    expect(state.index).toBe(FAMILIES.length)
    for (const f of FAMILIES) expect(view.live[`actor:family-${f.id}.x`]).toBeCloseTo(f.land.x)
    expect(view.done).toBe(true)
  })

  it('turns a family back from the wrong land, naming where it belongs', () => {
    const { state, view } = run(scatter, false, 1.4, dragTo(() => FAMILIES[2]!.land))
    expect(state.index).toBe(0)
    expect(state.at).toEqual(MAP.babel)
    expect(view.message?.text).toBe(FAMILIES[0]!.where)
  })

  it('leads each family home with Space', () => {
    const { state } = run(scatter, false, 12, (_, t) => (Math.floor((t + STEP) / 0.7) > Math.floor(t / 0.7) ? [space] : []))
    expect(state.index).toBe(FAMILIES.length)
  })

  it('in gentle mode, makes the land of the family on its way glow', () => {
    const { view } = run(scatter, true, 0.2)
    expect(view.live['actor:land-japheth.opacity']).toBeGreaterThan(0.6)
    expect(view.live['actor:land-ham.opacity']).toBeLessThan(0.5)
  })
})

describe('Episode 6', () => {
  it('plays through, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode6, { gentle, player: (runner) => runner.queue(space) })
      expect(comparisons).toHaveLength(episode6.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
