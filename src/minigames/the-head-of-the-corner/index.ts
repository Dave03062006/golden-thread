import { ARCH, SWING } from '../../content/levels/20-the-psalms/episode-5'
import { aimAt } from '../aim-at'

/**
 * The head of the corner (Level 20 script, Episode 5): aiming. The rejected stone swings back and
 * forth above the unfinished arch; the player lets it go when it is over the gap at the top, and
 * it drops into place. Too early or too late, and it simply swings again.
 *
 * Tap (or press Space) when the stone is over the gap. In gentle mode the gap is wider and the
 * swing slower.
 */

export const theHeadOfTheCorner = aimAt({
  id: 'the-head-of-the-corner',
  marker: SWING.marker,
  from: SWING.from,
  to: SWING.to,
  target: ARCH.x,
  zone: 0.02,
  gentleZone: 0.06,
  period: 1.8,
  gentlePeriod: 3.2,
  hint: { pointer: 'Let the stone drop when it is over the gap at the top of the arch: tap.', keys: 'Or press Space.', gesture: 'tap' },
  waiting: { title: 'The stone the builders rejected', text: 'Set it at the head of the corner.' },
  missed: { title: 'Not yet', text: 'The stone swings again.' },
  hit: { title: 'The head of the corner', text: '“This is the LORD’s doing; it is marvelous in our eyes.”' },
  // The stone drops into the gap, and the glow comes with it.
  after: (t) => ({ [`actor:${SWING.marker}.y`]: SWING.y + (ARCH.gap - SWING.y) * Math.min(1, t), 'actor:corner-glow.y': SWING.y + (ARCH.gap - SWING.y) * Math.min(1, t) }),
})
