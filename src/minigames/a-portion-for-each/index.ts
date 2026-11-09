import { PORTIONS } from '../../content/levels/14-joshua/episode-6'
import { inOrder } from '../in-order'

/**
 * A portion for each (Level 14 script, Episode 6): matching. The map of the promised land, its
 * regions still blank. The lots are cast at Shiloh, and one by one the tribes come up; the
 * player chooses each tribe's portion, and it fills with light on the map. A wrong choice gets
 * a gentle "not that one"; in gentle mode the right portion glows.
 */

export const aPortionForEach = inOrder({
  id: 'a-portion-for-each',
  steps: PORTIONS.map((p) => ({ id: p.id, text: p.land, note: `The portion of ${p.tribe}.` })),
  question: (n) => `The lot falls to ${PORTIONS[n]!.tribe}. Which is its portion?`,
  notYet: 'Not that one. Look at the map again.',
  live(placed, t) {
    const live: Record<string, number> = {}
    PORTIONS.forEach((p, i) => (live[`actor:${p.id}.opacity`] = i < placed - 1 ? 1 : i === placed - 1 ? t : 0))
    return live
  },
})
