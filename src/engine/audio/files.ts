/**
 * Where the game's music files are (spec §13.11). During development they come from the
 * local, git-ignored `media/` folder (prepared by `npm run media`); for the finished game,
 * VITE_MEDIA_URL points at the music host.
 */
export const MEDIA_BASE: string = (import.meta.env.VITE_MEDIA_URL as string | undefined)?.replace(/\/$/, '') ?? '/media'

/** Opus where the browser plays it (almost everywhere), AAC for older Safari. */
function musicFormat(): 'webm' | 'm4a' {
  if (typeof document === 'undefined') return 'webm'
  const probe = document.createElement('audio')
  return probe.canPlayType('audio/webm; codecs="opus"') ? 'webm' : 'm4a'
}

let format: 'webm' | 'm4a' | null = null

export function musicUrl(trackId: string): string {
  format ??= musicFormat()
  return `${MEDIA_BASE}/music/${trackId}.${format}`
}
