import { useEffect, useRef, useState } from 'react'
import { MapPicker } from '../../map/core/MapView'
import { mapRegion } from '../../map/core/regions'
import { isRight, rightAnswer, type AskedQuestion } from '../../quiz/engine'
import { QUESTION_TYPES, type Answer } from '../../quiz/types'
import { Button } from '../../ui/components'
import { Scripture } from '../story/Line'
import { formatRefs, regionName } from './format'
import { OrderList } from './OrderList'

/**
 * One question, as the quiz shows it (spec §9.5): asked in its own way for its type, then,
 * once answered, the right answer, a short explanation and the passage to read. Questions
 * with one choice are answered by choosing; the others (order, map, verse) by "Check".
 */
export function QuestionCard({
  asked,
  answer,
  onAnswer,
  onNext,
  nextLabel,
  number,
  total,
}: {
  asked: AskedQuestion
  /** The answer given, once there is one. */
  answer: Answer | undefined
  onAnswer: (answer: Answer) => void
  onNext: () => void
  nextLabel: string
  number: number
  total: number
}) {
  const q = asked.question
  const answered = answer !== undefined
  const next = useRef<HTMLButtonElement>(null)

  // After answering, the keyboard's focus moves on to "Next".
  useEffect(() => {
    if (answered) next.current?.focus({ preventScroll: true })
  }, [answered])

  return (
    <article className="quiz-card" aria-labelledby={`q-${q.id}`}>
      <p className="quiz-kicker">
        Question {number} of {total} · {QUESTION_TYPES[q.type]}
      </p>
      <h2 id={`q-${q.id}`} className="quiz-prompt">
        <Prompt asked={asked} />
      </h2>
      <Asking key={q.id} asked={asked} answer={answer} onAnswer={onAnswer} />
      {answered && (
        <section className="quiz-feedback" data-right={isRight(q, answer) || undefined} aria-live="polite">
          <p className="quiz-verdict">{isRight(q, answer) ? 'Yes, that’s right.' : 'Not quite.'}</p>
          {!isRight(q, answer) && (
            <p className="quiz-right-answer">
              The answer: <Scripture text={rightAnswer(q, regionName)} />
            </p>
          )}
          {q.explanation && (
            <p className="quiz-explanation">
              <Scripture text={q.explanation} />
            </p>
          )}
          <p className="quiz-ref">Read: {formatRefs(q.ref)}</p>
          <Button ref={next} variant="primary" className="quiz-next" onClick={onNext}>
            {nextLabel}
          </Button>
        </section>
      )}
    </article>
  )
}

function Prompt({ asked }: { asked: AskedQuestion }) {
  const q = asked.question
  switch (q.type) {
    case 'mc':
    case 'order':
    case 'where':
      return <Scripture text={q.prompt} />
    case 'tf':
      return (
        <>
          True or false? <Scripture text={q.statement} />
        </>
      )
    case 'who':
      return (
        <>
          Who said it? <Scripture text={q.quote} />
        </>
      )
    case 'finish':
      return <>Finish the verse.</>
    case 'thread':
      return (
        <>
          <Scripture text={q.from} /> points to…
        </>
      )
  }
}

/** How the player answers, by type. */
function Asking({ asked, answer, onAnswer }: { asked: AskedQuestion; answer: Answer | undefined; onAnswer: (answer: Answer) => void }) {
  const q = asked.question
  const answered = answer !== undefined
  const first = useRef<HTMLButtonElement>(null)
  // A new question takes the keyboard's focus.
  useEffect(() => {
    first.current?.focus({ preventScroll: true })
  }, [])

  switch (q.type) {
    case 'mc':
    case 'who':
    case 'thread':
    case 'tf': {
      const options = q.type === 'tf' ? ['True', 'False'] : asked.options!
      const value = (option: string): Answer => (q.type === 'tf' ? option === 'True' : option)
      return (
        <div className="quiz-options">
          {options.map((option, i) => {
            const chosen = answer === value(option)
            const right = answered && isRight(q, value(option))
            return (
              <button
                key={option}
                ref={i === 0 ? first : undefined}
                type="button"
                className="quiz-option"
                data-state={right ? 'right' : chosen ? 'wrong' : undefined}
                aria-pressed={chosen}
                disabled={answered}
                onClick={() => onAnswer(value(option))}
              >
                <Scripture text={option} />
              </button>
            )
          })}
        </div>
      )
    }
    case 'order':
      return <OrderAsking asked={asked} answer={answer as string[] | undefined} onAnswer={onAnswer} />
    case 'where':
      return <WhereAsking asked={asked} answer={answer as string[] | undefined} onAnswer={onAnswer} />
    case 'finish':
      return <FinishAsking asked={asked} answer={answer as string[] | undefined} onAnswer={onAnswer} />
  }
}

