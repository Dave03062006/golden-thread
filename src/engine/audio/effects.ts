/**
 * Sound effects, made by Web Audio on the spot rather than recorded, so there's nothing
 * to license and nothing to download (spec §11.1). Each art style has its own voice:
 * Paper & Glass is soft and organic (paper, wood, a small bell); Pixel is chiptune.
 */

export type Effect =
  /** Moving on to the next line. */
  | 'advance'
  /** A card opening. */
  | 'open'
  /** Finding a golden thread. */
  | 'find'
  /** An interaction completing. */
  | 'done'

export type EffectVoice = 'paper' | 'chip'

interface Target {
  context: AudioContext
  destination: AudioNode
}

/** A short burst of soft noise, shaped by a filter: paper sliding, a page turning. */
function rustle(t: Target, { seconds, from, to, q, volume }: { seconds: number; from: number; to: number; q: number; volume: number }) {
  const { context } = t
  const now = context.currentTime
  const length = Math.ceil(context.sampleRate * seconds)
  const buffer = context.createBuffer(1, length, context.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1
  const source = context.createBufferSource()
  source.buffer = buffer
  const filter = context.createBiquadFilter()
  filter.type = 'bandpass'
  filter.Q.value = q
  filter.frequency.setValueAtTime(from, now)
  filter.frequency.exponentialRampToValueAtTime(to, now + seconds)
  const gain = context.createGain()
  gain.gain.setValueAtTime(0, now)
  gain.gain.linearRampToValueAtTime(volume, now + seconds * 0.25)
  gain.gain.exponentialRampToValueAtTime(0.0001, now + seconds)
  source.connect(filter).connect(gain).connect(t.destination)
  source.start(now)
  source.stop(now + seconds)
}

/** A struck tone that rings and fades: a bell, a soft wooden knock. */
function tone(t: Target, { frequency, start = 0, seconds, volume, type = 'sine' }: { frequency: number; start?: number; seconds: number; volume: number; type?: OscillatorType }) {
  const { context } = t
  const at = context.currentTime + start
  const osc = context.createOscillator()
  osc.type = type
  osc.frequency.value = frequency
  const gain = context.createGain()
  gain.gain.setValueAtTime(0, at)
  gain.gain.linearRampToValueAtTime(volume, at + 0.008)
  gain.gain.exponentialRampToValueAtTime(0.0001, at + seconds)
  osc.connect(gain).connect(t.destination)
  osc.start(at)
  osc.stop(at + seconds + 0.02)
}

const PAPER: Record<Effect, (t: Target) => void> = {
  advance: (t) => rustle(t, { seconds: 0.16, from: 3200, to: 1800, q: 0.8, volume: 0.05 }),
  open: (t) => rustle(t, { seconds: 0.34, from: 900, to: 3600, q: 0.6, volume: 0.08 }),
  // A small bell: a few gentle partials, the higher ones fading first.
  find: (t) => {
    for (const [ratio, volume, seconds] of [
      [1, 0.12, 2.4],
      [2.76, 0.05, 1.4],
      [5.4, 0.025, 0.8],
    ] as const) {
      tone(t, { frequency: 784 * ratio, seconds, volume })
    }
    tone(t, { frequency: 1046.5, start: 0.18, seconds: 2.2, volume: 0.08 })
  },
  done: (t) => {
    tone(t, { frequency: 220, seconds: 0.5, volume: 0.07, type: 'triangle' })
    rustle(t, { seconds: 0.25, from: 1500, to: 700, q: 0.7, volume: 0.04 })
  },
}

/** Notes of a chiptune effect, each a short square-wave blip. */
function blips(t: Target, notes: [frequency: number, start: number][], volume = 0.05, length = 0.07) {
  for (const [frequency, start] of notes) tone(t, { frequency, start, seconds: length, volume, type: 'square' })
}

const CHIP: Record<Effect, (t: Target) => void> = {
  advance: (t) => blips(t, [[988, 0]], 0.035, 0.05),
  open: (t) => blips(t, [
    [523, 0],
    [784, 0.06],
  ]),
  find: (t) => blips(t, [
    [523, 0],
    [659, 0.08],
    [784, 0.16],
    [1047, 0.24],
    [1319, 0.32],
  ], 0.05, 0.12),
  done: (t) => blips(t, [
    [392, 0],
    [523, 0.09],
  ], 0.05, 0.1),
}

/** Plays an effect in a style's voice. */
export function playEffect(target: Target | null, voice: EffectVoice, effect: Effect) {
  if (!target) return
  ;(voice === 'paper' ? PAPER : CHIP)[effect](target)
}
