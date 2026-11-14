import { FIRE, LAMENT } from '../../content/levels/20-the-psalms/episode-3'
import { inOrder } from '../in-order'

/**
 * How long, O LORD? (Level 20 script, Episode 3): ordering. The four parts of Psalm 13 lie on the
 * cave floor; the player puts them in the order the psalm prays them, from the cry to the plea, to
 * trust, to praise, and the fire grows brighter with each. A wrong choice gets a gentle "not
 * yet"; in gentle mode the next part glows.
 */

export const howLongOLord = inOrder({
  id: 'how-long-o-lord',
  steps: LAMENT.map((p, i) => ({ id: `lament-${i + 1}`, text: p.text, note: p.note })),
  question: (n) => (n === 0 ? 'How does Psalm 13 begin?' : 'And then?'),
  notYet: 'Not yet. A lament moves from crying out, to asking, to trusting, to praise.',
  live: (placed, t) => ({ [`actor:${FIRE}.opacity`]: 0.2 + (0.7 * (Math.max(0, placed - 1) + (placed > 0 ? Math.min(1, t) : 0))) / LAMENT.length }),
})
