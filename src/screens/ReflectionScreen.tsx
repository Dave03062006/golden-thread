import { useEffect, useId, useRef, useState } from 'react'
import { setMusicPlace } from '../app/audio'
import { useApp } from '../app/store'
import { formatReference } from '../content/bible/books'
import { ACTIVE_TRANSLATION, TRANSLATIONS, verseText } from '../content/bible/verses'
import { LEVELS } from '../content/catalog'
import type { JournalEntry } from '../engine/save/types'
import { Button, Panel } from '../ui/components'
import { Scripture } from './story/Line'
import './quiz/quiz.css'
import './screens.css'

/** How long typing rests before the journal is saved. */
const SAVE_AFTER_MS = 700

/** A level's reflection is one journal entry, rewritten as the player writes more. */
const reflectionEntryId = (level: string) => `${level}-reflection`

/**
 * Reflection and prayer (spec §3.3, §9.5): a deliberately quiet screen with the verse to
 * ponder, a question for the player's own life, a journal box that saves as you type, and
 * the prayer, an original one followed by a traditional one. At a level's end it goes on to
 * the window ceremony.
 */
export function ReflectionScreen() {
  const save = useApp((s) => s.save)
  const levelEnd = useApp((s) => s.levelEnd)
  const reflectionLevel = useApp((s) => s.reflectionLevel)
  const changeSave = useApp((s) => s.changeSave)
  const commit = useApp((s) => s.commit)
  const go = useApp((s) => s.go)
  const level = LEVELS.find((l) => l.id === (levelEnd ?? reflectionLevel)) ?? LEVELS[0]!
  const entryId = reflectionEntryId(level.id)
  const [text, setText] = useState(() => save?.journal.find((e) => e.id === entryId)?.text ?? '')
  const [saved, setSaved] = useState<'idle' | 'saving' | 'saved'>('idle')
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const boxId = useId()
  const heading = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    setMusicPlace({ kind: 'reflection', level })
    heading.current?.focus()
  }, [level])

  /** Puts the text into the journal (or takes an emptied entry out), and writes the save. */
  const store = (value: string) => {
    const now = useApp.getState().save
    if (!now) return
    const others = now.journal.filter((e) => e.id !== entryId)
    const entry: JournalEntry = { id: entryId, level: level.id, question: level.reflection.question, text: value, at: new Date().toISOString() }
    changeSave({ journal: value.trim() ? [...others, entry] : others })
    void commit().then(() => setSaved('saved'))
  }

  const latest = useRef(text)
  const onType = (value: string) => {
    latest.current = value
    setText(value)
    setSaved('saving')
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => store(value), SAVE_AFTER_MS)
  }

  // Leaving with typing not yet saved: save it now.
  const flush = () => {
    if (timer.current) {
      clearTimeout(timer.current)
      timer.current = null
      store(latest.current)
    }
  }
  const flushRef = useRef(flush)
  useEffect(() => {
    flushRef.current = flush
  })
  useEffect(() => () => flushRef.current(), [])

  if (!save) return null
  const { reflection } = level

  return (
    <main className="screen screen-reflection">
      <Panel className="reflection-panel">
        <p className="quiz-title">Level {level.number} · Reflection and prayer</p>
        <h1 ref={heading} tabIndex={-1} className="reflection-verse">
          <Scripture text={verseText(reflection.verse)} />
        </h1>
        <p className="reflection-ref">
          {formatReference(reflection.verse)} · {TRANSLATIONS[ACTIVE_TRANSLATION].short}
        </p>

        <section className="reflection-question">
          <label htmlFor={boxId}>{reflection.question}</label>
          <textarea id={boxId} rows={5} value={text} onChange={(e) => onType(e.target.value)} onBlur={flush} placeholder="Write here if you like. Only you will see it." />
          <p className="ui-note" aria-live="polite">
            {saved === 'saving' ? 'Saving…' : saved === 'saved' ? 'Saved to your journal.' : 'What you write is kept in your journal.'}
          </p>
        </section>

        <section className="reflection-prayer" aria-label="Prayer">
          <blockquote>
            {reflection.prayer.map((line) => (
              <p key={line}>
                <Scripture text={line} />
              </p>
            ))}
          </blockquote>
          {reflection.traditional && (
            <>
              <h2>{reflection.traditional.name}</h2>
              <blockquote>
                {reflection.traditional.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </blockquote>
            </>
          )}
        </section>

        <div className="quiz-actions">
          <Button
            variant="primary"
            onClick={() => {
              flush()
              go(levelEnd ? 'ceremony' : 'journal')
            }}
          >
            Amen
          </Button>
        </div>
      </Panel>
    </main>
  )
}
