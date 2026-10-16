import type { Deck } from './soundtrack'

/**
 * Where the sound comes out (spec §13.10), using the browser's Web Audio:
 *
 *   deck A ─┐
 *            ├─ music volume ─ duck (softer under the read-aloud voice) ─┐
 *   deck B ─┘                                                            ├─ speakers
 *   sound effects ─ effects volume ─────────────────────────────────────┘
 *
 * Browsers only allow sound after the player has tapped or pressed a key, so the audio
 * engine starts on the first one (`unlock`). Music streams from audio elements, so a
 * long piece starts playing before it has fully downloaded.
 */

/** Where a piece's file is: the game's own music by id, or one of the player's songs (read from storage). */
export type UrlFor = (trackId: string) => string | undefined | Promise<string | undefined>

/** How long a volume change takes when it isn't a fade: quick, but not a click. */
const SMOOTH = 0.05

class WebDeck implements Deck {
  readonly element: HTMLAudioElement
  private gain: GainNode | null = null
  private context: AudioContext | null = null
  private volume = 0
  private loading: Promise<void> | null = null
  private readonly urlFor: UrlFor
  trackId: string | null = null
  onEnded: (() => void) | null = null

  constructor(urlFor: UrlFor) {
    this.urlFor = urlFor
    this.element = new Audio()
    this.element.preload = 'auto'
    this.element.crossOrigin = 'anonymous'
    this.element.addEventListener('ended', () => this.onEnded?.())
  }

  /** Joins the Web Audio graph once it exists. Before that, the element plays on its own. */
  connect(context: AudioContext, destination: AudioNode) {
    if (this.gain) return
    this.context = context
    this.gain = context.createGain()
    this.gain.gain.value = this.volume
    context.createMediaElementSource(this.element).connect(this.gain).connect(destination)
    this.element.volume = 1
  }

  async load(trackId: string, at: number): Promise<void> {
    this.trackId = trackId
    const url = await this.urlFor(trackId)
    if (!url) throw new Error(`No file for ${trackId}`)
    if (this.trackId !== trackId) return
    const element = this.element
    const job = new Promise<void>((resolve) => {
      const ready = () => {
        element.removeEventListener('canplay', ready)
        resolve()
      }
      const seek = () => {
        element.removeEventListener('loadedmetadata', seek)
        element.currentTime = Math.min(at, Math.max(0, (element.duration || at) - 0.5))
        if (element.readyState >= 3) resolve()
        else element.addEventListener('canplay', ready)
      }
      element.pause()
      if (element.src.endsWith(url) && element.readyState >= 1) {
        seek()
        return
      }
      element.addEventListener('loadedmetadata', seek)
      element.src = url
      element.load()
    })
    this.loading = job
    return job
  }

  play() {
    void this.element.play().catch(() => {
      // Not allowed yet (no tap so far): it starts when the audio unlocks.
    })
  }

  pause() {
    this.element.pause()
  }

  fadeTo(volume: number, seconds: number) {
    this.volume = volume
    if (!this.gain || !this.context) {
      this.element.volume = volume
      return
    }
    const now = this.context.currentTime
    const param = this.gain.gain
    param.cancelScheduledValues(now)
    param.setValueAtTime(param.value, now)
    param.linearRampToValueAtTime(volume, now + Math.max(seconds, SMOOTH))
  }

  get busy() {
    return this.loading
  }
}

export class AudioOutput {
  private context: AudioContext | null = null
  private musicGain: GainNode | null = null
  private duckGain: GainNode | null = null
  private effectsGain: GainNode | null = null
  private musicVolume = 0.8
  private effectsVolume = 0.8
  readonly decks: [WebDeck, WebDeck]

  constructor(urlFor: UrlFor) {
    this.decks = [new WebDeck(urlFor), new WebDeck(urlFor)]
  }

  get unlocked(): boolean {
    return this.context?.state === 'running'
  }

  /** Starts Web Audio, after the player's first tap or key press. */
  unlock(): void {
    if (typeof AudioContext === 'undefined') return
    if (!this.context) {
      const context = new AudioContext()
      this.context = context
      this.musicGain = context.createGain()
      this.duckGain = context.createGain()
      this.effectsGain = context.createGain()
      this.musicGain.gain.value = this.musicVolume
      this.effectsGain.gain.value = this.effectsVolume
      this.musicGain.connect(this.duckGain).connect(context.destination)
      this.effectsGain.connect(context.destination)
      for (const deck of this.decks) deck.connect(context, this.musicGain)
    }
    if (this.context.state === 'suspended') void this.context.resume()
  }

  /** For sound effects: the audio context and where effects go, once unlocked. */
  get effects(): { context: AudioContext; destination: AudioNode } | null {
    return this.context && this.effectsGain ? { context: this.context, destination: this.effectsGain } : null
  }

  setMusicVolume(volume: number) {
    this.musicVolume = volume
    this.ramp(this.musicGain, volume)
  }

  setEffectsVolume(volume: number) {
    this.effectsVolume = volume
    this.ramp(this.effectsGain, volume)
  }

  /** Softer music while the read-aloud voice speaks (spec §11.5). */
  duck(on: boolean) {
    this.ramp(this.duckGain, on ? 0.35 : 1, on ? 0.3 : 0.8)
  }

  private ramp(node: GainNode | null, value: number, seconds = 0.2) {
    if (!node || !this.context) return
    const now = this.context.currentTime
    node.gain.cancelScheduledValues(now)
    node.gain.setValueAtTime(node.gain.value, now)
    node.gain.linearRampToValueAtTime(value, now + seconds)
  }
}
