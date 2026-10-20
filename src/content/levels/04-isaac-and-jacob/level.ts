import type { Episode, Level, WhereWhen } from '../../types'
import { episode1 } from './episode-1'
import { episode2 } from './episode-2'
import { episode3 } from './episode-3'
import { episode4 } from './episode-4'
import { episode5 } from './episode-5'
import { episode6 } from './episode-6'
import { episode7 } from './episode-7'
import { level4Music } from './music'
import { level4Quiz } from './quiz'

/**
 * Level 4 · Isaac and Jacob (Genesis 24–36), from the approved Level 4 script
 * (docs/scripts/level-04-isaac-and-jacob.md).
 */

/** An episode that's built: its written details, with its set and scenes. */
function built(story: Pick<Episode, 'set' | 'scenes'>, fields: Omit<Episode, 'set' | 'scenes'>): Episode {
  return { ...fields, ...story }
}

const where = (notes: [string, string][], places: string[] = []): WhereWhen => ({
  places,
  when: 'Isaac’s and Jacob’s time: roughly 1900–1600 BC, as scholars estimate',
  notes: notes.map(([title, text]) => ({ title, text })),
})

export const level4: Level = {
  id: 'l04',
  number: 4,
  title: 'Isaac and Jacob',
  age: 'II · The Patriarchs',
  passage: 'GEN 24:1-35:29',
  music: level4Music,
  quiz: level4Quiz,
  // Beer-sheba, where Isaac's family lived; then Jacob's journeys: north past Bethel to
  // Haran, and twenty years later home again, by the Jabbok to Shechem, Bethel and
  // Bethlehem, to Mamre at Hebron.
  map: {
    at: { lat: 31.25, lon: 34.79 },
    label: 'Beer-sheba',
    route: [
      { at: { lat: 31.93, lon: 35.22 }, label: 'Bethel' },
      { at: { lat: 36.86, lon: 39.03 }, label: 'Haran' },
      { at: { lat: 32.18, lon: 35.7 }, label: 'Peniel, by the Jabbok' },
      { at: { lat: 32.21, lon: 35.28 }, label: 'Shechem' },
      { at: { lat: 31.7, lon: 35.2 }, label: 'Bethlehem' },
      { at: { lat: 31.53, lon: 35.1 }, label: 'Mamre' },
    ],
  },
  // From the approved script's "Reflection and prayer".
  reflection: {
    verse: 'GEN 28:15',
    question: 'Jacob ran away from the brother he had wronged, and God stayed with him the whole way. Coming home, he had to face Esau, and Esau forgave him. Is there someone you need to make peace with? What first step could you take, like Jacob’s first bow?',
    prayer: [
      'God of Abraham, Isaac and Jacob,',
      'you never gave up on your people, even when they failed you.',
      'Like Rebekah, help me to say “I will go” when you call.',
      'Keep me from trading your gifts for what I want right now.',
      'When I am far from home, remind me, as you reminded Jacob,',
      'that you are with me wherever I go.',
      'Teach me to hold on to you in prayer through the long night,',
      'and give me the courage to make peace with those I have hurt.',
      'Run to meet me when I come back to you,',
      'as the father ran to his son, through Jesus Christ, our ladder to heaven.',
      'Amen.',
    ],
    traditional: {
      name: 'Glory Be',
      lines: ['Glory be to the Father, and to the Son, and to the Holy Spirit.', 'As it was in the beginning, is now, and ever shall be, world without end. Amen.'],
    },
  },
  episodes: [
    built(episode1, {
      id: 'l04-e1',
      number: 1,
      emblem: 'jar',
      title: 'A Bride for Isaac',
      passage: 'GEN 24:1-67',
      minutes: 8,
      thread: { id: 'i-will-go', spot: 'rebekahs-jar', fromScene: 'l04-e1-s4' },
      whereWhen: where(
        [
          ['The city of Nahor', 'In Aram-naharaim (“Aram of the two rivers”), near Haran, where Abraham’s brother Nahor’s family had stayed.'],
          ['Camels and water', 'A camel that has walked through the desert can drink well over 100 liters. Watering ten of them was hours of work.'],
        ],
        ['haran', 'hebron'],
      ),
      read: ['GEN 24:1-67'],
    }),
    built(episode2, {
      id: 'l04-e2',
      number: 2,
      emblem: 'stew',
      title: 'The Birthright',
      passage: 'GEN 25:7-34',
      minutes: 7,
      thread: { id: 'not-by-bread-alone', spot: 'the-stew', fromScene: 'l04-e2-s4' },
      whereWhen: where(
        [
          ['Edom', 'Esau’s descendants were the Edomites, who lived south of the Dead Sea. “Edom” means “red.”'],
          ['The birthright', 'By ancient custom, the firstborn son received a double share of his father’s goods (Deuteronomy 21:17) and became head of the family.'],
          ['Lentils', 'Red lentil stew is still cooked across the Middle East today, much as Jacob made it.'],
        ],
        ['hebron', 'beersheba', 'edom'],
      ),
      read: ['GEN 25:19-34'],
    }),
    built(episode3, {
      id: 'l04-e3',
      number: 3,
      emblem: 'blessing',
      title: 'The Stolen Blessing',
      passage: 'GEN 27:1-46',
      minutes: 8,
      thread: { id: 'clothed-in-christ', spot: 'esaus-robe', fromScene: 'l04-e3-s3' },
      whereWhen: where(
        [
          ['Blessings', 'Ancient documents from Mesopotamia show that a father’s deathbed words could decide who inherited. They were legally binding, which is why Isaac could not take his back.'],
          ['Beer-sheba', 'Isaac’s family lived around Beer-sheba, in the south. Haran, where Jacob fled, is about 800 kilometers north.'],
          ['God works even through sin', 'God never approves of lies. But St Paul says that “in everything God works for good with those who love him” (Romans 8:28), even through human failings.'],
        ],
        ['beersheba', 'haran'],
      ),
      read: ['GEN 27:1-46'],
    }),
    built(episode4, {
      id: 'l04-e4',
      number: 4,
      emblem: 'ladder',
      title: 'Jacob’s Ladder',
      passage: 'GEN 28:10-22',
      minutes: 7,
      thread: { id: 'the-ladder-to-heaven', spot: 'ladder-foot', fromScene: 'l04-e4-s2' },
      whereWhen: where(
        [
          ['Bethel', 'About 18 kilometers north of Jerusalem, where Abraham had built an altar years before. Jacob’s journey north to Haran was long: about 800 kilometers on foot.'],
          ['The “ladder”', 'The Hebrew word, sullam, appears only here in the Bible. It may mean a stairway or a ramp, like the great stepped towers of Mesopotamia, but this one was built by God, not by men as at Babel.'],
          ['Anointing with oil', 'Pouring oil set something apart for God. Later Israel’s priests and kings were anointed, and the name “Christ” means “the Anointed One.”'],
        ],
        ['bethel', 'beersheba', 'haran'],
      ),
      read: ['GEN 28:10-22'],
    }),
    built(episode5, {
      id: 'l04-e5',
      number: 5,
      emblem: 'lion',
      title: 'Rachel and Leah',
      passage: 'GEN 29:1-30:24',
      minutes: 8,
      thread: { id: 'the-lion-of-judah', spot: 'baby-judah', fromScene: 'l04-e5-s4' },
      whereWhen: where(
        [
          ['Haran', 'Abraham’s family had stayed here when he went on to Canaan. Rebekah grew up nearby, and now her son came back to her brother’s house.'],
          ['Shepherds and wells', 'A heavy stone kept a well clean and stopped anyone from taking more than their share; the shepherds waited until all the flocks were there to roll it off together. Jacob rolled it away alone.'],
          ['Twelve sons', 'Jacob would have twelve sons, with Leah, Rachel and their two maids, Bilhah and Zilpah. They became the twelve tribes of Israel. Benjamin, the last, was born later, back in Canaan.'],
        ],
        ['haran'],
      ),
      read: ['GEN 29:1-30:24'],
    }),
    built(episode6, {
      id: 'l04-e6',
      number: 6,
      emblem: 'dawn',
      title: 'Wrestling with God',
      passage: 'GEN 31:1-32:32',
      minutes: 8,
      thread: { id: 'pray-and-not-lose-heart', spot: 'first-light', fromScene: 'l04-e6-s4' },
      whereWhen: where(
        [
          ['The Jabbok', 'A stream that flows west into the Jordan through a deep valley, east of the river, in today’s Jordan. It is now called the Zarqa.'],
          ['Who was the man?', 'The prophet Hosea calls him an angel: “He strove with the angel and prevailed, he wept and sought his favor” (Hosea 12:4). Jacob himself said he had seen God face to face.'],
          ['Israel', 'The name may mean “he strives with God” or “God strives.” From now on, God’s people are called by it: the children of Israel.'],
        ],
        ['jabbok', 'edom'],
      ),
      read: ['GEN 32:1-32'],
    }),
    built(episode7, {
      id: 'l04-e7',
      number: 7,
      emblem: 'embrace',
      title: 'Brothers Reconciled',
      passage: 'GEN 33:1-35:29',
      minutes: 9,
      thread: { id: 'the-father-runs', spot: 'the-gift', fromScene: 'l04-e7-s2' },
      whereWhen: where(
        [
          ['Edom', 'Esau lived in the land of Seir, the mountains south of the Dead Sea, later called Edom.'],
          ['Shechem and Jacob’s well', 'Jacob bought a field at Shechem (Genesis 33:19). Centuries later, Jesus sat by “Jacob’s well” there and spoke with the Samaritan woman (John 4:5–6).'],
          ['Rachel’s tomb', 'Matthew’s Gospel remembers “Rachel weeping for her children” near Bethlehem when Jesus was born (Matthew 2:18). A tomb honored as Rachel’s still stands at the entrance to Bethlehem.'],
        ],
        ['edom', 'sychar', 'bethel', 'bethlehem', 'hebron'],
      ),
      read: ['GEN 33:1-17', 'GEN 35:1-29'],
    }),
  ],
}
