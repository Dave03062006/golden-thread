import type { SceneDescription } from '../../../scene/types'
import type { Episode, Level, WhereWhen } from '../../types'
import { episode1 } from './episode-1'
import { episode2 } from './episode-2'
import { episode3 } from './episode-3'
import { episode4 } from './episode-4'
import { level3Music } from './music'
import { level3Quiz } from './quiz'

/**
 * Level 3 · Abraham, Father of Faith (Genesis 12–23), from the approved Level 3 script
 * (docs/scripts/level-03-abraham-father-of-faith.md). Episodes are added as they're built;
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

const where = (notes: [string, string][], places: string[] = []): WhereWhen => ({
  places,
  when: 'Abraham’s time: roughly 2000–1700 BC, as scholars estimate',
  notes: notes.map(([title, text]) => ({ title, text })),
})

export const level3: Level = {
  id: 'l03',
  number: 3,
  title: 'Abraham, Father of Faith',
  age: 'II · The Patriarchs',
  passage: 'GEN 12:1-23:20',
  music: level3Music,
  quiz: level3Quiz,
  // Haran, where God called Abram; then his journey: Shechem and Bethel, down to Egypt
  // and back, Mamre at Hebron, and Moriah.
  map: {
    at: { lat: 36.86, lon: 39.03 },
    label: 'Haran',
    route: [
      { at: { lat: 32.21, lon: 35.28 }, label: 'Shechem' },
      { at: { lat: 31.93, lon: 35.22 }, label: 'Bethel' },
      { at: { lat: 29.85, lon: 31.25 }, label: 'Egypt' },
      { at: { lat: 31.53, lon: 35.1 }, label: 'Mamre' },
      { at: { lat: 31.78, lon: 35.23 }, label: 'Moriah' },
    ],
  },
  // From the approved script's "Reflection and prayer".
  reflection: {
    verse: 'GEN 15:6',
    question: 'Abraham left home without knowing where he was going, and waited twenty-five years for God’s promise. What is God asking you to trust him with right now, even though you can’t see how it will turn out?',
    prayer: [
      'God of Abraham,',
      'you called him, and he went.',
      'Give me his faith, to follow you when I can’t see the way,',
      'and his patience, to wait for your promises.',
      'Make me welcoming like Abraham at Mamre,',
      'and bold to pray for others as he prayed for Sodom.',
      'When you ask me for what I love most,',
      'help me remember that you will provide,',
      'as you gave us your only Son, the Lamb.',
      'Make me a blessing, like Abraham, for everyone I meet.',
      'Amen.',
    ],
    traditional: {
      name: 'Glory Be',
      lines: ['Glory be to the Father, and to the Son, and to the Holy Spirit.', 'As it was in the beginning, is now, and ever shall be, world without end. Amen.'],
    },
  },
  episodes: [
    built(episode1, {
      id: 'l03-e1',
      number: 1,
      emblem: 'call',
      title: 'The Call',
      passage: 'GEN 12:1-9',
      minutes: 6,
      thread: { id: 'the-call-to-follow', spot: 'abram-staff', fromScene: 'l03-e1-s4' },
      whereWhen: where(
        [
          ['Haran to Canaan', 'About 650 kilometers on foot, with flocks: a journey of weeks. The road ran south past Damascus into the hill country.'],
          ['Shechem and Bethel', 'Two places in the hills of Canaan that will matter again and again in the Bible. Jacob will dream of a ladder at Bethel.'],
        ],
        ['haran', 'shechem', 'bethel'],
      ),
      read: ['GEN 12:1-9'],
    }),
    built(episode2, {
      id: 'l03-e2',
      number: 2,
      emblem: 'altar-hill',
      title: 'Lot Chooses the Plain',
      passage: 'GEN 12:10-13:18',
      minutes: 7,
      thread: { id: 'seek-first-the-kingdom', spot: 'bethel-altar', fromScene: 'l03-e2-s4' },
      whereWhen: where(
        [
          ['Egypt', 'The Nile made Egypt the breadbasket of the ancient world. In famines, families from Canaan often went down to Egypt for food, as Jacob’s sons will.'],
          ['The Jordan valley', 'The valley of the Jordan River runs down to the Dead Sea, the lowest land on earth. Sodom and Gomorrah were somewhere near its southern end.'],
          ['Mamre and Hebron', 'The oaks of Mamre were near Hebron, in the southern hills. Abraham’s family tomb is there to this day.'],
        ],
        ['egypt', 'hebron'],
      ),
      read: ['GEN 12:10-13:18'],
    }),
    built(episode3, {
      id: 'l03-e3',
      number: 3,
      emblem: 'bread-wine',
      title: 'Melchizedek’s Bread and Wine',
      passage: 'GEN 14:1-24',
      minutes: 6,
      thread: { id: 'melchizedek-and-the-eucharist', spot: 'bread-and-wine', fromScene: 'l03-e3-s3' },
      whereWhen: where(
        [
          ['Salem', 'Ancient tradition, and Psalm 76, identify Salem with Jerusalem, the city of peace (shalom).'],
          ['Dan', 'At the far north of the land, near the springs of the Jordan. Abram chased the kings nearly 250 kilometers.'],
          ['A tenth', 'Abram gave Melchizedek a tenth of everything: the first tithe in the Bible.'],
        ],
        ['dan', 'jerusalem'],
      ),
      read: ['GEN 14:1-24'],
    }),
    built(episode4, {
      id: 'l03-e4',
      number: 4,
      emblem: 'stars',
      title: 'Count the Stars',
      passage: 'GEN 15:1-21',
      minutes: 6,
      thread: { id: 'children-of-abraham-by-faith', spot: 'brightest-star', fromScene: 'l03-e4-s2' },
      whereWhen: where(
        [
          ['The stars', 'On a clear night, far from any city, a person can see about 3,000 stars. Abram, in the desert air, saw the sky as few of us ever do.'],
          ['“Reckoned as righteousness”', 'St Paul quotes this verse to explain that we are made right with God through faith (Romans 4). St James quotes it too, adding that Abraham’s faith showed itself in what he did (James 2:21–23).'],
          ['A covenant oath', 'Cutting animals in two to seal an agreement is known from other ancient documents. The prophet Jeremiah mentions it (Jeremiah 34:18).'],
        ],
        ['hebron'],
      ),
      read: ['GEN 15:1-21'],
    }),
    built(pending('l03-e5'), {
      id: 'l03-e5',
      number: 5,
      emblem: 'well',
      title: 'Hagar and Ishmael',
      passage: 'GEN 16:1-16',
      minutes: 7,
      thread: { id: 'living-water', spot: 'the-well', fromScene: 'l03-e5-s4' },
      whereWhen: where(
        [
          ['Beer-sheba', 'In the dry south of the land, the Negeb, at the edge of the desert. Its name means “well of the oath” (Genesis 21:31).'],
          ['Ishmael', 'God kept his word to Hagar too: Ishmael became a great nation, with twelve princes. Many Arab peoples look to him as their ancestor.'],
          ['The God who sees', 'In Hebrew, El Roi. The spring where the angel found Hagar was named Beer-lahai-roi, “the well of the Living One who sees me.”'],
        ],
        ['beersheba'],
      ),
      read: ['GEN 16:1-16', 'GEN 21:8-21'],
    }),
    built(pending('l03-e6'), {
      id: 'l03-e6',
      number: 6,
      emblem: 'new-name',
      title: 'New Names, Everlasting Covenant',
      passage: 'GEN 17:1-27',
      minutes: 6,
      thread: { id: 'a-new-name', spot: 'new-name', fromScene: 'l03-e6-s2' },
      whereWhen: where(
        [
          ['God Almighty', 'In Hebrew, El Shaddai, one of the oldest names of God in the Bible.'],
          ['Two names explained', 'Abram means “exalted father”; Abraham sounds like “father of a multitude.” Sarai and Sarah both mean “princess”; the new form marks her new mission as mother of nations.'],
          ['Circumcision and Baptism', 'St Paul calls Baptism “the circumcision of Christ,” a sign made “without hands” (Colossians 2:11–12).'],
        ],
        ['hebron'],
      ),
      read: ['GEN 17:1-27'],
    }),
    built(pending('l03-e7'), {
      id: 'l03-e7',
      number: 7,
      emblem: 'visitors',
      title: 'Three Visitors at Mamre',
      passage: 'GEN 18:1-15',
      minutes: 6,
      thread: { id: 'nothing-is-impossible', spot: 'tent-door', fromScene: 'l03-e7-s3' },
      whereWhen: where(
        [
          ['Hospitality', 'In the desert, welcoming a traveler with water, food and shade could save a life. The Letter to the Hebrews says that some, by showing hospitality, “have entertained angels unawares” (Hebrews 13:2).'],
          ['The icon of the Trinity', 'The Russian painter Andrei Rublev painted the three visitors at Abraham’s table around 1411. It is one of the most famous icons in the world, often called The Trinity.'],
          ['Three measures', 'About 20 kilograms of flour: enough bread for a crowd. Abraham was generous.'],
        ],
        ['hebron'],
      ),
      read: ['GEN 18:1-15'],
    }),
    built(pending('l03-e8'), {
      id: 'l03-e8',
      number: 8,
      emblem: 'pleading',
      title: 'Sodom and Gomorrah',
      passage: 'GEN 18:16-19:29',
      minutes: 8,
      contentNote: 'This episode tells of God’s judgment on two wicked cities. It is told gently: no one is shown being hurt, and the fire is seen only from far away.',
      thread: { id: 'christ-intercedes', spot: 'pleading-place', fromScene: 'l03-e8-s2' },
      whereWhen: where(
        [
          ['The cities of the plain', 'No one knows exactly where Sodom and Gomorrah stood. Most scholars look near the southern end of the Dead Sea, a land of salt and bitumen.'],
          ['What was Sodom’s sin?', 'The prophet Ezekiel says Sodom had “pride, surfeit of food, and prosperous ease, but did not aid the poor and needy” (Ezekiel 16:49). Genesis also shows its violence against strangers, the opposite of Abraham’s hospitality.'],
          ['“Remember Lot’s wife”', 'Jesus himself recalled her (Luke 17:32): don’t look back with longing at what God has called you away from.'],
        ],
        ['sodom', 'hebron'],
      ),
      read: ['GEN 18:16-19:29'],
    }),
    built(pending('l03-e9'), {
      id: 'l03-e9',
      number: 9,
      emblem: 'laughter',
      title: 'Laughter: Isaac Is Born',
      passage: 'GEN 21:1-8',
      minutes: 5,
      thread: { id: 'children-of-promise', spot: 'baby-isaac', fromScene: 'l03-e9-s1' },
      whereWhen: where(
        [
          ['Isaac', 'His name means “he laughs.” Sarah’s laughter of doubt became laughter of joy.'],
          ['Weaning', 'In the ancient world children were often weaned at about two or three years old. Surviving infancy was a reason to celebrate.'],
          ['Twenty-five years', 'Abram was seventy-five when he left Haran and a hundred when Isaac was born. Faith waited a long time.'],
        ],
        ['hebron'],
      ),
      read: ['GEN 21:1-8'],
    }),
    built(pending('l03-e10'), {
      id: 'l03-e10',
      number: 10,
      emblem: 'ram',
      title: 'The Binding of Isaac',
      passage: 'GEN 22:1-23:20',
      minutes: 8,
      contentNote: 'In this episode God tests Abraham by asking him to give up his son. It is a hard story, told gently, and it ends with God providing a ram instead. No one is harmed.',
      thread: { id: 'the-lamb-god-provides', spot: 'the-ram', fromScene: 'l03-e10-s4' },
      whereWhen: where(
        [
          ['Moriah', 'The Second Book of Chronicles says Solomon built the Temple in Jerusalem “on Mount Moriah” (2 Chronicles 3:1). Calvary is just outside the old city walls nearby.'],
          ['“The LORD will provide”', 'In Hebrew, YHWH yireh. The worship song “Jireh” takes its name from this verse.'],
          ['The cave of Machpelah', 'In Hebron, the tomb of Abraham and Sarah, and later of Isaac, Rebekah, Jacob and Leah, is still honored by Jews, Christians and Muslims.'],
        ],
        ['jerusalem', 'beersheba', 'hebron'],
      ),
      read: ['GEN 22:1-19', 'GEN 23:1-20'],
    }),
  ],
}
