import { GOLIATH, SLING } from '../../content/levels/18-david-the-shepherd-king/episode-2'
import { aimAt } from '../aim-at'

/**
 * Five smooth stones (Level 18 script, Episode 2): aiming. David whirls his sling, and the aim
 * swings back and forth across Goliath's bronze helmet; the player lets go when it is on the bare
 * forehead. A miss simply means David whirls again. Goliath falls, seen from far off.
 *
 * Tap (or press Space) when the aim is on the forehead. In gentle mode the target is wider and
 * the swing slower.
 */

export const fiveSmoothStones = aimAt({
  id: 'five-smooth-stones',
  marker: SLING.marker,
  from: SLING.from,
  to: SLING.to,
  target: SLING.target,
  zone: 0.025,
  gentleZone: 0.06,
  period: 1.6,
  gentlePeriod: 3,
  hint: { pointer: 'Let the stone fly when the aim is on Goliath’s forehead: tap.', keys: 'Or press Space.', gesture: 'tap' },
  waiting: { title: 'David whirls the sling', text: '“I come to you in the name of the LORD of hosts.”' },
  missed: { title: 'Not yet', text: 'David whirls the sling again.' },
  hit: { title: 'The giant falls', text: '“He fell on his face to the ground.”' },
  after: (t) => ({ [`actor:${SLING.marker}.opacity`]: 0.9 * (1 - t), [`actor:${GOLIATH}.opacity`]: 1 - t }),
})
