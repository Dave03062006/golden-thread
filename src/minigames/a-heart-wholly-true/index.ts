import { CROSSROADS } from '../../content/levels/21-solomon-and-the-temple/episode-6'
import { inOrder } from '../in-order'

/**
 * A heart wholly true (Level 21 script, Episode 6): a quiet choosing interaction. Solomon's life
 * comes back to him as a road with crossroads; at each, the player chooses what a heart wholly true
 * to God would do, and a lamp lights along the road. A wrong choice gets a gentle "that is the way
 * Solomon's heart turned"; in gentle mode the true choice glows.
 */

export const aHeartWhollyTrue = inOrder({
  id: 'a-heart-wholly-true',
  steps: CROSSROADS.map((c, i) => ({ id: `true-${i + 1}`, text: c.right, note: i < 2 ? 'Solomon chose this way.' : 'Solomon did not; but we can.' })),
  question: (n) => `${CROSSROADS[n]!.when} What would a heart wholly true to God do?`,
  notYet: 'That is the way Solomon’s heart turned. Choose again.',
  offer: (n) => {
    const options = [
      { id: `true-${n + 1}`, text: CROSSROADS[n]!.right },
      { id: `turned-${n + 1}`, text: CROSSROADS[n]!.wrong },
    ]
    return n % 2 ? options.reverse() : options
  },
  // A lamp lights for each true choice.
  live(placed, t) {
    const live: Record<string, number> = {}
    CROSSROADS.forEach((_, i) => (live[`actor:lamp-${i + 1}.opacity`] = i < placed - 1 ? 1 : i === placed - 1 ? Math.min(1, t) : 0))
    return live
  },
})
