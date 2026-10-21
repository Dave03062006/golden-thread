import type { Episode, Level, WhereWhen } from '../../types'
import { episode1 } from './episode-1'
import { episode2 } from './episode-2'
import { episode3 } from './episode-3'
import { episode4 } from './episode-4'
import { episode5 } from './episode-5'
import { episode6 } from './episode-6'
import { episode7 } from './episode-7'
import { level5Music } from './music'
import { level5Quiz } from './quiz'

/**
 * Level 5 · Joseph and His Brothers (Genesis 37–50), from the approved Level 5 script
 * (docs/scripts/level-05-joseph-and-his-brothers.md).
 */

/** An episode that's built: its written details, with its set and scenes. */
function built(story: Pick<Episode, 'set' | 'scenes'>, fields: Omit<Episode, 'set' | 'scenes'>): Episode {
  return { ...fields, ...story }
}

const where = (notes: [string, string][], places: string[] = []): WhereWhen => ({
  places,
  when: 'Joseph’s time: roughly 1700–1600 BC, as scholars estimate',
  notes: notes.map(([title, text]) => ({ title, text })),
})

export const level5: Level = {
  id: 'l05',
  number: 5,
  title: 'Joseph and His Brothers',
  age: 'II · The Patriarchs',
  passage: 'GEN 37:1-50:26',
  music: level5Music,
  quiz: level5Quiz,
  // Hebron, where Jacob sent Joseph from; then Joseph's road north to Shechem and Dothan,
  // down into Egypt, and his family's road to Goshen.
  map: {
    at: { lat: 31.53, lon: 35.1 },
    label: 'Hebron',
    route: [
      { at: { lat: 32.21, lon: 35.28 }, label: 'Shechem' },
      { at: { lat: 32.42, lon: 35.24 }, label: 'Dothan' },
      { at: { lat: 29.85, lon: 31.25 }, label: 'Egypt' },
      { at: { lat: 30.6, lon: 31.9 }, label: 'Goshen' },
    ],
  },
  // From the approved script's "Reflection and prayer".
  reflection: {
    verse: 'GEN 50:20',
    question: 'Joseph was treated unfairly for years, as a slave and a prisoner, and stayed faithful. In the end, God brought great good out of it, and Joseph forgave. Is there something hard in your life that you can trust God with? Is there someone you need to forgive?',
    prayer: [
      'God of Joseph,',
      'you were with him in the pit, in the prison and in the palace.',
      'Be with me when things are unfair, and keep me faithful,',
      'in small things and in great ones.',
      'When I can’t see what you are doing, help me trust',
      'that you can bring good even out of what is wrong.',
      'Give me a heart like Joseph’s, that forgives,',
      'and a heart like Judah’s, that gives itself for others,',
      'like Jesus, who forgave from the cross',
      'and gives himself to us as the Bread of life.',
      'Amen.',
    ],
    traditional: {
      name: 'Glory Be',
      lines: ['Glory be to the Father, and to the Son, and to the Holy Spirit.', 'As it was in the beginning, is now, and ever shall be, world without end. Amen.'],
    },
  },
  episodes: [
    built(episode1, {
      id: 'l05-e1',
      number: 1,
      emblem: 'silver',
      title: 'Sold for Silver',
      passage: 'GEN 37:1-36',
      minutes: 8,
      contentNote: 'In this episode Joseph’s brothers turn against him: they throw him into an empty pit and sell him. It is told gently, and no one is shown being hurt.',
      thread: { id: 'sold-for-silver', spot: 'the-silver', fromScene: 'l05-e1-s4' },
      whereWhen: where(
        [
          ['Dothan', 'A town on the trade road between the hills of Samaria and the coast, about 25 kilometers north of Shechem. Caravans of camels carried spices that way down to Egypt.'],
          ['Twenty shekels', 'About 230 grams of silver: the price of a young slave in those days.'],
        ],
        ['hebron', 'shechem', 'dothan'],
      ),
      read: ['GEN 37:1-36'],
    }),
    built(episode2, {
      id: 'l05-e2',
      number: 2,
      emblem: 'prison-window',
      title: 'Faithful in Potiphar’s House and in Prison',
      passage: 'GEN 39:1-40:23',
      minutes: 8,
      contentNote: 'In this episode Joseph is falsely accused and put in prison, and one of the prisoners he meets is put to death. It is told gently, and nothing is shown.',
      thread: { id: 'remember-me', spot: 'the-cup', fromScene: 'l05-e2-s4' },
      whereWhen: where(
        [
          ['Potiphar', 'His title, “captain of the guard,” may mean the chief of Pharaoh’s bodyguards, or the official in charge of the royal prisons.'],
          ['The butler', 'Pharaoh’s cupbearer tasted his wine and poured it for him. He had to be someone the king could trust with his life.'],
          ['Dreams in Egypt', 'Egyptians wrote books to explain dreams. Joseph didn’t use them: “Do not interpretations belong to God?”'],
        ],
        ['egypt'],
      ),
      read: ['GEN 39:1-40:23'],
    }),
    built(episode3, {
      id: 'l05-e3',
      number: 3,
      emblem: 'grain-ears',
      title: 'Pharaoh’s Dreams',
      passage: 'GEN 41:1-57',
      minutes: 8,
      thread: { id: 'do-whatever-he-tells-you', spot: 'the-ring', fromScene: 'l05-e3-s3' },
      whereWhen: where(
        [
          ['Pharaoh', 'The title means “great house,” the palace. Genesis doesn’t give this Pharaoh’s name.'],
          ['The Nile', 'Egypt’s harvests depended on the river’s yearly flood. A few years of low floods meant famine, and Egyptian records tell of such famines.'],
          ['The signet ring', 'It carried Pharaoh’s seal. Whoever wore it could sign and command with Pharaoh’s authority.'],
        ],
        ['egypt', 'nile'],
      ),
      read: ['GEN 41:1-57'],
    }),
    built(episode4, {
      id: 'l05-e4',
      number: 4,
      emblem: 'grain-sack',
      title: 'The Brothers Come for Grain',
      passage: 'GEN 42:1-43:34',
      minutes: 8,
      thread: { id: 'bread-for-the-world', spot: 'the-sacks', fromScene: 'l05-e4-s3' },
      whereWhen: where(
        [
          ['The journey', 'From Hebron to the cities of the Nile delta is about 400 kilometers: two or three weeks with loaded donkeys.'],
          ['Storehouses', 'Egyptian paintings show round granaries with ladders, filled from the top and emptied through a door at the bottom.'],
          ['Speaking through an interpreter', 'Joseph spoke to his brothers through an interpreter, so they didn’t know he understood them (Genesis 42:23).'],
        ],
        ['hebron', 'egypt'],
      ),
      read: ['GEN 42:1-43:34'],
    }),
    built(episode5, {
      id: 'l05-e5',
      number: 5,
      emblem: 'silver-cup',
      title: 'Benjamin and the Silver Cup',
      passage: 'GEN 44:1-34',
      minutes: 7,
      thread: { id: 'greater-love', spot: 'judahs-offer', fromScene: 'l05-e5-s3' },
      whereWhen: where(
        [
          ['A silver cup', 'Egyptian nobles drank from fine cups of silver and gold. The steward said Joseph used it for “divining,” for seeking hidden knowledge: part of Joseph’s disguise as an Egyptian lord.'],
          ['Judah', 'He now speaks for all his brothers. From his tribe will come King David, and Jesus.'],
        ],
        ['egypt'],
      ),
      read: ['GEN 44:1-34'],
    }),
    built(episode6, {
      id: 'l05-e6',
      number: 6,
      emblem: 'open-arms',
      title: '“I Am Joseph”',
      passage: 'GEN 45:1-46:34',
      minutes: 8,
      thread: { id: 'father-forgive-them', spot: 'open-arms', fromScene: 'l05-e6-s2' },
      whereWhen: where(
        [
          ['Goshen', 'A green region in the eastern Nile delta, good for flocks. Jacob’s family settled there, apart from the Egyptian cities.'],
          ['Seventy', 'Genesis counts seventy of Jacob’s family who came down into Egypt (Genesis 46:27). From these few, a nation would grow.'],
          ['Wagons', 'Carts were rare in Canaan’s hills; Egyptian wagons proved to Jacob that his son really was a great lord in Egypt.'],
        ],
        ['goshen', 'beersheba'],
      ),
      read: ['GEN 45:1-46:7', 'GEN 46:28-30'],
    }),
    built(episode7, {
      id: 'l05-e7',
      number: 7,
      emblem: 'scepter',
      title: 'Jacob’s Blessings',
      passage: 'GEN 47:1-50:26',
      minutes: 8,
      thread: { id: 'the-scepter-of-judah', spot: 'judahs-lion', fromScene: 'l05-e7-s3' },
      whereWhen: where(
        [
          ['The twelve tribes', 'Jacob’s sons became the tribes of Israel, though Joseph’s line became two tribes, Ephraim and Manasseh, and Levi became the tribe of priests.'],
          ['Embalming', 'Egyptians preserved the bodies of important people with oils and linen wrappings, over forty days (Genesis 50:3). Joseph was honored as a great Egyptian.'],
          ['Joseph’s bones', 'When Israel left Egypt, Moses took them along (Exodus 13:19), and they were buried at last at Shechem (Joshua 24:32).'],
        ],
        ['goshen', 'hebron', 'shechem'],
      ),
      read: ['GEN 48:1-49:33', 'GEN 50:15-26'],
    }),
  ],
}
