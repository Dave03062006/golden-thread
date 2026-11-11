import { COWS, ROAD } from '../../content/levels/17-samuel-and-saul/episode-3'
import { alongTheWay } from '../along-the-way'
import type { Hint } from '../framework'

/**
 * The road to Beth-shemesh (Level 17 script, Episode 3): pathfinding. The two cows pull the cart
 * with the ark up the road from Ekron toward Israel, lowing for their calves, turning neither to
 * the right nor to the left. Drag them on (or steer with the arrow keys); Space goes on to the
 * next bend by itself. In gentle mode they walk on by themselves.
 */

export const HINT: Hint = {
  pointer: 'Lead the cows and the cart with the ark along the road to Beth-shemesh.',
  keys: 'Or steer with the arrow keys, or press Space to go on.',
  gesture: 'drag',
}

export const theRoadToBethShemesh = alongTheWay({
  id: 'the-road-to-beth-shemesh',
  way: ROAD,
  actor: COWS,
  hint: HINT,
  leg: (next) => ({ title: `Bend ${next} of ${ROAD.length - 1}`, text: 'Lowing as they went, they turned neither to the right nor to the left.' }),
  arrived: { title: 'Beth-shemesh', text: '“They lifted up their eyes and saw the ark, and they rejoiced to see it.”' },
})
