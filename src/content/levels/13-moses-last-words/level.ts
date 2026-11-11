import { notLoaded } from '../../story-loading'
import type { Episode, Level, WhereWhen } from '../../types'
import { level13Music } from './music'
import { level13Quiz } from './quiz'

/**
 * Level 13 · Moses' Last Words (Deuteronomy 1; 6; 8; 18; 30–31; 34), from the approved Level 13
 * script (docs/scripts/level-13-moses-last-words.md). It completes Age IV.
 */

/** An episode's written details. Its set and scenes come with the level's story (./story.ts), loaded when the level is played. */
function built(fields: Omit<Episode, 'set' | 'scenes'>): Episode {
  return { ...fields, ...notLoaded() }
}

const where = (places: string[], notes: [string, string][]): WhereWhen => ({
  places,
  when: 'The fortieth year after the Passover, on the plains of Moab: perhaps the 1200s BC, perhaps earlier',
  notes: notes.map(([title, text]) => ({ title, text })),
})

export const level13: Level = {
  id: 'l13',
  number: 13,
  title: 'Moses’ Last Words',
  age: 'IV · The Covenant in the Desert',
  passage: 'DEU 1:1-34:12',
  music: level13Music,
  quiz: level13Quiz,
  story: () => import('./story'),
  // Mount Nebo, above the plains of Moab, where Moses saw the land and died.
  map: { at: { lat: 31.77, lon: 35.73 }, label: 'Mount Nebo' },
  // From the approved script's "Reflection and prayer".
  reflection: {
    verse: 'DEU 30:19',
    question: 'Moses’ last words to the people he loved were: remember what God has done; love him with all your heart; choose life. If you could leave just one piece of advice to someone you love, what would it be? And what does choosing life look like for you this week?',
    prayer: [
      'Lord God, you led your people every step of the way,',
      'and you have led me too.',
      'Help me to remember all you have done for me,',
      'and to love you with all my heart, and all my soul, and all my strength.',
      'Thank you for Jesus, the prophet like Moses,',
      'the way, the truth, and the life.',
      'Help me to choose life, every day,',
      'and to hold fast to you,',
      'until I see the land you have promised.',
      'Amen.',
    ],
    traditional: {
      name: 'The Shema, the words Jesus learned as a child',
      lines: ['Hear, O Israel: The Lord our God is one Lord;', 'and you shall love the Lord your God with all your heart,', 'and with all your soul, and with all your might.'],
    },
  },
  episodes: [
    built({
      id: 'l13-e1',
      number: 1,
      emblem: 'remember-the-way',
      title: 'Remember the Way',
      passage: 'DEU 8:1-8:18',
      minutes: 7,
      thread: { id: 'forty-days-in-the-wilderness', spot: 'manna-glow', fromScene: 'l13-e1-s2' },
      whereWhen: where(['plains-of-moab'], [
        ['Deuteronomy', 'The name means “the second law,” because Moses repeats the law to the new generation before they enter the land. It is written as Moses’ farewell speeches, given in the last weeks of his life.'],
        ['The plains of Moab', 'The wide plain on the east bank of the Jordan, just north of the Dead Sea, across from Jericho. Israel camped there at the end of the forty years (Level 12).'],
        ['“Your clothing did not wear out”', 'In forty years of walking, God cared even for their sandals (Deuteronomy 29:5).'],
      ]),
      read: ['DEU 8:1-18'],
    }),
    built({
      id: 'l13-e2',
      number: 2,
      emblem: 'shema',
      title: '“Hear, O Israel”',
      passage: 'DEU 6:1-6:25',
      minutes: 7,
      thread: { id: 'the-first-commandment', spot: 'doorpost-glow', fromScene: 'l13-e2-s2' },
      whereWhen: where(['plains-of-moab'], [
        ['The mezuzah', 'Jewish families still fix a small case to the right-hand doorpost of their homes, holding a tiny scroll with the Shema, and many touch it as they go in and out.'],
        ['Frontlets', 'Small leather boxes with the words inside, worn on the forehead and the arm during prayer, called tefillin or phylacteries (Matthew 23:5).'],
        ['“With all your might”', 'The Hebrew word means “very much”: love God not a little, but completely.'],
      ]),
      read: ['DEU 6:1-25'],
    }),
    built({
      id: 'l13-e3',
      number: 3,
      emblem: 'hands-on-joshua',
      title: 'A Prophet Like Moses',
      passage: 'DEU 18:15-18:19',
      minutes: 7,
      thread: { id: 'a-prophet-like-moses', spot: 'moses-glow', fromScene: 'l13-e3-s1' },
      whereWhen: where(['plains-of-moab'], [
        ['A hundred and twenty years', 'Moses lived forty years in Egypt as a prince, forty in Midian as a shepherd, and forty leading Israel in the wilderness (Acts 7:23, 30, 36).'],
        ['Joshua', 'Moses’ helper since the battle with Amalek (Level 9), one of the two faithful spies (Level 12), and now the leader who will bring the people into the land (Level 14).'],
        ['The book of the law', 'Moses wrote the law in a book and gave it to the priests, to be kept beside the ark of the covenant and read aloud to all the people every seven years (Deuteronomy 31:9–13, 26).'],
      ]),
      read: ['DEU 18:15-19', 'DEU 31:1-8', 'DEU 31:23-29'],
    }),
    built({
      id: 'l13-e4',
      number: 4,
      emblem: 'two-roads',
      title: 'Choose Life',
      passage: 'DEU 30:11-30:20',
      minutes: 6,
      thread: { id: 'choose-life', spot: 'life-glow', fromScene: 'l13-e4-s2' },
      whereWhen: where(['plains-of-moab'], [
        ['“Heaven and earth to witness”', 'Covenants in the ancient world were sworn before witnesses. Moses calls on the whole of creation to witness the people’s choice.'],
        ['Not in heaven, nor beyond the sea', 'Saint Paul quotes these verses to say that the word is near us in Christ: “if you confess with your lips that Jesus is Lord… you will be saved” (Romans 10:6–9).'],
        ['The two ways', 'One of the oldest Christian writings, the Didache (about AD 100), begins: “There are two ways, one of life and one of death.”'],
      ]),
      read: ['DEU 30:11-20'],
    }),
    built({
      id: 'l13-e5',
      number: 5,
      emblem: 'mount-nebo',
      title: 'Moses Sees the Land',
      passage: 'DEU 34:1-34:12',
      minutes: 8,
      thread: { id: 'moses-in-the-land', spot: 'land-glow', fromScene: 'l13-e5-s1' },
      whereWhen: where(['nebo'], [
        ['Mount Nebo', 'A ridge in Jordan, about 700 meters high, looking out over the Dead Sea and the Jordan valley. On a clear day you can see Jericho, Bethlehem and the Mount of Olives. A church stands on the top today, and Saint John Paul II prayed there in the year 2000.'],
        ['Pisgah', 'The name of the top of the ridge.'],
        ['“No man knows the place of his burial”', 'Moses’ grave was never found. The letter of Jude mentions an old tradition that the archangel Michael argued with the devil over Moses’ body (Jude 1:9).'],
        ['The end of the Torah', 'Deuteronomy is the last of the five books of Moses, the Torah. The story goes on in the book of Joshua (Level 14).'],
      ]),
      read: ['DEU 34:1-12'],
    }),
  ],
}
