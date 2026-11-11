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

  // Level 5 · Joseph and His Brothers
  {
    id: 'sold-for-silver',
    episode: 'l05-e1',
    title: 'Joseph sold for silver by his brothers → Jesus betrayed for thirty pieces of silver',
    from: ['GEN 37:28'],
    to: ['MAT 26:15'],
    explanation:
      'Joseph, the beloved son sent by his father to his brothers, was rejected by them and sold for silver. Jesus, the beloved Son sent by the Father, came to his own, and one of his own sold him for silver. In both stories the betrayal did not have the last word: God turned it into salvation for many.',
    sources: ['Matthew 26:14–16', 'John 1:11', 'Acts 7:9', 'Catechism 597–598'],
    fulfilled: { age: 'XII', place: 'jerusalem' },
  },
  {
    id: 'remember-me',
    episode: 'l05-e2',
    title: '“Remember me,” between two prisoners → “Jesus, remember me”',
    from: ['GEN 40:14'],
    to: ['LUK 23:42', 'LUK 23:43'],
    explanation:
      'Joseph, innocent, was counted among criminals, with one man on each side: one set free, one put to death. He asked the butler, “remember me,” and the butler forgot him. Jesus, innocent, died between two criminals. One of them asked, “Jesus, remember me,” and Jesus did not forget: “Today you will be with me in Paradise.”',
    sources: ['Luke 23:32–43', 'Isaiah 53:12', 'Catechism 1021'],
    fulfilled: { age: 'XII', place: 'jerusalem' },
  },
  {
    id: 'do-whatever-he-tells-you',
    episode: 'l05-e3',
    title: '“Go to Joseph; what he says to you, do” → “Do whatever he tells you”',
    from: ['GEN 41:55'],
    to: ['JHN 2:5'],
    explanation:
      'When Egypt had no bread, Pharaoh sent the hungry to Joseph: “what he says to you, do.” When the wedding at Cana had no wine, Mary sent the servants to Jesus with almost the same words. They obeyed, and the water became wine. Mary still points us to her Son. The Church also uses Pharaoh’s words, “Go to Joseph,” for St Joseph, the guardian of the Holy Family.',
    sources: ['John 2:1–11', 'Catechism 2618', 'Pope Leo XIII, Quamquam pluries (1889)'],
    fulfilled: { age: 'XI', place: 'galilee' },
  },
  {
    id: 'bread-for-the-world',
    episode: 'l05-e4',
    title: 'Grain from Joseph for a starving world → “I am the bread of life”',
    from: ['GEN 41:57'],
    to: ['JHN 6:35'],
    explanation:
      'In the famine, the whole world came to Joseph for bread, even the brothers who had sold him, and he gave it to them, and secretly gave back their money too. Jesus gives himself as bread for the whole world, freely, to all who come to him: in the Eucharist, the Bread of life.',
    sources: ['John 6:32–35', 'Matthew 6:11', 'Catechism 1338, 1406'],
    fulfilled: { age: 'XI', place: 'galilee' },
  },
  {
    id: 'greater-love',
    episode: 'l05-e5',
    title: 'Judah offers himself in his brother’s place → “Greater love has no man than this”',
    from: ['GEN 44:33'],
    to: ['JHN 15:13'],
    explanation:
      'Judah, who once sold his brother, now offers his own freedom so that his youngest brother can go home: the first time in the Bible that someone offers to take another’s punishment in his place. Jesus, the Son of David from the tribe of Judah, did that fully: he gave his life in our place, so that we can go home to the Father.',
    sources: ['John 15:12–14', '1 Peter 3:18', 'Hebrews 7:14', 'Catechism 615–616'],
    fulfilled: { age: 'XII', place: 'jerusalem' },
  },
  {
    id: 'father-forgive-them',
    episode: 'l05-e6',
    title: 'Joseph forgives the brothers who sold him → “Father, forgive them”',
    from: ['GEN 45:5'],
    to: ['LUK 23:34'],
    explanation:
      'Joseph could have punished his brothers. Instead he wept, called them near, and told them not to be afraid. Jesus, nailed to the cross by those he came to save, prayed for them: “Father, forgive them.” Joseph’s forgiveness is a picture of the mercy God offers everyone, and of how we are to forgive those who hurt us.',
    sources: ['Luke 23:34', 'Matthew 5:44', 'Matthew 6:12', 'Catechism 2842–2845'],
    fulfilled: { age: 'XII', place: 'jerusalem' },
  },
  {
    id: 'the-scepter-of-judah',
    episode: 'l05-e7',
    title: '“The scepter shall not depart from Judah” → the Son of David, whose kingdom has no end',
    from: ['GEN 49:10'],
    to: ['LUK 1:32', 'LUK 1:33'],
    explanation:
      'Jacob blessed Judah with a king’s scepter “until he comes to whom it belongs.” From Judah came King David, and from David, many kings. But the angel Gabriel told Mary that her son would have the throne of David and reign “over the house of Jacob for ever.” The one to whom the scepter belongs is Jesus, the Lion of the tribe of Judah.',
    sources: ['Luke 1:31–33', 'Revelation 5:5', 'Hebrews 7:14', 'Catechism 436, 439'],
    fulfilled: { age: 'XI', place: 'nazareth' },
  },
  // Level 6 · Job
  {
    id: 'i-have-prayed-for-you',
    episode: 'l06-e1',
    title: 'Satan asks to test Job, and God sets a limit → Jesus to Peter: “Satan demanded to have you… but I have prayed for you”',
    from: ['JOB 1:12'],
    to: ['LUK 22:31', 'LUK 22:32'],
    explanation:
      'Satan could not touch Job without God’s leave, and God set a limit: “only upon himself do not put forth your hand.” Jesus told Peter that Satan had asked to test him too, and promised, “I have prayed for you.” God never leaves us alone in a trial: he sets its limits, and Jesus prays for us.',
    sources: ['Luke 22:31–32', '1 Corinthians 10:13', 'Catechism 395, 2851'],
    fulfilled: { age: 'XII', place: 'jerusalem' },
  },
  {
    id: 'my-god-why',
    episode: 'l06-e2',
    title: 'Job cries out to God, “Why?” → Jesus on the cross: “My God, my God, why hast thou forsaken me?”',
    from: ['JOB 3:20'],
    to: ['MAT 27:46'],
    explanation:
      'Job cried out to God in his pain and asked why. On the cross, Jesus too cried out in the words of a psalm, “My God, my God, why?” He took our sorrow and our questions into his own heart. When we suffer, Jesus has been there before us, and he is with us there.',
    sources: ['Matthew 27:45–46', 'Psalm 22:1', 'Hebrews 4:15', 'Catechism 603, 2606'],
    fulfilled: { age: 'XII', place: 'jerusalem' },
  },
  {
    id: 'who-sinned',
    episode: 'l06-e3',
    title: 'The friends think Job’s suffering must be his own fault → Jesus’ disciples ask, “Rabbi, who sinned?”',
    from: ['JOB 4:7'],
    to: ['JHN 9:2', 'JHN 9:3'],
    explanation:
      'Job’s friends were sure that suffering meant sin. Centuries later, Jesus’ disciples thought the same about a man born blind. Jesus said no: this was not a punishment, and God would show his glory in him. Then he healed him.',
    sources: ['John 9:1–7', 'Luke 13:1–5', 'Catechism 1502–1505'],
    fulfilled: { age: 'XI', place: 'jerusalem' },
  },
  {
    id: 'the-resurrection-and-the-life',
    episode: 'l06-e4',
    title: '“I know that my Redeemer lives” → Jesus: “I am the resurrection and the life”',
    from: ['JOB 19:25', 'JOB 19:26'],
    to: ['JHN 11:25'],
    explanation:
      'Job, near death, hoped to see God with his own eyes, in his own flesh. Jesus is the Redeemer Job longed for: he died and rose again in his body, and he promises that those who believe in him will rise too. That is why the Church sings Job’s words at funerals, and why Handel set them to music in his Messiah.',
    sources: ['John 11:25–26', '1 Corinthians 15:20', 'Catechism 988–991'],
    fulfilled: { age: 'XI' },
  },
  {
    id: 'wind-and-sea-obey-him',
    episode: 'l06-e5',
    title: 'God speaks out of the whirlwind, Lord of the wind and the sea → Jesus calms the storm: “Who then is this, that even wind and sea obey him?”',
    from: ['JOB 38:8', 'JOB 38:11'],
    to: ['MRK 4:39', 'MRK 4:41'],
    explanation:
      'God asked Job, “Who shut in the sea with doors?” Only the Creator commands the wind and the waves. When Jesus, in a little boat on the Sea of Galilee, told the storm, “Peace! Be still!”, and it obeyed, his friends asked who he could be. The answer is in Job: only God does this.',
    sources: ['Mark 4:35–41', 'Psalm 89:9', 'Catechism 295, 548'],
    fulfilled: { age: 'XI', place: 'galilee' },
  },
  {
    id: 'the-steadfastness-of-job',
    episode: 'l06-e6',
    title: 'Job’s patience, and God’s mercy at the end → “You have heard of the steadfastness of Job”',
    from: ['JOB 42:10'],
    to: ['JAS 5:11'],
    explanation:
      'The New Testament itself points back to Job: an example of holding on to God in suffering, and of the Lord’s compassion. Job also prayed for those who had wronged him, as Jesus taught: “pray for those who persecute you.” And the restoration at the end of the book is a small picture of the great restoration to come, when God will wipe away every tear.',
    sources: ['James 5:10–11', 'Matthew 5:44', 'Revelation 21:4', 'Catechism 309, 324'],
    fulfilled: { age: 'XIII' },
  },
  // Level 7 · Moses Is Called
  {
    id: 'the-holy-innocents',
    episode: 'l07-e1',
    title: 'Pharaoh orders the Hebrew baby boys killed → King Herod orders the baby boys of Bethlehem killed, and the child Jesus is saved',
    from: ['EXO 1:22'],
    to: ['MAT 2:13', 'MAT 2:16'],
    explanation:
      'Moses was born when a king was killing baby boys, and God saved him. Jesus was born when a king was killing baby boys too, and God saved him, by sending his family into Egypt. Moses would lead God’s people out of slavery; Jesus would lead all people out of the slavery of sin. The Church remembers the little boys of Bethlehem as the Holy Innocents, on December 28.',
    sources: ['Matthew 2:13–18', 'Hebrews 11:23', 'Catechism 530'],
    fulfilled: { age: 'XI', place: 'bethlehem' },
  },
  {
    id: 'adoption-as-sons',
    episode: 'l07-e2',
    title: 'Pharaoh’s daughter takes the Hebrew baby as her own son → In Christ, God makes us his own children',
    from: ['EXO 2:10'],
    to: ['GAL 4:4', 'GAL 4:5'],
    explanation:
      'A baby nobody could protect was drawn out of the water and taken into the king’s own family. That is a picture of what God does for us: through Jesus, and through the water of Baptism, he takes us into his own family, as his sons and daughters.',
    sources: ['Galatians 4:4–7', 'Romans 8:15', 'Catechism 1265, 1279'],
    fulfilled: { age: 'XIII' },
  },
  {
    id: 'the-refused-deliverer',
    episode: 'l07-e3',
    title: 'Moses’ own people refuse him: “Who made you a prince and a judge over us?” → Jesus came to his own, and his own did not receive him',
    from: ['EXO 2:14'],
    to: ['ACT 7:35', 'JHN 1:11'],
    explanation:
      'St. Stephen, the first martyr, told this story to show that God’s people had often refused the very ones God sent to save them. Moses, refused by his own, was sent back as their deliverer. Jesus, refused by his own, became the Savior of all.',
    sources: ['Acts 7:23–36', 'John 1:10–12', 'Catechism 530, 2575'],
    fulfilled: { age: 'XII', place: 'jerusalem' },
  },
  {
    id: 'i-am',
    episode: 'l07-e4',
    title: 'God tells Moses his name: “I AM WHO I AM” → Jesus says, “Before Abraham was, I am”',
    from: ['EXO 3:14'],
    to: ['JHN 8:58'],
    explanation:
      'God told Moses his name: I AM. Centuries later, Jesus used those same words about himself, and the people who heard him understood: he was saying that he is God. The one who spoke from the bush is the one who became a man in Jesus.',
    sources: ['John 8:56–59', 'John 18:5–6', 'Catechism 205–213, 589'],
    fulfilled: { age: 'XI', place: 'jerusalem' },
  },
  {
    id: 'the-new-moses',
    episode: 'l07-e5',
    title: '“Go back to Egypt; for all the men who were seeking your life are dead” → “Go to the land of Israel, for those who sought the child’s life are dead”',
    from: ['EXO 4:19'],
    to: ['MAT 2:20'],
    explanation:
      'Matthew tells Jesus’ childhood with Moses’ words. Like Moses, Jesus was saved from a king who killed baby boys, lived in exile, and came back when those who wanted him dead had died. Jesus is the new Moses, who leads God’s people into true freedom.',
    sources: ['Matthew 2:13–23', 'Hosea 11:1', 'Catechism 527–530'],
    fulfilled: { age: 'XI', place: 'nazareth' },
  },
  // Level 8 · The Plagues and the Passover
  {
    id: 'free-indeed',
    episode: 'l08-e1',
    title: '“Let my people go” → Jesus: “If the Son makes you free, you will be free indeed”',
    from: ['EXO 5:1'],
    to: ['JHN 8:34', 'JHN 8:36'],
    explanation:
      'God sent Moses to set his people free from slavery in Egypt. Jesus came to set all people free from a deeper slavery: sin, which keeps us from loving God and each other. He is the Son who makes us free.',
    sources: ['John 8:31–36', 'Luke 4:18', 'Catechism 1741'],
    fulfilled: { age: 'XI', place: 'jerusalem' },
  },
  {
    id: 'rest-for-the-weary',
    episode: 'l08-e2',
    title: '“Let heavier work be laid upon the men” → Jesus: “Come to me, all who labor and are heavy laden, and I will give you rest”',
    from: ['EXO 5:9'],
    to: ['MAT 11:28', 'MAT 11:29'],
    explanation:
      'Pharaoh made the burdens heavier and heavier. Jesus does the opposite: he calls everyone who is tired and weighed down, and gives them rest. Whatever is heavy for us, we can bring to him.',
    sources: ['Matthew 11:28–30', 'Catechism 1658, 2612'],
    fulfilled: { age: 'XI', place: 'galilee' },
  },
  {
    id: 'water-into-wine',
    episode: 'l08-e3',
    title: 'Moses’ first sign turns the water of the Nile into blood → Jesus’ first sign turns water into wine',
    from: ['EXO 7:20'],
    to: ['JHN 2:9', 'JHN 2:11'],
    explanation:
      'Moses’ first great sign in Egypt turned water into blood, and brought death to the river. Jesus’ first sign, at a wedding in Cana, turned water into wine, and brought joy. The signs of Moses showed God’s judgment on Pharaoh; the signs of Jesus show God’s life and joy for everyone.',
    sources: ['John 2:1–11', 'Catechism 1335, 2618'],
    fulfilled: { age: 'XI', place: 'galilee' },
  },
  {
    id: 'the-lamb-of-god',
    episode: 'l08-e4',
    title: 'The Passover lamb, without blemish, whose blood saved God’s people → Jesus, the Lamb of God, our Passover',
    from: ['EXO 12:5', 'EXO 12:13'],
    to: ['JHN 1:29', '1CO 5:7'],
    explanation:
      'The Passover lamb had to be without blemish, and not one of its bones could be broken (Exodus 12:46). Jesus died at Passover time, the innocent Lamb of God, and not one of his bones was broken either (John 19:36). His blood saves us, as the lamb’s blood saved God’s people. That is why, at every Mass, the priest holds up the Host and says, “Behold the Lamb of God.”',
    sources: ['John 1:29', '1 Corinthians 5:7', 'John 19:36', 'Catechism 608, 1340, 1364'],
    fulfilled: { age: 'XII', place: 'jerusalem' },
  },
  {
    id: 'his-exodus',
    episode: 'l08-e5',
    title: 'God brings his people out of Egypt in the great exodus → Jesus’ “departure,” his exodus, accomplished in Jerusalem',
    from: ['EXO 12:41'],
    to: ['LUK 9:30', 'LUK 9:31'],
    explanation:
      'On the mountain of the Transfiguration, Moses spoke with Jesus about his “departure”: in Greek, his exodus. Moses had led God’s people out of slavery in Egypt; Jesus, by his death and resurrection, would lead all God’s people out of the slavery of sin and death, into the Father’s house.',
    sources: ['Luke 9:28–36', 'Catechism 1151, 1340'],
    fulfilled: { age: 'XII', place: 'jerusalem' },
  },
  {
    id: 'in-remembrance-of-me',
    episode: 'l08-e6',
    title: '“This day shall be for you a memorial day” → Jesus at the Last Supper: “Do this in remembrance of me”',
    from: ['EXO 12:14'],
    to: ['LUK 22:19'],
    explanation:
      'God told his people to keep the Passover every year in memory of how he saved them. At the Passover meal before he died, Jesus gave the bread and the cup a new meaning: his own Body and Blood, given for us. Every Mass is that memorial, the new Passover: not only remembering, but receiving the Lamb of God himself.',
    sources: ['Luke 22:7–20', '1 Corinthians 11:23–26', 'Catechism 1339–1340, 1363'],
    fulfilled: { age: 'XII', place: 'jerusalem' },
  },
  // Level 9 · Through the Sea
  {
    id: 'take-heart-it-is-i',
    episode: 'l09-e1',
    title: '“Fear not, stand firm” by the sea → Jesus, walking on the sea: “Take heart, it is I; have no fear”',
    from: ['EXO 14:13'],
    to: ['MAT 14:25', 'MAT 14:27'],
    explanation:
      'God’s people stood at the edge of the sea at night, terrified, and Moses told them, “Fear not.” Long after, Jesus’ disciples were in a boat on a stormy sea at night, terrified, and Jesus came to them walking on the water, and said, “Have no fear.” The God who made a path through the sea walks on the sea himself, and comes to us in our fear.',
    sources: ['Matthew 14:22–33', 'Psalm 77:19', 'Catechism 1817'],
    fulfilled: { age: 'XI', place: 'galilee' },
  },
  {
    id: 'baptized-in-the-sea',
    episode: 'l09-e2',
    title: 'The people pass through the sea, from slavery to freedom → Baptism',
    from: ['EXO 14:22'],
    to: ['1CO 10:1', '1CO 10:2'],
    explanation:
      'God’s people went down into the sea as slaves and came up on the other side free. Saint Paul says they were “baptized into Moses in the cloud and in the sea.” In Baptism we pass through the water too: from the slavery of sin into the freedom of God’s children. That is why this reading is never left out at the Easter Vigil, the night when new Christians are baptized.',
    sources: ['1 Corinthians 10:1–2', 'Catechism 1094, 1221'],
    fulfilled: { age: 'XIII' },
  },
  {
    id: 'the-song-of-the-lamb',
    episode: 'l09-e3',
    title: 'The song of Moses by the sea → the saints in heaven “sing the song of Moses, the servant of God, and the song of the Lamb”',
    from: ['EXO 15:1'],
    to: ['REV 15:2', 'REV 15:3'],
    explanation:
      'In the Book of Revelation, Saint John sees the saints in heaven standing beside a sea of glass, with harps in their hands. They sing “the song of Moses” and “the song of the Lamb.” The song God’s people sang on the shore of the Red Sea is sung again in heaven, by everyone Jesus has brought safely through, from death to life. And every Easter, after the reading of the crossing, the Church sings Moses’ song again.',
    sources: ['Revelation 15:2–4', 'Catechism 2642'],
    fulfilled: { age: 'XIV' },
  },
  {
    id: 'the-living-bread',
    episode: 'l09-e4',
    title: 'The manna, bread from heaven in the desert → Jesus, “the living bread which came down from heaven”',
    from: ['EXO 16:15'],
    to: ['JHN 6:49', 'JHN 6:50', 'JHN 6:51'],
    explanation:
      'God fed his people in the desert with bread from heaven, every morning for forty years. Jesus said that he himself is the true bread from heaven: whoever eats this bread will live for ever. In the Eucharist, God still feeds his people on their journey through life. And as Aaron kept a jar of manna before the LORD, every church keeps the Eucharist in the tabernacle.',
    sources: ['John 6:31–51', 'Hebrews 9:4', 'Catechism 1094, 1334, 1379'],
    fulfilled: { age: 'XI', place: 'galilee' },
  },
  {
    id: 'the-rock-was-christ',
    episode: 'l09-e5',
    title: 'The rock that gave water in the desert → “the Rock was Christ,” from whose pierced side came blood and water',
    from: ['EXO 17:6'],
    to: ['1CO 10:4', 'JHN 19:34'],
    explanation:
      'Saint Paul says the rock that gave water in the desert was a sign of Christ: “the Rock was Christ.” When Jesus died on the cross, a soldier pierced his side, and out came blood and water. The Church has always seen in them the sacraments that flow from Jesus: the water of Baptism and the Blood of the Eucharist. Jesus himself said, “If any one thirst, let him come to me and drink” (John 7:37).',
    sources: ['1 Corinthians 10:4', 'John 7:37–38', 'John 19:34', 'Catechism 694, 1094, 1225'],
    fulfilled: { age: 'XII', place: 'jerusalem' },
  },
  {
    id: 'lifted-up',
    episode: 'l09-e6',
    title: 'Moses on the hill, his arms stretched out until sunset → Jesus on the cross: “when I am lifted up from the earth, I will draw all men to myself”',
    from: ['EXO 17:11', 'EXO 17:12'],
    to: ['JHN 12:32', 'JHN 12:33'],
    explanation:
      'The first Christians saw in Moses on the hill, his arms held wide until the sun went down, a picture of Jesus on the cross. Jesus’ arms were stretched out between heaven and earth, and there he won the victory over sin and death for all of us. And the man who led the battle below was named Joshua, the same name as Jesus in Hebrew: “the LORD saves.”',
    sources: ['John 12:32–33', 'Letter of Barnabas 12', 'Saint Justin Martyr, Dialogue with Trypho 90', 'Catechism 2574–2577'],
    fulfilled: { age: 'XII', place: 'jerusalem' },
  },
  {
    id: 'laborers-for-the-harvest',
    episode: 'l09-e7',
    title: 'Moses chooses able men to share the work → Jesus appoints the Twelve, and sends out laborers into his harvest',
    from: ['EXO 18:21'],
    to: ['MRK 3:14', 'LUK 10:2'],
    explanation:
      'Moses could not carry the whole people alone, and God gave him helpers. Jesus, too, chose twelve apostles to be with him and to be sent out, and seventy others besides. The Church still has bishops, priests and deacons to serve God’s people, and every Christian has a part in the work: “The harvest is plentiful, but the laborers are few.”',
    sources: ['Mark 3:13–15', 'Luke 10:1–2', 'Acts 6:1–6', 'Catechism 551, 873'],
    fulfilled: { age: 'XI', place: 'galilee' },
  },
  // Level 10 · Sinai
  {
    id: 'a-holy-nation',
    episode: 'l10-e1',
    title: '“You shall be to me a kingdom of priests and a holy nation” → “You are a chosen race, a royal priesthood, a holy nation”',
    from: ['EXO 19:6'],
    to: ['1PE 2:9', '1PE 2:10'],
    explanation:
      'At Sinai, God called the people he had set free to be his own: a holy nation, a kingdom of priests, to bring the whole earth to him. Saint Peter gives the same words to everyone baptized into Christ. Every Christian belongs to God’s people, shares in Christ’s priesthood, and is sent to tell what God has done.',
    sources: ['1 Peter 2:4–10', 'Revelation 1:6', 'Catechism 709, 1268, 1546'],
    fulfilled: { age: 'XIII' },
  },
  {
    id: 'love-god-and-neighbor',
    episode: 'l10-e2',
    title: 'The Ten Commandments → Jesus: “You shall love the Lord your God… You shall love your neighbor as yourself”',
    from: ['EXO 20:2', 'EXO 20:3'],
    to: ['MAT 22:37', 'MAT 22:39', 'MAT 22:40'],
    explanation:
      'When Jesus was asked which commandment was the greatest, he gathered all ten into two: love God with everything you have, and love your neighbor as yourself. The first tablet is love of God; the second is love of neighbor. Jesus did not take the commandments away. He came to fulfill them, and to give us the grace to keep them, out of love.',
    sources: ['Matthew 22:34–40', 'Matthew 5:17', 'John 14:15', 'Catechism 2055, 2067'],
    fulfilled: { age: 'XI', place: 'jerusalem' },
  },
  {
    id: 'blood-of-the-covenant',
    episode: 'l10-e3',
    title: '“Behold the blood of the covenant” → Jesus at the Last Supper: “This is my blood of the covenant, which is poured out for many”',
    from: ['EXO 24:8'],
    to: ['MRK 14:23', 'MRK 14:24'],
    explanation:
      'At Sinai, Moses sealed the covenant between God and his people with blood, and then the elders ate and drank in God’s presence. At the Last Supper, Jesus used Moses’ very words over the cup: “my blood of the covenant.” The new covenant is sealed not with the blood of oxen, but with Jesus’ own blood, and at every Mass his people eat and drink in the presence of God.',
    sources: ['Mark 14:22–25', 'Hebrews 9:18–22', 'Hebrews 12:24', 'Catechism 610, 1339, 1365'],
    fulfilled: { age: 'XII', place: 'jerusalem' },
  },
  {
    id: 'no-idols',
    episode: 'l10-e4',
    title: 'The golden calf → “Do not be idolaters as some of them were,” and Jesus: “You shall worship the Lord your God and him only shall you serve”',
    from: ['EXO 32:4'],
    to: ['1CO 10:7', 'MAT 4:10'],
    explanation:
      'Saint Paul looks back at the golden calf and warns Christians: do not be idolaters as they were. An idol is anything we put in God’s place: money, success, pleasure, what others think of us. When the devil tempted Jesus in the desert, Jesus answered with God’s own word: worship God, and him alone.',
    sources: ['1 Corinthians 10:6–14', 'Matthew 4:8–10', 'Catechism 2112–2114'],
    fulfilled: { age: 'XIII' },
  },
  {
    id: 'friends-of-god',
    episode: 'l10-e5',
    title: '“The LORD used to speak to Moses face to face, as a man speaks to his friend” → Jesus: “I have called you friends”',
    from: ['EXO 33:11'],
    to: ['JHN 15:14', 'JHN 15:15'],
    explanation:
      'God spoke with Moses as a friend, and Moses prayed for his people as only a friend of God could. Jesus calls all his disciples his friends, and tells them everything he has heard from the Father. And as Moses offered to be blotted out for his people, Jesus gave his own life for us, and now “always lives to make intercession” for us (Hebrews 7:25).',
    sources: ['John 15:12–15', 'Hebrews 7:25', 'Catechism 2574–2577, 2665'],
    fulfilled: { age: 'XII', place: 'jerusalem' },
  },
  {
    id: 'we-have-beheld-his-glory',
    episode: 'l10-e6',
    title: '“You cannot see my face” → “No one has ever seen God; the only Son… has made him known”',
    from: ['EXO 33:20', 'EXO 34:6'],
    to: ['JHN 1:14', 'JHN 1:17', 'JHN 1:18'],
    explanation:
      'Moses asked to see God’s glory, and saw only his back, as he passed. His face shone just from being near God. In Jesus, God’s glory is seen at last in a human face: “we have beheld his glory.” The God who called himself “merciful and gracious… abounding in steadfast love and faithfulness” came to live among us, “full of grace and truth.”',
    sources: ['John 1:14–18', '2 Corinthians 3:18', '2 Corinthians 4:6', 'Catechism 210–211'],
    fulfilled: { age: 'XI', place: 'bethlehem' },
  },
  // Level 11 · The Tabernacle and the Holy Life
  {
    id: 'the-temple-of-his-body',
    episode: 'l11-e1',
    title: '“Let them make me a sanctuary, that I may dwell in their midst” → Jesus: “Destroy this temple, and in three days I will raise it up,” and “You are God’s temple”',
    from: ['EXO 25:8'],
    to: ['JHN 2:19', 'JHN 2:21', '1CO 3:16'],
    explanation:
      'God wanted to live among his people, so he had them build him a tent in the middle of their camp. Later, Solomon would build him a temple of stone in Jerusalem. But Jesus spoke of a greater temple: his own body. In Jesus, God came to live among us in person. And through Baptism, the Holy Spirit makes every Christian a temple of God, and every church is God’s house among the houses of his people.',
    sources: ['John 2:13–22', 'John 1:14', '1 Corinthians 3:16–17; 6:19', 'Revelation 21:3', 'Catechism 586, 797, 1197'],
    fulfilled: { age: 'XI', place: 'jerusalem' },
  },
  {
    id: 'the-ark-of-the-covenant',
    episode: 'l11-e2',
    title: 'The ark of the covenant, overshadowed by the cloud of God’s glory → Mary: “the power of the Most High will overshadow you”',
    from: ['EXO 40:34'],
    to: ['LUK 1:35', 'REV 11:19'],
    explanation:
      'The ark held God’s word, written on stone, and the cloud of his glory covered it. In the Greek Bible the apostles read, the cloud “overshadowed” the tabernacle, the same word the angel used to Mary. The Word of God himself came to live within her. That is why the Church calls Mary the Ark of the Covenant. In the book of Revelation, Saint John sees the ark of the covenant in heaven, and straight after it, “a woman clothed with the sun.”',
    sources: ['Luke 1:35, 39–45 (compare 2 Samuel 6:9–11)', 'Revelation 11:19–12:1', 'Catechism 2676', 'The Litany of Loreto'],
    fulfilled: { age: 'XI', place: 'nazareth' },
  },
  {
    id: 'the-great-high-priest',
    episode: 'l11-e3',
    title: 'Aaron the high priest, carrying the names of his people on his heart → “We have a great high priest… Jesus, the Son of God”',
    from: ['EXO 28:29'],
    to: ['HEB 4:14', 'HEB 4:15'],
    explanation:
      'Aaron carried the names of all twelve tribes on his heart when he went in before God. Jesus is the great high priest. He does not carry our names on stones: he took our human nature, was tempted in every way as we are, yet without sin, and carries each of us before the Father. The priests of the new covenant share in his one priesthood.',
    sources: ['Hebrews 4:14–5:10; 7:23–27', 'Catechism 1539–1545'],
    fulfilled: { age: 'XII', place: 'jerusalem' },
  },
  {
    id: 'a-fragrant-offering',
    episode: 'l11-e4',
    title: 'The offerings on the altar, “a pleasing odor to the LORD” → “Christ loved us and gave himself up for us, a fragrant offering and sacrifice to God”',
    from: ['LEV 2:2'],
    to: ['EPH 5:2', 'HEB 10:10'],
    explanation:
      'Every offering on the altar was a gift to God, and a sign of a greater gift to come. The blood of animals could never truly take away sin (Hebrews 10:4). Jesus offered himself: his whole life, given in love on the cross, “once for all.” At every Mass, that one sacrifice is made present, and we offer ourselves with him.',
    sources: ['Hebrews 10:1–14', 'Ephesians 5:1–2', 'Romans 12:1', 'Catechism 613–614, 1366–1367, 2099–2100'],
    fulfilled: { age: 'XII', place: 'jerusalem' },
  },
  {
    id: 'once-for-all',
    episode: 'l11-e5',
    title: 'The high priest passes the veil once a year with the blood of the offering → Christ “entered once for all into the Holy Place, taking not the blood of goats and calves but his own blood,” and the curtain of the temple is torn in two',
    from: ['LEV 16:2', 'LEV 16:15'],
    to: ['HEB 9:11', 'HEB 9:12', 'MRK 15:37', 'MRK 15:38'],
    explanation:
      'Once a year, one man could pass the veil into God’s presence, and only for a short time. When Jesus died on the cross, the curtain of the Temple was torn in two, from top to bottom: torn by God, from above. Jesus, our high priest, has gone into the presence of God for us, not with the blood of goats, but with his own, and now the way to God is open to everyone.',
    sources: ['Hebrews 9:1–14, 24–28; 10:19–22', 'Romans 3:25', 'Catechism 433, 662'],
    fulfilled: { age: 'XII', place: 'jerusalem' },
  },
  {
    id: 'the-first-fruits',
    episode: 'l11-e6',
    title: 'The first sheaf, waved before the LORD “on the morrow after the sabbath,” and the feast fifty days later → Christ raised from the dead, “the first fruits,” and the Holy Spirit given at Pentecost',
    from: ['LEV 23:11', 'LEV 23:16'],
    to: ['1CO 15:20', 'ACT 2:1'],
    explanation:
      'The first sheaf of the harvest was given to God on the day after the sabbath, in the week of the Passover. Jesus rose from the dead on that very day, the first day of the week: the first fruits of all who will rise. Fifty days later, at the feast of weeks (in Greek, Pentecost, “the fiftieth”), the Holy Spirit came down on the apostles, and the great harvest began: about three thousand were baptized that day. The Church still keeps Easter and Pentecost on these feasts.',
    sources: ['1 Corinthians 15:20–23', 'Acts 2:1–41', 'Catechism 731, 1096, 1169'],
    fulfilled: { age: 'XII', place: 'jerusalem' },
  },
  {
    id: 'who-is-my-neighbor',
    episode: 'l11-e7',
    title: '“You shall love your neighbor as yourself,” and the stranger “you shall love him as yourself” → Jesus’ parable of the Good Samaritan: “Go and do likewise”',
    from: ['LEV 19:18', 'LEV 19:34'],
    to: ['LUK 10:29', 'LUK 10:36', 'LUK 10:37'],
    explanation:
      'When a lawyer asked Jesus what he must do to inherit eternal life, Jesus had him answer from the law: love God, and love your neighbor as yourself. “And who is my neighbor?” Jesus told of a Samaritan, a foreigner, who stopped for a wounded stranger when a priest and a Levite had passed him by. Our neighbor is anyone who needs us, even a stranger or an enemy. And Jesus himself is the Good Samaritan, who stopped for us.',
    sources: ['Luke 10:25–37', 'Matthew 25:35–40', 'Catechism 1825, 1931–1932'],
    fulfilled: { age: 'XI' },
  },
  // Level 12 · Forty Years in the Wilderness
  {
    id: 'he-blessed-them',
    episode: 'l12-e1',
    title: 'Aaron lifts his hands and blesses the people: “The LORD bless you and keep you” → Jesus, at his ascension, “lifting up his hands he blessed them”',
    from: ['NUM 6:24', 'NUM 6:25', 'NUM 6:26'],
    to: ['LUK 24:50', 'LUK 24:51'],
    explanation:
      'God told Aaron and his sons to bless the people with his own name. The last thing Jesus did on earth was to bless his disciples, with his hands lifted, and he went up to heaven still blessing them. At the end of every Mass, the priest blesses the people in his name, and sends them out. The blessing of Aaron is still prayed in the Church: on the first day of every year, its words are read at Mass.',
    sources: ['Luke 24:50–53', 'Numbers 6:22–27 (the first reading of the Mass of Mary, Mother of God, 1 January)', 'Catechism 1078–1083, 1671'],
    fulfilled: { age: 'XII', place: 'jerusalem' },
  },
  {
    id: 'all-the-lords-people',
    episode: 'l12-e2',
    title: '“Would that all the LORD’s people were prophets, that the LORD would put his spirit upon them!” → At Pentecost: “I will pour out my Spirit upon all flesh”',
    from: ['NUM 11:29'],
    to: ['ACT 2:17', 'ACT 2:18'],
    explanation:
      'Moses longed for the day when God’s Spirit would rest on all his people, not just on seventy elders. At Pentecost, it happened: the Holy Spirit came down on the whole Church, men and women, young and old. Through Baptism and Confirmation, every Christian receives the Spirit and shares in Christ’s work as prophet, speaking his word to the world.',
    sources: ['Acts 2:1–21 (quoting Joel 2:28–29)', 'Catechism 1268, 1285–1287, 1546'],
    fulfilled: { age: 'XIII', place: 'jerusalem' },
  },
  {
    id: 'a-sabbath-rest',
    episode: 'l12-e3',
    title: 'Joshua and Caleb trust God, but the people will not go in; they wander forty years, “unable to enter because of unbelief” → “There remains a sabbath rest for the people of God”',
    from: ['NUM 14:8', 'NUM 14:34'],
    to: ['HEB 3:19', 'HEB 4:9'],
    explanation:
      'The people saw the fruit of the promised land with their own eyes, and still they would not trust God to bring them in. The letter to the Hebrews tells Christians not to make the same mistake: God has promised us a greater rest, his own rest in heaven, and we enter it by trusting him. Joshua led the next generation into Canaan; Jesus, whose name is the same, leads us into God’s rest.',
    sources: ['Hebrews 3:7–4:11 (quoting Psalm 95:7–11)', 'Catechism 1720–1721, 2184'],
    fulfilled: { age: 'XIII' },
  },
  {
    id: 'called-like-aaron',
    episode: 'l12-e4',
    title: 'Aaron’s dry rod blossoms, to show whom God has chosen as priest → “One does not take the honor upon himself, but he is called by God, just as Aaron was. So also Christ…”',
    from: ['NUM 17:5', 'NUM 17:8'],
    to: ['HEB 5:4', 'HEB 5:5', 'HEB 9:4'],
    explanation:
      'Korah wanted to make himself a priest. Jesus, who truly was the Son of God, did not take any glory for himself: the Father called him. Aaron’s rod, dead wood that blossomed overnight, was kept in the ark as a sign. The Fathers of the Church saw in it Christ himself, who came to life from the dead wood of the cross, and Mary, from whom, without any human father, came the flower of Jesse’s root.',
    sources: ['Hebrews 5:1–10; 9:4', 'Isaiah 11:1', 'Catechism 1539–1547, 1578'],
    fulfilled: { age: 'XII', place: 'jerusalem' },
  },
  {
    id: 'rivers-of-living-water',
    episode: 'l12-e5',
    title: 'Water flows from the rock for a thirsty people → Jesus: “If any one thirst, let him come to me and drink”',
    from: ['NUM 20:8', 'NUM 20:11'],
    to: ['JHN 7:37', 'JHN 7:38'],
    explanation:
      'At the feast of booths, when the people remembered the years in the wilderness and prayed for rain, the priests poured water at the altar. On the last day, Jesus stood up and promised water that would never run dry: the Holy Spirit, flowing from the hearts of all who believe in him. Saint Paul says the rock that followed the people in the desert was Christ (1 Corinthians 10:4; Level 9).',
    sources: ['John 7:37–39', '1 Corinthians 10:4', 'Catechism 694, 728, 2561'],
    fulfilled: { age: 'XI', place: 'jerusalem' },
  },
  {
    id: 'the-serpent-lifted-up',
    episode: 'l12-e6',
    title: 'Moses lifts up the bronze serpent, and everyone who looks at it lives → Jesus: “As Moses lifted up the serpent in the wilderness, so must the Son of man be lifted up”',
    from: ['NUM 21:8', 'NUM 21:9'],
    to: ['JHN 3:14', 'JHN 3:15'],
    explanation:
      'Jesus himself explained this sign to Nicodemus. As the serpent was lifted up on a pole, he would be lifted up on the cross; and as everyone who looked at the serpent lived, everyone who looks to him with faith will have eternal life. The very next words are the best-known verse in the Bible: “For God so loved the world that he gave his only Son.”',
    sources: ['John 3:14–16', 'Wisdom 16:5–7', '2 Kings 18:4', 'Catechism 2130'],
    fulfilled: { age: 'XII', place: 'jerusalem' },
  },
  {
    id: 'the-curse-turned-to-blessing',
    episode: 'l12-e7',
    title: 'God will not let his people be cursed: “you shall not curse the people, for they are blessed” → Christ became a curse for us, “that in Christ Jesus the blessing of Abraham might come upon the Gentiles”',
    from: ['NUM 22:12'],
    to: ['GAL 3:13', 'GAL 3:14'],
    explanation:
      'Balak wanted God’s people cursed, but God turned every curse into a blessing (Deuteronomy 23:5). On the cross, Jesus took on himself the curse that we deserved, so that God’s blessing, promised to Abraham, could come to every nation. No curse can undo what God has blessed.',
    sources: ['Galatians 3:6–14', 'Deuteronomy 23:5', 'Nehemiah 13:2', 'Catechism 580, 1006'],
    fulfilled: { age: 'XII', place: 'jerusalem' },
  },
  {
    id: 'a-star-out-of-jacob',
    episode: 'l12-e8',
    title: '“A star shall come forth out of Jacob, and a scepter shall rise out of Israel” → the wise men: “We have seen his star in the East,” and Jesus: “I am… the bright morning star”',
    from: ['NUM 24:17'],
    to: ['MAT 2:1', 'MAT 2:2', 'REV 22:16'],
    explanation:
      'A prophet from the east, who did not even belong to God’s people, was made to see the King who would come from Israel. Centuries later, wise men from the east saw his star and came to worship him: the first of all the nations to come to Jesus. At the very end of the Bible, Jesus calls himself “the bright morning star,” the star that rises before the dawn of the day that will never end.',
    sources: ['Matthew 2:1–12', 'Revelation 22:16', '2 Peter 1:19', 'Catechism 528'],
    fulfilled: { age: 'XI', place: 'bethlehem' },
  },
  // Level 13 · Moses' Last Words
  {
    id: 'forty-days-in-the-wilderness',
    episode: 'l13-e1',
    title: '“Man does not live by bread alone, but… by everything that proceeds out of the mouth of the LORD” → Jesus, forty days in the wilderness, answers the devil with Moses’ words',
    from: ['DEU 8:2', 'DEU 8:3'],
    to: ['LUK 4:1', 'LUK 4:2', 'LUK 4:4'],
    explanation:
      'Israel spent forty years in the wilderness, learning to trust God for their daily bread. Jesus, the new Israel, spent forty days in the wilderness, and was tempted where they had failed. Hungry, he answered the devil with these very words of Moses. Every Lent, the Church keeps Jesus’ forty days, fasting a little so as to remember that we live by God’s word.',
    sources: ['Luke 4:1–13', 'Matthew 4:1–11', 'Catechism 538–540, 2835'],
    fulfilled: { age: 'XI', place: 'jordan' },
  },
  {
    id: 'the-first-commandment',
    episode: 'l13-e2',
    title: '“Hear, O Israel: The LORD our God is one LORD; and you shall love the LORD your God with all your heart” → Jesus: “The first is, ‘Hear, O Israel…’”',
    from: ['DEU 6:4', 'DEU 6:5'],
    to: ['MRK 12:29', 'MRK 12:30'],
    explanation:
      'When a scribe asked Jesus which commandment was first of all, Jesus answered with the words of Moses that every Jewish child knew by heart, and joined to them a second: “You shall love your neighbor as yourself” (Level 11). Love of God with everything we have is the first and greatest commandment; the whole law hangs on it.',
    sources: ['Mark 12:28–34', 'Matthew 22:34–40', 'Catechism 201–202, 2083'],
    fulfilled: { age: 'XI', place: 'jerusalem' },
  },
  {
    id: 'a-prophet-like-moses',
    episode: 'l13-e3',
    title: '“The LORD your God will raise up for you a prophet like me” → Peter: “Moses said, ‘The Lord God will raise up for you a prophet…’” and the Father: “This is my beloved Son… listen to him”',
    from: ['DEU 18:15', 'DEU 18:18'],
    to: ['ACT 3:22', 'MAT 17:5'],
    explanation:
      'Moses promised that God would raise up another prophet like him, and told the people to listen to him. After Pentecost, Saint Peter told the crowds in Jerusalem that this prophet had come: Jesus, who did not just speak God’s words, but is God’s Word. At the Transfiguration, with Moses standing beside him, the Father’s voice said of Jesus the very words of Moses’ promise: “listen to him.”',
    sources: ['Acts 3:17–26', 'John 1:45; 6:14', 'Matthew 17:1–8', 'Catechism 1093, 2582'],
    fulfilled: { age: 'XIII', place: 'jerusalem' },
  },
  {
    id: 'choose-life',
    episode: 'l13-e4',
    title: '“I have set before you life and death… therefore choose life” → Jesus: “I came that they may have life, and have it abundantly,” and “I am the way, and the truth, and the life”',
    from: ['DEU 30:19', 'DEU 30:20'],
    to: ['JHN 10:10', 'JHN 14:6'],
    explanation: 'Moses set life before the people as a road to walk: loving God, obeying his voice, holding fast to him. Jesus is that road, and that life: “I am the way, and the truth, and the life.” To choose life is to choose him, and to follow him, every day.',
    sources: ['John 10:10; 14:6', 'Matthew 7:13–14', 'Catechism 1696, 2057'],
    fulfilled: { age: 'XI', place: 'jerusalem' },
  },
  {
    id: 'moses-in-the-land',
    episode: 'l13-e5',
    title: 'Moses sees the land but does not go in → on the mountain of the Transfiguration, Moses stands in the promised land at last, talking with Jesus',
    from: ['DEU 34:4'],
    to: ['MAT 17:1', 'MAT 17:3'],
    explanation:
      'Moses died looking at the land he could not enter. But that was not the end of his story. Centuries later, on a high mountain in that very land, Moses appeared with Elijah, talking with Jesus in his glory. God had brought him into the promised land after all, and into something far greater: the life of heaven, which Jesus opened to all who belong to him.',
    sources: ['Matthew 17:1–8', 'Luke 9:28–36', 'Catechism 554–556, 1023'],
    fulfilled: { age: 'XI' },
  },
  // Level 14 · Joshua
  {
    id: 'the-scarlet-cord',
    episode: 'l14-e1',
    title: 'Rahab trusts the God of Israel, and is saved by the scarlet cord in her window → “By faith Rahab… did not perish,” and she became an ancestor of Jesus',
    from: ['JOS 2:18', 'JOS 2:21'],
    to: ['HEB 11:31', 'MAT 1:5'],
    explanation:
      'Rahab was a foreigner, a sinner, living in an enemy city. But she believed that the God of Israel was “God in heaven above and on earth beneath,” and she risked everything to help his people. God saved her and her whole family, and she came to live among his people. She married into the tribe of Judah, and became the great-great-grandmother of King David, and so an ancestor of Jesus. Saint Matthew names her in Jesus’ family tree. The Fathers of the Church saw in her scarlet cord a sign of the blood of Christ, by which we are saved.',
    sources: ['Hebrews 11:31', 'James 2:25', 'Matthew 1:5', 'Saint Clement of Rome, Letter to the Corinthians 12', 'Catechism 2463'],
    fulfilled: { age: 'XI', place: 'bethlehem' },
  },
  {
    id: 'through-the-jordan',
    episode: 'l14-e2',
    title: 'Israel passes through the Jordan into the promised land → Jesus is baptized in the Jordan, and the heavens open',
    from: ['JOS 3:17', 'JOS 4:7'],
    to: ['MRK 1:9', 'MRK 1:10'],
    explanation:
      'God’s people entered the promised land through the waters of the Jordan, led by the ark. Centuries later, Jesus, whose name is Joshua, came down to that same river to be baptized, and the heavens opened. He makes the waters of Baptism the way into God’s family, and into the life he promises. Saint Gregory of Nyssa wrote that the crossing of the Jordan was a picture of Baptism, the doorway into the true promised land.',
    sources: ['Mark 1:9–11', 'Matthew 3:13–17', 'Saint Gregory of Nyssa, On the Baptism of Christ', 'Catechism 1222, 1223–1225'],
    fulfilled: { age: 'XI', place: 'jordan' },
  },
  {
    id: 'by-faith-the-walls-fell',
    episode: 'l14-e3',
    title: 'The walls of Jericho fall after seven days of marching → “By faith the walls of Jericho fell down”',
    from: ['JOS 6:20'],
    to: ['HEB 11:30'],
    explanation:
      'No army could have broken Jericho’s walls. God’s people simply did what he asked, marching and waiting in silence for seven days, and trusted him to keep his word. The letter to the Hebrews puts the walls of Jericho in its list of the great deeds of faith. The walls in our own lives, of fear, of sin, of things too hard for us, fall the same way: not by our strength, but by trusting God.',
    sources: ['Hebrews 11:30', '2 Corinthians 10:3–5', 'Catechism 144–146'],
    fulfilled: { age: 'XIII' },
  },
  {
    id: 'if-we-confess',
    episode: 'l14-e4',
    title: '“Tell me now what you have done; do not hide it from me” → “If we confess our sins, he is faithful and just, and will forgive our sins”',
    from: ['JOS 7:19'],
    to: ['1JN 1:8', '1JN 1:9'],
    explanation:
      'Achan’s hidden sin harmed the whole people, and he hid it until he was found. Jesus has given us a better way: we bring our sins into the light ourselves, and he forgives them. In the sacrament of Reconciliation, we tell our sins to God through his priest, and hear that we are forgiven. Nothing we bring to him is too heavy for his mercy.',
    sources: ['1 John 1:5–10', 'John 3:20–21', 'Catechism 1424, 1455–1458'],
    fulfilled: { age: 'XIII' },
  },
  {
    id: 'if-god-is-for-us',
    episode: 'l14-e5',
    title: '“The LORD fought for Israel” → “If God is for us, who is against us?”',
    from: ['JOS 10:14'],
    to: ['ROM 8:31'],
    explanation:
      'The day the sun stood still was remembered as the day God listened to a man’s prayer and fought for his people. Saint Paul says the same of every Christian: God gave his own Son for us, so nothing can stand against us, and nothing can separate us from his love. It is not that God takes our side in every quarrel, but that he is always on the side of those who trust him.',
    sources: ['Romans 8:31–39', 'Catechism 2738–2741'],
    fulfilled: { age: 'XIII' },
  },
  {
    id: 'every-promise-yes',
    episode: 'l14-e6',
    title: '“Not one of all the good promises which the LORD had made… had failed” → “All the promises of God find their Yes in him,” and an inheritance “kept in heaven for you”',
    from: ['JOS 21:45'],
    to: ['2CO 1:20', '1PE 1:3', '1PE 1:4'],
    explanation:
      'Every family of Israel received its share of the land, and not one of God’s promises failed. But even the promised land was only a picture. Jesus is God’s “Yes” to every promise, and he has won for us a far greater inheritance: eternal life with God, which no war can take, nothing can spoil, and no time can wear away.',
    sources: ['2 Corinthians 1:18–22', '1 Peter 1:3–5', 'Hebrews 11:13–16', 'Catechism 1817–1821'],
    fulfilled: { age: 'XII', place: 'jerusalem' },
  },
  {
    id: 'to-whom-shall-we-go',
    episode: 'l14-e7',
    title: '“Choose this day whom you will serve… as for me and my house, we will serve the LORD” → Peter: “Lord, to whom shall we go? You have the words of eternal life”',
    from: ['JOS 24:15'],
    to: ['JHN 6:67', 'JHN 6:68'],
    explanation:
      'Joshua set the choice before the people, and gave his own answer first. Jesus too let people choose: when his teaching on the Eucharist was too hard for many and they left him, he turned to the twelve and asked, “Will you also go away?” Peter answered for all who follow Jesus: there is no one else to go to. Every Christian family makes Joshua’s choice again: as for us, we will serve the Lord.',
    sources: ['John 6:60–69', 'Catechism 1657, 2204–2206'],
    fulfilled: { age: 'XI', place: 'galilee' },
  },
  // Level 15 · The Judges
  {
    id: 'faithful-when-we-are-not',
    episode: 'l15-e1',
    title: 'Israel forgets God again and again, but every time they cry out, he hears them and saves them → “If we are faithless, he remains faithful”',
    from: ['JDG 2:18', 'JDG 3:9'],
    to: ['2TI 2:13'],
    explanation:
      'The circle in the book of Judges is a sad one, but it shows something wonderful. The people break their promises to God again and again. God never breaks his. Each time they cry out, “the LORD was moved to pity,” and he sends someone to save them. Saint Paul says the same of us: even when we are faithless, God stays faithful, because he cannot stop being himself. The judges saved Israel for a while; Jesus came to break the circle of sin for good.',
    sources: ['2 Timothy 2:11–13', 'Romans 3:3–4', 'Catechism 210–211, 1428'],
    fulfilled: { age: 'XIII' },
  },
  {
    id: 'shine-like-the-sun',
    episode: 'l15-e2',
    title: '“But thy friends be like the sun as he rises in his might” → “Then the righteous will shine like the sun in the kingdom of their Father”',
    from: ['JDG 5:31'],
    to: ['MAT 13:43'],
    explanation:
      'Deborah’s song ends with a prayer that God’s friends would shine like the sunrise. Jesus promises that this will truly happen: at the end of time, those who love God will shine like the sun in their Father’s kingdom. Mount Tabor, where Barak’s men waited, is the mountain where Christians remember the Transfiguration, when Jesus’ face “shone like the sun,” and his friends saw a glimpse of that glory.',
    sources: ['Matthew 13:43', 'Matthew 17:1–2', 'Daniel 12:3', 'Catechism 554–556, 1042'],
    fulfilled: { age: 'XI', place: 'galilee' },
  },
  {
    id: 'treasure-in-earthen-vessels',
    episode: 'l15-e3',
    title: 'Torches hidden in clay jars blaze out when the jars are broken → “We have this treasure in earthen vessels”',
    from: ['JDG 7:16', 'JDG 7:20'],
    to: ['2CO 4:6', '2CO 4:7'],
    explanation:
      'Gideon’s men carried their light hidden in ordinary clay jars, and it only shone out when the jars were broken. Saint Paul says that we are like those jars: plain, fragile, easily broken. But God has put inside us a great treasure, the light of Christ, so that everyone can see that the power is God’s and not ours. Gideon was the least in the weakest clan, and God chose him for exactly that reason.',
    sources: ['2 Corinthians 4:6–11', '2 Corinthians 12:9', '1 Corinthians 1:27–29', 'Catechism 272–273'],
    fulfilled: { age: 'XIII' },
  },
  {
    id: 'yes-or-no',
    episode: 'l15-e4',
    title: 'Jephthah makes a careless vow, trying to bargain with God for victory → Jesus: “Let what you say be simply ‘Yes’ or ‘No’”',
    from: ['JDG 11:30', 'JDG 11:31'],
    to: ['MAT 5:34', 'MAT 5:37'],
    explanation:
      'God had already given Jephthah his Spirit, and needed nothing from him. But Jephthah tried to bargain with God, the way people bargained with the gods of the nations, and promised something terrible without thinking. God never asked for it: his law forbade offering children (Deuteronomy 12:31). Saint Jerome said Jephthah was foolish to make the vow, and wrong to keep it. Jesus teaches us not to make careless oaths, and not to bargain with God at all: he is our Father, and we can simply ask. A true promise to God, a vow, is made freely and carefully, for something good.',
    sources: ['Matthew 5:33–37', 'Deuteronomy 12:31', 'Micah 6:6–8', 'Saint Thomas Aquinas, Summa Theologiae II-II, q. 88, a. 2, quoting Saint Jerome', 'Catechism 2101–2103, 2153'],
    fulfilled: { age: 'XI', place: 'galilee' },
  },
  {
    id: 'set-apart-from-the-womb',
    episode: 'l15-e5',
    title: 'An angel promises a son to a woman who could have no children; he must drink no wine, and he will be God’s from his mother’s womb → John the Baptist',
    from: ['JDG 13:3', 'JDG 13:5'],
    to: ['LUK 1:13', 'LUK 1:15'],
    explanation:
      'Samson’s birth was announced by an angel, to a woman who had no children, and he was to be set apart for God from before he was born. More than a thousand years later, the same thing happened to Zechariah and Elizabeth: an angel promised them a son, John, who would drink no wine and be filled with the Holy Spirit from his mother’s womb. Samson wasted much of his great gift and served himself; John gave everything to point to Jesus, saying, “He must increase, but I must decrease.” Both remind us that every life is known and called by God before birth.',
    sources: ['Luke 1:5–25', 'John 3:30', 'Jeremiah 1:5', 'Catechism 523, 717–718, 2270'],
    fulfilled: { age: 'XI', place: 'jerusalem' },
  },
  {
    id: 'a-ruler-from-bethlehem',
    episode: 'l15-e6',
    title: '“In those days there was no king in Israel” → the King born in Bethlehem',
    from: ['JDG 17:6', 'JDG 21:25'],
    to: ['MAT 2:6'],
    explanation:
      'The book of Judges ends with a sad cry: “there was no king in Israel; every man did what was right in his own eyes.” God’s people needed someone to lead them in God’s ways. The Levite who led Micah astray came from Bethlehem, a little town in Judah. But from that same little town God would bring a shepherd boy, David, to be Israel’s greatest king, and from David’s family, the true King, Jesus, born in Bethlehem. As Gideon said, “the LORD will rule over you”: in Jesus, God himself came to be our King, not by force, but by love.',
    sources: ['Matthew 2:1–6', 'Micah 5:2', 'Ruth 1:1', 'Ruth 4:17', 'John 18:36–37', 'Catechism 436, 528, 2816–2818'],
    fulfilled: { age: 'XI', place: 'bethlehem' },
  },
  // Level 16 · Ruth
  {
    id: 'sorrow-into-joy',
    episode: 'l16-e1',
    title: 'Naomi’s sorrow, and the news that God has visited his people → Jesus: “your sorrow will turn into joy”',
    from: ['RUT 1:5', 'RUT 1:6'],
    to: ['JHN 16:20', 'JHN 16:22'],
    explanation:
      'Naomi lost her husband and both her sons, and thought God had turned against her. But the story doesn’t end there: by the end of the book, her arms are full again. Jesus promised his friends the same on the night before he died: their sorrow would not just go away, it would turn into joy, a joy no one could take from them. God does not waste our tears.',
    sources: ['John 16:20–22', 'Psalm 30:11', 'Revelation 21:4', 'Catechism 1820, 2090'],
    fulfilled: { age: 'XII', place: 'jerusalem' },
  },
  {
    id: 'no-longer-strangers',
    episode: 'l16-e2',
    title: 'Ruth, a foreigner, chooses the people and the God of Israel → “You are no longer strangers and sojourners… but members of the household of God”',
    from: ['RUT 1:16', 'RUT 1:17'],
    to: ['EPH 2:19'],
    explanation:
      'Ruth was a Moabite, an outsider, from a people Israel’s law kept at a distance. But she chose the God of Israel, and he welcomed her completely: she became the great-grandmother of King David. Saint Paul says that in Jesus everyone, from every nation, can belong to God’s family in the same way. No one is a stranger to him. The Church has always loved Ruth as a sign that God’s promises are for all the nations.',
    sources: ['Ephesians 2:11–22', 'Isaiah 56:6–7', 'Matthew 28:19', 'Catechism 543, 831'],
    fulfilled: { age: 'XIII' },
  },
  {
    id: 'under-his-wings',
    episode: 'l16-e3',
    title: '“Under whose wings you have come to take refuge” → Jesus: “as a hen gathers her brood under her wings”',
    from: ['RUT 2:12'],
    to: ['MAT 23:37'],
    explanation:
      'Boaz blessed Ruth for coming to shelter under the wings of the God of Israel. The Psalms often speak of God’s wings, like a mother bird’s, sheltering those who trust him. Jesus used the same picture of himself, longing to gather his people under his wings as a hen gathers her chicks. Ruth found that shelter in God, and Boaz’s kindness was how God gave it to her.',
    sources: ['Matthew 23:37', 'Psalm 91:4', 'Psalm 36:7', 'Catechism 2563'],
    fulfilled: { age: 'XI', place: 'jerusalem' },
  },
  {
    id: 'grace-upon-grace',
    episode: 'l16-e4',
    title: 'Ruth comes home not empty, but with her arms full of barley → “from his fulness have we all received, grace upon grace”',
    from: ['RUT 3:15', 'RUT 3:17'],
    to: ['JHN 1:16'],
    explanation:
      '“I went away full, and the LORD has brought me back empty,” Naomi had said. But Boaz would not let Ruth go back “empty-handed”: he filled her shawl with barley from Bethlehem, the house of bread. Saint John says that God has done the same for us in Jesus, born in that same Bethlehem: “from his fulness have we all received, grace upon grace.” Jesus is the true bread from Bethlehem, and no one who comes to him goes home empty.',
    sources: ['John 1:14–16', 'John 6:35', 'Luke 1:53', 'Catechism 1406, 2837'],
    fulfilled: { age: 'XI', place: 'bethlehem' },
  },
  {
    id: 'our-redeemer',
    episode: 'l16-e5',
    title: 'Boaz the kinsman-redeemer buys back what was lost, at his own cost → “You were ransomed… with the precious blood of Christ”',
    from: ['RUT 4:9', 'RUT 4:10'],
    to: ['1PE 1:18', '1PE 1:19'],
    explanation:
      'The nearer kinsman would not risk his own inheritance to save Naomi’s family. Boaz did: he paid the price to buy back the land, and took Ruth as his wife, so that the dead would not be forgotten. Christians have always seen in Boaz, the go’el, a picture of Jesus, our Redeemer. He became our kinsman by becoming man, and he bought us back, not with silver or gold, but with his own life, to make us his own.',
    sources: ['1 Peter 1:18–19', 'Job 19:25', 'Isaiah 54:5', 'Ephesians 5:25', 'Catechism 517, 601, 1612'],
    fulfilled: { age: 'XII', place: 'jerusalem' },
  },
]

const BY_ID = new Map(THREADS.map((thread) => [thread.id, thread]))

export function threadById(id: string): GoldenThread | undefined {
  return BY_ID.get(id)
}
