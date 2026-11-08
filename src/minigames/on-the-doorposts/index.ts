import { MEZUZAH, WORDS } from '../../content/levels/13-moses-last-words/episode-2'
import { inOrder } from '../in-order'

/**
 * On the doorposts (Level 13 script, Episode 2): memory. The doorpost of a family's house,
 * and the words "Hear, O Israel: The LORD our God is one LORD; and you shall love the LORD
 * your God with all your heart, and with all your soul, and with all your might," with some
 * words missing. One by one the player chooses each missing word, and it is carved into the
 * wood. When the words are complete, the little case of the mezuzah is set on the doorpost.
 * A wrong word gets a gentle "not quite"; in gentle mode the right word glows.
 */

export const onTheDoorposts = inOrder({
  id: 'on-the-doorposts',
  steps: WORDS.map((w) => ({ id: w.word, text: w.word, note: w.line.replace('___', w.word) })),
  question: (n) => `${WORDS[n]!.line} Which word is missing?`,
  notYet: 'Not quite. Say the words over again, from the beginning.',
  live(placed, t) {
    const live: Record<string, number> = {}
    WORDS.forEach((w, i) => (live[`actor:${w.id}.opacity`] = i < placed - 1 ? 1 : i === placed - 1 ? t : 0))
    // With the last word, the mezuzah is set on the doorpost.
    live[`actor:${MEZUZAH}.opacity`] = placed === WORDS.length ? t : 0
    return live
  },
})
