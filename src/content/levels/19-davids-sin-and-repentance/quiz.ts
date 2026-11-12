import type { Question } from '../../../quiz/types'

/**
 * Level 19's quiz bank: the 42 questions of the approved Level 19 script ("Level 19 quiz
 * bank"), in its order. In each list of options, the first is the right one; the quiz
 * shuffles them. Episodes 1 to 4 have eight questions, and Episode 5 has ten.
 */

const [E1, E2, E3, E4, E5] = [1, 2, 3, 4, 5].map((n) => `l19-e${n}`) as [string, string, string, string, string]

const LIGHT = '“He who does what is true comes to the light.”'
const FORGIVE = '“If you forgive the sins of any, they are forgiven.”'
const NEW = '“If any one is in Christ, he is a new creation.”'
const KIDRON = 'Jesus “went forth with his disciples across the Kidron valley.”'
const BLOOD = '“You were ransomed… with the precious blood of Christ.”'
const ROOT = '“I am the root and the offspring of David.”'

export const level19Quiz: Question[] = [
  // Episode 1 · Bathsheba and Uriah
  { id: 'l19-q01', episode: E1, type: 'mc', prompt: 'Where was David in the spring, “the time when kings go forth to battle”?', options: ['He stayed in Jerusalem', 'He led the army at Rabbah', 'He was hiding in a cave', 'He was in Hebron'], explanation: '“But David remained at Jerusalem.”', ref: '2SA 11:1' },
  { id: 'l19-q02', episode: E1, type: 'mc', prompt: 'Who was Bathsheba’s husband?', options: ['Uriah the Hittite, one of David’s soldiers', 'Joab, the commander', 'Nathan the prophet', 'Absalom'], explanation: '“The wife of Uriah the Hittite.”', ref: '2SA 11:3' },
  { id: 'l19-q03', episode: E1, type: 'mc', prompt: 'When David sent Uriah home, where did Uriah sleep?', options: ['At the door of the king’s house, with the servants', 'In his own house', 'In the tent of the ark', 'In the open field'], explanation: 'He would not rest while his fellow soldiers were camping in the field.', ref: '2SA 11:9-11' },
  { id: 'l19-q04', episode: E1, type: 'who', quote: 'As you live, and as your soul lives, I will not do this thing.', options: ['Uriah', 'David', 'Joab', 'Nathan'], explanation: 'Uriah would not go home while the army camped in the field.', ref: '2SA 11:11' },
  { id: 'l19-q05', episode: E1, type: 'mc', prompt: 'Who carried David’s letter to Joab?', options: ['Uriah himself', 'A fast runner', 'Bathsheba', 'Nathan'], explanation: 'He did not know what it said.', ref: '2SA 11:14' },
  { id: 'l19-q06', episode: E1, type: 'finish', text: 'But the thing that David had done ___ the LORD.', blanks: [['displeased', 'pleased', 'surprised', 'delighted']], explanation: 'David thought no one knew, but God saw.', ref: '2SA 11:27' },
  { id: 'l19-q07', episode: E1, type: 'tf', statement: 'David’s sin stayed hidden, and no one ever found out.', answer: false, explanation: 'The LORD saw, and sent Nathan to him.', ref: '2SA 11:27; 2SA 12:1' },
  { id: 'l19-q08', episode: E1, type: 'thread', from: '“The thing that David had done displeased the LORD”', options: [LIGHT, FORGIVE, NEW, BLOOD], explanation: '“If we confess our sins, he is faithful and just, and will forgive.”', ref: 'JHN 3:21; 1JN 1:9' },
  // Episode 2 · Nathan's Parable
  { id: 'l19-q09', episode: E2, type: 'finish', text: 'but the poor man had nothing but one little ___ lamb, which he had bought.', blanks: [['ewe', 'black', 'lost', 'spotted']], explanation: 'It was like a daughter to him.', ref: '2SA 12:3' },
  { id: 'l19-q10', episode: E2, type: 'mc', prompt: 'In Nathan’s story, what did the rich man do?', options: ['Took the poor man’s lamb to feed his guest', 'Gave the poor man a flock', 'Bought the poor man’s field', 'Lost all his own sheep'], explanation: '“He was unwilling to take one of his own flock.”', ref: '2SA 12:4' },
  { id: 'l19-q11', episode: E2, type: 'mc', prompt: 'How did David feel when he heard Nathan’s story?', options: ['Angry with the rich man', 'Amused', 'Sorry for the traveler', 'Bored'], explanation: '“David’s anger was greatly kindled against the man.”', ref: '2SA 12:5' },
  { id: 'l19-q12', episode: E2, type: 'who', quote: 'You are the man.', options: ['Nathan', 'David', 'Joab', 'Samuel'], explanation: 'The rich man in the story was David.', ref: '2SA 12:7' },
  { id: 'l19-q13', episode: E2, type: 'finish', text: 'David said to Nathan, “I have ___ against the LORD.”', blanks: [['sinned', 'fought', 'spoken', 'prayed']], explanation: 'No excuses: David told the truth.', ref: '2SA 12:13' },
  { id: 'l19-q14', episode: E2, type: 'mc', prompt: 'What did Nathan say after David confessed?', options: ['“The LORD also has put away your sin.”', '“God will never forgive you.”', '“First you must offer a great sacrifice.”', '“You must leave Jerusalem.”'], explanation: 'God forgave David at once.', ref: '2SA 12:13' },
  {
    id: 'l19-q15',
    episode: E2,
    type: 'order',
    prompt: 'Put these in order.',
    items: ['Nathan tells of the rich man and the poor man', 'David grows angry with the rich man', 'Nathan says, “You are the man”', 'David says, “I have sinned against the LORD”'],
    explanation: 'Nathan’s story opened David’s eyes.',
    ref: '2SA 12:1-13',
  },
  { id: 'l19-q16', episode: E2, type: 'thread', from: 'Nathan tells David, “The LORD also has put away your sin”', options: [FORGIVE, LIGHT, KIDRON, ROOT], explanation: 'In Confession, a priest forgives sins in Jesus’ name.', ref: 'JHN 20:23' },
  // Episode 3 · "Have Mercy on Me, O God"
  { id: 'l19-q17', episode: E3, type: 'finish', text: 'Have mercy on me, O God, according to thy ___ love;', blanks: [['steadfast', 'great', 'endless', 'holy']], explanation: 'The first words of Psalm 51, the Miserere.', ref: 'PSA 51:1' },
  { id: 'l19-q18', episode: E3, type: 'finish', text: 'Purge me with hyssop, and I shall be clean; wash me, and I shall be whiter than ___.', blanks: [['snow', 'wool', 'milk', 'clouds']], explanation: 'Only God can make us completely clean.', ref: 'PSA 51:7' },
  { id: 'l19-q19', episode: E3, type: 'finish', text: 'Create in me a clean ___, O God, and put a new and right spirit within me.', blanks: [['heart', 'mind', 'robe', 'house']], explanation: 'David asked for more than forgiveness: a new heart.', ref: 'PSA 51:10' },
  { id: 'l19-q20', episode: E3, type: 'mc', prompt: 'What does Psalm 51 say God wants more than burnt offerings?', options: ['A broken and contrite heart', 'Fifty shekels of silver', 'A golden altar', 'A great feast'], explanation: '“A broken and contrite heart, O God, thou wilt not despise.”', ref: 'PSA 51:16-17' },
  { id: 'l19-q21', episode: E3, type: 'mc', prompt: 'What did David do while his baby son was ill?', options: ['He fasted and lay all night upon the ground, praying', 'He went to war', 'He held a feast', 'He went away to Hebron'], explanation: '“David therefore besought God for the child.”', ref: '2SA 12:16' },
  { id: 'l19-q22', episode: E3, type: 'mc', prompt: 'What name did God send through Nathan for baby Solomon?', options: ['Jedidiah, “beloved of the LORD”', 'Ichabod', 'Ebenezer', 'Obed'], explanation: '“And the LORD loved him.”', ref: '2SA 12:24-25' },
  { id: 'l19-q23', episode: E3, type: 'tf', statement: 'Psalm 51 is the prayer of David after Nathan came to him.', answer: true, explanation: 'Its title says so.', ref: 'PSA 51:1' },
  { id: 'l19-q24', episode: E3, type: 'thread', from: '“Create in me a clean heart, O God”', options: [NEW, FORGIVE, ROOT, LIGHT], explanation: 'In Baptism, God makes us new.', ref: '2CO 5:17' },
  // Episode 4 · Absalom's Rebellion
  { id: 'l19-q25', episode: E4, type: 'mc', prompt: 'How did Absalom win the hearts of the people?', options: ['He met them at the city gate, promised them justice, and kissed them', 'He gave them gold', 'He worked miracles', 'He won a great battle'], explanation: '“So Absalom stole the hearts of the men of Israel.”', ref: '2SA 15:2-6' },
  { id: 'l19-q26', episode: E4, type: 'who', quote: '…wherever my lord the king shall be, whether for death or for life, there also will your servant be.', options: ['Ittai the Gittite', 'Uriah', 'Ruth', 'Jonathan'], explanation: 'A foreigner who stayed loyal to David.', ref: '2SA 15:21' },
  { id: 'l19-q27', episode: E4, type: 'mc', prompt: 'What did David tell Zadok to do with the ark of God?', options: ['Carry it back into the city', 'Bring it with them', 'Hide it in a cave', 'Give it to Absalom'], explanation: '“If I find favor in the eyes of the LORD, he will bring me back.”', ref: '2SA 15:25' },
  { id: 'l19-q28', episode: E4, type: 'finish', text: 'But David went up the ascent of the Mount of ___, weeping as he went,', blanks: [['Olives', 'Sinai', 'Carmel', 'Zion']], explanation: 'Barefoot and with his head covered.', ref: '2SA 15:30' },
  { id: 'l19-q29', episode: E4, type: 'where', prompt: 'David fled across the Jordan to the town where Jacob once saw the angels of God. Tap it.', targets: ['mahanaim', 'jerusalem', 'hebron', 'shechem'], answer: ['mahanaim'], explanation: 'David’s army gathered there.', ref: '2SA 17:24' },
  { id: 'l19-q30', episode: E4, type: 'mc', prompt: 'What did David order his commanders about Absalom?', options: ['“Deal gently for my sake with the young man Absalom.”', '“Bring him to me in chains.”', '“Show him no mercy.”', '“Send him back to Hebron.”'], explanation: 'David still loved his son.', ref: '2SA 18:5' },
  { id: 'l19-q31', episode: E4, type: 'who', quote: 'O my son Absalom, my son, my son Absalom!', options: ['David', 'Joab', 'Ahithophel', 'Nathan'], explanation: '“Would I had died instead of you.”', ref: '2SA 18:33' },
  { id: 'l19-q32', episode: E4, type: 'thread', from: 'David, betrayed, crosses the brook Kidron weeping', options: [KIDRON, NEW, FORGIVE, BLOOD], explanation: 'The Son of David walked the same road on the night he was betrayed.', ref: 'JHN 18:1' },
  // Episode 5 · David's Last Words
  { id: 'l19-q33', episode: E5, type: 'finish', text: 'The LORD is my rock, and my fortress, and my ___,', blanks: [['deliverer', 'shepherd', 'light', 'king']], explanation: 'David’s song when God saved him from all his enemies.', ref: '2SA 22:2' },
  { id: 'l19-q34', episode: E5, type: 'finish', text: 'Yea, thou art my ___, O LORD, and my God lightens my darkness.', blanks: [['lamp', 'shield', 'song', 'sun']], explanation: 'God was David’s light, even in the dark.', ref: '2SA 22:29' },
  { id: 'l19-q35', episode: E5, type: 'mc', prompt: 'In his last words, what does David call himself?', options: ['“The sweet psalmist of Israel”', '“The greatest of the kings”', '“The prophet of the LORD”', '“The son of Saul”'], explanation: 'About half the Psalms are called “of David.”', ref: '2SA 23:1' },
  { id: 'l19-q36', episode: E5, type: 'tf', statement: 'After he had the people counted, David said, “I have sinned greatly in what I have done.”', answer: true, explanation: 'His heart troubled him.', ref: '2SA 24:10' },
  { id: 'l19-q37', episode: E5, type: 'mc', prompt: 'Where did the angel stop, when God said, “It is enough”?', options: ['By the threshing floor of Araunah', 'At the city gate', 'At the Jordan', 'At Bethlehem'], explanation: 'There David built an altar.', ref: '2SA 24:16' },
  { id: 'l19-q38', episode: E5, type: 'who', quote: 'I will not offer burnt offerings to the LORD my God which cost me nothing.', options: ['David', 'Araunah', 'Gad', 'Solomon'], explanation: 'He paid fifty shekels of silver.', ref: '2SA 24:24' },
  { id: 'l19-q39', episode: E5, type: 'mc', prompt: 'What was later built on Araunah’s threshing floor?', options: ['Solomon’s Temple', 'David’s palace', 'A great tower', 'The city wall'], explanation: '“On Mount Moriah… on the threshing floor.”', ref: '2CH 3:1' },
  { id: 'l19-q40', episode: E5, type: 'thread', from: '“I will not offer… which cost me nothing”', options: [BLOOD, LIGHT, FORGIVE, NEW], explanation: 'The greatest sacrifice cost God his only Son.', ref: '1PE 1:18-19' },
  {
    id: 'l19-q41',
    episode: E5,
    type: 'order',
    prompt: 'Put these in order.',
    items: ['David takes Uriah’s wife', 'Nathan says, “You are the man”', 'Solomon is born', 'Absalom steals the hearts of Israel', 'David builds an altar on the threshing floor'],
    explanation: 'The story of Level 19.',
    ref: '2SA 11:1-24:25',
  },
  { id: 'l19-q42', episode: E5, type: 'mc', prompt: 'Which woman of this level is named in Jesus’ family tree in the Gospel of Matthew?', options: ['Bathsheba, “the wife of Uriah”', 'Orpah', 'Michal', 'Abigail'], explanation: 'God’s grace was at work even in David’s sin.', ref: 'MAT 1:6' },
]
