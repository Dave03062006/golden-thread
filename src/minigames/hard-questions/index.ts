import { RIDDLES } from '../../content/levels/21-solomon-and-the-temple/episode-5'
import { inOrder } from '../in-order'

/**
 * Hard questions (Level 21 script, Episode 5): riddles. The Queen of Sheba asks about the things
 * Solomon spoke of, "from the cedar… to the hyssop," the beasts, the birds and the fish; for each
 * riddle the player chooses the answer from three, and it appears in the hall. A wrong answer gets
 * a gentle "think again"; in gentle mode the right one glows.
 */

export const hardQuestions = inOrder({
  id: 'hard-questions',
  steps: RIDDLES.map((r) => ({ id: r.id, text: r.answer, note: '“There was nothing hidden from the king which he could not explain to her.”' })),
  question: (n) => `The queen asks: “${RIDDLES[n]!.riddle}”`,
  notYet: 'Think again. Solomon looked closely at God’s world.',
  offer: (n) => {
    const r = RIDDLES[n]!
    const options = [{ id: r.id, text: r.answer }, ...r.wrong.map((w, k) => ({ id: `${r.id}-wrong-${k + 1}`, text: w }))]
    const turn = n % options.length
    return [...options.slice(turn), ...options.slice(0, turn)]
  },
  // Each answer appears in the hall.
  live(placed, t) {
    const live: Record<string, number> = {}
    RIDDLES.forEach((r, i) => (live[`actor:${r.id}.opacity`] = i < placed - 1 ? 1 : i === placed - 1 ? Math.min(1, t) : 0))
    return live
  },
})
