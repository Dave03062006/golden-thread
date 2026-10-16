import type { Level } from '../content/types'
import type { DeviceSettings } from '../engine/settings'

/**
 * What plays where (spec §11.2, §11.5): from the place in the game, the music settings and
 * the player's own songs, the list of pieces to play. The player's songs are tracks named
 * "song:<id>".
 */

/** Calm music for the title, the menus and settings. */
export const HUB_TRACKS = ['bach-air', 'creation-most-beautiful']

/** Where in the game the player is, for the music. */
export type MusicPlace = { kind: 'hub' } | { kind: 'story' | 'minigame' | 'reflection' | 'quiz'; level: Level }

export const SONG = 'song:'

export interface Playlist {
  tracks: string[]
  /** Free sacred music (which scenes and cues may steer), rather than the player's own songs. */
  free: boolean
}

type MusicSettings = Pick<DeviceSettings, 'musicMode' | 'worshipWay' | 'keepStoryInstrumental'>

/** The songs the player placed on each level, by level number, as song ids. */
export type SongsByLevel = Record<number, string[]>

export function playlistFor(where: MusicPlace, settings: MusicSettings, songs: SongsByLevel): Playlist {
  const ownSongs = settings.musicMode === 'worship' && settings.worshipWay === 'files'
  const forLevel = (level: number) => (songs[level] ?? []).map((id) => `${SONG}${id}`)
  if (where.kind === 'hub') {
    const all = ownSongs
      ? Object.keys(songs)
          .map(Number)
          .sort((a, b) => a - b)
          .flatMap(forLevel)
      : []
    return all.length ? { tracks: all, free: false } : { tracks: HUB_TRACKS, free: true }
  }
  const free = where.level.music[where.kind]
  if (!ownSongs || (where.kind === 'story' && settings.keepStoryInstrumental)) return { tracks: free, free: true }
  const mine = forLevel(where.level.number)
  // A level without songs falls back to its free music, so there's never silence.
  return mine.length ? { tracks: mine, free: false } : { tracks: free, free: true }
}

/** Whether the game's own music is heard at all: not when it's off, or when the player listens along in their app. */
export function musicHeard(settings: MusicSettings): boolean {
  return settings.musicMode === 'sacred' || (settings.musicMode === 'worship' && settings.worshipWay === 'files')
}
