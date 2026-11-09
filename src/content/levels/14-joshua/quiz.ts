import type { Question } from '../../../quiz/types'

/**
 * Level 14's quiz bank: the 42 questions of the approved Level 14 script ("Level 14 quiz
 * bank"), in its order. In each list of options, the first is the right one; the quiz
 * shuffles them. Every episode has six questions.
 */

const E1 = 'l14-e1'
const E2 = 'l14-e2'
const E3 = 'l14-e3'
const E4 = 'l14-e4'
const E5 = 'l14-e5'
const E6 = 'l14-e6'
const E7 = 'l14-e7'

export const level14Quiz: Question[] = [
  // Episode 1 · Rahab and the Spies
  { id: 'l14-q01', episode: E1, type: 'finish', text: 'Be strong and of good ___; be not frightened, neither be dismayed; for the LORD your God is with you wherever you go.', blanks: [['courage', 'heart', 'cheer', 'faith']], explanation: 'God’s words to Joshua.', ref: 'JOS 1:9' },
  { id: 'l14-q02', episode: E1, type: 'mc', prompt: 'Where did Rahab hide the two spies?', options: ['On her roof, under stalks of flax', 'In a well', 'Under her bed', 'In the city gate'], explanation: 'She told the king’s men they had gone.', ref: 'JOS 2:6' },
  { id: 'l14-q03', episode: E1, type: 'who', quote: 'The LORD your God is he who is God in heaven above and on earth beneath.', options: ['Rahab', 'Joshua', 'The king of Jericho', 'Caleb'], explanation: 'She believed in the God of Israel.', ref: 'JOS 2:11' },
  { id: 'l14-q04', episode: E1, type: 'mc', prompt: 'What did Rahab tie in her window, as a sign?', options: ['A scarlet cord', 'A white flag', 'A lamp', 'An olive branch'], explanation: 'So her family would be saved.', ref: 'JOS 2:18; JOS 2:21' },
  { id: 'l14-q05', episode: E1, type: 'tf', statement: 'Rahab became one of the ancestors of Jesus.', answer: true, explanation: 'She is named in Jesus’ family tree.', ref: 'MAT 1:5' },
  {
    id: 'l14-q06',
    episode: E1,
    type: 'thread',
    from: 'Rahab, saved by the scarlet cord',
    options: ['“By faith Rahab the harlot did not perish.”', '“By faith the walls of Jericho fell down.”', '“If God is for us, who is against us?”', '“Lord, to whom shall we go?”'],
    explanation: 'Her faith saved her and her family.',
    ref: 'HEB 11:31',
  },
  // Episode 2 · Crossing the Jordan
  { id: 'l14-q07', episode: E2, type: 'mc', prompt: 'What went first into the Jordan, ahead of the people?', options: ['The ark of the covenant, carried by the priests', 'Joshua on a horse', 'The twelve spies', 'A great army'], explanation: '“Pass on before the people.”', ref: 'JOS 3:6' },
  { id: 'l14-q08', episode: E2, type: 'mc', prompt: 'What happened when the priests’ feet touched the water?', options: ['The river stopped, and the people crossed on dry ground', 'The water turned to blood', 'A bridge appeared', 'The ark floated'], explanation: 'The waters stood in a heap far off.', ref: 'JOS 3:15-17' },
  { id: 'l14-q09', episode: E2, type: 'mc', prompt: 'What did twelve men carry out of the Jordan?', options: ['Twelve stones, one for each tribe', 'Twelve fish', 'Twelve jars of water', 'Twelve trumpets'], explanation: 'A memorial for ever.', ref: 'JOS 4:3-7' },
  { id: 'l14-q10', episode: E2, type: 'finish', text: '…when your children ask in time to come, ‘What do those ___ mean to you?’', blanks: [['stones', 'trumpets', 'walls', 'songs']], explanation: 'So the story would be told.', ref: 'JOS 4:6' },
  { id: 'l14-q11', episode: E2, type: 'tf', statement: 'The manna stopped the day after the people ate the grain of the land.', answer: true, explanation: '“The people of Israel had manna no more.”', ref: 'JOS 5:12' },
  {
    id: 'l14-q12',
    episode: E2,
    type: 'thread',
    from: 'The people pass through the Jordan into the promised land',
    options: ['Jesus “was baptized by John in the Jordan.”', '“By faith the walls of Jericho fell down.”', '“If we confess our sins.”', '“All the promises of God find their Yes in him.”'],
    explanation: 'Baptism is the way into God’s promises.',
    ref: 'MRK 1:9',
  },
  // Episode 3 · The Walls of Jericho
  { id: 'l14-q13', episode: E3, type: 'mc', prompt: 'How many days did the people march around Jericho?', options: ['Seven', 'Three', 'Forty', 'One'], explanation: 'Once a day, and seven times on the seventh day.', ref: 'JOS 6:3-4' },
  { id: 'l14-q14', episode: E3, type: 'mc', prompt: 'What did the priests carry before the ark?', options: ['Seven trumpets of rams’ horns', 'Seven swords', 'Seven lamps', 'Seven loaves'], explanation: 'They blew them as they marched.', ref: 'JOS 6:4' },
  {
    id: 'l14-q15',
    episode: E3,
    type: 'order',
    prompt: 'Put what happened at Jericho in order.',
    items: ['They marched around once a day for six days', 'On the seventh day they marched around seven times', 'The priests blew the trumpets', 'The people shouted', 'The wall fell down flat'],
    explanation: 'As the LORD had said.',
    ref: 'JOS 6:15-20',
  },
  { id: 'l14-q16', episode: E3, type: 'tf', statement: 'The people were to shout and make noise every day as they marched.', answer: false, explanation: 'They were silent until Joshua told them to shout.', ref: 'JOS 6:10' },
  { id: 'l14-q17', episode: E3, type: 'mc', prompt: 'Who was saved when Jericho fell?', options: ['Rahab and all her family', 'The king of Jericho', 'No one', 'Only the soldiers'], explanation: 'Because she hid the messengers.', ref: 'JOS 6:25' },
  {
    id: 'l14-q18',
    episode: E3,
    type: 'thread',
    from: 'The walls of Jericho fall after seven days of marching',
    options: ['“By faith the walls of Jericho fell down.”', '“By faith Rahab the harlot did not perish.”', '“Lord, to whom shall we go?”', '“If God is for us, who is against us?”'],
    explanation: 'Not by strength, but by trusting God.',
    ref: 'HEB 11:30',
  },
  // Episode 4 · Achan and Ai
  { id: 'l14-q19', episode: E4, type: 'mc', prompt: 'Why did Israel lose the first battle of Ai?', options: ['Achan had taken and hidden things that belonged to God', 'They had too few soldiers', 'It rained', 'They lost the way'], explanation: '“Israel has sinned.”', ref: 'JOS 7:1; JOS 7:11' },
  { id: 'l14-q20', episode: E4, type: 'mc', prompt: 'What did Joshua do after the defeat?', options: ['He tore his clothes and lay on his face before the ark', 'He went back to Egypt', 'He blamed the spies', 'He gave up'], explanation: 'Until the evening, with the elders.', ref: 'JOS 7:6' },
  { id: 'l14-q21', episode: E4, type: 'who', quote: 'My son, give glory to the LORD God of Israel… tell me now what you have done; do not hide it from me.', options: ['Joshua, to Achan', 'Moses, to Aaron', 'Caleb, to Joshua', 'Rahab, to the spies'], explanation: 'Joshua spoke to him gently.', ref: 'JOS 7:19' },
  { id: 'l14-q22', episode: E4, type: 'mc', prompt: 'Where had Achan hidden what he took?', options: ['In the ground inside his tent', 'In a cave', 'In the river', 'In the tabernacle'], explanation: 'A mantle, silver and gold.', ref: 'JOS 7:21' },
  { id: 'l14-q23', episode: E4, type: 'mc', prompt: 'What did Joshua do on Mount Ebal?', options: ['Built an altar, wrote the law on stones, and read it to all the people', 'Built a tower', 'Hid from his enemies', 'Planted a vineyard'], explanation: 'Women, children and strangers too.', ref: 'JOS 8:30-35' },
  {
    id: 'l14-q24',
    episode: E4,
    type: 'thread',
    from: '“Tell me now what you have done; do not hide it from me”',
    options: ['“If we confess our sins, he is faithful and just, and will forgive our sins.”', '“If God is for us, who is against us?”', '“By faith the walls of Jericho fell down.”', '“All the promises of God find their Yes in him.”'],
    explanation: 'Confession brings forgiveness.',
    ref: '1JN 1:9',
  },
  // Episode 5 · The Sun Stands Still
  { id: 'l14-q25', episode: E5, type: 'where', prompt: 'Gibeon, Jericho and Ai were all in which land?', targets: ['canaan', 'egypt', 'edom', 'midian'], answer: ['canaan'], explanation: 'The promised land.', ref: 'JOS 10:6' },
  { id: 'l14-q26', episode: E5, type: 'mc', prompt: 'Why did Joshua go to help Gibeon?', options: ['Five kings had attacked it, and Israel had made a promise to its people', 'Gibeon had attacked Israel', 'He wanted their gold', 'He was lost'], explanation: '“Come up to us quickly, and save us.”', ref: 'JOS 10:6' },
  { id: 'l14-q27', episode: E5, type: 'mc', prompt: 'How did Joshua get to Gibeon so quickly?', options: ['He marched all night from Gilgal', 'He sailed up the river', 'He rode a chariot', 'The angel carried him'], explanation: 'He came upon them suddenly.', ref: 'JOS 10:9' },
  { id: 'l14-q28', episode: E5, type: 'finish', text: 'Sun, stand thou still at ___, and thou Moon in the valley of Aijalon.', blanks: [['Gibeon', 'Jericho', 'Egypt', 'Shiloh']], explanation: 'Joshua’s prayer.', ref: 'JOS 10:12' },
  { id: 'l14-q29', episode: E5, type: 'tf', statement: 'The Bible says that on that day the LORD fought for Israel.', answer: true, explanation: '“There has been no day like it before or since.”', ref: 'JOS 10:14' },
  {
    id: 'l14-q30',
    episode: E5,
    type: 'thread',
    from: '“The LORD fought for Israel”',
    options: ['“If God is for us, who is against us?”', '“Lord, to whom shall we go?”', '“By faith Rahab the harlot did not perish.”', '“If we confess our sins.”'],
    explanation: 'God is with those who trust him.',
    ref: 'ROM 8:31',
  },
  // Episode 6 · Dividing the Land
  { id: 'l14-q31', episode: E6, type: 'mc', prompt: 'How old was Caleb when he asked for the hill country?', options: ['Eighty-five', 'Forty', 'A hundred and twenty', 'Twenty'], explanation: '“I am still as strong to this day.”', ref: 'JOS 14:10-11' },
  { id: 'l14-q32', episode: E6, type: 'mc', prompt: 'Which city became Caleb’s inheritance?', options: ['Hebron', 'Jericho', 'Shiloh', 'Egypt'], explanation: 'Because he wholly followed the LORD.', ref: 'JOS 14:13-14' },
  { id: 'l14-q33', episode: E6, type: 'mc', prompt: 'Where was the tent of meeting set up in the promised land?', options: ['At Shiloh', 'At Jericho', 'On Mount Sinai', 'In Egypt'], explanation: 'The land lay subdued before them.', ref: 'JOS 18:1' },
  { id: 'l14-q34', episode: E6, type: 'mc', prompt: 'How did Joshua share out the land among the tribes?', options: ['He cast lots before the LORD', 'He held a race', 'He gave it all to Judah', 'He let them fight for it'], explanation: '“To each his portion.”', ref: 'JOS 18:10' },
  { id: 'l14-q35', episode: E6, type: 'finish', text: 'Not one of all the good ___ which the LORD had made to the house of Israel had failed; all came to pass.', blanks: [['promises', 'battles', 'houses', 'kings']], explanation: 'God keeps his word.', ref: 'JOS 21:45' },
  {
    id: 'l14-q36',
    episode: E6,
    type: 'thread',
    from: '“Not one of all the good promises… had failed”',
    options: ['“All the promises of God find their Yes in him.”', '“By faith the walls of Jericho fell down.”', '“If we confess our sins.”', '“Lord, to whom shall we go?”'],
    explanation: 'And an inheritance kept in heaven for us.',
    ref: '2CO 1:20',
  },
  // Episode 7 · "As for Me and My House"
  { id: 'l14-q37', episode: E7, type: 'mc', prompt: 'Where did Joshua gather all the tribes at the end of his life?', options: ['At Shechem', 'At Jericho', 'On Mount Nebo', 'In Egypt'], explanation: 'They presented themselves before God.', ref: 'JOS 24:1' },
  { id: 'l14-q38', episode: E7, type: 'finish', text: '…but as for me and my ___, we will serve the LORD.', blanks: [['house', 'army', 'sheep', 'friends']], explanation: 'Joshua’s own answer.', ref: 'JOS 24:15' },
  { id: 'l14-q39', episode: E7, type: 'mc', prompt: 'What did the people answer?', options: ['“The LORD our God we will serve, and his voice we will obey.”', '“We will go back to Egypt.”', '“We will think about it.”', '“We will serve the gods of the Amorites.”'], explanation: 'They made a covenant that day.', ref: 'JOS 24:24' },
  { id: 'l14-q40', episode: E7, type: 'mc', prompt: 'What did Joshua set up under the oak at Shechem, as a witness?', options: ['A great stone', 'A golden statue', 'A tent', 'A tower'], explanation: 'Beside the sanctuary of the LORD.', ref: 'JOS 24:26' },
  { id: 'l14-q41', episode: E7, type: 'tf', statement: 'Joshua died at a hundred and ten years old.', answer: true, explanation: 'The same age as Joseph.', ref: 'JOS 24:29' },
  {
    id: 'l14-q42',
    episode: E7,
    type: 'thread',
    from: '“As for me and my house, we will serve the LORD”',
    options: ['Peter: “Lord, to whom shall we go? You have the words of eternal life.”', '“If God is for us, who is against us?”', '“By faith the walls of Jericho fell down.”', '“All the promises of God find their Yes in him.”'],
    explanation: 'Choosing to follow Jesus.',
    ref: 'JHN 6:68',
  },
]
