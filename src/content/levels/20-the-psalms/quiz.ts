import type { Question } from '../../../quiz/types'

/**
 * Level 20's quiz bank: the 48 questions of the approved Level 20 script ("Level 20 quiz
 * bank"), in its order. In each list of options, the first is the right one; the quiz
 * shuffles them. Every episode has eight questions.
 */

const [E1, E2, E3, E4, E5, E6] = [1, 2, 3, 4, 5, 6].map((n) => `l20-e${n}`) as [string, string, string, string, string, string]

const BABES = 'The children in the Temple sing “Hosanna to the Son of David!”'
const HOUSE = '“In my Father’s house are many rooms… I go to prepare a place for you.”'
const FORSAKEN = '“My God, my God, why hast thou forsaken me?”'
const SAVE = '“He will save his people from their sins.”'
const STONE = '“The very stone which the builders rejected.”'
const GOING = '“His parents went to Jerusalem every year.”'

export const level20Quiz: Question[] = [
  // Episode 1 · Songs of Praise
  { id: 'l20-q01', episode: E1, type: 'mc', prompt: 'How many psalms are in the book of Psalms?', options: ['150', '12', '40', '1,000'], explanation: 'Divided into five books.', ref: 'PSA 150:1-6' },
  { id: 'l20-q02', episode: E1, type: 'finish', text: 'O LORD, our Lord, how majestic is thy ___ in all the earth!', blanks: [['name', 'house', 'kingdom', 'power']], explanation: 'The first and last words of Psalm 8.', ref: 'PSA 8:1' },
  { id: 'l20-q03', episode: E1, type: 'finish', text: 'The heavens are telling the ___ of God; and the firmament proclaims his handiwork.', blanks: [['glory', 'story', 'secrets', 'size']], explanation: 'Creation itself praises God.', ref: 'PSA 19:1' },
  { id: 'l20-q04', episode: E1, type: 'mc', prompt: 'In Psalm 8, what is the psalmist looking at when he asks, “What is man that thou art mindful of him?”', options: ['The heavens, the moon and the stars', 'The sea', 'The Temple', 'His flock'], explanation: '“When I look at thy heavens, the work of thy fingers.”', ref: 'PSA 8:3-4' },
  { id: 'l20-q05', episode: E1, type: 'finish', text: 'Make a joyful ___ to the LORD, all the lands!', blanks: [['noise', 'song', 'sacrifice', 'journey']], explanation: 'Psalm 100.', ref: 'PSA 100:1' },
  { id: 'l20-q06', episode: E1, type: 'mc', prompt: 'Who did David appoint to sing and play before the ark every day?', options: ['The Levites', 'The soldiers', 'The prophets', 'The Philistines'], explanation: 'With harps, lyres and cymbals.', ref: '1CH 16:4-5' },
  { id: 'l20-q07', episode: E1, type: 'order', prompt: 'Put the instruments in the order of Psalm 150.', items: ['Trumpet', 'Lute and harp', 'Timbrel and dance', 'Strings and pipe', 'Cymbals'], explanation: '“Let everything that breathes praise the LORD!”', ref: 'PSA 150:3-6' },
  { id: 'l20-q08', episode: E1, type: 'thread', from: '“Chanted by the mouth of babes and infants”', options: [BABES, HOUSE, FORSAKEN, SAVE], explanation: 'Jesus quoted Psalm 8 to the chief priests.', ref: 'MAT 21:15-16' },
  // Episode 2 · The Lord Is My Shepherd
  { id: 'l20-q09', episode: E2, type: 'finish', text: 'The LORD is my ___, I shall not want;', blanks: [['shepherd', 'king', 'rock', 'father']], explanation: 'The best-known psalm of all.', ref: 'PSA 23:1' },
  { id: 'l20-q10', episode: E2, type: 'finish', text: 'he makes me lie down in green ___. He leads me beside still waters;', blanks: [['pastures', 'fields', 'gardens', 'valleys']], explanation: 'Food and water for the flock.', ref: 'PSA 23:2' },
  { id: 'l20-q11', episode: E2, type: 'mc', prompt: 'Who first sang Psalm 23?', options: ['David, who had been a shepherd', 'Moses', 'Solomon', 'Abraham'], explanation: '“A Psalm of David.”', ref: 'PSA 23:1' },
  { id: 'l20-q12', episode: E2, type: 'finish', text: 'Even though I walk through the valley of the shadow of death, I fear no ___;', blanks: [['evil', 'wolf', 'enemy', 'night']], explanation: '“For thou art with me.”', ref: 'PSA 23:4' },
  { id: 'l20-q13', episode: E2, type: 'mc', prompt: 'What were the shepherd’s rod and staff for?', options: ['To drive off wild animals and to guide the sheep', 'To build the sheepfold', 'To count the sheep', 'To carry water'], explanation: '“They comfort me.”', ref: 'PSA 23:4' },
  { id: 'l20-q14', episode: E2, type: 'order', prompt: 'Put the places of Psalm 23 in order.', items: ['Green pastures', 'Still waters', 'Paths of righteousness', 'The valley of the shadow', 'The table', 'The house of the Lord'], explanation: 'From morning to home.', ref: 'PSA 23:1-6' },
  { id: 'l20-q15', episode: E2, type: 'tf', statement: 'Psalm 23 ends with the shepherd’s flock lost in the valley.', answer: false, explanation: '“I shall dwell in the house of the Lord for ever.”', ref: 'PSA 23:6' },
  { id: 'l20-q16', episode: E2, type: 'thread', from: '“I shall dwell in the house of the Lord for ever”', options: [HOUSE, BABES, STONE, GOING], explanation: 'Jesus prepares our home.', ref: 'JHN 14:2' },
  // Episode 3 · Songs of Lament
  { id: 'l20-q17', episode: E3, type: 'mc', prompt: 'What is a lament?', options: ['A prayer telling God honestly about our sadness, fear or pain', 'A song for a wedding', 'A list of kings', 'A thank-you letter'], explanation: 'More psalms are laments than any other kind.', ref: 'PSA 13:1-6' },
  { id: 'l20-q18', episode: E3, type: 'finish', text: 'How long, O LORD? Wilt thou ___ me for ever?', blanks: [['forget', 'leave', 'punish', 'carry']], explanation: 'The cry of Psalm 13.', ref: 'PSA 13:1' },
  { id: 'l20-q19', episode: E3, type: 'order', prompt: 'Put the parts of Psalm 13 in order.', items: ['“How long, O LORD?”', '“Consider and answer me”', '“But I have trusted in thy steadfast love”', '“I will sing to the LORD”'], explanation: 'A lament turns from crying out to trust.', ref: 'PSA 13:1-6' },
  { id: 'l20-q20', episode: E3, type: 'finish', text: 'As a ___ longs for flowing streams, so longs my soul for thee, O God.', blanks: [['hart', 'lamb', 'lion', 'dove']], explanation: 'A deer looking for water.', ref: 'PSA 42:1' },
  { id: 'l20-q21', episode: E3, type: 'finish', text: 'Hope in God; for I shall again ___ him, my help', blanks: [['praise', 'see', 'find', 'follow']], explanation: 'Even when the soul is “cast down.”', ref: 'PSA 42:5' },
  { id: 'l20-q22', episode: E3, type: 'who', quote: 'My God, my God, why hast thou forsaken me?', options: ['Jesus, on the cross, praying Psalm 22', 'Job', 'Jonah', 'Peter'], explanation: '“Eli, Eli, lama sabachthani?”', ref: 'MAT 27:46' },
  { id: 'l20-q23', episode: E3, type: 'tf', statement: 'Psalm 22 ends in praise, with all the nations turning to God.', answer: true, explanation: '“All the ends of the earth shall remember and turn to the LORD.”', ref: 'PSA 22:27' },
  { id: 'l20-q24', episode: E3, type: 'thread', from: FORSAKEN, options: ['Jesus prays it on the cross.', 'Jesus quotes it to the chief priests in the Temple.', 'Peter quotes it after the Resurrection.', 'Mary sings it in her Magnificat.'], explanation: 'He made our cry his own.', ref: 'MAT 27:46' },
  // Episode 4 · Songs of Repentance
  { id: 'l20-q25', episode: E4, type: 'finish', text: 'Out of the ___ I cry to thee, O LORD!', blanks: [['depths', 'darkness', 'desert', 'valley']], explanation: 'Psalm 130, the De profundis.', ref: 'PSA 130:1' },
  { id: 'l20-q26', episode: E4, type: 'finish', text: 'But there is ___ with thee, that thou mayest be feared.', blanks: [['forgiveness', 'anger', 'silence', 'judgment']], explanation: 'God does not “mark iniquities.”', ref: 'PSA 130:4' },
  { id: 'l20-q27', episode: E4, type: 'finish', text: 'my soul waits for the Lord more than ___ for the morning,', blanks: [['watchmen', 'farmers', 'soldiers', 'shepherds']], explanation: 'Said twice, because the wait is long.', ref: 'PSA 130:6' },
  { id: 'l20-q28', episode: E4, type: 'mc', prompt: 'How many penitential psalms does the Church pray together?', options: ['Seven', 'Three', 'Twelve', 'Forty'], explanation: 'Psalms 6, 32, 38, 51, 102, 130 and 143.', ref: 'PSA 130:1-8' },
  { id: 'l20-q29', episode: E4, type: 'finish', text: 'Blessed is he whose transgression is ___, whose sin is covered.', blanks: [['forgiven', 'forgotten', 'hidden', 'small']], explanation: 'The joy of being forgiven.', ref: 'PSA 32:1' },
  { id: 'l20-q30', episode: E4, type: 'finish', text: 'as far as the east is from the ___, so far does he remove our transgressions from us.', blanks: [['west', 'north', 'sea', 'mountains']], explanation: 'East and west never meet.', ref: 'PSA 103:12' },
  { id: 'l20-q31', episode: E4, type: 'mc', prompt: 'In Psalm 103, God pities those who fear him like…', options: ['A father pities his children', 'A king pities his servants', 'A judge pities a thief', 'A shepherd pities a wolf'], explanation: '“So the LORD pities those who fear him.”', ref: 'PSA 103:13' },
  { id: 'l20-q32', episode: E4, type: 'thread', from: '“He will redeem Israel from all his iniquities”', options: [SAVE, HOUSE, STONE, GOING], explanation: 'The name “Jesus” means “the LORD saves.”', ref: 'MAT 1:21' },
  // Episode 5 · The King Who Is to Come
  { id: 'l20-q33', episode: E5, type: 'finish', text: 'He said to me, “You are my ___, today I have begotten you.', blanks: [['son', 'servant', 'king', 'friend']], explanation: 'A psalm for a king of David’s family.', ref: 'PSA 2:7' },
  { id: 'l20-q34', episode: E5, type: 'finish', text: 'The LORD says to my lord: “Sit at my right ___, till I make your enemies your footstool.”', blanks: [['hand', 'side', 'table', 'throne']], explanation: 'The psalm the New Testament quotes most.', ref: 'PSA 110:1' },
  { id: 'l20-q35', episode: E5, type: 'mc', prompt: 'Psalm 110 promises a king who is also a priest for ever, “after the order of…”', options: ['Melchizedek', 'Aaron', 'Moses', 'Samuel'], explanation: 'The priest-king of Salem who blessed Abraham (Level 3).', ref: 'PSA 110:4' },
  { id: 'l20-q36', episode: E5, type: 'finish', text: 'The stone which the builders ___ has become the head of the corner.', blanks: [['rejected', 'chose', 'carved', 'lost']], explanation: 'Jesus quoted it about himself.', ref: 'PSA 118:22' },
  { id: 'l20-q37', episode: E5, type: 'finish', text: 'This is the day which the LORD has ___; let us rejoice and be glad in it.', blanks: [['made', 'blessed', 'given', 'chosen']], explanation: 'The Church sings it every Easter.', ref: 'PSA 118:24' },
  { id: 'l20-q38', episode: E5, type: 'mc', prompt: 'What does “Hosanna” mean?', options: ['“Save us!”', '“Goodbye”', '“Welcome home”', '“Long live the king”'], explanation: '“Save us, we beseech thee, O LORD!”', ref: 'PSA 118:25' },
  { id: 'l20-q39', episode: E5, type: 'who', quote: 'Have you never read in the scriptures: ‘The very stone which the builders rejected has become the head of the corner…', options: ['Jesus', 'Peter', 'David', 'Isaiah'], explanation: 'A few days before he was rejected and crucified.', ref: 'MAT 21:42' },
  { id: 'l20-q40', episode: E5, type: 'thread', from: '“The stone which the builders rejected has become the head of the corner”', options: ['Jesus, rejected, whom God made the cornerstone', 'The children singing Hosanna', 'Joseph naming the baby Jesus', 'The family going up to Jerusalem'], explanation: '“This is the stone which was rejected by you builders.”', ref: 'ACT 4:11' },
  // Episode 6 · Songs of the Road to Jerusalem
  { id: 'l20-q41', episode: E6, type: 'finish', text: 'I lift up my eyes to the ___. From whence does my help come?', blanks: [['hills', 'stars', 'Temple', 'sky']], explanation: 'A Song of Ascents.', ref: 'PSA 121:1' },
  { id: 'l20-q42', episode: E6, type: 'finish', text: 'My help comes from the LORD, who made heaven and ___.', blanks: [['earth', 'sea', 'stars', 'man']], explanation: 'The answer to the pilgrim’s question.', ref: 'PSA 121:2' },
  { id: 'l20-q43', episode: E6, type: 'mc', prompt: 'What were the Songs of Ascents?', options: ['Psalms that pilgrims sang going up to Jerusalem', 'Songs for climbing Mount Sinai', 'Songs for building the Temple', 'Songs for battle'], explanation: 'Psalms 120 to 134.', ref: 'PSA 121:1-8' },
  { id: 'l20-q44', episode: E6, type: 'finish', text: 'I was ___ when they said to me, “Let us go to the house of the LORD!”', blanks: [['glad', 'tired', 'afraid', 'ready']], explanation: 'The joy of going to God’s house.', ref: 'PSA 122:1' },
  { id: 'l20-q45', episode: E6, type: 'finish', text: 'Behold, how good and pleasant it is when brothers dwell in ___!', blanks: [['unity', 'tents', 'Jerusalem', 'peace']], explanation: 'Families of every tribe together.', ref: 'PSA 133:1' },
  { id: 'l20-q46', episode: E6, type: 'mc', prompt: 'How many times a year did God’s law tell the men of Israel to go up to the sanctuary?', options: ['Three', 'Once', 'Seven', 'Twelve'], explanation: 'Passover, Pentecost and Booths.', ref: 'DEU 16:16' },
  { id: 'l20-q47', episode: E6, type: 'where', prompt: 'Where did the pilgrims go up to sing these songs? Tap it.', targets: ['jerusalem', 'bethlehem', 'hebron', 'shechem'], answer: ['jerusalem'], explanation: '“Our feet have been standing within your gates, O Jerusalem!”', ref: 'PSA 122:2' },
  { id: 'l20-q48', episode: E6, type: 'thread', from: '“I was glad when they said to me, ‘Let us go to the house of the LORD!’”', options: [GOING, FORSAKEN, BABES, SAVE], explanation: 'When Jesus was twelve, he went up with them.', ref: 'LUK 2:41-42' },
]
