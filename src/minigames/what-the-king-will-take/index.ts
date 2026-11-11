import { TAKEN } from '../../content/levels/17-samuel-and-saul/episode-4'
import { inOrder } from '../in-order'

/**
 * What the king will take (Level 17 script, Episode 4): ordering. Samuel's warning, item by
 * item: the player chooses what the king will take next, in the order Samuel says it, and it is
 * taken from the village. A wrong choice gets a gentle "not yet"; in gentle mode the next glows.
 */

export const whatTheKingWillTake = inOrder({
  id: 'what-the-king-will-take',
  steps: TAKEN.map((t) => ({ id: t.id, text: t.text, note: '“These will be the ways of the king who will reign over you.”' })),
  question: (n) => (n === 0 ? '“He will take…” What does Samuel say first?' : '“He will take…” What next?'),
  notYet: 'Not yet. Listen to Samuel’s warning, in order.',
  live(placed, t) {
    const live: Record<string, number> = {}
    TAKEN.forEach((item, i) => (live[`actor:${item.id}.opacity`] = i < placed - 1 ? 0 : i === placed - 1 ? 1 - t : 1))
    return live
  },
})
