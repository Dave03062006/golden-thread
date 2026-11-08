import type { Question } from '../../../quiz/types'

/**
 * Level 13's quiz bank: the 40 questions of the approved Level 13 script ("Level 13 quiz
 * bank"), in its order. In each list of options, the first is the right one; the quiz
 * shuffles them. Every episode has eight questions.
 */

const E1 = 'l13-e1'
const E2 = 'l13-e2'
const E3 = 'l13-e3'
const E4 = 'l13-e4'
const E5 = 'l13-e5'

export const level13Quiz: Question[] = [
  // Episode 1 · Remember the Way
  { id: 'l13-q01', episode: E1, type: 'mc', prompt: 'Where were the people camped when Moses gave his last speeches?', options: ['On the plains of Moab, across the Jordan from Jericho', 'At Mount Sinai', 'In Egypt', 'In Jerusalem'], explanation: '“Beyond the Jordan, in the land of Moab.”', ref: 'DEU 1:5' },
  { id: 'l13-q02', episode: E1, type: 'mc', prompt: 'How long had God led the people in the wilderness?', options: ['Forty years', 'Forty days', 'Seven years', 'Twelve years'], explanation: '“All the way which the LORD your God has led you these forty years.”', ref: 'DEU 8:2' },
  { id: 'l13-q03', episode: E1, type: 'finish', text: '…man does not live by ___ alone, but that man lives by everything that proceeds out of the mouth of the LORD.', blanks: [['bread', 'water', 'gold', 'work']], explanation: 'God fed them with manna to teach them this.', ref: 'DEU 8:3' },
  { id: 'l13-q04', episode: E1, type: 'tf', statement: 'In forty years of walking, the people’s clothing did not wear out.', answer: true, explanation: '“And your foot did not swell, these forty years.”', ref: 'DEU 8:4' },
  { id: 'l13-q05', episode: E1, type: 'mc', prompt: 'What did Moses warn the people to beware of saying, once they were rich in the land?', options: ['“My power and the might of my hand have gotten me this wealth.”', '“Let us go back to Egypt.”', '“We will not listen.”', '“The land is too small.”'], explanation: 'It is God who gives the power to get wealth.', ref: 'DEU 8:17-18' },
  { id: 'l13-q06', episode: E1, type: 'where', prompt: 'Moses gave his last speeches beside which sea, near the plains of Moab?', targets: ['dead-sea', 'red-sea', 'canaan', 'egypt'], answer: ['dead-sea'], explanation: 'The plains of Moab lie just north of it.', ref: 'DEU 1:5' },
  { id: 'l13-q07', episode: E1, type: 'order', prompt: 'Put the stops of the journey in order.', items: ['Egypt', 'The Red Sea', 'Mount Sinai', 'Kadesh', 'The plains of Moab'], explanation: 'Levels 7 to 12.', ref: 'DEU 1:1-5' },
  {
    id: 'l13-q08',
    episode: E1,
    type: 'thread',
    from: '“Man does not live by bread alone”',
    options: ['Jesus in the wilderness: “It is written, ‘Man shall not live by bread alone.’”', '“Hear, O Israel.”', '“I am the way, and the truth, and the life.”', '“Listen to him.”'],
    explanation: 'Jesus answered the devil with Moses’ words.',
    ref: 'LUK 4:4',
  },
  // Episode 2 · "Hear, O Israel"
  { id: 'l13-q09', episode: E2, type: 'finish', text: 'Hear, O Israel: The LORD our God is ___ LORD', blanks: [['one', 'a great', 'the first', 'a strong']], explanation: 'The words called the Shema.', ref: 'DEU 6:4' },
  { id: 'l13-q10', episode: E2, type: 'finish', text: '…you shall love the LORD your God with all your ___, and with all your soul, and with all your might.', blanks: [['heart', 'gold', 'words', 'land']], explanation: 'Love God completely.', ref: 'DEU 6:5' },
  { id: 'l13-q11', episode: E2, type: 'mc', prompt: 'When were parents to talk about God’s words with their children?', options: ['At home, on the road, when they lay down and when they got up', 'Only on the sabbath', 'Only at the tabernacle', 'Only once a year'], explanation: 'All the time, every day.', ref: 'DEU 6:7' },
  { id: 'l13-q12', episode: E2, type: 'mc', prompt: 'Where were the words to be written?', options: ['On the doorposts of the house and on the gates', 'On the walls of Jericho', 'In the sand', 'On the sails of ships'], explanation: 'Jewish families still do this, with the mezuzah.', ref: 'DEU 6:9' },
  { id: 'l13-q13', episode: E2, type: 'tf', statement: 'Jesus called “Hear, O Israel… you shall love the Lord your God” the first of all the commandments.', answer: true, explanation: 'And the second: love your neighbor as yourself.', ref: 'MRK 12:29-31' },
  { id: 'l13-q14', episode: E2, type: 'mc', prompt: 'When a son asked what God’s laws meant, what were his parents to tell him first?', options: ['“We were Pharaoh’s slaves in Egypt; and the LORD brought us out”', '“Because we are better than others”', '“Because Moses said so”', '“Nobody knows”'], explanation: 'The law begins with what God has done.', ref: 'DEU 6:20-21' },
  { id: 'l13-q15', episode: E2, type: 'who', quote: 'Which commandment is the first of all?', options: ['A scribe, asking Jesus', 'Pharaoh', 'Joshua', 'The devil'], explanation: 'Jesus answered with the words of Moses.', ref: 'MRK 12:28' },
  {
    id: 'l13-q16',
    episode: E2,
    type: 'thread',
    from: '“Hear, O Israel: The LORD our God is one LORD”',
    options: ['Jesus: “The first is, ‘Hear, O Israel…’”', '“I came that they may have life.”', '“Listen to him.”', '“Man shall not live by bread alone.”'],
    explanation: 'The first and greatest commandment.',
    ref: 'MRK 12:29',
  },
  // Episode 3 · A Prophet Like Moses
  { id: 'l13-q17', episode: E3, type: 'mc', prompt: 'What did God promise to raise up for his people after Moses?', options: ['A prophet like Moses', 'A golden statue', 'A new Egypt', 'A great wall'], explanation: '“Him you shall heed.”', ref: 'DEU 18:15' },
  { id: 'l13-q18', episode: E3, type: 'mc', prompt: 'Why did the people at Horeb ask Moses to speak to them, instead of God?', options: ['They were afraid of God’s voice and the great fire', 'They could not understand Hebrew', 'They were too far away', 'They were asleep'], explanation: '“Lest I die.”', ref: 'DEU 18:16' },
  { id: 'l13-q19', episode: E3, type: 'mc', prompt: 'How old was Moses when he gave his last speeches?', options: ['A hundred and twenty years old', 'Forty years old', 'Eighty years old', 'Nine hundred years old'], explanation: '“I am no longer able to go out and come in.”', ref: 'DEU 31:2' },
  { id: 'l13-q20', episode: E3, type: 'finish', text: 'Be strong and of good ___; for you shall go with this people into the land', blanks: [['courage', 'heart', 'cheer', 'faith']], explanation: 'Moses’ words to Joshua.', ref: 'DEU 31:7' },
  { id: 'l13-q21', episode: E3, type: 'who', quote: 'It is the LORD who goes before you; he will be with you, he will not fail you or forsake you.', options: ['Moses, to Joshua', 'Joshua, to Caleb', 'Aaron, to Eleazar', 'Balaam, to Balak'], explanation: 'In the sight of all Israel.', ref: 'DEU 31:7-8' },
  { id: 'l13-q22', episode: E3, type: 'mc', prompt: 'What did Moses do with the words of the law before he died?', options: ['He wrote them in a book', 'He buried them in the sand', 'He sent them to Egypt', 'He burned them'], explanation: '“To the very end.”', ref: 'DEU 31:24' },
  { id: 'l13-q23', episode: E3, type: 'order', prompt: 'Put Moses’ three times of forty years in order.', items: ['A prince in Egypt', 'A shepherd in Midian', 'The leader of Israel in the wilderness'], explanation: 'A hundred and twenty years in all.', ref: 'ACT 7:23; ACT 7:30; ACT 7:36' },
  {
    id: 'l13-q24',
    episode: E3,
    type: 'thread',
    from: '“The LORD your God will raise up for you a prophet like me”',
    options: ['“This is my beloved Son… listen to him.”', '“I am the way, and the truth, and the life.”', '“Man shall not live by bread alone.”', '“The first is, ‘Hear, O Israel.’”'],
    explanation: 'Jesus is the prophet like Moses.',
    ref: 'ACT 3:22; MAT 17:5',
  },
  // Episode 4 · Choose Life
  { id: 'l13-q25', episode: E4, type: 'tf', statement: 'Moses said God’s commandment was too hard for the people, and far away.', answer: false, explanation: '“It is not too hard for you, neither is it far off.”', ref: 'DEU 30:11' },
  { id: 'l13-q26', episode: E4, type: 'finish', text: 'But the word is very ___ you; it is in your mouth and in your heart, so that you can do it.', blanks: [['near', 'far from', 'hard for', 'new to']], explanation: 'Not in heaven, nor beyond the sea.', ref: 'DEU 30:14' },
  { id: 'l13-q27', episode: E4, type: 'mc', prompt: 'What did Moses set before the people?', options: ['Life and good, death and evil', 'Gold and silver', 'Bread and water', 'Swords and spears'], explanation: 'A choice, every day.', ref: 'DEU 30:15' },
  { id: 'l13-q28', episode: E4, type: 'finish', text: '…therefore choose ___, that you and your descendants may live', blanks: [['life', 'gold', 'land', 'kings']], explanation: 'Heaven and earth are witnesses.', ref: 'DEU 30:19' },
  { id: 'l13-q29', episode: E4, type: 'mc', prompt: 'What does choosing life mean, as Moses explained it?', options: ['Loving the LORD, obeying his voice, and holding fast to him', 'Becoming rich', 'Living a long time without God', 'Never working'], explanation: '“That means life to you.”', ref: 'DEU 30:20' },
  { id: 'l13-q30', episode: E4, type: 'mc', prompt: 'Whom did Moses call to witness the people’s choice?', options: ['Heaven and earth', 'The kings of Canaan', 'Pharaoh', 'The angels of Egypt'], explanation: 'All of creation.', ref: 'DEU 30:19' },
  { id: 'l13-q31', episode: E4, type: 'tf', statement: 'God forced his people to love him.', answer: false, explanation: 'He set the choice before them, and begged them to choose life.', ref: 'DEU 30:19' },
  {
    id: 'l13-q32',
    episode: E4,
    type: 'thread',
    from: '“Choose life”',
    options: ['“I came that they may have life, and have it abundantly.”', '“Listen to him.”', '“Man shall not live by bread alone.”', '“Moses and Elijah, talking with him.”'],
    explanation: 'Jesus is the way, the truth and the life.',
    ref: 'JHN 10:10; JHN 14:6',
  },
  // Episode 5 · Moses Sees the Land
  { id: 'l13-q33', episode: E5, type: 'mc', prompt: 'From which mountain did Moses see the promised land?', options: ['Mount Nebo', 'Mount Sinai', 'Mount Hor', 'Mount Ararat'], explanation: '“To the top of Pisgah, which is opposite Jericho.”', ref: 'DEU 34:1' },
  { id: 'l13-q34', episode: E5, type: 'mc', prompt: 'Which city of palm trees did Moses see below him?', options: ['Jericho', 'Hebron', 'Babylon', 'Rameses'], explanation: 'In the valley, as far as Zoar.', ref: 'DEU 34:3' },
  { id: 'l13-q35', episode: E5, type: 'tf', statement: 'Moses went over the Jordan into the promised land before he died.', answer: false, explanation: '“I have let you see it with your eyes, but you shall not go over there.”', ref: 'DEU 34:4' },
  { id: 'l13-q36', episode: E5, type: 'mc', prompt: 'Where was Moses buried?', options: ['In a valley in Moab; no one knows the place', 'In a pyramid in Egypt', 'On Mount Sinai', 'In Jerusalem'], explanation: '“To this day.”', ref: 'DEU 34:6' },
  { id: 'l13-q37', episode: E5, type: 'finish', text: 'Moses was a hundred and twenty years old when he died; his eye was not ___, nor his natural force abated.', blanks: [['dim', 'bright', 'closed', 'blue']], explanation: 'Strong to the very end.', ref: 'DEU 34:7' },
  { id: 'l13-q38', episode: E5, type: 'who', quote: 'Who led the people after Moses, full of the spirit of wisdom?', options: ['Joshua', 'Caleb', 'Eleazar', 'Balaam'], explanation: '“For Moses had laid his hands upon him.”', ref: 'DEU 34:9' },
  { id: 'l13-q39', episode: E5, type: 'mc', prompt: 'What made Moses different from every prophet after him?', options: ['The LORD knew him face to face', 'He was the tallest', 'He was the richest', 'He never spoke'], explanation: '“There has not arisen a prophet since in Israel like Moses.”', ref: 'DEU 34:10' },
  {
    id: 'l13-q40',
    episode: E5,
    type: 'thread',
    from: 'Moses sees the land, but does not go in',
    options: ['On the mountain of the Transfiguration, “there appeared to them Moses and Elijah, talking with him.”', '“Listen to him.”', '“Man shall not live by bread alone.”', '“I am the way, and the truth, and the life.”'],
    explanation: 'Moses in the promised land at last, with Jesus.',
    ref: 'MAT 17:3',
  },
]
