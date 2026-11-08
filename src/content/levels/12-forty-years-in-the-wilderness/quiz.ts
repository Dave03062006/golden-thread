import type { Question } from '../../../quiz/types'

/**
 * Level 12's quiz bank: the 48 questions of the approved Level 12 script ("Level 12 quiz
 * bank"), in its order. In each list of options, the first is the right one; the quiz
 * shuffles them. Every episode has six questions.
 */

const E1 = 'l12-e1'
const E2 = 'l12-e2'
const E3 = 'l12-e3'
const E4 = 'l12-e4'
const E5 = 'l12-e5'
const E6 = 'l12-e6'
const E7 = 'l12-e7'
const E8 = 'l12-e8'

export const level12Quiz: Question[] = [
  // Episode 1 · The Camp and the Priestly Blessing
  { id: 'l12-q01', episode: E1, type: 'mc', prompt: 'How were the tribes of Israel to camp?', options: ['Each by its own standard, around the tent of meeting', 'All together in one big crowd', 'In a long line behind Moses', 'Each far away from the others'], explanation: '“Facing the tent of meeting on every side.”', ref: 'NUM 2:2' },
  { id: 'l12-q02', episode: E1, type: 'mc', prompt: 'What showed the people when to set out and when to camp?', options: ['The cloud over the tabernacle', 'The sound of thunder', 'A dream Moses had', 'The flight of the quail'], explanation: '“At the command of the LORD they encamped.”', ref: 'NUM 9:17-18' },
  { id: 'l12-q03', episode: E1, type: 'finish', text: 'The LORD bless you and ___ you', blanks: [['keep', 'count', 'test', 'send']], explanation: 'The blessing Aaron and his sons were to give.', ref: 'NUM 6:24' },
  {
    id: 'l12-q04',
    episode: E1,
    type: 'order',
    prompt: 'Put the lines of the priestly blessing in order.',
    items: ['The LORD bless you and keep you', 'The LORD make his face to shine upon you', 'and be gracious to you', 'The LORD lift up his countenance upon you', 'and give you peace'],
    explanation: 'Three blessings, each with the LORD’s name.',
    ref: 'NUM 6:24-26',
  },
  { id: 'l12-q05', episode: E1, type: 'tf', statement: 'At night, the cloud over the tabernacle looked like fire.', answer: true, explanation: '“The cloud covered it by day and the appearance of fire by night.”', ref: 'NUM 9:16' },
  {
    id: 'l12-q06',
    episode: E1,
    type: 'thread',
    from: 'Aaron lifts his hands and blesses the people',
    options: ['Jesus “lifting up his hands… blessed them.”', '“Would that all the LORD’s people were prophets.”', '“If any one thirst, let him come to me.”', '“We have seen his star in the East.”'],
    explanation: 'Jesus blessed his disciples as he went up to heaven.',
    ref: 'LUK 24:50',
  },
  // Episode 2 · Complaints and Quail
  { id: 'l12-q07', episode: E2, type: 'mc', prompt: 'What did the people say they missed from Egypt?', options: ['Fish, cucumbers, melons, leeks, onions and garlic', 'Their houses of stone', 'The music of Pharaoh’s court', 'Nothing at all'], explanation: '“We remember the fish we ate in Egypt for nothing.”', ref: 'NUM 11:5' },
  { id: 'l12-q08', episode: E2, type: 'who', quote: 'I am not able to carry all this people alone, the burden is too heavy for me.', options: ['Moses', 'Aaron', 'Joshua', 'Caleb'], explanation: 'God gave seventy elders to share the burden.', ref: 'NUM 11:14' },
  { id: 'l12-q09', episode: E2, type: 'mc', prompt: 'How many elders did God put his spirit on, to help Moses?', options: ['Seventy', 'Twelve', 'Seven', 'Forty'], explanation: 'They stood round about the tent.', ref: 'NUM 11:24-25' },
  { id: 'l12-q10', episode: E2, type: 'who', quote: 'My lord Moses, forbid them.', options: ['Joshua', 'Aaron', 'Eldad', 'Miriam'], explanation: 'Joshua wanted Moses to stop Eldad and Medad.', ref: 'NUM 11:28' },
  { id: 'l12-q11', episode: E2, type: 'finish', text: 'Would that all the LORD’s people were ___', blanks: [['prophets', 'kings', 'priests', 'giants']], explanation: 'Moses wanted God’s spirit to rest on everyone.', ref: 'NUM 11:29' },
  {
    id: 'l12-q12',
    episode: E2,
    type: 'thread',
    from: '“Would that all the LORD’s people were prophets”',
    options: ['“I will pour out my Spirit upon all flesh.”', '“The LORD bless you and keep you.”', '“I am the bright morning star.”', '“There remains a sabbath rest.”'],
    explanation: 'At Pentecost, the Spirit came on the whole Church.',
    ref: 'ACT 2:17',
  },
  // Episode 3 · The Twelve Spies
  { id: 'l12-q13', episode: E3, type: 'mc', prompt: 'How many spies did Moses send into Canaan?', options: ['Twelve, one from each tribe', 'Two', 'Seven', 'Seventy'], explanation: '“From each tribe of their fathers.”', ref: 'NUM 13:2' },
  { id: 'l12-q14', episode: E3, type: 'where', prompt: 'Which land did the spies explore?', targets: ['canaan', 'egypt', 'midian', 'edom'], answer: ['canaan'], explanation: '“Spy out the land of Canaan.”', ref: 'NUM 13:2' },
  { id: 'l12-q15', episode: E3, type: 'mc', prompt: 'What did the spies carry back on a pole between two of them?', options: ['A cluster of grapes', 'A giant’s sword', 'A golden idol', 'A sack of manna'], explanation: 'With pomegranates and figs.', ref: 'NUM 13:23' },
  { id: 'l12-q16', episode: E3, type: 'mc', prompt: 'Which two spies said the people should trust God and go in?', options: ['Joshua and Caleb', 'Moses and Aaron', 'Eldad and Medad', 'Korah and Dathan'], explanation: '“The LORD is with us; do not fear them.”', ref: 'NUM 14:6-9' },
  { id: 'l12-q17', episode: E3, type: 'finish', text: '…we seemed to ourselves like ___, and so we seemed to them.', blanks: [['grasshoppers', 'giants', 'lions', 'eagles']], explanation: 'The ten spies were afraid.', ref: 'NUM 13:33' },
  { id: 'l12-q18', episode: E3, type: 'tf', statement: 'Because they would not trust God, the people wandered in the wilderness forty years.', answer: true, explanation: '“For every day a year.”', ref: 'NUM 14:34' },
  // Episode 4 · Korah's Rebellion and Aaron's Rod
  { id: 'l12-q19', episode: E4, type: 'who', quote: 'You have gone too far!… why then do you exalt yourselves above the assembly of the LORD?', options: ['Korah and his company', 'Joshua and Caleb', 'Balak', 'The seventy elders'], explanation: 'They rose up against Moses and Aaron.', ref: 'NUM 16:3' },
  { id: 'l12-q20', episode: E4, type: 'mc', prompt: 'What did Aaron do when a plague broke out in the camp?', options: ['He ran into the crowd with incense, and stood between the dead and the living', 'He hid in the tent', 'He went back to Egypt', 'He struck the rock'], explanation: '“And the plague was stopped.”', ref: 'NUM 16:47-48' },
  { id: 'l12-q21', episode: E4, type: 'mc', prompt: 'How many rods were laid before the LORD in the tent?', options: ['Twelve, one for each tribe', 'Two', 'Seven', 'Seventy'], explanation: 'Aaron’s name was written on the rod of Levi.', ref: 'NUM 17:2-3' },
  { id: 'l12-q22', episode: E4, type: 'mc', prompt: 'What happened to Aaron’s rod overnight?', options: ['It sprouted, blossomed and bore ripe almonds', 'It turned into a serpent', 'It broke in two', 'It caught fire'], explanation: 'To show whom God had chosen.', ref: 'NUM 17:8' },
  { id: 'l12-q23', episode: E4, type: 'order', prompt: 'Put what happened to Aaron’s rod in order.', items: ['It sprouted', 'It put forth buds', 'It produced blossoms', 'It bore ripe almonds'], explanation: 'All in one night.', ref: 'NUM 17:8' },
  {
    id: 'l12-q24',
    episode: E4,
    type: 'thread',
    from: 'Aaron’s rod blossoms, to show whom God chose',
    options: ['“One does not take the honor upon himself, but he is called by God, just as Aaron was.”', '“If any one thirst, let him come to me.”', '“Christ became a curse for us.”', '“The LORD bless you and keep you.”'],
    explanation: 'So also Christ did not exalt himself.',
    ref: 'HEB 5:4-5',
  },
  // Episode 5 · Water at Meribah
  { id: 'l12-q25', episode: E5, type: 'mc', prompt: 'Who died at Kadesh, just before the people ran out of water?', options: ['Miriam', 'Aaron', 'Caleb', 'Jethro'], explanation: '“Miriam died there, and was buried there.”', ref: 'NUM 20:1' },
  { id: 'l12-q26', episode: E5, type: 'mc', prompt: 'What did God tell Moses to do to the rock?', options: ['Tell it to yield its water', 'Strike it seven times', 'Break it with a hammer', 'Pour oil on it'], explanation: '“Tell the rock before their eyes to yield its water.”', ref: 'NUM 20:8' },
  { id: 'l12-q27', episode: E5, type: 'tf', statement: 'Moses struck the rock twice, and water came out abundantly.', answer: true, explanation: '“The congregation drank, and their cattle.”', ref: 'NUM 20:11' },
  { id: 'l12-q28', episode: E5, type: 'mc', prompt: 'Why would Moses and Aaron not lead the people into the land?', options: ['They did not trust God and show his holiness before the people', 'They were too old to walk', 'They wanted to go back to Egypt', 'They lost the way'], explanation: '“Because you did not believe in me.”', ref: 'NUM 20:12' },
  { id: 'l12-q29', episode: E5, type: 'mc', prompt: 'Who became high priest when Aaron died on Mount Hor?', options: ['Eleazar, Aaron’s son', 'Joshua', 'Korah', 'Caleb'], explanation: 'Moses put Aaron’s garments on Eleazar.', ref: 'NUM 20:25-28' },
  {
    id: 'l12-q30',
    episode: E5,
    type: 'thread',
    from: 'Water flows from the rock for a thirsty people',
    options: ['“If any one thirst, let him come to me and drink.”', '“As Moses lifted up the serpent.”', '“We have seen his star in the East.”', '“I will pour out my Spirit.”'],
    explanation: 'Rivers of living water.',
    ref: 'JHN 7:37-38',
  },
  // Episode 6 · The Bronze Serpent
  { id: 'l12-q31', episode: E6, type: 'mc', prompt: 'Why did the people speak against God and Moses on the way around Edom?', options: ['They were impatient, and tired of the manna', 'They wanted to fight Edom', 'They missed Aaron', 'They had lost the cloud'], explanation: '“We loathe this worthless food.”', ref: 'NUM 21:4-5' },
  { id: 'l12-q32', episode: E6, type: 'who', quote: 'We have sinned, for we have spoken against the LORD and against you; pray to the LORD.', options: ['The people of Israel', 'Moses', 'Balak', 'The Edomites'], explanation: 'They asked Moses to pray for them.', ref: 'NUM 21:7' },
  { id: 'l12-q33', episode: E6, type: 'mc', prompt: 'What did Moses set up on a pole?', options: ['A serpent of bronze', 'A golden calf', 'Aaron’s rod', 'A cluster of grapes'], explanation: 'At God’s command.', ref: 'NUM 21:8-9' },
  { id: 'l12-q34', episode: E6, type: 'finish', text: '…if a serpent bit any man, he would ___ at the bronze serpent and live.', blanks: [['look', 'shout', 'point', 'run']], explanation: 'All they had to do was look.', ref: 'NUM 21:9' },
  { id: 'l12-q35', episode: E6, type: 'tf', statement: 'The bronze serpent itself had the power to heal.', answer: false, explanation: 'God healed them, as he had promised; the serpent was only a sign.', ref: 'NUM 21:8; WIS 16:7' },
  {
    id: 'l12-q36',
    episode: E6,
    type: 'thread',
    from: 'Moses lifts up the serpent in the wilderness',
    options: ['“So must the Son of man be lifted up.”', '“I am the bright morning star.”', '“There remains a sabbath rest.”', '“Would that all the LORD’s people were prophets.”'],
    explanation: 'Jesus lifted up on the cross.',
    ref: 'JHN 3:14',
  },
  // Episode 7 · Balaam and His Donkey
  { id: 'l12-q37', episode: E7, type: 'mc', prompt: 'What did Balak, king of Moab, want Balaam to do?', options: ['Curse the people of Israel', 'Bless his own army', 'Find water in the desert', 'Lead Israel into Canaan'], explanation: '“Come now, curse this people for me.”', ref: 'NUM 22:6' },
  { id: 'l12-q38', episode: E7, type: 'where', prompt: 'The people went around which land, on their way to the plains of Moab?', targets: ['edom', 'egypt', 'canaan', 'midian'], answer: ['edom'], explanation: 'Its king would not let them pass through.', ref: 'NUM 20:21; NUM 21:4' },
  { id: 'l12-q39', episode: E7, type: 'mc', prompt: 'Who first saw the angel of the LORD standing in the road?', options: ['Balaam’s donkey', 'Balaam', 'Balak', 'Balaam’s servants'], explanation: '“The ass saw the angel of the LORD standing in the road.”', ref: 'NUM 22:23' },
  { id: 'l12-q40', episode: E7, type: 'who', quote: 'What have I done to you, that you have struck me these three times?', options: ['Balaam’s donkey', 'Balak', 'The angel of the LORD', 'One of Balaam’s servants'], explanation: 'The LORD opened the mouth of the ass.', ref: 'NUM 22:28' },
  {
    id: 'l12-q41',
    episode: E7,
    type: 'order',
    prompt: 'Put the places where the donkey met the angel in order.',
    items: ['In the road, and she turned into the field', 'In a narrow path between vineyard walls', 'In a narrow place with no way to turn'],
    explanation: 'Three times the donkey saved Balaam.',
    ref: 'NUM 22:23-27',
  },
  {
    id: 'l12-q42',
    episode: E7,
    type: 'thread',
    from: '“You shall not curse the people, for they are blessed”',
    options: ['“Christ redeemed us from the curse… that the blessing of Abraham might come upon the Gentiles.”', '“If any one thirst, let him come to me.”', '“Where is he who has been born king of the Jews?”', '“The LORD bless you and keep you.”'],
    explanation: 'God turns curses into blessings.',
    ref: 'GAL 3:13-14',
  },
  // Episode 8 · A Star Out of Jacob
  { id: 'l12-q43', episode: E8, type: 'finish', text: 'How can I ___ whom God has not cursed?', blanks: [['curse', 'bless', 'count', 'find']], explanation: 'Balaam could only say what God told him.', ref: 'NUM 23:8' },
  { id: 'l12-q44', episode: E8, type: 'mc', prompt: 'How many times did Balaam bless Israel instead of cursing them?', options: ['Three times', 'Once', 'Seven times', 'Never'], explanation: '“You have blessed them these three times.”', ref: 'NUM 24:10' },
  { id: 'l12-q45', episode: E8, type: 'finish', text: 'How fair are your ___, O Jacob, your encampments, O Israel!', blanks: [['tents', 'cities', 'fields', 'kings']], explanation: 'Balaam saw Israel encamping tribe by tribe.', ref: 'NUM 24:5' },
  { id: 'l12-q46', episode: E8, type: 'tf', statement: 'Balaam said, “God is not man, that he should lie.”', answer: true, explanation: '“Has he said, and will he not do it?”', ref: 'NUM 23:19' },
  { id: 'l12-q47', episode: E8, type: 'mc', prompt: 'What did Balaam see coming forth out of Jacob?', options: ['A star, and a scepter rising out of Israel', 'A great army', 'A golden calf', 'A flood of water'], explanation: '“I see him, but not now.”', ref: 'NUM 24:17' },
  {
    id: 'l12-q48',
    episode: E8,
    type: 'thread',
    from: '“A star shall come forth out of Jacob”',
    options: ['The wise men: “We have seen his star in the East.”', '“So must the Son of man be lifted up.”', '“I will pour out my Spirit upon all flesh.”', '“There remains a sabbath rest.”'],
    explanation: 'They followed it to Bethlehem.',
    ref: 'MAT 2:2',
  },
]
