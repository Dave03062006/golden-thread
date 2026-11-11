import type { Episode, Level, WhereWhen } from '../../types'
import { episode1 } from './episode-1'
import { episode2 } from './episode-2'
import { episode3 } from './episode-3'
import { episode4 } from './episode-4'
import { episode5 } from './episode-5'
import { episode6 } from './episode-6'
import { level17Music } from './music'
import { level17Quiz } from './quiz'

/**
 * Level 17 · Samuel and Saul (1 Samuel 1–10; 13; 15), from the approved Level 17 script
 * (docs/scripts/level-17-samuel-and-saul.md). It opens Age VI, the Kingdom.
 */

/** An episode that's built: its written details, with its set and scenes. */
function built(story: Pick<Episode, 'set' | 'scenes'>, fields: Omit<Episode, 'set' | 'scenes'>): Episode {
  return { ...fields, ...story }
}

const where = (places: string[], notes: [string, string][]): WhereWhen => ({
  places,
  when: 'The end of the judges and the first king of Israel: about 1100–1010 BC',
  notes: notes.map(([title, text]) => ({ title, text })),
})

export const level17: Level = {
  id: 'l17',
  number: 17,
  title: 'Samuel and Saul',
  age: 'VI · The Kingdom',
  passage: '1SA 1:1-15:35',
  music: level17Music,
  quiz: level17Quiz,
  // Shiloh, then Samuel's Ramah and Mizpah; and the ark's road from Ashdod to Beth-shemesh.
  map: {
    at: { lat: 32.06, lon: 35.29 },
    label: 'Shiloh',
    route: [
      { at: { lat: 31.85, lon: 35.23 }, label: 'Ramah' },
      { at: { lat: 31.75, lon: 34.65 }, label: 'Ashdod' },
      { at: { lat: 31.73, lon: 34.99 }, label: 'Beth-shemesh' },
    ],
  },
  // From the approved script's "Reflection and prayer".
  reflection: {
    verse: '1SA 3:10',
    question: 'Samuel needed Eli to help him recognize God’s voice. Who helps you to hear God? And is there something God has already asked of you, where it would be better to obey than to offer him something else instead?',
    prayer: [
      'Lord God, you heard Hannah’s silent prayer,',
      'and you called Samuel by his name in the night.',
      'Hear my prayer too, even when I have no words,',
      'and teach me to know your voice.',
      'When I want to be “like everyone else,” remind me that you are my King.',
      'Give me a heart that listens and obeys,',
      'like Jesus, who came to do your will.',
      'Speak, Lord, for your servant is listening.',
      'Amen.',
    ],
    traditional: {
      name: 'The song of Hannah, sung again by Mary',
      lines: ['My soul magnifies the Lord,', 'and my spirit rejoices in God my Savior.'],
    },
  },
  episodes: [
    built(episode1, {
      id: 'l17-e1',
      number: 1,
      emblem: 'hannahs-prayer',
      title: 'Hannah’s Prayer',
      passage: '1SA 1:1-2:26',
      minutes: 9,
      thread: { id: 'hannahs-song', spot: 'song-glow', fromScene: 'l17-e1-s3' },
      whereWhen: where(['shiloh'], [
        ['Shiloh', 'The town in the hills of Ephraim where the tabernacle had stood since Joshua’s time (Level 14). By now it had a “temple,” with doorposts.'],
        ['About 1100 BC', 'The last years of the judges (Level 15), soon after Ruth’s time (Level 16).'],
        ['“No razor shall touch his head”', 'Hannah promised that her son would be a Nazirite, set apart for God, like Samson (Level 15).'],
        ['“Samuel”', 'Hannah said, “I have asked him of the LORD.” The name sounds like the Hebrew for “heard of God.”'],
        ['The little robe', 'Each year Hannah made Samuel a new one, as he grew.'],
      ]),
      read: ['1SA 1:1-2:11', '1SA 2:18-26'],
    }),
    built(episode2, {
      id: 'l17-e2',
      number: 2,
      emblem: 'lamp-of-god',
      title: '“Speak, Lord, for Your Servant Hears”',
      passage: '1SA 3:1-3:21',
      minutes: 7,
      thread: { id: 'my-sheep-hear-my-voice', spot: 'lamp-glow', fromScene: 'l17-e2-s1' },
      whereWhen: where(['shiloh'], [
        ['The lamp of God', 'The golden lampstand of the tabernacle (Level 11), kept burning “from evening to morning.” It “had not yet gone out”: it was still night, almost dawn.'],
        ['Eli’s sons', 'Hophni and Phinehas, priests who took the best of the offerings for themselves.'],
        ['“From Dan to Beer-sheba”', 'From the northernmost town to the southernmost (Level 15): all Israel.'],
      ]),
      read: ['1SA 3:1-21'],
    }),
    built(episode3, {
      id: 'l17-e3',
      number: 3,
      emblem: 'ark-on-the-cart',
      title: 'The Ark Is Captured',
      passage: '1SA 4:1-6:16',
      minutes: 8,
      contentNote: 'In this episode Israel loses a battle, and Eli and his sons die. It is told in a few sentences, and no fighting is shown.',
      thread: { id: 'every-knee-should-bow', spot: 'ark-glow', fromScene: 'l17-e3-s3' },
      whereWhen: where(['ashdod', 'beth-shemesh'], [
        ['Ashdod and Ekron', 'Two of the five Philistine cities near the coast (Level 15).'],
        ['Dagon', 'The Philistines’ chief god, the same god whose temple fell on Samson (Level 15).'],
        ['Ichabod', 'The name means “Where is the glory?”'],
        ['Beth-shemesh', '“House of the sun,” a town of Israel on the edge of the hills, looking down on Philistine country.'],
      ]),
      read: ['1SA 4:1-6:16'],
    }),
    built(episode4, {
      id: 'l17-e4',
      number: 4,
      emblem: 'stone-of-help',
      title: 'Israel Asks for a King',
      passage: '1SA 7:2-8:22',
      minutes: 8,
      thread: { id: 'the-lord-is-my-helper', spot: 'stone-glow', fromScene: 'l17-e4-s1' },
      whereWhen: where(['mizpah', 'ramah'], [
        ['Mizpah and Ramah', 'Two towns in the hills of Benjamin, north of Jerusalem. Ramah was Samuel’s home; every year he went around to Bethel, Gilgal and Mizpah to judge Israel.'],
        ['“Like all the nations”', 'God had meant Israel to be different from the nations, with God himself as their king (Level 15, “the LORD will rule over you”).'],
        ['Ebenezer', '“Stone of help.” The same name as the place where the ark was lost: now it was a place of victory.'],
      ]),
      read: ['1SA 7:2-17', '1SA 8:1-22'],
    }),
    built(episode5, {
      id: 'l17-e5',
      number: 5,
      emblem: 'vial-of-oil',
      title: 'Saul Anointed',
      passage: '1SA 9:1-10:27',
      minutes: 9,
      thread: { id: 'the-lords-anointed', spot: 'oil-glow', fromScene: 'l17-e5-s2' },
      whereWhen: where(['ramah', 'mizpah'], [
        ['Benjamin', 'The smallest tribe (Level 15, Episode 6), between Judah and Ephraim. Saul’s home was Gibeah.'],
        ['Casting lots', 'As when the land was shared out at Shiloh (Level 14).'],
        ['“Long live the king!”', 'In Hebrew, “May the king live!”: still shouted at coronations, and sung in Handel’s anthem Zadok the Priest.'],
      ]),
      read: ['1SA 9:1-10:27'],
    }),
    built(episode6, {
      id: 'l17-e6',
      number: 6,
      emblem: 'torn-robe',
      title: 'To Obey Is Better Than Sacrifice',
      passage: '1SA 13:5-15:35',
      minutes: 9,
      contentNote: 'This episode tells of a war against the Amalekites, and of a command that is one of the hardest things in the Bible to read. It is told in a sentence, and nothing is shown.',
      thread: { id: 'to-do-thy-will', spot: 'word-glow', fromScene: 'l17-e6-s3' },
      whereWhen: where(['gilgal'], [
        ['Gilgal', 'The old camp near Jericho (Level 14), where Saul had been made king before all Israel.'],
        ['The Amalekites', 'Desert raiders who attacked Israel at Rephidim (Level 9). God’s command against them belongs with the hardest passages of the Bible, like the fall of Jericho (Level 14); the Church reads these wars in the light of Jesus, who taught us to love our enemies.'],
        ['“A man after his own heart”', 'God’s next king: David, a shepherd boy of Bethlehem (Level 18).'],
      ]),
      read: ['1SA 13:5-14', '1SA 15:1-35'],
    }),
  ],
}
