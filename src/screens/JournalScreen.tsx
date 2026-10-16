import { useApp } from '../app/store'
import { LEVELS } from '../content/catalog'
import { Button, Panel } from '../ui/components'
import { formatDate } from '../ui/format'
import { Scripture } from './story/Line'
import './quiz/quiz.css'
import './screens.css'

/**
 * The journal (spec §9.5): everything the player has written in reflection, from every
 * level, gathered to reread, with a way back to write more. It belongs to the save, so it
 * travels with an exported save file.
 */
export function JournalScreen() {
  const save = useApp((s) => s.save)
  const go = useApp((s) => s.go)
  const returnTo = useApp((s) => s.returnTo)
  const openReflection = useApp((s) => s.openReflection)
  if (!save) return null

  const entries = [...save.journal].sort((a, b) => LEVELS.findIndex((l) => l.id === a.level) - LEVELS.findIndex((l) => l.id === b.level))

  return (
    <main className="screen screen-journal">
      <Panel className="journal-panel">
        <div className="settings-head">
          <h1>Journal</h1>
          <Button variant="quiet" onClick={() => go(returnTo === 'journal' || returnTo === 'reflection' ? 'menu' : returnTo)}>
            Back
          </Button>
        </div>
        {entries.length === 0 ? (
          <p className="ui-note">At the end of each level there’s a question to reflect on. What you write there is gathered here, to read again.</p>
        ) : (
          <ul className="journal-list">
            {entries.map((entry) => {
              const level = LEVELS.find((l) => l.id === entry.level)
              return (
                <li key={entry.id}>
                  <article aria-labelledby={`j-${entry.id}`}>
                    <h2 id={`j-${entry.id}`}>{level ? `Level ${level.number} · ${level.title}` : entry.level}</h2>
                    <p className="journal-question">
                      <Scripture text={entry.question} />
                    </p>
                    <p className="journal-text">{entry.text}</p>
                    <p className="ui-note">
                      Written {formatDate(entry.at)}
                      {level && (
                        <>
                          {' · '}
                          <button type="button" className="journal-edit" onClick={() => openReflection(level.id)}>
                            Write more
                          </button>
                        </>
                      )}
                    </p>
                  </article>
                </li>
              )
            })}
          </ul>
        )}
      </Panel>
    </main>
  )
}
