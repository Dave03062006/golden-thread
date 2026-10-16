import { describe, expect, it } from 'vitest'
import { LEVELS } from '../content/catalog'
import { ALLOWED_LICENSES, TRACKS, trackById } from './catalog'

// Every free track must carry an allowed license and a credit (spec §12.3), and every
// piece the levels ask for must be in the catalog.

describe.each(TRACKS.map((t) => [t.id, t] as const))('track %s', (_id, track) => {
  it('has an allowed license: public domain, CC0 or CC BY', () => {
    expect(ALLOWED_LICENSES).toContain(track.license)
    expect(track.licenseNote.trim()).not.toBe('')
  })

  it('has a credit line, a source and a download address', () => {
    expect(track.credit.trim()).not.toBe('')
    expect(track.source).toMatch(/^https:\/\//)
    expect(track.download).toMatch(/^https:\/\//)
  })

  it('puts its cues inside the piece', () => {
    for (const at of Object.values(track.cues ?? {})) expect(at).toBeGreaterThan(0)
  })
})

describe('the catalog', () => {
  it('uses each id once', () => {
    expect(new Set(TRACKS.map((t) => t.id)).size).toBe(TRACKS.length)
  })
})

describe.each(LEVELS.map((l) => [l.id, l] as const))('level %s', (_id, level) => {
  const { music } = level

  it('only plays pieces in the catalog', () => {
    const named = [...music.story, ...music.minigame, ...music.reflection, ...music.quiz]
    const scenes = level.episodes.flatMap((e) => e.scenes.flatMap((s) => (s.music ? [s.music] : [])))
    expect([...named, ...scenes].filter((id) => !trackById(id))).toEqual([])
  })

  it('has music for every part of the level', () => {
    for (const list of [music.story, music.minigame, music.reflection, music.quiz]) expect(list.length).toBeGreaterThan(0)
  })

  it('lands every story cue on a real moment of a real piece', () => {
    const events = level.episodes.flatMap((e) => e.scenes.flatMap((s) => s.beats.flatMap((b) => b.events ?? [])))
    for (const event of events.filter((e) => e.startsWith('music:'))) {
      const cue = music.cues[event.slice('music:'.length)]
      expect(cue, `${event} has no cue`).toBeDefined()
      expect(trackById(cue!.track)?.cues?.[cue!.cue], `${event} lands nowhere`).toBeGreaterThan(0)
    }
  })
})
