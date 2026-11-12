import { FLIGHT, KING } from '../../content/levels/19-davids-sin-and-repentance/episode-4'
import { alongTheWay } from '../along-the-way'

/**
 * Up the Mount of Olives (Level 19 script, Episode 4): a courier route. The player leads the
 * weeping king out of Jerusalem, down across the brook Kidron and up the Mount of Olives; at
 * each stop someone meets him: Ittai, the people weeping by the brook, Zadok with the ark (sent
 * back to the city), and Hushai at the summit.
 *
 * Drag David (or steer with the arrow keys); Space goes on to the next stop by itself. In gentle
 * mode he follows the road on his own.
 */

export const upTheMountOfOlives = alongTheWay({
  id: 'up-the-mount-of-olives',
  way: FLIGHT,
  actor: KING,
  hint: { pointer: 'Lead King David out of the city, across the brook Kidron and up the Mount of Olives.', keys: 'Or steer with the arrow keys, or press Space to go on.', gesture: 'drag' },
  leg: (next) => ({ title: `${next} of ${FLIGHT.length - 1}`, text: FLIGHT[next]!.leg }),
  arrived: { title: 'The summit', text: '“If I find favor in the eyes of the LORD, he will bring me back.”' },
})
