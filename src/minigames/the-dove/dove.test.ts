import { describe, expect, it } from 'vitest'
import { FLIGHTS, HILL_PERCH, HOME, episode4 } from '../../content/levels/02-noah-and-the-nations/episode-4'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { theDove } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode4, 2)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type Flight = keyof typeof FLIGHTS
type State = ReturnType<(typeof theDove)['dove-1']['start']>

/** Plays a flight, calling `player` every step with the state and the seconds so far. */
function run(id: Flight, gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const rules = theDove[id]!
  const ctx = context(gentle)
  let state = rules.start(ctx)
  const cues: unknown[] = []
  let doneAt = -1
  for (let t = 0; t < seconds; t += STEP) {
    state = rules.step(state, player(state, t), ctx, (cue) => cues.push(cue))
    if (doneAt < 0 && rules.view(state, ctx).done) doneAt = t
  }
  return { state, view: rules.view(state, ctx), cues, doneAt }
}

/** Points at where she must go next, holding the pointer down all the way. */
const pointing = (id: Flight) => (state: State, t: number): GameInput[] => {
  const at = FLIGHTS[id][Math.min(state.stage, FLIGHTS[id].length - 1)]!.at
  return [{ kind: 'pointer', phase: t === 0 ? 'down' : 'move', ...at }]
}

/** Beats her wings with Space twice a second. */
const beating = (_: State, t: number): GameInput[] => (Math.floor((t + STEP) * 2) > Math.floor(t * 2) ? [{ kind: 'key', key: 'primary', down: true }] : [])

describe('"The dove"', () => {
  it('first flight: out over the water, nowhere to land, and home to Noah’s hand', () => {
    const { state, view, doneAt } = run('dove-1', false, 30, pointing('dove-1'))
    expect(state.stage).toBe(3)
    expect(Math.hypot(state.x - HOME.x, state.y - HOME.y)).toBeLessThan(0.01)
    expect(view.done).toBe(true)
    expect(doneAt).toBeLessThan(20)
  })

  it('second flight: plucks the olive leaf at the treetop and carries it home', () => {
    const { state, view, cues } = run('dove-2', false, 30, pointing('dove-2'))
    expect(state.carrying).toBe(true)
    expect(cues).toHaveLength(1)
    expect(view.live['actor:olive-leaf.opacity']).toBeGreaterThan(0.5)
    expect(view.done).toBe(true)
  })

  it('shows what she finds for a moment when she gets there', () => {
    const ctx = context(false)
    const messages = new Set<unknown>()
    run('dove-2', false, 30, (state, t) => {
      const message = theDove['dove-2']!.view(state, ctx).message
      if (message) messages.add(message)
      return pointing('dove-2')(state, t)
    })
    expect([...messages]).toEqual([FLIGHTS['dove-2'][0]!.found])
    const { view } = run('dove-2', false, 30, pointing('dove-2'))
    expect(view.message ?? null).toBeNull()
  })

  it('third flight: flies free to the tree on the hills and stays there', () => {
    const { state, view } = run('dove-3', false, 20, pointing('dove-3'))
    expect(Math.hypot(state.x - HILL_PERCH.x, state.y - HILL_PERCH.y)).toBeLessThan(0.01)
    expect(view.done).toBe(true)
  })

  it('flies with the arrow keys', () => {
    const { state } = run('dove-1', false, 1.5, (_, t) => (t === 0 ? [{ kind: 'key', key: 'left', down: true }] : []))
    expect(state.x).toBeLessThan(HOME.x - 0.2)
    expect(state.facing).toBe(-1)
  })

  it('finds her own way with Space alone, and slowly with nothing pressed at all', () => {
    const beat = run('dove-1', false, 60, beating)
    const alone = run('dove-1', false, 60)
    expect(beat.view.done).toBe(true)
    expect(alone.view.done).toBe(true)
    expect(beat.doneAt).toBeLessThan(alone.doneAt)
  })

  it('in gentle mode, a wind carries her along faster', () => {
    const gentle = run('dove-3', true, 60)
    const normal = run('dove-3', false, 60)
    expect(gentle.doneAt).toBeLessThan(normal.doneAt)
  })

  it('plays through Episode 4, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode4, { gentle, player: () => {} })
      expect(comparisons).toHaveLength(episode4.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
