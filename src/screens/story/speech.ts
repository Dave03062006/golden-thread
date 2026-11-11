import { verseText } from '../../content/bible/verses'
import { MEDIA_BASE } from '../../engine/audio/files'
import type { Beat } from '../../scene/types'

/** The words of a line, for reading aloud. */
export function spokenText(beat: Beat): string {
  if (beat.kind === 'say') return beat.text.replaceAll('LORD', 'Lord')
  if (beat.kind === 'verse') return verseText(beat.ref).replaceAll('LORD', 'Lord')
  return ''
}

/**
 * A recorded line's name, from its words (FNV-1a), so a recording follows its text: change the
 * words and the line is simply recorded again (scripts/narrate.py).
 */
export function narrationId(text: string): string {
  let hash = 0x811c9dc5
  for (let i = 0; i < text.length; i++) {
    hash ^= text.charCodeAt(i)
    hash = Math.imul(hash, 0x01000193) >>> 0
  }
  return `${hash.toString(16).padStart(8, '0')}-${text.length}`
}

/** Where a line's recording is, with the music (media/voice/, or the music host). */
export function narrationUrl(text: string): string {
  return `${MEDIA_BASE}/voice/${narrationId(text)}.mp3`
}
