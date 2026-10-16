/**
 * The soundtrack: which piece plays, and how one piece gives way to the next (spec §11.5).
 *
 * - Pieces crossfade over a few seconds and never cut.
 * - A playlist follows the moment (story, menus, the quiz). When a piece ends, the next
 *   in the playlist begins. Changing to a playlist that includes the piece already
 *   playing lets it play on, so music continues across scenes instead of restarting.
 * - A cue lands a chosen moment of a piece on a story beat, like Haydn's chord on "and
 *   there was light". The piece is loaded ahead of time, so it can start at once.
 *
 * It only decides; the sound itself comes out of two "decks" (see output.ts), one
 * playing while the other waits to fade in. Tests use pretend decks.
 */

/** One of the two players that take turns, so one piece can fade into the next. */
export interface Deck {
  /** Loads a piece, ready to start `at` seconds in. Resolves once it can play at once. */
  load(trackId: string, at: number): Promise<void>
  readonly trackId: string | null
  play(): void
  pause(): void
  /** Fades to a volume (0 to 1) over `seconds`; 0 seconds is at once. */
  fadeTo(volume: number, seconds: number): void
  /** Called when the piece reaches its end. */
  onEnded: (() => void) | null
}

export interface TrackInfo {
  id: string
  /** Moments in the piece, in seconds, by name. */
  cues?: Record<string, number>
}

export interface SoundtrackOptions {
  decks: [Deck, Deck]
  tracks: (id: string) => TrackInfo | undefined
  /** Waits a number of seconds. Tests pass a fake. */
  wait?: (seconds: number) => Promise<void>
}

/** How long a piece takes to give way to the next. */
export const CROSSFADE_SECONDS = 2.5
/** A cue arrives fast: the old piece gets out of the way quickly, the new one is there at once. */
const CUE_FADE_SECONDS = 0.4
/** A cued piece starts this much before its moment, so the moment itself isn't clipped. */
const CUE_LEAD_SECONDS = 0.08

export type NowPlayingListener = (trackId: string | null) => void

export class Soundtrack {
  private readonly decks: [Deck, Deck]
  private readonly tracks: (id: string) => TrackInfo | undefined
  private readonly wait: (seconds: number) => Promise<void>
  /** Which deck is playing now. */
  private live = 0
  private playlist: string[] = []
  private paused = false
  private enabled = true
  /** Counts changes, so a slow load that finishes after a newer change is ignored. */
  private generation = 0
  /** Where the waiting deck was loaded to start, by `prepare`, or null. */
  private preparedAt: number | null = null
  private listeners = new Set<NowPlayingListener>()

  constructor({ decks, tracks, wait = (s) => new Promise((r) => setTimeout(r, s * 1000)) }: SoundtrackOptions) {
    this.decks = decks
    this.tracks = tracks
    this.wait = wait
    decks.forEach((deck, i) => {
      deck.onEnded = () => this.ended(i)
    })
  }

  /** The piece playing now, if any. */
  get current(): string | null {
    return this.enabled ? this.decks[this.live]!.trackId : null
  }

  subscribe(listener: NowPlayingListener): () => void {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  /**
   * Plays from a list of pieces. If the piece playing now is on the list, it plays on;
   * otherwise `start` (or the first piece) fades in.
   */
  setPlaylist(ids: string[], start?: string): void {
    this.playlist = ids.filter((id) => this.tracks(id))
    const now = this.decks[this.live]!.trackId
    if (now && this.playlist.includes(now) && !start) return
    const first = start && this.playlist.includes(start) ? start : this.playlist[0]
    if (first && first !== now) void this.play(first)
  }

  /** Fades to a piece, starting `at` seconds in. */
  async play(trackId: string, { at = 0, fade = CROSSFADE_SECONDS }: { at?: number; fade?: number } = {}): Promise<void> {
    if (!this.tracks(trackId)) return
    const generation = ++this.generation
    const incoming = this.decks[1 - this.live]!
    const outgoing = this.decks[this.live]!
    if (incoming.trackId !== trackId || this.preparedAt !== at) await incoming.load(trackId, at)
    this.preparedAt = null
    if (generation !== this.generation) return
    this.live = 1 - this.live
    if (!this.enabled) return
    incoming.fadeTo(0, 0)
    if (!this.paused) incoming.play()
    incoming.fadeTo(1, fade)
    outgoing.fadeTo(0, fade)
    this.announce()
    await this.wait(fade)
    if (generation === this.generation) outgoing.pause()
  }

  /** Loads a piece into the waiting deck, ready to start `at` seconds in without delay. */
  async prepare(trackId: string, at = 0): Promise<void> {
    const waiting = this.decks[1 - this.live]!
    if (waiting.trackId === trackId && this.preparedAt === at) return
    this.preparedAt = at
    await waiting.load(trackId, at)
  }

  /** Where a cue sits, in seconds into its piece, a moment early so it isn't clipped. */
  cueStart(trackId: string, cue: string): number | undefined {
    const at = this.tracks(trackId)?.cues?.[cue]
    return at === undefined ? undefined : Math.max(0, at - CUE_LEAD_SECONDS)
  }

  /** Gets a cue ready, so that `cue()` can start it at once. */
  prepareCue(trackId: string, cue: string): Promise<void> {
    const at = this.cueStart(trackId, cue)
    return at === undefined ? Promise.resolve() : this.prepare(trackId, at)
  }

  /** Lands a moment of a piece now: the old piece steps quickly aside. */
  cue(trackId: string, cue: string): Promise<void> {
    const at = this.cueStart(trackId, cue)
    if (at === undefined) return Promise.resolve()
    return this.play(trackId, { at, fade: CUE_FADE_SECONDS })
  }

  /** Starts the piece that should be playing, if the browser stopped it (before the first tap). */
  wake(): void {
    const deck = this.decks[this.live]!
    if (this.paused || !this.enabled || !deck.trackId) return
    deck.play()
    deck.fadeTo(1, 1)
  }

  /** Pauses the music, gently. */
  async pause(): Promise<void> {
    if (this.paused) return
    this.paused = true
    const deck = this.decks[this.live]!
    deck.fadeTo(0, 0.5)
    await this.wait(0.5)
    if (this.paused) deck.pause()
  }

  resume(): void {
    if (!this.paused) return
    this.paused = false
    const deck = this.decks[this.live]!
    if (!deck.trackId || !this.enabled) return
    deck.play()
    deck.fadeTo(1, 1)
  }

  /** Turns the soundtrack off (the music setting "Off", or listening along in another app) and back on. */
  setEnabled(enabled: boolean): void {
    if (enabled === this.enabled) return
    this.enabled = enabled
    const deck = this.decks[this.live]!
    if (!enabled) {
      deck.fadeTo(0, 1)
      void this.wait(1).then(() => {
        if (!this.enabled) deck.pause()
      })
    } else if (deck.trackId) {
      if (!this.paused) deck.play()
      deck.fadeTo(1, 1.5)
    } else if (this.playlist[0]) {
      void this.play(this.playlist[0])
    }
    this.announce()
  }

  /** A piece ended: the next on the playlist begins. */
  private ended(deck: number) {
    if (deck !== this.live || this.playlist.length === 0) return
    const now = this.decks[this.live]!.trackId
    const index = now ? this.playlist.indexOf(now) : -1
    const next = this.playlist[(index + 1) % this.playlist.length]!
    void this.play(next, { fade: 1.5 })
  }

  private announce() {
    for (const listener of this.listeners) listener(this.current)
  }
}
