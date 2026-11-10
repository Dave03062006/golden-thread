import { FOUND, SHRINE } from '../../content/levels/15-the-judges/episode-6'
import { lerp } from '../../engine/motion'
import { inOrder } from '../in-order'

/**
 * In his own eyes (Level 15 script, Episode 6): spot the twist. Micah's shrine, with all he has
 * gathered in it. For each thing in turn, the player chooses the word of God's law that it
 * breaks (Levels 10, 11 and 13), and it fades. A wrong choice gets a gentle "look again"; in
 * gentle mode the right one glows.
 */

export const inHisOwnEyes = inOrder({
  id: 'in-his-own-eyes',
  steps: SHRINE.map((s) => ({ id: s.id, text: s.law, note: 'Micah meant it for the LORD. But it was right only in his own eyes.' })),
  question: (n) => `${SHRINE[n]!.name}. Which of God’s words does it go against?`,
  notYet: 'Look again: which word of God’s law is this one?',
  live(placed, t) {
    const live: Record<string, number> = {}
    SHRINE.forEach((s, i) => (live[`actor:${s.id}.opacity`] = i === placed - 1 && t < 1 ? lerp(1, FOUND, t) : i <= placed - 1 ? FOUND : 1))
    return live
  },
})
