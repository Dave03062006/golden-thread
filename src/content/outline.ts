/**
 * The whole game at a glance: 14 Ages and 53 levels (spec §8). Levels are built one by
 * one (see catalog.ts); this outline is what the music checklist, the cathedral and the
 * map show for the ones still to come.
 */

export interface AgeOutline {
  numeral: string
  title: string
  levels: { number: number; title: string }[]
}

const AGES: [numeral: string, title: string, levels: string[]][] = [
  ['I', 'The Beginning', ['Creation and the Fall', 'Noah and the Nations']],
  ['II', 'The Patriarchs', ['Abraham, Father of Faith', 'Isaac and Jacob', 'Joseph and His Brothers', 'Job']],
  ['III', 'Out of Egypt', ['Moses Is Called', 'The Plagues and the Passover', 'Through the Sea']],
  ['IV', 'The Covenant in the Desert', ['Sinai', 'The Tabernacle and the Holy Life', 'Forty Years in the Wilderness', 'Moses’ Last Words']],
  ['V', 'The Promised Land', ['Joshua', 'The Judges', 'Ruth']],
  ['VI', 'The Kingdom', ['Samuel and Saul', 'David, the Shepherd King', 'David’s Sin and Repentance', 'The Psalms', 'Solomon and the Temple', 'Wisdom for Life']],
  ['VII', 'A Kingdom Divided', ['The Kingdom Splits, and Elijah', 'Elisha', 'Prophets to the North', 'Tobit', 'Isaiah and Hezekiah', 'The Last Kings of Judah']],
  ['VIII', 'Exile in Babylon', ['Jeremiah and the Fall of Jerusalem', 'Comfort in Exile', 'Daniel']],
  ['IX', 'The Return', ['Rebuilding the Temple', 'Esther', 'Ezra and Nehemiah', 'Judith']],
  ['X', 'The Maccabees', ['The Maccabean Revolt', 'Wisdom in the Late Age']],
  ['XI', 'The Word Made Flesh', ['The Annunciation and the Nativity', 'The Baptism and the First Disciples', 'The Sermon on the Mount', 'Signs and Wonders', 'The Parables', 'Bread from Heaven', 'The Road to Jerusalem']],
  ['XII', 'The Passion and Resurrection', ['Holy Week', 'The Passion', 'He Is Risen']],
  ['XIII', 'The Church Is Born', ['Pentecost', 'The Gospel Spreads', 'Paul’s Journeys, Part 1', 'Paul’s Journeys, Part 2', 'Letters to the Whole Church']],
  ['XIV', 'All Things Made New', ['Revelation']],
]

let next = 1
export const OUTLINE: AgeOutline[] = AGES.map(([numeral, title, levels]) => ({
  numeral,
  title,
  levels: levels.map((levelTitle) => ({ number: next++, title: levelTitle })),
}))

export const ALL_LEVELS = OUTLINE.flatMap((age) => age.levels.map((level) => ({ ...level, age: `${age.numeral} · ${age.title}` })))
