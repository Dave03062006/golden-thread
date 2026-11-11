import { notLoaded } from '../../story-loading'
import type { Episode, Level, WhereWhen } from '../../types'
import { level8Music } from './music'
import { level8Quiz } from './quiz'

/**
 * Level 8 · The Plagues and the Passover (Exodus 5–13), from the approved Level 8 script
 * (docs/scripts/level-08-the-plagues-and-the-passover.md).
 */

/** An episode's written details. Its set and scenes come with the level's story (./story.ts), loaded when the level is played. */
function built(fields: Omit<Episode, 'set' | 'scenes'>): Episode {
  return { ...fields, ...notLoaded() }
}

const where = (notes: [string, string][], places: string[]): WhereWhen => ({
  places,
  when: 'Exodus doesn’t name the Pharaoh: perhaps the 1200s BC, perhaps earlier',
  notes: notes.map(([title, text]) => ({ title, text })),
})

export const level8: Level = {
  id: 'l08',
  number: 8,
  title: 'The Plagues and the Passover',
  age: 'III · Out of Egypt',
  passage: 'EXO 5:1-13:22',
  music: level8Music,
  quiz: level8Quiz,
  story: () => import('./story'),
  // Rameses, where the slaves built Pharaoh's store-city, and the first camp at Succoth.
  map: {
    at: { lat: 30.8, lon: 31.83 },
    label: 'Rameses',
    route: [{ at: { lat: 30.55, lon: 32.1 }, label: 'Succoth' }],
  },
  // From the approved script's "Reflection and prayer".
  reflection: {
    verse: 'EXO 12:13',
    question: 'On the night of the Passover, God’s people were kept safe by the blood of the lamb. Jesus is our Passover Lamb, and at every Mass we remember how he saved us. What is something God has done for you that you want to remember, and thank him for?',
    prayer: [
      'Lord God, you heard the cry of your people in Egypt,',
      'and you set them free.',
      'Thank you for the Passover lamb, whose blood kept them safe,',
      'and for Jesus, the Lamb of God, who gave his life for me.',
      'When I am weighed down, help me come to you for rest.',
      'Help me to remember all that you have done for me,',
      'and to tell it to others, as your people told their children.',
      'Thank you for every Mass, where Jesus is with us.',
      'Amen.',
    ],
    traditional: {
      name: 'Glory Be',
      lines: ['Glory be to the Father, and to the Son, and to the Holy Spirit.', 'As it was in the beginning, is now, and ever shall be, world without end. Amen.'],
    },
  },
  episodes: [
    built({
      id: 'l08-e1',
      number: 1,
      emblem: 'i-will',
      title: '“Let My People Go”',
      passage: 'EXO 5:1-7:13',
      minutes: 8,
      thread: { id: 'free-indeed', spot: 'rod-glow', fromScene: 'l08-e1-s1' },
      whereWhen: where(
        [
          ['Pharaoh’s power', 'Pharaoh was thought of as a god himself, the son of the sun god. When he asks, “Who is the LORD?”, he means that he answers to no one.'],
          ['“A feast in the wilderness”', 'Moses first asks only for three days to worship God in the desert. Pharaoh will not give even that.'],
          ['Moses and Aaron’s ages', 'Moses was eighty, and Aaron eighty-three (Exodus 7:7).'],
        ],
        ['egypt', 'goshen'],
      ),
      read: ['EXO 5:1-5', 'EXO 6:2-9', 'EXO 7:8-13'],
    }),
    built({
      id: 'l08-e2',
      number: 2,
      emblem: 'stubble',
      title: 'Bricks Without Straw',
      passage: 'EXO 5:6-6:1',
      minutes: 7,
      thread: { id: 'rest-for-the-weary', spot: 'moses-prayer', fromScene: 'l08-e2-s3' },
      whereWhen: where(
        [
          ['Straw in bricks', 'Chopped straw mixed into the mud held a brick together as it dried, and kept it from cracking. Without it, the work was slower and harder.'],
          ['Foremen', 'Hebrews set over the other Hebrew workers. They were punished when the count of bricks was short.'],
          ['Stubble', 'The short stalks left in a field after the harvest. Gathering enough of it for a day’s bricks took hours.'],
        ],
        ['egypt', 'goshen'],
      ),
      read: ['EXO 5:6-6:1'],
    }),
    built({
      id: 'l08-e3',
      number: 3,
      emblem: 'frog',
      title: 'The First Nine Plagues',
      passage: 'EXO 7:14-10:29',
      minutes: 10,
      contentNote: 'In this episode God sends nine plagues on Egypt: the river turns to blood, and frogs, insects, sickness, hail, locusts and darkness come upon the land. They are told gently.',
      thread: { id: 'water-into-wine', spot: 'river-glow', fromScene: 'l08-e3-s1' },
      whereWhen: where(
        [
          ['The gods of Egypt', 'The Egyptians worshiped the Nile, the frog, the cattle, the sun. Each plague showed that the LORD is greater than all of them (Exodus 12:12).'],
          ['“The finger of God”', 'Jesus later uses the same words: he says he casts out demons “by the finger of God” (Luke 11:20).'],
          ['Goshen spared', 'From the plague of flies on, Exodus often notes that Goshen, where the Hebrews lived, was spared: from the flies, the sickness of the cattle, the hail and the darkness.'],
        ],
        ['egypt', 'nile', 'goshen'],
      ),
      read: ['EXO 7:14-24', 'EXO 8:16-24', 'EXO 10:21-29'],
    }),
    built({
      id: 'l08-e4',
      number: 4,
      emblem: 'marked-door',
      title: 'The Passover Lamb',
      passage: 'EXO 11:1-12:28',
      minutes: 9,
      thread: { id: 'the-lamb-of-god', spot: 'door-blood', fromScene: 'l08-e4-s4' },
      whereWhen: where(
        [
          ['The month of Abib', 'God made the Passover month the first month of the year (Exodus 12:2). It falls in spring, in March or April, at the full moon.'],
          ['Hyssop', 'A small bushy plant whose stems hold liquid well, used for sprinkling. At the cross, the soldiers raised a sponge of wine to Jesus on hyssop (John 19:29).'],
          ['Unleavened bread', 'Bread made without yeast, quick to bake, for people who must leave in a hurry.'],
        ],
        ['goshen'],
      ),
      read: ['EXO 12:1-13', 'EXO 12:21-28'],
    }),
    built({
      id: 'l08-e5',
      number: 5,
      emblem: 'pillar-of-fire',
      title: 'The Night of Departure',
      passage: 'EXO 12:29-13:22',
      minutes: 8,
      contentNote: 'In this episode the firstborn of Egypt die on the night of the Passover, as God had warned. It is told gently, and nothing is shown.',
      thread: { id: 'his-exodus', spot: 'pillar-glow', fromScene: 'l08-e5-s4' },
      whereWhen: where(
        [
          ['Rameses and Succoth', 'Rameses was the store-city the slaves had built; Succoth (“booths”) was the first camp on the way out of Egypt, in the east of the Nile delta.'],
          ['Six hundred thousand', 'The Bible counts the men; with women and children, a great multitude, and with them a “mixed multitude” of other peoples who chose to go too.'],
          ['Four hundred and thirty years', 'As God had told Abraham long before, his descendants would be strangers in a land not theirs, and then come out (Genesis 15:13–14).'],
        ],
        ['rameses', 'succoth'],
      ),
      read: ['EXO 12:29-42', 'EXO 13:17-22'],
    }),
    built({
      id: 'l08-e6',
      number: 6,
      emblem: 'unleavened-bread',
      title: 'Remember This Day',
      passage: 'EXO 12:14-13:16',
      minutes: 8,
      thread: { id: 'in-remembrance-of-me', spot: 'bread-glow', fromScene: 'l08-e6-s4' },
      whereWhen: where(
        [
          ['The Seder', 'The Passover meal Jewish families keep today is called the Seder, “order,” because it follows the same order every year.'],
          ['Bitter herbs', 'Exodus says the Egyptians made the Hebrews’ lives “bitter with hard service” (Exodus 1:14). Jewish tradition sees that bitterness in the herbs.'],
          ['Easter', 'The Church’s Easter is the Christian Passover: in many languages it is even called by the same name, like Pascua in Spanish and Paskah in Indonesian.'],
        ],
        ['succoth'],
      ),
      read: ['EXO 12:14-17', 'EXO 12:24-27', 'EXO 13:3-16'],
    }),
  ],
}
