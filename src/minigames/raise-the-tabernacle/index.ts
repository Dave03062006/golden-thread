import { PIECE_NAMES, RAISE, RAISED, RISE_FROM } from '../../content/levels/11-the-tabernacle-and-the-holy-life/episode-2'
import { inOrder } from '../in-order'

/**
 * Raise the tabernacle (Level 11 script, Episode 2): building and stacking. The bare ground
 * in the middle of the camp, and the pieces Bezalel made. The player raises the tabernacle
 * in the order of Exodus 40, choosing at each step which piece comes next: the frames, the
 * coverings, the ark, the veil, the table, the lampstand, the altar of incense, the screen
 * for the door, the altar of burnt offering, the laver, and last the hangings of the court.
 * Each piece rises into its place, "as the LORD had commanded Moses." A wrong choice gets a
 * gentle "not yet"; in gentle mode the piece that comes next glows.
 */

export const raiseTheTabernacle = inOrder({
  id: 'raise-the-tabernacle',
  steps: RAISED.map((r) => ({ id: r.piece, text: PIECE_NAMES[r.piece], note: 'As the LORD had commanded Moses.' })),
  question: (n) => (n === 0 ? 'What does Moses set up first?' : 'What comes next?'),
  notYet: 'Not yet. Think of the inside first, then out toward the court.',
  live(placed, t) {
    const live: Record<string, number> = {}
    RAISED.forEach((r, i) => {
      const k = i < placed - 1 ? 1 : i === placed - 1 ? t : 0
      live[`actor:${r.id}.opacity`] = k
      live[`actor:${r.id}.y`] = RAISE.y + RISE_FROM * (1 - k)
    })
    return live
  },
})
