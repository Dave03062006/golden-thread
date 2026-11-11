import { notLoaded } from '../../story-loading'
import type { Episode, Level, WhereWhen } from '../../types'
import { level9Music } from './music'
import { level9Quiz } from './quiz'

/**
 * Level 9 · Through the Sea (Exodus 14–18), from the approved Level 9 script
 * (docs/scripts/level-09-through-the-sea.md).
 */

/** An episode's written details. Its set and scenes come with the level's story (./story.ts), loaded when the level is played. */
function built(fields: Omit<Episode, 'set' | 'scenes'>): Episode {
  return { ...fields, ...notLoaded() }
}

const where = (notes: [string, string][], places: string[]): WhereWhen => ({
  places,
  when: 'In the weeks after the Passover: perhaps the 1200s BC, perhaps earlier',
  notes: notes.map(([title, text]) => ({ title, text })),
})

export const level9: Level = {
  id: 'l09',
  number: 9,
  title: 'Through the Sea',
  age: 'III · Out of Egypt',
  passage: 'EXO 14:1-18:27',
  music: level9Music,
  quiz: level9Quiz,
  story: () => import('./story'),
  // The sea where the people crossed, and their road through the wilderness to the mountain of God.
  map: {
    at: { lat: 29.95, lon: 32.55 },
    label: 'The Red Sea',
    route: [
      { at: { lat: 29.33, lon: 32.88 }, label: 'Marah' },
      { at: { lat: 29.24, lon: 32.97 }, label: 'Elim' },
      { at: { lat: 28.85, lon: 33.25 }, label: 'The wilderness of Sin' },
      { at: { lat: 28.72, lon: 33.63 }, label: 'Rephidim' },
    ],
  },
  // From the approved script's "Reflection and prayer".
  reflection: {
    verse: 'EXO 14:14',
    question: 'God’s people stood between the sea and the chariots, and could see no way forward. God made a path through the sea, and fed them every day in the desert. Where in your life do you need God to make a way? Ask him, and trust him for today.',
    prayer: [
      'Lord God, when your people were trapped by the sea,',
      'you made a path through the waters.',
      'When they were hungry, you fed them with bread from heaven,',
      'and when they were thirsty, you gave them water from the rock.',
      'When I am afraid, help me to stand firm and trust you.',
      'Give me what I need for each day, and help me to share it.',
      'Thank you for the water of my Baptism,',
      'and for Jesus, the living Bread.',
      'Amen.',
    ],
    // The Our Father, in place of the Glory Be, because of the manna: "Give us this day our daily bread."
    traditional: {
      name: 'Our Father',
      lines: [
        'Our Father, who art in heaven, hallowed be thy name;',
        'thy kingdom come, thy will be done on earth as it is in heaven.',
        'Give us this day our daily bread,',
        'and forgive us our trespasses, as we forgive those who trespass against us;',
        'and lead us not into temptation, but deliver us from evil. Amen.',
      ],
    },
  },
  episodes: [
    built({
      id: 'l09-e1',
      number: 1,
      emblem: 'stand-firm',
      title: 'Trapped at the Sea',
      passage: 'EXO 14:1-14:20',
      minutes: 6,
      thread: { id: 'take-heart-it-is-i', spot: 'sea-glow', fromScene: 'l09-e1-s2' },
      whereWhen: where(
        [
          ['Which sea?', 'Exodus calls it Yam Suph, usually translated “the Red Sea”; the words can also mean “the Sea of Reeds.” No one knows exactly where the people crossed: perhaps at one of the lakes north of the Gulf of Suez, perhaps at the gulf itself.'],
          ['Chariots', 'Egypt’s chariots were the fastest weapons of their time: light wooden cars pulled by two horses, carrying a driver and an archer. Six hundred picked chariots was a fearsome army against people on foot.'],
          ['The angel of God', 'Exodus says that the angel of God moved behind the people with the pillar (14:19). God himself was guarding them.'],
        ],
        ['red-sea'],
      ),
      read: ['EXO 14:1-14', 'EXO 14:19-20'],
    }),
    built({
      id: 'l09-e2',
      number: 2,
      emblem: 'parted-sea',
      title: 'The Waters Part',
      passage: 'EXO 14:15-14:31',
      minutes: 7,
      contentNote: 'In this episode the sea comes back over Pharaoh’s army as it follows God’s people. It is told gently, and nothing is shown.',
      thread: { id: 'baptized-in-the-sea', spot: 'path-glow-thread', fromScene: 'l09-e2-s2' },
      whereWhen: where(
        [
          ['The east wind', 'Exodus says God drove the sea back with a strong east wind all night (14:21). God works his wonders through the very things he has made.'],
          ['The morning watch', 'The last watch of the night, before dawn (14:24). By then the people were across.'],
          ['At the Easter Vigil', 'Of all the readings at the Easter Vigil, the crossing of the sea is the one that is never left out.'],
        ],
        ['red-sea'],
      ),
      read: ['EXO 14:15-31'],
    }),
    built({
      id: 'l09-e3',
      number: 3,
      emblem: 'timbrel',
      title: 'The Song of Moses and Miriam',
      passage: 'EXO 15:1-15:21',
      minutes: 6,
      thread: { id: 'the-song-of-the-lamb', spot: 'timbrel-glow', fromScene: 'l09-e3-s2' },
      whereWhen: where(
        [
          ['Miriam', 'The sister of Moses and Aaron, who watched over the baby Moses in his basket among the reeds. She is the first woman the Bible calls a prophetess.'],
          ['A timbrel', 'A small hand drum, like a tambourine, played by women at celebrations.'],
          ['An old song', 'Many scholars think the Song of the Sea is among the oldest poems in the Bible, sung for centuries before it was written down.'],
        ],
        ['red-sea'],
      ),
      read: ['EXO 15:1-21'],
    }),
    built({
      id: 'l09-e4',
      number: 4,
      emblem: 'manna-jar',
      title: 'Manna and Quail',
      passage: 'EXO 15:22-16:36',
      minutes: 8,
      thread: { id: 'the-living-bread', spot: 'jar-glow', fromScene: 'l09-e4-s4' },
      whereWhen: where(
        [
          ['Manna', 'Its name sounds like the Hebrew man hu, “What is it?”, the people’s first words when they saw it (16:15).'],
          ['An omer', 'About two liters: a day’s food for one person. Exodus explains it as a tenth of an ephah (16:36).'],
          ['Forty years', 'The manna fed the people every day of their journey. It stopped only the day after they first ate the grain of the promised land (Joshua 5:12).'],
          ['Marah and Elim', 'Marah means “bitter.” Elim, with its twelve springs, is often placed at an oasis in the west of the Sinai peninsula, a day or two’s walk south of Marah.'],
        ],
        ['marah', 'elim', 'wilderness-of-sin'],
      ),
      read: ['EXO 15:22-27', 'EXO 16:1-35'],
    }),
    built({
      id: 'l09-e5',
      number: 5,
      emblem: 'struck-rock',
      title: 'Water from the Rock',
      passage: 'EXO 17:1-17:7',
      minutes: 5,
      thread: { id: 'the-rock-was-christ', spot: 'rock-glow', fromScene: 'l09-e5-s2' },
      whereWhen: where(
        [
          ['Rephidim', 'A camp in the south of the Sinai peninsula, near Horeb. It is often placed in Wadi Feiran, the largest oasis valley in Sinai.'],
          ['Massah and Meribah', 'The names mean “testing” and “quarreling.” Psalm 95 remembers them, and the Church prays that psalm at the start of each day in the Liturgy of the Hours: “Harden not your hearts.”'],
          ['A rock that followed them', 'An old Jewish story told of a rock that went with the people all through the desert, giving them water. Saint Paul takes up the story in 1 Corinthians 10:4.'],
        ],
        ['rephidim', 'horeb'],
      ),
      read: ['EXO 17:1-7'],
    }),
    built({
      id: 'l09-e6',
      number: 6,
      emblem: 'raised-hands',
      title: 'Hands Raised Against Amalek',
      passage: 'EXO 17:8-17:16',
      minutes: 6,
      contentNote: 'In this episode Israel fights a battle against the Amalekites. Nothing of the fighting is shown.',
      thread: { id: 'lifted-up', spot: 'hands-glow', fromScene: 'l09-e6-s2' },
      whereWhen: where(
        [
          ['Amalek', 'A people of the desert, descended from Esau’s grandson Amalek (Genesis 36:12).'],
          ['Joshua', 'His name means “the LORD saves.” This is the first time we meet him; one day he will lead God’s people into the promised land. In Greek his name is written Iesous, Jesus.'],
          ['Hur', 'One of the leaders of the people, who stood with Aaron beside Moses on the hill.'],
        ],
        ['rephidim'],
      ),
      read: ['EXO 17:8-16'],
    }),
    built({
      id: 'l09-e7',
      number: 7,
      emblem: 'shared-load',
      title: 'Jethro’s Advice',
      passage: 'EXO 18:1-18:27',
      minutes: 6,
      thread: { id: 'laborers-for-the-harvest', spot: 'leaders-glow', fromScene: 'l09-e7-s3' },
      whereWhen: where(
        [
          ['Jethro', 'The priest of Midian and Moses’ father-in-law, who took Moses in when he fled from Egypt. He is not an Israelite, yet he praises the LORD and offers him sacrifice.'],
          ['Gershom and Eliezer', 'Moses’ two sons. Their names mean “a sojourner there” and “my God is help” (18:3–4).'],
          ['Thousands, hundreds, fifties and tens', 'Leaders for groups of every size, so that everyone had someone close by to go to.'],
        ],
        ['horeb'],
      ),
      read: ['EXO 18:1-27'],
    }),
  ],
}