function OrderAsking({ asked, answer, onAnswer }: { asked: AskedQuestion; answer: string[] | undefined; onAnswer: (answer: Answer) => void }) {
  const [items, setItems] = useState(asked.items!)
  const q = asked.question
  return (
    <div className="quiz-order">
      <OrderList items={answer ?? items} onChange={setItems} locked={answer !== undefined} right={answer !== undefined && q.type === 'order' ? q.items : undefined} />
      {answer === undefined && (
        <Button variant="primary" onClick={() => onAnswer(items)}>
          Check
        </Button>
      )}
    </div>
  )
}

function WhereAsking({ asked, answer, onAnswer }: { asked: AskedQuestion; answer: string[] | undefined; onAnswer: (answer: Answer) => void }) {
  const q = asked.question
  const [selected, setSelected] = useState<string[]>([])
  if (q.type !== 'where') return null
  const need = q.answer.length
  const toggle = (id: string) =>
    setSelected((now) => (now.includes(id) ? now.filter((x) => x !== id) : need === 1 ? [id] : [...now, id].slice(-need)))
  return (
    <div className="quiz-where">
      <MapPicker targets={q.targets.map((id) => mapRegion(id)!)} selected={answer ?? selected} onToggle={toggle} result={answer ? { right: q.answer } : undefined} />
      {answer === undefined && (
        <Button variant="primary" disabled={selected.length !== need} onClick={() => onAnswer(selected)}>
          {need > 1 && selected.length !== need ? `Choose ${need}` : 'Check'}
        </Button>
      )}
    </div>
  )
}

function FinishAsking({ asked, answer, onAnswer }: { asked: AskedQuestion; answer: string[] | undefined; onAnswer: (answer: Answer) => void }) {
  const q = asked.question
  const [words, setWords] = useState<(string | null)[]>(() => asked.blanks!.map(() => null))
  if (q.type !== 'finish') return null
  const shown = answer ?? words
  const parts = q.text.split('___')
  return (
    <div className="quiz-finish">
      <p className="quiz-verse">
        {parts.map((part, i) => (
          <span key={i}>
            <Scripture text={part} />
            {i < parts.length - 1 && <span className="quiz-blank">{shown[i] ?? `(${i + 1})`}</span>}
          </span>
        ))}
      </p>
      {asked.blanks!.map((choices, b) => (
        <fieldset key={b} className="quiz-options quiz-words">
          <legend className="visually-hidden">Blank {b + 1}</legend>
          {choices.map((word) => {
            const chosen = shown[b] === word
            const right = answer !== undefined && word === q.blanks[b]![0]
            return (
              <button
                key={word}
                type="button"
                className="quiz-option"
                aria-pressed={chosen}
                data-state={right ? 'right' : answer !== undefined && chosen ? 'wrong' : undefined}
                disabled={answer !== undefined}
                onClick={() => setWords((now) => now.map((w, i) => (i === b ? word : w)))}
              >
                {word}
              </button>
            )
          })}
        </fieldset>
      ))}
      {answer === undefined && (
        <Button variant="primary" disabled={words.some((w) => w === null)} onClick={() => onAnswer(words as string[])}>
          Check
        </Button>
      )}
    </div>
  )
}
