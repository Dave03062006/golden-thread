import { useApp } from '../app/store'
import { LEVELS } from '../content/catalog'
import { RUN_LENGTH, starsFor } from '../quiz/engine'
import { EVERYTHING, ageScope, agesOf, everythingScope, finishedLevels, levelScope, levelTitle, type QuizScope } from '../quiz/scopes'
import { Button, Panel } from '../ui/components'
import { Stars } from './QuizScreen'
import './quiz/quiz.css'
import './screens.css'

/**
 * Quizzes on the main menu (spec §5): any finished level, a whole Age, or "Everything so
 * far", a mix from every finished level. Each shows its best score.
 */
export function QuizMenuScreen() {
  const save = useApp((s) => s.save)
  const go = useApp((s) => s.go)
  const openQuiz = useApp((s) => s.openQuiz)
  if (!save) return null

  const finished = finishedLevels(save)
  const ages = agesOf(finished)
  const scopes: QuizScope[] = [
    ...(finished.length > 1 ? [everythingScope(finished)] : []),
    ...[...ages].filter(([, levels]) => levels.length > 1).map(([age, levels]) => ageScope(age, levels)),
    ...finished.map(levelScope),
  ]
  const locked = LEVELS.filter((l) => !finished.includes(l))

  return (
    <main className="screen screen-quiz-menu">
      <Panel className="quiz-panel">
        <div className="settings-head">
          <h1>Quiz</h1>
          <Button variant="quiet" onClick={() => go('menu')}>
            Back
          </Button>
        </div>
        <p className="ui-note">Ten questions at a time, with no clock. Questions you miss come back more often until you get them right.</p>
        {scopes.length > 0 && (
          <ul className="quiz-scopes">
            {scopes.map((scope) => {
              const record = save.quiz[scope.id]
              const last = record?.runs.at(-1)
              return (
                <li key={scope.id}>
                  <Button variant={scope.id === EVERYTHING ? 'primary' : 'secondary'} className="quiz-scope" onClick={() => openQuiz(scope.id)}>
                    <span>{scope.title}</span>
                    <small>
                      {record ? (
                        <>
                          Best {record.best} of {last?.total ?? RUN_LENGTH} <Stars count={starsFor(record.best, last?.total ?? RUN_LENGTH)} />
                        </>
                      ) : (
                        `${scope.bank.length} questions`
                      )}
                    </small>
                  </Button>
                </li>
              )
            })}
          </ul>
        )}
        {locked.length > 0 && (
          <>
            <h2 className="quiz-locked-title">Still to come</h2>
            <ul className="quiz-locked">
              {locked.map((level) => (
                <li key={level.id}>
                  {levelTitle(level)}: <span className="ui-note">finish the level to take its quiz.</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </Panel>
    </main>
  )
}
