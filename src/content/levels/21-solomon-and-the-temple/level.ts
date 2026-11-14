import { notLoaded } from '../../story-loading'
import type { Episode, Level, WhereWhen } from '../../types'
import { level21Music } from './music'
import { level21Quiz } from './quiz'

/**
 * Level 21 · Solomon and the Temple (1 Kings 1–11; 2 Chronicles 1–9), from the approved Level 21
 * script (docs/scripts/level-21-solomon-and-the-temple.md). The fifth level of Age VI.
 */

/** An episode's written details. Its set and scenes come with the level's story (./story.ts), loaded when the level is played. */
function built(fields: Omit<Episode, 'set' | 'scenes'>): Episode {
  return { ...fields, ...notLoaded() }
}

const where = (places: string[], notes: [string, string][]): WhereWhen => ({
  places,
  when: 'The reign of Solomon: about 970–931 BC',
  notes: notes.map(([title, text]) => ({ title, text })),
})

export const level21: Level = {
  id: 'l21',
  number: 21,
  title: 'Solomon and the Temple',
  age: 'VI · The Kingdom',
  passage: '1KI 1:1-11:43',
  music: level21Music,
  quiz: level21Quiz,
  story: () => import('./story'),
  // Jerusalem and its Temple, Gibeon, and Tyre in the north (Sheba lies beyond the map, far to the south).
  map: {
    at: { lat: 31.78, lon: 35.23 },
    label: 'Jerusalem',
    route: [
      { at: { lat: 31.85, lon: 35.18 }, label: 'Gibeon' },
      { at: { lat: 33.27, lon: 35.2 }, label: 'Tyre' },
    ],
  },
  // From the approved script's "Reflection and prayer".
  reflection: {
    verse: '1KI 3:9',
    question: 'If God said to you, “Ask what I shall give you,” what would you ask for? And is there anything in your life that is pulling your heart away from God, the way Solomon’s heart was pulled away?',
    prayer: [
      'Lord God, you gave Solomon a wise and understanding heart.',
      'Give me wisdom too, to know what is right,',
      'and the courage to do it.',
      'Make my heart a temple where you love to live,',
      'and keep it wholly true to you,',
      'all the days of my life.',
      'Thank you for Jesus, the wisdom of God,',
      'who is greater than Solomon.',
      'Amen.',
    ],
    traditional: {
      name: 'The old prayer to the Holy Spirit, the giver of wisdom',
      lines: ['Come, Holy Spirit, fill the hearts of your faithful,', 'and kindle in them the fire of your love.'],
    },
  },
  episodes: [
    built({
      id: 'l21-e1',
      number: 1,
      emblem: 'gift-of-wisdom',
      title: 'Solomon Asks for Wisdom',
      passage: '1KI 1:38-3:15',
      minutes: 8,
      thread: { id: 'ask-for-wisdom', spot: 'dream-glow', fromScene: 'l21-e1-s3' },
      whereWhen: where(['jerusalem', 'gibeon'], [
        ['About 970 BC', 'Solomon was a young man, perhaps twenty, when he became king.'],
        ['Gihon', 'The spring in the Kidron valley that gave Jerusalem its water. Kings of David’s family were anointed there.'],
        ['“Long live the king!”', 'Handel set the words of 1 Kings 1:38–40 to music in “Zadok the Priest” for the coronation of King George II in 1727. It has been sung at every British coronation since.'],
        ['Gibeon', 'A town a few kilometers north of Jerusalem, where the tabernacle of Moses then stood (2 Chronicles 1:3).'],
      ]),
      read: ['1KI 1:28-40', '1KI 2:1-4', '1KI 3:3-15'],
    }),
    built({
      id: 'l21-e2',
      number: 2,
      emblem: 'living-child',
      title: 'The Two Mothers',
      passage: '1KI 3:16-4:34',
      minutes: 7,
      thread: { id: 'the-wisdom-of-god', spot: 'child-glow', fromScene: 'l21-e2-s3' },
      whereWhen: where(['jerusalem'], [
        ['The king as judge', 'In Israel the king was the highest court. Anyone could bring their case to him, as these two poor women did.'],
        ['Three thousand proverbs', 'Many of them are collected in the book of Proverbs, the subject of Level 22.'],
        ['“From the cedar… to the hyssop”', 'Solomon spoke about the whole of creation, from the tallest tree in Lebanon to the little hyssop that grows out of a wall (Level 19).'],
      ]),
      read: ['1KI 3:16-28', '1KI 4:29-34'],
    }),
    built({
      id: 'l21-e3',
      number: 3,
      emblem: 'temple-stones',
      title: 'Building the Temple',
      passage: '1KI 5:1-6:38',
      minutes: 8,
      thread: { id: 'living-stones', spot: 'stone-glow', fromScene: 'l21-e3-s2' },
      whereWhen: where(['jerusalem', 'tyre'], [
        ['About 966 BC', 'Solomon began the Temple in the fourth year of his reign, and finished it seven years later.'],
        ['Mount Moriah', 'Where Abraham was ready to offer Isaac (Level 3), and where David built his altar on Araunah’s threshing floor (Level 19; 2 Chronicles 3:1).'],
        ['The cedars of Lebanon', 'Tall, fragrant, long-lasting trees from the mountains north of Israel; the cedar is still on the flag of Lebanon.'],
        ['The size of the Temple', 'Sixty cubits long and twenty wide, about 30 by 10 meters: twice the size of the tabernacle (Level 11), and built on the same plan.'],
      ]),
      read: ['1KI 5:1-12', '1KI 6:1-38'],
    }),
    built({
      id: 'l21-e4',
      number: 4,
      emblem: 'cloud-of-glory',
      title: 'The Glory Fills the House',
      passage: '1KI 8:1-8:66',
      minutes: 9,
      thread: { id: 'the-dwelling-of-god', spot: 'cloud-glow', fromScene: 'l21-e4-s1' },
      whereWhen: where(['jerusalem'], [
        ['The dedication', 'At the feast of Booths, in the seventh month (1 Kings 8:2), probably in 959 BC.'],
        ['The two tables of stone', 'The Ten Commandments given to Moses at Horeb, or Sinai (Level 10).'],
        ['The cherubim', 'Two golden angels, each ten cubits (about 5 meters) high, whose wings stretched from wall to wall over the ark.'],
        ['“For he is good”', 'The song of the Levites, “for his steadfast love endures for ever,” is the refrain of Psalm 136.'],
      ]),
      read: ['1KI 8:1-30', '2CH 7:1-3'],
    }),
    built({
      id: 'l21-e5',
      number: 5,
      emblem: 'queens-gifts',
      title: 'The Queen of Sheba',
      passage: '1KI 10:1-10:29',
      minutes: 7,
      thread: { id: 'greater-than-solomon', spot: 'gold-glow', fromScene: 'l21-e5-s3' },
      whereWhen: where(['jerusalem', 'sheba'], [
        ['Sheba', 'A rich kingdom in the far south of Arabia, in today’s Yemen, famous for frankincense and myrrh. Some traditions place it in Ethiopia.'],
        ['Solomon’s throne', 'Made of ivory and overlaid with gold, with six steps and twelve lions (1 Kings 10:18–20).'],
        ['A hundred and twenty talents of gold', 'About four tonnes of gold.'],
      ]),
      read: ['1KI 10:1-13', 'MAT 12:42'],
    }),
    built({
      id: 'l21-e6',
      number: 6,
      emblem: 'twelve-pieces',
      title: 'Solomon’s Heart Turns Away',
      passage: '1KI 11:1-11:43',
      minutes: 7,
      contentNote: 'This is a sad story: the wise king turns away from God. His worship of other gods is told simply.',
      thread: { id: 'two-masters', spot: 'cloak-glow', fromScene: 'l21-e6-s3' },
      whereWhen: where(['jerusalem', 'mount-of-olives'], [
        ['About 931 BC', 'Solomon died after reigning forty years, like his father David.'],
        ['The hill east of Jerusalem', 'The Mount of Olives (Level 19). Later it was called “the mount of corruption” because of Solomon’s shrines (2 Kings 23:13).'],
        ['Ahijah of Shiloh', 'A prophet from the town where the tabernacle had stood (Level 17).'],
        ['Jeroboam', 'A capable young man whom Solomon had put in charge of the forced labor of the northern tribes. He will be the first king of the north (Level 23).'],
      ]),
      read: ['1KI 11:1-13', '1KI 11:26-43'],
    }),
  ],
}
