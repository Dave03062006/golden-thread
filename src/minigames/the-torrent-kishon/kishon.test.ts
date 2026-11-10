import { describe, expect, it } from 'vitest'
import { CHARIOTS, FLOOD, SINK, episode2 } from '../../content/levels/15-the-judges/episode-2'
import { Director } from '../../scene/director'
import { STEP, type GameContext, type GameInput } from '../framework'
import { playThrough } from '../playthrough'
import { theTorrentKishon } from '.'

function context(gentle: boolean): GameContext {
  const director = new Director(episode2, 1)
  director.start(0)
  return { gentle, frame: () => director.frame(1) }
}

type State = ReturnType<typeof theTorrentKishon.start>

function run(gentle: boolean, seconds: number, player: (state: State, t: number) => GameInput[] = () => []) {
  const ctx = context(gentle)
  let state = theTorrentKishon.start(ctx)
  for (let t = 0; t < seconds; t += STEP) state = theTorrentKishon.step(state, player(state, t), ctx, () => {})
  return { state, view: theTorrentKishon.view(state, ctx) }
}

describe('"The torrent Kishon"', () => {
  it('raises the river with each burst of rain until the chariots sink', () => {
    const { view } = run(false, 6, (_s, t) => (Math.round(t / STEP) % 40 === 0 ? [{ kind: 'key', key: 'primary', down: true }] : []))
    expect(view.live[`layer:${FLOOD}.opacity`]).toBe(1)
    for (const c of CHARIOTS) expect(view.live[`actor:${c.id}.y`]).toBeCloseTo(c.y + SINK)
    expect(view.done).toBe(true)
  })

  it('stays dry until the rain is sent', () => {
    expect(run(false, 3).view.live[`layer:${FLOOD}.opacity`]).toBe(0)
  })

  it('plays through its episode, leaving the world exactly as a checkpoint rebuilds it', () => {
    for (const gentle of [false, true]) {
      const comparisons = playThrough(episode2, { gentle, player: (runner) => runner.queue({ kind: 'key', key: 'primary', down: true }) })
      expect(comparisons).toHaveLength(episode2.scenes.length - 1)
      for (const { scene, played, rebuilt } of comparisons) expect(played, `the world at the start of scene ${scene}`).toEqual(rebuilt)
    }
  })
})
