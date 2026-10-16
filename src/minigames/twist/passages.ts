import type { TranslationId } from '../../content/bible/verses'
import type { PassagePart } from '../framework'

/**
 * The words of "Spot the twist" (Level 1 script, Episode 3): what was said in the garden
 * (Genesis 3:1–5), cut into parts so the four that bend God's word (Genesis 2:16–17) can
 * be tapped. The parts of each line, put together, are the exact words of the verse in
 * that translation; a test checks this.
 */

export interface TwistLine {
  speaker: string
  /** The verse these words come from. */
  ref: string
  parts: PassagePart[]
}

/** The four twists, and what each one does to God's word. */
export const TWISTS: Record<string, { name: string; explanation: string }> = {
  'any-tree': {
    name: 'not … any tree',
    explanation: 'God gave every tree freely except one. The serpent made a generous gift sound like a total ban.',
  },
  touch: {
    name: 'neither shall you touch it',
    explanation: 'God never said this. Adding to God’s word made the command seem harsher than it was.',
  },
  'not-die': {
    name: 'You will not die',
    explanation: 'A flat contradiction of God’s warning.',
  },
  'like-god': {
    name: 'God knows … you will be like God',
    explanation: 'The suggestion that God is jealous, holding something back: a lie about God’s heart.',
  },
}

const words = (id: string, text: string): PassagePart => ({ id, text, kind: 'words' })
const twist = (id: keyof typeof TWISTS & string, text: string): PassagePart => ({ id, text, kind: 'twist' })
const mark = (id: string, text: string): PassagePart => ({ id, text, kind: 'mark' })

export const TWIST_LINES: Record<TranslationId, TwistLine[]> = {
  rsv: [
    {
      speaker: 'The serpent',
      ref: 'GEN 3:1',
      parts: [words('did-god-say', '“Did God say, ‘'), twist('any-tree', 'You shall not eat of any tree of the garden'), mark('q1', '’?”')],
    },
    {
      speaker: 'The woman',
      ref: 'GEN 3:2-3',
      parts: [
        words('we-may-eat', '“We may eat of the fruit of the trees of the garden;'),
        words('but-god-said', ' but God said, ‘You shall not eat of the fruit of the tree which is in the midst of the garden,'),
        mark('s1', ' '),
        twist('touch', 'neither shall you touch it'),
        words('lest', ', lest you die.’”'),
      ],
    },
    {
      speaker: 'The serpent',
      ref: 'GEN 3:4-5',
      parts: [
        mark('q2', '“'),
        twist('not-die', 'You will not die.'),
        mark('s2', ' For '),
        twist('like-god', 'God knows that when you eat of it your eyes will be opened, and you will be like God'),
        words('knowing', ', knowing good and evil.”'),
      ],
    },
  ],
  dra: [
    {
      speaker: 'The serpent',
      ref: 'GEN 3:1',
      parts: [words('did-god-say', 'Why hath God commanded you, that '), twist('any-tree', 'you should not eat of every tree of paradise'), mark('q1', '?')],
    },
    {
      speaker: 'The woman',
      ref: 'GEN 3:2-3',
      parts: [
        words('we-may-eat', 'Of the fruit of the trees that are in paradise we do eat:'),
        words('but-god-said', ' But of the fruit of the tree which is in the midst of paradise, God hath commanded us that we should not eat;'),
        mark('s1', ' '),
        twist('touch', 'and that we should not touch it'),
        words('lest', ', lest perhaps we die.'),
      ],
    },
    {
      speaker: 'The serpent',
      ref: 'GEN 3:4-5',
      parts: [
        twist('not-die', 'No, you shall not die the death.'),
        mark('s2', ' For '),
        twist('like-god', 'God doth know that in what day soever you shall eat thereof, your eyes shall be opened: and you shall be as Gods'),
        words('knowing', ', knowing good and evil.'),
      ],
    },
  ],
}
