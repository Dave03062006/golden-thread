import { WORSHIP_SONGS, type WorshipSong } from './recommendations'

/**
 * Matching the player's own songs to the recommended ones (spec §11.4), by the title and
 * artist read from each file's tags. The same song is written many ways ("So Will I (100
 * Billion X) [Live]", "02 - so will i", "Hillsong UNITED feat. ..."), so both sides are
 * first reduced to their plain words, then compared by how many letter pairs they share.
 */

/** Words that describe a version of a song rather than the song itself. */
const VERSION_WORDS = /\b(live|acoustic|version|remaster(ed)?|radio edit|edit|single|deluxe|demo|instrumental|reprise|official|audio|video|lyrics?|studio|mono|stereo)\b/g

/** Reduces a title to its plain words: no brackets, versions, featured artists, numbers or punctuation. */
export function normalizeTitle(raw: string): string {
  return plain(
    raw
      .replace(/\.(mp3|m4a|aac|flac|ogg|oga|opus|wav|aiff?|wma|webm)$/i, '')
      .replace(/^\s*(?:\d{1,3}|[a-d]\d{1,2})\s*[-–—._)\]]\s*/i, '')
      // A track number and a space: "03 Jireh" (but not "10,000 Reasons").
      .replace(/^\s*\d{1,3}\s+(?=[^\d\s,.])/, '')
      .replace(/[([{][^)\]}]*[)\]}]/g, ' ')
      .replace(/\s[-–—]\s.*$/, ' ')
      .replace(/\b(feat|ft|featuring)\b\.?.*$/i, ' '),
  ).replace(VERSION_WORDS, ' ').replace(/\s+/g, ' ').trim()
}

/** Reduces an artist to their plain name, without featured guests. */
export function normalizeArtist(raw: string): string {
  return plain(raw.replace(/\b(feat|ft|featuring|with)\b\.?.*$/i, ' ').replace(/[([{][^)\]}]*[)\]}]/g, ' '))
}

function plain(text: string): string {
  return text
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[’'`]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/** How alike two strings are, from 0 to 1, by the pairs of letters they share (the Dice coefficient). */
export function similarity(a: string, b: string): number {
  if (a === b) return a ? 1 : 0
  const pairs = (s: string) => {
    const list: string[] = []
    const t = s.replace(/ /g, '')
    for (let i = 0; i < t.length - 1; i++) list.push(t.slice(i, i + 2))
    return list
  }
  const left = pairs(a)
  const right = pairs(b)
  if (left.length === 0 || right.length === 0) return 0
  const counts = new Map<string, number>()
  for (const p of left) counts.set(p, (counts.get(p) ?? 0) + 1)
  let shared = 0
  for (const p of right) {
    const n = counts.get(p) ?? 0
    if (n > 0) {
      shared++
      counts.set(p, n - 1)
    }
  }
  return (2 * shared) / (left.length + right.length)
}

/** At or above this, a match is accepted with the others in one tap. */
export const SURE = 0.86
/** Between this and SURE, the game asks: "Is this the song?" */
export const CLOSE = 0.6

export interface SongFile {
  id: string
  title: string
  artist?: string
}

export interface Match {
  file: SongFile
  song: WorshipSong
  score: number
  /** Sure enough to accept without asking. */
  sure: boolean
}

/** How well a file matches a recommended song: mostly the title, helped (or hurt) by the artist. */
export function score(file: SongFile, song: WorshipSong): number {
  const title = similarity(normalizeTitle(file.title), normalizeTitle(song.title))
  if (!file.artist) return title * 0.95
  const fileArtist = normalizeArtist(file.artist)
  const artists = song.artist.split(/\s*(?:&|,| and )\s*/).map(normalizeArtist)
  const artist = Math.max(...artists.map((a) => Math.max(similarity(fileArtist, a), fileArtist.includes(a) || a.includes(fileArtist) ? 1 : 0)))
  return title * 0.8 + artist * 0.2
}

/** The best recommended song for each file that matches at all, sure or close. */
export function matchSongs(files: SongFile[], songs: WorshipSong[] = WORSHIP_SONGS): Match[] {
  const matches: Match[] = []
  for (const file of files) {
    let best: Match | null = null
    for (const song of songs) {
      const s = score(file, song)
      if (s >= CLOSE && (!best || s > best.score)) best = { file, song, score: s, sure: s >= SURE }
    }
    if (best) matches.push(best)
  }
  return matches
}

/** "Matched 31 songs to 34 levels." */
export function describeMatches(matches: Match[]): string {
  const songs = new Set(matches.map((m) => m.file.id)).size
  const levels = new Set(matches.map((m) => m.song.level)).size
  return `Matched ${songs} ${songs === 1 ? 'song' : 'songs'} to ${levels} ${levels === 1 ? 'level' : 'levels'}.`
}
