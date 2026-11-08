import { AARON, GARMENTS } from '../../content/levels/11-the-tabernacle-and-the-holy-life/episode-3'
import { inOrder } from '../in-order'

/**
 * Clothed for glory (Level 11 script, Episode 3): ordering. Aaron stands at the door of the
 * tent in plain linen, with the holy garments on a rail beside him, and the player dresses
 * him in the order of Leviticus 8:7–9: the coat, the girdle, the blue robe, the ephod, the
 * breastpiece, the turban, and last the golden plate, "Holy to the LORD." As each piece goes
 * on, its meaning is shown. A wrong choice gets a gentle "not yet"; in gentle mode the next
 * garment glows.
 */

export const clothedForGlory = inOrder({
  id: 'clothed-for-glory',
  steps: GARMENTS.map((g) => ({ id: g.kind, text: g.name, note: g.note })),
  question: (n) => (n === 0 ? 'What does Moses put on Aaron first?' : 'What does Aaron put on next?'),
  notYet: 'Not yet. Dress him from the inside out, and the golden plate last.',
  live(placed, t) {
    const live: Record<string, number> = {}
    // Each garment leaves the rail as it goes on, and Aaron is seen more and more in his holy garments.
    GARMENTS.forEach((g, i) => (live[`actor:${g.id}.opacity`] = i < placed - 1 ? 0 : i === placed - 1 ? 1 - t : 1))
    live[`actor:${AARON.robed}.opacity`] = placed === 0 ? 0 : (placed - 1 + t) / GARMENTS.length
    return live
  },
})
