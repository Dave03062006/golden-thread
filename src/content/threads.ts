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
]

const BY_ID = new Map(THREADS.map((thread) => [thread.id, thread]))

export function threadById(id: string): GoldenThread | undefined {
  return BY_ID.get(id)
}
