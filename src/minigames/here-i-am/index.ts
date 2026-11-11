import { inOrder } from '../in-order'

/**
 * Here I am (Level 17 script, Episode 2): a quiet interaction, walking toward God's voice. In
 * the dark temple the voice calls, "Samuel!", and the player chooses what Samuel does. Three
 * times he runs to Eli, who sends him back, until Eli understands and tells him what to say;
 * the fourth time, Samuel answers the LORD. A wrong choice gets a gentle "not yet"; in gentle
 * mode the right choice glows.
 */

const RUN = 'Run to Eli: “Here I am, for you called me.”'
const SLEEP = 'Roll over and go back to sleep.'
const SPEAK = 'Answer: “Speak, for thy servant hears.”'
const CALLS = [
  { right: 'run', note: 'Eli said, “I did not call; lie down again.”' },
  { right: 'run', note: 'Eli said, “I did not call, my son; lie down again.”' },
  { right: 'run', note: 'Then Eli perceived that the LORD was calling the boy: “If he calls you, you shall say, ‘Speak, LORD, for thy servant hears.’”' },
  { right: 'speak', note: 'And the LORD spoke to Samuel.' },
]

export const hereIAm = inOrder({
  id: 'here-i-am',
  steps: CALLS.map((c, i) => ({ id: `call-${i + 1}-${c.right}`, text: c.right === 'run' ? RUN : SPEAK, note: c.note })),
  question: (n) => (n === 0 ? 'The voice calls, “Samuel!” What does Samuel do?' : n === 3 ? 'The LORD calls again, “Samuel! Samuel!” What does Samuel say now?' : 'The voice calls again, “Samuel!” What does Samuel do?'),
  notYet: 'Not yet. Samuel did not yet know the LORD.',
  offer: (n) => {
    const options = [
      { id: `call-${n + 1}-run`, text: RUN },
      { id: `call-${n + 1}-sleep`, text: SLEEP },
      { id: `call-${n + 1}-speak`, text: SPEAK },
    ]
    return CALLS[n]!.right === 'run' ? options : [options[2]!, options[0]!, options[1]!]
  },
  live: () => ({}),
})
