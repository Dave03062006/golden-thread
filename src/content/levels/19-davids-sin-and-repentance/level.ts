import { notLoaded } from '../../story-loading'
import type { Episode, Level, WhereWhen } from '../../types'
import { level19Music } from './music'
import { level19Quiz } from './quiz'

/**
 * Level 19 · David's Sin and Repentance (2 Samuel 11–24; Psalm 51), from the approved Level 19
 * script (docs/scripts/level-19-davids-sin-and-repentance.md). The third level of Age VI.
 */

/** An episode's written details. Its set and scenes come with the level's story (./story.ts), loaded when the level is played. */
function built(fields: Omit<Episode, 'set' | 'scenes'>): Episode {
  return { ...fields, ...notLoaded() }
}

const where = (places: string[], notes: [string, string][]): WhereWhen => ({
  places,
  when: 'The later reign of David: about 990–970 BC',
  notes: notes.map(([title, text]) => ({ title, text })),
})

export const level19: Level = {
  id: 'l19',
  number: 19,
  title: 'David’s Sin and Repentance',
  age: 'VI · The Kingdom',
  passage: '2SA 11:1-24:25',
  music: level19Music,
  quiz: level19Quiz,
  story: () => import('./story'),
  // Jerusalem, with Rabbah across the Jordan, where Uriah fell, and Mahanaim, where David took refuge.
  map: {
    at: { lat: 31.78, lon: 35.23 },
    label: 'Jerusalem',
    route: [
      { at: { lat: 31.95, lon: 35.93 }, label: 'Rabbah' },
      { at: { lat: 31.78, lon: 35.24 }, label: 'The Mount of Olives' },
      { at: { lat: 32.18, lon: 35.62 }, label: 'Mahanaim' },
    ],
  },
  // From the approved script's "Reflection and prayer".
  reflection: {
    verse: 'PSA 51:10',
    question: 'David tried to hide what he had done, and it only grew worse, until Nathan helped him bring it into the light. Is there something you’ve been hiding that you could bring to God, perhaps in Confession? And who might need you to forgive them, as God forgave David?',
    prayer: [
      'Lord God, nothing is hidden from you,',
      'and still you love me.',
      'When I do wrong, don’t let me hide in the dark.',
      'Give me the courage to say, like David, “I have sinned,”',
      'and the joy of hearing that you have put my sin away.',
      'Wash me, and I shall be whiter than snow.',
      'Create in me a clean heart, O God,',
      'through Jesus, the Son of David, who gave everything for me.',
      'Amen.',
    ],
    traditional: {
      name: 'The Jesus Prayer, the blind man’s cry to the Son of David (Luke 18:38)',
      lines: ['Lord Jesus Christ, Son of God,', 'have mercy on me, a sinner.'],
    },
  },
  episodes: [
    built({
      id: 'l19-e1',
      number: 1,
      emblem: 'palace-lamp',
      title: 'Bathsheba and Uriah',
      passage: '2SA 11:1-11:27',
      minutes: 8,
      contentNote: 'King David does something very wrong: he takes another man’s wife, and then has her husband killed. It is told simply, and nothing is shown.',
      thread: { id: 'come-to-the-light', spot: 'lamp-glow', fromScene: 'l19-e1-s3' },
      whereWhen: where(['jerusalem', 'rabbah'], [
        ['About 990 BC', 'David had been king for about twenty years.'],
        ['Rabbah', 'The capital of the Ammonites, east of the Jordan. Today it is Amman, the capital of Jordan.'],
        ['Uriah the Hittite', 'A foreigner whose family came from the north, but who served Israel’s God: his name means “the LORD is my light.” He was one of David’s “thirty,” his bravest soldiers (2 Samuel 23:39).'],
        ['Joab', 'David’s nephew and the commander of his army.'],
      ]),
      read: ['2SA 11:1-27'],
    }),
    built({
      id: 'l19-e2',
      number: 2,
      emblem: 'ewe-lamb',
      title: 'Nathan’s Parable',
      passage: '2SA 12:1-12:14',
      minutes: 8,
      thread: { id: 'your-sins-are-forgiven', spot: 'hand-glow', fromScene: 'l19-e2-s3' },
      whereWhen: where(['jerusalem'], [
        ['Nathan the prophet', 'The same prophet who brought God’s promise to David, “your throne shall be established for ever” (Level 18).'],
        ['A ewe lamb', 'A young female sheep. Shepherds’ families sometimes raised an orphaned lamb at home, like a pet.'],
        ['“Fourfold”', 'God’s law said that a thief who killed a stolen sheep must pay back four sheep (Exodus 22:1). Zacchaeus promised the same when he met Jesus (Luke 19:8).'],
      ]),
      read: ['2SA 12:1-14'],
    }),
    built({
      id: 'l19-e3',
      number: 3,
      emblem: 'hyssop-and-snow',
      title: '“Have Mercy on Me, O God”',
      passage: '2SA 12:15-12:25',
      minutes: 8,
      contentNote: 'David’s baby son becomes ill and dies. It is told in a sentence, with David’s hope that he will see him again.',
      thread: { id: 'a-new-creation', spot: 'robe-glow', fromScene: 'l19-e3-s2' },
      whereWhen: where(['jerusalem'], [
        ['Psalm 51', 'Its title in the Bible says it is “a Psalm of David, when Nathan the prophet came to him.”'],
        ['Hyssop', 'A small bushy plant. Its branches were used to sprinkle the blood of the Passover lamb on the doorposts (Level 8), and a sponge on hyssop was lifted to Jesus on the cross (John 19:29).'],
        ['The Miserere', 'Psalm 51 is called the Miserere from its first word in Latin, “Have mercy.” Allegri’s setting was sung only in the Pope’s chapel and kept secret, until fourteen-year-old Mozart heard it in 1770 and wrote it out from memory.'],
        ['Solomon', 'His name sounds like shalom, the Hebrew for “peace.” He is the hero of Level 21.'],
      ]),
      read: ['2SA 12:15-25', 'PSA 51:1-19'],
    }),
    built({
      id: 'l19-e4',
      number: 4,
      emblem: 'olive-ascent',
      title: 'Absalom’s Rebellion',
      passage: '2SA 15:1-18:33',
      minutes: 9,
      contentNote: 'David’s son Absalom rebels against him, and is killed in the battle that follows. It is told in a sentence, and no fighting is shown.',
      thread: { id: 'across-the-kidron', spot: 'kidron-glow', fromScene: 'l19-e4-s2' },
      whereWhen: where(['jerusalem', 'mount-of-olives', 'mahanaim'], [
        ['Absalom', 'David’s third son. The Bible says there was no one in Israel as handsome, “from the sole of his foot to the crown of his head” (2 Samuel 14:25).'],
        ['The brook Kidron', 'The valley just east of Jerusalem, between the city and the Mount of Olives. In summer it is dry.'],
        ['The Mount of Olives', 'The long hill east of Jerusalem, covered with olive trees. Jesus prayed in the garden of Gethsemane on its slope, and rose into heaven from it (Acts 1:12).'],
        ['Mahanaim', 'A town east of the Jordan, where Jacob once saw the angels of God (Level 4).'],
      ]),
      read: ['2SA 15:1-37', '2SA 18:1-33'],
    }),
    built({
      id: 'l19-e5',
      number: 5,
      emblem: 'threshing-altar',
      title: 'David’s Last Words',
      passage: '2SA 22:1-24:25',
      minutes: 8,
      contentNote: 'A plague strikes Israel after David’s sin of pride. It is told in a sentence, and nothing is shown.',
      thread: { id: 'the-precious-blood', spot: 'altar-glow', fromScene: 'l19-e5-s3' },
      whereWhen: where(['jerusalem'], [
        ['About 970 BC', 'David reigned for forty years: seven at Hebron and thirty-three in Jerusalem. He died in his seventies, and Solomon became king (Level 21).'],
        ['The sweet psalmist of Israel', 'About half of the 150 Psalms are called “of David.” Level 20 is about the Psalms.'],
        ['The threshing floor', 'A flat rock on a windy hilltop where grain was beaten and winnowed, like Boaz’s (Level 16). Araunah was a Jebusite, one of the people who lived in Jerusalem before David took it.'],
        ['Fifty shekels of silver', 'About half a kilogram of silver.'],
      ]),
      read: ['2SA 22:1-20', '2SA 23:1-7', '2SA 24:1-25'],
    }),
  ],
}
