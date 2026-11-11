import type { Episode, Level, WhereWhen } from '../../types'
import { episode1 } from './episode-1'
import { episode2 } from './episode-2'
import { episode3 } from './episode-3'
import { episode4 } from './episode-4'
import { episode5 } from './episode-5'
import { level16Music } from './music'
import { level16Quiz } from './quiz'

/**
 * Level 16 · Ruth (Ruth 1–4), from the approved Level 16 script (docs/scripts/level-16-ruth.md).
 * The third and last level of Age V, the Promised Land.
 */

/** An episode that's built: its written details, with its set and scenes. */
function built(story: Pick<Episode, 'set' | 'scenes'>, fields: Omit<Episode, 'set' | 'scenes'>): Episode {
  return { ...fields, ...story }
}

const where = (places: string[], notes: [string, string][]): WhereWhen => ({
  places,
  when: '“In the days when the judges ruled,” perhaps around 1100 BC',
  notes: notes.map(([title, text]) => ({ title, text })),
})

export const level16: Level = {
  id: 'l16',
  number: 16,
  title: 'Ruth',
  age: 'V · The Promised Land',
  passage: 'RUT 1:1-4:22',
  music: level16Music,
  quiz: level16Quiz,
  // From the plains of Moab, across the Jordan, home to Bethlehem.
  map: {
    at: { lat: 31.85, lon: 35.6 },
    label: 'Moab',
    route: [{ at: { lat: 31.7, lon: 35.2 }, label: 'Bethlehem' }],
  },
  // From the approved script's "Reflection and prayer".
  reflection: {
    verse: 'RUT 1:16',
    question: 'Ruth stayed with Naomi when it would have been easier to go home. Who is someone you could be faithful to like that, this week? And when you feel “empty,” like Naomi, what would it mean to trust that God has not finished your story?',
    prayer: [
      'Lord God, you never left Naomi alone,',
      'even when she thought you had turned against her.',
      'Make me faithful like Ruth,',
      'to the people you have given me, and to you.',
      'Make me generous like Boaz,',
      'leaving more than enough for those in need.',
      'Thank you for Jesus, my Redeemer,',
      'born in Bethlehem, the house of bread,',
      'who fills my empty hands with grace upon grace.',
      'Amen.',
    ],
    traditional: {
      name: 'The prayer of praise from one generation to the next',
      lines: ['Glory be to the Father, and to the Son, and to the Holy Spirit,', 'as it was in the beginning, is now, and ever shall be,', 'world without end. Amen.'],
    },
  },
  episodes: [
    built(episode1, {
      id: 'l16-e1',
      number: 1,
      emblem: 'road-from-moab',
      title: 'Naomi’s Sorrow',
      passage: 'RUT 1:1-1:7',
      minutes: 6,
      thread: { id: 'sorrow-into-joy', spot: 'bethlehem-light', fromScene: 'l16-e1-s3' },
      whereWhen: where(['bethlehem', 'plains-of-moab'], [
        ['Bethlehem', 'Its name means “house of bread”: a village in the hills of Judah, about 8 kilometers south of Jerusalem. A famine there was a bitter irony.'],
        ['Moab', 'The high plateau east of the Dead Sea. The Moabites were descendants of Lot, Abraham’s nephew (Genesis 19:37), and for a long time enemies of Israel.'],
        ['Ephrathites', 'Ephrath was the old name of Bethlehem. Rachel was buried on the road to it (Level 4).'],
        ['When?', '“In the days when the judges ruled” (Level 15), perhaps around 1100 BC.'],
      ]),
      read: ['RUT 1:1-7'],
    }),
    built(episode2, {
      id: 'l16-e2',
      number: 2,
      emblem: 'where-you-go',
      title: '“Where You Go I Will Go”',
      passage: 'RUT 1:8-1:22',
      minutes: 7,
      thread: { id: 'no-longer-strangers', spot: 'hands-glow', fromScene: 'l16-e2-s2' },
      whereWhen: where(['bethlehem'], [
        ['“Mara”', 'Naomi’s name means “pleasant”; Mara means “bitter.” It is the same word as the bitter water of Marah in the wilderness (Level 9), which God made sweet.'],
        ['The barley harvest', 'The first harvest of the year, in April or May, around the time of Passover. The wheat harvest came a few weeks later.'],
        ['“May the LORD do so to me”', 'A solemn oath: Ruth calls on the God of Israel by his own name, as one of his people.'],
      ]),
      read: ['RUT 1:8-22'],
    }),
    built(episode3, {
      id: 'l16-e3',
      number: 3,
      emblem: 'sheaf-of-barley',
      title: 'Gleaning in Boaz’s Field',
      passage: 'RUT 2:1-2:23',
      minutes: 8,
      thread: { id: 'under-his-wings', spot: 'wings-glow', fromScene: 'l16-e3-s2' },
      whereWhen: where(['bethlehem'], [
        ['Gleaning', 'God’s law told farmers not to reap to the very edges of their fields, and not to go back for stalks that fell, but to leave them “for the poor and for the sojourner” (Leviticus 19:9–10).'],
        ['A man of wealth', 'Boaz was a landowner, and a relative of Naomi’s dead husband. He was also the son of Rahab of Jericho (Matthew 1:5; Level 14): he too had a foreign mother.'],
        ['An ephah', 'About 20 to 25 liters of grain: enough to feed two women for weeks, gathered in one day.'],
        ['“The LORD be with you”', 'Boaz’s greeting to his workers, and their answer, are still heard at every Mass: “The Lord be with you.” “And with your spirit.”'],
      ]),
      read: ['RUT 2:1-23'],
    }),
    built(episode4, {
      id: 'l16-e4',
      number: 4,
      emblem: 'six-measures',
      title: 'The Threshing Floor',
      passage: 'RUT 3:1-3:18',
      minutes: 7,
      thread: { id: 'grace-upon-grace', spot: 'barley-glow', fromScene: 'l16-e4-s3' },
      whereWhen: where(['bethlehem'], [
        ['A threshing floor', 'A flat, hard place, often on a hilltop, where grain was beaten and winnowed. The evening breeze from the Mediterranean was the best time to winnow, and the owner slept by the heap to guard it.'],
        ['“Spread your skirt over your maidservant”', 'The Hebrew word for “skirt,” kanaph, is the same word as “wings” in Ruth 2:12. Ruth asks Boaz to be the answer to his own blessing.'],
        ['Next of kin', 'In Hebrew, go’el: a relative with the duty to protect the family, to buy back land that had been sold, and to give a dead man’s widow a home and a name.'],
        ['A woman of worth', 'The same words describe the “good wife” of Proverbs 31, which comes just before the book of Ruth in the Hebrew Bible.'],
      ]),
      read: ['RUT 3:1-18'],
    }),
    built(episode5, {
      id: 'l16-e5',
      number: 5,
      emblem: 'sandal-at-the-gate',
      title: 'The Redeemer',
      passage: 'RUT 4:1-4:22',
      minutes: 7,
      thread: { id: 'our-redeemer', spot: 'sandal-glow', fromScene: 'l16-e5-s1' },
      whereWhen: where(['bethlehem'], [
        ['The gate', 'The open place inside a town’s gate was its meeting hall and law court. Business done there before the elders was binding.'],
        ['The sandal', 'Taking off a sandal and handing it over sealed the deal: “where my foot stood, now yours stands.”'],
        ['Perez and Tamar', 'Perez was a son of Judah and Tamar (Genesis 38). Like Rahab and Ruth, Tamar is named in Jesus’ family tree.'],
        ['Obed, Jesse and David', 'Obed means “servant,” as in servant of God. His grandson David, the shepherd boy of Bethlehem, will be anointed king in Level 17.'],
      ]),
      read: ['RUT 4:1-22', 'MAT 1:1-6'],
    }),
  ],
}
