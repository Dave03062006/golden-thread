import { DREAM, PRAYER } from '../../content/levels/21-solomon-and-the-temple/episode-1'
import { inOrder } from '../in-order'

/**
 * An understanding mind (Level 21 script, Episode 1): ordering and memory. In the dream at
 * Gibeon, God says, "Ask what I shall give you." The player puts Solomon's prayer in order: thanks,
 * humility, then the request for an understanding mind. Long life, riches and the death of his
 * enemies float by, unchosen. The light of the dream grows with each right choice; a wrong one
 * gets a gentle "not that"; in gentle mode the next part glows.
 */

export const anUnderstandingMind = inOrder({
  id: 'an-understanding-mind',
  steps: PRAYER.map((p, i) => ({ id: `prayer-${i + 1}`, text: p.text, note: i === PRAYER.length - 1 ? '“It pleased the Lord that Solomon had asked this.”' : 'Solomon prays on.' })),
  question: (n) => (n === 0 ? 'God says, “Ask what I shall give you.” How does Solomon begin?' : 'And then?'),
  notYet: 'Not that. Solomon asked for something better.',
  offer: (n) => {
    const options = [
      { id: `prayer-${n + 1}`, text: PRAYER[n]!.text },
      { id: `decoy-${n + 1}`, text: PRAYER[n]!.decoy },
      { id: `decoy-${((n + 1) % PRAYER.length) + 1}`, text: PRAYER[(n + 1) % PRAYER.length]!.decoy },
    ]
    const turn = n % options.length
    return [...options.slice(turn), ...options.slice(0, turn)]
  },
  live: (placed, t) => ({ [`actor:${DREAM}.opacity`]: 0.35 + (0.55 * (Math.max(0, placed - 1) + (placed > 0 ? Math.min(1, t) : 0))) / PRAYER.length }),
})
