/**
 * Recommended worship songs for every level (spec §11.6), for "Worship songs (your
 * copies)". The game never includes these recordings (spec §12.4): the player plays their
 * own copies in the game, or listens along in their own music app. Each comes with one
 * line on why it fits the story.
 */

export interface WorshipSong {
  level: number
  title: string
  artist: string
  /** Why it fits, in one line. */
  reason: string
}

const LIST: [level: number, title: string, artist: string, reason: string][] = [
  [1, 'So Will I (100 Billion X)', 'Hillsong United', 'Creation by God’s word, and all creation’s praise.'],
  [1, 'Indescribable', 'Chris Tomlin', 'The God who placed the stars and knows them by name.'],
  [1, 'Great Are You Lord', 'All Sons & Daughters', 'The breath in our lungs is his, as in Genesis 2:7.'],
  [1, 'Living Hope', 'Phil Wickham', 'The chasm opened by the Fall, and the promise that bridges it.'],
  [2, 'Promises', 'Maverick City Music', 'God keeps his word, as he did with Noah and the rainbow.'],
  [3, 'Jireh', 'Elevation Worship & Maverick City Music', 'Named from Genesis 22:14, “The LORD will provide.”'],
  [4, 'Goodness of God', 'Bethel Music', 'God’s faithfulness through Isaac and Jacob, all their lives long.'],
  [5, 'Even When It Hurts (Praise Song)', 'Hillsong United', 'Joseph’s trust through the pit and the prison.'],
  [6, 'Blessed Be Your Name', 'Matt Redman', 'Job’s “The LORD gave, and the LORD has taken away.”'],
  [7, 'Great I Am', 'Phillips, Craig & Dean', 'The name God gives Moses at the burning bush.'],
  [8, 'Worthy Is the Lamb', 'Hillsong Worship', 'The Passover lamb points to the Lamb of God.'],
  [9, 'Red Sea Road', 'Ellie Holcomb', 'God makes a way through the sea.'],
  [10, 'Holy Forever', 'Chris Tomlin', 'The holiness revealed on Sinai.'],
  [11, 'Build My Life', 'Housefires', 'A life built as a dwelling place for God, like the Tabernacle.'],
  [12, 'The Blessing', 'Kari Jobe & Cody Carnes', 'The priestly blessing of Numbers 6:24–26.'],
  [13, '10,000 Reasons (Bless the Lord)', 'Matt Redman', 'Moses’ last words: remember all God has done.'],
  [14, 'Do It Again', 'Elevation Worship', 'Walking around walls until they fall, as at Jericho.'],
  [15, 'Surrounded (Fight My Battles)', 'UPPERROOM & Michael W. Smith', 'God fights for his people in the days of the Judges.'],
  [16, 'Graves into Gardens', 'Elevation Worship', 'Naomi’s mourning turned to joy.'],
  [17, 'Here I Am, Lord', 'Dan Schutte', 'Samuel’s answer in the night: “Speak, for your servant hears.”'],
  [18, 'Who You Say I Am', 'Hillsong Worship', 'The shepherd boy God chose as king.'],
  [19, 'Lord, I Need You', 'Matt Maher', 'David’s repentance in Psalm 51.'],
  [20, 'The Lord’s My Shepherd', 'Stuart Townend', 'Psalm 23, sung.'],
  [21, 'How Great Is Our God', 'Chris Tomlin', 'Solomon’s Temple and the God no temple can contain.'],
  [22, 'Song of Solomon', 'Martin Smith', 'The love poetry of the Song of Songs.'],
  [23, 'Still', 'Hillsong Worship', 'Elijah meets God in the still small voice.'],
  [24, 'Raise a Hallelujah', 'Bethel Music', 'Praise as a weapon, as in Elisha’s battles.'],
  [25, 'Hosea (Come Back to Me)', 'Weston Priory', 'God calls his unfaithful people home.'],
  [26, 'On Eagle’s Wings', 'Michael Joncas', 'God gives his angels charge over us, as Raphael guided Tobias.'],
  [27, 'Here I Am to Worship', 'Tim Hughes', 'Isaiah’s light to the nations.'],
  [28, 'Even If', 'MercyMe', 'Faithful even as Judah falls.'],
  [29, 'The Steadfast Love of the Lord', 'Edith McNeill', 'Lamentations 3:22–23, in the ruins of Jerusalem.'],
  [30, 'Come Alive (Dry Bones)', 'Lauren Daigle', 'Ezekiel’s valley of dry bones.'],
  [31, 'Cornerstone', 'Hillsong Worship', 'The stone of Daniel 2 that becomes a mountain.'],
  [32, 'Firm Foundation (He Won’t)', 'Cody Carnes', 'Rebuilding the Temple on a firm foundation.'],
  [33, 'Same God', 'Elevation Worship', 'The God who saved Esther’s people saves today.'],
  [34, 'Joy of the Lord', 'Rend Collective', 'Nehemiah 8:10, “the joy of the LORD is your strength.”'],
  [35, 'Champion', 'Bethel Music', 'Judith’s victory, won by God’s hand.'],
  [36, 'Battle Belongs', 'Phil Wickham', 'The Maccabees’ battles belong to the Lord.'],
  [37, 'Restless', 'Audrey Assad', 'The hunger for wisdom that only God satisfies.'],
  [38, 'Mary, Did You Know?', 'Pentatonix', 'The Annunciation and the child Mary carried.'],
  [39, 'Behold the Lamb of God', 'Andrew Peterson', 'John the Baptist’s words in John 1:29.'],
  [40, 'The Lord’s Prayer', 'Hillsong Worship', 'The prayer Jesus taught on the mountain.'],
  [41, 'Way Maker', 'Leeland', 'Jesus’ signs and wonders: a way where there was none.'],
  [42, 'Reckless Love', 'Cory Asbury', 'The shepherd who leaves the ninety-nine.'],
  [43, 'I Am the Bread of Life', 'Suzanne Toolan', 'Jesus’ words in John 6.'],
  [43, 'Oceans (Where Feet May Fail)', 'Hillsong United', 'Peter walking on the water.'],
  [44, 'Good Good Father', 'Chris Tomlin', 'The Father of the prodigal son, on the road to Jerusalem.'],
  [45, 'Hosanna', 'Hillsong United', 'Palm Sunday’s cry.'],
  [45, 'Remembrance (Communion Song)', 'Matt Maher', 'The Last Supper: “Do this in remembrance of me.”'],
  [46, 'Man of Sorrows', 'Hillsong Worship', 'Isaiah 53 fulfilled on the cross.'],
  [47, 'Christ Is Risen', 'Matt Maher', 'The empty tomb.'],
  [47, 'What a Beautiful Name', 'Hillsong Worship', 'The risen Lord’s name above every name.'],
  [48, 'Holy Spirit', 'Francesca Battistelli', 'Pentecost: “Holy Spirit, you are welcome here.”'],
  [49, 'Amazing Grace (My Chains Are Gone)', 'Chris Tomlin', 'Saul the persecutor set free on the Damascus road.'],
  [50, 'No Longer Slaves', 'Bethel Music', 'Galatians 4:7, “no longer a slave but a son.”'],
  [51, 'Christ Is Enough', 'Hillsong Worship', 'Paul counting everything loss for Christ.'],
  [52, 'Before the Throne of God Above', 'Shane & Shane', 'Hebrews: Christ our great high priest.'],
  [53, 'Revelation Song', 'Kari Jobe', 'The song around the throne in Revelation 4–5.'],
  [53, 'King of Kings', 'Hillsong Worship', 'The whole story, from the garden to the new creation.'],
]

export const WORSHIP_SONGS: WorshipSong[] = LIST.map(([level, title, artist, reason]) => ({ level, title, artist, reason }))

/** The recommended songs for a level, in order. */
export function songsForLevel(level: number): WorshipSong[] {
  return WORSHIP_SONGS.filter((song) => song.level === level)
}

/** How many levels the game will have, so the coverage checklist can show them all. */
export const LEVEL_COUNT = 53
