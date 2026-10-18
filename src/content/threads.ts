import type { GoldenThread } from './types'

/**
 * Every golden thread: a moment in the Old Testament that points to Christ, with both
 * sides of the connection and where it comes from (spec §3.2, step 4).
 */
export const THREADS: GoldenThread[] = [
  // Level 1 · Creation and the Fall
  {
    id: 'creation-by-the-word',
    episode: 'l01-e1',
    title: 'Creation by God’s word → the Word through whom all things were made',
    from: ['GEN 1:3'],
    to: ['JHN 1:1-3'],
    explanation:
      'God created by speaking. John reveals that this Word is a person: the Son, who became flesh in Jesus. The “In the beginning” of John’s Gospel deliberately echoes Genesis.',
    sources: ['John 1:1–14', 'Catechism 291'],
    fulfilled: { age: 'XI' },
  },
  {
    id: 'marriage-christ-and-the-church',
    episode: 'l01-e2',
    title: 'Marriage, the two becoming one flesh → Christ and the Church',
    from: ['GEN 2:24'],
    to: ['EPH 5:31-32'],
    explanation:
      'Marriage, from the very first page, is a living picture of Christ’s love for his Church. Christian writers also saw the woman formed from Adam’s side as a sign of the Church born from the side of Christ on the cross (John 19:34).',
    sources: ['Ephesians 5:21–33', 'Catechism 1602, 1616'],
    fulfilled: { age: 'XIII' },
  },
  {
    id: 'obedience-in-a-garden',
    episode: 'l01-e3',
    title: 'Disobedience in a garden → obedience in a garden',
    from: ['GEN 3:6'],
    to: ['ROM 5:19', 'JHN 18:1', 'LUK 22:42'],
    explanation:
      'Adam said “my will” in a garden. Jesus, the new Adam, said “not my will, but yours” in a garden too, the night before he died, and undid the first disobedience.',
    sources: ['Romans 5:12–21', 'Catechism 411'],
    fulfilled: { age: 'XII', place: 'jerusalem' },
  },
  {
    id: 'the-woman-and-her-offspring',
    episode: 'l01-e4',
    title: 'The Woman and her offspring → Mary and Jesus',
    from: ['GEN 3:15'],
    to: ['JHN 19:26', 'REV 12:1'],
    explanation:
      'The Woman’s offspring is Jesus, who crushes the serpent’s power on the cross, wounded himself. The Woman beside him is Mary, the new Eve. Jesus calls her “Woman” from the cross, and Revelation shows her in glory. The first Eve said no to God; Mary said yes.',
    sources: ['Catechism 410–411', 'St. Irenaeus (the Eve–Mary parallel)'],
    fulfilled: { age: 'XII', place: 'jerusalem' },
  },
  {
    id: 'the-blood-of-abel',
    episode: 'l01-e5',
    title: 'Abel’s blood → the blood of Jesus',
    from: ['GEN 4:10'],
    to: ['HEB 12:24'],
    explanation:
      'Abel’s innocent blood cried out for justice. Jesus’ innocent blood speaks a better word: mercy, forgiveness and a new covenant. Abel, the shepherd who offered a lamb and was killed by his brother, points to Jesus, the Good Shepherd and Lamb of God. At Mass the Church still remembers “the gifts of your servant Abel the just.”',
    sources: ['Hebrews 11:4 and 12:24', 'The Roman Canon (Eucharistic Prayer I)'],
    fulfilled: { age: 'XII', place: 'jerusalem' },
  },
  {
    id: 'from-adam-to-jesus',
    episode: 'l01-e6',
    title: 'The family line from Adam → Jesus',
    from: ['GEN 4:26'],
    to: ['LUK 3:38'],
    explanation:
      'Luke traces Jesus’ family tree all the way back through these very names (Enos, or Enosh, then Seth and Adam) to God. The promise of Genesis 3:15 travels down this line of real people until it is fulfilled in him.',
    sources: ['Luke 3:23–38'],
    fulfilled: { age: 'XI', place: 'jordan' },
  },

  // Level 2 · Noah and the Nations
  {
    id: 'found-favor-with-god',
    episode: 'l02-e1',
    title: 'Noah found favor with God → Mary found favor with God',
    from: ['GEN 6:8'],
    to: ['LUK 1:30'],
    explanation:
      'In a dark world, God’s favor (his grace) rested on Noah, and through him the human family was saved. In the fullness of time the angel spoke the same word to Mary, “full of grace,” and through her came the Savior of the whole world.',
    sources: ['Luke 1:28–30', 'Catechism 490–493'],
    fulfilled: { age: 'XI', place: 'nazareth' },
  },
  {
    id: 'the-ark-and-the-church',
    episode: 'l02-e2',
    title: 'The ark that saved Noah → the Church, the ark of salvation',
    from: ['GEN 6:18'],
    to: ['1PE 3:20'],
    explanation:
      'The Church Fathers saw the ark as a picture of the Church: the one boat God provides to carry his people safely through the waters to a new world. Some even noticed that the door was in the ark’s side, as the Church was born from the pierced side of Christ on the cross (John 19:34).',
    sources: ['1 Peter 3:20', 'Catechism 845', 'St Augustine, City of God 15.26'],
    fulfilled: { age: 'XIII', place: 'jerusalem' },
  },
  {
    id: 'the-flood-and-baptism',
    episode: 'l02-e3',
    title: 'The waters of the Flood → the waters of Baptism',
    from: ['GEN 7:17'],
    to: ['1PE 3:21'],
    explanation:
      'The waters of the Flood ended a world of sin and carried the righteous to a new beginning. In Baptism, the old life of sin is drowned, and we rise to new life in Christ. At the Easter Vigil the Church remembers the Flood as she blesses the baptismal water.',
    sources: ['1 Peter 3:20–21', 'Catechism 701, 1219'],
    fulfilled: { age: 'XIII', place: 'jerusalem' },
  },
  {
    id: 'the-dove-and-the-spirit',
    episode: 'l02-e4',
    title: 'The dove with the olive leaf → the Holy Spirit descending like a dove',
    from: ['GEN 8:11'],
    to: ['MAT 3:16'],
    explanation:
      'Over the waters of the Flood, a dove brought news of peace and a new creation. Over the waters of the Jordan, the Spirit came down like a dove upon Jesus, and the new creation began in him.',
    sources: ['Matthew 3:16', 'Catechism 701'],
    fulfilled: { age: 'XI', place: 'jordan' },
  },
  {
    id: 'the-rainbow-and-the-new-covenant',
    episode: 'l02-e5',
    title: 'God’s covenant with Noah → the new and everlasting covenant in Christ',
    from: ['GEN 9:13'],
    to: ['LUK 22:20'],
    explanation:
      'With Noah, God bound himself to all creation and promised never again to destroy it by a flood. At the Last Supper, Jesus made the new covenant, not with a sign in the clouds but with his own blood, to save the whole world. At every Mass we hear his words again: “the blood of the new and eternal covenant.”',
    sources: ['Luke 22:20', 'Catechism 56–58, 71', 'Revelation 4:3'],
    fulfilled: { age: 'XII', place: 'jerusalem' },
  },
  {
    id: 'babel-and-pentecost',
    episode: 'l02-e6',
    title: 'Babel, where languages divided people → Pentecost, where the Spirit united them',
    from: ['GEN 11:9'],
    to: ['ACT 2:6'],
    explanation:
      'At Babel, pride divided humanity into many languages that could not understand each other. At Pentecost, the Holy Spirit came down, and people “from every nation under heaven” each heard the apostles in their own language. The Church gathers what Babel scattered.',
    sources: ['Acts 2:1–11', 'Catechism 57, 731–732'],
    fulfilled: { age: 'XIII', place: 'jerusalem' },
  },
  {
    id: 'all-nations-blessed',
    episode: 'l02-e7',
    title: 'The call of Abram → all nations blessed in Christ',
    from: ['GEN 12:1'],
    to: ['GAL 3:8'],
    explanation:
      'The nations scattered at Babel were not forgotten. God chose one family from the line of Shem, so that through it all the families of the earth would be blessed. That blessing came in Jesus, who sends his Church to every nation.',
    sources: ['Galatians 3:8', 'Genesis 12:3', 'Catechism 59–60'],
    fulfilled: { age: 'XIII' },
  },
]

const BY_ID = new Map(THREADS.map((thread) => [thread.id, thread]))

export function threadById(id: string): GoldenThread | undefined {
  return BY_ID.get(id)
}
