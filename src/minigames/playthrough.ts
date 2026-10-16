import type { Episode } from '../content/types'
import { Director } from '../scene/director'
import type { SceneFrame } from '../scene/evaluate'
import { GAMES } from './registry'
import { GameRunner } from './runner'

/**
 * For tests: plays an episode through with no screen, the way a player would, and
 * compares the world at the start of every scene as played with the same scene rebuilt
 * from its checkpoint. A save must bring back exactly the world the player left.
 */

const FRAME = 1 / 60

/** Frames compared to six decimal places, so rounding differences don't count. */
const rounded = (frame: SceneFrame) => JSON.parse(JSON.stringify(frame, (_key, value: unknown) => (typeof value === 'number' ? Math.round(value * 1e6) / 1e6 : value)))

export interface Comparison {
  scene: number
  played: unknown
  rebuilt: unknown
}

/**
 * `player` is called every frame of an interaction with its runner and the seconds since
 * it began, and queues whatever the player does. Throws if an interaction never ends.
 */
export function playThrough(
  episode: Pick<Episode, 'set' | 'scenes'>,
  { gentle, player, limit = 80 }: { gentle: boolean; player: (runner: GameRunner, seconds: number, game: string) => void; limit?: number },
): Comparison[] {
  const director = new Director(episode)
  let now = 0
  const comparisons: Comparison[] = []
  const reached: number[] = []
  director.subscribe((event) => {
    if (event.type === 'checkpoint' && event.index > 0) reached.push(event.index)
  })
  const compare = () => {
    for (const scene of reached.splice(0)) {
      const rebuilt = new Director(episode, scene)
      rebuilt.start(now)
      comparisons.push({ scene: scene + 1, played: rounded(director.frame(now + 20)), rebuilt: rounded(rebuilt.frame(now + 20)) })
    }
  }
  director.start(now)
  while (!director.ended) {
    const beat = director.beat!
    if (beat.kind !== 'play') {
      now += 0.5
      director.advance(now)
      compare()
      continue
    }
    const runner = new GameRunner(GAMES[beat.game]!, { gentle, frame: () => director.frame(now) }, director.timeline, now)
    const startedAt = now
    let done = false
    while (!done) {
      now += FRAME
      if (now - startedAt > limit) throw new Error(`"${beat.game}" never finished`)
      player(runner, now - startedAt, beat.game)
      done = runner.advanceTo(now).done
    }
    director.finishPlay(now)
    compare()
  }
  return comparisons
}
