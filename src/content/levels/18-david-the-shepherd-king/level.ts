import { notLoaded } from '../../story-loading'
import type { Episode, Level, WhereWhen } from '../../types'
import { level18Music } from './music'
import { level18Quiz } from './quiz'

/**
 * Level 18 · David, the Shepherd King (1 Samuel 16–31; 2 Samuel 1–7), from the approved Level 18
 * script (docs/scripts/level-18-david-the-shepherd-king.md). The second level of Age VI.
 */

/** An episode's written details. Its set and scenes come with the level's story (./story.ts), loaded when the level is played. */
function built(fields: Omit<Episode, 'set' | 'scenes'>): Episode {
  return { ...fields, ...notLoaded() }
}

const where = (places: string[], notes: [string, string][]): WhereWhen => ({
  places,
  when: 'David’s rise, from shepherd boy to king in Jerusalem: about 1025–1000 BC',
  notes: notes.map(([title, text]) => ({ title, text })),
})

export const level18: Level = {
  id: 'l18',
  number: 18,
  title: 'David, the Shepherd King',
  age: 'VI · The Kingdom',
  passage: '1SA 16:1-2SA 7:29',
  music: level18Music,
  quiz: level18Quiz,
  story: () => import('./story'),
  // From Bethlehem to the valley of Elah, the caves of Adullam and En-gedi, Hebron, and Jerusalem.
  map: {
    at: { lat: 31.7, lon: 35.2 },
    label: 'Bethlehem',
    route: [
      { at: { lat: 31.69, lon: 34.96 }, label: 'Elah' },
      { at: { lat: 31.46, lon: 35.39 }, label: 'En-gedi' },
      { at: { lat: 31.53, lon: 35.1 }, label: 'Hebron' },
      { at: { lat: 31.78, lon: 35.23 }, label: 'Jerusalem' },
    ],
  },
  // From the approved script's "Reflection and prayer".
  reflection: {
    verse: '1SA 16:7',
    question: 'God looked past David’s older, taller brothers to see his heart. What does God see when he looks at your heart? And is there a “Goliath” in your life, something too big for you, that you could face “in the name of the LORD”?',
    prayer: [
      'Lord God, you look not at the outside, but at the heart.',
      'Give me a heart like David’s, that loves you and trusts you.',
      'When I face giants, remind me that the battle is yours.',
      'Make me a true friend, like Jonathan,',
      'and teach me to love even those who hurt me.',
      'Thank you for Jesus, the Son of David,',
      'my Good Shepherd and my King for ever.',
      'Amen.',
    ],
    traditional: {
      name: 'The shepherd’s psalm of David',
      lines: ['The Lord is my shepherd, I shall not want;', 'he makes me lie down in green pastures.', 'He leads me beside still waters; he restores my soul.'],
    },
  },
  episodes: [
    built({
      id: 'l18-e1',
      number: 1,
      emblem: 'horn-of-oil',
      title: 'The Shepherd Boy Anointed',
      passage: '1SA 16:1-16:23',
      minutes: 8,
      thread: { id: 'the-good-shepherd', spot: 'horn-glow', fromScene: 'l18-e1-s2' },
      whereWhen: where(['bethlehem'], [
        ['About 1025 BC', 'David was perhaps fifteen when Samuel anointed him.'],
        ['Bethlehem', 'Ruth’s town (Level 16). Jesse was the son of Obed, the son of Ruth and Boaz.'],
        ['A horn of oil', 'A hollow ram’s horn used as a flask. Kings and priests were anointed with olive oil, often scented with spices.'],
        ['The lyre', 'A small harp, the instrument of the Psalms. Many of the Psalms are called “of David.”'],
      ]),
      read: ['1SA 16:1-23'],
    }),
    built({
      id: 'l18-e2',
      number: 2,
      emblem: 'sling-and-stones',
      title: 'David and Goliath',
      passage: '1SA 17:1-17:58',
      minutes: 9,
      contentNote: 'David kills the giant Goliath. Goliath falls, seen from far off; nothing violent is shown.',
      thread: { id: 'the-battle-is-the-lords', spot: 'stone-glow', fromScene: 'l18-e2-s2' },
      whereWhen: where(['valley-of-elah'], [
        ['The valley of Elah', 'A wide valley in the low hills west of Bethlehem, between Israel’s hills and Philistine country. It still has a stream with smooth stones.'],
        ['Six cubits and a span', 'About three meters (nine and a half feet). Some old copies of the Bible say four cubits.'],
        ['Gath', 'One of the five Philistine cities (Level 15).'],
        ['The sling', 'A shepherd’s weapon: a strip of leather with a pocket, whirled and released. A good slinger could hit a target at a hundred meters.'],
      ]),
      read: ['1SA 17:1-51'],
    }),
    built({
      id: 'l18-e3',
      number: 3,
      emblem: 'robe-and-bow',
      title: 'Jonathan’s Friendship',
      passage: '1SA 18:1-20:42',
      minutes: 8,
      thread: { id: 'he-must-increase', spot: 'robe-glow', fromScene: 'l18-e3-s1' },
      whereWhen: where(['bethlehem'], [
        ['Gibeah', 'Saul’s home town and capital, a few kilometers north of Jerusalem (Level 15).'],
        ['“Saul has slain his thousands”', 'A victory song. Saul heard in it that the people loved David more than him.'],
        ['A covenant', 'Jonathan and David swore loyalty to each other and to each other’s children “for ever.” Years later, King David took care of Jonathan’s lame son, Mephibosheth (2 Samuel 9).'],
      ]),
      read: ['1SA 18:1-16', '1SA 20:1-42'],
    }),
    built({
      id: 'l18-e4',
      number: 4,
      emblem: 'bread-of-the-presence',
      title: 'On the Run from Saul',
      passage: '1SA 21:1-23:29',
      minutes: 8,
      thread: { id: 'the-holy-bread', spot: 'bread-glow', fromScene: 'l18-e4-s1' },
      whereWhen: where(['adullam'], [
        ['Nob', 'A town of priests near Jerusalem, where the tabernacle stood after Shiloh was lost (Level 17).'],
        ['The bread of the Presence', 'Twelve loaves set out on the golden table in the holy place every sabbath (Level 11).'],
        ['Adullam', 'A cave-riddled hill near the valley of Elah. Psalms 57 and 142 are titled “when he fled from Saul, in the cave.”'],
        ['The wilderness of Ziph', 'Bare hills south-east of Hebron, sloping down to the Dead Sea.'],
      ]),
      read: ['1SA 21:1-6', '1SA 22:1-2', '1SA 23:14-18'],
    }),
    built({
      id: 'l18-e5',
      number: 5,
      emblem: 'corner-of-the-robe',
      title: 'Sparing the LORD’s Anointed',
      passage: '1SA 24:1-26:25',
      minutes: 8,
      thread: { id: 'love-your-enemies', spot: 'corner-glow', fromScene: 'l18-e5-s1' },
      whereWhen: where(['en-gedi'], [
        ['En-gedi', 'A spring and waterfall in the cliffs above the Dead Sea, full of caves and wild goats. Its name means “spring of the kid.”'],
        ['The corner of the robe', 'A king’s robe was a sign of his kingdom (Level 17: Samuel’s robe, torn). David’s conscience troubled him even for cutting it.'],
        ['Abishai', 'David’s nephew, one of his bravest men, who wanted to kill Saul in his sleep.'],
      ]),
      read: ['1SA 24:1-22', '1SA 26:1-25'],
    }),
    built({
      id: 'l18-e6',
      number: 6,
      emblem: 'banner-over-zion',
      title: 'King in Jerusalem',
      passage: '2SA 1:1-5:10',
      minutes: 8,
      contentNote: 'Saul and Jonathan die in a battle with the Philistines. It is told in a sentence, and nothing is shown.',
      thread: { id: 'mount-zion', spot: 'banner-glow', fromScene: 'l18-e6-s3' },
      whereWhen: where(['hebron', 'jerusalem'], [
        ['Mount Gilboa', 'A ridge above the Jezreel Valley, near the spring of Harod (Level 15).'],
        ['Hebron', 'Where Abraham bought the cave to bury Sarah (Level 3). David reigned there seven and a half years.'],
        ['Jerusalem', 'A Jebusite town on a narrow ridge, so strong that its people said even the blind and the lame could defend it. Melchizedek had been its king in Abraham’s time, when it was called Salem (Level 3).'],
        ['About 1000 BC', 'David began to reign over all Israel.'],
      ]),
      read: ['1SA 31:1-13', '2SA 1:17-27', '2SA 5:1-10'],
    }),
    built({
      id: 'l18-e7',
      number: 7,
      emblem: 'david-dancing',
      title: 'David Dances Before the Ark',
      passage: '2SA 6:1-6:23',
      minutes: 8,
      contentNote: 'When the ark is first moved, a man named Uzzah touches it and dies. It is told in a sentence, and nothing is shown.',
      thread: { id: 'ark-of-the-new-covenant', spot: 'ark-glow', fromScene: 'l18-e7-s2' },
      whereWhen: where(['jerusalem'], [
        ['Baale-judah', 'Another name for Kiriath-jearim, a hill town where the ark had stayed for twenty years after it came home from the Philistines.'],
        ['The ark on a cart', 'The Philistines had sent it home on a cart (Level 17), but God’s law said the Levites must carry it on poles (Numbers 4:15). David learned from Uzzah’s death to do it God’s way.'],
        ['A linen ephod', 'A simple priestly garment. David danced not in royal robes but like a humble servant before God.'],
        ['Michal', 'Saul’s daughter, David’s first wife.'],
      ]),
      read: ['2SA 6:1-23'],
    }),
    built({
      id: 'l18-e8',
      number: 8,
      emblem: 'house-for-ever',
      title: 'God’s Covenant with David',
      passage: '2SA 7:1-7:29',
      minutes: 8,
      thread: { id: 'son-of-david', spot: 'house-glow', fromScene: 'l18-e8-s2' },
      whereWhen: where(['jerusalem'], [
        ['Nathan', 'A prophet at David’s court. He would later have to bring David a very different message (Level 19).'],
        ['A house of cedar', 'Cedar wood came from Lebanon, a gift from Hiram, king of Tyre. It smelled sweet and lasted for centuries.'],
        ['“House”', 'In Hebrew the same word means a building and a family. David wanted to build God a house; God promised David a house.'],
        ['“I will be his father, and he shall be my son”', 'The letter to the Hebrews applies these words to Jesus (Hebrews 1:5).'],
      ]),
      read: ['2SA 7:1-29'],
    }),
  ],
}
