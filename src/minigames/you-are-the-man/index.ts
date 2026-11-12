import { CARDS } from '../../content/levels/19-davids-sin-and-repentance/episode-2'
import { inOrder } from '../in-order'

/**
 * You are the man (Level 19 script, Episode 2): matching. The parts of Nathan's story come one by
 * one, and the player matches each to the real person it stands for: the traveler, the poor man,
 * the little ewe lamb, and last the rich man, who turns around and shows David's own face. A
 * wrong match gets a gentle "look again"; in gentle mode the right one glows.
 */

export const youAreTheMan = inOrder({
  id: 'you-are-the-man',
  steps: CARDS.map((c) => ({ id: c.id, text: c.is, note: c.id === 'rich-man' ? '“You are the man.”' : 'Nathan’s story was about real people.' })),
  question: (n) => `In Nathan’s story: ${CARDS[n]!.card}. Who is it really?`,
  notYet: 'Look again. Who in David’s story does this stand for?',
  offer: (n) => {
    const others = CARDS.filter((_, i) => i !== n)
    const options = [CARDS[n]!, others[n % others.length]!, others[(n + 1) % others.length]!].map((c) => ({ id: c.id, text: c.is }))
    const turn = n % options.length
    return [...options.slice(turn), ...options.slice(0, turn)]
  },
  // The rich man turns around, and wears David's face.
  live: (placed, t): Record<string, number> => (placed === CARDS.length ? { 'actor:rich-man.opacity': 1 - Math.min(1, t), 'actor:rich-david.opacity': Math.min(1, t) } : {}),
})
