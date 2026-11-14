import { PSALM_WAY, SHEPHERD } from '../../content/levels/20-the-psalms/episode-2'
import { alongTheWay } from '../along-the-way'

/**
 * Paths of righteousness (Level 20 script, Episode 2): a route. The player leads the shepherd
 * through Psalm 23, stop by stop: the green pastures, the still waters, the right paths, the dark
 * valley, the table, and home to the open door of the house.
 *
 * Drag the shepherd (or steer with the arrow keys); Space goes on to the next stop by itself. In
 * gentle mode he follows the path on his own.
 */

export const pathsOfRighteousness = alongTheWay({
  id: 'paths-of-righteousness',
  way: PSALM_WAY,
  actor: SHEPHERD,
  hint: { pointer: 'Lead the shepherd through Psalm 23, from the green pastures to the house of the Lord.', keys: 'Or steer with the arrow keys, or press Space to go on.', gesture: 'drag' },
  leg: (next) => ({ title: `${next} of ${PSALM_WAY.length - 1}`, text: PSALM_WAY[next]!.leg }),
  arrived: { title: 'Home', text: '“I shall dwell in the house of the Lord for ever.”' },
})
