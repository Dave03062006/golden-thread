import type { Episode, Level, WhereWhen } from '../../types'
import { episode1 } from './episode-1'
import { episode2 } from './episode-2'
import { episode3 } from './episode-3'
import { episode4 } from './episode-4'
import { episode5 } from './episode-5'
import { episode6 } from './episode-6'
import { level10Music } from './music'
import { level10Quiz } from './quiz'

/**
 * Level 10 · Sinai (Exodus 19–20; 24; 31:18–34:35), from the approved Level 10 script
 * (docs/scripts/level-10-sinai.md).
 */

/** An episode that's built: its written details, with its set and scenes. */
function built(story: Pick<Episode, 'set' | 'scenes'>, fields: Omit<Episode, 'set' | 'scenes'>): Episode {
  return { ...fields, ...story }
}

const where = (notes: [string, string][], places: string[]): WhereWhen => ({
  places,
  when: 'Three months after the Passover: perhaps the 1200s BC, perhaps earlier',
  notes: notes.map(([title, text]) => ({ title, text })),
})

export const level10: Level = {
  id: 'l10',
  number: 10,
  title: 'Sinai',
  age: 'IV · The Covenant in the Desert',
  passage: 'EXO 19:1-34:35',
  music: level10Music,
  quiz: level10Quiz,
  // Mount Sinai, where the people camped for nearly a year.
  map: { at: { lat: 28.54, lon: 33.97 }, label: 'Mount Sinai' },
  // From the approved script's "Reflection and prayer".
  reflection: {
    verse: 'EXO 34:6',
    question: 'God gave his commandments to a people he had already set free, and when they broke his covenant, he forgave them and gave it again. Which commandment is hardest for you to keep? Ask God for his mercy, and for the grace to love him and your neighbor.',
    prayer: [
      'Lord God, you set your people free,',
      'and gave them your commandments to keep them free.',
      'Help me to love you with all my heart,',
      'and to love my neighbor as myself.',
      'When I put other things in your place, forgive me,',
      'for you are merciful and gracious, slow to anger,',
      'and abounding in steadfast love.',
      'Thank you for Jesus, in whose face I see your glory,',
      'and for his blood of the new covenant.',
      'Amen.',
    ],
    traditional: {
      name: 'Glory Be',
      lines: ['Glory be to the Father, and to the Son, and to the Holy Spirit.', 'As it was in the beginning, is now, and ever shall be, world without end. Amen.'],
    },
  },
  episodes: [
    built(episode1, {
      id: 'l10-e1',
      number: 1,
      emblem: 'eagles-wings',
      title: 'The Mountain of Fire',
      passage: 'EXO 19:1-19:25',
      minutes: 8,
      thread: { id: 'a-holy-nation', spot: 'camp-glow', fromScene: 'l10-e1-s1' },
      whereWhen: where(
        [
          ['Mount Sinai', 'Also called Horeb. Tradition places it at Jebel Musa, “the mountain of Moses,” in the south of the Sinai peninsula, 2,285 meters high. At its foot stands Saint Catherine’s Monastery, one of the oldest monasteries in the world.'],
          ['On eagles’ wings', 'An eagle teaches its young to fly, and swoops beneath them when they fall. Deuteronomy 32:11 uses the same picture for the way God carried his people out of Egypt.'],
          ['The third month', 'Jewish tradition keeps the giving of the Law at the feast of Weeks, fifty days after Passover. Christians keep Pentecost on that same feast, fifty days after Easter.'],
        ],
        ['horeb'],
      ),
      read: ['EXO 19:1-25'],
    }),
    built(episode2, {
      id: 'l10-e2',
      number: 2,
      emblem: 'two-tablets',
      title: 'The Ten Commandments',
      passage: 'EXO 20:1-20:21',
      minutes: 9,
      thread: { id: 'love-god-and-neighbor', spot: 'tablets-glow', fromScene: 'l10-e2-s1' },
      whereWhen: where(
        [
          ['The “ten words”', 'The Bible calls the commandments “the ten words” (Exodus 34:28). The Catholic Church numbers them as Saint Augustine did, with two about coveting at the end.'],
          ['Two tablets', 'Tablets of stone, written “with the finger of God” (Exodus 31:18). Treaties of the time were written out twice, one copy for each side.'],
          ['The sabbath and the Lord’s Day', 'Christians keep Sunday holy, the day Jesus rose, as the Lord’s Day.'],
        ],
        ['horeb'],
      ),
      read: ['EXO 20:1-21'],
    }),
    built(episode3, {
      id: 'l10-e3',
      number: 3,
      emblem: 'twelve-pillars',
      title: 'The Blood of the Covenant',
      passage: 'EXO 24:1-24:18',
      minutes: 8,
      thread: { id: 'blood-of-the-covenant', spot: 'basin-glow', fromScene: 'l10-e3-s2' },
      whereWhen: where(
        [
          ['A covenant', 'A solemn promise binding two sides together, like a marriage or a treaty. God promises to be their God; the people promise to keep his word.'],
          ['Blood', 'In the Bible, blood stands for life. Sprinkled on the altar (God’s side) and on the people, it bound them together in one life.'],
          ['Forty days and forty nights', 'Moses stays on the mountain forty days. Elijah will walk forty days to the same mountain (1 Kings 19:8), and Jesus will fast forty days in the desert.'],
        ],
        ['horeb'],
      ),
      read: ['EXO 24:1-18'],
    }),
    built(episode4, {
      id: 'l10-e4',
      number: 4,
      emblem: 'broken-tablets',
      title: 'The Golden Calf',
      passage: 'EXO 31:18-32:20',
      minutes: 9,
      thread: { id: 'no-idols', spot: 'tablets-glow', fromScene: 'l10-e4-s3' },
      whereWhen: where(
        [
          ['A calf', 'In Egypt and Canaan, the bull stood for strength, and gods were often shown standing on one. The people may have meant the calf to stand for the LORD himself, which was still forbidden: “You shall not make for yourself a graven image” (Exodus 20:4).'],
          ['Rings of gold', 'The Egyptians had given the people gold and silver as they left (Exodus 12:35). They now gave it for an idol.'],
          ['Aaron', 'Moses’ brother, the one who should have stood firm, gave way to the crowd.'],
        ],
        ['horeb'],
      ),
      read: ['EXO 32:1-20'],
    }),
    built(episode5, {
      id: 'l10-e5',
      number: 5,
      emblem: 'tent-of-meeting',
      title: 'Moses Intercedes',
      passage: 'EXO 32:9-33:17',
      minutes: 8,
      thread: { id: 'friends-of-god', spot: 'door-glow', fromScene: 'l10-e5-s3' },
      whereWhen: where(
        [
          ['A stiff-necked people', 'Like an ox that will not bend its neck to the yoke: stubborn, unwilling to be led.'],
          ['“The LORD repented”', 'The Bible speaks of God in human words. God does not change his mind as we do; Moses’ prayer is part of the way God shows his mercy.'],
          ['The tent of meeting', 'A tent outside the camp where Moses met with God, before the tabernacle was built (Level 11).'],
        ],
        ['horeb'],
      ),
      read: ['EXO 32:7-14', 'EXO 32:30-34', 'EXO 33:7-17'],
    }),
    built(episode6, {
      id: 'l10-e6',
      number: 6,
      emblem: 'shining-face',
      title: 'God’s Glory Passes By',
      passage: 'EXO 33:18-34:35',
      minutes: 9,
      thread: { id: 'we-have-beheld-his-glory', spot: 'face-glow', fromScene: 'l10-e6-s4' },
      whereWhen: where(
        [
          ['The name of the LORD', 'These words (Exodus 34:6–7) are repeated again and again in the Bible, in the Psalms and the prophets: they are how Israel remembered who God is.'],
          ['Moses’ horns', 'In Latin, Saint Jerome’s word for Moses’ shining face could also mean “horned,” so many old paintings and statues, like Michelangelo’s Moses in Rome, show him with horns.'],
          ['The veil', 'Saint Paul writes that when we turn to the Lord the veil is taken away, and we all reflect his glory (2 Corinthians 3:16–18).'],
        ],
        ['horeb'],
      ),
      read: ['EXO 33:12-23', 'EXO 34:1-9', 'EXO 34:27-35'],
    }),
  ],
}
