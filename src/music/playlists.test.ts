import { describe, expect, it } from 'vitest'
import { level1 } from '../content/levels/01-creation-and-fall/level'
import { HUB_TRACKS, musicHeard, playlistFor } from './playlists'

const sacred = { musicMode: 'sacred', worshipWay: null, keepStoryInstrumental: true } as const
const ownSongs = { musicMode: 'worship', worshipWay: 'files', keepStoryInstrumental: false } as const
const songs = { 1: ['so-will-i', 'indescribable'], 4: ['goodness'] }

describe('what plays where', () => {
  it('plays the level’s free music in each part of it', () => {
    expect(playlistFor({ kind: 'story', level: level1 }, sacred, songs)).toEqual({ tracks: level1.music.story, free: true })
    expect(playlistFor({ kind: 'reflection', level: level1 }, sacred, songs).tracks).toEqual(level1.music.reflection)
    expect(playlistFor({ kind: 'hub' }, sacred, songs)).toEqual({ tracks: HUB_TRACKS, free: true })
  })

  it('plays the player’s own songs for a level, in their order', () => {
    expect(playlistFor({ kind: 'story', level: level1 }, ownSongs, songs)).toEqual({ tracks: ['song:so-will-i', 'song:indescribable'], free: false })
    expect(playlistFor({ kind: 'quiz', level: level1 }, ownSongs, songs).tracks).toEqual(['song:so-will-i', 'song:indescribable'])
  })

  it('keeps story scenes instrumental when asked, with songs everywhere else', () => {
    const instrumental = { ...ownSongs, keepStoryInstrumental: true }
    expect(playlistFor({ kind: 'story', level: level1 }, instrumental, songs).free).toBe(true)
    expect(playlistFor({ kind: 'minigame', level: level1 }, instrumental, songs).free).toBe(false)
  })

  it('falls back to free music for a level without songs, so there’s never silence', () => {
    expect(playlistFor({ kind: 'story', level: level1 }, ownSongs, { 4: ['goodness'] })).toEqual({ tracks: level1.music.story, free: true })
    expect(playlistFor({ kind: 'hub' }, ownSongs, {})).toEqual({ tracks: HUB_TRACKS, free: true })
  })

  it('plays every placed song in the menus, by level', () => {
    expect(playlistFor({ kind: 'hub' }, ownSongs, { 4: ['goodness'], 1: ['so-will-i'] }).tracks).toEqual(['song:so-will-i', 'song:goodness'])
  })

  it('is silent when the music is off, or when listening along in another app', () => {
    expect(musicHeard(sacred)).toBe(true)
    expect(musicHeard(ownSongs)).toBe(true)
    expect(musicHeard({ ...sacred, musicMode: 'off' })).toBe(false)
    expect(musicHeard({ musicMode: 'worship', worshipWay: 'listen-along', keepStoryInstrumental: true })).toBe(false)
  })
})
