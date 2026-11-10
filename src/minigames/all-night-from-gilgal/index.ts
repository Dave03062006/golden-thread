import { ARMY, WAY } from '../../content/levels/14-joshua/episode-5'
import { alongTheWay } from '../along-the-way'
import type { Hint } from '../framework'

/**
 * All night from Gilgal (Level 14 script, Episode 5): pathfinding. A moonlit map of the hills
 * between Gilgal and Gibeon. The player leads Joshua's army up through the dark valleys, turn
 * by turn, to Gibeon's watch fire before the sky grows light.
 *
 * Drag the army (or steer it with the arrow keys) along the way; Space marches it on to the
 * next turn by itself. In gentle mode the army follows the way on its own.
 */

export const HINT: Hint = {
  pointer: 'Lead Joshua’s army up through the hills at night, to Gibeon’s watch fire.',
  keys: 'Or steer with the arrow keys, or press Space to march on.',
  gesture: 'drag',
}

export const allNightFromGilgal = alongTheWay({
  id: 'all-night-from-gilgal',
  way: WAY,
  actor: ARMY,
  hint: HINT,
  leg: (next) => ({ title: `Turn ${next} of ${WAY.length - 1}`, text: 'Up through the dark hills, toward Gibeon.' }),
  arrived: { title: 'Before the dawn', text: '“So Joshua came upon them suddenly, having marched up all night from Gilgal.”' },
})
