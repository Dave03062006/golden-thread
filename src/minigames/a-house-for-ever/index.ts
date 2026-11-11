import { BEAMS, PROMISE } from '../../content/levels/18-david-the-shepherd-king/episode-8'
import { inOrder } from '../in-order'

/**
 * A house for ever (Level 18 script, Episode 8): memory. God's promise to David, in pieces; the
 * player puts it together in order, and the house of light rises beam by beam. A wrong choice
 * gets a gentle "not yet"; in gentle mode the next part glows.
 */

export const aHouseForEver = inOrder({
  id: 'a-house-for-ever',
  steps: PROMISE.map((text, i) => ({ id: `promise-${i + 1}`, text, note: i === PROMISE.length - 1 ? '“Your house and your kingdom shall be made sure for ever before me.”' : 'Another beam of the house.' })),
  question: (n) => (n === 0 ? 'Nathan brings God’s promise. What does it say first?' : 'And then?'),
  notYet: 'Not yet. What comes next in God’s promise?',
  live(placed, t) {
    const live: Record<string, number> = {}
    BEAMS.forEach((b, i) => (live[`actor:${b.id}.opacity`] = i < placed - 1 ? 0.9 : i === placed - 1 ? 0.9 * Math.min(1, t) : 0))
    return live
  },
})
