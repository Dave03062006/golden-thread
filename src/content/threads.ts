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
]

const BY_ID = new Map(THREADS.map((thread) => [thread.id, thread]))

export function threadById(id: string): GoldenThread | undefined {
  return BY_ID.get(id)
}
