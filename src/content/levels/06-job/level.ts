import { notLoaded } from '../../story-loading'
import type { Episode, Level, WhereWhen } from '../../types'
import { level6Music } from './music'
import { level6Quiz } from './quiz'

/**
 * Level 6 · Job (the Book of Job), from the approved Level 6 script
 * (docs/scripts/level-06-job.md).
 */

/** An episode's written details. Its set and scenes come with the level's story (./story.ts), loaded when the level is played. */
function built(fields: Omit<Episode, 'set' | 'scenes'>): Episode {
  return { ...fields, ...notLoaded() }
}

const where = (notes: [string, string][], places: string[] = ['uz']): WhereWhen => ({
  places,
  when: 'The Book of Job does not say: Job lives like the patriarchs, long ago',
  notes: notes.map(([title, text]) => ({ title, text })),
})

export const level6: Level = {
  id: 'l06',
  number: 6,
  title: 'Job',
  age: 'II · The Patriarchs',
  passage: 'JOB 1:1-42:17',
  music: level6Music,
  quiz: level6Quiz,
  story: () => import('./story'),
  // The land of Uz: no one knows exactly where it was, so the map marks it with a question.
  map: {
    at: { lat: 30.4, lon: 36.4 },
    label: 'The land of Uz?',
    route: [],
  },
  // From the approved script's "Reflection and prayer".
  reflection: {
    verse: 'JOB 1:21',
    question: 'Job brought everything to God: his thanks, his tears, even his questions. Is there something sad or hard that you could tell God about today, honestly, the way Job did?',
    prayer: [
      'Lord, you gave Job every good thing,',
      'and you stayed with him when he lost it all.',
      'When I am sad or afraid, help me to tell you the truth,',
      'as Job did, and to keep holding on to you.',
      'Help me to sit with those who suffer, and not to judge them.',
      'Thank you for Jesus, my Redeemer, who lives,',
      'who suffered for me and rose again.',
      'Blessed be your name, in good times and in hard times.',
      'Amen.',
    ],
    traditional: {
      name: 'Glory Be',
      lines: ['Glory be to the Father, and to the Son, and to the Holy Spirit.', 'As it was in the beginning, is now, and ever shall be, world without end. Amen.'],
    },
  },
  episodes: [
    built({
      id: 'l06-e1',
      number: 1,
      emblem: 'open-hand',
      title: 'The Trial',
      passage: 'JOB 1:1-2:10',
      minutes: 7,
      contentNote: 'In this episode Job loses everything he has, even his children, in one day. It is told gently, and nothing is shown.',
      thread: { id: 'i-have-prayed-for-you', spot: 'job-at-prayer', fromScene: 'l06-e1-s1' },
      whereWhen: where(
        [
          ['When', 'The Book of Job does not say. Job lives like the patriarchs, as head of his family, offering sacrifices himself, with wealth counted in flocks.'],
          ['The land of Uz', 'No one knows exactly where it was. The Book of Lamentations links Uz with Edom (Lamentations 4:21), south-east of the Dead Sea; others place it farther east, toward the desert.'],
          ['“Satan”', 'In Hebrew, ha-satan, “the accuser” or “the adversary.” He is not God’s equal: he can do nothing without God’s permission.'],
        ],
        ['uz', 'edom'],
      ),
      read: ['JOB 1:1-2:10'],
    }),
    built({
      id: 'l06-e2',
      number: 2,
      emblem: 'seven-marks',
      title: 'Job’s Lament',
      passage: 'JOB 2:11-3:26',
      minutes: 5,
      thread: { id: 'my-god-why', spot: 'first-light', fromScene: 'l06-e2-s3' },
      whereWhen: where(
        [
          ['Teman', 'Eliphaz came from Teman, a town in Edom famous for its wise men (Jeremiah 49:7).'],
          ['Seven days', 'In Israel, mourning for the dead lasted seven days. The friends mourned with Job as for someone who had died.'],
          ['Lament', 'A lament is a prayer that brings sorrow honestly to God. About a third of the psalms are laments.'],
        ],
        ['uz', 'edom'],
      ),
      read: ['JOB 2:11-3:26'],
    }),
    built({
      id: 'l06-e3',
      number: 3,
      emblem: 'refined-gold',
      title: 'The Friends’ Arguments',
      passage: 'JOB 4:1-31:40',
      minutes: 6,
      thread: { id: 'who-sinned', spot: 'evening-star', fromScene: 'l06-e3-s3' },
      whereWhen: where([
        ['A long poem', 'From chapter 3 to chapter 41, the Book of Job is written as poetry: the friends’ speeches, Job’s answers, and at last God’s.'],
        ['Three rounds', 'The friends speak in turn, three times over, and Job answers each one. A fourth speaker, a young man named Elihu, joins in near the end (chapters 32–37).'],
        ['Refined like gold', 'Gold was purified by fire: the heat burned away everything that was not gold.'],
      ]),
      read: ['JOB 4:1-21', 'JOB 23:1-17'],
    }),
    built({
      id: 'l06-e4',
      number: 4,
      emblem: 'carved-rock',
      title: '“I Know That My Redeemer Lives”',
      passage: 'JOB 19:1-29',
      minutes: 5,
      thread: { id: 'the-resurrection-and-the-life', spot: 'carved-words', fromScene: 'l06-e4-s2' },
      whereWhen: where([
        ['The redeemer', 'In Hebrew, go’el: the family member who stood up for you. In the Book of Ruth, Boaz is Ruth’s go’el.'],
        ['Carved in rock', 'Kings of the ancient Near East had their words cut into cliffs. One of the most famous, the Behistun inscription in Iran, is about 100 meters up a cliff face.'],
        ['“I know that my Redeemer liveth”', 'These words, sung in Handel’s Messiah, are among the best-loved in the whole Bible.'],
      ]),
      read: ['JOB 19:1-29'],
    }),
    built({
      id: 'l06-e5',
      number: 5,
      emblem: 'whirlwind',
      title: 'God Answers from the Whirlwind',
      passage: 'JOB 38:1-42:6',
      minutes: 7,
      thread: { id: 'wind-and-sea-obey-him', spot: 'storm-heart', fromScene: 'l06-e5-s1' },
      whereWhen: where([
        ['The Pleiades and Orion', 'Two of the brightest star patterns in the winter sky, known to almost every ancient people. You can still find them on a clear night.'],
        ['Behemoth and Leviathan', 'God goes on to describe two mighty beasts (chapters 40–41), perhaps the hippopotamus and the crocodile, creatures no one could tame.'],
        ['No explanation', 'God never tells Job about the conversation with Satan in chapter 1. Job trusts God without knowing.'],
      ]),
      read: ['JOB 38:1-41', 'JOB 42:1-6'],
    }),
    built({
      id: 'l06-e6',
      number: 6,
      emblem: 'twofold',
      title: 'Restored',
      passage: 'JOB 42:7-17',
      minutes: 5,
      thread: { id: 'the-steadfastness-of-job', spot: 'job-prays-for-friends', fromScene: 'l06-e6-s2' },
      whereWhen: where([
        ['Double', 'Job received exactly twice his sheep, camels, oxen and donkeys. But he received the same number of children: seven sons and three daughters. Many readers see in this that his first children were not lost for ever.'],
        ['Three daughters', 'Jemimah means “dove”; Keziah is a sweet spice, cassia; Keren-happuch is a jar of eye make-up. Job gave his daughters an inheritance with their brothers, which was unusual then.'],
        ['A hundred and forty years', 'Twice the seventy years of a normal lifetime (Psalm 90:10).'],
      ]),
      read: ['JOB 42:7-17'],
    }),
  ],
}
