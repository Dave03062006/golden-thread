import { ARROW } from '../../content/levels/18-david-the-shepherd-king/episode-3'
import { aimAt } from '../aim-at'

/**
 * The arrow beyond you (Level 18 script, Episode 3): aiming. Jonathan draws his bow, and the
 * aim sweeps out across the field, past the boy, and back; the player lets the arrow go when it
 * is far beyond the boy, the secret sign that David must flee. A short arrow means something
 * else, so Jonathan simply shoots again.
 *
 * Tap (or press Space) when the aim is beyond the boy. In gentle mode the target is wider and
 * the sweep slower.
 */

export const theArrowBeyondYou = aimAt({
  id: 'the-arrow-beyond-you',
  marker: ARROW.marker,
  from: ARROW.from,
  to: ARROW.to,
  target: ARROW.target,
  zone: 0.05,
  gentleZone: 0.1,
  period: 2,
  gentlePeriod: 3.6,
  hint: { pointer: 'Shoot the arrow far beyond the boy: tap when the aim is past him.', keys: 'Or press Space.', gesture: 'tap' },
  waiting: { title: 'Jonathan draws his bow', text: '“Run and find the arrows which I shoot.”' },
  missed: { title: 'Too short', text: 'That would mean “come back.” Jonathan shoots again.' },
  hit: { title: 'The sign', text: '“Is not the arrow beyond you?”' },
  after: (t) => ({ [`actor:${ARROW.marker}.opacity`]: 0.9 * (1 - t) }),
})
