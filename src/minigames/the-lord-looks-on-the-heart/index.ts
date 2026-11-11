import { inOrder } from '../in-order'

/**
 * The LORD looks on the heart (Level 18 script, Episode 1): spot the one God chooses. Jesse's
 * sons pass before Samuel, and for each the player chooses what Samuel does; when all seven have
 * passed, the player asks for the youngest. A wrong choice gets a gentle "not that one"; in
 * gentle mode the right choice glows.
 */

const ANOINT = 'Anoint him: surely this is the LORD’s anointed.'
const PASS = 'Pass him by: the LORD has not chosen this one.'
const ASK = 'Ask Jesse: “Are all your sons here?”'
const SONS = [
  { who: 'Eliab, the eldest, tall and strong', right: 'pass', note: '“Man looks on the outward appearance, but the LORD looks on the heart.”' },
  { who: 'Abinadab, the second son', right: 'pass', note: '“Neither has the LORD chosen this one.”' },
  { who: 'Shammah, the third son', right: 'pass', note: '“Neither has the LORD chosen this one.”' },
  { who: 'Seven sons have passed before Samuel', right: 'ask', note: '“There remains yet the youngest, but behold, he is keeping the sheep.”' },
]

export const theLordLooksOnTheHeart = inOrder({
  id: 'the-lord-looks-on-the-heart',
  steps: SONS.map((s, i) => ({ id: `son-${i + 1}-${s.right}`, text: s.right === 'pass' ? PASS : ASK, note: s.note })),
  question: (n) => `${SONS[n]!.who}. What does Samuel do?`,
  notYet: 'Not that one. The LORD looks on the heart.',
  offer: (n) => {
    const options = [
      { id: `son-${n + 1}-pass`, text: PASS },
      { id: `son-${n + 1}-anoint`, text: ANOINT },
      { id: `son-${n + 1}-ask`, text: ASK },
    ]
    const turn = n % options.length
    return [...options.slice(turn), ...options.slice(0, turn)]
  },
  live: () => ({}),
})
