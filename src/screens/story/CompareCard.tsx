import { useEffect, useRef } from 'react'
import type { Compare } from '../../minigames/framework'
import { Button } from '../../ui/components'
import { Scripture } from './Line'

/**
 * Two passages side by side over the scene, for "Spot the twist": the words as God gave
 * them on the left, and on the right the words as they were twisted, where each phrase is
 * tappable. A found twist stays lit. Tab and Enter work through the phrases; when all are
 * found, Continue takes the keyboard's focus.
 */
export function CompareCard({ compare, choose, finish }: { compare: Compare; choose: (part: string) => void; finish: () => void }) {
  const first = useRef<HTMLSpanElement>(null)
  const go = useRef<HTMLButtonElement>(null)
  const { left, right, found, note, showTwists, finished } = compare

  useEffect(() => {
    first.current?.focus({ preventScroll: true })
  }, [])

  useEffect(() => {
    if (finished) go.current?.focus({ preventScroll: true })
  }, [finished])

  const firstPart = right.lines.flatMap((line) => line.parts).find((part) => part.kind !== 'mark')?.id
  return (
    <section className="play-compare" aria-label="Spot the twist" onPointerDown={(event) => event.stopPropagation()}>
      <p className="play-compare-instruction">{compare.instruction}</p>
      <div className="play-compare-sides">
        <figure className="play-compare-side">
          <figcaption>
            {left.title}
            <small>{left.reference}</small>
          </figcaption>
          <blockquote>
            <Scripture text={left.text} />
          </blockquote>
        </figure>
        <figure className="play-compare-side">
          <figcaption>
            {right.title}
            <small>{right.reference}</small>
          </figcaption>
          {right.lines.map((line, i) => (
            <p key={i} className="play-compare-line">
              <span className="play-compare-speaker">{line.speaker}: </span>
              {line.parts.map((part) => {
                if (part.kind === 'mark') return <span key={part.id}>{part.text}</span>
                // A span rather than a button, so a phrase can wrap across lines with
                // the sentence around it; it behaves as a button for keys and screen readers.
                return (
                  <span
                    key={part.id}
                    ref={part.id === firstPart ? first : undefined}
                    // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role -- a <button> can't wrap across lines inside a sentence
                    role="button"
                    tabIndex={0}
                    className="play-compare-part"
                    aria-pressed={found.includes(part.id)}
                    data-hint={(showTwists && part.kind === 'twist') || undefined}
                    onClick={() => choose(part.id)}
                    onKeyDown={(event) => {
                      if (event.key !== 'Enter' && event.key !== ' ') return
                      event.preventDefault()
                      if (!event.repeat) choose(part.id)
                    }}
                  >
                    <Scripture text={part.text} />
                  </span>
                )
              })}
            </p>
          ))}
        </figure>
      </div>
      <output className="play-choice-feedback" data-right={note?.right || undefined} aria-live="polite">
        {note?.text}
      </output>
      {finished && (
        <Button ref={go} variant="primary" className="play-compare-continue" onClick={finish}>
          Continue
        </Button>
      )}
    </section>
  )
}
