import type { Question } from '../../../quiz/types'

/**
 * Level 15's quiz bank: the 44 questions of the approved Level 15 script ("Level 15 quiz
 * bank"), in its order. In each list of options, the first is the right one; the quiz
 * shuffles them.
 */

const E1 = 'l15-e1'
const E2 = 'l15-e2'
const E3 = 'l15-e3'
const E4 = 'l15-e4'
const E5 = 'l15-e5'
const E6 = 'l15-e6'

const FAITHFUL = '“If we are faithless, he remains faithful— for he cannot deny himself.”'
const SUN = '“Then the righteous will shine like the sun in the kingdom of their Father.”'
const VESSELS = '“We have this treasure in earthen vessels, to show that the transcendent power belongs to God and not to us.”'
const YES = 'Jesus: “Let what you say be simply ‘Yes’ or ‘No.’”'
const JOHN = 'John the Baptist: “he shall drink no wine nor strong drink, and he will be filled with the Holy Spirit.”'
const RULER = '“And you, O Bethlehem… from you shall come a ruler who will govern my people Israel.”'

export const level15Quiz: Question[] = [
  // Episode 1 · The Cycle of Forgetting
  { id: 'l15-q01', episode: E1, type: 'mc', prompt: 'After Joshua and the elders died, what was the new generation like?', options: ['They did not know the LORD or what he had done for Israel', 'They were braver than their fathers', 'They built the Temple', 'They went back to Egypt'], explanation: 'Nobody had told them.', ref: 'JDG 2:10' },
  {
    id: 'l15-q02',
    episode: E1,
    type: 'order',
    prompt: 'Put the circle of the judges in order.',
    items: ['The people did what was evil and served the Baals', 'The LORD gave them over to their enemies', 'The people cried to the LORD', 'The LORD raised up a judge', 'The land had rest'],
    explanation: 'And when the judge died, it began again.',
    ref: 'JDG 2:11-19; JDG 3:7-11',
  },
  { id: 'l15-q03', episode: E1, type: 'tf', statement: 'The judges of Israel were mainly judges in courts of law.', answer: false, explanation: 'They were leaders God raised up to save his people from their enemies.', ref: 'JDG 2:16' },
  { id: 'l15-q04', episode: E1, type: 'mc', prompt: 'Who was the first judge?', options: ['Othniel, from Caleb’s family', 'Gideon', 'Samson', 'Eli'], explanation: 'The Spirit of the LORD came upon him.', ref: 'JDG 3:9-10' },
  { id: 'l15-q05', episode: E1, type: 'finish', text: '…the LORD was moved to ___ by their groaning because of those who afflicted and oppressed them.', blanks: [['pity', 'anger', 'laughter', 'silence']], explanation: 'God heard his people every time.', ref: 'JDG 2:18' },
  { id: 'l15-q06', episode: E1, type: 'mc', prompt: 'What was unusual about the judge Ehud?', options: ['He was left-handed', 'He was a giant', 'He was a priest', 'He was a small boy'], explanation: 'A Benjaminite, a left-handed man.', ref: 'JDG 3:15' },
  { id: 'l15-q07', episode: E1, type: 'thread', from: 'Israel forgets God again and again, but God hears them every time', options: [FAITHFUL, VESSELS, SUN, RULER], explanation: 'God cannot stop being faithful.', ref: '2TI 2:13' },
  // Episode 2 · Deborah and Barak
  { id: 'l15-q08', episode: E2, type: 'mc', prompt: 'Where did Deborah sit when the people came to her for judgment?', options: ['Under a palm tree, between Ramah and Bethel', 'At the gate of Jericho', 'In the tabernacle', 'On Mount Sinai'], explanation: 'It was called the palm of Deborah.', ref: 'JDG 4:5' },
  { id: 'l15-q09', episode: E2, type: 'mc', prompt: 'How many chariots of iron did Sisera have?', options: ['Nine hundred', 'Twelve', 'Seventy', 'Ten thousand'], explanation: 'He oppressed Israel for twenty years.', ref: 'JDG 4:3' },
  { id: 'l15-q10', episode: E2, type: 'where', prompt: 'Sisera commanded the army of Jabin, a king of which land?', targets: ['canaan', 'egypt', 'edom', 'midian'], answer: ['canaan'], explanation: 'Jabin reigned in Hazor.', ref: 'JDG 4:2' },
  { id: 'l15-q11', episode: E2, type: 'who', quote: 'If you will go with me, I will go; but if you will not go with me, I will not go.', options: ['Barak', 'Deborah', 'Sisera', 'Gideon'], explanation: 'And Deborah went with him.', ref: 'JDG 4:8' },
  { id: 'l15-q12', episode: E2, type: 'who', quote: 'Up! For this is the day in which the LORD has given Sisera into your hand.', options: ['Deborah', 'Barak', 'Jael', 'Joshua'], explanation: '“Does not the LORD go out before you?”', ref: 'JDG 4:14' },
  { id: 'l15-q13', episode: E2, type: 'mc', prompt: 'What does Deborah’s song say swept Sisera’s army away?', options: ['The torrent Kishon', 'The Red Sea', 'The Jordan', 'An earthquake'], explanation: 'The river flooded the plain.', ref: 'JDG 5:21' },
  { id: 'l15-q14', episode: E2, type: 'thread', from: '“But thy friends be like the sun as he rises in his might”', options: [SUN, FAITHFUL, VESSELS, YES], explanation: 'Jesus’ promise to those who love God.', ref: 'MAT 13:43' },
  // Episode 3 · Gideon's Fleece and Three Hundred Men
  { id: 'l15-q15', episode: E3, type: 'mc', prompt: 'What was Gideon doing when the angel came to him?', options: ['Beating out wheat in a wine press, to hide it from the Midianites', 'Watching his sheep', 'Building an altar', 'Sleeping under a tree'], explanation: 'He was hiding from the raiders.', ref: 'JDG 6:11' },
  { id: 'l15-q16', episode: E3, type: 'finish', text: 'The LORD is with you, you mighty man of ___.', blanks: [['valor', 'Israel', 'God', 'war']], explanation: 'The angel’s greeting, to a man who felt like the least of all.', ref: 'JDG 6:12' },
  { id: 'l15-q17', episode: E3, type: 'mc', prompt: 'What sign did Gideon ask for first?', options: ['Dew on a fleece of wool, and the ground dry all around', 'Fire from heaven', 'A rainbow', 'A burning bush'], explanation: 'He wrung out a bowl full of water.', ref: 'JDG 6:37-38' },
  { id: 'l15-q18', episode: E3, type: 'tf', statement: 'God told Gideon that his army was too big.', answer: true, explanation: '“Lest Israel vaunt themselves against me.”', ref: 'JDG 7:2' },
  { id: 'l15-q19', episode: E3, type: 'mc', prompt: 'How many men did God choose to go with Gideon?', options: ['Three hundred', 'Twelve', 'Ten thousand', 'Thirty-two thousand'], explanation: 'The ones who lapped the water from their hands.', ref: 'JDG 7:6-7' },
  { id: 'l15-q20', episode: E3, type: 'mc', prompt: 'What did Gideon’s men carry down to the Midianite camp?', options: ['Trumpets, and empty jars with torches inside', 'Swords and shields', 'The ark of the covenant', 'Bows and arrows'], explanation: '“Look at me, and do likewise.”', ref: 'JDG 7:16-17' },
  { id: 'l15-q21', episode: E3, type: 'where', prompt: 'Gideon saved Israel from raiders who came from which land?', targets: ['midian', 'egypt', 'canaan', 'edom'], answer: ['midian'], explanation: 'They came like locusts, with camels without number.', ref: 'JDG 6:1-6' },
  { id: 'l15-q22', episode: E3, type: 'who', quote: 'I will not rule over you, and my son will not rule over you; the LORD will rule over you.', options: ['Gideon', 'Jephthah', 'Samson', 'Micah'], explanation: 'When the people asked him to be their king.', ref: 'JDG 8:22-23' },
  { id: 'l15-q23', episode: E3, type: 'thread', from: 'Torches hidden in clay jars blaze out when the jars are broken', options: [VESSELS, SUN, FAITHFUL, RULER], explanation: 'The light is God’s, not ours.', ref: '2CO 4:7' },
  // Episode 4 · Jephthah's Vow
  { id: 'l15-q24', episode: E4, type: 'mc', prompt: 'Why did Jephthah’s brothers drive him away?', options: ['They said he couldn’t inherit, because he was the son of another woman', 'He had stolen from them', 'He worshiped idols', 'He was a coward'], explanation: 'He fled to the land of Tob.', ref: 'JDG 11:2-3' },
  { id: 'l15-q25', episode: E4, type: 'who', quote: 'Did you not hate me, and drive me out of my father’s house? Why have you come to me now when you are in trouble?', options: ['Jephthah', 'Gideon', 'Samson', 'Micah'], explanation: 'To the elders of Gilead.', ref: 'JDG 11:7' },
  { id: 'l15-q26', episode: E4, type: 'mc', prompt: 'What did Jephthah do first, before any fighting?', options: ['He sent messengers to the king of the Ammonites, to settle it peacefully', 'He ran away to Egypt', 'He built a wall around Gilead', 'He asked God for a sign with a fleece'], explanation: 'But the king would not listen.', ref: 'JDG 11:12-28' },
  {
    id: 'l15-q27',
    episode: E4,
    type: 'order',
    prompt: 'Put Israel’s journey in order, as Jephthah told it.',
    items: ['Out of Egypt to the Red Sea', 'To Kadesh', 'Around the lands of Edom and Moab', 'Across the Arnon', 'The land from the Arnon to the Jabbok'],
    explanation: 'They never took the land of Moab or Ammon.',
    ref: 'JDG 11:15-22',
  },
  { id: 'l15-q28', episode: E4, type: 'mc', prompt: 'Who came out of Jephthah’s house first to meet him when he came home?', options: ['His only daughter, with timbrels and dancing', 'His brothers', 'The elders of Gilead', 'A lamb'], explanation: 'She was his only child.', ref: 'JDG 11:34' },
  { id: 'l15-q29', episode: E4, type: 'tf', statement: 'God told Jephthah to make his vow.', answer: false, explanation: 'Jephthah made it himself, and God’s law forbade offering children.', ref: 'JDG 11:30-31; DEU 12:31' },
  { id: 'l15-q30', episode: E4, type: 'thread', from: 'Jephthah’s careless vow', options: [YES, FAITHFUL, VESSELS, SUN], explanation: 'No need to bargain with God.', ref: 'MAT 5:37' },
  // Episode 5 · Samson
  { id: 'l15-q31', episode: E5, type: 'mc', prompt: 'What did the angel say about the boy who would be born to Manoah’s wife?', options: ['No razor should touch his head, for he would be a Nazirite to God', 'He would be a king', 'He would build a temple', 'He would be a priest'], explanation: 'Set apart for God from birth.', ref: 'JDG 13:5' },
  { id: 'l15-q32', episode: E5, type: 'where', prompt: 'Samson was born at Zorah, near the Philistines. Which land was it in?', targets: ['canaan', 'egypt', 'edom', 'midian'], answer: ['canaan'], explanation: 'In the hills of the tribe of Dan, looking down on the Philistine plain by the sea.', ref: 'JDG 13:2' },
  { id: 'l15-q33', episode: E5, type: 'finish', text: 'Out of the eater came something to eat. Out of the strong came something ___.', blanks: [['sweet', 'strong', 'new', 'small']], explanation: 'Samson’s riddle.', ref: 'JDG 14:14' },
  { id: 'l15-q34', episode: E5, type: 'mc', prompt: 'What was the answer to Samson’s riddle?', options: ['Honey from a lion’s body', 'Bread from a stone', 'Milk from a goat', 'Water from a rock'], explanation: '“What is sweeter than honey? What is stronger than a lion?”', ref: 'JDG 14:8; JDG 14:18' },
  { id: 'l15-q35', episode: E5, type: 'who', quote: 'Please tell me wherein your great strength lies, and how you might be bound, that one could subdue you.', options: ['Delilah', 'Samson’s mother', 'Jael', 'Deborah'], explanation: 'The Philistine lords had promised her silver.', ref: 'JDG 16:5-6' },
  { id: 'l15-q36', episode: E5, type: 'mc', prompt: 'What happened when Samson’s hair was shaved off?', options: ['His strength left him, because the LORD had left him', 'He grew stronger', 'Nothing at all', 'He became king'], explanation: 'He had broken his promise to God.', ref: 'JDG 16:19-20' },
  { id: 'l15-q37', episode: E5, type: 'finish', text: 'O Lord GOD, ___ me, I pray thee, and strengthen me, I pray thee, only this once…', blanks: [['remember', 'forgive', 'help', 'bless']], explanation: 'Samson’s last prayer.', ref: 'JDG 16:28' },
  { id: 'l15-q38', episode: E5, type: 'thread', from: 'An angel promises a son to a woman with no children; he must drink no wine', options: [JOHN, RULER, VESSELS, FAITHFUL], explanation: 'Both were set apart for God before they were born.', ref: 'LUK 1:15' },
  // Episode 6 · Everyone Did What Was Right in His Own Eyes
  { id: 'l15-q39', episode: E6, type: 'mc', prompt: 'What did Micah’s mother have made from her silver?', options: ['A graven image and a molten image, for Micah’s shrine', 'A crown for a king', 'A tent for the ark', 'Gifts for the poor'], explanation: 'She said she was giving it “to the LORD.”', ref: 'JDG 17:3-5' },
  { id: 'l15-q40', episode: E6, type: 'finish', text: 'In those days there was no ___ in Israel; every man did what was right in his own eyes.', blanks: [['king', 'judge', 'prophet', 'law']], explanation: 'The sad refrain at the end of the book.', ref: 'JDG 17:6; JDG 21:25' },
  { id: 'l15-q41', episode: E6, type: 'mc', prompt: 'Who was the young Levite who became the Danites’ priest?', options: ['Jonathan, a grandson of Moses', 'A son of Aaron', 'Samuel', 'A Philistine'], explanation: 'Moses’ own grandson served an idol.', ref: 'JDG 18:30' },
  { id: 'l15-q42', episode: E6, type: 'mc', prompt: 'What did the Danites name the city of Laish after they took it?', options: ['Dan', 'Bethel', 'Shiloh', 'Gaza'], explanation: 'After their ancestor Dan.', ref: 'JDG 18:29' },
  { id: 'l15-q43', episode: E6, type: 'mc', prompt: 'At the end of the book, why did the people weep at Bethel?', options: ['One tribe, Benjamin, was almost lost from Israel', 'The ark had been stolen', 'Samson had died', 'The Philistines had won'], explanation: '“Why has this come to pass in Israel?”', ref: 'JDG 21:2-3' },
  { id: 'l15-q44', episode: E6, type: 'thread', from: '“In those days there was no king in Israel”', options: [RULER, SUN, FAITHFUL, YES], explanation: 'The true King, born in Bethlehem.', ref: 'MAT 2:6' },
]
