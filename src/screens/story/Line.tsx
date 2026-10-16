import { Fragment } from 'react'
import { formatReference } from '../../content/bible/books'
import { ACTIVE_TRANSLATION, TRANSLATIONS, verseText } from '../../content/bible/verses'
import type { Beat } from '../../scene/types'

/**
 * Text with God's holy name printed as the RSV prints it: "LORD" in small capitals.
 * (The pixel style's fonts have no small capitals, so it simply stays in capitals there.)
 */
export function Scripture({ text }: { text: string }) {
  const parts = text.split('LORD')
  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {i > 0 && <span className="divine-name">Lord</span>}
          {part}
        </Fragment>
      ))}
    </>
  )
}

/** A quotation, with its reference and translation. */
export function Quote({ refText, as = 'p' }: { refText: string; as?: 'p' | 'blockquote' }) {
  const Tag = as
  return (
    <figure className="verse">
      <figcaption className="verse-ref">
        {formatReference(refText)} · {TRANSLATIONS[ACTIVE_TRANSLATION].short}
      </figcaption>
      <Tag className="verse-text">
        <Scripture text={verseText(refText)} />
      </Tag>
    </figure>
  )
}

/** One line of the story: our retelling, or an exact quotation. */
export function Line({ beat }: { beat: Beat }) {
  if (beat.kind === 'verse') return <Quote refText={beat.ref} />
  if (beat.kind === 'say') return <p className="narration-text">{beat.text}</p>
  return null
}
