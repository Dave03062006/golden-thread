import { useEffect, useRef } from 'react'
import { formatReference } from '../../content/bible/books'
import { placeById } from '../../content/geography'
import { threadById } from '../../content/threads'
import type { Episode } from '../../content/types'
import type { HistoryLine } from '../../scene/director'
import { Button, Dialog, Toggle } from '../../ui/components'
import { Line, Quote } from './Line'

/** Every line of the episode so far, to read back over (spec §3.2). */
export function HistoryDialog({ open, lines, onClose }: { open: boolean; lines: HistoryLine[]; onClose: () => void }) {
  const endRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ block: 'end' })
  }, [open, lines.length])
  return (
    <Dialog open={open} title="The story so far" onClose={onClose} wide>
      <div className="history">
        {lines.map((line, i) => (
          <div key={i} className="history-line" data-new-scene={i > 0 && lines[i - 1]!.scene !== line.scene ? true : undefined}>
            <Line beat={line.beat} />
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div className="ui-dialog-actions">
        <Button variant="primary" onClick={onClose}>
          Back to the story
        </Button>
      </div>
    </Dialog>
  )
}

/** Where and when: the place, the time and the world behind the story (spec §3.2). */
export function WhereWhenDialog({ open, episode, onClose }: { open: boolean; episode: Episode; onClose: () => void }) {
  const { whereWhen } = episode
  const places = whereWhen.places.map(placeById).filter((p) => p !== undefined)
  return (
    <Dialog open={open} title="Where and when" onClose={onClose} wide>
      <dl className="where-when">
        <div>
          <dt>When</dt>
          <dd>{whereWhen.when}</dd>
        </div>
        <div>
          <dt>Where</dt>
          <dd>
            {places.length === 0
              ? 'Before any place: the whole of creation.'
              : places.map((place) => (
                  <span key={place.id} className="where-place">
                    <strong>{place.name}</strong>
                    {place.unknown && ' (its place is unknown today)'}
                    {place.note && <> · {place.note}</>}
                  </span>
                ))}
          </dd>
        </div>
      </dl>
      {whereWhen.notes.map((note) => (
        <section key={note.title} className="where-note">
          <h3>{note.title}</h3>
          <p>{note.text}</p>
        </section>
      ))}
      <div className="ui-dialog-actions">
        <Button variant="primary" onClick={onClose}>
          Back to the story
        </Button>
      </div>
    </Dialog>
  )
}

/** A golden thread, found: this moment, and the moment in Christ it points to (spec §3.2). */
export function ThreadDialog({ open, threadId, onClose }: { open: boolean; threadId: string; onClose: () => void }) {
  const thread = threadById(threadId)
  if (!thread) return null
  return (
    <Dialog open={open} title="A golden thread" onClose={onClose} wide>
      <p className="thread-title">{thread.title}</p>
      <div className="thread-sides">
        <section aria-label="In the Old Testament">
          <h3>Here</h3>
          {thread.from.map((ref) => (
            <Quote key={ref} refText={ref} as="blockquote" />
          ))}
        </section>
        <section aria-label="In the New Testament">
          <h3>Fulfilled in Christ</h3>
          {thread.to.map((ref) => (
            <Quote key={ref} refText={ref} as="blockquote" />
          ))}
        </section>
      </div>
      <p className="thread-explanation">{thread.explanation}</p>
      <p className="ui-note">Source: {thread.sources.join('; ')}.</p>
      <div className="ui-dialog-actions">
        <Button variant="primary" onClick={onClose}>
          Keep this thread
        </Button>
      </div>
    </Dialog>
  )
}

/** The end of an episode: read it in your Bible, and what was found (spec §3.2). */
export function EpisodeEndDialog({
  open,
  episode,
  threadFound,
  readMarks,
  onToggleRead,
  onShowThread,
  onReplay,
  onContinue,
  continueLabel,
}: {
  open: boolean
  episode: Episode
  threadFound: boolean
  readMarks: string[]
  onToggleRead: (mark: string, read: boolean) => void
  onShowThread: () => void
  onReplay: () => void
  onContinue: () => void
  continueLabel: string
}) {
  return (
    <Dialog open={open} title={`Episode ${episode.number} complete: ${episode.title}`} onClose={onContinue} wide>
      <section className="end-section">
        <h3>Read it in your Bible</h3>
        <p>Take your time with the words themselves. They say more than any retelling.</p>
        {episode.read.map((ref) => {
          const mark = `${episode.id}:${ref}`
          return <Toggle key={ref} label={`I’ve read ${formatReference(ref)}`} checked={readMarks.includes(mark)} onChange={(read) => onToggleRead(mark, read)} />
        })}
      </section>
      <section className="end-section">
        <h3>The golden thread</h3>
        {threadFound ? (
          <>
            <p>You found this episode’s golden thread.</p>
            <Button variant="quiet" onClick={onShowThread}>
              See it again
            </Button>
          </>
        ) : (
          <>
            <p>A golden thread was hidden in this episode: something that kept glowing. You can look for it again.</p>
            <Button variant="quiet" onClick={onReplay}>
              Play the episode again
            </Button>
          </>
        )}
      </section>
      <div className="ui-dialog-actions">
        <Button variant="primary" onClick={onContinue}>
          {continueLabel}
        </Button>
      </div>
    </Dialog>
  )
}
