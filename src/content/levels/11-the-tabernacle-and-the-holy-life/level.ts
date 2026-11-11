import { notLoaded } from '../../story-loading'
import type { Episode, Level, WhereWhen } from '../../types'
import { level11Music } from './music'
import { level11Quiz } from './quiz'

/**
 * Level 11 · The Tabernacle and the Holy Life (Exodus 25–31; 35–40; Leviticus 1–3; 6; 8–9;
 * 16; 19; 23), from the approved Level 11 script
 * (docs/scripts/level-11-the-tabernacle-and-the-holy-life.md).
 */

/** An episode's written details. Its set and scenes come with the level's story (./story.ts), loaded when the level is played. */
function built(fields: Omit<Episode, 'set' | 'scenes'>): Episode {
  return { ...fields, ...notLoaded() }
}

const where = (notes: [string, string][]): WhereWhen => ({
  places: ['horeb'],
  when: 'At Mount Sinai, in the year after the Passover: perhaps the 1200s BC, perhaps earlier',
  notes: notes.map(([title, text]) => ({ title, text })),
})

export const level11: Level = {
  id: 'l11',
  number: 11,
  title: 'The Tabernacle and the Holy Life',
  age: 'IV · The Covenant in the Desert',
  passage: 'EXO 25:1-40:38',
  music: level11Music,
  quiz: level11Quiz,
  story: () => import('./story'),
  // The tabernacle was made and set up at Mount Sinai, where Level 10 already stands. Its marker
  // sits just to the south-east of Level 10's, in the camp below the mountain, so the two don't cover each other.
  map: { at: { lat: 28.2, lon: 34.35 }, label: 'The tabernacle at Sinai' },
  // From the approved script's "Reflection and prayer".
  reflection: {
    verse: 'EXO 25:8',
    question: 'God did not want to live far away from his people, but in the middle of their camp. Through Baptism, your heart is his dwelling place. Where in your day do you make room for him? And who is the neighbor he is asking you to love this week?',
    prayer: [
      'Lord God, you came to live among your people,',
      'in a tent in the middle of their camp.',
      'Thank you for Jesus, our great high priest,',
      'who gave himself up for us once for all,',
      'and opened the way to you.',
      'Make my heart a place where you are glad to dwell.',
      'Help me to be holy, as you are holy,',
      'and to love my neighbor as myself.',
      'Amen.',
    ],
    traditional: {
      name: 'A prayer before the tabernacle',
      lines: ['O Sacrament most holy, O Sacrament divine,', 'all praise and all thanksgiving be every moment thine.'],
    },
  },
  episodes: [
    built({
      id: 'l11-e1',
      number: 1,
      emblem: 'tabernacle-plan',
      title: 'The Pattern of the Tabernacle',
      passage: 'EXO 25:1-25:9',
      minutes: 7,
      thread: { id: 'the-temple-of-his-body', spot: 'plan-glow', fromScene: 'l11-e1-s1' },
      whereWhen: where([
        ['The tabernacle', 'The word means “dwelling.” It was a tent about 13.5 meters long and 4.5 meters wide (30 cubits by 10), standing in a court of linen hangings about 45 meters by 22 (Exodus 27:18). It could be taken down and carried, so God went with his people on their journey.'],
        ['Acacia wood', 'One of the few trees that grow in the Sinai desert. Its wood is hard, and insects leave it alone.'],
        ['Bezalel', 'The grandson of Hur, perhaps the same Hur who held up Moses’ hands at Rephidim (Level 9).'],
      ]),
      read: ['EXO 25:1-9', 'EXO 35:20-36:7', 'EXO 39:32-43'],
    }),
    built({
      id: 'l11-e2',
      number: 2,
      emblem: 'mercy-seat',
      title: 'The Ark of the Covenant',
      passage: 'EXO 25:10-40:38',
      minutes: 8,
      thread: { id: 'the-ark-of-the-covenant', spot: 'ark-glow', fromScene: 'l11-e2-s1' },
      whereWhen: where([
        ['The ark', 'A chest about 1.1 meters long and 0.7 meters wide and high, carried on poles so that no one would touch it. Inside were the tablets of the covenant; later a jar of manna and Aaron’s rod were kept with it (Hebrews 9:4).'],
        ['The mercy seat', 'Its Hebrew name means “the place of atonement” (see Episode 5).'],
        ['What became of it?', 'The ark was lost when the Babylonians destroyed Jerusalem in 587 BC. The second book of Maccabees says the prophet Jeremiah hid it in a cave on the mountain where Moses saw the promised land (2 Maccabees 2:4–8).'],
        ['A lamp always burning', 'In every Catholic church, the Eucharist is kept in a tabernacle, with a lamp burning beside it.'],
      ]),
      read: ['EXO 25:10-40', 'EXO 40:1-38'],
    }),
    built({
      id: 'l11-e3',
      number: 3,
      emblem: 'twelve-stones',
      title: 'Priests and Their Vestments',
      passage: 'EXO 28:1-28:43',
      minutes: 7,
      thread: { id: 'the-great-high-priest', spot: 'breastpiece-glow', fromScene: 'l11-e3-s1' },
      whereWhen: where([
        ['The tribe of Levi', 'Moses and Aaron belonged to the tribe of Levi. Aaron’s sons became the priests, and the rest of the tribe served at the tabernacle (Numbers 3).'],
        ['The Urim and the Thummim', 'They were kept in the breastpiece and used to ask God’s will. No one knows today what they looked like.'],
        ['Golden bells', 'They hung on the hem of the robe, so that Aaron would be heard when he went into the holy place (Exodus 28:33–35).'],
        ['Vestments today', 'At Mass, priests wear vestments too: a white linen alb like Aaron’s coat, a stole and a chasuble.'],
      ]),
      read: ['EXO 28:1-38', 'LEV 8:1-13', 'LEV 9:22-23'],
    }),
    built({
      id: 'l11-e4',
      number: 4,
      emblem: 'altar-fire',
      title: 'Offerings and Sacrifices',
      passage: 'LEV 1:1-9:24',
      minutes: 6,
      thread: { id: 'a-fragrant-offering', spot: 'fire-glow', fromScene: 'l11-e4-s3' },
      whereWhen: where([
        ['Five kinds of offering', 'The burnt offering, given whole; the cereal offering of flour and oil; the peace offering, shared as a meal; and the sin offering and the guilt offering, asking forgiveness (Leviticus 1–7).'],
        ['Without blemish', 'Only the best of the flock or the herd was offered.'],
        ['The offering of the poor', 'A family too poor for a lamb could bring two turtledoves or two pigeons (Leviticus 12:8). Mary and Joseph brought this offering when they presented Jesus in the Temple (Luke 2:24).'],
        ['A hand on its head', 'The giver laid a hand on the offering, as if to say, “This stands for me.”'],
      ]),
      read: ['LEV 1:1-9', 'LEV 2:1-3', 'LEV 6:8-13', 'LEV 9:22-24'],
    }),
    built({
      id: 'l11-e5',
      number: 5,
      emblem: 'the-veil',
      title: 'The Day of Atonement',
      passage: 'LEV 16:1-16:34',
      minutes: 7,
      thread: { id: 'once-for-all', spot: 'veil-glow', fromScene: 'l11-e5-s1' },
      whereWhen: where([
        ['Yom Kippur', 'The Day of Atonement fell on the tenth day of the seventh month, in September or October. It is still the holiest day of the Jewish year, kept with fasting and prayer.'],
        ['Azazel', 'No one is sure what the word means: perhaps the name of a spirit of the desert, or “the goat that goes away.” William Tyndale translated it “scapegoat” in 1530, and that is where the English word comes from.'],
        ['The holy of holies', 'The inner room of the tabernacle, behind the veil, probably a perfect cube. It held only the ark.'],
      ]),
      read: ['LEV 16:1-34'],
    }),
    built({
      id: 'l11-e6',
      number: 6,
      emblem: 'first-sheaf',
      title: 'The Feasts of the Year',
      passage: 'LEV 23:1-23:44',
      minutes: 6,
      thread: { id: 'the-first-fruits', spot: 'sheaf-glow', fromScene: 'l11-e6-s2' },
      whereWhen: where([
        ['Three pilgrim feasts', 'Passover, the feast of weeks and the feast of booths. On each, every man was to go up to appear before the LORD (Deuteronomy 16:16), and Jesus went up to Jerusalem for them (John 2:13; 7:10).'],
        ['A calendar of moons', 'Each month began with the new moon. The first month fell in March or April, the seventh in September or October.'],
        ['The feast of booths', 'Jewish families still build shelters of branches each autumn. On the last day of this feast, Jesus stood up in the Temple and invited everyone who is thirsty to come to him and drink (John 7:37).'],
      ]),
      read: ['LEV 23:1-44'],
    }),
    built({
      id: 'l11-e7',
      number: 7,
      emblem: 'edges-of-the-field',
      title: '“Love Your Neighbor as Yourself”',
      passage: 'LEV 19:1-19:37',
      minutes: 6,
      thread: { id: 'who-is-my-neighbor', spot: 'stranger-glow', fromScene: 'l11-e7-s2' },
      whereWhen: where([
        ['“You shall be holy”', 'God says it again and again in Leviticus (11:44; 19:2; 20:26), and Saint Peter repeats it to Christians (1 Peter 1:16).'],
        ['Gleaning', 'The poor followed the reapers and picked up what was left. Ruth the Moabite will glean in the field of Boaz (Level 16).'],
        ['“Love your neighbor as yourself”', 'This is Leviticus 19:18. Jesus, Saint Paul and Saint James all quote it (Mark 12:31; Romans 13:9; James 2:8).'],
        ['The stranger', '“For you were strangers in the land of Egypt”: the people knew what it was to be foreigners.'],
      ]),
      read: ['LEV 19:1-18', 'LEV 19:32-37'],
    }),
  ],
}
