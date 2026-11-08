import type { Episode, Level, WhereWhen } from '../../types'
import { episode1 } from './episode-1'
import { episode2 } from './episode-2'
import { episode3 } from './episode-3'
import { episode4 } from './episode-4'
import { episode5 } from './episode-5'
import { episode6 } from './episode-6'
import { episode7 } from './episode-7'
import { episode8 } from './episode-8'
import { level12Music } from './music'
import { level12Quiz } from './quiz'

/**
 * Level 12 · Forty Years in the Wilderness (Numbers 1–2; 6; 9–11; 13–14; 16–17; 20–24), from
 * the approved Level 12 script (docs/scripts/level-12-forty-years-in-the-wilderness.md).
 */

/** An episode that's built: its written details, with its set and scenes. */
function built(story: Pick<Episode, 'set' | 'scenes'>, fields: Omit<Episode, 'set' | 'scenes'>): Episode {
  return { ...fields, ...story }
}

const where = (when: string, places: string[], notes: [string, string][]): WhereWhen => ({
  places,
  when,
  notes: notes.map(([title, text]) => ({ title, text })),
})

export const level12: Level = {
  id: 'l12',
  number: 12,
  title: 'Forty Years in the Wilderness',
  age: 'IV · The Covenant in the Desert',
  passage: 'NUM 1:1-24:25',
  music: level12Music,
  quiz: level12Quiz,
  // Kadesh, where the people camped for many years, then the road on, around Edom by Mount Hor
  // to the plains of Moab, across the Jordan from Jericho (Level 13 begins there).
  map: {
    at: { lat: 30.69, lon: 34.49 },
    label: 'Kadesh',
    route: [
      { at: { lat: 30.32, lon: 35.41 }, label: 'Mount Hor' },
      { at: { lat: 31.85, lon: 35.6 }, label: 'The plains of Moab' },
    ],
  },
  // From the approved script's "Reflection and prayer".
  reflection: {
    verse: 'NUM 6:24',
    question: 'For forty years, God led his people through the wilderness: he fed them, gave them water, healed them and blessed them, even when they complained. Where in your life has God led you through a hard place? What do you find yourself complaining about, and what could you thank him for instead?',
    prayer: [
      'Lord God, you led your people through the wilderness,',
      'by a cloud by day and fire by night.',
      'When I complain, forgive me;',
      'when I am afraid, help me trust you, like Joshua and Caleb.',
      'Thank you for Jesus, lifted up on the cross,',
      'who gives living water to all who come to him.',
      'Lead me home to your promised land,',
      'and bless me, and keep me, and give me your peace.',
      'Amen.',
    ],
    traditional: {
      name: 'A prayer to the guardian angel',
      lines: ['Angel of God, my guardian dear,', 'to whom God’s love commits me here,', 'ever this day be at my side,', 'to light and guard, to rule and guide. Amen.'],
    },
  },
  episodes: [
    built(episode1, {
      id: 'l12-e1',
      number: 1,
      emblem: 'priestly-blessing',
      title: 'The Camp and the Priestly Blessing',
      passage: 'NUM 1:1-10:36',
      minutes: 7,
      thread: { id: 'he-blessed-them', spot: 'hands-glow', fromScene: 'l12-e1-s3' },
      whereWhen: where('A year after the Passover, leaving Sinai: perhaps the 1200s BC, perhaps earlier', ['horeb'], [
        ['The book of Numbers', 'It takes its name from the two times the people are counted (Numbers 1 and 26). Its Hebrew name means “In the wilderness.”'],
        ['Six hundred thousand', 'The count of men over twenty came to 603,550 (Numbers 1:46). Some scholars think the Hebrew word for “thousand” here may mean a smaller group, like a clan.'],
        ['The wilderness of Paran', 'The wide, dry land between Sinai and Canaan, where the people would spend much of their forty years.'],
      ]),
      read: ['NUM 6:22-27', 'NUM 9:15-23', 'NUM 10:11-36'],
    }),
    built(episode2, {
      id: 'l12-e2',
      number: 2,
      emblem: 'seventy-elders',
      title: 'Complaints and Quail',
      passage: 'NUM 11:1-11:35',
      minutes: 7,
      thread: { id: 'all-the-lords-people', spot: 'prophets-glow', fromScene: 'l12-e2-s3' },
      whereWhen: where('On the way from Sinai to Kadesh', ['horeb'], [
        ['Manna', '“Like coriander seed”: a small, round, pale seed. The people ground it, boiled it and baked it into cakes that tasted “like cakes baked with oil” (Numbers 11:7–8).'],
        ['Quail', 'Small birds that cross the Sinai each spring and autumn, flying low and landing exhausted after crossing the sea. They are still caught there today.'],
        ['Joshua', 'Moses’ young helper. Here he wants to protect Moses’ honor; Moses wants the Spirit for everyone.'],
      ]),
      read: ['NUM 11:1-35'],
    }),
    built(episode3, {
      id: 'l12-e3',
      number: 3,
      emblem: 'cluster-of-grapes',
      title: 'The Twelve Spies',
      passage: 'NUM 13:1-14:45',
      minutes: 8,
      thread: { id: 'a-sabbath-rest', spot: 'cluster-glow', fromScene: 'l12-e3-s2' },
      whereWhen: where('At Kadesh, in the season of the first ripe grapes', ['kadesh'], [
        ['Kadesh', 'An oasis on the southern edge of Canaan, perhaps Ain el-Qudeirat, with the best springs of the northern Sinai. The people would camp around it for many years.'],
        ['The Valley of Eshcol', 'Near Hebron. “Eshcol” means “cluster.” The hills around Hebron are still famous for their grapes.'],
        ['“Milk and honey”', 'A land good for flocks (milk) and full of flowers, date palms and bees (honey).'],
        ['The sons of Anak', 'A people known for their great height. Later, Caleb himself drove them out of Hebron (Joshua 15:14).'],
      ]),
      read: ['NUM 13:1-14:45'],
    }),
    built(episode4, {
      id: 'l12-e4',
      number: 4,
      emblem: 'rod-that-budded',
      title: 'Korah’s Rebellion and Aaron’s Rod',
      passage: 'NUM 16:1-17:13',
      minutes: 7,
      thread: { id: 'called-like-aaron', spot: 'rod-glow', fromScene: 'l12-e4-s3' },
      whereWhen: where('During the years in the wilderness', ['kadesh'], [
        ['The Levites and the priests', 'All the tribe of Levi served at the tabernacle, but only Aaron and his sons were priests. Korah was a Levite, a cousin of Moses and Aaron.'],
        ['Almonds', 'The almond is the first tree to blossom in the land of Israel, in late winter. Its Hebrew name means “the watcher,” the tree that wakes first.'],
        ['The censers', 'The bronze of the rebels’ censers was beaten into a covering for the altar, as a reminder (Numbers 16:38–40).'],
      ]),
      read: ['NUM 16:1-35', 'NUM 16:41-17:13'],
    }),
    built(episode5, {
      id: 'l12-e5',
      number: 5,
      emblem: 'water-from-the-rock',
      title: 'Water at Meribah',
      passage: 'NUM 20:1-20:29',
      minutes: 7,
      thread: { id: 'rivers-of-living-water', spot: 'stream-glow', fromScene: 'l12-e5-s2' },
      whereWhen: where('At Kadesh, near the end of the forty years', ['kadesh', 'mount-hor'], [
        ['Meribah', 'The name means “quarreling.” The first Meribah was at Rephidim, near Sinai (Exodus 17; Level 9); this one is at Kadesh, almost forty years later.'],
        ['Miriam', 'Moses’ sister, who had watched over him in the basket on the Nile (Level 7) and led the women’s song by the sea (Level 9). She died at Kadesh.'],
        ['Mount Hor', 'Traditionally Jebel Harun, “Aaron’s mountain,” near Petra in Jordan, where a small white shrine stands on the summit.'],
        ['Eleazar', 'Aaron’s son, the new high priest. He would help Joshua divide the land.'],
      ]),
      read: ['NUM 20:1-29'],
    }),
    built(episode6, {
      id: 'l12-e6',
      number: 6,
      emblem: 'bronze-serpent',
      title: 'The Bronze Serpent',
      passage: 'NUM 21:4-21:9',
      minutes: 6,
      thread: { id: 'the-serpent-lifted-up', spot: 'serpent-glow', fromScene: 'l12-e6-s2' },
      whereWhen: where('On the long road around Edom', ['edom'], [
        ['Around Edom', 'The king of Edom would not let the people cross his land (Numbers 20:14–21), so they took the long way around it, south toward the Red Sea and back north.'],
        ['Fiery serpents', 'Perhaps called “fiery” for their burning bite. The deserts of the Arabah still have poisonous vipers.'],
        ['The staff of Asclepius', 'A snake on a staff became a sign of healing in the Greek world too, and is still a symbol of medicine.'],
      ]),
      read: ['NUM 21:4-9', 'JHN 3:14-16'],
    }),
    built(episode7, {
      id: 'l12-e7',
      number: 7,
      emblem: 'balaams-donkey',
      title: 'Balaam and His Donkey',
      passage: 'NUM 22:1-22:41',
      minutes: 7,
      thread: { id: 'the-curse-turned-to-blessing', spot: 'camp-glow', fromScene: 'l12-e7-s1' },
      whereWhen: where('On the plains of Moab, at the end of the forty years', ['plains-of-moab'], [
        ['Moab', 'A kingdom east of the Dead Sea. Moab’s people were distant cousins of Israel, descended from Lot (Genesis 19:37). Ruth, the great-grandmother of King David, would be a Moabite (Level 16).'],
        ['Balaam the son of Beor', 'A famous seer from Pethor, on the Euphrates. In 1967, an inscription about “Balaam son of Beor, a seer of the gods” was found at Deir Alla in Jordan, written about 800 BC.'],
        ['The angel of the LORD', 'God’s messenger, often speaking with God’s own voice. He appears to Hagar, to Abraham on Mount Moriah and to Moses at the burning bush.'],
      ]),
      read: ['NUM 22:1-41'],
    }),
    built(episode8, {
      id: 'l12-e8',
      number: 8,
      emblem: 'star-out-of-jacob',
      title: 'A Star Out of Jacob',
      passage: 'NUM 23:1-24:25',
      minutes: 6,
      thread: { id: 'a-star-out-of-jacob', spot: 'star-glow', fromScene: 'l12-e8-s3' },
      whereWhen: where('On the heights of Moab, above the plains', ['plains-of-moab'], [
        ['Seven altars', 'Balak built seven altars on each hilltop and offered a bull and a ram on each, hoping that a better view, or more offerings, would change God’s mind (Numbers 23:1–3, 13–14, 27–30).'],
        ['The scepter', 'The staff a king holds as a sign of his rule. Jacob had promised that “the scepter shall not depart from Judah” (Genesis 49:10; Level 5).'],
        ['What became of Balaam?', 'He did not go home a friend of God: he later taught Moab how to lead Israel into sin, and died in battle (Numbers 31:8, 16; Revelation 2:14).'],
      ]),
      read: ['NUM 23:1-24:25'],
    }),
  ],
}
