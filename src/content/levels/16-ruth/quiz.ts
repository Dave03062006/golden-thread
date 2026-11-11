import type { Question } from '../../../quiz/types'

/**
 * Level 16's quiz bank: the 40 questions of the approved Level 16 script ("Level 16 quiz
 * bank"), in its order. In each list of options, the first is the right one; the quiz
 * shuffles them. Every episode has eight questions.
 */

const E1 = 'l16-e1'
const E2 = 'l16-e2'
const E3 = 'l16-e3'
const E4 = 'l16-e4'
const E5 = 'l16-e5'

const JOY = 'Jesus: “your sorrow will turn into joy.”'
const STRANGERS = '“…you are no longer strangers and sojourners…”'
const WINGS = 'Jesus: “as a hen gathers her brood under her wings.”'
const FULNESS = '“…from his fulness have we all received…”'
const RANSOMED = '“…you were ransomed… with the precious blood of Christ…”'

export const level16Quiz: Question[] = [
  // Episode 1 · Naomi's Sorrow
  { id: 'l16-q01', episode: E1, type: 'mc', prompt: 'Why did Elimelech’s family leave Bethlehem?', options: ['There was a famine in the land', 'There was a war', 'The king sent them away', 'They were looking for gold'], explanation: 'A famine in the “house of bread.”', ref: 'RUT 1:1' },
  { id: 'l16-q02', episode: E1, type: 'where', prompt: 'Elimelech’s family went to Moab, on the far side of which sea?', targets: ['dead-sea', 'red-sea', 'egypt', 'canaan'], answer: ['dead-sea'], explanation: 'Moab is the high plateau east of the Dead Sea.', ref: 'RUT 1:1' },
  { id: 'l16-q03', episode: E1, type: 'mc', prompt: 'What were the names of Naomi’s two daughters-in-law?', options: ['Orpah and Ruth', 'Rachel and Leah', 'Deborah and Jael', 'Miriam and Zipporah'], explanation: 'Two Moabite women.', ref: 'RUT 1:4' },
  { id: 'l16-q04', episode: E1, type: 'tf', statement: 'Naomi lost her husband and both her sons in Moab.', answer: true, explanation: 'She was left alone with her daughters-in-law.', ref: 'RUT 1:3-5' },
  { id: 'l16-q05', episode: E1, type: 'mc', prompt: 'What news made Naomi set out for home?', options: ['That the LORD had visited his people and given them food', 'That her brother was king', 'That the Moabites were attacking', 'That her sons were alive'], explanation: 'The famine was over.', ref: 'RUT 1:6' },
  { id: 'l16-q06', episode: E1, type: 'finish', text: 'In the days when the ___ ruled there was a famine in the land…', blanks: [['judges', 'kings', 'priests', 'prophets']], explanation: 'The time of Level 15.', ref: 'RUT 1:1' },
  { id: 'l16-q07', episode: E1, type: 'mc', prompt: 'What does the name “Bethlehem” mean?', options: ['House of bread', 'City of David', 'Place of palms', 'Holy hill'], explanation: 'Which is why a famine there was so bitter.', ref: 'RUT 1:1' },
  { id: 'l16-q08', episode: E1, type: 'thread', from: 'Naomi’s sorrow, and the news that God has visited his people', options: [JOY, STRANGERS, WINGS, FULNESS], explanation: 'God does not waste our tears.', ref: 'JHN 16:20' },
  // Episode 2 · "Where You Go I Will Go"
  { id: 'l16-q09', episode: E2, type: 'mc', prompt: 'What did Orpah do when Naomi told them to go back?', options: ['She kissed Naomi and went back to her people', 'She went on to Bethlehem', 'She ran away in the night', 'She married a man of Judah'], explanation: 'Naomi did not blame her.', ref: 'RUT 1:14-15' },
  { id: 'l16-q10', episode: E2, type: 'who', quote: '…where you go I will go, and where you lodge I will lodge; your people shall be my people, and your God my God…', options: ['Ruth', 'Naomi', 'Orpah', 'Boaz'], explanation: 'Ruth’s promise to Naomi.', ref: 'RUT 1:16' },
  { id: 'l16-q11', episode: E2, type: 'finish', text: '…your people shall be my people, and your ___ my God…', blanks: [['God', 'home', 'land', 'king']], explanation: 'Ruth chose Naomi’s God.', ref: 'RUT 1:16' },
  {
    id: 'l16-q12',
    episode: E2,
    type: 'order',
    prompt: 'Put Ruth’s promise in order.',
    items: ['Where you go I will go', 'Where you lodge I will lodge', 'Your people shall be my people', 'Your God my God', 'Where you die I will die'],
    explanation: '“And there will I be buried.”',
    ref: 'RUT 1:16-17',
  },
  { id: 'l16-q13', episode: E2, type: 'mc', prompt: 'What did Naomi ask the women of Bethlehem to call her?', options: ['Mara, which means “bitter”', 'Ruth', 'Sarah', 'Hannah'], explanation: '“The Almighty has dealt very bitterly with me.”', ref: 'RUT 1:20' },
  { id: 'l16-q14', episode: E2, type: 'who', quote: 'I went away full, and the LORD has brought me back empty.', options: ['Naomi', 'Ruth', 'Orpah', 'Boaz'], explanation: 'To the women of Bethlehem.', ref: 'RUT 1:21' },
  { id: 'l16-q15', episode: E2, type: 'mc', prompt: 'When did Naomi and Ruth arrive in Bethlehem?', options: ['At the beginning of the barley harvest', 'In the middle of winter', 'At the feast of Tabernacles', 'During a famine'], explanation: 'Just in time to glean.', ref: 'RUT 1:22' },
  { id: 'l16-q16', episode: E2, type: 'thread', from: 'Ruth, a foreigner, chooses the people and the God of Israel', options: ['“…you are no longer strangers and sojourners, but you are fellow citizens with the saints and members of the household of God…”', JOY, RANSOMED, FULNESS], explanation: 'God’s family is open to every nation.', ref: 'EPH 2:19' },
  // Episode 3 · Gleaning in Boaz's Field
  { id: 'l16-q17', episode: E3, type: 'mc', prompt: 'What did Ruth do in the fields to find food?', options: ['She gleaned: she gathered the stalks the reapers left behind', 'She bought grain in the market', 'She reaped with a sickle', 'She baked bread for the workers'], explanation: 'As God’s law allowed the poor and the foreigner.', ref: 'RUT 2:2-3' },
  { id: 'l16-q18', episode: E3, type: 'who', quote: 'The LORD be with you!', options: ['Boaz, greeting his reapers', 'Naomi', 'Ruth', 'The foreman'], explanation: 'And they answered, “The LORD bless you.”', ref: 'RUT 2:4' },
  { id: 'l16-q19', episode: E3, type: 'tf', statement: 'Boaz told his young men to leave extra stalks on purpose for Ruth.', answer: true, explanation: '“Pull out some from the bundles for her.”', ref: 'RUT 2:16' },
  { id: 'l16-q20', episode: E3, type: 'mc', prompt: 'Why did Ruth ask, “Why have I found favor in your eyes?”', options: ['Because she was a foreigner', 'Because she was a queen', 'Because she had stolen grain', 'Because she was Boaz’s sister'], explanation: '“When I am a foreigner.”', ref: 'RUT 2:10' },
  { id: 'l16-q21', episode: E3, type: 'finish', text: '…the God of Israel, under whose ___ you have come to take refuge!', blanks: [['wings', 'roof', 'tent', 'shadow']], explanation: 'Boaz’s blessing on Ruth.', ref: 'RUT 2:12' },
  { id: 'l16-q22', episode: E3, type: 'mc', prompt: 'How much barley did Ruth gather in one day?', options: ['About an ephah, enough for weeks', 'A single handful', 'Seven sacks', 'A cartload'], explanation: 'About 20 to 25 liters.', ref: 'RUT 2:17' },
  { id: 'l16-q23', episode: E3, type: 'mc', prompt: 'Who was Boaz’s mother?', options: ['Rahab of Jericho', 'Sarah', 'Deborah', 'Miriam'], explanation: 'Matthew’s family tree says so.', ref: 'MAT 1:5' },
  { id: 'l16-q24', episode: E3, type: 'thread', from: '“Under whose wings you have come to take refuge”', options: [WINGS, STRANGERS, FULNESS, JOY], explanation: 'God shelters those who trust him.', ref: 'MAT 23:37' },
  // Episode 4 · The Threshing Floor
  { id: 'l16-q25', episode: E4, type: 'mc', prompt: 'What was Boaz doing at the threshing floor?', options: ['Winnowing barley', 'Building a house', 'Selling sheep', 'Guarding the city gate'], explanation: 'Separating the grain from the chaff.', ref: 'RUT 3:2' },
  { id: 'l16-q26', episode: E4, type: 'who', quote: 'All that you say I will do.', options: ['Ruth', 'Boaz', 'Naomi', 'Orpah'], explanation: 'To Naomi.', ref: 'RUT 3:5' },
  { id: 'l16-q27', episode: E4, type: 'mc', prompt: 'What did Ruth ask Boaz to do, as her next of kin?', options: ['To spread his cloak over her: to marry her and protect her family', 'To give her a field', 'To send her back to Moab', 'To make her a servant'], explanation: '“For you are next of kin.”', ref: 'RUT 3:9' },
  { id: 'l16-q28', episode: E4, type: 'tf', statement: 'Boaz was the nearest kinsman of all.', answer: false, explanation: '“There is a kinsman nearer than I.”', ref: 'RUT 3:12' },
  { id: 'l16-q29', episode: E4, type: 'finish', text: '…for all my fellow townsmen know that you are a woman of ___.', blanks: [['worth', 'Moab', 'faith', 'beauty']], explanation: 'Boaz’s words about Ruth.', ref: 'RUT 3:11' },
  { id: 'l16-q30', episode: E4, type: 'mc', prompt: 'What did Boaz give Ruth to take home?', options: ['Six measures of barley', 'A gold ring', 'A new cloak', 'A lamb'], explanation: '“You must not go back empty-handed.”', ref: 'RUT 3:15-17' },
  {
    id: 'l16-q31',
    episode: E4,
    type: 'order',
    prompt: 'Put the night at the threshing floor in order.',
    items: ['Naomi tells Ruth where Boaz will be', 'Ruth lies down at Boaz’s feet', 'At midnight Boaz wakes', 'Ruth asks him to spread his cloak over her', 'Boaz gives her six measures of barley'],
    explanation: 'And Naomi says, “Wait, my daughter.”',
    ref: 'RUT 3:1-18',
  },
  { id: 'l16-q32', episode: E4, type: 'thread', from: 'Ruth comes home not empty, but with her arms full of barley', options: ['“…from his fulness have we all received, grace upon grace.”', WINGS, RANSOMED, STRANGERS], explanation: 'No one who comes to Jesus goes home empty.', ref: 'JHN 1:16' },
  // Episode 5 · The Redeemer
  { id: 'l16-q33', episode: E5, type: 'mc', prompt: 'Where did Boaz settle the matter with the nearer kinsman?', options: ['At the town gate, before ten elders', 'In the Temple', 'In the field', 'At the threshing floor'], explanation: 'Where the town’s business was done.', ref: 'RUT 4:1-2' },
  { id: 'l16-q34', episode: E5, type: 'mc', prompt: 'How was the bargain sealed?', options: ['The kinsman took off his sandal and gave it to Boaz', 'They shook hands', 'They signed a scroll', 'They sacrificed a lamb'], explanation: '“This was the manner of attesting in Israel.”', ref: 'RUT 4:7-8' },
  { id: 'l16-q35', episode: E5, type: 'who', quote: 'I cannot redeem it for myself, lest I impair my own inheritance.', options: ['The nearer kinsman', 'Boaz', 'Naomi', 'Elimelech'], explanation: 'He would not risk what was his.', ref: 'RUT 4:6' },
  { id: 'l16-q36', episode: E5, type: 'tf', statement: 'Boaz redeemed Naomi’s land and married Ruth.', answer: true, explanation: '“You are witnesses this day.”', ref: 'RUT 4:9-10' },
  { id: 'l16-q37', episode: E5, type: 'mc', prompt: 'What was the name of the son of Boaz and Ruth?', options: ['Obed', 'Jesse', 'Perez', 'Samuel'], explanation: '“The father of Jesse, the father of David.”', ref: 'RUT 4:17' },
  { id: 'l16-q38', episode: E5, type: 'where', prompt: 'Ruth’s great-grandson David was born in her town. Tap it.', targets: ['bethlehem', 'bethel', 'hebron', 'jerusalem'], answer: ['bethlehem'], explanation: 'The house of bread.', ref: 'RUT 4:11; RUT 4:17' },
  { id: 'l16-q39', episode: E5, type: 'finish', text: '…Obed of ___, and Jesse of David.', blanks: [['Jesse', 'Boaz', 'Perez', 'Salmon']], explanation: 'The end of the book of Ruth.', ref: 'RUT 4:22' },
  { id: 'l16-q40', episode: E5, type: 'thread', from: 'Boaz the kinsman-redeemer buys back what was lost', options: ['“…you were ransomed… not with perishable things such as silver or gold… with the precious blood of Christ…”', FULNESS, WINGS, STRANGERS], explanation: 'Jesus is our Redeemer.', ref: '1PE 1:18-19' },
]
