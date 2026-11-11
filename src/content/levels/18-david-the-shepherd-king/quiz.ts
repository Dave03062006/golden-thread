import type { Question } from '../../../quiz/types'

/**
 * Level 18's quiz bank: the 48 questions of the approved Level 18 script ("Level 18 quiz
 * bank"), in its order. In each list of options, the first is the right one; the quiz
 * shuffles them. Every episode has six questions.
 */

const [E1, E2, E3, E4, E5, E6, E7, E8] = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => `l18-e${n}`) as [string, string, string, string, string, string, string, string]

const SHEPHERD = 'Jesus: “I am the good shepherd.”'
const VICTORY = '“Thanks be to God, who gives us the victory through our Lord Jesus Christ.”'
const INCREASE = 'John the Baptist: “He must increase, but I must decrease.”'
const ENEMIES = 'Jesus: “Love your enemies and pray for those who persecute you.”'
const ZION = '“You have come to Mount Zion and to the city of the living God, the heavenly Jerusalem.”'
const HOSANNA = '“Hosanna to the Son of David!”'
const BREAD = 'Jesus: “Have you not read what David did, when he was hungry?”'
const MARY = 'Mary, carrying Jesus, stays three months with Elizabeth, and John leaps for joy.'

export const level18Quiz: Question[] = [
  // Episode 1 · The Shepherd Boy Anointed
  { id: 'l18-q01', episode: E1, type: 'finish', text: '…man looks on the outward appearance, but the LORD looks on the ___.', blanks: [['heart', 'face', 'hands', 'crown']], explanation: 'God’s words to Samuel.', ref: '1SA 16:7' },
  { id: 'l18-q02', episode: E1, type: 'mc', prompt: 'Which of Jesse’s sons did Samuel first think must be the LORD’s anointed?', options: ['Eliab, the eldest, who was tall', 'David', 'Jonathan', 'Shammah'], explanation: '“Do not look on his appearance.”', ref: '1SA 16:6-7' },
  { id: 'l18-q03', episode: E1, type: 'mc', prompt: 'Where was David when Samuel came to anoint him?', options: ['Out keeping the sheep', 'Asleep in the house', 'At the king’s court', 'Fighting the Philistines'], explanation: '“There remains yet the youngest.”', ref: '1SA 16:11' },
  { id: 'l18-q04', episode: E1, type: 'tf', statement: 'After David was anointed, the Spirit of the LORD came mightily upon him.', answer: true, explanation: '“From that day forward.”', ref: '1SA 16:13' },
  { id: 'l18-q05', episode: E1, type: 'mc', prompt: 'How did David help King Saul when he was troubled?', options: ['He played the lyre for him', 'He gave him medicine', 'He told him stories', 'He fought for him'], explanation: '“So Saul was refreshed.”', ref: '1SA 16:23' },
  { id: 'l18-q06', episode: E1, type: 'thread', from: 'The shepherd boy of Bethlehem, anointed to shepherd God’s people', options: [SHEPHERD, VICTORY, INCREASE, ENEMIES], explanation: 'The Good Shepherd lays down his life for the sheep.', ref: 'JHN 10:11' },
  // Episode 2 · David and Goliath
  { id: 'l18-q07', episode: E2, type: 'mc', prompt: 'Where was Goliath from?', options: ['Gath, a Philistine city', 'Egypt', 'Jericho', 'Moab'], explanation: '“A champion named Goliath, of Gath.”', ref: '1SA 17:4' },
  { id: 'l18-q08', episode: E2, type: 'mc', prompt: 'Why didn’t David wear Saul’s armor?', options: ['He wasn’t used to it and couldn’t walk in it', 'It was too small', 'Saul wouldn’t lend it', 'It was broken'], explanation: 'He went with what he knew: a staff and a sling.', ref: '1SA 17:38-40' },
  { id: 'l18-q09', episode: E2, type: 'mc', prompt: 'How many smooth stones did David choose from the brook?', options: ['Five', 'One', 'Seven', 'Twelve'], explanation: '“And put them in his shepherd’s bag.”', ref: '1SA 17:40' },
  { id: 'l18-q10', episode: E2, type: 'finish', text: '…for the battle is the ___’s and he will give you into our hand.', blanks: [['LORD', 'king', 'army', 'giant']], explanation: 'David to Goliath.', ref: '1SA 17:47' },
  {
    id: 'l18-q11',
    episode: E2,
    type: 'order',
    prompt: 'Put the story of David and Goliath in order.',
    items: ['Goliath challenges Israel for forty days', 'David brings food to his brothers', 'David tells Saul he will fight', 'David chooses five smooth stones', 'Goliath falls'],
    explanation: '“There was no sword in the hand of David.”',
    ref: '1SA 17:1-51',
  },
  { id: 'l18-q12', episode: E2, type: 'thread', from: '“The battle is the LORD’s”', options: [VICTORY, SHEPHERD, ZION, HOSANNA], explanation: 'Christ’s victory over sin and death.', ref: '1CO 15:57' },
  // Episode 3 · Jonathan's Friendship
  { id: 'l18-q13', episode: E3, type: 'finish', text: '…the soul of Jonathan was knit to the soul of David, and Jonathan loved him as his own ___.', blanks: [['soul', 'brother', 'son', 'king']], explanation: 'A covenant of friendship.', ref: '1SA 18:1' },
  { id: 'l18-q14', episode: E3, type: 'mc', prompt: 'What did Jonathan give David?', options: ['His robe, his armor, his sword, his bow and his belt', 'A crown', 'A field', 'A horse'], explanation: 'Everything a prince would wear.', ref: '1SA 18:4' },
  { id: 'l18-q15', episode: E3, type: 'mc', prompt: 'Why did Saul become jealous of David?', options: ['The women sang that David had slain ten thousands, and Saul only thousands', 'David took his crown', 'David married his daughter', 'David stole from him'], explanation: '“Saul eyed David from that day on.”', ref: '1SA 18:7-9' },
  { id: 'l18-q16', episode: E3, type: 'mc', prompt: 'What was Jonathan’s secret sign that David must flee?', options: ['An arrow shot beyond the boy', 'A trumpet blast', 'A fire on the hill', 'A song'], explanation: '“Is not the arrow beyond you?”', ref: '1SA 20:37' },
  { id: 'l18-q17', episode: E3, type: 'tf', statement: 'Jonathan knew David would be king instead of him, and was glad.', answer: true, explanation: '“You shall be king over Israel, and I shall be next to you.”', ref: '1SA 23:17' },
  { id: 'l18-q18', episode: E3, type: 'thread', from: 'Jonathan gives up his place to David', options: [INCREASE, ENEMIES, SHEPHERD, VICTORY], explanation: 'True friends of God are glad when another is lifted up.', ref: 'JHN 3:30' },
  // Episode 4 · On the Run from Saul
  { id: 'l18-q19', episode: E4, type: 'mc', prompt: 'What bread did the priest at Nob give David?', options: ['The holy bread of the Presence', 'Manna', 'Barley loaves from Bethlehem', 'Unleavened bread of the Passover'], explanation: 'There was no other bread there.', ref: '1SA 21:6' },
  { id: 'l18-q20', episode: E4, type: 'mc', prompt: 'Who gathered to David at the cave of Adullam?', options: ['His family, and everyone in distress, in debt or discontented', 'Saul’s army', 'The Philistine lords', 'The priests of Nob'], explanation: 'About four hundred men.', ref: '1SA 22:1-2' },
  { id: 'l18-q21', episode: E4, type: 'tf', statement: 'Saul searched for David every day, but God did not give David into his hand.', answer: true, explanation: 'In the wilderness of Ziph.', ref: '1SA 23:14' },
  { id: 'l18-q22', episode: E4, type: 'who', quote: 'Fear not; for the hand of Saul my father shall not find you; you shall be king over Israel…', options: ['Jonathan', 'Samuel', 'Abishai', 'Saul'], explanation: 'He “strengthened his hand in God.”', ref: '1SA 23:16-17' },
  { id: 'l18-q23', episode: E4, type: 'who', quote: 'Have you not read what David did, when he was hungry, and those who were with him…', options: ['Jesus', 'Samuel', 'Nathan', 'Peter'], explanation: 'Jesus used David’s story to teach about mercy.', ref: 'MAT 12:3' },
  { id: 'l18-q24', episode: E4, type: 'thread', from: 'David eats the holy bread of the Presence', options: [BREAD, ZION, INCREASE, HOSANNA], explanation: 'Mercy comes first.', ref: 'MAT 12:3-4' },
  // Episode 5 · Sparing the LORD's Anointed
  { id: 'l18-q25', episode: E5, type: 'mc', prompt: 'What did David cut off in the cave at En-gedi?', options: ['The corner of Saul’s robe', 'Saul’s hair', 'Saul’s spear', 'A piece of Saul’s crown'], explanation: 'Even that troubled his conscience.', ref: '1SA 24:4-5; 1SA 24:11' },
  { id: 'l18-q26', episode: E5, type: 'finish', text: '…I will not put forth my hand against my lord; for he is the LORD’s ___.', blanks: [['anointed', 'servant', 'king', 'son']], explanation: 'Why David spared Saul.', ref: '1SA 24:10' },
  { id: 'l18-q27', episode: E5, type: 'who', quote: 'Is this your voice, my son David?', options: ['Saul', 'Jonathan', 'Samuel', 'Jesse'], explanation: 'And Saul lifted up his voice and wept.', ref: '1SA 24:16' },
  { id: 'l18-q28', episode: E5, type: 'mc', prompt: 'What did David take from beside the sleeping Saul’s head?', options: ['His spear and his jar of water', 'His crown and his robe', 'His sword and his shield', 'His bread'], explanation: 'Then he called across from the far hill.', ref: '1SA 26:12' },
  { id: 'l18-q29', episode: E5, type: 'tf', statement: 'Abishai wanted to kill Saul in his sleep, and David let him.', answer: false, explanation: '“Do not destroy him.”', ref: '1SA 26:9' },
  { id: 'l18-q30', episode: E5, type: 'thread', from: 'David spares the king who is hunting him', options: [ENEMIES, VICTORY, SHEPHERD, ZION], explanation: 'Leaving judgment to God.', ref: 'MAT 5:44' },
  // Episode 6 · King in Jerusalem
  { id: 'l18-q31', episode: E6, type: 'finish', text: 'Thy glory, O Israel, is slain upon thy high places! How are the mighty ___!', blanks: [['fallen', 'honored', 'gathered', 'crowned']], explanation: 'David’s lament for Saul and Jonathan.', ref: '2SA 1:19' },
  { id: 'l18-q32', episode: E6, type: 'mc', prompt: 'Where was David first anointed king, over the house of Judah?', options: ['Hebron', 'Jerusalem', 'Bethlehem', 'Shiloh'], explanation: 'Abraham’s old city.', ref: '2SA 2:4' },
  { id: 'l18-q33', episode: E6, type: 'where', prompt: 'David first reigned as king at Hebron. Tap it.', targets: ['hebron', 'jerusalem', 'bethlehem', 'beersheba'], answer: ['hebron'], explanation: 'For seven and a half years.', ref: '2SA 2:11' },
  { id: 'l18-q34', episode: E6, type: 'mc', prompt: 'How old was David when he began to reign?', options: ['Thirty', 'Fifteen', 'Twenty', 'Fifty'], explanation: '“And he reigned forty years.”', ref: '2SA 5:4' },
  {
    id: 'l18-q35',
    episode: E6,
    type: 'order',
    prompt: 'Put David’s road to the throne in order.',
    items: ['Anointed by Samuel at Bethlehem', 'Goliath falls', 'Years on the run from Saul', 'King of Judah at Hebron', 'Takes Jerusalem'],
    explanation: '“David became greater and greater.”',
    ref: '1SA 16:1-13; 2SA 5:1-10',
  },
  { id: 'l18-q36', episode: E6, type: 'thread', from: 'David takes the stronghold of Zion, the city of David', options: [ZION, HOSANNA, ENEMIES, INCREASE], explanation: 'The heavenly city where Jesus reigns.', ref: 'HEB 12:22' },
  // Episode 7 · David Dances Before the Ark
  { id: 'l18-q37', episode: E7, type: 'mc', prompt: 'How long did the ark stay in the house of Obed-edom?', options: ['Three months', 'Seven days', 'Forty years', 'One night'], explanation: 'And the LORD blessed his household.', ref: '2SA 6:11' },
  { id: 'l18-q38', episode: E7, type: 'finish', text: 'And David ___ before the LORD with all his might…', blanks: [['danced', 'prayed', 'fought', 'sang']], explanation: 'Wearing a linen ephod.', ref: '2SA 6:14' },
  { id: 'l18-q39', episode: E7, type: 'mc', prompt: 'Who watched David from a window and despised him?', options: ['Michal, Saul’s daughter', 'Bathsheba', 'Abigail', 'Jonathan'], explanation: '“She despised him in her heart.”', ref: '2SA 6:16' },
  { id: 'l18-q40', episode: E7, type: 'tf', statement: 'The second time, the ark was carried on poles by the Levites, the way God’s law said.', answer: true, explanation: 'Not on a cart, as before.', ref: '1CH 15:15' },
  { id: 'l18-q41', episode: E7, type: 'who', quote: 'How can the ark of the LORD come to me?', options: ['David', 'Uzzah', 'Obed-edom', 'Michal'], explanation: 'Afraid after Uzzah died.', ref: '2SA 6:9' },
  { id: 'l18-q42', episode: E7, type: 'thread', from: 'The ark stays three months, and David leaps for joy before it', options: [MARY, HOSANNA, ZION, ENEMIES], explanation: 'Mary, the Ark of the Covenant.', ref: 'LUK 1:41-44; LUK 1:56' },
  // Episode 8 · God's Covenant with David
  { id: 'l18-q43', episode: E8, type: 'mc', prompt: 'Why did David want to build a house for God?', options: ['He lived in a house of cedar, but the ark was in a tent', 'The tent had burned down', 'Samuel told him to', 'The Philistines had taken the tent'], explanation: 'What he said to Nathan.', ref: '2SA 7:2' },
  { id: 'l18-q44', episode: E8, type: 'who', quote: 'See now, I dwell in a house of cedar, but the ark of God dwells in a tent.', options: ['David', 'Nathan', 'Solomon', 'Samuel'], explanation: 'To the prophet Nathan.', ref: '2SA 7:2' },
  { id: 'l18-q45', episode: E8, type: 'mc', prompt: 'Instead, what did God promise to build for David?', options: ['A “house”: a family of kings, with a throne for ever', 'A golden palace', 'A city wall', 'A great army'], explanation: '“The LORD will make you a house.”', ref: '2SA 7:11' },
  { id: 'l18-q46', episode: E8, type: 'finish', text: 'And your house and your kingdom shall be made sure for ever before me; your ___ shall be established for ever.', blanks: [['throne', 'city', 'name', 'army']], explanation: 'God’s covenant with David.', ref: '2SA 7:16' },
  {
    id: 'l18-q47',
    episode: E8,
    type: 'order',
    prompt: 'Put God’s promise to David in order.',
    items: ['I will raise up your offspring after you', 'He shall build a house for my name', 'I will establish the throne of his kingdom for ever', 'I will be his father, and he shall be my son'],
    explanation: '“Your throne shall be established for ever.”',
    ref: '2SA 7:12-14',
  },
  { id: 'l18-q48', episode: E8, type: 'thread', from: '“Your throne shall be established for ever”', options: [HOSANNA, ZION, SHEPHERD, MARY], explanation: 'The King whose throne lasts for ever.', ref: 'MAT 1:1; MAT 21:9' },
]
