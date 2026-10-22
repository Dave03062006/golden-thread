import type { Episode, Level, WhereWhen } from '../../types'
import { episode1 } from './episode-1'
import { episode2 } from './episode-2'
import { episode3 } from './episode-3'
import { episode4 } from './episode-4'
import { episode5 } from './episode-5'
import { level7Music } from './music'
import { level7Quiz } from './quiz'

/**
 * Level 7 · Moses Is Called (Exodus 1–4), from the approved Level 7 script
 * (docs/scripts/level-07-moses-is-called.md).
 */

/** An episode that's built: its written details, with its set and scenes. */
function built(story: Pick<Episode, 'set' | 'scenes'>, fields: Omit<Episode, 'set' | 'scenes'>): Episode {
  return { ...fields, ...story }
}

const where = (notes: [string, string][], places: string[]): WhereWhen => ({
  places,
  when: 'Exodus doesn’t name the Pharaoh: perhaps the 1200s BC, perhaps earlier',
  notes: notes.map(([title, text]) => ({ title, text })),
})

export const level7: Level = {
  id: 'l07',
  number: 7,
  title: 'Moses Is Called',
  age: 'III · Out of Egypt',
  passage: 'EXO 1:1-4:31',
  music: level7Music,
  quiz: level7Quiz,
  // Egypt, where Moses was born; his flight to Midian; Horeb, the mountain of God; and back to Goshen.
  map: {
    at: { lat: 30.9, lon: 31.5 },
    label: 'Egypt',
    route: [
      { at: { lat: 28.5, lon: 35.6 }, label: 'Midian' },
      { at: { lat: 28.54, lon: 33.97 }, label: 'Horeb, the mountain of God' },
      { at: { lat: 30.6, lon: 31.9 }, label: 'Goshen' },
    ],
  },
  // From the approved script's "Reflection and prayer".
  reflection: {
    verse: 'EXO 3:12',
    question: 'Moses felt too small for what God asked: “Who am I?” God didn’t tell him he was big enough. He said, “I will be with you.” Is there something that feels too big for you? Can you ask God to be with you in it?',
    prayer: [
      'Lord God, you saw your people suffering in Egypt,',
      'you heard their cry, and you came to set them free.',
      'Thank you for the brave midwives, who chose you over the king,',
      'and for Moses’ mother, who trusted you with her baby.',
      'When you call me by name, help me to answer, “Here am I,”',
      'even when I feel too small.',
      'Be with me, as you were with Moses,',
      'and help me to help those who are pushed aside.',
      'Thank you for Jesus, who is I AM, and is always with me.',
      'Amen.',
    ],
    traditional: {
      name: 'Glory Be',
      lines: ['Glory be to the Father, and to the Son, and to the Holy Spirit.', 'As it was in the beginning, is now, and ever shall be, world without end. Amen.'],
    },
  },
  episodes: [
    built(episode1, {
      id: 'l07-e1',
      number: 1,
      emblem: 'window-lamp',
      title: 'Slavery and the Brave Midwives',
      passage: 'EXO 1:1-22',
      minutes: 8,
      contentNote: 'In this episode Pharaoh makes the Hebrews slaves, and orders that their baby boys be killed. Two brave women save them. Nothing is shown.',
      thread: { id: 'the-holy-innocents', spot: 'safe-lamp', fromScene: 'l07-e1-s4' },
      whereWhen: where(
        [
          ['When', 'Exodus doesn’t name the Pharaoh. Many scholars think of the 1200s BC and Pharaoh Ramesses II, who built a great city in the Nile delta; others place the events earlier. Genesis 15:13 had foretold it: Abraham’s descendants would be “sojourners in a land that is not theirs.”'],
          ['Pithom and Raamses', 'Store-cities in the eastern Nile delta, near Goshen, where grain and supplies were kept. Their ruins have been searched for by archaeologists for over a century.'],
          ['Mud bricks', 'Egyptian bricks were made of Nile mud mixed with straw, pressed in wooden molds and dried in the sun. Paintings from the time show slaves making them.'],
        ],
        ['egypt', 'goshen'],
      ),
      read: ['EXO 1:1-22'],
    }),
    built(episode2, {
      id: 'l07-e2',
      number: 2,
      emblem: 'reed-basket',
      title: 'The Baby in the Basket',
      passage: 'EXO 2:1-10',
      minutes: 8,
      thread: { id: 'adoption-as-sons', spot: 'princess-baby', fromScene: 'l07-e2-s3' },
      whereWhen: where(
        [
          ['Papyrus', 'The “bulrushes” were papyrus, a tall reed that grew thick along the Nile. Egyptians made boats, baskets, mats and paper from it.'],
          ['The same word as Noah’s ark', 'The Hebrew word for this basket, tebah, is used only one other time in the Bible: for Noah’s ark. Both saved a life from the waters.'],
          ['The sister', 'She isn’t named here. Later the Bible tells us that Moses’ sister was Miriam (Exodus 15:20; Numbers 26:59).'],
          ['The name Moses', 'In Egyptian, mose means “child” or “is born” (as in Ramesses, “Ra is born”). In Hebrew it sounds like mashah, “to draw out.”'],
        ],
        ['egypt', 'nile'],
      ),
      read: ['EXO 2:1-10'],
    }),
    built(episode3, {
      id: 'l07-e3',
      number: 3,
      emblem: 'water-trough',
      title: 'Flight to Midian',
      passage: 'EXO 2:11-25',
      minutes: 8,
      contentNote: 'In this episode Moses kills an Egyptian who was beating a Hebrew slave. It is told in a few words, and nothing is shown.',
      thread: { id: 'the-refused-deliverer', spot: 'midian-well', fromScene: 'l07-e3-s3' },
      whereWhen: where(
        [
          ['Midian', 'The land of the Midianites, east of the Gulf of Aqaba, in what is now north-western Saudi Arabia. They were desert herders, and distant relatives of Israel: Midian was a son of Abraham (Genesis 25:2).'],
          ['Forty years', 'St. Stephen says Moses was forty when he fled, and stayed in Midian forty years (Acts 7:23, 30).'],
          ['Two names', 'Moses’ father-in-law is called Reuel here, and Jethro in the next chapters. Many people then had more than one name, or a name and a title.'],
          ['Gershom', 'The name sounds like ger sham, “a stranger there.”'],
        ],
        ['egypt', 'midian'],
      ),
      read: ['EXO 2:11-25'],
    }),
    built(episode4, {
      id: 'l07-e4',
      number: 4,
      emblem: 'burning-bush',
      title: 'The Burning Bush',
      passage: 'EXO 3:1-4:17',
      minutes: 10,
      thread: { id: 'i-am', spot: 'bush-flame', fromScene: 'l07-e4-s4' },
      whereWhen: where(
        [
          ['Horeb', 'Another name for Mount Sinai, where God would later give the Ten Commandments (Exodus 19). Tradition places it in the south of the Sinai peninsula, at Jebel Musa, “Moses’ Mountain,” where St. Catherine’s Monastery has stood since the 500s.'],
          ['Shoes off', 'Taking off one’s shoes was a sign of reverence, as in many places of prayer today.'],
          ['The holy name', 'In Hebrew, God’s name is written with four letters, YHWH. Out of reverence, Jews do not say it aloud, but say “the Lord” (Adonai) instead. That is why the RSV prints it as LORD.'],
          ['Milk and honey', 'A land good for flocks (milk) and for bees and fruit trees (honey): a land of plenty.'],
        ],
        ['horeb', 'midian'],
      ),
      read: ['EXO 3:1-4:17'],
    }),
    built(episode5, {
      id: 'l07-e5',
      number: 5,
      emblem: 'rod-serpent',
      title: 'Return to Egypt',
      passage: 'EXO 4:18-31',
      minutes: 6,
      thread: { id: 'the-new-moses', spot: 'rod-glow', fromScene: 'l07-e5-s1' },
      whereWhen: where(
        [
          ['Aaron', 'Moses’ older brother, by three years (Exodus 7:7). He would become Israel’s first high priest.'],
          ['The elders', 'The heads of Israel’s families and tribes, who spoke for the people.'],
          ['The signs', 'A sign was not a magic trick: it was God showing that he had really sent Moses.'],
        ],
        ['midian', 'horeb', 'goshen'],
      ),
      read: ['EXO 4:18-31'],
    }),
  ],
}
