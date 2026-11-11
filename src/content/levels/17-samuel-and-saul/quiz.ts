import type { Question } from '../../../quiz/types'

/**
 * Level 17's quiz bank: the 42 questions of the approved Level 17 script ("Level 17 quiz
 * bank"), in its order. In each list of options, the first is the right one; the quiz
 * shuffles them. Every episode has seven questions.
 */

const E1 = 'l17-e1'
const E2 = 'l17-e2'
const E3 = 'l17-e3'
const E4 = 'l17-e4'
const E5 = 'l17-e5'
const E6 = 'l17-e6'

const MAGNIFICAT = 'Mary: “he has put down the mighty from their thrones, and exalted those of low degree.”'
const SHEEP = 'Jesus: “My sheep hear my voice, and I know them, and they follow me.”'
const KNEE = '“…at the name of Jesus every knee should bow…”'
const HELPER = '“The Lord is my helper, I will not be afraid.”'
const ANOINTED = 'Jesus: “The Spirit of the Lord is upon me, because he has anointed me.”'
const WILL = 'Jesus: “Lo, I have come to do thy will, O God.”'

export const level17Quiz: Question[] = [
  // Episode 1 · Hannah's Prayer
  { id: 'l17-q01', episode: E1, type: 'mc', prompt: 'Why was Hannah so sad?', options: ['She had no children, and Peninnah mocked her', 'Her husband had died', 'She was far from home', 'Her son was sick'], explanation: '“Her rival used to provoke her sorely.”', ref: '1SA 1:2; 1SA 1:6' },
  { id: 'l17-q02', episode: E1, type: 'who', quote: 'I have been pouring out my soul before the LORD.', options: ['Hannah', 'Eli', 'Peninnah', 'Samuel'], explanation: 'Eli had thought she was drunk.', ref: '1SA 1:15' },
  { id: 'l17-q03', episode: E1, type: 'tf', statement: 'Eli thought Hannah was drunk, because her lips moved but no sound came out.', answer: true, explanation: 'She was praying in her heart.', ref: '1SA 1:13' },
  { id: 'l17-q04', episode: E1, type: 'finish', text: 'For this child I ___; and the LORD has granted me my petition which I made to him.', blanks: [['prayed', 'waited', 'wept', 'worked']], explanation: 'Hannah at Shiloh, giving Samuel to the LORD.', ref: '1SA 1:27' },
  { id: 'l17-q05', episode: E1, type: 'mc', prompt: 'What did Hannah do when Samuel was old enough?', options: ['She brought him to Shiloh and gave him to the LORD', 'She sent him to Egypt', 'She made him a shepherd', 'She kept him at home'], explanation: '“I have lent him to the LORD.”', ref: '1SA 1:28' },
  { id: 'l17-q06', episode: E1, type: 'mc', prompt: 'What did Hannah bring Samuel every year?', options: ['A little robe she had made', 'A lamb', 'A golden cup', 'A new pair of sandals'], explanation: 'As he grew.', ref: '1SA 2:19' },
  { id: 'l17-q07', episode: E1, type: 'thread', from: 'Hannah’s song: “He raises up the poor from the dust”', options: [MAGNIFICAT, SHEEP, KNEE, HELPER], explanation: 'Mary’s Magnificat echoes Hannah’s song.', ref: 'LUK 1:52' },
  // Episode 2 · "Speak, Lord, for Your Servant Hears"
  { id: 'l17-q08', episode: E2, type: 'finish', text: '…the lamp of God had not yet gone out, and Samuel was lying down within the temple of the LORD, where the ___ of God was.', blanks: [['ark', 'altar', 'bread', 'lamp']], explanation: 'Near the holiest place.', ref: '1SA 3:3' },
  { id: 'l17-q09', episode: E2, type: 'mc', prompt: 'When the LORD first called “Samuel!”, what did Samuel do?', options: ['He ran to Eli, thinking Eli had called him', 'He hid under his blanket', 'He answered the LORD at once', 'He went back to sleep'], explanation: 'He did not yet know the LORD.', ref: '1SA 3:4-5' },
  { id: 'l17-q10', episode: E2, type: 'mc', prompt: 'How many times did the LORD call before Samuel answered him?', options: ['Four', 'One', 'Two', 'Seven'], explanation: 'Three times Samuel ran to Eli.', ref: '1SA 3:4-10' },
  { id: 'l17-q11', episode: E2, type: 'who', quote: 'Speak, for thy servant hears.', options: ['Samuel', 'Eli', 'Hannah', 'Saul'], explanation: 'As Eli had told him to say.', ref: '1SA 3:10' },
  {
    id: 'l17-q12',
    episode: E2,
    type: 'order',
    prompt: 'Put the night of Samuel’s call in order.',
    items: ['The LORD calls, and Samuel runs to Eli', 'The LORD calls again', 'The third time, Eli understands', 'Eli tells Samuel what to say', 'Samuel answers, “Speak, for thy servant hears”'],
    explanation: 'And the LORD spoke to him.',
    ref: '1SA 3:4-10',
  },
  { id: 'l17-q13', episode: E2, type: 'tf', statement: 'In Samuel’s time, God spoke to his people often.', answer: false, explanation: '“The word of the LORD was rare in those days.”', ref: '1SA 3:1' },
  { id: 'l17-q14', episode: E2, type: 'thread', from: '“Speak, for thy servant hears”', options: [SHEEP, MAGNIFICAT, ANOINTED, WILL], explanation: 'Jesus still calls each of us by name.', ref: 'JHN 10:27' },
  // Episode 3 · The Ark Is Captured
  { id: 'l17-q15', episode: E3, type: 'mc', prompt: 'Why did the elders bring the ark into the battle?', options: ['They thought it would make God save them, like a lucky charm', 'God told them to', 'To give it to the Philistines', 'To hide it from thieves'], explanation: '“That he may come among us and save us.”', ref: '1SA 4:3' },
  { id: 'l17-q16', episode: E3, type: 'tf', statement: 'Israel won the battle because they had the ark with them.', answer: false, explanation: 'The ark itself was captured.', ref: '1SA 4:10-11' },
  { id: 'l17-q17', episode: E3, type: 'mc', prompt: 'What did the name Ichabod mean?', options: ['“The glory has departed”', '“God is with us”', '“Asked of God”', '“Stone of help”'], explanation: 'Because the ark had been captured.', ref: '1SA 4:21' },
  { id: 'l17-q18', episode: E3, type: 'mc', prompt: 'What happened to the statue of Dagon when the ark was put beside it?', options: ['It fell on its face before the ark, and then it broke', 'It began to glow', 'It walked away', 'It was carried to Israel'], explanation: 'Two mornings in a row.', ref: '1SA 5:3-4' },
  {
    id: 'l17-q19',
    episode: E3,
    type: 'order',
    prompt: 'Put the story of the ark in order.',
    items: ['The elders bring the ark into battle', 'The Philistines capture the ark', 'Eli hears the news and dies', 'Dagon falls before the ark', 'Two cows bring the ark home on a cart'],
    explanation: 'To Beth-shemesh.',
    ref: '1SA 4:1-6:16',
  },
  { id: 'l17-q20', episode: E3, type: 'finish', text: '…they turned neither to the right nor to the ___…', blanks: [['left', 'hills', 'sea', 'city']], explanation: 'The cows went straight to Israel.', ref: '1SA 6:12' },
  { id: 'l17-q21', episode: E3, type: 'thread', from: 'Dagon falls on his face before the ark of the LORD', options: [KNEE, SHEEP, HELPER, WILL], explanation: 'No idol can stand before the true God.', ref: 'PHP 2:10' },
  // Episode 4 · Israel Asks for a King
  { id: 'l17-q22', episode: E4, type: 'mc', prompt: 'What did Samuel name the stone he set up after God’s help?', options: ['Ebenezer', 'Bethel', 'Ichabod', 'Gilgal'], explanation: '“Hitherto the LORD has helped us.”', ref: '1SA 7:12' },
  { id: 'l17-q23', episode: E4, type: 'finish', text: '…and called its name Ebenezer; for he said, “Hitherto the LORD has ___ us.”', blanks: [['helped', 'tested', 'judged', 'left']], explanation: '“Stone of help.”', ref: '1SA 7:12' },
  { id: 'l17-q24', episode: E4, type: 'mc', prompt: 'Why did the elders ask Samuel for a king?', options: ['They wanted a king to govern them “like all the nations”', 'God had promised them one', 'Samuel had asked them to', 'The Philistines told them to'], explanation: 'Samuel’s sons were not like him.', ref: '1SA 8:5' },
  { id: 'l17-q25', episode: E4, type: 'who', quote: '…they have not rejected you, but they have rejected me from being king over them.', options: ['The LORD', 'Samuel', 'Eli', 'The elders'], explanation: 'God’s answer to Samuel.', ref: '1SA 8:7' },
  { id: 'l17-q26', episode: E4, type: 'tf', statement: 'Samuel warned the people that a king would take their sons, their fields and a tenth of their flocks.', answer: true, explanation: '“And you shall be his slaves.”', ref: '1SA 8:11-17' },
  { id: 'l17-q27', episode: E4, type: 'where', prompt: 'Samuel judged Israel in a circuit that included Bethel. Tap Bethel.', targets: ['bethel', 'bethlehem', 'hebron', 'beersheba'], answer: ['bethel'], explanation: 'Bethel, Gilgal and Mizpah, then home to Ramah.', ref: '1SA 7:16' },
  { id: 'l17-q28', episode: E4, type: 'thread', from: 'Ebenezer: “Hitherto the LORD has helped us”', options: [HELPER, KNEE, MAGNIFICAT, ANOINTED], explanation: 'God never fails or forsakes us.', ref: 'HEB 13:6' },
  // Episode 5 · Saul Anointed
  { id: 'l17-q29', episode: E5, type: 'mc', prompt: 'What was Saul looking for when he met Samuel?', options: ['His father’s lost donkeys', 'A lost lamb', 'A wife', 'The ark of God'], explanation: 'They had been lost for three days.', ref: '1SA 9:3; 1SA 9:20' },
  { id: 'l17-q30', episode: E5, type: 'mc', prompt: 'What was Saul like?', options: ['Tall and handsome, a head taller than anyone', 'Small and quick', 'Old and wise', 'A shepherd boy'], explanation: '“From his shoulders upward he was taller than any of the people.”', ref: '1SA 9:2' },
  { id: 'l17-q31', episode: E5, type: 'mc', prompt: 'How did Samuel anoint Saul?', options: ['He poured a vial of oil on his head', 'He gave him a crown', 'He gave him a sword', 'He washed his feet'], explanation: '“Has not the LORD anointed you?”', ref: '1SA 10:1' },
  { id: 'l17-q32', episode: E5, type: 'finish', text: 'When he turned his back to leave Samuel, God gave him another ___…', blanks: [['heart', 'name', 'sword', 'robe']], explanation: 'All the signs came true that day.', ref: '1SA 10:9' },
  { id: 'l17-q33', episode: E5, type: 'mc', prompt: 'Where was Saul when the lot fell on him?', options: ['Hiding among the baggage', 'Asleep in his tent', 'Out looking for donkeys', 'At the altar'], explanation: '“Behold, he has hidden himself among the baggage.”', ref: '1SA 10:22' },
  { id: 'l17-q34', episode: E5, type: 'who', quote: 'Do you see him whom the LORD has chosen? There is none like him among all the people.', options: ['Samuel', 'Saul', 'Kish', 'The people'], explanation: 'And all the people shouted, “Long live the king!”', ref: '1SA 10:24' },
  { id: 'l17-q35', episode: E5, type: 'thread', from: 'Samuel anoints Saul with oil, the LORD’s “anointed”', options: [ANOINTED, WILL, SHEEP, KNEE], explanation: '“Messiah” and “Christ” both mean “Anointed.”', ref: 'LUK 4:18' },
  // Episode 6 · To Obey Is Better Than Sacrifice
  { id: 'l17-q36', episode: E6, type: 'mc', prompt: 'What did Saul do at Gilgal when Samuel was late?', options: ['He offered the sacrifice himself instead of waiting', 'He went home', 'He crowned his son', 'He sent the army away'], explanation: '“I forced myself, and offered the burnt offering.”', ref: '1SA 13:12' },
  { id: 'l17-q37', episode: E6, type: 'finish', text: '…the LORD has sought out a man after his own ___…', blanks: [['heart', 'mind', 'name', 'will']], explanation: 'God’s next king: David.', ref: '1SA 13:14' },
  { id: 'l17-q38', episode: E6, type: 'who', quote: 'What then is this bleating of the sheep in my ears, and the lowing of the oxen which I hear?', options: ['Samuel', 'Saul', 'Agag', 'A shepherd'], explanation: 'Saul had said he had obeyed.', ref: '1SA 15:14' },
  { id: 'l17-q39', episode: E6, type: 'mc', prompt: 'Who did Saul blame for keeping the best sheep and oxen?', options: ['The people', 'Samuel', 'God', 'The Amalekites'], explanation: '“The people spared the best.”', ref: '1SA 15:15' },
  { id: 'l17-q40', episode: E6, type: 'finish', text: 'Behold, to ___ is better than sacrifice, and to hearken than the fat of rams.', blanks: [['obey', 'pray', 'give', 'fast']], explanation: 'Samuel to Saul.', ref: '1SA 15:22' },
  { id: 'l17-q41', episode: E6, type: 'tf', statement: 'When Saul grabbed Samuel’s robe, it tore, as a sign that the kingdom would be torn from him.', answer: true, explanation: '“The LORD has torn the kingdom of Israel from you this day.”', ref: '1SA 15:27-28' },
  { id: 'l17-q42', episode: E6, type: 'thread', from: '“To obey is better than sacrifice”', options: [WILL, ANOINTED, HELPER, SHEEP], explanation: 'Jesus’ whole life was obedience and love.', ref: 'HEB 10:7' },
]
