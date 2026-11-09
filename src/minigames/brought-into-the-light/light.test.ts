import { describe, expect, it } from 'vitest'
import { DOOR, HIDDEN, LAMP, episode4 } from '../../content/levels/14-joshua/episode-4'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { broughtIntoTheLight } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode4, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof broughtIntoTheLight.start>

function run(gentle: boolean, seconds: number, player: (state: State) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = broughtIntoTheLight.start(ctx)
  const titles: string[] = []
  for (let t = 0; t < seconds; t += STEP) {
    state = broughtIntoTheLight.step(state, player(state), ctx, () => {})
    const title = broughtIntoTheLight.view(state, ctx).message?.title
    if (title && titles.at(-1) !== title) titles.push(title)
  }
  return { state, titles, view: broughtIntoTheLight.view(state, ctx) }
}

describe('"Brought into the light"', () => {
  it('finds each hidden thing the lamp is dragged to, and brings it to the door', () => {
    // The player drags the lamp to each hidden thing in turn, from the door end of the tent.
    const order = [...HIDDEN].reverse()
    const { titles, view } = run(false, 20, (s) => {
      const next = order.find((h) => s.foundAt[HIDDEN.indexOf(h)]! < 0)
      return next ? [{ kind: 'pointer', phase: 'move', x: next.x, y: next.y }] : []
    })
    expect(titles).toEqual([...order.map((h) => h.name), 'Nothing hidden'])
    for (const h of HIDDEN) expect(view.live[`actor:${h.id}.x`]).toBe(DOOR.x - 0.08)
    expect(view.live[`actor:${LAMP.id}.opacity`]).toBe(0)
    expect(view.done).toBe(true)
  })

  it('finds nothing while the lamp stays at the door', () => {
    expect(run(false, 5).state.count).toBe(0)
  })

  it('plays through Episode 4, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode4, { gentle, player: (runner) => runner.queue({ kind: 'key', key: 'primary', down: true }) })
      expect(comparisons).toHaveLength(episode4.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
