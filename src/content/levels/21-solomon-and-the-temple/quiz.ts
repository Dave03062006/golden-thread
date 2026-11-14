import type { Question } from '../../../quiz/types'

/**
 * Level 21's quiz bank: the 48 questions of the approved Level 21 script ("Level 21 quiz
 * bank"), in its order. In each list of options, the first is the right one; the quiz
 * shuffles them. Every episode has eight questions.
 */

const [E1, E2, E3, E4, E5, E6] = [1, 2, 3, 4, 5, 6].map((n) => `l21-e${n}`) as [string, string, string, string, string, string]

const ASK = '“If any of you lacks wisdom, let him ask God.”'
const WISDOM = '“Christ the power of God and the wisdom of God.”'
const STONES = '“Like living stones be yourselves built into a spiritual house.”'
const DWELLING = '“Behold, the dwelling of God is with men.”'
const GREATER = 'Jesus: “Something greater than Solomon is here.”'
const MASTERS = 'Jesus: “No one can serve two masters.”'

export const level21Quiz: Question[] = [
  // Episode 1 · Solomon Asks for Wisdom
  { id: 'l21-q01', episode: E1, type: 'mc', prompt: 'Who were Solomon’s parents?', options: ['King David and Bathsheba', 'Saul and Michal', 'Boaz and Ruth', 'Jesse and his wife'], explanation: 'Level 19 told how they met.', ref: '1KI 1:28-30' },
  { id: 'l21-q02', episode: E1, type: 'who', quote: 'Long live King Solomon!', options: ['All the people, at Gihon', 'Saul', 'Goliath', 'The Queen of Sheba'], explanation: 'After Zadok anointed him.', ref: '1KI 1:39' },
  { id: 'l21-q03', episode: E1, type: 'mc', prompt: 'Who anointed Solomon king?', options: ['Zadok the priest', 'Samuel', 'Nathan’s son', 'Elijah'], explanation: 'With the horn of oil from the tent.', ref: '1KI 1:39' },
  { id: 'l21-q04', episode: E1, type: 'finish', text: 'Be strong, and show yourself a ___,', blanks: [['man', 'king', 'soldier', 'giant']], explanation: 'David’s last charge to Solomon.', ref: '1KI 2:2' },
  { id: 'l21-q05', episode: E1, type: 'finish', text: 'At Gibeon the LORD appeared to Solomon in a dream by night; and God said, “Ask what I shall ___ you.”', blanks: [['give', 'teach', 'show', 'take from']], explanation: 'God’s question to the young king.', ref: '1KI 3:5' },
  { id: 'l21-q06', episode: E1, type: 'mc', prompt: 'What did Solomon ask God for?', options: ['An understanding mind, to govern God’s people', 'Long life', 'Riches', 'Victory over his enemies'], explanation: '“That I may discern between good and evil.”', ref: '1KI 3:9' },
  { id: 'l21-q07', episode: E1, type: 'tf', statement: 'Because Solomon asked for wisdom, God gave him riches and honor too.', answer: true, explanation: '“I give you also what you have not asked.”', ref: '1KI 3:13' },
  { id: 'l21-q08', episode: E1, type: 'thread', from: 'Solomon asks God for “an understanding mind”', options: [ASK, WISDOM, STONES, MASTERS], explanation: 'God gives wisdom generously.', ref: 'JAS 1:5' },
  // Episode 2 · The Two Mothers
  { id: 'l21-q09', episode: E2, type: 'mc', prompt: 'What did the two women argue about?', options: ['Which of them was the mother of the living baby', 'Who owned the house', 'Who was the older', 'Who should be queen'], explanation: '“No, the living child is mine.”', ref: '1KI 3:22' },
  { id: 'l21-q10', episode: E2, type: 'mc', prompt: 'What did Solomon call for?', options: ['A sword', 'A scroll', 'A priest', 'A soldier'], explanation: '“Bring me a sword.”', ref: '1KI 3:24' },
  { id: 'l21-q11', episode: E2, type: 'tf', statement: 'Solomon really meant to divide the child in two.', answer: false, explanation: 'It was a test, to find the true mother’s heart.', ref: '1KI 3:25-27' },
  { id: 'l21-q12', episode: E2, type: 'who', quote: 'Oh, my lord, give her the living child, and by no means slay it.', options: ['The true mother', 'The other woman', 'The guard', 'Solomon'], explanation: '“Her heart yearned for her son.”', ref: '1KI 3:26' },
  { id: 'l21-q13', episode: E2, type: 'order', prompt: 'Put the story in order.', items: ['Two women come to the king', 'Solomon calls for a sword', 'The true mother cries out', 'Solomon gives her the living child'], explanation: '“She is its mother.”', ref: '1KI 3:16-27' },
  { id: 'l21-q14', episode: E2, type: 'finish', text: 'because they perceived that the ___ of God was in him, to render justice.', blanks: [['wisdom', 'spirit', 'fear', 'glory']], explanation: 'All Israel stood in awe of the king.', ref: '1KI 3:28' },
  { id: 'l21-q15', episode: E2, type: 'mc', prompt: 'How many proverbs did Solomon speak?', options: ['Three thousand', 'Ten', 'A hundred and fifty', 'Forty'], explanation: '“And his songs were a thousand and five.”', ref: '1KI 4:32' },
  { id: 'l21-q16', episode: E2, type: 'thread', from: '“The wisdom of God was in him, to render justice”', options: [WISDOM, ASK, DWELLING, GREATER], explanation: 'Jesus is God’s wisdom in person.', ref: '1CO 1:24' },
  // Episode 3 · Building the Temple
  { id: 'l21-q17', episode: E3, type: 'mc', prompt: 'Why didn’t David build the Temple himself?', options: ['God promised that his son would build it', 'He had no money', 'He forgot', 'The priests refused'], explanation: '“Your son… shall build the house for my name.”', ref: '1KI 5:5' },
  { id: 'l21-q18', episode: E3, type: 'mc', prompt: 'Where did the cedar wood for the Temple come from?', options: ['Lebanon', 'Egypt', 'Moab', 'Sheba'], explanation: 'Sent by Hiram, king of Tyre.', ref: '1KI 5:6' },
  { id: 'l21-q19', episode: E3, type: 'where', prompt: 'On which hill was the Temple built, where Abraham had once been ready to offer Isaac? Tap it.', targets: ['jerusalem', 'bethel', 'hebron', 'shechem'], answer: ['jerusalem'], explanation: 'On the threshing floor David bought.', ref: '2CH 3:1' },
  { id: 'l21-q20', episode: E3, type: 'finish', text: 'so that neither ___ nor axe nor any tool of iron was heard in the temple, while it was being built.', blanks: [['hammer', 'song', 'saw', 'voice']], explanation: 'The stones were prepared at the quarry.', ref: '1KI 6:7' },
  { id: 'l21-q21', episode: E3, type: 'finish', text: 'And I will ___ among the children of Israel, and will not forsake my people Israel.', blanks: [['dwell', 'rule', 'fight', 'sleep']], explanation: 'God’s promise about his house.', ref: '1KI 6:13' },
  { id: 'l21-q22', episode: E3, type: 'mc', prompt: 'What was the inside of the Temple covered with?', options: ['Pure gold', 'Silver', 'Bronze', 'Painted plaster'], explanation: '“He overlaid the whole house with gold.”', ref: '1KI 6:22' },
  { id: 'l21-q23', episode: E3, type: 'mc', prompt: 'How long did it take to build the Temple?', options: ['Seven years', 'Forty days', 'Forty years', 'One year'], explanation: 'Finished in the eleventh year of Solomon’s reign.', ref: '1KI 6:38' },
  { id: 'l21-q24', episode: E3, type: 'thread', from: 'Stones prepared at the quarry, built into the house of the LORD', options: [STONES, DWELLING, MASTERS, ASK], explanation: 'Christians are God’s house.', ref: '1PE 2:5' },
  // Episode 4 · The Glory Fills the House
  { id: 'l21-q25', episode: E4, type: 'mc', prompt: 'Where did the priests put the ark?', options: ['In the Most Holy Place, under the wings of the cherubim', 'In Solomon’s palace', 'In the courtyard', 'On the altar'], explanation: '“To its place, in the inner sanctuary of the house.”', ref: '1KI 8:6' },
  { id: 'l21-q26', episode: E4, type: 'mc', prompt: 'What was inside the ark?', options: ['The two tables of stone from Moses', 'Gold coins', 'Solomon’s crown', 'Nothing at all'], explanation: '“Which Moses put there at Horeb.”', ref: '1KI 8:9' },
  { id: 'l21-q27', episode: E4, type: 'finish', text: 'so that the priests could not stand to minister because of the ___; for the glory of the LORD filled the house of the LORD.', blanks: [['cloud', 'fire', 'crowd', 'smoke']], explanation: 'As at Sinai and the tabernacle.', ref: '1KI 8:11' },
  { id: 'l21-q28', episode: E4, type: 'order', prompt: 'Put the dedication of the Temple in order.', items: ['The priests bring the ark into the Most Holy Place', 'The cloud of glory fills the house', 'Solomon prays with his hands spread toward heaven', 'Fire comes down from heaven'], explanation: '“For he is good, for his steadfast love endures for ever.”', ref: '1KI 8:6-22; 2CH 7:1-3' },
  { id: 'l21-q29', episode: E4, type: 'finish', text: 'But will God indeed dwell on the earth? Behold, heaven and the highest heaven cannot ___ thee;', blanks: [['contain', 'see', 'reach', 'praise']], explanation: 'No house can hold God.', ref: '1KI 8:27' },
  { id: 'l21-q30', episode: E4, type: 'tf', statement: 'Solomon prayed that God would also hear foreigners who prayed toward his house.', answer: true, explanation: '“That all the peoples of the earth may know thy name.”', ref: '1KI 8:41-43' },
  { id: 'l21-q31', episode: E4, type: 'mc', prompt: 'What came down from heaven when Solomon finished his prayer?', options: ['Fire', 'Manna', 'Rain', 'A dove'], explanation: 'It consumed the burnt offering.', ref: '2CH 7:1' },
  { id: 'l21-q32', episode: E4, type: 'thread', from: '“Heaven and the highest heaven cannot contain thee; how much less this house”', options: [DWELLING, STONES, GREATER, WISDOM], explanation: 'In the heavenly city, God lives with his people.', ref: 'REV 21:3' },
  // Episode 5 · The Queen of Sheba
  { id: 'l21-q33', episode: E5, type: 'mc', prompt: 'Why did the Queen of Sheba come to Jerusalem?', options: ['To test Solomon’s wisdom with hard questions', 'To marry Solomon', 'To make war', 'To buy cedar'], explanation: 'She had heard of his fame.', ref: '1KI 10:1' },
  { id: 'l21-q34', episode: E5, type: 'mc', prompt: 'What did her camels carry?', options: ['Spices, gold and precious stones', 'Wheat and barley', 'Weapons', 'Water jars'], explanation: '“A very great retinue.”', ref: '1KI 10:2' },
  { id: 'l21-q35', episode: E5, type: 'tf', statement: 'Solomon could answer all the queen’s questions.', answer: true, explanation: '“There was nothing hidden from the king which he could not explain to her.”', ref: '1KI 10:3' },
  { id: 'l21-q36', episode: E5, type: 'finish', text: 'but I did not believe the reports until I came and my own eyes had seen it; and behold, the ___ was not told me;', blanks: [['half', 'truth', 'end', 'story']], explanation: 'The queen was amazed.', ref: '1KI 10:7' },
  { id: 'l21-q37', episode: E5, type: 'who', quote: 'Blessed be the LORD your God, who has delighted in you and set you on the throne of Israel!', options: ['The Queen of Sheba', 'Hiram, king of Tyre', 'Nathan', 'Bathsheba'], explanation: 'She praised Solomon’s God.', ref: '1KI 10:9' },
  { id: 'l21-q38', episode: E5, type: 'mc', prompt: 'What did Solomon speak about, in his songs and sayings?', options: ['Trees, beasts, birds, reptiles and fish', 'Only kings and wars', 'The stars alone', 'Nothing but money'], explanation: '“From the cedar… to the hyssop.”', ref: '1KI 4:33' },
  { id: 'l21-q39', episode: E5, type: 'where', prompt: 'Sheba was a kingdom in the far south. In which land? Tap it.', targets: ['arabia', 'egypt', 'syria', 'iran'], answer: ['arabia'], explanation: 'In today’s Yemen, famous for frankincense.', ref: '1KI 10:1' },
  { id: 'l21-q40', episode: E5, type: 'thread', from: 'The Queen of Sheba comes to hear Solomon’s wisdom', options: [GREATER, DWELLING, MASTERS, STONES], explanation: 'God’s wisdom in person.', ref: 'MAT 12:42' },
  // Episode 6 · Solomon's Heart Turns Away
  { id: 'l21-q41', episode: E6, type: 'mc', prompt: 'What turned Solomon’s heart away from God?', options: ['His foreign wives and their gods', 'The Queen of Sheba', 'A war', 'A famine'], explanation: '“His wives turned away his heart after other gods.”', ref: '1KI 11:4' },
  { id: 'l21-q42', episode: E6, type: 'finish', text: 'and his heart was not wholly ___ to the LORD his God, as was the heart of David his father.', blanks: [['true', 'given', 'near', 'open']], explanation: 'Solomon in his old age.', ref: '1KI 11:4' },
  { id: 'l21-q43', episode: E6, type: 'tf', statement: 'God told Solomon that the kingdom would be torn from his son, but not all of it, for the sake of David.', answer: true, explanation: '“I will give one tribe to your son.”', ref: '1KI 11:13' },
  { id: 'l21-q44', episode: E6, type: 'mc', prompt: 'Into how many pieces did the prophet Ahijah tear his new cloak?', options: ['Twelve', 'Two', 'Ten', 'Forty'], explanation: 'One for each tribe of Israel.', ref: '1KI 11:30' },
  { id: 'l21-q45', episode: E6, type: 'mc', prompt: 'How many pieces did Ahijah give to Jeroboam?', options: ['Ten', 'One', 'Two', 'Twelve'], explanation: '“I will give you ten tribes.”', ref: '1KI 11:31' },
  { id: 'l21-q46', episode: E6, type: 'order', prompt: 'Put Solomon’s life in order.', items: ['Anointed at Gihon', 'Asks God for wisdom', 'Builds the Temple', 'The Queen of Sheba visits', 'His heart turns away'], explanation: 'From glory to sorrow.', ref: '1KI 1:1-11:43' },
  { id: 'l21-q47', episode: E6, type: 'who', quote: '…even Solomon in all his glory was not arrayed like one of these.', options: ['Jesus, speaking of the lilies of the field', 'The Queen of Sheba', 'David', 'Nathan'], explanation: 'Trust God more than riches.', ref: 'MAT 6:29' },
  { id: 'l21-q48', episode: E6, type: 'thread', from: 'Solomon’s “heart was not wholly true to the LORD his God”', options: [MASTERS, ASK, GREATER, WISDOM], explanation: 'God asks for the whole heart.', ref: 'MAT 6:24' },
]
