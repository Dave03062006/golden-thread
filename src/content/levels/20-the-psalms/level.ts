import { notLoaded } from '../../story-loading'
import type { Episode, Level, WhereWhen } from '../../types'
import { level20Music } from './music'
import { level20Quiz } from './quiz'

/**
 * Level 20 · The Psalms, from the approved Level 20 script (docs/scripts/level-20-the-psalms.md).
 * The fourth level of Age VI: not one story, but six kinds of psalm, each where it might first
 * have been sung.
 */

/** An episode's written details. Its set and scenes come with the level's story (./story.ts), loaded when the level is played. */
function built(fields: Omit<Episode, 'set' | 'scenes'>): Episode {
  return { ...fields, ...notLoaded() }
}

const where = (places: string[], notes: [string, string][]): WhereWhen => ({
  places,
  when: 'From David’s time, about 1000 BC, until after the exile',
  notes: notes.map(([title, text]) => ({ title, text })),
})

export const level20: Level = {
  id: 'l20',
  number: 20,
  title: 'The Psalms',
  age: 'VI · The Kingdom',
  passage: 'PSA 1:1-150:6',
  music: level20Music,
  quiz: level20Quiz,
  story: () => import('./story'),
  // Jerusalem on Mount Zion, and the hills of Bethlehem where David kept his sheep.
  map: {
    at: { lat: 31.78, lon: 35.23 },
    label: 'Jerusalem',
    route: [{ at: { lat: 31.7, lon: 35.2 }, label: 'Bethlehem' }],
  },
  // From the approved script's "Reflection and prayer".
  reflection: {
    verse: 'PSA 23:1',
    question: 'The Psalms have words for every feeling: joy, fear, sorrow, guilt and hope. Which kind of psalm fits how you feel today: a song of praise, a lament, a prayer for mercy, or a song for the road? Could you pray one psalm each day this week?',
    prayer: [
      'Lord God, you are my shepherd, and I shall not want.',
      'Thank you for the Psalms,',
      'the songs Jesus sang and prayed.',
      'When I am happy, teach me to praise you;',
      'when I am sad, teach me to tell you so;',
      'when I have done wrong, teach me to ask your mercy;',
      'and all my life, lead me on the road to your house.',
      'Let everything that breathes praise the Lord!',
      'Amen.',
    ],
    traditional: {
      name: 'The first words of the Church’s prayer every morning, from Psalm 51',
      lines: ['O Lord, open thou my lips,', 'and my mouth shall show forth thy praise.'],
    },
  },
  episodes: [
    built({
      id: 'l20-e1',
      number: 1,
      emblem: 'trumpet-and-harp',
      title: 'Songs of Praise',
      passage: 'PSA 8:1-8:9',
      minutes: 7,
      thread: { id: 'out-of-the-mouth-of-babes', spot: 'babes-glow', fromScene: 'l20-e1-s2' },
      whereWhen: where(['bethlehem', 'jerusalem'], [
        ['150 psalms', 'The book of Psalms is divided into five books, like the five books of Moses. It was gathered over many centuries, from David’s time (about 1000 BC) to after the exile.'],
        ['“Psalms”', 'From the Greek for songs sung to a harp. In Hebrew the book is called Tehillim, “praises.”'],
        ['David’s singers', 'David appointed Levites “to invoke, to thank, and to praise the LORD” with harps, lyres and cymbals (1 Chronicles 16:4–5). Some psalms are named after his singers, Asaph and the sons of Korah.'],
        ['The Temple instruments', 'The trumpet was the shofar, a ram’s horn. The lute and harp were stringed instruments like the lyre.'],
      ]),
      read: ['PSA 8:1-9', 'PSA 100:1-5', 'PSA 150:1-6'],
    }),
    built({
      id: 'l20-e2',
      number: 2,
      emblem: 'overflowing-cup',
      title: 'The Lord Is My Shepherd',
      passage: 'PSA 23:1-23:6',
      minutes: 8,
      thread: { id: 'my-fathers-house', spot: 'door-glow', fromScene: 'l20-e2-s3' },
      whereWhen: where(['bethlehem'], [
        ['The Judean hills', 'Dry hills east of Bethlehem, green only after the winter rains. A shepherd had to know where the grass and the water were.'],
        ['The valley of the shadow of death', 'The hills are cut by deep, dark ravines, where wild animals and robbers could hide.'],
        ['The rod and the staff', 'The rod was a short club to drive off wolves; the staff was a long stick, sometimes with a crook, to guide the sheep and pull them out of trouble.'],
        ['“Thou anointest my head with oil”', 'Shepherds rubbed olive oil on their sheep’s heads to soothe cuts and keep flies away; hosts poured oil on an honored guest’s head.'],
      ]),
      read: ['PSA 23:1-6', 'JHN 10:1-16'],
    }),
    built({
      id: 'l20-e3',
      number: 3,
      emblem: 'deer-at-the-stream',
      title: 'Songs of Lament',
      passage: 'PSA 22:1-22:31',
      minutes: 8,
      contentNote: 'This episode quotes the psalm Jesus prayed on the cross. Nothing is shown.',
      thread: { id: 'why-hast-thou-forsaken-me', spot: 'sun-glow', fromScene: 'l20-e3-s3' },
      whereWhen: where(['adullam', 'en-gedi'], [
        ['The cave', 'David hid in the caves of Adullam and En-gedi (Level 18). Two psalms are titled “when he was in the cave” (Psalms 57 and 142).'],
        ['A hart', 'A male deer. In the dry summer the streams of Judea dry up, and animals search far for water.'],
        ['“Eli, Eli, lama sabachthani?”', 'Jesus prayed the psalm in his own language, Aramaic, as Matthew records.'],
        ['Psalm 22 and the cross', 'The Gospels quote it several times: the mocking crowd, the soldiers casting lots for Jesus’ clothes, and his cry.'],
      ]),
      read: ['PSA 13:1-6', 'PSA 42:1-5', 'PSA 22:1-31'],
    }),
    built({
      id: 'l20-e4',
      number: 4,
      emblem: 'watchman-at-dawn',
      title: 'Songs of Repentance',
      passage: 'PSA 130:1-130:8',
      minutes: 7,
      thread: { id: 'he-will-save-his-people', spot: 'dawn-glow', fromScene: 'l20-e4-s2' },
      whereWhen: where(['jerusalem'], [
        ['The seven penitential psalms', 'Psalms 6, 32, 38, 51, 102, 130 and 143. The Church has prayed them together since the early centuries.'],
        ['De profundis', 'Psalm 130 is called from its first words in Latin, “Out of the depths.” The Church prays it for the dead.'],
        ['Watchmen', 'Jerusalem’s walls had watchmen through the night, who called out the hours and watched for danger and for the dawn.'],
        ['East and west', 'In the land of Israel, east is the desert and the sunrise; west is the Great Sea, where the sun sets. They never meet.'],
      ]),
      read: ['PSA 130:1-8', 'PSA 32:1-5', 'PSA 103:1-22'],
    }),
    built({
      id: 'l20-e5',
      number: 5,
      emblem: 'head-of-the-corner',
      title: 'The King Who Is to Come',
      passage: 'PSA 118:1-118:29',
      minutes: 8,
      thread: { id: 'the-head-of-the-corner', spot: 'corner-glow', fromScene: 'l20-e5-s2' },
      whereWhen: where(['jerusalem'], [
        ['Royal psalms', 'Psalms 2, 72, 89, 110 and others were sung for the kings of David’s family. When the kingdom ended (Level 29), God’s people kept singing them, waiting for the King they promised.'],
        ['Melchizedek', 'The priest-king of Salem who blessed Abraham with bread and wine (Level 3). Psalm 110 promises a king who will also be “a priest for ever.”'],
        ['The most quoted psalm', 'The New Testament quotes Psalm 110 more than any other passage of the Old Testament.'],
        ['The Hallel', 'Psalms 113–118, sung at Passover. After the Last Supper, Jesus and his disciples “sang a hymn” (Matthew 26:30): very likely these psalms.'],
      ]),
      read: ['PSA 2:1-12', 'PSA 110:1-7', 'PSA 118:19-29'],
    }),
    built({
      id: 'l20-e6',
      number: 6,
      emblem: 'temple-stairs',
      title: 'Songs of the Road to Jerusalem',
      passage: 'PSA 121:1-122:9',
      minutes: 7,
      thread: { id: 'going-up-to-jerusalem', spot: 'gate-glow', fromScene: 'l20-e6-s2' },
      whereWhen: where(['jerusalem'], [
        ['Three feasts', 'God’s law told every man of Israel to go up to the sanctuary three times a year: at Passover, at Pentecost and at the feast of Booths (Deuteronomy 16:16).'],
        ['“Up” to Jerusalem', 'Jerusalem stands about 750 meters above the sea. From Jericho, the road climbs more than a kilometer in thirty kilometers.'],
        ['The Songs of Ascents', 'Psalms 120 to 134. A Jewish tradition says the Levites sang them on the fifteen steps that led up into the Temple courts.'],
        ['Brothers dwelling in unity', 'On the feasts, families from every tribe camped together around the city.'],
      ]),
      read: ['PSA 121:1-8', 'PSA 122:1-9', 'PSA 133:1-3', 'PSA 134:1-3', 'LUK 2:41-52'],
    }),
  ],
}
