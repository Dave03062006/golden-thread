import { verseText } from '../../content/bible/verses'
import type { Beat } from '../../scene/types'

/** The words of a line, for reading aloud. */
export function spokenText(beat: Beat): string {
  if (beat.kind === 'say') return beat.text.replaceAll('LORD', 'Lord')
  if (beat.kind === 'verse') return verseText(beat.ref).replaceAll('LORD', 'Lord')
  return ''
}
