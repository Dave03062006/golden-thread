import { ORACLE, STAR } from '../../content/levels/12-forty-years-in-the-wilderness/episode-8'
import { inOrder } from '../in-order'

/**
 * A star out of Jacob (Level 12 script, Episode 8): memory. The night sky over the plains of
 * Moab. Balaam's last oracle is written in the stars, but some words are missing: phrase by
 * phrase, the player chooses the missing word, and with each one another star lights up,
 * until the bright star rises, with a king's scepter below it. A wrong word gets a gentle
 * "not quite"; in gentle mode the right word glows.
 */

export const aStarOutOfJacob = inOrder({
  id: 'a-star-out-of-jacob',
  steps: ORACLE.map((o) => ({ id: o.word, text: o.word, note: o.line.replace('___', o.word) })),
  question: (n) => `“${ORACLE[n]!.line}” Which word is missing?`,
  notYet: 'Not quite. Listen to Balaam’s words again.',
  live(placed, t) {
    const live: Record<string, number> = {}
    ORACLE.forEach((o, i) => (live[`actor:${o.star}.opacity`] = i < placed - 1 ? 1 : i === placed - 1 ? t : 0))
    // With the last word, the bright star rises, and the scepter below it.
    const all = placed === ORACLE.length ? t : 0
    live[`actor:${STAR.id}.opacity`] = all
    live['actor:scepter.opacity'] = 0.9 * all
    return live
  },
})
