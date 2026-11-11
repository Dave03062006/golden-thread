import { LINE } from '../../content/levels/16-ruth/episode-5'
import { inOrder } from '../in-order'

/**
 * Perez to David (Level 16 script, Episode 5): ordering, the genealogy at the end of the book of
 * Ruth. The player sets the names in order, generation by generation, from Perez to David, and
 * each one set grows a leaf on the family tree. A wrong choice gets a gentle "not yet"; in
 * gentle mode the next name glows.
 */

const NOTES: Record<string, string> = {
  Perez: 'A son of Judah and Tamar.',
  Nahshon: 'The leader of the tribe of Judah in the wilderness.',
  Salmon: 'The husband of Rahab of Jericho.',
  Boaz: 'The husband of Ruth.',
  Obed: 'The son born to Naomi.',
  David: 'The shepherd boy of Bethlehem, who will be king.',
}

export const perezToDavid = inOrder({
  id: 'perez-to-david',
  steps: LINE.map((l) => ({ id: l.id, text: l.name, note: NOTES[l.name] ?? `${l.name}, in the line of the promise.` })),
  question: (n) => (n === 0 ? 'The line begins with a son of Judah. Who comes first?' : `And after ${LINE[n - 1]!.name}?`),
  notYet: 'Not yet. Who comes next in the family line?',
  live(placed, t) {
    const live: Record<string, number> = {}
    LINE.forEach((l, i) => (live[`actor:${l.id}.opacity`] = i < placed - 1 ? 1 : i === placed - 1 ? t : 0))
    return live
  },
})
