import { JUDGMENT, MOTHER, WOMEN } from '../../content/levels/21-solomon-and-the-temple/episode-2'
import { inOrder } from '../in-order'

/**
 * The living child (Level 21 script, Episode 2): a quiet judging interaction. The player helps
 * Solomon judge, one question at a time: who cries out to save the child, who says "divide it,"
 * and so who is the true mother. Each time, the player chooses one of the two women. At the end
 * the baby is placed in his mother's arms. A wrong choice gets a gentle "look again"; in gentle
 * mode the right woman glows.
 */

export const theLivingChild = inOrder({
  id: 'the-living-child',
  steps: JUDGMENT.map((j, i) => ({ id: `${j.answer}-${i + 1}`, text: WOMEN[j.answer], note: j.note })),
  question: (n) => JUDGMENT[n]!.question,
  notYet: 'Look again. Which woman’s heart yearns for the child?',
  offer: (n) => (['first', 'other'] as const).map((w) => ({ id: `${w}-${n + 1}`, text: WOMEN[w] })),
  // The baby goes to his mother at the end.
  live: (placed, t): Record<string, number> => (placed === JUDGMENT.length ? { 'actor:baby.x': 0.64 + (MOTHER.x + 0.02 - 0.64) * Math.min(1, t) } : {}),
})
