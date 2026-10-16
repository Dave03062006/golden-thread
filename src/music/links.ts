import type { MusicApp } from '../engine/settings'

/**
 * Listening along in the player's own music app (spec §11.4): links that open a song (or
 * a playlist the player pasted) in Spotify, Apple Music, YouTube Music or YouTube. The
 * game itself never streams these songs; those services don't allow games to (spec §12.4).
 */

export const MUSIC_APPS: Record<MusicApp, { name: string; search: (query: string) => string }> = {
  spotify: { name: 'Spotify', search: (q) => `https://open.spotify.com/search/${encodeURIComponent(q)}` },
  'apple-music': { name: 'Apple Music', search: (q) => `https://music.apple.com/us/search?term=${encodeURIComponent(q)}` },
  'youtube-music': { name: 'YouTube Music', search: (q) => `https://music.youtube.com/search?q=${encodeURIComponent(q)}` },
  youtube: { name: 'YouTube', search: (q) => `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}` },
}

/** Opens a song in an app: a search for its title and artist, which finds it straight away. */
export function songLink(app: MusicApp, title: string, artist: string): string {
  return MUSIC_APPS[app].search(`${title} ${artist}`)
}

/** Where to buy a song, so it can be played in the game. */
export function buyLinks(title: string, artist: string): { name: string; url: string }[] {
  const q = encodeURIComponent(`${title} ${artist}`)
  return [
    { name: 'iTunes Store', url: `https://music.apple.com/us/search?term=${q}` },
    { name: 'Amazon Music', url: `https://www.amazon.com/s?k=${q}&i=digital-music` },
    { name: 'Bandcamp', url: `https://bandcamp.com/search?q=${q}` },
  ]
}

/** Which app a pasted playlist link belongs to, or null if it isn't a playlist link the game knows. */
export function playlistApp(link: string): MusicApp | null {
  let url: URL
  try {
    url = new URL(link.trim())
  } catch {
    return null
  }
  if (url.protocol !== 'https:') return null
  const host = url.hostname.replace(/^www\./, '')
  if (host === 'open.spotify.com' && /^\/(intl-[a-z-]+\/)?playlist\/[A-Za-z0-9]+/.test(url.pathname)) return 'spotify'
  if (host === 'music.apple.com' && /\/playlist\//.test(url.pathname)) return 'apple-music'
  if (host === 'music.youtube.com' && url.searchParams.has('list')) return 'youtube-music'
  if ((host === 'youtube.com' || host === 'm.youtube.com') && url.searchParams.has('list')) return 'youtube'
  return null
}
