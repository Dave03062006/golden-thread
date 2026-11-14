import { PRIESTS, PROCESSION } from '../../content/levels/21-solomon-and-the-temple/episode-4'
import { alongTheWay } from '../along-the-way'

/**
 * Into the Most Holy Place (Level 21 script, Episode 4): a route. The player leads the priests
 * carrying the ark across the Temple courts, past the altar and the bronze sea, up the steps,
 * and in at the golden doors, through the holy place and the veil.
 *
 * Drag the priests (or steer with the arrow keys); Space goes on to the next stage by itself. In
 * gentle mode they walk the way on their own.
 */

export const intoTheMostHolyPlace = alongTheWay({
  id: 'into-the-most-holy-place',
  way: PROCESSION,
  actor: PRIESTS,
  hint: { pointer: 'Lead the priests carrying the ark up to the house of the LORD.', keys: 'Or steer with the arrow keys, or press Space to go on.', gesture: 'drag' },
  leg: (next) => ({ title: `${next} of ${PROCESSION.length - 1}`, text: PROCESSION[next]!.leg }),
  arrived: { title: 'The Most Holy Place', text: '“Underneath the wings of the cherubim.”' },
})
