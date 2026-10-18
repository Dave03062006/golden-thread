import type { SceneDescription } from '../../../scene/types'
import type { Episode, Level, WhereWhen } from '../../types'
import { episode1 } from './episode-1'
import { episode2 } from './episode-2'
import { episode3 } from './episode-3'
import { episode4 } from './episode-4'
import { episode5 } from './episode-5'
import { level2Music } from './music'
import { level2Quiz } from './quiz'

/**
 * Level 2 · Noah and the Nations (Genesis 6–11), from the approved Level 2 script
 * (docs/scripts/level-02-noah-and-the-nations.md). Episodes are added as they're built;
 * one still being made has no scenes yet, and the game stops before it.
 */

/** An episode that's built: its written details, with its set and scenes. */
function built(story: Pick<Episode, 'set' | 'scenes'>, fields: Omit<Episode, 'set' | 'scenes'>): Episode {
  return { ...fields, ...story }
}

/** An episode still being made: an empty set and no scenes. */
function pending(id: string): Pick<Episode, 'set' | 'scenes'> {
  const still = [{ at: 0, value: 0 }]
  const set: SceneDescription = { id: `${id}-pending`, title: '', layers: [], actors: [], camera: { loop: 'hold', x: still, y: still, zoom: [{ at: 0, value: 1 }] } }
  return { set, scenes: [] }
}

const where = (when: string, notes: [string, string][], places: string[] = []): WhereWhen => ({
  places,
  when,
  notes: notes.map(([title, text]) => ({ title, text })),
})

const BEFORE_HISTORY = 'Before recorded history'

