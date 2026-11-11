import { inOrder } from '../in-order'

/**
 * The bleating of the sheep (Level 17 script, Episode 6): spot the twist. Saul tells his side
 * of the story, and the player chooses what really happened, each time. A wrong choice gets a
 * gentle "look again"; in gentle mode the true answer glows.
 */

const CLAIMS = [
  { id: 'performed', question: 'Saul says: “I have performed the commandment of the LORD.” But what does Samuel hear?', right: 'The bleating of the sheep and the lowing of the oxen', wrong: ['Silence in the camp', 'Songs of praise'] },
  { id: 'the-people', question: 'Saul says: “The people spared the best.” But who was the king, and responsible?', right: 'Saul himself', wrong: ['The people', 'Samuel'] },
  { id: 'to-sacrifice', question: 'Saul says they kept the best “to sacrifice to the LORD.” But what did God want more than sacrifice?', right: 'To obey his voice', wrong: ['More sheep and oxen', 'A bigger altar'] },
]

export const theBleatingOfTheSheep = inOrder({
  id: 'the-bleating-of-the-sheep',
  steps: CLAIMS.map((c) => ({ id: c.id, text: c.right, note: 'Each excuse falls apart.' })),
  question: (n) => CLAIMS[n]!.question,
  notYet: 'Look again: what really happened?',
  offer: (n) => {
    const c = CLAIMS[n]!
    const three = [{ id: c.id, text: c.right }, ...c.wrong.map((text, i) => ({ id: `${c.id}-not-${i + 1}`, text }))]
    const turn = n % three.length
    return [...three.slice(turn), ...three.slice(0, turn)]
  },
  live: () => ({}),
})
