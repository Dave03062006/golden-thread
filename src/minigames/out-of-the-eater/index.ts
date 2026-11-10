import { inOrder } from '../in-order'

/**
 * Out of the eater (Level 15 script, Episode 5): decoding. Samson's riddle at his wedding
 * feast, "Out of the eater came something to eat. Out of the strong came something sweet."
 * The player works out each part of it in turn, from a few guesses: the eater, what came out
 * of it, the strong, and the sweet. Wrong guesses get a groan from the Philistines; in gentle
 * mode the right answer glows. The answer is their reply: "What is sweeter than honey? What is
 * stronger than a lion?"
 */

const PARTS = [
  { id: 'eater', question: '“Out of the eater…” What is the eater?', text: 'A lion', note: 'A young lion, which roared at Samson in the vineyards.', wrong: ['A bear', 'An eagle'] },
  { id: 'to-eat', question: '“…came something to eat.” What came out of it?', text: 'Honey, made by bees', note: 'A swarm of bees, and honey, in the lion’s body.', wrong: ['Bread', 'Figs'] },
  { id: 'strong', question: '“Out of the strong…” What is the strong?', text: 'The lion again', note: '“What is stronger than a lion?”', wrong: ['An ox', 'Samson himself'] },
  { id: 'sweet', question: '“…came something sweet.” What is the sweet?', text: 'The honey again', note: '“What is sweeter than honey?” But Samson had touched a dead body, and broken his promise to God.', wrong: ['Grapes', 'Milk'] },
]

export const outOfTheEater = inOrder({
  id: 'out-of-the-eater',
  steps: PARTS.map((p) => ({ id: p.id, text: p.text, note: p.note })),
  question: (n) => PARTS[n]!.question,
  notYet: 'The Philistines groan. Not that one!',
  offer: (n) => {
    const p = PARTS[n]!
    const three = [{ id: p.id, text: p.text }, ...p.wrong.map((text, i) => ({ id: `${p.id}-guess-${i + 1}`, text }))]
    // The right answer moves from place to place, as in every play by choosing.
    const turn = n % three.length
    return [...three.slice(turn), ...three.slice(0, turn)]
  },
  live: () => ({}),
})
