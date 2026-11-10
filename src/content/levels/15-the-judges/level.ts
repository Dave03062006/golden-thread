import type { Episode, Level, WhereWhen } from '../../types'
import { episode1 } from './episode-1'
import { episode2 } from './episode-2'
import { episode3 } from './episode-3'
import { episode4 } from './episode-4'
import { episode5 } from './episode-5'
import { episode6 } from './episode-6'
import { level15Music } from './music'
import { level15Quiz } from './quiz'

/**
 * Level 15 · The Judges (Judges 2–8; 10–11; 13–14; 16–18; 20–21), from the approved Level 15
 * script (docs/scripts/level-15-the-judges.md). The second level of Age V, the Promised Land.
 */

/** An episode that's built: its written details, with its set and scenes. */
function built(story: Pick<Episode, 'set' | 'scenes'>, fields: Omit<Episode, 'set' | 'scenes'>): Episode {
  return { ...fields, ...story }
}

const where = (places: string[], notes: [string, string][]): WhereWhen => ({
  places,
  when: 'The two centuries between Joshua and the first king, Saul: about 1200–1050 BC',
  notes: notes.map(([title, text]) => ({ title, text })),
})

export const level15: Level = {
  id: 'l15',
  number: 15,
  title: 'The Judges',
  age: 'V · The Promised Land',
  passage: 'JDG 2:6-21:25',
  music: level15Music,
  quiz: level15Quiz,
  // The places of the judges across the land, from Mount Tabor in the north to Gaza on the coast.
  map: {
    at: { lat: 32.69, lon: 35.39 },
    label: 'Mount Tabor',
    route: [
      { at: { lat: 32.55, lon: 35.36 }, label: 'Harod' },
      { at: { lat: 32.3, lon: 35.8 }, label: 'Mizpah' },
      { at: { lat: 31.77, lon: 34.98 }, label: 'Zorah' },
      { at: { lat: 31.5, lon: 34.46 }, label: 'Gaza' },
    ],
  },
  // From the approved script's "Reflection and prayer".
  reflection: {
    verse: 'JDG 8:23',
    question: 'Again and again, God’s people forgot him when life was easy, and cried to him when it was hard. When do you find it easy to forget God? And what would it mean, this week, to let God decide what is right, and not just your own eyes?',
    prayer: [
      'Lord God, you never forgot your people,',
      'even when they forgot you again and again.',
      'When I wander away, call me back;',
      'when I cry to you, hear me, as you heard them.',
      'Make me brave like Deborah, humble like Gideon,',
      'and careful with my promises.',
      'Be my King, Lord Jesus, born in Bethlehem,',
      'so that I do not just do what is right in my own eyes,',
      'but what is right in yours.',
      'Amen.',
    ],
    traditional: {
      name: 'The oldest prayer of the Mass, the cry of a people who need God',
      lines: ['Lord, have mercy.', 'Christ, have mercy.', 'Lord, have mercy.'],
    },
  },
  episodes: [
    built(episode1, {
      id: 'l15-e1',
      number: 1,
      emblem: 'circle-of-the-judges',
      title: 'The Cycle of Forgetting',
      passage: 'JDG 2:6-3:31',
      minutes: 8,
      thread: { id: 'faithful-when-we-are-not', spot: 'judge-glow', fromScene: 'l15-e1-s3' },
      whereWhen: where(['shiloh'], [
        ['Judges', 'In Hebrew, shofetim: not only judges in a court, but leaders whom God raised up to rescue his people and rule them for a time. The book names twelve of them.'],
        ['About 1200–1050 BC', 'The judges lived in the two centuries between Joshua and the first king, Saul. The tribes lived apart in their own lands, with no capital and no king.'],
        ['The Baals and the Ashtaroth', 'Baal was the Canaanite god of storms and rain, and Ashtart a goddess of fertility. People hoped that serving them would bring good harvests.'],
        ['Othniel', 'A nephew of Caleb, the brave old spy of Levels 12 and 14.'],
      ]),
      read: ['JDG 2:6-3:11'],
    }),
    built(episode2, {
      id: 'l15-e2',
      number: 2,
      emblem: 'palm-of-deborah',
      title: 'Deborah and Barak',
      passage: 'JDG 4:1-5:31',
      minutes: 9,
      thread: { id: 'shine-like-the-sun', spot: 'sun-glow', fromScene: 'l15-e2-s3' },
      whereWhen: where(['mount-tabor'], [
        ['Mount Tabor', 'A round mountain, 575 meters high, standing alone at the edge of the Jezreel Valley in Galilee. Since the 300s, Christians have honored it as the mountain of the Transfiguration.'],
        ['The river Kishon', 'It runs across the Jezreel Valley to the sea near Mount Carmel. In summer it is almost dry, but winter storms can flood the whole plain in a few hours.'],
        ['Chariots of iron', 'The tanks of the ancient world, unbeatable on hard, flat ground, and useless in mud.'],
        ['Deborah', 'The only judge who is also called a prophetess, and the only woman among the judges. Her song in Judges 5 is one of the oldest poems in the Bible.'],
        ['Jael', 'A woman of the Kenites, the family of Moses’ father-in-law.'],
      ]),
      read: ['JDG 4:1-24', 'JDG 5:1-31'],
    }),
    built(episode3, {
      id: 'l15-e3',
      number: 3,
      emblem: 'torches-and-jars',
      title: 'Gideon’s Fleece and Three Hundred Men',
      passage: 'JDG 6:1-8:28',
      minutes: 10,
      thread: { id: 'treasure-in-earthen-vessels', spot: 'torch-glow', fromScene: 'l15-e3-s3' },
      whereWhen: where(['harod'], [
        ['A wine press', 'A pit cut in the rock, where grapes were trodden. Wheat was normally threshed on an open hilltop where the wind could carry off the chaff; Gideon hid in the wine press so the Midianites wouldn’t see him.'],
        ['“The LORD is peace”', 'The name Gideon gave his altar: in Hebrew, Adonai Shalom.'],
        ['The fleece', 'A sheepskin with the wool still on it. Christians have long seen in Gideon’s fleece, wet with dew from heaven while the ground was dry, a picture of Mary, who received the Son of God from heaven. Psalm 72:6, “like rain that falls on the mown grass,” was read in the old Latin Bible as “like rain upon the fleece,” and is sung in Advent.'],
        ['The spring of Harod', 'At the foot of Mount Gilboa, in the Jezreel Valley. It still flows today, at Ein Harod.'],
        ['Camels', 'The Midianites were among the first raiders to ride camels, which let them cross the desert and strike far from home.'],
        ['The middle watch', 'The night was divided into three watches. The middle watch began around ten o’clock, when the new guards had just settled down.'],
      ]),
      read: ['JDG 6:1-8:28'],
    }),
    built(episode4, {
      id: 'l15-e4',
      number: 4,
      emblem: 'timbrel-of-mizpah',
      title: 'Jephthah’s Vow',
      passage: 'JDG 10:6-11:40',
      minutes: 8,
      contentNote: 'This is one of the saddest stories in the Bible. Jephthah makes a careless promise to God, and his daughter pays for it. The game tells what the Bible says in one plain sentence, and shows nothing.',
      thread: { id: 'yes-or-no', spot: 'timbrel-glow', fromScene: 'l15-e4-s3' },
      whereWhen: where(['mizpah-of-gilead'], [
        ['Gilead', 'The hilly, wooded land east of the Jordan, famous for the “balm of Gilead,” a healing ointment.'],
        ['Mizpah of Gilead', 'Its name means “watchtower.” It may be the place where Jacob and Laban set up a heap of stones and said, “The LORD watch between you and me” (Level 4).'],
        ['The Ammonites', 'A people east of Gilead. Their capital, Rabbah, is Amman, the capital of Jordan today.'],
        ['The Arnon and the Jabbok', 'Two rivers flowing west into the Jordan and the Dead Sea, in deep gorges. Jacob wrestled with God at the Jabbok (Level 4).'],
        ['What happened to Jephthah’s daughter?', 'The Bible says only that her father kept his vow, and that “she had never known a man.” Most readers, Jewish and Christian, have understood that he offered her as a sacrifice. Since the Middle Ages, some have thought instead that he gave her to God’s service for life, so she never married. Either way, the vow was wrong.'],
      ]),
      read: ['JDG 10:6-11:40'],
    }),
    built(episode5, {
      id: 'l15-e5',
      number: 5,
      emblem: 'two-pillars',
      title: 'Samson',
      passage: 'JDG 13:1-16:31',
      minutes: 10,
      contentNote: 'Samson’s story is one of great strength and great mistakes. Near its end he is captured and blinded, and he dies when the temple of Dagon falls. Nothing violent is shown: we see only shadows, dust, and the light.',
      thread: { id: 'set-apart-from-the-womb', spot: 'altar-glow', fromScene: 'l15-e5-s1' },
      whereWhen: where(['zorah', 'gaza'], [
        ['Zorah', 'A village of the tribe of Dan in the low hills west of Jerusalem, looking down on the land of the Philistines.'],
        ['A Nazirite', 'Someone set apart for God by a special promise: no wine, no razor on the head, and no touching a dead body (Numbers 6). Most Nazirites made the promise for a time; Samson was to keep it all his life.'],
        ['The Philistines', 'A people from across the sea who settled on the coast around 1175 BC, in five cities: Gaza, Ashkelon, Ashdod, Ekron and Gath. They knew how to work iron, and the land of Israel later took its Roman name, Palestine, from them.'],
        ['Dagon', 'The Philistines’ chief god, probably a god of grain.'],
        ['Gaza', 'The southernmost Philistine city, near the sea, still a city today.'],
      ]),
      read: ['JDG 13:1-25', 'JDG 14:1-18', 'JDG 16:4-31'],
    }),
    built(episode6, {
      id: 'l15-e6',
      number: 6,
      emblem: 'lamp-in-bethlehem',
      title: 'Everyone Did What Was Right in His Own Eyes',
      passage: 'JDG 17:1-21:25',
      minutes: 7,
      contentNote: 'The last chapters of Judges tell of a terrible crime against a woman in the town of Gibeah, and a civil war that followed. The game tells this in one sentence and shows nothing. For older readers, the story is in Judges 19–21.',
      thread: { id: 'a-ruler-from-bethlehem', spot: 'lamp-glow', fromScene: 'l15-e6-s3' },
      whereWhen: where(['dan', 'bethel', 'bethlehem'], [
        ['Dan', 'The city at the springs of the Jordan, at the foot of Mount Hermon, the northernmost town of Israel. “From Dan to Beer-sheba” came to mean the whole land, from north to south.'],
        ['A grandson of Moses', 'The young Levite was Jonathan, the son of Moses’ son Gershom. Within two generations, Moses’ own family had begun leading people to an idol.'],
        ['Teraphim', 'Small household gods, like the ones Rachel stole from her father Laban (Level 4).'],
        ['Gibeah', 'A town of Benjamin, a few kilometers north of Jerusalem. It would later be the home of Israel’s first king, Saul (Level 16).'],
        ['Bethlehem', '“House of bread,” a village in the hills of Judah, about 8 kilometers south of Jerusalem. The next level, Ruth, happens there.'],
      ]),
      read: ['JDG 17:1-18:31', 'JDG 21:25'],
    }),
  ],
}
