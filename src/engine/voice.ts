/**
 * Choosing the read-aloud voice. Browsers offer very different voices through the same speech
 * API: the old system ones sound robotic, while the neural ones (Edge's "Natural" voices, and
 * some on phones) sound close to a person reading aloud. Unless the player has chosen one, the
 * game picks the warmest English voice the device has, in this order.
 */

/** Calm, warm readers, best first: Edge's natural voices, then others known to read well. */
const PREFERRED = ['Christopher', 'Andrew', 'Brian', 'Guy', 'Davis', 'Roger', 'Eric', 'Steffan', 'Ryan', 'Thomas', 'Daniel', 'Google UK English Male', 'Aria', 'Emma', 'Ava', 'Jenny', 'Sonia', 'Google UK English Female', 'Google US English']

/** How the game reads: a little slower and lower than a device's default, like someone reading Scripture aloud. */
export const READING = { rate: 0.88, pitch: 0.95 }

export interface VoiceLike {
  name: string
  lang: string
  localService?: boolean
}

const isNatural = (v: VoiceLike) => /natural|neural|online|enhanced|premium/i.test(v.name)
const isEnglish = (v: VoiceLike) => /^en(-|_|$)/i.test(v.lang)

/** English voices, best first: natural ones before system ones, the preferred readers first among them. */
export function rankVoices<V extends VoiceLike>(voices: readonly V[]): V[] {
  const score = (v: V) => {
    const preferred = PREFERRED.findIndex((name) => v.name.includes(name))
    return (isNatural(v) ? 0 : 1000) + (preferred < 0 ? PREFERRED.length : preferred)
  }
  return voices.filter(isEnglish).sort((a, b) => score(a) - score(b))
}

/** The voice to read with: the player's choice if the device still has it, otherwise the best one. */
export function pickVoice<V extends VoiceLike>(voices: readonly V[], chosen: string | null): V | undefined {
  return voices.find((v) => v.name === chosen) ?? rankVoices(voices)[0]
}

/** The device's voices, which some browsers only list after a moment. */
export function deviceVoices(): Promise<SpeechSynthesisVoice[]> {
  if (typeof speechSynthesis === 'undefined') return Promise.resolve([])
  const now = speechSynthesis.getVoices()
  if (now.length) return Promise.resolve(now)
  return new Promise((resolve) => {
    const done = () => resolve(speechSynthesis.getVoices())
    speechSynthesis.addEventListener('voiceschanged', done, { once: true })
    setTimeout(done, 1500)
  })
}
