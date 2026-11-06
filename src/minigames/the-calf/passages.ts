import type { TranslationId } from '../../content/bible/verses'
import type { PassagePart } from '../framework'

/**
 * The words of "The true words and the twisted" (Level 10 script, Episode 4): what the
 * people and Aaron said before the golden calf (Exodus 32:4–5), cut into parts so the three
 * that twist God's word from the mountain (Exodus 20:2–3) can be tapped. The parts of each
 * line, put together, are the exact words of the verse in that translation; a test checks this.
 */

export interface CalfLine {
  speaker: string
  /** The verse these words come from. */
  ref: string
  parts: PassagePart[]
}

/** The three twists, and what each one does to God's word. */
export const TWISTS: Record<string, { name: string; explanation: string }> = {
  'your-gods': {
    name: 'These are your gods',
    explanation: 'A calf of gold, made by their own hands, in place of the one God: “You shall have no other gods before me.”',
  },
  'brought-you-up': {
    name: 'who brought you up out of the land of Egypt',
    explanation: 'God’s own words, given to an idol. It was the LORD who brought them out of Egypt, not a thing they had made.',
  },
  feast: {
    name: 'a feast to the LORD',
    explanation: 'Calling a feast for an idol by God’s holy name: mixing the true God with a false one.',
  },
}

const words = (id: string, text: string): PassagePart => ({ id, text, kind: 'words' })
const twist = (id: keyof typeof TWISTS & string, text: string): PassagePart => ({ id, text, kind: 'twist' })
const mark = (id: string, text: string): PassagePart => ({ id, text, kind: 'mark' })

export const CALF_LINES: Record<TranslationId, CalfLine[]> = {
  rsv: [
    {
      speaker: 'The people',
      ref: 'EXO 32:4',
      parts: [mark('q1', '“'), twist('your-gods', 'These are your gods'), words('o-israel', ', O Israel, '), twist('brought-you-up', 'who brought you up out of the land of Egypt'), mark('q2', '!”')],
    },
    {
      speaker: 'Aaron',
      ref: 'EXO 32:5',
      parts: [words('tomorrow', '“Tomorrow shall be '), twist('feast', 'a feast to the LORD'), mark('q3', '.”')],
    },
  ],
  dra: [
    {
      speaker: 'The people',
      ref: 'EXO 32:4',
      parts: [twist('your-gods', 'These are thy gods'), words('o-israel', ', O Israel, '), twist('brought-you-up', 'that have brought thee out of the land of Egypt'), mark('q2', '.')],
    },
    {
      speaker: 'Aaron',
      ref: 'EXO 32:5',
      parts: [words('tomorrow', 'To morrow is '), twist('feast', 'the solemnity of the Lord'), mark('q3', '.')],
    },
  ],
}
