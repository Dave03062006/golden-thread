import { RODS } from '../../content/levels/12-forty-years-in-the-wilderness/episode-4'
import { inOrder } from '../in-order'

/**
 * The twelve rods (Level 12 script, Episode 4): matching and naming. The leaders of the twelve
 * tribes come one by one with their staffs, each marked with its tribe's sign: Judah's lion,
 * Issachar's donkey, Zebulun's ship, and the rest, and Levi's with Aaron's name. The player
 * matches each leader with his tribe's staff, and it is laid before the ark. A wrong match gets
 * a gentle "not that one"; in gentle mode the right staff glows. (In the morning, the story
 * shows Aaron's rod blossomed.)
 */

export const theTwelveRods = inOrder({
  id: 'the-twelve-rods',
  steps: RODS.map((r) => ({ id: r.tribe, text: r.sign, note: `The staff of ${r.tribe}, laid before the LORD.` })),
  question: (n) => `The leader of ${RODS[n]!.tribe} comes with his staff. Which sign is his?`,
  notYet: 'Not that one. Each tribe has its own sign.',
  live(placed, t) {
    const live: Record<string, number> = {}
    RODS.forEach((r, i) => (live[`actor:${r.id}.opacity`] = i < placed - 1 ? 1 : i === placed - 1 ? t : 0))
    return live
  },
})
