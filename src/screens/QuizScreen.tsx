import { useEffect, useMemo, useRef, useState } from 'react'
import { setMusicPlace } from '../app/audio'
import { useApp } from '../app/store'
import { LEVELS } from '../content/catalog'
import { isRight, newRun, recordRun, rightAnswer, starsFor, type Run } from '../quiz/engine'
import { finishedLevels, scopeById } from '../quiz/scopes'
import type { Answer } from '../quiz/types'
import { Button, Panel } from '../ui/components'
import { QuestionCard } from './quiz/QuestionCard'
import { formatRefs, regionName } from './quiz/format'
import { Scripture } from './story/Line'
import './quiz/quiz.css'
import './screens.css'

/** A fresh seed for each run. */
const newSeed = () => (crypto.getRandomValues(new Uint32Array(1))[0] ?? Date.now()) >>> 0

/** How an answer reads in the review. */
function answerText(answer: Answer | undefined): string {
  if (answer === undefined) return '(not answered)'
  if (typeof answer === 'boolean') return answer ? 'True' : 'False'
  if (Array.isArray(answer)) return answer.map((a) => regionName(a)).join(', ')
  return answer
}

export function Stars({ count }: { count: number }) {
  return (
    <span className="quiz-stars">
      {[1, 2, 3].map((n) => (
        <span key={n} data-on={n <= count || undefined} aria-hidden="true">
          ★
        </span>
      ))}
      <span className="visually-hidden">{count} of 3 stars</span>
    </span>
  )
}

/**
 * The quiz (spec §5, §9.5): ten questions, one card at a time, each answered and then
 * explained. No clock and no failing: the run ends with 1 to 3 stars and the best score,
 * and "Review your answers" shows the same run again. At the end of a level it goes on to
 * reflection and prayer; from the menu, back to the quizzes.
 */
export function QuizScreen() {
  const save = useApp((s) => s.save)
  const scopeId = useApp((s) => s.quizScope)
  const levelEnd = useApp((s) => s.levelEnd)
  const changeSave = useApp((s) => s.changeSave)
  const commit = useApp((s) => s.commit)
  const go = useApp((s) => s.go)

  const scope = useMemo(() => (save && scopeId ? scopeById(scopeId, finishedLevels(save)) : null), [save, scopeId])
  const [run, setRun] = useState<Run | null>(() => (scope && save ? newRun(scope.bank, save.quiz, scope.id, newSeed()) : null))
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<(Answer | undefined)[]>([])
  const [phase, setPhase] = useState<'asking' | 'results' | 'review'>('asking')
  const heading = useRef<HTMLHeadingElement>(null)

  // The quiz's own light music.
  useEffect(() => {
    const level = LEVELS.find((l) => l.id === scopeId) ?? LEVELS[0]!
    setMusicPlace({ kind: 'quiz', level })
  }, [scopeId])

  useEffect(() => {
    if (phase !== 'asking') heading.current?.focus()
  }, [phase])

  if (!save) return null
  if (!scope || !run) {
    return (
      <main className="screen screen-quiz">
        <Panel className="quiz-panel">
          <h1>Quiz</h1>
          <p>Finish a level to take its quiz.</p>
          <Button onClick={() => go('quiz-menu')}>Back to the quizzes</Button>
        </Panel>
      </main>
    )
  }

  const total = run.asked.length
  const score = run.asked.filter((a, i) => isRight(a.question, answers[i])).length
  const best = save.quiz[scope.id]?.best ?? 0

  const finish = () => {
    changeSave({ quiz: recordRun(save.quiz, scope.id, run, answers, new Date().toISOString()) })
    void commit()
    setPhase('results')
  }

  const playAgain = () => {
    setRun(newRun(scope.bank, useApp.getState().save!.quiz, scope.id, newSeed()))
    setAnswers([])
    setIndex(0)
    setPhase('asking')
  }

  const leave = () => (levelEnd ? go('reflection') : go('quiz-menu'))

  return (
    <main className="screen screen-quiz">
      <Panel className="quiz-panel">
        <h1 className="quiz-title">{scope.title}</h1>
        {phase === 'asking' && (
          <QuestionCard
            key={`${run.seed}-${index}`}
            asked={run.asked[index]!}
            answer={answers[index]}
            number={index + 1}
            total={total}
            onAnswer={(answer) => setAnswers((now) => Object.assign([...now], { [index]: answer }))}
            nextLabel={index + 1 < total ? 'Next question' : 'See how you did'}
            onNext={() => (index + 1 < total ? setIndex(index + 1) : finish())}
          />
        )}

        {phase === 'results' && (
          <section className="quiz-results" aria-labelledby="quiz-results-title">
            <h2 id="quiz-results-title" ref={heading} tabIndex={-1}>
              You answered {score} of {total}
            </h2>
            <Stars count={starsFor(score, total)} />
            <p className="ui-note">
              {score >= best ? 'Your best yet.' : `Your best is ${best} of ${total}.`} Questions you missed will come back more often until you get them right.
            </p>
            <div className="quiz-actions">
              <Button variant="primary" onClick={leave}>
                {levelEnd ? 'On to reflection and prayer' : 'Back to the quizzes'}
              </Button>
              <Button onClick={() => setPhase('review')}>Review your answers</Button>
              <Button onClick={playAgain}>Play again</Button>
            </div>
          </section>
        )}

        {phase === 'review' && (
          <section className="quiz-review" aria-labelledby="quiz-review-title">
            <h2 id="quiz-review-title" ref={heading} tabIndex={-1}>
              Your answers
            </h2>
            <ol className="quiz-review-list">
              {run.asked.map((asked, i) => {
                const right = isRight(asked.question, answers[i])
                return (
                  <li key={asked.question.id} data-right={right || undefined}>
                    <p className="quiz-review-verdict">{right ? '✓ Right' : '✗ Missed'}</p>
                    <ReviewPrompt question={asked.question} />
                    <p>
                      Your answer: <Scripture text={answerText(answers[i])} />
                    </p>
                    {!right && (
                      <p>
                        The answer: <Scripture text={rightAnswer(asked.question, regionName)} />
                      </p>
                    )}
                    {asked.question.explanation && (
                      <p className="quiz-explanation">
                        <Scripture text={asked.question.explanation} />
                      </p>
                    )}
                    <p className="quiz-ref">Read: {formatRefs(asked.question.ref)}</p>
                  </li>
                )
              })}
            </ol>
            <div className="quiz-actions">
              <Button variant="primary" onClick={() => setPhase('results')}>
                Back to your score
              </Button>
            </div>
          </section>
        )}
      </Panel>
    </main>
  )
}

function ReviewPrompt({ question: q }: { question: Run['asked'][number]['question'] }) {
  const text = q.type === 'tf' ? q.statement : q.type === 'who' ? `Who said ${q.quote}` : q.type === 'thread' ? `${q.from} points to…` : q.type === 'finish' ? q.text : q.prompt
  return (
    <p className="quiz-review-prompt">
      <Scripture text={text} />
    </p>
  )
}
