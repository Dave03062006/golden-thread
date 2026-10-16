import { describe, expect, it } from 'vitest'
import { CROSSFADE_SECONDS, Soundtrack, type Deck } from './soundtrack'

/** A pretend deck that records what it's told. Loading takes as long as the test says. */
class FakeDeck implements Deck {
  trackId: string | null = null
  at = 0
  playing = false
  volume = 0
  loads = 0
  fades: [number, number][] = []
  onEnded: (() => void) | null = null
  loadDelay: Promise<void> = Promise.resolve()

  async load(trackId: string, at: number) {
    this.loads++
    this.trackId = trackId
    this.at = at
    await this.loadDelay
  }
  play() {
    this.playing = true
  }
  pause() {
    this.playing = false
  }
  fadeTo(volume: number, seconds: number) {
    this.volume = volume
    this.fades.push([volume, seconds])
  }
}

const TRACKS: Record<string, { id: string; cues?: Record<string, number> }> = {
  chaos: { id: 'chaos' },
  light: { id: 'light', cues: { chord: 121.65 } },
  vanish: { id: 'vanish' },
  air: { id: 'air' },
}

function setup() {
  const decks: [FakeDeck, FakeDeck] = [new FakeDeck(), new FakeDeck()]
  const soundtrack = new Soundtrack({ decks, tracks: (id) => TRACKS[id], wait: () => Promise.resolve() })
  const live = () => decks.find((d) => d.playing && d.volume > 0)
  return { decks, soundtrack, live }
}

/** Lets pending promises (loads, fades) finish. */
const settle = () => new Promise((resolve) => setTimeout(resolve, 0))

describe('Soundtrack', () => {
  it('fades in the first piece of a playlist', async () => {
    const { soundtrack, live } = setup()
    soundtrack.setPlaylist(['chaos', 'light'])
    await settle()
    expect(live()?.trackId).toBe('chaos')
    expect(live()?.fades.at(-1)).toEqual([1, CROSSFADE_SECONDS])
    expect(soundtrack.current).toBe('chaos')
  })

  it('lets a piece play on into a new playlist that includes it', async () => {
    const { soundtrack, decks } = setup()
    soundtrack.setPlaylist(['chaos', 'light'])
    await settle()
    const loads = decks[0].loads + decks[1].loads
    soundtrack.setPlaylist(['air', 'chaos'])
    await settle()
    expect(soundtrack.current).toBe('chaos')
    expect(decks[0].loads + decks[1].loads).toBe(loads)
  })

  it('crossfades from one piece to the next, then stops the old one', async () => {
    const { soundtrack, decks } = setup()
    soundtrack.setPlaylist(['chaos'])
    await settle()
    await soundtrack.play('air')
    const [old, now] = decks[0].trackId === 'chaos' ? decks : [decks[1], decks[0]]
    expect(now.trackId).toBe('air')
    expect(now.playing).toBe(true)
    expect(old.fades.at(-1)).toEqual([0, CROSSFADE_SECONDS])
    expect(old.playing).toBe(false)
  })

  it('moves on to the next piece when one ends, and round again', async () => {
    const { soundtrack, decks } = setup()
    soundtrack.setPlaylist(['chaos', 'vanish'])
    await settle()
    decks.find((d) => d.trackId === 'chaos')!.onEnded!()
    await settle()
    expect(soundtrack.current).toBe('vanish')
    decks.find((d) => d.trackId === 'vanish')!.onEnded!()
    await settle()
    expect(soundtrack.current).toBe('chaos')
  })

  it('lands a cue at once from a piece prepared ahead of time', async () => {
    const { soundtrack, decks } = setup()
    soundtrack.setPlaylist(['chaos'])
    await settle()
    await soundtrack.prepareCue('light', 'chord')
    const waiting = decks.find((d) => d.trackId === 'light')!
    expect(waiting.at).toBeCloseTo(121.65 - 0.08)
    const loads = waiting.loads
    await soundtrack.cue('light', 'chord')
    expect(waiting.loads).toBe(loads)
    expect(waiting.playing).toBe(true)
    expect(waiting.fades.at(-1)![1]).toBeLessThan(0.5)
    expect(soundtrack.current).toBe('light')
  })

  it('ignores a slow load that a newer choice has overtaken', async () => {
    const { soundtrack, decks } = setup()
    let finish = () => {}
    decks[1].loadDelay = new Promise((resolve) => {
      finish = resolve
    })
    const slow = soundtrack.play('chaos')
    decks[1].loadDelay = Promise.resolve()
    await soundtrack.play('air')
    finish()
    await slow
    expect(soundtrack.current).toBe('air')
  })

  it('pauses gently and resumes', async () => {
    const { soundtrack, live } = setup()
    soundtrack.setPlaylist(['chaos'])
    await settle()
    const deck = live()!
    await soundtrack.pause()
    expect(deck.playing).toBe(false)
    soundtrack.resume()
    expect(deck.playing).toBe(true)
    expect(deck.volume).toBe(1)
  })

  it('goes quiet when switched off, and comes back', async () => {
    const { soundtrack, decks } = setup()
    soundtrack.setPlaylist(['chaos'])
    await settle()
    soundtrack.setEnabled(false)
    await settle()
    expect(soundtrack.current).toBeNull()
    expect(decks.every((d) => !d.playing)).toBe(true)
    soundtrack.setEnabled(true)
    expect(soundtrack.current).toBe('chaos')
  })

  it('tells listeners what is playing', async () => {
    const { soundtrack } = setup()
    const heard: (string | null)[] = []
    soundtrack.subscribe((id) => heard.push(id))
    soundtrack.setPlaylist(['chaos'])
    await settle()
    await soundtrack.play('air')
    expect(heard).toEqual(['chaos', 'air'])
  })
})
