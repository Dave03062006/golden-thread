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
  // Level 3 · Abraham, Father of Faith
  {
    id: 'the-call-to-follow',
    episode: 'l03-e1',
    title: 'The call of Abram → the call to follow Jesus',
    from: ['GEN 12:1'],
    to: ['MAT 4:19'],
    explanation:
      'God called Abram to leave home and go where he would show him. Jesus called Peter and Andrew in the same way, and they left their nets at once. Every Christian is called like Abraham: to leave something behind and follow.',
    sources: ['Hebrews 11:8', 'Matthew 4:19–20', 'Catechism 59, 145'],
    fulfilled: { age: 'XI', place: 'galilee' },
  },
  {
    id: 'seek-first-the-kingdom',
    episode: 'l03-e2',
    title: 'Abram lets Lot choose → “seek first his kingdom”',
    from: ['GEN 13:14'],
    to: ['MAT 6:33'],
    explanation:
      'Lot chose by what his eyes could see, and moved toward Sodom. Abram put God first and peace first, and God gave him the whole land. Jesus teaches the same: seek God first, and trust him with the rest.',
    sources: ['Matthew 6:33', 'Catechism 2830'],
    fulfilled: { age: 'XI', place: 'galilee' },
  },
  {
    id: 'melchizedek-and-the-eucharist',
    episode: 'l03-e3',
    title: 'Melchizedek’s bread and wine → the Eucharist',
    from: ['GEN 14:18'],
    to: ['PSA 110:4'],
    explanation:
      'Melchizedek, king of Salem and priest of God Most High, offered bread and wine and blessed Abram. Jesus is “a priest for ever after the order of Melchizedek”: at the Last Supper he took bread and wine and made them his Body and Blood.',
    sources: ['Hebrews 7:1–3', 'Matthew 26:26–28', 'Catechism 1333, 1350', 'the Roman Canon'],
    fulfilled: { age: 'XII', place: 'jerusalem' },
  },
  {
    id: 'children-of-abraham-by-faith',
    episode: 'l03-e4',
    title: 'The stars of Abraham → all who believe are his children',
    from: ['GEN 15:5'],
    to: ['GAL 3:29'],
    explanation:
      'Abraham’s children are not only his family by blood. Everyone who believes in Christ becomes a child of Abraham, so the stars God showed him include us. The Church calls him “our father in faith.”',
    sources: ['Romans 4:3, 18–21', 'Galatians 3:6–9, 29', 'Catechism 145–146'],
    fulfilled: { age: 'XIII' },
  },
  {
    id: 'living-water',
    episode: 'l03-e5',
    title: 'The well in the wilderness → living water',
    from: ['GEN 21:19'],
    to: ['JHN 4:14'],
    explanation:
      'God found Hagar, a foreign woman alone in the desert, and opened her eyes to a well of water. Jesus sat by a well with another foreign woman, the Samaritan, and offered her living water that would never run dry: the grace of the Holy Spirit.',
    sources: ['John 4:5–14', 'Catechism 694, 2560'],
    fulfilled: { age: 'XI', place: 'sychar' },
  },
  {
    id: 'a-new-name',
    episode: 'l03-e6',
    title: 'A new name, a new mission → “You are Peter”',
    from: ['GEN 17:5'],
    to: ['MAT 16:18'],
    explanation:
      'God renamed Abram “father of a multitude,” and from him came God’s people. Jesus renamed Simon “Peter,” the rock, and built his Church on him. In Baptism and Confirmation, Christians are called by name too, and given a mission.',
    sources: ['Matthew 16:17–18', 'Colossians 2:11–12', 'Catechism 2156–2159'],
    fulfilled: { age: 'XI', place: 'caesarea-philippi' },
  },
  {
    id: 'nothing-is-impossible',
    episode: 'l03-e7',
    title: '“Is anything too hard for the LORD?” → the Annunciation',
    from: ['GEN 18:14'],
    to: ['LUK 1:37'],
    explanation:
      'God promised a son to Sarah, who was old and barren. The angel Gabriel gave the same answer to Mary, a virgin, when he announced the birth of Jesus: with God nothing is impossible. Isaac’s birth prepares for a greater one.',
    sources: ['Luke 1:26–38', 'Catechism 489, 2571'],
    fulfilled: { age: 'XI', place: 'nazareth' },
  },
  {
    id: 'christ-intercedes',
    episode: 'l03-e8',
    title: 'Abraham intercedes for Sodom → Christ intercedes for us',
    from: ['GEN 18:23'],
    to: ['HEB 7:25'],
    explanation:
      'Abraham, God’s friend, pleaded for sinners, and God listened. Jesus, the Son, risen and ascended, pleads for us always before the Father, and his prayer saves. Every time we pray for someone else, we share in that prayer.',
    sources: ['Hebrews 7:25', 'Romans 8:34', 'Catechism 2571, 2634–2636'],
    fulfilled: { age: 'XIII' },
  },
  {
    id: 'children-of-promise',
    episode: 'l03-e9',
    title: 'Isaac, the child of promise → we are children of promise',
    from: ['GEN 21:2'],
    to: ['GAL 4:28'],
    explanation:
      'Isaac was born not by human strength but by God’s promise and power. St Paul says Christians are like him: we become God’s children not by our own effort but by his grace, through faith and Baptism.',
    sources: ['Galatians 4:22–28', 'Romans 4:18–21', 'Catechism 1265'],
    fulfilled: { age: 'XIII' },
  },
  {
    id: 'the-lamb-god-provides',
    episode: 'l03-e10',
    title: 'Isaac carries the wood; God provides the lamb → the Lamb of God',
    from: ['GEN 22:8'],
    to: ['JHN 1:29'],
    explanation:
      'Isaac, the beloved only son, carried the wood up the mountain, and God provided a lamb in his place. Near the same hills, God did not spare his own Son: Jesus carried the wood of his cross up Calvary, and he himself was the Lamb God provided.',
    sources: ['John 1:29', 'John 3:16', 'John 19:17', 'Romans 8:32', 'Hebrews 11:17–19', 'Catechism 2572'],
    fulfilled: { age: 'XII', place: 'jerusalem' },
  },

  // Level 4 · Isaac and Jacob
  {
    id: 'i-will-go',
    episode: 'l04-e1',
    title: 'Rebekah’s “I will go” → Mary’s “let it be”',
    from: ['GEN 24:58'],
    to: ['LUK 1:38'],
    explanation:
      'Rebekah said yes to a journey she had not planned, to marry a man she had never met, because she saw God’s hand in it. Mary said yes to God’s messenger, and the Son of God came into the world. The Church prays for the same readiness: to say “I will go” when God calls.',
    sources: ['Luke 1:26–38', 'Catechism 148, 494'],
    fulfilled: { age: 'XI', place: 'nazareth' },
  },
  {
    id: 'not-by-bread-alone',
    episode: 'l04-e2',
    title: 'Esau sells his birthright for a meal → “Man shall not live by bread alone”',
    from: ['GEN 25:34'],
    to: ['MAT 4:4'],
    explanation:
      'Esau, starving, gave up God’s promise for one meal. Jesus, starving after forty days in the desert, was tempted to turn stones into bread, and refused: God’s word mattered more than his hunger. The Letter to the Hebrews warns us not to be like Esau, “who sold his birthright for a single meal.”',
    sources: ['Matthew 4:1–4', 'Hebrews 12:16', 'Catechism 538–540'],
    fulfilled: { age: 'XI' },
  },
  {
    id: 'clothed-in-christ',
    episode: 'l04-e3',
    title: 'Jacob blessed in his elder brother’s clothes → clothed in Christ',
    from: ['GEN 27:27'],
    to: ['GAL 3:27'],
    explanation:
      'Jacob received the blessing meant for the firstborn because he wore his elder brother’s clothes. That was a lie. But it points to something true: we receive the Father’s blessing not by our own goodness, but because in Baptism we are clothed in Christ, the true firstborn, and the Father sees his Son in us. St Ambrose saw this long ago.',
    sources: ['Galatians 3:26–29', 'Romans 8:28–29', 'St Ambrose, On Jacob and the Happy Life 2.2.9', 'Catechism 1227, 1243'],
    fulfilled: { age: 'XIII' },
  },
  {
    id: 'the-ladder-to-heaven',
    episode: 'l04-e4',
    title: 'The ladder between heaven and earth → the Son of man',
    from: ['GEN 28:12'],
    to: ['JHN 1:51'],
    explanation:
      'Jesus told Nathanael that Jacob’s dream would come true in Jesus himself. Jesus is the ladder: the one place where heaven and earth meet, God made man, through whom we can climb to the Father. Every church is a “Bethel,” a house of God and a gate of heaven, because Christ is there.',
    sources: ['John 1:47–51', 'Catechism 2795', 'The Rite of Dedication of a Church'],
    fulfilled: { age: 'XI', place: 'galilee' },
  },
  {
    id: 'the-lion-of-judah',
    episode: 'l04-e5',
    title: 'Leah, the unloved, becomes the mother of Judah → the Lion of the tribe of Judah',
    from: ['GEN 29:35'],
    to: ['REV 5:5'],
    explanation:
      'Leah was the wife no one chose. Yet God looked on her, and from her son Judah came King David, and from David’s family, Jesus. Matthew’s Gospel begins with this family. As Mary sang, God “has put down the mighty from their thrones, and exalted those of low degree.”',
    sources: ['Matthew 1:2', 'Luke 1:52', 'Genesis 49:10', 'Catechism 2575'],
    fulfilled: { age: 'XIV' },
  },
  {
    id: 'pray-and-not-lose-heart',
    episode: 'l04-e6',
    title: 'Jacob would not let go until God blessed him → “pray and not lose heart”',
    from: ['GEN 32:26'],
    to: ['LUK 18:1'],
    explanation:
      'Jacob held on through the long night and would not let go until he was blessed. Jesus told the parable of the widow who kept asking the judge, to teach us to pray like that: to keep praying when the answer is slow and the night is long. The Church has always seen Jacob’s wrestling as a picture of prayer: a battle of faith, and the victory of perseverance.',
    sources: ['Luke 18:1–8', 'Hosea 12:4', 'Catechism 2573'],
    fulfilled: { age: 'XI' },
  },
  {
    id: 'the-father-runs',
    episode: 'l04-e7',
    title: 'Esau ran to meet his brother → the father ran to meet his son',
    from: ['GEN 33:4'],
    to: ['LUK 15:20'],
    explanation:
      'Jacob came with gifts, rehearsed words and seven bows, afraid of what he deserved. But Esau ran to him first. Jesus told the parable of the prodigal son with the same words: the father “ran and embraced him and kissed him,” before his son could finish his apology. This is how God receives us when we come back to him, above all in the sacrament of Reconciliation, and how we are to forgive one another.',
    sources: ['Luke 15:11–32', 'Matthew 5:23–24', 'Catechism 1439, 2843'],
    fulfilled: { age: 'XI' },
  },
]

const BY_ID = new Map(THREADS.map((thread) => [thread.id, thread]))

export function threadById(id: string): GoldenThread | undefined {
  return BY_ID.get(id)
}
