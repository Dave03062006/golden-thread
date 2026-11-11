import { notLoaded } from '../../story-loading'
import type { Episode, Level, WhereWhen } from '../../types'
import { level14Music } from './music'
import { level14Quiz } from './quiz'

/**
 * Level 14 · Joshua (Joshua 1–8; 10; 14; 18; 21; 24), from the approved Level 14 script
 * (docs/scripts/level-14-joshua.md). It opens Age V, the Promised Land.
 */

/** An episode's written details. Its set and scenes come with the level's story (./story.ts), loaded when the level is played. */
function built(fields: Omit<Episode, 'set' | 'scenes'>): Episode {
  return { ...fields, ...notLoaded() }
}

const where = (places: string[], notes: [string, string][]): WhereWhen => ({
  places,
  when: 'After the forty years in the wilderness, as Israel enters the land: perhaps the 1200s BC, perhaps earlier',
  notes: notes.map(([title, text]) => ({ title, text })),
})

export const level14: Level = {
  id: 'l14',
  number: 14,
  title: 'Joshua',
  age: 'V · The Promised Land',
  passage: 'JOS 1:1-24:33',
  music: level14Music,
  quiz: level14Quiz,
  story: () => import('./story'),
  // Jericho, across the Jordan; then the road on to Shiloh and Shechem.
  map: {
    at: { lat: 31.87, lon: 35.44 },
    label: 'Jericho',
    route: [
      { at: { lat: 32.06, lon: 35.29 }, label: 'Shiloh' },
      { at: { lat: 32.21, lon: 35.28 }, label: 'Shechem' },
    ],
  },
  // From the approved script's "Reflection and prayer".
  reflection: {
    verse: 'JOS 24:15',
    question: 'God told Joshua, “Be strong and of good courage… the LORD your God is with you wherever you go.” What is a “wall” in your life that you can’t break down by yourself? And what would it mean, today, for you and your family to say, “We will serve the LORD”?',
    prayer: [
      'Lord God, you were with Joshua wherever he went;',
      'be with me too, and make me strong and brave.',
      'When I am afraid, remind me that you go before me.',
      'When I hide what I have done wrong, give me courage to bring it into the light.',
      'Thank you for Jesus, who opened the way',
      'through the waters of Baptism into your promised land.',
      'As for me and my house, we will serve you, Lord.',
      'Amen.',
    ],
    traditional: {
      name: 'The prayer of a family that chooses God',
      lines: ['As for me and my house, we will serve the Lord.', 'Lord, to whom shall we go? You have the words of eternal life.'],
    },
  },
  episodes: [
    built({
      id: 'l14-e1',
      number: 1,
      emblem: 'scarlet-cord',
      title: 'Rahab and the Spies',
      passage: 'JOS 1:1-2:24',
      minutes: 7,
      thread: { id: 'the-scarlet-cord', spot: 'cord-glow', fromScene: 'l14-e1-s3' },
      whereWhen: where(['jericho'], [
        ['Jericho', 'One of the oldest cities in the world, in an oasis just west of the Jordan, near the Dead Sea; people have lived there for more than ten thousand years. It is the “city of palm trees” that Moses saw from Nebo (Level 13).'],
        ['Flax', 'A plant grown for its fibers, which are spun into linen. Its cut stalks were laid out on flat roofs to dry in the sun.'],
        ['A house in the wall', 'Some cities had houses built between an inner and an outer wall, so a window could look out over the outside of the city.'],
      ]),
      read: ['JOS 1:1-9', 'JOS 2:1-24'],
    }),
    built({
      id: 'l14-e2',
      number: 2,
      emblem: 'stones-from-the-jordan',
      title: 'Crossing the Jordan',
      passage: 'JOS 3:1-5:15',
      minutes: 8,
      thread: { id: 'through-the-jordan', spot: 'ark-glow', fromScene: 'l14-e2-s1' },
      whereWhen: where(['gilgal'], [
        ['The Jordan in flood', 'In spring, snow melting on Mount Hermon fills the Jordan until it spills over its banks.'],
        ['Adam', 'The town where the water “rose up in a heap,” about 30 kilometers upstream. Landslides there have blocked the river in later times too, most recently in 1927, for about a day.'],
        ['Gilgal', 'The first camp in the promised land, near Jericho. It became a holy place, where Israel gathered for many years.'],
        ['The manna ceased', 'Forty years of bread from heaven ended the day after the people ate the grain of the land. God had kept feeding them until they no longer needed it.'],
      ]),
      read: ['JOS 3:1-4:24', 'JOS 5:10-15'],
    }),
    built({
      id: 'l14-e3',
      number: 3,
      emblem: 'walls-of-jericho',
      title: 'The Walls of Jericho',
      passage: 'JOS 6:1-6:27',
      minutes: 7,
      thread: { id: 'by-faith-the-walls-fell', spot: 'ark-glow', fromScene: 'l14-e3-s2' },
      whereWhen: where(['jericho'], [
        ['Rams’ horns', 'The shofar, a trumpet made from a ram’s horn, still blown in synagogues on the Jewish New Year (Level 11).'],
        ['“Devoted to the LORD for destruction”', 'In the wars of that time, a city and everything in it could be “devoted,” given wholly over to a god, so that no one took anything for himself. This is one of the hardest things in the Bible to read. The Church reads it in the light of Jesus, who taught us to love our enemies (Matthew 5:44), and sees in these battles a picture of the Christian’s fight: our enemies are not people, but sin and evil, which must be given up completely (Ephesians 6:12).'],
        ['The ruins of Jericho', 'Archaeologists have dug at Jericho for more than a century, and still debate when its walls fell.'],
      ]),
      read: ['JOS 6:1-27'],
    }),
    built({
      id: 'l14-e4',
      number: 4,
      emblem: 'lamp-in-the-tent',
      title: 'Achan and Ai',
      passage: 'JOS 7:1-8:35',
      minutes: 7,
      thread: { id: 'if-we-confess', spot: 'hidden-glow', fromScene: 'l14-e4-s2' },
      whereWhen: where(['ai'], [
        ['Ai', 'The name means “the ruin.” It stood on a hill east of Bethel, where Abraham once pitched his tent (Genesis 12:8; Level 3).'],
        ['A mantle from Shinar', 'A fine robe from Babylonia, the land of the tower of Babel (Level 2): something precious, and foreign.'],
        ['Mount Ebal and Mount Gerizim', 'Two mountains facing each other at Shechem. Moses had commanded that the blessings be read from one and the curses from the other (Deuteronomy 27).'],
      ]),
      read: ['JOS 7:1-26', 'JOS 8:30-35'],
    }),
    built({
      id: 'l14-e5',
      number: 5,
      emblem: 'sun-stands-still',
      title: 'The Sun Stands Still',
      passage: 'JOS 10:6-10:14',
      minutes: 6,
      thread: { id: 'if-god-is-for-us', spot: 'sun-glow', fromScene: 'l14-e5-s3' },
      whereWhen: where(['gibeon', 'gilgal'], [
        ['Gibeon', 'A town on a hill about 10 kilometers north of Jerusalem. Its people tricked Israel into making a treaty with them (Joshua 9), but Joshua kept the oath he had sworn.'],
        ['The Book of Jashar', 'An old book of songs and poems about Israel’s heroes, now lost. Joshua’s words to the sun come from a poem in it.'],
        ['“Sun, stand thou still”', 'No one knows exactly what happened that day. What the Bible wants us to remember is that God heard Joshua’s prayer.'],
      ]),
      read: ['JOS 10:6-14'],
    }),
    built({
      id: 'l14-e6',
      number: 6,
      emblem: 'twelve-portions',
      title: 'Dividing the Land',
      passage: 'JOS 14:6-21:45',
      minutes: 7,
      thread: { id: 'every-promise-yes', spot: 'land-glow', fromScene: 'l14-e6-s3' },
      whereWhen: where(['gilgal', 'shiloh'], [
        ['Caleb', 'One of the two faithful spies (Level 12). At eighty-five, he asked for the hardest part of the land, the hill country held by the giants, and won it. Hebron became his.'],
        ['Shiloh', 'A town in the hills of Ephraim where the tabernacle stood for many generations, until the time of Samuel (Level 17).'],
        ['Casting lots', 'Like drawing straws, but believed to show God’s choice (Proverbs 16:33). The apostles cast lots to choose Matthias (Acts 1:26).'],
        ['The Levites', 'The tribe of Levi received no land of its own, but towns among all the others, “for the LORD is their inheritance.”'],
      ]),
      read: ['JOS 14:6-14', 'JOS 18:1-10', 'JOS 21:43-45'],
    }),
    built({
      id: 'l14-e7',
      number: 7,
      emblem: 'stone-under-the-oak',
      title: '“As for Me and My House”',
      passage: 'JOS 24:1-24:33',
      minutes: 7,
      thread: { id: 'to-whom-shall-we-go', spot: 'stone-glow', fromScene: 'l14-e7-s3' },
      whereWhen: where(['shechem'], [
        ['Shechem', 'Where God first promised the land to Abraham (Genesis 12:6–7; Level 3), and where Jacob buried his family’s idols under the oak (Genesis 35:4; Level 4). Joseph’s bones were buried here too (Joshua 24:32).'],
        ['A hundred and ten years', 'The same age at which Joseph died (Genesis 50:26; Level 5).'],
        ['Joshua and Jesus', 'In Hebrew, Joshua is Yehoshua, “the LORD saves.” In Greek it became Iēsous: Jesus.'],
      ]),
      read: ['JOS 24:1-33'],
    }),
  ],
}