export const level2: Level = {
  id: 'l02',
  number: 2,
  title: 'Noah and the Nations',
  age: 'I · The Beginning',
  passage: 'GEN 6:1-11:32',
  music: level2Music,
  quiz: level2Quiz,
  // The mountains of Ararat, where the ark came to rest.
  // Then the route of the nations and of Abram's family: Babel, then Ur (Level 3 begins in Haran).
  map: {
    at: { lat: 39.7, lon: 44.3 },
    label: 'Ararat',
    route: [
      { at: { lat: 32.54, lon: 44.42 }, label: 'Babel' },
      { at: { lat: 30.96, lon: 46.1 }, label: 'Ur' },
    ],
  },
  // From the approved script's "Reflection and prayer".
  reflection: {
    verse: 'GEN 8:1',
    question: 'Noah’s family waited in the dark ark for more than a year, with no land in sight. When have you had to wait for God? What helped you trust that he remembered you?',
    prayer: [
      'Faithful God,',
      'you remembered Noah in the flood, and you remember me.',
      'When the waters rise around me, keep me safe in your ark, your Church.',
      'Thank you for the water of my baptism,',
      'and for your Spirit, who comes like a dove with peace.',
      'When I see the rainbow, help me remember your promises,',
      'and help me keep my promises to you.',
      'Gather all the nations into one family,',
      'from every people and every language.',
      'Amen.',
    ],
    traditional: {
      name: 'Glory Be',
      lines: ['Glory be to the Father, and to the Son, and to the Holy Spirit.', 'As it was in the beginning, is now, and ever shall be, world without end. Amen.'],
    },
  },
  episodes: [
    built(episode1, {
      id: 'l02-e1',
      number: 1,
      emblem: 'walk',
      title: 'A World Gone Wrong, a Man Who Walked with God',
      passage: 'GEN 6:1-13',
      minutes: 6,
      thread: { id: 'found-favor-with-god', spot: 'noah-lamp', fromScene: 'l02-e1-s3' },
      whereWhen: where(BEFORE_HISTORY, [
        [
          '“The sons of God”',
          'Genesis 6:1–4 tells of “the sons of God” taking wives from “the daughters of men.” Some ancient writers saw angels in these verses; many Church Fathers, like St Augustine, saw the family of Seth mixing with the family of Cain and losing its faith.',
        ],
        [
          'Other flood stories',
          'The peoples of Mesopotamia told their own flood stories, like the tale of Utnapishtim in the Epic of Gilgamesh. In them, the gods send the flood because humans are too noisy. In Genesis, one God acts because of violence and sin, grieves over it, and saves the righteous.',
        ],
      ]),
      read: ['GEN 6:1-13'],
    }),
    built(episode2, {
      id: 'l02-e2',
      number: 2,
      emblem: 'ark',
      title: 'Building the Ark',
      passage: 'GEN 6:14-7:5',
      minutes: 7,
      thread: { id: 'the-ark-and-the-church', spot: 'ark-door', fromScene: 'l02-e2-s2' },
      whereWhen: where(BEFORE_HISTORY, [
        ['Gopher wood', 'No one knows for sure what tree “gopher wood” was. It may have been cypress, which shipbuilders long prized because it resists rot.'],
        ['The shape of a barge', 'Six times longer than it was wide, the ark had the proportions of a stable barge. It had no sails and no rudder: it only needed to float. God would steer it.'],
        ['The word “ark”', 'The Hebrew word for the ark appears only one other time in the Bible: for the basket of reeds, sealed with pitch, that carried the baby Moses on the Nile.'],
      ]),
      read: ['GEN 6:14-7:5'],
    }),
    built(episode3, {
      id: 'l02-e3',
      number: 3,
      emblem: 'storm',
      title: 'The Flood',
      passage: 'GEN 7:6-24',
      minutes: 8,
      contentNote: 'This episode tells of the Flood, in which many died. It is told gently, and no one is shown suffering.',
      thread: { id: 'the-flood-and-baptism', spot: 'ark-window', fromScene: 'l02-e3-s1' },
      whereWhen: where(BEFORE_HISTORY, [
        ['Forty days', 'Forty is the Bible’s number for testing and new beginnings: Moses on Sinai, Israel in the desert, Elijah on the way to Horeb, Jesus in the desert, and the forty days of Lent.'],
        ['The whole earth', 'Genesis tells the Flood as covering the whole world it knew. Catholics are free to understand its size in different ways; what Genesis teaches is God’s judgment on sin and his faithfulness in saving.'],
        ['Eight people', 'Noah, his wife, Shem, Ham, Japheth and their wives. The Church Fathers noticed the number eight: the day after the seventh, the day of the Resurrection.'],
      ]),
      read: ['GEN 7:6-24'],
    }),
    built(episode4, {
      id: 'l02-e4',
      number: 4,
      emblem: 'olive-dove',
      title: 'The Dove Returns',
      passage: 'GEN 8:1-19',
      minutes: 7,
      thread: { id: 'the-dove-and-the-spirit', spot: 'olive-leaf', fromScene: 'l02-e4-s4' },
      whereWhen: where(
        BEFORE_HISTORY,
        [
          ['Ararat', 'Genesis says “the mountains of Ararat,” a range, not one peak: the land the Assyrians called Urartu, where Turkey, Armenia and Iran meet today.'],
          ['The raven and the dove', 'A raven can live on what floats on the water. A dove needs dry ground and green trees, so her return with a leaf told Noah that the land was growing again.'],
          ['The olive branch', 'Since this story, a dove with an olive branch has been a sign of peace all over the world.'],
        ],
        ['ararat'],
      ),
      read: ['GEN 8:1-19'],
    }),
    built(episode5, {
      id: 'l02-e5',
      number: 5,
      emblem: 'rainbow',
      title: 'The Rainbow Covenant',
      passage: 'GEN 8:20-9:29',
      minutes: 8,
      thread: { id: 'the-rainbow-and-the-new-covenant', spot: 'rainbow-crown', fromScene: 'l02-e5-s3' },
      whereWhen: where(
        BEFORE_HISTORY,
        [
          ['God’s bow', 'The Hebrew word for “bow” is the word for a warrior’s bow. Many readers have seen in the rainbow God hanging up his bow of war, pointed away from the earth, as a sign of peace.'],
          ['A covenant with everyone', 'God’s covenant with Noah was made with all of humanity and every living thing. The Catechism says it remains in force for all the nations until the Gospel reaches them (Catechism 58).'],
          [
            'A curse misused',
            'Noah blessed Shem and Japheth and spoke a curse on Canaan. Centuries later some people twisted these words to claim God approved of slavery. That was a terrible misreading: the Church teaches that every human being has equal dignity (Catechism 1935).',
          ],
        ],
        ['ararat'],
      ),
      read: ['GEN 8:20-9:29'],
    }),
    built(pending('l02-e6'), {
      id: 'l02-e6',
      number: 6,
      emblem: 'tower',
      title: 'The Tower of Babel',
      passage: 'GEN 10:1-11:9',
      minutes: 8,
      thread: { id: 'babel-and-pentecost', spot: 'last-brick', fromScene: 'l02-e6-s5' },
      whereWhen: where(
        BEFORE_HISTORY,
        [
          ['Babel and Babylon', '“Babel” is the Hebrew name for Babylon, in the land of Shinar, in what is now southern Iraq. Genesis plays on a Hebrew word that sounds like it, balal, “to confuse.”'],
          ['Ziggurats', 'The cities of Mesopotamia built great stepped towers of baked brick called ziggurats, with a temple on top, where they believed heaven and earth met.'],
          ['Seventy nations', 'Genesis 10 names seventy peoples, a number that stands for all the nations of the world.'],
        ],
        ['shinar', 'babel'],
      ),
      read: ['GEN 10:1-11:9'],
    }),
    built(pending('l02-e7'), {
      id: 'l02-e7',
      number: 7,
      emblem: 'star',
      title: 'From Shem to Abram',
      passage: 'GEN 11:10-32',
      minutes: 6,
      thread: { id: 'all-nations-blessed', spot: 'abram-star', fromScene: 'l02-e7-s4' },
      whereWhen: where(
        'Abram’s time: roughly 2000–1700 BC, as scholars estimate',
        [
          ['Ur', 'Ur of the Chaldeans was one of the greatest cities of its time, near where the Euphrates met the Persian Gulf, in southern Iraq today.'],
          ['Haran', 'A trading city far to the northwest, in southern Turkey today. Both Ur and Haran honored the moon god, Sin. It was from a world of many gods that the one God called Abram.'],
          ['“Hebrew”', 'The name Eber may be the root of the word “Hebrew,” the name later given to Abram’s people.'],
        ],
        ['ur', 'haran'],
      ),
      read: ['GEN 11:10-12:1'],
    }),
  ],
}
