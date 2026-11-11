import { ROAD, WIDOWS } from '../../content/levels/16-ruth/episode-1'
import { alongTheWay } from '../along-the-way'
import type { Hint } from '../framework'

/**
 * The long road home (Level 16 script, Episode 1): a quiet interaction. The three widows walk
 * west from Moab toward Bethlehem, and at each resting place one of Naomi's memories comes
 * back. Drag them on (or steer with the arrow keys); Space walks on to the next stop by itself.
 * In gentle mode they walk on by themselves.
 */

export const HINT: Hint = {
  pointer: 'Walk Naomi, Ruth and Orpah home along the road, stop by stop.',
  keys: 'Or steer with the arrow keys, or press Space to walk on.',
  gesture: 'drag',
}

export const theLongRoadHome = alongTheWay({
  id: 'the-long-road-home',
  way: ROAD,
  actor: WIDOWS,
  hint: HINT,
  leg: (next) => ({ title: 'Naomi remembers', text: ROAD[next - 1]!.memory === 'Moab' ? 'The long road west, out of Moab.' : ROAD[next - 1]!.memory }),
  arrived: { title: 'On the way to Judah', text: ROAD.at(-1)!.memory },
})
